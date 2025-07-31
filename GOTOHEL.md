# Lecimy na Hel.pl

# 🚀 Deployment na Render.com - Kompletny Przewodnik

## 1. Przygotowanie projektu

### A. Upewnij się, że masz wszystko w Git:
```bash
git add .
git commit -m "Initial commit - therapy platform"
git push origin main
```

### B. Sprawdź czy masz plik `render.yaml` w głównym katalogu projektu

## 2. Pierwsze wdrożenie na Render.com

### A. Stwórz konto i połącz z GitHub:
1. Wejdź na https://render.com
2. Zaloguj się przez GitHub
3. Autoryzuj Render do dostępu do Twoich repozytoriów

### B. Stwórz nowy Static Site:
1. Kliknij **"New +"** → **"Static Site"**
2. Połącz z repozytorium GitHub: `profesjonalna-psychoterapia`
3. Wypełnij formularz:
   - **Name**: `profesjonalna-psychoterapia`
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build:static`
   - **Publish Directory**: `dist`
   - **Auto-Deploy**: Yes (zalecane)

### C. Dodaj zmienne środowiskowe:
1. W sekcji **Environment Variables** dodaj:
   ```
   VITE_SUPABASE_URL = https://twojprojekt.supabase.co
   VITE_SUPABASE_ANON_KEY = twoj-klucz-anon
   NODE_VERSION = 18
   ```

### D. Kliknij "Create Static Site"
Render automatycznie zbuduje i wdroży Twoją aplikację!

## 3. Automatyczne rebuildy (CI/CD)

### A. Rebuild przy każdym push do GitHub:
Jeśli włączyłeś **Auto-Deploy**, każdy push do brancha `main` automatycznie:
1. Triggeruje nowy build
2. Generuje statyczne strony
3. Deployuje zmiany

```bash
# Przykład workflow:
git add .
git commit -m "Add new therapist"
git push origin main
# Render automatycznie zbuduje i wdroży!
```

### B. Ręczny rebuild z dashboardu:
1. Wejdź do swojego projektu na Render.com
2. Kliknij **"Manual Deploy"** → **"Deploy latest commit"**

## 4. Rebuild przy zmianach w Supabase (Webhook)

### A. Stwórz webhook w Render:
1. W dashboardzie projektu przejdź do **Settings** → **Build & Deploy**
2. Skopiuj **Deploy Hook URL** (wygląda tak: `https://api.render.com/deploy/srv-xxxxx`)

### B. Skonfiguruj webhook w Supabase:
```sql
-- Stwórz funkcję do wywołania webhooka
CREATE OR REPLACE FUNCTION trigger_render_rebuild()
RETURNS trigger AS $$
BEGIN
  -- Wywołaj webhook Render.com
  PERFORM net.http_post(
    url := 'https://api.render.com/deploy/srv-xxxxx',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Dodaj trigger na tabeli therapists
CREATE TRIGGER rebuild_on_therapist_change
AFTER INSERT OR UPDATE OR DELETE ON therapists
FOR EACH STATEMENT
EXECUTE FUNCTION trigger_render_rebuild();
```

### C. Alternatywa - GitHub Actions:
Stwórz plik `.github/workflows/rebuild.yml`:
```yaml
name: Trigger Render Deploy

on:
  schedule:
    - cron: '0 */6 * * *'  # Co 6 godzin
  workflow_dispatch:  # Ręczne wywołanie

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Render Deploy
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```

Dodaj secret w GitHub: Settings → Secrets → `RENDER_DEPLOY_HOOK`

## 5. Monitorowanie deploymentów

### A. Logi budowania:
1. W dashboardzie kliknij na **"Events"**
2. Kliknij na konkretny deployment
3. Zobacz logi w czasie rzeczywistym

### B. Sprawdzanie statusu:
- ✅ **Live** - strona działa
- 🔄 **Building** - trwa budowanie
- ❌ **Failed** - błąd (sprawdź logi)

## 6. Domena własna

### A. W Render.com:
1. Settings → Custom Domains
2. Dodaj: `profesjonalna-psychoterapia.pl`
3. Skopiuj wartości DNS

### B. U dostawcy domeny:
Dodaj rekordy:
- **A Record**: `@` → IP z Render
- **CNAME**: `www` → `profesjonalna-psychoterapia.onrender.com`

## 7. Optymalizacja

### A. Build cache:
Render automatycznie cache'uje `node_modules` między buildami.

### B. Zmniejsz czas buildu:
```json
// package.json
{
  "scripts": {
    "build:static": "npm run build && node scripts/generate-static.js",
    "build:fast": "vite build --mode production"
  }
}
```

### C. Headers dla lepszego cache:
W `render.yaml` już mamy konfigurację headers dla bezpieczeństwa.

## 8. Troubleshooting

### Problem: Build failed
```bash
# Sprawdź logi w Render dashboard
# Najczęstsze problemy:
- Brak zmiennych środowiskowych
- Błędna wersja Node.js
- Brak zależności w package.json
```

### Problem: 404 na podstronach
Już mamy rewrite rules w `render.yaml`!

### Problem: Stare dane po rebuilde
1. Wyczyść cache przeglądarki
2. Sprawdź czy build faktycznie się wykonał
3. Sprawdź logi czy dane zostały pobrane z Supabase

## 9. Automatyzacja lokalna

### Skrypt do ręcznego triggera:
```bash
#!/bin/bash
# deploy.sh
echo "🚀 Triggering Render deploy..."
curl -X POST https://api.render.com/deploy/srv-xxxxx
echo "✅ Deploy triggered!"
```

```bash
chmod +x deploy.sh
./deploy.sh
```

## 10. Best Practices

1. **Zawsze testuj lokalnie**: `npm run build:static`
2. **Używaj branchy**: `develop` do testów, `main` do produkcji
3. **Monitoruj logi**: Sprawdzaj błędy po każdym deploy
4. **Backup danych**: Regularnie eksportuj dane z Supabase
5. **Semantic versioning**: Taguj ważne release'y w git

---

## Podsumowanie komend:

```bash
# Lokalny test
npm run build:static
npm run preview

# Deploy przez Git
git add .
git commit -m "Update therapists"
git push origin main

# Ręczny rebuild (z webhooka)
curl -X POST https://api.render.com/deploy/srv-xxxxx
```

🎉 **Gotowe!** Twoja strona jest teraz w pełni zautomatyzowana!