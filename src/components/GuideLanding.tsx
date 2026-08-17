import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Bus,
  Car,
  CheckCircle2,
  ExternalLink,
  Footprints,
  Landmark,
  MapPin,
  MessageCircle,
  Plane,
  ShoppingBasket,
  TrainFront,
  Waves,
} from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { trackEvent } from '../analytics';

type GuideLanguage = 'it' | 'pl';
type GuideTopic = 'airport' | 'no-car';

type GuidePage = {
  language: GuideLanguage;
  topic: GuideTopic;
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  introTitle: string;
  introText: string;
  note: string;
  faqTitle: string;
  faq: Array<{ q: string; a: string }>;
  relatedLabel: string;
  relatedTitle: string;
  relatedText: string;
  relatedPath: string;
  commercialLabel: string;
  commercialPath: string;
  whatsappCta: string;
};

const GUIDE_PAGES: GuidePage[] = [
  {
    language: 'it',
    topic: 'airport',
    path: '/it/come-arrivare-da-lamezia-terme-a-scalea/',
    title: 'Come arrivare da Lamezia Terme a Scalea | ScaleaStay',
    description: 'Come raggiungere Scalea dall’aeroporto di Lamezia Terme: Airlink fino a Lamezia Terme Centrale, treno per Scalea e ultimo tratto verso ScaleaStay.',
    eyebrow: 'Guida pratica • Lamezia Terme → Scalea',
    heroTitle: 'Come arrivare dall’aeroporto di Lamezia Terme a Scalea',
    heroSubtitle: 'Un percorso pratico con i mezzi pubblici: Lamezia Airlink fino alla stazione centrale, treno per Scalea–Santa Domenica Talao e ultimo tratto fino a ScaleaStay.',
    introTitle: 'Il percorso in tre passaggi',
    introText: 'L’aeroporto di Lamezia Terme non ha una stazione ferroviaria direttamente nel terminal. Il collegamento ufficiale porta prima a Lamezia Terme Centrale; da lì si prosegue in treno lungo la costa tirrenica fino a Scalea.',
    note: 'Gli orari di bus e treni possono cambiare. Prima della partenza verifica sempre la soluzione disponibile per il giorno e l’ora del tuo volo.',
    faqTitle: 'Domande frequenti sul trasferimento',
    faq: [
      { q: 'L’aeroporto di Lamezia Terme è collegato alla stazione ferroviaria?', a: 'Sì. Lamezia Airlink collega l’aeroporto con la stazione Lamezia Terme Centrale; Trenitalia consente anche di cercare la soluzione treno+bus selezionando Lamezia Terme Aeroporto.' },
      { q: 'Da Lamezia Terme Centrale si può raggiungere Scalea in treno?', a: 'Sì. Scalea–Santa Domenica Talao si trova sulla linea tirrenica servita da collegamenti ferroviari. Gli orari e gli eventuali cambi vanno controllati per la data del viaggio.' },
      { q: 'Quanto dista ScaleaStay dalla stazione di Scalea?', a: 'Il percorso verificato dalla stazione Scalea–Santa Domenica Talao a ScaleaStay è di circa 500 m, normalmente circa 8 minuti a piedi.' },
      { q: 'Serve prenotare un’auto per arrivare a ScaleaStay?', a: 'Non necessariamente. È possibile arrivare con Airlink e treno e poi raggiungere l’appartamento a piedi dalla stazione. Un’auto può essere utile soprattutto per escursioni fuori Scalea.' },
    ],
    relatedLabel: 'Dopo l’arrivo',
    relatedTitle: 'Si può soggiornare a Scalea senza auto?',
    relatedText: 'Scopri quali servizi e luoghi sono raggiungibili a piedi da ScaleaStay e quando l’auto può essere utile.',
    relatedPath: '/it/scalea-senza-auto/',
    commercialLabel: 'Vedi l’appartamento vicino al mare',
    commercialPath: '/it/appartamento-scalea-vicino-mare/',
    whatsappCta: 'Verifica le date su WhatsApp',
  },
  {
    language: 'pl',
    topic: 'airport',
    path: '/pl/jak-dojechac-z-lamezia-terme-do-scalei/',
    title: 'Jak dojechać z lotniska Lamezia Terme do Scalei | ScaleaStay',
    description: 'Jak dojechać z lotniska Lamezia Terme do Scalei: Airlink do Lamezia Terme Centrale, pociąg do Scalea i ostatni odcinek do ScaleaStay.',
    eyebrow: 'Praktyczny przewodnik • Lamezia Terme → Scalea',
    heroTitle: 'Jak dojechać z lotniska Lamezia Terme do Scalei',
    heroSubtitle: 'Praktyczna trasa transportem publicznym: Lamezia Airlink do stacji Lamezia Terme Centrale, dalej pociąg do Scalea–Santa Domenica Talao i ostatni odcinek do ScaleaStay.',
    introTitle: 'Trasa w trzech krokach',
    introText: 'Lotnisko Lamezia Terme nie ma stacji kolejowej bezpośrednio przy terminalu. Oficjalne połączenie prowadzi najpierw do stacji Lamezia Terme Centrale, a następnie pociągiem wzdłuż wybrzeża Morza Tyrreńskiego do Scalei.',
    note: 'Rozkłady autobusów i pociągów mogą się zmieniać. Przed podróżą zawsze sprawdź aktualne połączenie dla dnia i godziny przylotu.',
    faqTitle: 'Najczęstsze pytania o dojazd',
    faq: [
      { q: 'Czy lotnisko Lamezia Terme ma połączenie ze stacją kolejową?', a: 'Tak. Lamezia Airlink łączy lotnisko ze stacją Lamezia Terme Centrale. W Trenitalii można wyszukać wspólną trasę pociąg+autobus, wybierając Lamezia Terme Aeroporto.' },
      { q: 'Czy z Lamezia Terme Centrale można dojechać pociągiem do Scalei?', a: 'Tak. Stacja Scalea–Santa Domenica Talao leży na nadmorskiej linii kolejowej. Aktualne godziny i ewentualne przesiadki należy sprawdzić dla konkretnego dnia podróży.' },
      { q: 'Jak daleko jest ze stacji w Scalei do ScaleaStay?', a: 'Sprawdzona trasa ze stacji Scalea–Santa Domenica Talao do ScaleaStay ma około 500 m, czyli zwykle około 8 minut pieszo.' },
      { q: 'Czy trzeba wynajmować samochód, żeby dotrzeć do ScaleaStay?', a: 'Nie jest to konieczne. Można dojechać Airlinkiem i pociągiem, a ze stacji dojść do apartamentu pieszo. Samochód przydaje się głównie na dalsze wycieczki poza Scaleę.' },
    ],
    relatedLabel: 'Po przyjeździe',
    relatedTitle: 'Czy można wypoczywać w Scalei bez samochodu?',
    relatedText: 'Zobacz, co znajduje się w zasięgu spaceru od ScaleaStay i kiedy samochód może się przydać.',
    relatedPath: '/pl/scalea-bez-samochodu/',
    commercialLabel: 'Zobacz apartament blisko morza',
    commercialPath: '/pl/apartament-scalea-blisko-morza/',
    whatsappCta: 'Sprawdź terminy na WhatsApp',
  },
  {
    language: 'it',
    topic: 'no-car',
    path: '/it/scalea-senza-auto/',
    title: 'Scalea senza auto: cosa raggiungere a piedi | ScaleaStay',
    description: 'Vacanza a Scalea senza usare sempre l’auto: da ScaleaStay spiaggia 600 m, Interspar 230 m, stazione 500 m e centro storico 950 m.',
    eyebrow: 'Scalea a piedi • Guida pratica',
    heroTitle: 'Vacanza a Scalea senza auto: cosa puoi raggiungere a piedi',
    heroSubtitle: 'Da ScaleaStay molte cose utili per la vacanza sono raggiungibili a piedi: mare, supermercato, stazione, centro storico e luoghi per una passeggiata serale.',
    introTitle: 'Una posizione comoda per muoversi a piedi',
    introText: 'Per una vacanza concentrata su mare, centro e vita quotidiana a Scalea non è necessario usare l’auto per ogni spostamento. Le distanze qui sotto sono state verificate sul percorso pedonale dalla zona dell’appartamento.',
    note: '“Senza auto” non significa che l’auto non serva mai: per spiagge lontane, borghi dell’entroterra o escursioni in altre località della Calabria può essere molto utile.',
    faqTitle: 'Domande frequenti su Scalea senza auto',
    faq: [
      { q: 'Quanto dista il mare da ScaleaStay?', a: 'La spiaggia più vicina è a circa 600 m. La percorrenza reale può variare con il passo; come riferimento usiamo circa 5–8 minuti a piedi.' },
      { q: 'Si può fare la spesa a piedi?', a: 'Sì. Interspar si trova a circa 230 m, circa 3 minuti a piedi dal punto di partenza verificato.' },
      { q: 'La stazione ferroviaria è raggiungibile a piedi?', a: 'Sì. La stazione Scalea–Santa Domenica Talao è a circa 500 m, normalmente circa 8 minuti a piedi.' },
      { q: 'Quando conviene avere un’auto?', a: 'L’auto è utile soprattutto per escursioni fuori Scalea, spiagge più lontane e località dell’entroterra. Per mare, spesa, stazione e centro molti spostamenti possono essere fatti a piedi.' },
    ],
    relatedLabel: 'Come arrivare',
    relatedTitle: 'Dall’aeroporto di Lamezia Terme a Scalea',
    relatedText: 'Il percorso con Airlink, stazione Lamezia Terme Centrale e treno fino a Scalea, senza fissare orari che possono cambiare.',
    relatedPath: '/it/come-arrivare-da-lamezia-terme-a-scalea/',
    commercialLabel: 'Vedi l’appartamento vicino al mare',
    commercialPath: '/it/appartamento-scalea-vicino-mare/',
    whatsappCta: 'Verifica le date su WhatsApp',
  },
  {
    language: 'pl',
    topic: 'no-car',
    path: '/pl/scalea-bez-samochodu/',
    title: 'Scalea bez samochodu: co jest blisko pieszo | ScaleaStay',
    description: 'Wakacje w Scalei bez ciągłego korzystania z auta: od ScaleaStay plaża 600 m, Interspar 230 m, dworzec 500 m i stare miasto 950 m.',
    eyebrow: 'Scalea pieszo • Praktyczny przewodnik',
    heroTitle: 'Scalea bez samochodu: co jest w zasięgu spaceru',
    heroSubtitle: 'Od ScaleaStay wiele rzeczy potrzebnych podczas urlopu jest dostępnych pieszo: morze, supermarket, dworzec, stare miasto i miejsca na wieczorny spacer.',
    introTitle: 'Wygodna lokalizacja do poruszania się pieszo',
    introText: 'Jeśli planujesz urlop skupiony na plaży, centrum Scalei i codziennych zakupach, nie musisz korzystać z samochodu przy każdym wyjściu. Poniższe odległości zostały sprawdzone dla tras pieszych od okolicy apartamentu.',
    note: '„Bez samochodu” nie oznacza, że auto nigdy się nie przyda. Na dalsze plaże, wycieczki do miasteczek w głębi lądu i zwiedzanie innych części Kalabrii samochód może być bardzo wygodny.',
    faqTitle: 'Najczęstsze pytania o pobyt bez samochodu',
    faq: [
      { q: 'Jak daleko jest z ScaleaStay do morza?', a: 'Najbliższa plaża znajduje się około 600 m od apartamentu. Rzeczywisty czas zależy od tempa; jako praktyczny zakres podajemy około 5–8 minut pieszo.' },
      { q: 'Czy na zakupy można dojść pieszo?', a: 'Tak. Interspar znajduje się około 230 m od sprawdzonego punktu startowego, czyli około 3 minuty pieszo.' },
      { q: 'Czy dworzec kolejowy jest blisko?', a: 'Tak. Stacja Scalea–Santa Domenica Talao znajduje się około 500 m od ScaleaStay, zwykle około 8 minut pieszo.' },
      { q: 'Kiedy samochód jest przydatny?', a: 'Przede wszystkim podczas dalszych wycieczek poza Scaleę, na bardziej oddalone plaże i do miejscowości w głębi Kalabrii. Morze, zakupy, dworzec i centrum są dostępne pieszo.' },
    ],
    relatedLabel: 'Jak dojechać',
    relatedTitle: 'Z lotniska Lamezia Terme do Scalei',
    relatedText: 'Praktyczna trasa Airlinkiem do Lamezia Terme Centrale i dalej pociągiem do Scalei, bez publikowania stałych godzin, które mogą się zmieniać.',
    relatedPath: '/pl/jak-dojechac-z-lamezia-terme-do-scalei/',
    commercialLabel: 'Zobacz apartament blisko morza',
    commercialPath: '/pl/apartament-scalea-blisko-morza/',
    whatsappCta: 'Sprawdź terminy na WhatsApp',
  },
];

const AIRLINK_URL: Record<GuideLanguage, string> = {
  it: 'https://www.trenitalia.com/it/regionale/collegamenti-regionale/lamezia-airlink.html',
  pl: 'https://www.trenitalia.com/en/connections/lamezia-airlink.html',
};

const SACAL_URL: Record<GuideLanguage, string> = {
  it: 'https://sacal.it/it/lamezia-terme/trasporti/',
  pl: 'https://sacal.it/en/lamezia-terme-airport/transport/',
};

const findTopic = (pathname: string): GuideTopic | null => {
  const match = GUIDE_PAGES.find((page) => pathname.includes(page.path.split('/').filter(Boolean).at(-1) || ''));
  return match?.topic || null;
};

const setMeta = (selector: string, content: string) => {
  const element = document.querySelector<HTMLMetaElement>(selector);
  if (element) element.setAttribute('content', content);
};

const GuideLanding: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const topic = findTopic(window.location.pathname);
  const supportedLanguage: GuideLanguage | null = language === 'it' || language === 'pl' ? language : null;
  const page = GUIDE_PAGES.find((item) => item.language === supportedLanguage && item.topic === topic) || null;

  useEffect(() => {
    if (!supportedLanguage || !topic) {
      navigate(`/${language}/`, { replace: true });
      return;
    }

    const expected = GUIDE_PAGES.find((item) => item.language === supportedLanguage && item.topic === topic);
    if (!expected) {
      navigate(`/${language}/`, { replace: true });
      return;
    }

    if (window.location.pathname !== expected.path) {
      navigate(expected.path, { replace: true });
      return;
    }

    const canonical = `https://scaleastay.com${expected.path}`;
    document.title = expected.title;
    setMeta('meta[name="description"]', expected.description);
    setMeta('meta[property="og:title"]', expected.title);
    setMeta('meta[property="og:description"]', expected.description);
    setMeta('meta[property="og:url"]', canonical);
    setMeta('meta[property="twitter:title"]', expected.title);
    setMeta('meta[property="twitter:description"]', expected.description);
    setMeta('meta[property="twitter:url"]', canonical);
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', canonical);

    const oldSchema = document.getElementById('scaleastay-guide-schema');
    oldSchema?.remove();

    const faqSchema = {
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      mainEntity: expected.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    };

    const graph: object[] = [
      {
        '@type': ['WebPage', 'Article'],
        '@id': `${canonical}#webpage`,
        url: canonical,
        headline: expected.heroTitle,
        name: expected.title,
        description: expected.description,
        inLanguage: supportedLanguage,
        isPartOf: { '@id': 'https://scaleastay.com/#website' },
        about: [
          { '@type': 'City', name: 'Scalea' },
          { '@type': 'AdministrativeArea', name: 'Calabria' },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'ScaleaStay', item: `https://scaleastay.com/${supportedLanguage}/` },
          { '@type': 'ListItem', position: 2, name: expected.heroTitle, item: canonical },
        ],
      },
      faqSchema,
    ];

    if (expected.topic === 'airport') {
      graph.push({
        '@type': 'HowTo',
        '@id': `${canonical}#howto`,
        name: expected.heroTitle,
        description: expected.heroSubtitle,
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Lamezia Terme Airport → Lamezia Terme Centrale', text: expected.language === 'it' ? 'Usa il collegamento Lamezia Airlink tra l’aeroporto e la stazione Lamezia Terme Centrale.' : 'Skorzystaj z Lamezia Airlink między lotniskiem a stacją Lamezia Terme Centrale.' },
          { '@type': 'HowToStep', position: 2, name: 'Lamezia Terme Centrale → Scalea', text: expected.language === 'it' ? 'Prosegui in treno fino alla stazione Scalea–Santa Domenica Talao, verificando l’orario per la data del viaggio.' : 'Jedź pociągiem do stacji Scalea–Santa Domenica Talao, sprawdzając rozkład dla dnia podróży.' },
          { '@type': 'HowToStep', position: 3, name: 'Scalea station → ScaleaStay', text: expected.language === 'it' ? 'Dalla stazione il percorso verificato fino a ScaleaStay è di circa 500 m, normalmente circa 8 minuti a piedi.' : 'Ze stacji sprawdzona trasa do ScaleaStay ma około 500 m, zwykle około 8 minut pieszo.' },
        ],
      });
    }

    const script = document.createElement('script');
    script.id = 'scaleastay-guide-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
    document.head.appendChild(script);

    return () => script.remove();
  }, [language, navigate, supportedLanguage, topic]);

  const facts = useMemo(() => [
    { icon: Waves, label: supportedLanguage === 'it' ? 'Spiaggia' : 'Plaża', value: '600 m · 5–8 min' },
    { icon: ShoppingBasket, label: 'Interspar', value: '230 m · ~3 min' },
    { icon: TrainFront, label: supportedLanguage === 'it' ? 'Stazione' : 'Dworzec', value: '500 m · ~8 min' },
    { icon: Landmark, label: supportedLanguage === 'it' ? 'Centro storico' : 'Stare miasto', value: '950 m · ~13 min' },
  ], [supportedLanguage]);

  if (!page || !supportedLanguage) return null;

  const whatsappUrl = CONTACT_INFO.whatsappLink(t('apartmentBookingMsg').replace('{name}', 'ScaleaStay'));
  const isAirport = page.topic === 'airport';

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
              onClick={() => trackEvent('whatsapp_click', { source: 'guide_header', topic: page.topic, language })}
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-xs font-black uppercase tracking-wider text-white"
            >
              WhatsApp <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="bg-slate-950 text-white px-4 py-16 sm:py-20">
          <div className="max-w-5xl mx-auto">
            <p className="text-indigo-300 text-xs font-black uppercase tracking-[0.25em] mb-5">{page.eyebrow}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.98] max-w-4xl mb-6">{page.heroTitle}</h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">{page.heroSubtitle}</p>
          </div>
        </section>

        <section className="px-4 py-14">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-3xl mb-10">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mb-5">{page.introTitle}</h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">{page.introText}</p>
            </div>

            {isAirport ? (
              <div className="grid lg:grid-cols-3 gap-4">
                {[
                  {
                    icon: Bus,
                    step: '01',
                    title: supportedLanguage === 'it' ? 'Aeroporto → Lamezia Terme Centrale' : 'Lotnisko → Lamezia Terme Centrale',
                    text: supportedLanguage === 'it'
                      ? 'Usa Lamezia Airlink, il collegamento ufficiale bus tra il terminal e la stazione ferroviaria centrale.'
                      : 'Skorzystaj z Lamezia Airlink, oficjalnego połączenia autobusowego między terminalem a główną stacją kolejową.',
                  },
                  {
                    icon: TrainFront,
                    step: '02',
                    title: supportedLanguage === 'it' ? 'Lamezia Centrale → Scalea' : 'Lamezia Centrale → Scalea',
                    text: supportedLanguage === 'it'
                      ? 'Cerca su Trenitalia la destinazione Scalea–Santa Domenica Talao e scegli la soluzione adatta al tuo orario di arrivo.'
                      : 'W Trenitalii wyszukaj stację Scalea–Santa Domenica Talao i wybierz połączenie dopasowane do godziny przylotu.',
                  },
                  {
                    icon: Footprints,
                    step: '03',
                    title: supportedLanguage === 'it' ? 'Stazione Scalea → ScaleaStay' : 'Dworzec Scalea → ScaleaStay',
                    text: supportedLanguage === 'it'
                      ? 'Il percorso verificato dalla stazione all’appartamento è di circa 500 m, normalmente circa 8 minuti a piedi.'
                      : 'Sprawdzona trasa z dworca do apartamentu ma około 500 m, czyli zwykle około 8 minut pieszo.',
                  },
                ].map(({ icon: Icon, step, title, text }) => (
                  <article key={step} className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <Icon className="w-6 h-6 text-indigo-600" />
                      <span className="text-xs font-black tracking-[0.2em] text-slate-400">{step}</span>
                    </div>
                    <h3 className="font-black text-lg mb-3">{title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {facts.map(({ icon: Icon, label, value }) => (
                  <article key={label} className="rounded-3xl border border-slate-100 bg-slate-50 p-5 sm:p-6">
                    <Icon className="w-6 h-6 text-indigo-600 mb-4" />
                    <p className="text-xs font-black uppercase tracking-wider text-slate-500">{label}</p>
                    <p className="mt-2 text-base sm:text-lg font-black">{value}</p>
                  </article>
                ))}
              </div>
            )}

            <div className="mt-8 rounded-3xl border border-amber-100 bg-amber-50 px-5 py-5 sm:px-6 flex gap-4 items-start">
              <CheckCircle2 className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed text-amber-950">{page.note}</p>
            </div>
          </div>
        </section>

        {isAirport && (
          <section className="px-4 py-14 bg-sky-50/70">
            <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 mb-3">
                  {supportedLanguage === 'it' ? 'Fonti ufficiali' : 'Oficjalne źródła'}
                </p>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mb-4">
                  {supportedLanguage === 'it' ? 'Controlla gli orari prima di partire' : 'Sprawdź rozkład przed podróżą'}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {supportedLanguage === 'it'
                    ? 'Non pubblichiamo un orario fisso perché collegamenti, lavori sulla linea e coincidenze possono cambiare. Usa le fonti ufficiali per la data effettiva del viaggio.'
                    : 'Nie publikujemy stałego rozkładu, ponieważ połączenia, prace na linii i przesiadki mogą się zmieniać. Sprawdź oficjalne źródła dla konkretnego dnia podróży.'}
                </p>
              </div>
              <div className="space-y-3">
                <a href={AIRLINK_URL[supportedLanguage]} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 rounded-2xl bg-white border border-sky-100 px-5 py-4 font-black hover:shadow-md transition-shadow">
                  <span>Trenitalia · Lamezia Airlink</span><ExternalLink className="w-4 h-4" />
                </a>
                <a href={SACAL_URL[supportedLanguage]} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 rounded-2xl bg-white border border-sky-100 px-5 py-4 font-black hover:shadow-md transition-shadow">
                  <span>SACAL · Lamezia Terme Airport</span><ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>
        )}

        {!isAirport && (
          <section className="px-4 py-14 bg-sky-50/70">
            <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
              <div className="rounded-3xl bg-white border border-sky-100 p-6">
                <Footprints className="w-7 h-7 text-indigo-600 mb-5" />
                <h2 className="text-2xl font-black tracking-tight mb-3">
                  {supportedLanguage === 'it' ? 'Quando muoversi a piedi è comodo' : 'Kiedy spacer jest wygodnym wyborem'}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {supportedLanguage === 'it'
                    ? 'Spiaggia, spesa quotidiana, stazione e centro sono abbastanza vicini da rendere molti spostamenti semplici senza accendere l’auto.'
                    : 'Plaża, codzienne zakupy, dworzec i centrum są na tyle blisko, że wiele przejść można wygodnie zrobić pieszo.'}
                </p>
              </div>
              <div className="rounded-3xl bg-white border border-sky-100 p-6">
                <Car className="w-7 h-7 text-indigo-600 mb-5" />
                <h2 className="text-2xl font-black tracking-tight mb-3">
                  {supportedLanguage === 'it' ? 'Quando l’auto è utile' : 'Kiedy samochód się przydaje'}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {supportedLanguage === 'it'
                    ? 'Per escursioni verso altre località, spiagge più lontane o borghi dell’entroterra l’auto aumenta la libertà di movimento.'
                    : 'Na dalsze wycieczki, bardziej oddalone plaże i miejscowości w głębi Kalabrii samochód daje znacznie większą swobodę.'}
                </p>
              </div>
            </div>
          </section>
        )}

        <section className="px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tighter text-center mb-8">{page.faqTitle}</h2>
            <div className="space-y-3">
              {page.faq.map((item) => (
                <article key={item.q} className="rounded-2xl border border-slate-100 p-5 sm:p-6">
                  <h3 className="font-black mb-2">{item.q}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 bg-slate-950 text-white">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6">
            <a href={page.relatedPath} className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
              <p className="text-indigo-300 text-xs font-black uppercase tracking-[0.2em] mb-3">{page.relatedLabel}</p>
              <h2 className="text-2xl font-black tracking-tight mb-3">{page.relatedTitle}</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-5">{page.relatedText}</p>
              <span className="inline-flex items-center gap-2 font-black text-sm">{supportedLanguage === 'it' ? 'Leggi la guida' : 'Czytaj przewodnik'} <ArrowRight className="w-4 h-4" /></span>
            </a>

            <div className="rounded-3xl bg-indigo-600 p-6">
              <MapPin className="w-6 h-6 mb-5" />
              <h2 className="text-2xl font-black tracking-tight mb-3">ScaleaStay</h2>
              <p className="text-indigo-100 text-sm leading-relaxed mb-6">Via Giuseppe Saragat 11 · Scalea · Calabria</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={page.commercialPath} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-black text-sm text-indigo-700">
                  {page.commercialLabel} <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { source: 'guide_footer', topic: page.topic, language })}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-4 py-3 font-black text-sm text-white"
                >
                  <MessageCircle className="w-4 h-4" /> {page.whatsappCta}
                </a>
              </div>
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

export default GuideLanding;
