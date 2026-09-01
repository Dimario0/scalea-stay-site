import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const LASTMOD = '2026-09-01';
const canonical = 'https://scaleastay.com/it/dove-mangiare-scalea/';

const esc = (s) => String(s)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const oldPage = {
  title: 'Dove mangiare a Scalea: ristoranti e idee per la sera | ScaleaStay',
  description: 'Guida pratica per mangiare a Scalea: pesce, cucina calabrese, trattorie, pizzerie e locali nel centro storico e vicino al mare.',
  h1: 'Dove mangiare a Scalea: idee per scegliere bene',
  intro: 'A Scalea trovi pesce, cucina calabrese, trattorie, pizzerie e locali per una cena semplice. Invece di una classifica rigida, qui trovi una selezione pratica di nomi da controllare in base a gusto, zona e apertura del giorno.',
  cards: [
    ['Pesce e vista mare', 'La Perla del Tirreno compare stabilmente tra i locali più recensiti per cucina di mare. Per altre opzioni di pesce, le liste 2026 includono anche Vitazzurra e Cimalonga Ristorante.'],
    ['Cucina italiana e calabrese', 'La Rondinella è uno dei nomi con più recensioni; Gallo Bianco e Donna Concetta Vini & Sfizi sono altre opzioni molto apprezzate nelle liste aggiornate 2026.'],
    ['Pizza e cena informale', 'Per una serata più semplice ci sono numerose pizzerie e locali casual. Conviene scegliere anche in base alla zona in cui vuoi passeggiare dopo cena.'],
  ],
  note: 'Ristoranti, gestione, giorni di chiusura e orari cambiano. Prima di uscire verifica sempre apertura e prenotazione per la data specifica.',
  faq: [
    ['Quali ristoranti vale la pena controllare?', 'Tra i nomi che ricorrono nelle liste aggiornate 2026 ci sono La Rondinella, La Perla del Tirreno, Donna Concetta Vini & Sfizi, Gallo Bianco, Vitazzurra e Cimalonga Ristorante.'],
    ['Dove conviene cenare per poi passeggiare?', 'Il centro storico e la zona centrale verso Piazza Caloprese permettono di unire cena e passeggiata. Se preferisci il mare, puoi scegliere un locale più vicino alla costa.'],
    ['È necessario prenotare?', 'In alta stagione è prudente verificare disponibilità, soprattutto la sera e nei weekend.'],
  ],
};

const nextPage = {
  title: 'Dove mangiare a Scalea: ristoranti e trattorie | ScaleaStay',
  description: 'Dove mangiare a Scalea: idee per cena, trattorie e ristoranti, anche economici, tra centro storico e mare, con consigli pratici per scegliere.',
  h1: 'Dove mangiare a Scalea: ristoranti, trattorie e idee per ogni budget',
  intro: 'Cerchi dove mangiare o dove cenare a Scalea? Qui trovi una guida pratica per scegliere tra trattorie, cucina calabrese, pesce, pizza e locali informali, con attenzione anche alle opzioni più economiche e alle zone migliori per continuare la serata a piedi.',
  cards: [
    ['Dove mangiare a Scalea spendendo poco', 'Per spendere meno conviene confrontare menù e formule del giorno tra pizzerie, trattorie e locali informali. I prezzi e le aperture cambiano, quindi verifica sempre il menù aggiornato prima di scegliere.'],
    ['Dove cenare: centro storico o mare?', 'Per abbinare cena e passeggiata, il centro storico e la zona centrale verso Piazza Caloprese sono comodi. Se preferisci il lungomare e una serata vicino alla costa, valuta invece un locale nella zona mare.'],
    ['Trattorie e cucina calabrese', 'La Rondinella, Trattoria Il Gallo Bianco e Donna Concetta Vini & Sfizi ricorrono nelle liste aggiornate 2026 per cucina italiana, mediterranea o locale. Sono nomi utili da controllare in base al tipo di cena che cerchi.'],
    ['Pesce e cucina di mare', 'La Perla del Tirreno è tra i nomi con molte recensioni per cucina di pesce; nelle liste aggiornate compaiono anche Vitazzurra e Cimalonga Ristorante. Verifica sempre menù e apertura del giorno.'],
    ['Pizza e cena informale', 'A Scalea trovi anche pizzerie, pub e locali casual, utili quando vuoi una cena semplice o un pasto veloce. La scelta migliore dipende dalla zona, dal menù del giorno e da quanto vuoi spendere.'],
    ['Come scegliere per stasera', 'Controlla apertura, menù, recensioni recenti e possibilità di prenotazione. In alta stagione o nel weekend è prudente verificare prima, soprattutto per i locali più richiesti.'],
  ],
  note: 'Le indicazioni servono per orientarsi, non sono una classifica. Ristoranti, gestione, prezzi, giorni di chiusura e orari possono cambiare: prima di uscire verifica sempre le informazioni aggiornate per la data specifica.',
  faq: [
    ['Dove mangiare a Scalea spendendo poco?', 'Per una cena più economica confronta menù e formule del giorno di pizzerie, trattorie e locali informali. Evitiamo prezzi fissi perché possono cambiare durante la stagione.'],
    ['Dove cenare a Scalea?', 'Se vuoi proseguire con una passeggiata, puoi orientarti verso il centro storico o la zona centrale di Piazza Caloprese; se preferisci il mare, scegli un locale più vicino alla costa.'],
    ['Dove mangiare nel centro storico di Scalea?', 'Nel borgo e nelle zone centrali trovi ristoranti e locali adatti a combinare cena e passeggiata. Prima di andare controlla apertura e posizione esatta del locale scelto.'],
    ['Quali trattorie e ristoranti calabresi vale la pena controllare?', 'Tra i nomi che ricorrono nelle liste aggiornate 2026 ci sono La Rondinella, Trattoria Il Gallo Bianco e Donna Concetta Vini & Sfizi. La scelta dipende dal menù e dall’apertura del giorno.'],
    ['Dove mangiare pesce a Scalea?', 'La Perla del Tirreno è uno dei nomi con molte recensioni per cucina di mare; nelle liste aggiornate compaiono anche Vitazzurra e Cimalonga Ristorante. Verifica il menù del giorno prima di scegliere.'],
    ['È necessario prenotare?', 'In alta stagione, la sera e nei weekend è prudente controllare disponibilità e prenotare quando possibile.'],
  ],
};

const countOccurrences = (text, needle) => text.split(needle).length - 1;
const replaceExactOnce = (text, oldValue, newValue, label) => {
  const count = countOccurrences(text, oldValue);
  if (count !== 1) throw new Error(`${label}: expected exactly one match, found ${count}`);
  return text.replace(oldValue, newValue);
};

const renderCards = (cards) => cards
  .map(([h, t], i) => `<article class="card"><div class="num">0${i + 1}</div><h2>${esc(h)}</h2><p>${esc(t)}</p></article>`)
  .join('');

const renderFaq = (faq) => faq
  .map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`)
  .join('');

const articleJson = (page) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: page.h1,
  description: page.description,
  inLanguage: 'it',
  author: { '@type': 'Organization', name: 'ScaleaStay' },
  about: { '@type': 'City', name: 'Scalea' },
  mainEntityOfPage: canonical,
});

const faqJson = (page) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: page.faq.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});

const pagePath = path.join(DIST, 'it', 'dove-mangiare-scalea', 'index.html');
let html = readFileSync(pagePath, 'utf8');

html = replaceExactOnce(html, `<title>${esc(oldPage.title)}</title>`, `<title>${esc(nextPage.title)}</title>`, 'title');
html = replaceExactOnce(
  html,
  `<meta name="description" content="${esc(oldPage.description)}">`,
  `<meta name="description" content="${esc(nextPage.description)}">`,
  'meta description',
);
html = replaceExactOnce(
  html,
  `<meta property="og:title" content="${esc(oldPage.title)}">`,
  `<meta property="og:title" content="${esc(nextPage.title)}">`,
  'og:title',
);
html = replaceExactOnce(
  html,
  `<meta property="og:description" content="${esc(oldPage.description)}">`,
  `<meta property="og:description" content="${esc(nextPage.description)}">`,
  'og:description',
);
html = replaceExactOnce(
  html,
  `<script type="application/ld+json">${JSON.stringify(articleJson(oldPage))}</script>`,
  `<script type="application/ld+json">${JSON.stringify(articleJson(nextPage))}</script>`,
  'Article JSON-LD',
);
html = replaceExactOnce(
  html,
  `<script type="application/ld+json">${JSON.stringify(faqJson(oldPage))}</script>`,
  `<script type="application/ld+json">${JSON.stringify(faqJson(nextPage))}</script>`,
  'FAQ JSON-LD',
);
html = replaceExactOnce(html, `<h1>${esc(oldPage.h1)}</h1>`, `<h1>${esc(nextPage.h1)}</h1>`, 'H1');
html = replaceExactOnce(html, `<p>${esc(oldPage.intro)}</p>`, `<p>${esc(nextPage.intro)}</p>`, 'hero intro');

const oldCardsBlock = `<div class="grid">${renderCards(oldPage.cards)}</div><div class="note">${esc(oldPage.note)}</div>`;
const nextCardsBlock = `<div class="grid">${renderCards(nextPage.cards)}</div><div class="note">${esc(nextPage.note)}</div>`;
html = replaceExactOnce(html, oldCardsBlock, nextCardsBlock, 'content cards');

const oldFaqBlock = `<section class="section light"><div class="wrap"><h2 class="title">FAQ</h2>${renderFaq(oldPage.faq)}</div></section>`;
const nextFaqBlock = `<section class="section light"><div class="wrap"><h2 class="title">FAQ</h2>${renderFaq(nextPage.faq)}</div></section>`;
html = replaceExactOnce(html, oldFaqBlock, nextFaqBlock, 'FAQ content');

if (countOccurrences(html, '<h1>') !== 1) throw new Error('Expected exactly one H1 after optimization');
if (!html.includes('Dove mangiare a Scalea spendendo poco')) throw new Error('GSC opportunity section missing');
if (!html.includes('ristoranti, anche economici')) throw new Error('Updated meta description missing');

writeFileSync(pagePath, html, 'utf8');

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

console.log('GSC FOOD GUIDE OPTIMIZATION: PASS');
