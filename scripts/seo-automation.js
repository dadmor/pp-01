import fetch from 'node-fetch';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import fs from 'fs-extra';
import path from 'path';

dotenv.config();

// Google Search Console API
const auth = new google.auth.GoogleAuth({
  keyFile: './google-service-account.json', // Musisz pobrać z Google Cloud Console
  scopes: ['https://www.googleapis.com/auth/webmasters'],
});

const searchconsole = google.searchconsole({ version: 'v1', auth });

class SEOAutomation {
  constructor() {
    this.siteUrl = 'https://profesjonalna-psychoterapia.pl';
  }

  // 1. Automatyczne pingowanie sitemap do Google
  async pingSitemap() {
    const sitemapUrl = `${this.siteUrl}/sitemap.xml`;
    const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    
    try {
      const response = await fetch(pingUrl);
      console.log('✅ Sitemap pinged to Google:', response.status);
      
      // Ping też do Bing
      const bingPingUrl = `https://www.bing.com/indexnow?url=${encodeURIComponent(sitemapUrl)}&key=${process.env.BING_INDEXNOW_KEY}`;
      await fetch(bingPingUrl);
      console.log('✅ Sitemap pinged to Bing');
    } catch (error) {
      console.error('❌ Sitemap ping failed:', error);
    }
  }

  // 2. Automatyczne zgłaszanie nowych URL do indeksowania
  async submitUrlsToIndex(urls) {
    try {
      // Google Indexing API (wymaga osobnej konfiguracji)
      const indexingApiUrl = 'https://indexing.googleapis.com/v3/urlNotifications:publish';
      
      for (const url of urls) {
        const response = await fetch(indexingApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await this.getAccessToken()}`
          },
          body: JSON.stringify({
            url: url,
            type: 'URL_UPDATED'
          })
        });
        
        console.log(`✅ URL submitted: ${url}`);
      }
    } catch (error) {
      console.error('❌ URL submission failed:', error);
    }
  }

  // 3. Sprawdzanie statusu indeksowania
  async checkIndexingStatus() {
    try {
      const response = await searchconsole.urlInspection.index.inspect({
        siteUrl: this.siteUrl,
        inspectionUrl: this.siteUrl,
      });
      
      console.log('📊 Indexing Status:', response.data);
      
      // Zapisz raport
      await fs.writeJSON('./seo-reports/indexing-status.json', response.data, { spaces: 2 });
    } catch (error) {
      console.error('❌ Indexing check failed:', error);
    }
  }

  // 4. Automatyczne monitorowanie pozycji
  async checkRankings() {
    const keywords = [
      'psychoterapeuta warszawa',
      'psycholog warszawa',
      'terapia online warszawa',
      'psychoterapia mokotów',
      // dodaj więcej
    ];

    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      
      const response = await searchconsole.searchanalytics.query({
        siteUrl: this.siteUrl,
        requestBody: {
          startDate: startDate.toISOString().split('T')[0],
          endDate: new Date().toISOString().split('T')[0],
          dimensions: ['query', 'page'],
          dimensionFilterGroups: [{
            filters: keywords.map(keyword => ({
              dimension: 'query',
              expression: keyword,
            })),
          }],
          rowLimit: 100,
        },
      });

      console.log('📈 Ranking Report:', response.data);
      
      // Zapisz raport
      await fs.writeJSON('./seo-reports/rankings.json', response.data, { spaces: 2 });
    } catch (error) {
      console.error('❌ Rankings check failed:', error);
    }
  }

  // 5. Sprawdzanie błędów crawlowania
  async checkCrawlErrors() {
    try {
      const response = await searchconsole.urlInspection.index.inspect({
        siteUrl: this.siteUrl,
        inspectionUrl: `${this.siteUrl}/robots.txt`,
      });
      
      console.log('🤖 Robots.txt status:', response.data);
    } catch (error) {
      console.error('❌ Crawl error check failed:', error);
    }
  }

  // 6. Generowanie raportu SEO
  async generateSEOReport() {
    const report = {
      date: new Date().toISOString(),
      checks: {
        sitemap: await this.checkSitemapHealth(),
        robots: await this.checkRobotsHealth(),
        indexing: await this.getIndexedPagesCount(),
        performance: await this.checkCoreWebVitals(),
      }
    };

    await fs.writeJSON('./seo-reports/weekly-report.json', report, { spaces: 2 });
    console.log('📊 SEO Report generated!');
  }

  // Helper: Sprawdź zdrowie sitemap
  async checkSitemapHealth() {
    const response = await fetch(`${this.siteUrl}/sitemap.xml`);
    return {
      status: response.status,
      accessible: response.ok,
      lastChecked: new Date().toISOString()
    };
  }

  // Helper: Sprawdź robots.txt
  async checkRobotsHealth() {
    const response = await fetch(`${this.siteUrl}/robots.txt`);
    const text = await response.text();
    return {
      status: response.status,
      hasSitemap: text.includes('Sitemap:'),
      accessible: response.ok,
    };
  }

  // Helper: Pobierz token dostępu
  async getAccessToken() {
    const authClient = await auth.getClient();
    const token = await authClient.getAccessToken();
    return token.token;
  }
}

// Automatyczne zadania
export async function runSEOAutomation() {
  const seo = new SEOAutomation();
  
  console.log('🚀 Starting SEO Automation...\n');
  
  // Codzienne zadania
  await seo.pingSitemap();
  
  // Tygodniowe zadania (uruchom w poniedziałki)
  if (new Date().getDay() === 1) {
    await seo.checkIndexingStatus();
    await seo.checkRankings();
    await seo.generateSEOReport();
  }
  
  console.log('\n✅ SEO Automation completed!');
}

// Uruchom jeśli wywołane bezpośrednio
if (import.meta.url === `file://${process.argv[1]}`) {
  runSEOAutomation();
}