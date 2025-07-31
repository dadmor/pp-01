import { createClient } from "@supabase/supabase-js";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function generateStaticPages() {
  console.log("🚀 Generowanie statycznych stron SEO...");

  try {
    // 1. Najpierw build aplikacji
    console.log("📦 Building app...");
    const { execSync } = await import('child_process');
    execSync('npm run build', { stdio: 'inherit' });

    // 2. Pobierz wszystkich aktywnych terapeutów
    const { data: therapists, error } = await supabase
      .from("therapists")
      .select("*")
      .eq("is_active", true);

    if (error) throw error;

    // 3. Przeczytaj zbudowany index.html jako template
    const builtIndexPath = path.join(__dirname, "../dist/index.html");
    const indexTemplate = await fs.readFile(builtIndexPath, 'utf-8');

    // 4. Dla każdego terapeuty stwórz PEŁNĄ stronę HTML z danymi
    for (const therapist of therapists) {
      // Przygotuj meta tagi SEO
      const metaTags = `
    <title>${therapist.meta_title || `${therapist.name} - Psychoterapeuta ${therapist.location?.city || 'Warszawa'} | Terapia Online`}</title>
    <meta name="description" content="${therapist.meta_description || therapist.short_description}">
    <link rel="canonical" href="https://profesjonalna-psychoterapia.pl/terapeuta/${therapist.slug}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${therapist.name} - ${therapist.title}">
    <meta property="og:description" content="${therapist.short_description}">
    <meta property="og:type" content="profile">
    <meta property="og:url" content="https://profesjonalna-psychoterapia.pl/terapeuta/${therapist.slug}">
    <meta property="og:image" content="${therapist.image_url || 'https://profesjonalna-psychoterapia.pl/default-therapist.jpg'}">
    
    <!-- Lokalne SEO -->
    <meta name="geo.region" content="PL-MZ">
    <meta name="geo.placename" content="${therapist.location?.city || 'Warszawa'}">
    
    <!-- Strukturalne dane JSON-LD -->
    <script type="application/ld+json">
    ${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": therapist.name,
      "jobTitle": therapist.title,
      "description": therapist.description,
      "image": therapist.image_url,
      "url": `https://profesjonalna-psychoterapia.pl/terapeuta/${therapist.slug}`,
      "telephone": therapist.contact?.phone,
      "email": therapist.contact?.email,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": therapist.location?.city || "Warszawa",
        "addressRegion": "mazowieckie",
        "addressCountry": "PL"
      },
      "offers": {
        "@type": "Offer",
        "price": therapist.price_per_hour,
        "priceCurrency": "PLN",
        "url": `https://profesjonalna-psychoterapia.pl/terapeuta/${therapist.slug}#book`,
        "availability": "https://schema.org/InStock"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Specjalizacje terapeutyczne",
        "itemListElement": therapist.specializations?.map(spec => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": spec,
            "provider": {
              "@type": "Person",
              "name": therapist.name
            }
          }
        }))
      }
    }, null, 2)}
    </script>`;

      // Wstaw dane terapeuty do window object
      const therapistScript = `
    <script>
      window.__THERAPIST_DATA__ = ${JSON.stringify(therapist)};
      window.__PRERENDERED__ = true;
    </script>`;

      // Zmodyfikuj template
      let therapistHtml = indexTemplate
        .replace('</head>', `${metaTags}\n${therapistScript}\n</head>`)
        .replace(
          '<title>Profesjonalna Psychoterapia</title>',
          '' // Usuń domyślny title, już mamy w metaTags
        );

      // Dodaj prerendered content do body dla SEO
      const prerenderedContent = `
    <div id="prerendered-content" style="position: absolute; left: -9999px;">
      <h1>${therapist.name} - ${therapist.title}</h1>
      <p>${therapist.description}</p>
      <h2>Specjalizacje</h2>
      <ul>
        ${therapist.specializations?.map(s => `<li>${s}</li>`).join('') || ''}
      </ul>
      <h2>Kontakt</h2>
      <p>Email: ${therapist.contact?.email}</p>
      <p>Telefon: ${therapist.contact?.phone || 'Dostępny po umówieniu'}</p>
      <p>Lokalizacja: ${therapist.location?.city || 'Warszawa'}</p>
      <p>Cena: ${therapist.price_per_hour} zł za sesję</p>
    </div>`;

      therapistHtml = therapistHtml.replace(
        '<div id="root"></div>',
        `<div id="root"></div>\n${prerenderedContent}`
      );

      // Zapisz plik HTML
      const therapistDir = path.join(__dirname, "../dist/terapeuta");
      await fs.ensureDir(therapistDir);
      
      const filePath = path.join(therapistDir, `${therapist.slug}.html`);
      await fs.writeFile(filePath, therapistHtml);
      
      console.log(`✅ SEO-optimized: /terapeuta/${therapist.slug}.html`);
    }

    // 5. Generuj ulepszoną sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://profesjonalna-psychoterapia.pl/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://profesjonalna-psychoterapia.pl/terapeuci</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  ${therapists.map(t => `
  <url>
    <loc>https://profesjonalna-psychoterapia.pl/terapeuta/${t.slug}</loc>
    <lastmod>${new Date(t.updated_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    ${t.image_url ? `
    <image:image>
      <image:loc>${t.image_url}</image:loc>
      <image:title>${t.name} - ${t.title}</image:title>
      <image:caption>Zdjęcie psychoterapeuty ${t.name}</image:caption>
    </image:image>` : ''}
  </url>`).join('')}
</urlset>`;

    await fs.writeFile(path.join(__dirname, "../dist/sitemap.xml"), sitemap);

    // 6. Generuj RSS feed dla Google News
    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Profesjonalna Psychoterapia - Nowi Terapeuci</title>
    <link>https://profesjonalna-psychoterapia.pl</link>
    <description>Najnowsi certyfikowani psychoterapeuci online</description>
    <language>pl</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://profesjonalna-psychoterapia.pl/rss.xml" rel="self" type="application/rss+xml"/>
    ${therapists.slice(0, 10).map(t => `
    <item>
      <title>${t.name} - ${t.title}</title>
      <link>https://profesjonalna-psychoterapia.pl/terapeuta/${t.slug}</link>
      <description><![CDATA[${t.short_description}]]></description>
      <pubDate>${new Date(t.created_at).toUTCString()}</pubDate>
      <guid isPermaLink="true">https://profesjonalna-psychoterapia.pl/terapeuta/${t.slug}</guid>
    </item>`).join('')}
  </channel>
</rss>`;

    await fs.writeFile(path.join(__dirname, "../dist/rss.xml"), rssFeed);

    // 7. Generuj manifest dla PWA (bonus SEO)
    const manifest = {
      name: "Profesjonalna Psychoterapia",
      short_name: "Psychoterapia",
      description: "Platforma łącząca z certyfikowanymi psychoterapeutami online",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#87A96B",
      icons: [
        {
          src: "/icon-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/icon-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    };

    await fs.writeJSON(path.join(__dirname, "../dist/manifest.json"), manifest, { spaces: 2 });

    console.log("\n🎯 SEO Optimization Complete!");
    console.log(`📄 Generated ${therapists.length} SEO-optimized pages`);
    console.log("🗺️  Sitemap.xml with image tags");
    console.log("📡 RSS feed for Google News");
    console.log("📱 PWA manifest.json");
    console.log("\n🚀 Ready for TOP Google rankings!");

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

// Uruchom
generateStaticPages();