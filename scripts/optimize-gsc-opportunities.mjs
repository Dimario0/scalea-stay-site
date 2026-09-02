import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const LASTMOD = '2026-09-02';
const ORIGIN = 'https://scaleastay.com';
const canonical = `${ORIGIN}/it/dove-mangiare-scalea/`;
const sibling = `${ORIGIN}/pl/gdzie-zjesc-scalea/`;
const whatsapp = 'https://wa.me/420774620060';

const esc = (s) => String(s)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const page = {
  title: 'Dove mangiare a Scalea: ristoranti e trattorie | ScaleaStay',
  description: 'Dove mangiare a Scalea: idee per cena, trattorie e ristoranti, anche economici, tra centro storico e mare, con consigli pratici per scegliere.',
  eyebrow: 'Scalea • Calabria • Sapori locali',
  h1: 'Dove mangiare a Scalea: ristoranti, trattorie e idee per ogni budget',
  intro: 'Cerchi dove mangiare o dove cenare a Scalea? Qui trovi una guida pratica per scegliere tra trattorie, cucina calabrese, pesce, pizza e locali informali, con attenzione anche alle opzioni più economiche e alle zone migliori per continuare la serata a piedi.',
  heroImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=84',
  chips: ['Trattorie e cucina calabrese', 'Centro storico o mare', 'Opzioni per ogni budget'],
  cards: [
    ['Dove mangiare a Scalea spendendo poco', 'Per spendere meno conviene confrontare menù e formule del giorno tra pizzerie, trattorie e locali informali. I prezzi e le aperture cambiano, quindi verifica sempre il menù aggiornato prima di scegliere.'],
    ['Dove cenare: centro storico o mare?', 'Per abbinare cena e passeggiata, il centro storico e la zona centrale verso Piazza Caloprese sono comodi. Se preferisci il lungomare e una serata vicino alla costa, valuta invece un locale nella zona mare.'],
    ['Trattorie e cucina calabrese', 'La Rondinella, Trattoria Il Gallo Bianco e Donna Concetta Vini & Sfizi sono nomi utili da controllare quando cerchi cucina italiana, mediterranea o locale. Scegli in base al menù e all’apertura del giorno.'],
    ['Pesce e cucina di mare', 'La Perla del Tirreno è uno dei nomi da controllare per cucina di pesce; tra le alternative locali compaiono anche Vitazzurra e Cimalonga Ristorante. Verifica sempre menù e apertura del giorno.'],
    ['Pizza e cena informale', 'A Scalea trovi anche pizzerie, pub e locali casual, utili quando vuoi una cena semplice o un pasto veloce. La scelta migliore dipende dalla zona, dal menù del giorno e da quanto vuoi spendere.'],
    ['Come scegliere per stasera', 'Controlla apertura, menù, recensioni recenti e possibilità di prenotazione. In alta stagione o nel weekend è prudente verificare prima, soprattutto per i locali più richiesti.'],
  ],
  note: 'Le indicazioni servono per orientarsi, non sono una classifica. Ristoranti, gestione, prezzi, giorni di chiusura e orari possono cambiare: prima di uscire verifica sempre le informazioni aggiornate per la data specifica.',
  faq: [
    ['Dove mangiare a Scalea spendendo poco?', 'Per una cena più economica confronta menù e formule del giorno di pizzerie, trattorie e locali informali. Evitiamo prezzi fissi perché possono cambiare durante la stagione.'],
    ['Dove cenare a Scalea?', 'Se vuoi proseguire con una passeggiata, puoi orientarti verso il centro storico o la zona centrale di Piazza Caloprese; se preferisci il mare, scegli un locale più vicino alla costa.'],
    ['Dove mangiare nel centro storico di Scalea?', 'Nel borgo e nelle zone centrali trovi ristoranti e locali adatti a combinare cena e passeggiata. Prima di andare controlla apertura e posizione esatta del locale scelto.'],
    ['Quali trattorie e ristoranti calabresi vale la pena controllare?', 'Tra i nomi da controllare ci sono La Rondinella, Trattoria Il Gallo Bianco e Donna Concetta Vini & Sfizi. La scelta dipende dal menù e dall’apertura del giorno.'],
    ['Dove mangiare pesce a Scalea?', 'La Perla del Tirreno è uno dei nomi da controllare per cucina di mare; tra le alternative locali compaiono anche Vitazzurra e Cimalonga Ristorante. Verifica il menù del giorno prima di scegliere.'],
    ['È necessario prenotare?', 'In alta stagione, la sera e nei weekend è prudente controllare disponibilità e prenotare quando possibile.'],
  ],
};

const articleJson = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: page.h1,
  description: page.description,
  inLanguage: 'it',
  author: { '@type': 'Organization', name: 'ScaleaStay' },
  about: { '@type': 'City', name: 'Scalea' },
  mainEntityOfPage: canonical,
};

const faqJson = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: page.faq.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const cards = page.cards.map(([h, t], i) => `
  <article class="card">
    <div class="num">0${i + 1}</div>
    <h2>${esc(h)}</h2>
    <p>${esc(t)}</p>
  </article>`).join('');

const faqs = page.faq.map(([q, a]) => `
  <details>
    <summary>${esc(q)}</summary>
    <p>${esc(a)}</p>
  </details>`).join('');

const chips = page.chips.map((chip) => `<div class="trust-chip"><span class="dot"></span>${esc(chip)}</div>`).join('');

const html = `<!doctype html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="it" href="${canonical}">
  <link rel="alternate" hreflang="pl" href="${sibling}">
  <link rel="alternate" hreflang="x-default" href="${canonical}">
  <meta property="og:title" content="${esc(page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:image" content="${page.heroImage}">
  <script type="application/ld+json">${JSON.stringify(articleJson)}</script>
  <script type="application/ld+json">${JSON.stringify(faqJson)}</script>
  <style>
    *{box-sizing:border-box}
    html{scroll-behavior:smooth;background:#020617}
    body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#0f172a;background:#fff;-webkit-font-smoothing:antialiased}
    a{color:inherit;text-decoration:none}
    .wrap{width:min(1180px,calc(100% - 40px));margin:0 auto}
    .nav{position:absolute;top:0;left:0;right:0;z-index:20;padding:24px 0}
    .nav-shell{min-height:80px;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;gap:18px;border:1px solid rgba(255,255,255,.15);border-radius:36px;background:rgba(2,6,23,.46);backdrop-filter:blur(18px);box-shadow:0 24px 60px rgba(0,0,0,.20)}
    .brand{display:flex;align-items:center;gap:14px;font-size:24px;font-weight:900;letter-spacing:-.03em;color:white}
    .brand-mark{width:48px;height:48px;border-radius:16px;background:#4f46e5;display:grid;place-items:center;box-shadow:0 12px 30px rgba(79,70,229,.34)}
    .brand-mark svg{width:26px;height:26px}
    .brand span{color:#818cf8}
    .nav-actions{display:flex;align-items:center;gap:10px}
    .lang,.nav-cta{border-radius:16px;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.14em;transition:.2s ease}
    .lang{padding:14px 16px;color:white;border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.08)}
    .nav-cta{padding:14px 20px;background:white;color:#4f46e5}
    .hero{position:relative;min-height:780px;display:flex;align-items:center;justify-content:center;overflow:hidden;background:#020617;padding:142px 0 82px}
    .hero-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
    .overlay-1{position:absolute;inset:0;background:rgba(2,6,23,.50)}
    .overlay-2{position:absolute;inset:0;background:linear-gradient(180deg,rgba(2,6,23,.72) 0%,rgba(2,6,23,.24) 45%,#020617 100%)}
    .hero-body{position:relative;z-index:2;text-align:center;color:white;max-width:1020px;margin:0 auto}
    .badge{display:inline-flex;align-items:center;gap:9px;padding:11px 18px;border-radius:18px;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.20);backdrop-filter:blur(14px);font-size:11px;font-weight:900;letter-spacing:.28em;text-transform:uppercase;margin-bottom:26px}
    .badge .dot{width:8px;height:8px;border-radius:999px;background:#818cf8;box-shadow:0 0 0 5px rgba(129,140,248,.16)}
    h1{margin:0 auto 26px;max-width:1040px;font-size:clamp(40px,4.8vw,68px);line-height:.98;letter-spacing:-.055em;font-weight:900;text-transform:uppercase;text-wrap:balance;text-shadow:0 12px 34px rgba(0,0,0,.38)}
    .lead{max-width:820px;margin:0 auto 34px;color:rgba(255,255,255,.88);font-size:clamp(17px,1.7vw,22px);line-height:1.62;font-weight:600;text-wrap:pretty}
    .cta-row{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;margin-bottom:30px}
    .cta{display:inline-flex;align-items:center;justify-content:center;min-height:58px;padding:0 28px;border-radius:24px;font-size:15px;font-weight:900;transition:.2s ease}
    .cta.primary{background:white;color:#0f172a;box-shadow:0 18px 45px rgba(255,255,255,.14)}
    .cta.secondary{border:2px solid rgba(255,255,255,.38);color:white;background:rgba(255,255,255,.06);backdrop-filter:blur(12px)}
    .trust{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;max-width:880px;margin:0 auto}
    .trust-chip{min-height:52px;padding:11px 16px;border:1px solid rgba(255,255,255,.14);border-radius:18px;background:rgba(2,6,23,.40);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;gap:10px;color:rgba(255,255,255,.90);font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.10em}
    .trust-chip .dot{width:8px;height:8px;background:#818cf8;border-radius:50%;flex:0 0 auto}
    .content{padding:84px 0 92px;background:white}
    .section-head{text-align:center;max-width:820px;margin:0 auto 42px}
    .kicker{color:#6366f1;font-size:11px;font-weight:900;letter-spacing:.34em;text-transform:uppercase;margin-bottom:12px}
    .section-head h2{margin:0;font-size:clamp(34px,4vw,52px);line-height:1;letter-spacing:-.045em;font-weight:900;text-transform:uppercase;text-wrap:balance}
    .grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
    .card{min-height:275px;padding:30px;border-radius:28px;background:#f8fafc;border:1px solid #e2e8f0;box-shadow:0 12px 35px rgba(15,23,42,.04)}
    .num{font-size:12px;font-weight:900;letter-spacing:.22em;color:#6366f1}
    .card h2{font-size:23px;line-height:1.12;letter-spacing:-.025em;margin:18px 0 13px;color:#0f172a}
    .card p{margin:0;color:#64748b;font-size:15px;line-height:1.72;font-weight:500}
    .note{margin-top:22px;padding:23px 26px;border-radius:24px;background:#eef2ff;border:1px solid #c7d2fe;color:#3730a3;font-size:14px;line-height:1.7;font-weight:700}
    .faq{padding:84px 0;background:#f8fafc;border-top:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0}
    .faq-grid{max-width:920px;margin:0 auto}
    details{background:white;border:1px solid #e2e8f0;border-radius:22px;padding:21px 24px;margin:12px 0;box-shadow:0 10px 28px rgba(15,23,42,.035)}
    summary{cursor:pointer;font-size:16px;font-weight:900;color:#0f172a;list-style:none}
    summary::-webkit-details-marker{display:none}
    details p{margin:14px 0 0;color:#64748b;font-size:15px;line-height:1.72}
    .related{padding:74px 0;background:#020617;color:white}
    .related-head{text-align:center;margin-bottom:28px}
    .related-head h2{font-size:clamp(30px,3.5vw,46px);margin:8px 0 0;letter-spacing:-.04em;text-transform:uppercase}
    .links{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
    .rel{padding:22px;border:1px solid rgba(255,255,255,.10);border-radius:22px;background:rgba(255,255,255,.05);font-weight:900;display:flex;align-items:center;justify-content:space-between;gap:14px;color:#e2e8f0}
    .rel span{color:#818cf8;font-size:22px}
    footer{background:#0f172a;color:#64748b;text-align:center;padding:32px 20px 46px;font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}
    @media(max-width:900px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}.hero{min-height:720px}.trust{grid-template-columns:1fr}.links{grid-template-columns:1fr}}
    @media(max-width:640px){.wrap{width:min(100% - 28px,1180px)}.nav{padding-top:14px}.nav-shell{min-height:68px;padding:8px 10px;border-radius:28px}.brand-mark{width:42px;height:42px;border-radius:14px}.brand{font-size:20px;gap:10px}.nav-cta{display:none}.lang{padding:12px 14px}.hero{min-height:760px;padding-top:122px}.badge{font-size:9px;letter-spacing:.2em}.lead{font-size:16px}.cta{width:100%;min-height:56px}.grid{grid-template-columns:1fr}.content,.faq{padding:64px 0}.card{min-height:0;padding:25px}.section-head{margin-bottom:30px}}
  </style>
</head>
<body>
  <header class="nav">
    <div class="wrap nav-shell">
      <a class="brand" href="/it/" aria-label="ScaleaStay">
        <span class="brand-mark" aria-hidden="true">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0 7-7 7 7M5 10v10a1 1 0 001 1h3m10-11 2 2m-2-2v10a1 1 0 01-1 1h-3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"/></svg>
        </span>
        <span style="color:white">Scalea<span>Stay</span></span>
      </a>
      <div class="nav-actions">
        <a class="lang" href="/pl/gdzie-zjesc-scalea/">PL</a>
        <a class="nav-cta" href="${whatsapp}" rel="noopener">WhatsApp</a>
      </div>
    </div>
  </header>

  <main>
    <section class="hero">
      <img class="hero-bg" src="${page.heroImage}" alt="Ristorante a Scalea">
      <div class="overlay-1"></div><div class="overlay-2"></div>
      <div class="wrap hero-body">
        <div class="badge"><span class="dot"></span>${esc(page.eyebrow)}</div>
        <h1>${esc(page.h1)}</h1>
        <p class="lead">${esc(page.intro)}</p>
        <div class="cta-row">
          <a class="cta primary" href="/it/appartamento-scalea-vicino-mare/">Scopri ScaleaStay</a>
          <a class="cta secondary" href="${whatsapp}" rel="noopener">Verifica le date su WhatsApp</a>
        </div>
        <div class="trust">${chips}</div>
      </div>
    </section>

    <section class="content">
      <div class="wrap">
        <div class="section-head">
          <div class="kicker">ScaleaStay • Guida locale</div>
          <h2>Come scegliere dove mangiare a Scalea</h2>
        </div>
        <div class="grid">${cards}</div>
        <div class="note">${esc(page.note)}</div>
      </div>
    </section>

    <section class="faq">
      <div class="wrap">
        <div class="section-head">
          <div class="kicker">Domande frequenti</div>
          <h2>FAQ su ristoranti e cena a Scalea</h2>
        </div>
        <div class="faq-grid">${faqs}</div>
      </div>
    </section>

    <section class="related">
      <div class="wrap">
        <div class="related-head">
          <div class="kicker">ScaleaStay • Guide</div>
          <h2>Continua a scoprire Scalea</h2>
        </div>
        <div class="links">
          <a class="rel" href="/it/centro-storico-scalea-sera/">Centro storico e passeggiata <span>→</span></a>
          <a class="rel" href="/it/spiagge-scalea/">Spiagge di Scalea <span>→</span></a>
          <a class="rel" href="/it/scalea-senza-auto/">Scalea senza auto <span>→</span></a>
        </div>
      </div>
    </section>
  </main>

  <footer>ScaleaStay · Via Giuseppe Saragat 11 · Scalea, Calabria</footer>
</body>
</html>`;

const pagePath = path.join(DIST, 'it', 'dove-mangiare-scalea', 'index.html');
writeFileSync(pagePath, html, 'utf8');

if ((html.match(/<h1>/g) || []).length !== 1) throw new Error('Expected exactly one H1');
if (!html.includes('Dove mangiare a Scalea spendendo poco')) throw new Error('GSC opportunity section missing');
if (!html.includes('ristoranti, anche economici')) throw new Error('Updated meta description missing');
if (!html.includes('ScaleaStay • Guida locale')) throw new Error('ScaleaStay visual template missing');

const sitemapPath = path.join(DIST, 'sitemap.xml');
let sitemap = readFileSync(sitemapPath, 'utf8');
const entryStart = sitemap.indexOf(`<loc>${canonical}</loc>`);
if (entryStart === -1) throw new Error('Sitemap entry for food guide not found');
const entryEnd = sitemap.indexOf('</url>', entryStart);
if (entryEnd === -1) throw new Error('Sitemap entry is incomplete');
const entry = sitemap.slice(entryStart, entryEnd);
const lastmodMatch = entry.match(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g);
if (!lastmodMatch || lastmodMatch.length !== 1) throw new Error('Expected one lastmod in food guide sitemap entry');
const updatedEntry = entry.replace(lastmodMatch[0], `<lastmod>${LASTMOD}</lastmod>`);
sitemap = sitemap.slice(0, entryStart) + updatedEntry + sitemap.slice(entryEnd);
writeFileSync(sitemapPath, sitemap, 'utf8');

console.log('GSC FOOD GUIDE OPTIMIZATION + SCALEASTAY VISUAL ALIGNMENT: PASS');
