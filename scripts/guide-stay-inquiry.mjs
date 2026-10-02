const copy = {
  it: {
    title: 'Cerchi un appartamento a Scalea?',
    text: 'ScaleaStay: una camera da letto, terrazza, cucina e Wi-Fi. Fino a 4 ospiti; spiaggia a 600 m, circa 5–8 minuti a piedi.',
    terms: 'Indica le tue date: il proprietario confermerà disponibilità e prezzo totale su WhatsApp prima della prenotazione.',
    cta: 'Chiedi disponibilità e prezzo', details: 'Foto e dettagli dell’appartamento',
    arrival: 'Arrivo', departure: 'Partenza', guests: 'Ospiti', fallback: 'Preferisci scrivere direttamente? Apri WhatsApp',
  },
  pl: {
    title: 'Szukasz apartamentu w Scalei?',
    text: 'ScaleaStay: jedna sypialnia, taras, kuchnia i Wi-Fi. Do 4 gości; plaża 600 m, około 5–8 minut pieszo.',
    terms: 'Podaj daty: właściciel potwierdzi dostępność i całkowitą cenę na WhatsApp przed rezerwacją.',
    cta: 'Zapytaj o dostępność i cenę', details: 'Zdjęcia i szczegóły apartamentu',
    arrival: 'Przyjazd', departure: 'Wyjazd', guests: 'Goście', fallback: 'Wolisz napisać bezpośrednio? Otwórz WhatsApp',
  },
};
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
export function renderGuideStayInquiry(language, whatsapp) {
  const c = copy[language];
  const details = language === 'pl' ? '/pl/apartament-scalea-blisko-morza/' : '/it/appartamento-scalea-vicino-mare/';
  return `<section class="stay-inquiry" id="guide-stay-inquiry" lang="${language}" aria-labelledby="stay-inquiry-title">
    <div class="stay-inquiry-inner">
      <img src="/images/scaleastay-bedroom-ready.jpg" alt="ScaleaStay" width="800" height="600" loading="lazy">
      <div class="stay-inquiry-copy"><h2 id="stay-inquiry-title">${c.title}</h2><p>${c.text}</p><p id="stay-inquiry-terms">${c.terms}</p>
        <form data-stay-inquiry data-language="${language}" aria-describedby="stay-inquiry-terms">
          <div class="stay-inquiry-fields">
            <label>${c.arrival}<input name="arrival" type="date" required></label>
            <label>${c.departure}<input name="departure" type="date" required></label>
            <label>${c.guests}<select name="guests">${[1,2,3,4].map(n=>`<option value="${n}">${n}</option>`).join('')}</select></label>
          </div>
          <button type="submit">${c.cta}</button>
        </form>
        <a class="stay-inquiry-details" data-analytics-source="guide_stay_inquiry" href="${details}">${c.details} →</a>
        <a class="stay-inquiry-fallback" data-analytics-source="guide_stay_inquiry" href="${escape(whatsapp)}" target="_blank" rel="noopener noreferrer">${c.fallback}</a>
      </div>
    </div>
  </section>`;
}
export const guideStayInquiryStyles = `<style>
.stay-inquiry{padding:32px 20px;background:#eef2ff;color:#0f172a}
.stay-inquiry-inner{max-width:1120px;margin:auto;display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:28px;align-items:center}
.stay-inquiry img{width:100%;height:100%;max-height:440px;object-fit:cover;border-radius:24px}
.stay-inquiry h2{font-size:clamp(24px,3vw,34px);line-height:1.15;margin:0 0 16px;letter-spacing:-.03em;text-transform:none}
.stay-inquiry p{font-size:15px;line-height:1.6;margin:0 0 12px;max-width:100%}
.stay-inquiry-fields{display:grid;grid-template-columns:1fr 1fr .65fr;gap:10px;margin:18px 0 12px}
.stay-inquiry label{display:flex;flex-direction:column;gap:6px;font-size:13px;font-weight:700;min-width:0}
.stay-inquiry input,.stay-inquiry select{min-width:0;width:100%;min-height:48px;border:1px solid #c7d2fe;border-radius:10px;padding:10px;background:white;color:#0f172a;font:inherit;box-sizing:border-box}
.stay-inquiry button{display:block;width:100%;min-height:52px;padding:12px;border:0;border-radius:12px;background:#4338ca;color:white;font:inherit;font-weight:800;cursor:pointer}
.stay-inquiry-details,.stay-inquiry-fallback{display:block;margin-top:14px;font-size:14px;font-weight:700;text-decoration:underline;text-underline-offset:3px}
.stay-inquiry-fallback{font-size:13px;font-weight:500}
.stay-inquiry input:focus-visible,.stay-inquiry select:focus-visible,.stay-inquiry button:focus-visible,.stay-inquiry a:focus-visible{outline:3px solid #2563eb;outline-offset:3px}
@media(max-width:700px){.stay-inquiry-inner{grid-template-columns:1fr;gap:20px}.stay-inquiry img{max-height:230px;aspect-ratio:4/3}.stay-inquiry-fields{grid-template-columns:1fr 1fr}.stay-inquiry-fields label:last-child{grid-column:1/-1}}
</style>`;
