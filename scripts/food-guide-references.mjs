// Checked online on this date. Cuisine/location evidence does not confirm today's opening or offers.
export const foodGuideCheckedDate = '2026-10-03';

const references = [
  {
    name: 'La Rondinella Osteria Pop',
    url: 'https://www.la-rondinella.it/osteria-pop/',
    menu: 'https://larondinella.1menu.it/', // Linked by the restaurant's own site.
    it: 'Il sito indica Piazza Spinelli, ai piedi del centro storico. Il menù digitale pubblica proposte à la carte e un percorso degustazione: verifica con il locale cosa è disponibile per la tua serata.',
    pl: 'Strona lokalu wskazuje Piazza Spinelli u podnóża starego miasta. Menu online zawiera dania à la carte i menu degustacyjne; potwierdź z lokalem dostępność na wybrany wieczór.',
    type: 'official',
  },
  {
    name: 'Vitazzurra',
    url: 'https://vitazzurrarestaurant.it/piatti-di-mare/',
    it: 'Il sito del locale descrive pesce alla griglia, pasta ai frutti di mare e fritture di pesce. L’indirizzo indicato è Via Metastasio 3. Chiedi menù e apertura per la data scelta.',
    pl: 'Strona lokalu opisuje ryby z grilla, makarony z owocami morza i smażone ryby. Podany adres to Via Metastasio 3. Sprawdź menu i otwarcie na wybrany dzień.',
    type: 'official',
  },
  {
    name: 'Trattoria Il Gallo Bianco',
    url: 'https://www.tripadvisor.it/Restaurant_Review-g194909-d21256726-Reviews-Gallo_Bianco-Scalea_Province_of_Cosenza_Calabria.html',
    it: 'Il profilo gestito dal locale su Tripadvisor indica cucina italiana, mediterranea e calabrese in località Sant’Angelo. Controlla il tragitto: non è un indirizzo del centro storico.',
    pl: 'Profil zarządzany przez lokal na Tripadvisor podaje kuchnię włoską, śródziemnomorską i kalabryjską w miejscowości Sant’Angelo. Sprawdź dojazd: to nie jest adres na starym mieście.',
    type: 'claimed-profile',
  },
  {
    name: 'La Perla del Tirreno',
    url: 'https://www.tripadvisor.it/Restaurant_Review-g194909-d4555458-Reviews-La_Perla_Del_Tirreno-Scalea_Province_of_Cosenza_Calabria.html',
    it: 'Il profilo gestito dal locale su Tripadvisor indica cucina di pesce su Corso Mediterraneo. Alla verifica riportava anche «chiuso per ferie», oltre agli orari: contatta il locale per confermare la riapertura prima di andarci.',
    pl: 'Profil zarządzany przez lokal na Tripadvisor wskazuje kuchnię rybną przy Corso Mediterraneo. Podczas sprawdzania, obok godzin, widniała też informacja «chiuso per ferie» (przerwa urlopowa). Przed wyjściem potwierdź ponowne otwarcie z lokalem.',
    type: 'claimed-profile',
  },
];

const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

export function renderFoodGuideReferences(lang) {
  const pl = lang === 'pl';
  const title = pl ? 'Sprawdź informacje o lokalach' : 'Controlla i riferimenti dei locali';
  const intro = pl
    ? 'Informacje sprawdzone online 3 października 2026. To pomysły na wybór lokalu, a nie oferty promocyjne. Menu, ceny, godziny i stolik na konkretny dzień potwierdź bezpośrednio z restauracją.'
    : 'Informazioni controllate online il 3 ottobre 2026. Sono idee per scegliere un locale, non offerte promozionali. Conferma direttamente con il ristorante menù, prezzi, apertura e tavolo per la data scelta.';
  return `<aside class="food-references" id="riferimenti-locali" aria-labelledby="food-references-title">
    <h3 id="food-references-title">${title}</h3><p>${intro}</p>
    <ul>${references.map((item) => `<li><strong>${esc(item.name)}</strong><p>${esc(item[lang])}</p>
      <a href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">${item.type === 'official' ? (pl ? 'Strona lokalu' : 'Sito del locale') : (pl ? 'Profil na Tripadvisor' : 'Profilo su Tripadvisor')} <span aria-hidden="true">↗</span></a>
      ${item.menu ? `<a href="${item.menu}" target="_blank" rel="noopener noreferrer">${pl ? 'Menu online' : 'Menù digitale'} <span aria-hidden="true">↗</span></a>` : ''}</li>`).join('')}
    </ul></aside>`;
}

export const foodGuideReferenceStyles = `<style>
  .food-references{margin-top:32px;padding:26px;border:1px solid #cbd5e1;border-radius:24px;background:#f8fafc;color:#0f172a;scroll-margin-top:96px}
  .food-references h3{font-size:24px;line-height:1.2;margin:0 0 14px}
  .food-references p{color:#475569;font-size:14px;line-height:1.7;margin:12px 0}
  .food-references ul{list-style:none;margin:24px 0 0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}
  .food-references li{padding-top:18px;border-top:1px solid #cbd5e1;min-width:0}
  .food-references li>strong{font-size:17px}
  .food-references a{display:inline-flex;align-items:center;gap:8px;min-height:48px;margin-right:18px;color:#3730a3;font-size:14px;font-weight:800;text-decoration:underline;text-underline-offset:4px}
  .food-references a:focus-visible{outline:3px solid #818cf8;outline-offset:3px}
  @media(max-width:700px){.food-references{padding:22px}.food-references ul{grid-template-columns:1fr;gap:18px}}
</style>`;
