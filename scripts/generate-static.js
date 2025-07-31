import { createClient } from "@supabase/supabase-js";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function generateStaticPages() {
  console.log("🚀 Generowanie statycznych stron...");

  try {
    // Pobierz wszystkich aktywnych terapeutów
    const { data: therapists, error } = await supabase
      .from("therapists")
      .select("*")
      .eq("is_active", true);

    if (error) throw error;

    // Stwórz folder na statyczne strony
    const staticDir = path.join(__dirname, "../dist/therapists");
    await fs.ensureDir(staticDir);

    // Stwórz plik z danymi terapeutów
    const dataFile = path.join(__dirname, "../dist/therapists-data.json");
    await fs.writeJSON(dataFile, therapists, { spaces: 2 });

    // Dla każdego terapeuty stwórz przekierowanie
    for (const therapist of therapists) {
      const therapistHtml = `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${
    therapist.meta_title || therapist.name + " - Psychoterapeuta Warszawa"
  }</title>
  <meta name="description" content="${
    therapist.meta_description || therapist.short_description
  }">
  <meta property="og:title" content="${therapist.name} - Psychoterapeuta">
  <meta property="og:description" content="${therapist.short_description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://profesjonalna-psychoterapia.pl/terapeuta/${
    therapist.slug
  }">
  <link rel="canonical" href="https://profesjonalna-psychoterapia.pl/terapeuta/${
    therapist.slug
  }">
  <script>
    window.__THERAPIST_DATA__ = ${JSON.stringify(therapist)};
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;

      const filePath = path.join(staticDir, `${therapist.slug}.html`);
      await fs.writeFile(filePath, therapistHtml);
      console.log(`✅ Wygenerowano: ${therapist.slug}.html`);
    }

    // Stwórz sitemap.xml
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://profesjonalna-psychoterapia.pl/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://profesjonalna-psychoterapia.pl/terapeuci</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  ${therapists
    .map(
      (t) => `
  <url>
    <loc>https://profesjonalna-psychoterapia.pl/terapeuta/${t.slug}</loc>
    <lastmod>${new Date(t.updated_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("")}
</urlset>`;

    await fs.writeFile(path.join(__dirname, "../dist/sitemap.xml"), sitemap);

    // Stwórz też sitemap index dla Google
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://profesjonalna-psychoterapia.pl/sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`;

    await fs.writeFile(
      path.join(__dirname, "../dist/sitemap-index.xml"),
      sitemapIndex
    );

    console.log("✅ Wszystkie strony wygenerowane!");
    console.log(`📄 Wygenerowano ${therapists.length} stron terapeutów`);
    console.log("🗺️  Sitemap.xml utworzony");
  } catch (error) {
    console.error("❌ Błąd podczas generowania:", error);
    process.exit(1);
  }
}

generateStaticPages();
