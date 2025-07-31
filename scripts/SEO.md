#  Co teraz masz zautomatyzowane:
1. Automatyczne pingowanie sitemap

Do Google przy każdym deploy
Do Bing przez IndexNow
GitHub Action codziennie o 9:00

2. Monitorowanie indeksowania

Puppeteer sprawdza site:url w Google
Zapisuje raporty do seo-reports/
Pinguje niezaindeksowane strony

3. Core Web Vitals

PageSpeed Insights API
Lighthouse CI w GitHub Actions
Alerty gdy spadnie performance

4. Broken links checker

Automatycznie po każdym deploy
Skanuje wszystkie linki w HTML

5. Raporty SEO

Tygodniowe podsumowania
Historia w Supabase
Artifacts w GitHub Actions

# 🚀 Jak to uruchomić:

Dodaj secrety w GitHub:

Settings → Secrets → Actions:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY  
- INDEXNOW_KEY
- SLACK_WEBHOOK (opcjonalne)

Stwórz tabelę w Supabase:

sqlCREATE TABLE seo_monitoring (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  is_indexed BOOLEAN,
  page_speed_score INTEGER,
  checked_at TIMESTAMPTZ DEFAULT NOW()
);

Wygeneruj klucz IndexNow:

bash# Wygeneruj losowy klucz
openssl rand -hex 16 > public/indexnow-key.txt

# Lokalnie testuj:

bashnpm install puppeteer node-fetch
node scripts/seo-monitor.js
📊 Dashboard SEO (bonus):
Możesz stworzyć prostą stronę /admin/seo która pokazuje:

Status indeksowania każdej strony
Historię PageSpeed Score
Ostatnie pingi do Google/Bing
Wykres pozycji w czasie

Automatyzacja SEO = oszczędność czasu + lepsza widoczność! 🎯