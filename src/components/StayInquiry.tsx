import React, { useEffect } from 'react';

const COPY = {
  it: {
    title: 'Quali date hai in mente?',
    text: 'Indica le date e il numero di ospiti per chiedere disponibilità e prezzo totale al proprietario.',
    arrival: 'Arrivo', departure: 'Partenza', guests: 'Ospiti',
    cta: 'Continua su WhatsApp',
    terms: 'Si apre WhatsApp con la richiesta compilata: invia tu il messaggio. Le date e il prezzo devono essere confermati dal proprietario; questa richiesta non è una prenotazione.',
    direct: 'Preferisci scrivere direttamente?',
  },
  pl: {
    title: 'Jaki termin Cię interesuje?',
    text: 'Podaj daty i liczbę gości, aby zapytać właściciela o dostępność i całkowitą cenę.',
    arrival: 'Przyjazd', departure: 'Wyjazd', guests: 'Goście',
    cta: 'Przejdź do WhatsApp',
    terms: 'WhatsApp otworzy się z gotowym zapytaniem: samodzielnie wyślij wiadomość. Właściciel musi potwierdzić termin i cenę; zapytanie nie jest rezerwacją.',
    direct: 'Wolisz napisać bezpośrednio?',
  },
};

const StayInquiry: React.FC<{ language: 'it' | 'pl'; whatsappUrl: string }> = ({ language, whatsappUrl }) => {
  const copy = COPY[language];
  useEffect(() => {
    document.dispatchEvent(new CustomEvent('scaleastay:stay-inquiry-mount'));
  }, [language]);

  const fieldClass = 'mt-2 block w-full min-w-0 rounded-xl border border-slate-300 bg-white px-3 py-3 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600';
  return (
    <section id="apartment-stay-inquiry" className="scroll-mt-24 px-4 py-12 bg-indigo-50 text-slate-900">
      <div className="max-w-5xl mx-auto rounded-3xl border border-indigo-100 bg-white p-5 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight hyphens-none">{copy.title}</h2>
        <p className="mt-3 max-w-2xl text-slate-600 leading-relaxed">{copy.text}</p>
        <form data-stay-inquiry data-language={language} data-analytics-source="apartment_stay_inquiry" aria-describedby="apartment-stay-inquiry-terms" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className="min-w-0 font-bold text-sm">{copy.arrival}
            <input type="date" name="arrival" required className={fieldClass} />
          </label>
          <label className="min-w-0 font-bold text-sm">{copy.departure}
            <input type="date" name="departure" required className={fieldClass} />
          </label>
          <label className="min-w-0 font-bold text-sm">{copy.guests}
            <select name="guests" defaultValue="2" required className={fieldClass}>
              {[1, 2, 3, 4].map(count => <option key={count} value={count}>{count}</option>)}
            </select>
          </label>
          <button type="submit" className="min-h-12 rounded-xl bg-indigo-600 px-5 py-4 font-bold text-white hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-span-2 lg:col-span-3">{copy.cta} →</button>
        </form>
        <p id="apartment-stay-inquiry-terms" className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">{copy.terms}</p>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" data-analytics-source="apartment_stay_inquiry" className="mt-4 inline-block py-2 text-sm font-bold text-indigo-700 underline underline-offset-4">{copy.direct}</a>
      </div>
    </section>
  );
};

export default StayInquiry;
