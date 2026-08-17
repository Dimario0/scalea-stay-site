import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Car, CheckCircle2, MapPin, MessageCircle, ShoppingBasket, TrainFront, Waves } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { trackEvent } from '../analytics';

type LandingCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  apartmentTitle: string;
  apartmentText: string;
  locationTitle: string;
  locationText: string;
  directTitle: string;
  directText: string;
  directPoints: [string, string, string];
  faqTitle: string;
  faq: Array<{ q: string; a: string }>;
  seoTitle: string;
  seoDescription: string;
  canonicalPath: string;
};

const COPY: Record<'it' | 'pl', LandingCopy> = {
  it: {
    eyebrow: 'Scalea • Calabria • Riviera dei Cedri',
    title: 'Appartamento a Scalea vicino al mare',
    subtitle: 'ScaleaStay è un appartamento moderno in una zona comoda di Scalea: spiaggia, Interspar, stazione e centro sono raggiungibili a piedi.',
    cta: 'Verifica le date su WhatsApp',
    apartmentTitle: 'Una base comoda per la vacanza in Calabria',
    apartmentText: 'L’appartamento è luminoso e accogliente, con aria condizionata, cucina attrezzata, terrazza e parcheggio. Ospita fino a 4 persone ed è adatto sia a soggiorni brevi sia a vacanze più lunghe.',
    locationTitle: 'Mare e servizi quotidiani a pochi minuti',
    locationText: 'La posizione permette di vivere Scalea con semplicità: il mare è vicino, il supermercato è a pochi minuti e anche la stazione ferroviaria è raggiungibile a piedi. Il centro storico e Torre Talao sono comodi per una passeggiata serale.',
    directTitle: 'Contatto diretto con il proprietario',
    directText: 'Per conoscere disponibilità e condizioni del soggiorno puoi scrivere direttamente su WhatsApp. Ricevi una risposta sulle date senza dover cercare il contatto su altre piattaforme.',
    directPoints: ['Controllo rapido delle date', 'Contatto diretto', 'Informazioni pratiche prima dell’arrivo'],
    faqTitle: 'Domande frequenti su ScaleaStay',
    faq: [
      { q: 'Quanto dista la spiaggia?', a: 'La spiaggia più vicina è a circa 600 m, normalmente 5–8 minuti a piedi.' },
      { q: 'C’è un supermercato vicino?', a: 'Sì. Interspar si trova a circa 230 m, circa 3 minuti a piedi.' },
      { q: 'Si può arrivare in treno?', a: 'Sì. La stazione Scalea–Santa Domenica Talao è a circa 500 m, circa 8 minuti a piedi.' },
      { q: 'È disponibile il parcheggio?', a: 'Sì, per gli ospiti di ScaleaStay è disponibile il parcheggio.' },
    ],
    seoTitle: 'Appartamento a Scalea vicino al mare | ScaleaStay',
    seoDescription: 'Appartamento a Scalea in Calabria con spiaggia a circa 600 m, Interspar a 230 m, stazione a 500 m, aria condizionata, cucina, terrazza e parcheggio. Verifica le date su WhatsApp.',
    canonicalPath: '/it/appartamento-scalea-vicino-mare/',
  },
  pl: {
    eyebrow: 'Scalea • Kalabria • Riviera dei Cedri',
    title: 'Apartament w Scalei blisko morza',
    subtitle: 'ScaleaStay to nowoczesny apartament w wygodnej części Scalei. Plaża, Interspar, dworzec i centrum są dostępne pieszo.',
    cta: 'Sprawdź terminy na WhatsApp',
    apartmentTitle: 'Wygodna baza na wakacje w Kalabrii',
    apartmentText: 'Jasny i przytulny apartament z klimatyzacją, wyposażoną kuchnią, tarasem i parkingiem. Może pomieścić do 4 gości i sprawdzi się zarówno na krótki wyjazd, jak i dłuższy urlop.',
    locationTitle: 'Morze i codzienne zakupy w zasięgu spaceru',
    locationText: 'Lokalizacja ułatwia pobyt bez ciągłego korzystania z samochodu: plaża jest blisko, Interspar kilka minut od apartamentu, a na dworzec można dojść pieszo. Historyczne centrum i Torre Talao są dobrym celem na wieczorny spacer.',
    directTitle: 'Bezpośredni kontakt z właścicielem',
    directText: 'Dostępność i warunki pobytu możesz szybko sprawdzić przez WhatsApp. Otrzymasz informację o terminach bez szukania kontaktu na innych platformach.',
    directPoints: ['Szybkie sprawdzenie terminów', 'Bezpośredni kontakt', 'Praktyczne informacje przed przyjazdem'],
    faqTitle: 'Najczęstsze pytania o ScaleaStay',
    faq: [
      { q: 'Jak daleko jest do plaży?', a: 'Najbliższa plaża znajduje się około 600 m od apartamentu — zwykle 5–8 minut pieszo.' },
      { q: 'Czy w pobliżu jest supermarket?', a: 'Tak. Interspar znajduje się około 230 m od ScaleaStay, czyli około 3 minuty pieszo.' },
      { q: 'Czy można przyjechać pociągiem?', a: 'Tak. Dworzec Scalea–Santa Domenica Talao jest około 500 m od apartamentu, mniej więcej 8 minut pieszo.' },
      { q: 'Czy jest parking?', a: 'Tak, dla gości ScaleaStay dostępny jest parking.' },
    ],
    seoTitle: 'Apartament w Scalei blisko morza | ScaleaStay',
    seoDescription: 'Apartament w Scalei w Kalabrii: plaża około 600 m, Interspar 230 m, dworzec 500 m, klimatyzacja, kuchnia, taras i parking. Sprawdź wolne terminy przez WhatsApp.',
    canonicalPath: '/pl/apartament-scalea-blisko-morza/',
  },
};

const setDescription = (value: string) => {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (meta) meta.setAttribute('content', value);
};

const setCanonical = (value: string) => {
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', value);
};

const CommercialLanding: React.FC = () => {
  const { language, t } = useLanguage();
  const { data } = useSiteData();
  const navigate = useNavigate();

  const supportedLanguage: 'it' | 'pl' | null = language === 'it' || language === 'pl' ? language : null;
  const copy = supportedLanguage ? COPY[supportedLanguage] : COPY.it;

  useEffect(() => {
    if (!supportedLanguage) {
      navigate(`/${language}/`, { replace: true });
      return;
    }

    const expectedPath = copy.canonicalPath;
    if (window.location.pathname !== expectedPath) {
      navigate(expectedPath, { replace: true });
      return;
    }

    const canonicalUrl = `https://scaleastay.com${expectedPath}`;
    document.title = copy.seoTitle;
    setDescription(copy.seoDescription);
    setCanonical(canonicalUrl);

    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (ogTitle) ogTitle.setAttribute('content', copy.seoTitle);
    if (ogDescription) ogDescription.setAttribute('content', copy.seoDescription);
    if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);
  }, [copy, language, navigate, supportedLanguage]);

  if (!supportedLanguage) return null;

  const apartment = data.apartments[0];
  const images = apartment?.images?.filter(Boolean).slice(0, 3) || [];
  const whatsappUrl = CONTACT_INFO.whatsappLink(t('apartmentBookingMsg').replace('{name}', 'ScaleaStay'));

  const facts = supportedLanguage === 'it'
    ? [
        { icon: Waves, label: 'Spiaggia', value: '600 m · 5–8 min' },
        { icon: ShoppingBasket, label: 'Interspar', value: '230 m · 3 min' },
        { icon: TrainFront, label: 'Stazione', value: '500 m · 8 min' },
        { icon: MapPin, label: 'Centro storico', value: '950 m · 13 min' },
      ]
    : [
        { icon: Waves, label: 'Plaża', value: '600 m · 5–8 min' },
        { icon: ShoppingBasket, label: 'Interspar', value: '230 m · 3 min' },
        { icon: TrainFront, label: 'Dworzec', value: '500 m · 8 min' },
        { icon: MapPin, label: 'Stare miasto', value: '950 m · 13 min' },
      ];

  return (
    <div className="min-h-[100dvh] bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <a href={`/${language}/`} className="font-black text-xl tracking-tight text-slate-950">
            Scalea<span className="text-indigo-600">Stay</span>
          </a>
          <div className="flex items-center gap-3">
            <LanguageSwitcher scrolled />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { source: 'commercial_landing_header', language })}
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-xs font-black uppercase tracking-wider text-white"
            >
              WhatsApp <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="bg-slate-950 text-white px-4 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
            <div>
              <p className="text-indigo-300 text-xs font-black uppercase tracking-[0.28em] mb-5">{copy.eyebrow}</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.98] mb-6">{copy.title}</h1>
              <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-8">{copy.subtitle}</p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { source: 'commercial_landing_hero', language })}
                className="inline-flex items-center gap-3 rounded-2xl bg-indigo-600 px-6 py-4 font-black text-white shadow-xl active:scale-95"
              >
                <MessageCircle className="w-5 h-5" /> {copy.cta}
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {images.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`ScaleaStay ${index + 1}`}
                  className={`w-full object-cover rounded-3xl ${index === 0 ? 'col-span-2 h-64 sm:h-80' : 'h-40 sm:h-48'}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 border-b border-slate-100">
          <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:p-5">
                <Icon className="w-5 h-5 text-indigo-600 mb-3" />
                <p className="text-xs font-black uppercase tracking-wider text-slate-500">{label}</p>
                <p className="mt-1 text-sm sm:text-base font-black text-slate-950">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="apartments" className="px-4 py-16">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mb-5">{copy.apartmentTitle}</h2>
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg">{copy.apartmentText}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['Klimatyzacja / Aria condizionata', 'Kuchnia / Cucina', 'Taras / Terrazza', 'Parking'].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-100 p-5 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-sm font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 bg-sky-50/70">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mb-5">{copy.locationTitle}</h2>
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg">{copy.locationText}</p>
            </div>
            <div className="rounded-3xl bg-white p-6 border border-sky-100 shadow-sm">
              <div className="flex gap-4 mb-5"><Waves className="w-6 h-6 text-cyan-600" /><span className="font-black">600 m</span></div>
              <div className="flex gap-4 mb-5"><ShoppingBasket className="w-6 h-6 text-indigo-600" /><span className="font-black">Interspar · 230 m</span></div>
              <div className="flex gap-4 mb-5"><TrainFront className="w-6 h-6 text-indigo-600" /><span className="font-black">Scalea station · 500 m</span></div>
              <div className="flex gap-4"><Car className="w-6 h-6 text-slate-600" /><span className="font-black">Parking</span></div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 bg-slate-950 text-white">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mb-5">{copy.directTitle}</h2>
              <p className="text-slate-300 leading-relaxed text-base sm:text-lg">{copy.directText}</p>
            </div>
            <div>
              <div className="space-y-3 mb-6">
                {copy.directPoints.map((point) => (
                  <div key={point} className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-4 py-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="font-bold">{point}</span>
                  </div>
                ))}
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { source: 'commercial_landing_direct', language })}
                className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-6 py-4 font-black text-white"
              >
                <MessageCircle className="w-5 h-5" /> {copy.cta}
              </a>
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tighter text-center mb-8">{copy.faqTitle}</h2>
            <div className="space-y-3">
              {copy.faq.map((item) => (
                <div key={item.q} className="rounded-2xl border border-slate-100 p-5 sm:p-6">
                  <h3 className="font-black text-slate-950 mb-2">{item.q}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="px-4 py-8 border-t border-slate-100 text-center text-xs font-bold text-slate-500">
        ScaleaStay · Via Giuseppe Saragat 11 · 87029 Scalea (CS), Italia
      </footer>
    </div>
  );
};

export default CommercialLanding;
