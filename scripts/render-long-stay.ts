import { getWinterNearbyCopy } from '../src/content/winterNearby';
import { renderNearby } from '../src/content/nearbyMarkup';
import { APARTMENTS, CONTACT_INFO } from '../src/constants';
import { CONFIRMED_AMENITIES } from '../src/content/longStay';
import { LONG_STAY_ROUTES, type StayLanguage } from '../src/content/longStayRoutes';
import { getLongStayLanding, getLongStayUi, LONG_STAY_PAGES } from '../src/content/longStayTranslations';

const ORIGIN = 'https://scaleastay.com';
const escape = (text: string) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const photosFor = (language: StayLanguage) => {
  const ui = getLongStayUi(language);
  return [
    { src: APARTMENTS[0].images[2], alt: ui.bedroomAlt, caption: ui.bedroomCaption },
    { src: APARTMENTS[0].images[3], alt: ui.bathroomAlt, caption: ui.bathroomCaption },
    { src: APARTMENTS[0].images[4], alt: ui.terraceAlt, caption: ui.terraceCaption },
  ];
};
export function longStaySchema(language: StayLanguage) {
  const copy = getLongStayLanding(language), canonical = `${ORIGIN}${LONG_STAY_ROUTES[language].path}`;
  return JSON.stringify({
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'WebPage', '@id': `${canonical}#webpage`, url: canonical, name: copy.title, description: copy.description, inLanguage: language, about: { '@id': `${ORIGIN}/#scaleastay-apartment` }, isPartOf: { '@id': `${ORIGIN}/#website` } },
      { '@type': 'Accommodation', '@id': `${ORIGIN}/#scaleastay-apartment`, name: 'ScaleaStay', description: copy.intro, numberOfBedrooms: 1, image: [APARTMENTS[0].images[0], ...photosFor(language).map(photo => new URL(photo.src, ORIGIN).href)], amenityFeature: CONFIRMED_AMENITIES, address: { '@type': 'PostalAddress', streetAddress: 'Via Giuseppe Saragat 11', addressLocality: 'Scalea', addressRegion: 'Calabria', addressCountry: 'IT' }, identifier: { '@type': 'PropertyValue', propertyID: 'CIN', value: 'IT078138C2VN4E3MCD' } },
      { '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'ScaleaStay', item: `${ORIGIN}/${language}/` }, { '@type': 'ListItem', position: 2, name: LONG_STAY_ROUTES[language].label, item: canonical } ] },
      { '@type': 'FAQPage', '@id': `${canonical}#faq`, inLanguage: language, mainEntity: copy.faq.map(({q,a}) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    ],
  }).replaceAll('<', '\\u003c');
}

export const longStayStyles = `<style>
.stay-header-actions{display:flex;align-items:center;gap:24px}.stay-language-picker{position:relative;flex-shrink:0}.stay-language-picker summary{display:flex;align-items:center;gap:8px;padding:10px 12px;border:1px solid #e2e8f0;border-radius:12px;cursor:pointer;list-style:none;font-size:14px;font-weight:700;background:#f8fafc;min-height:44px}.stay-language-picker summary::-webkit-details-marker{display:none}.stay-language-picker summary svg{width:18px;height:18px;flex-shrink:0}.stay-language-picker .stay-chevron{width:14px;transition:transform .15s}.stay-language-picker[open] .stay-chevron{transform:rotate(180deg)}.stay-languages{position:absolute;right:0;top:calc(100% + 8px);z-index:30;width:210px;max-width:calc(100vw - 40px);padding:6px;border:1px solid #e2e8f0;border-radius:16px;background:white;box-shadow:0 12px 32px #0f172a22}.stay-languages a{display:flex;align-items:center;justify-content:space-between;min-height:44px;padding:8px 12px;border-radius:10px;font-size:15px}.stay-languages a:hover{background:#f1f5f9;text-decoration:none}.stay-languages [aria-current="page"]{font-weight:700;color:#4338ca;background:#eef2ff}.stay-languages [aria-current="page"]::after{content:'✓'}.stay-language-picker summary:focus-visible{outline:3px solid #6366f1;outline-offset:4px}@media(max-width:600px){.stay-apartment-link{display:none}.stay-header-actions{gap:0}}
html,body{margin:0;padding:0;background:#f8fafc} .stay-page{hyphens:none}
.stay-page{background:#f8fafc;color:#0f172a;font:16px/1.7 'Roboto',system-ui,sans-serif;overflow-wrap:break-word}
.stay-page *{box-sizing:border-box}.stay-page h1,.stay-page h2,.stay-page h3{font-family:'Playfair Display',Georgia,serif;line-height:1.18;font-weight:700;letter-spacing:-.025em}.stay-page h1{font-size:clamp(2.2rem,4vw,3.5rem);text-wrap:balance;margin:16px 0 24px}.stay-page h2{font-size:clamp(1.8rem,3vw,2.6rem);margin:0 0 24px}.stay-page h3{font-size:1.5rem;margin:0 0 16px}.stay-page p{margin:0 0 20px}.stay-page a{color:inherit;text-decoration:none}.stay-wrap{max-width:1160px;margin:auto;padding:0 24px}.stay-top{background:white;border-bottom:1px solid #e2e8f0}.stay-top .stay-wrap{display:flex;align-items:center;justify-content:space-between;gap:20px;padding-top:20px;padding-bottom:20px}.stay-brand{font-size:22px;font-weight:900}.stay-brand span{color:#4f46e5}.stay-top nav{font-size:14px}.stay-top a:hover,.stay-link:hover{text-decoration:underline}.stay-hero{padding:64px 0 72px;display:grid;grid-template-columns:1.05fr 1fr;align-items:center;gap:48px}.stay-eyebrow{color:#4f46e5;font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.15em}.stay-lead{font-size:18px;color:#475569}.stay-hero img{width:100%;height:520px;object-fit:cover;border-radius:32px}.stay-cta{display:inline-flex;align-items:center;justify-content:center;gap:12px;background:#4f46e5;color:white!important;padding:16px 22px;border-radius:16px;font-weight:700;text-align:center;line-height:1.4;max-width:100%}.stay-cta:hover{background:#4338ca}.stay-page a:focus-visible,.stay-page summary:focus-visible{outline:3px solid #6366f1;outline-offset:5px}.stay-muted{font-size:14px;color:#64748b}.stay-hero .stay-muted{margin-top:14px}.stay-section{padding:64px 0}.stay-white{background:white}.stay-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px}.stay-card{border:1px solid #e2e8f0;padding:28px;border-radius:24px;background:white}.stay-card p{color:#475569;margin-bottom:0}.stay-distance{font-size:30px;color:#4f46e5;font-weight:700;margin-bottom:12px}.stay-link{display:inline-block;color:#4338ca!important;font-weight:700;text-decoration:underline!important;text-underline-offset:4px;margin-top:20px}.stay-offer{background:#eef2ff;border-radius:28px;padding:40px;display:grid;grid-template-columns:1.4fr 1fr;gap:40px;align-items:center}.stay-offer p{color:#475569}.stay-offer .stay-link{display:block}.stay-faq{max-width:860px}.stay-faq details{padding:20px 0;border-bottom:1px solid #e2e8f0}.stay-faq summary{font-weight:700;cursor:pointer;padding-right:16px}.stay-faq details p{color:#475569;margin:16px 0 0}.stay-footer{padding:32px 0;background:#0f172a;color:#cbd5e1;font-size:14px}.stay-footer p{margin-bottom:8px}.stay-links{display:flex;flex-wrap:wrap;gap:12px 28px}.stay-links a{text-decoration:underline;text-underline-offset:4px}
.stay-comfort .stay-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
@media(max-width:760px){.stay-wrap{padding:0 20px}.stay-top .stay-wrap{padding:16px 20px}.stay-hero{grid-template-columns:1fr;padding:40px 0;gap:28px}.stay-hero img{height:300px;order:2}.stay-grid,.stay-comfort .stay-grid,.stay-offer{grid-template-columns:1fr;gap:20px}.stay-section{padding:44px 0}.stay-offer{padding:28px 22px}.stay-card{padding:24px}.stay-top nav{font-size:12px}.stay-cta{width:100%}}
.stay-photos{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px}.stay-photos figure{margin:0}.stay-photos img{display:block;width:100%;height:auto;aspect-ratio:3/4;object-fit:cover;border-radius:24px}.stay-photos figcaption{margin-top:12px;font-weight:700}.stay-photo-section{scroll-margin-top:24px}
@media(max-width:760px){.stay-photos{grid-template-columns:1fr;gap:28px}}
</style>`;

export const renderLongStay = (language: StayLanguage = 'it') => {
  const copy = getLongStayLanding(language), ui = getLongStayUi(language), photos = photosFor(language);
  const winter = getWinterNearbyCopy(language);
  const home = `/${language}/`;
  const apartment = language === 'it' ? '/it/appartamento-scalea-vicino-mare/' : language === 'pl' ? '/pl/apartament-scalea-blisko-morza/' : `${home}#apartments`;
  const inquiry = escape(CONTACT_INFO.whatsappLink(copy.message));
  const cta = () => `<a class="stay-cta" data-source="long_stay_landing" href="${inquiry}" target="_blank" rel="noopener noreferrer">${escape(copy.cta)} <span aria-hidden="true">↗</span></a>`;
  const guides = language === 'it' ? { noCar: '/it/scalea-senza-auto/', noCarLabel: 'Come organizzare un soggiorno a Scalea senza auto', airport: '/it/come-arrivare-da-lamezia-terme-a-scalea/', airportLabel: 'Dall’aeroporto di Lamezia Terme a Scalea' } : language === 'pl' ? { noCar: '/pl/scalea-bez-samochodu/', noCarLabel: 'Jak zaplanować pobyt w Scalei bez samochodu', airport: '/pl/jak-dojechac-z-lamezia-terme-do-scalei/', airportLabel: 'Z lotniska Lamezia Terme do Scalei' } : null;
  return `<div id="root" class="stay-page">
<header class="stay-top"><div class="stay-wrap"><a class="stay-brand" href="${home}">Scalea<span>Stay</span></a><div class="stay-header-actions"><nav class="stay-apartment-link" aria-label="${escape(ui.navigation)}"><a href="${apartment}">${escape(ui.apartment)} →</a></nav><details class="stay-language-picker"><summary aria-label="${escape(ui.languageLabel)}: ${escape(LONG_STAY_ROUTES[language].name)}"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></svg><span>${escape(LONG_STAY_ROUTES[language].name)}</span><svg class="stay-chevron" aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7"><path d="m5 7 5 5 5-5"/></svg></summary><nav class="stay-languages" aria-label="${escape(ui.languageLabel)}">${LONG_STAY_PAGES.map(page => `<a href="${page.path}" lang="${page.language}" hreflang="${page.language}"${page.language === language ? ' aria-current="page"' : ''}>${escape(page.name)}</a>`).join('')}</nav></details></div></div></header>
<main>
<div class="stay-wrap"><section class="stay-hero"><div><p class="stay-eyebrow">${escape(copy.eyebrow)}</p><h1>${escape(copy.h1)}</h1><p class="stay-lead">${escape(copy.intro)}</p>${cta()}<p class="stay-muted">${escape(ui.owner)}</p></div><img src="${escape(APARTMENTS[0].images[0])}" alt="${escape(ui.heroAlt)}" width="600" height="800" fetchpriority="high" referrerpolicy="no-referrer" /></section></div>
<section class="stay-section stay-white stay-comfort"><div class="stay-wrap"><h2>${escape(ui.features)}</h2><div class="stay-grid">${copy.features.map(item=>`<article class="stay-card"><h3>${escape(item.title)}</h3><p>${escape(item.text)}</p></article>`).join('')}</div></div></section>
<section id="foto" class="stay-section stay-white stay-photo-section" aria-labelledby="stay-photo-title"><div class="stay-wrap"><h2 id="stay-photo-title">${escape(ui.photos)}</h2><div class="stay-photos">${photos.map(photo=>`<figure><img src="${escape(photo.src)}" alt="${escape(photo.alt)}" width="600" height="800" loading="lazy" decoding="async" referrerpolicy="no-referrer" /><figcaption>${escape(photo.caption)}</figcaption></figure>`).join('')}</div><a class="stay-link" href="${home}#apartments">${escape(ui.allPhotos)} →</a></div></section>

${renderNearby(language, { winter: true })}
<section class="stay-section stay-white"><div class="stay-wrap"><div class="stay-offer"><div><p class="stay-eyebrow">${escape(ui.offerEyebrow)}</p><h2>${escape(ui.offerTitle)}</h2><p>${escape(ui.offerText)}</p><p class="stay-muted">${escape(ui.terms)}</p></div><div>${cta()}<a class="stay-link" href="#foto">${escape(ui.viewPhotos)} →</a></div></div></div></section>
<section id="daily-essentials" class="stay-section"><div class="stay-wrap"><p class="stay-eyebrow">Via Giuseppe Saragat 11 · Scalea</p><h2>${escape(winter.essentials)}</h2><div class="stay-grid">${[copy.nearby[1], copy.nearby[2], { ...copy.nearby[0], name: winter.seaWalk }].map(item=>`<article class="stay-card"><div class="stay-distance">${escape(item.distance)}</div><h3>${escape(item.name)}</h3><p>${escape(item.text)}</p></article>`).join('')}</div>${guides ? `<a class="stay-link" href="${guides.noCar}">${escape(guides.noCarLabel)} →</a>` : ''}</div></section>
<section id="faq" class="stay-section"><div class="stay-wrap stay-faq"><h2>${escape(ui.faq)}</h2>${copy.faq.map(({q,a})=>`<details><summary>${escape(q)}</summary><p>${escape(a)}</p></details>`).join('')}</div></section>
<section class="stay-section stay-white"><div class="stay-wrap"><h2>${escape(ui.arrival)}</h2><div class="stay-links">${guides ? `<a href="${guides.airport}">${escape(guides.airportLabel)}</a>` : ''}<a href="${apartment}">${escape(ui.details)}</a></div></div></section>
</main><footer class="stay-footer"><div class="stay-wrap"><p>ScaleaStay · Via Giuseppe Saragat 11 · Scalea, Calabria</p><p>CIN: IT078138C2VN4E3MCD</p><a href="${home}">${escape(ui.back)} →</a></div></footer></div>`;
};

// Native details and links also work when JavaScript is disabled.
export const longStayClient = `<script>
(()=>{const picker=document.querySelector('.stay-language-picker');if(!picker)return;
document.addEventListener('click',event=>{if(!picker.contains(event.target))picker.open=false});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&picker.open){picker.open=false;picker.querySelector('summary').focus()}});
})();
</script>`;
