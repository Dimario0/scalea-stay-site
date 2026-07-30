import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SEO_LASTMOD = '2026-07-30';
const LANGUAGES = ['ru', 'en', 'it', 'de', 'cs'] as const;

const legacyStructuredDataPatterns = [
  /\s*<!-- Structured Data: VacationRental -->[\s\S]*?<\/script>\s*/i,
  /\s*<!-- Structured Data: FAQ -->[\s\S]*?<\/script>\s*/i,
];

const robotsText = `User-agent: *
Allow: /

Sitemap: https://scaleastay.com/sitemap.xml
`;

const alternateLinks = LANGUAGES
  .map((language) => `    <xhtml:link rel="alternate" hreflang="${language}" href="https://scaleastay.com/${language}/"/>`)
  .join('\n');

const sitemapEntries = LANGUAGES
  .map((language) => `  <url>
    <loc>https://scaleastay.com/${language}/</loc>
${alternateLinks}
    <xhtml:link rel="alternate" hreflang="x-default" href="https://scaleastay.com/ru/"/>
    <lastmod>${SEO_LASTMOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`)
  .join('\n');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries}
</urlset>
`;

const seoBuildCleanup = (): Plugin => ({
  name: 'scaleastay-seo-build-cleanup',
  enforce: 'pre',
  transformIndexHtml(html) {
    return legacyStructuredDataPatterns.reduce(
      (cleanHtml, pattern) => cleanHtml.replace(pattern, '\n'),
      html,
    );
  },
  writeBundle() {
    const outputDirectory = path.resolve(__dirname, 'dist');
    mkdirSync(outputDirectory, { recursive: true });
    writeFileSync(path.join(outputDirectory, 'robots.txt'), robotsText, 'utf8');
    writeFileSync(path.join(outputDirectory, 'sitemap.xml'), sitemapXml, 'utf8');
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      seoBuildCleanup(),
      tailwindcss(),
      react(),
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
