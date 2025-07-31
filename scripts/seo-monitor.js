import puppeteer from 'puppeteer';
import fs from 'fs-extra';
import { createClient } from '@supabase/supabase-js';

// Prosty monitor SEO bez Google API
class SEOMonitor {
  constructor() {
    this.siteUrl = 'https://profesjonalna-psychoterapia.pl';
    this.supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_ANON_KEY
    );
  }

  // 1. Sprawdź czy strony są zaindeksowane
  async checkGoogleIndex(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    try {
      // Szukaj site:url w Google
      await page.goto(`https://www.google.com/search?q=site:${encodeURIComponent(url)}`);
      await page.waitForSelector('#result-stats', { timeout: 5000 });
      
      const results = await page.$eval('#result-stats', el => el.textContent);
      const isIndexed = !results.includes('0 wyników');
      
      console.log(`✅ ${url} - ${isIndexed ? 'INDEXED' : 'NOT INDEXED'}`);
      
      await browser.close();
      return { url, isIndexed, checkedAt: new Date() };
    } catch (error) {
      await browser.close();
      return { url, isIndexed: false, error: error.message };
    }
  }

  // 2. Monitoruj wszystkie strony terapeutów
  async monitorAllPages() {
    const { data: therapists } = await this.supabase
      .from('therapists')
      .select('slug');
    
    const results = [];
    
    // Sprawdź główną stronę
    results.push(await this.checkGoogleIndex(this.siteUrl));
    
    // Sprawdź każdego terapeutę
    for (const therapist of therapists) {
      const url = `${this.siteUrl}/terapeuta/${therapist.slug}`;
      results.push(await this.checkGoogleIndex(url));
      
      // Poczekaj żeby nie spamować Google
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    // Zapisz raport
    await fs.writeJSON('./seo-reports/indexing-monitor.json', {
      date: new Date(),
      totalPages: results.length,
      indexedPages: results.filter(r => r.isIndexed).length,
      results
    }, { spaces: 2 });
    
    return results;
  }

  // 3. Sprawdź Core Web Vitals
  async checkPageSpeed(url) {
    const apiKey = process.env.PAGESPEED_API_KEY; // Opcjonalne
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}${apiKey ? `&key=${apiKey}` : ''}`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      const metrics = {
        url,
        score: data.lighthouseResult.categories.performance.score * 100,
        lcp: data.lighthouseResult.audits['largest-contentful-paint'].displayValue,
        fid: data.lighthouseResult.audits['max-potential-fid'].displayValue,
        cls: data.lighthouseResult.audits['cumulative-layout-shift'].displayValue,
        checkedAt: new Date()
      };
      
      console.log(`📊 PageSpeed for ${url}: ${metrics.score}/100`);
      return metrics;
    } catch (error) {
      console.error(`❌ PageSpeed check failed for ${url}:`, error.message);
      return null;
    }
  }

  // 4. Automatyczne pingowanie do IndexNow (Bing)
  async pingIndexNow(urls) {
    const key = process.env.INDEXNOW_KEY || 'your-indexnow-key';
    const keyLocation = `${this.siteUrl}/${key}.txt`;
    
    const body = {
      host: 'profesjonalna-psychoterapia.pl',
      key: key,
      keyLocation: keyLocation,
      urlList: urls
    };
    
    try {
      const response = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      console.log('✅ IndexNow ping sent:', response.status);
    } catch (error) {
      console.error('❌ IndexNow ping failed:', error);
    }
  }

  // 5. Zapisz dane do Supabase (historia SEO)
  async saveToSupabase(data) {
    const { error } = await this.supabase
      .from('seo_monitoring')
      .insert({
        url: data.url,
        is_indexed: data.isIndexed,
        page_speed_score: data.pageSpeed,
        checked_at: new Date()
      });
    
    if (error) console.error('Supabase error:', error);
  }
}

// GitHub Action lub Cron Job
export async function runDailySEOCheck() {
  const monitor = new SEOMonitor();
  
  console.log('🔍 Starting daily SEO monitoring...\n');
  
  // 1. Sprawdź indeksowanie
  const indexResults = await monitor.monitorAllPages();
  
  // 2. Dla niezaindeksowanych - pinguj
  const notIndexed = indexResults
    .filter(r => !r.isIndexed)
    .map(r => r.url);
  
  if (notIndexed.length > 0) {
    console.log(`\n🔔 Pinging ${notIndexed.length} pages to IndexNow...`);
    await monitor.pingIndexNow(notIndexed);
  }
  
  // 3. Sprawdź PageSpeed dla głównej strony
  console.log('\n📊 Checking Core Web Vitals...');
  await monitor.checkPageSpeed('https://profesjonalna-psychoterapia.pl');
  
  console.log('\n✅ Daily SEO check completed!');
}

// Webhook endpoint dla Supabase
export async function handleTherapistChange(req, res) {
  const monitor = new SEOMonitor();
  const { slug } = req.body.record;
  
  // Pinguj nową/zaktualizowaną stronę
  const url = `https://profesjonalna-psychoterapia.pl/terapeuta/${slug}`;
  await monitor.pingIndexNow([url]);
  
  res.json({ success: true });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runDailySEOCheck();
}