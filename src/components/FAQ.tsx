import React, { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../analytics';
import {
  Bus,
  Car,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Home,
  MapPin,
  Plane,
  Train,
  Waves,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type RouteKey = 'beach' | 'station' | 'airport';
type TravelMode = 'walking' | 'transit' | 'driving';

type LocalCopy = {
  amenitiesSuffix: string;
  availabilityQuestion: string;
  availabilityAnswer: string;
  shopQuestion: string;
  shopAnswer: string;
  beachQuestion: string;
  beachAnswer: string;
  routesTitle: string;
  routesSubtitle: string;
  beachTab: string;
  stationTab: string;
  airportTab: string;
  beachMetric: string;
  stationMetric: string;
  airportMetric: string;
  homeLabel: string;
  beachLabel: string;
  stationLabel: string;
  airportLabel: string;
  openRoute: string;
  publicTransport: string;
  byCar: string;
  airlinkInfo: string;
  schematicNote: string;
  airportNote: string;
  airportStepsTitle: string;
  airportStep1: string;
  airportStep2: string;
  airportStep3: string;
};

const LOCAL_COPY: Record<string, LocalCopy> = {
  ru: {
    amenitiesSuffix: 'Также в квартире есть фен, микроволновая печь и необходимые кухонные принадлежности.',
    availabilityQuestion: 'Как проверить свободные даты?',
    availabilityAnswer: 'Напишите нам в WhatsApp — владелец быстро проверит доступность на выбранные даты.',
    shopQuestion: 'Есть ли рядом магазины?',
    shopAnswer: 'Да. Interspar находится примерно в 230 м от ScaleaStay — около 3 минут пешком.',
    beachQuestion: 'Что предусмотрено для отдыха на пляже?',
    beachAnswer: 'Для гостей предусмотрен пляжный зонт, который можно взять с собой к морю.',
    routesTitle: 'Расположение и маршруты',
    routesSubtitle: 'Точные маршруты к пляжу, от станции Scalea и из ближайшего международного аэропорта.',
    beachTab: 'До пляжа',
    stationTab: 'От станции',
    airportTab: 'Из аэропорта',
    beachMetric: '600 м · около 5–8 мин пешком',
    stationMetric: 'Маршрут от ж/д станции',
    airportMetric: 'Lamezia Terme (SUF) — ближайший аэропорт',
    homeLabel: 'ScaleaStay',
    beachLabel: 'Выход к пляжу',
    stationLabel: 'Scalea–S. Domenica Talao',
    airportLabel: 'Lamezia Terme · SUF',
    openRoute: 'Открыть в Google Maps',
    publicTransport: 'Общественный транспорт',
    byCar: 'На автомобиле',
    airlinkInfo: 'Официальная информация Airlink',
    schematicNote: 'Точный пешеходный маршрут откроется в Google Maps.',
    airportNote: 'Аэропорт находится примерно в 120 км от Скалее. Расписание проверяйте на дату поездки.',
    airportStepsTitle: 'Как добраться без автомобиля',
    airportStep1: 'Автобус Lamezia Airlink до станции Lamezia Terme Centrale.',
    airportStep2: 'Поезд Trenitalia до Scalea–Santa Domenica Talao.',
    airportStep3: 'От станции — такси, трансфер или маршрут до апартаментов.',
  },
  en: {
    amenitiesSuffix: 'The apartment also includes a hair dryer, microwave and essential kitchen utensils.',
    availabilityQuestion: 'How can I check available dates?',
    availabilityAnswer: 'Message us on WhatsApp and the owner will quickly check availability for your dates.',
    shopQuestion: 'Are there shops nearby?',
    shopAnswer: 'Yes. Interspar is about 230 m from ScaleaStay, around a 3-minute walk.',
    beachQuestion: 'What is provided for a day at the beach?',
    beachAnswer: 'Guests can use a beach umbrella and take it with them to the sea.',
    routesTitle: 'Location and routes',
    routesSubtitle: 'Exact routes to the beach, from Scalea station and from the nearest international airport.',
    beachTab: 'To the beach',
    stationTab: 'From station',
    airportTab: 'From airport',
    beachMetric: '600 m · about 5–8 min walk',
    stationMetric: 'Route from the railway station',
    airportMetric: 'Lamezia Terme (SUF) — nearest airport',
    homeLabel: 'ScaleaStay',
    beachLabel: 'Beach access',
    stationLabel: 'Scalea–S. Domenica Talao',
    airportLabel: 'Lamezia Terme · SUF',
    openRoute: 'Open in Google Maps',
    publicTransport: 'Public transport',
    byCar: 'By car',
    airlinkInfo: 'Official Airlink information',
    schematicNote: 'The exact walking route opens in Google Maps.',
    airportNote: 'The airport is approximately 120 km from Scalea. Check the timetable for your travel date.',
    airportStepsTitle: 'How to arrive without a car',
    airportStep1: 'Take the Lamezia Airlink bus to Lamezia Terme Centrale station.',
    airportStep2: 'Take a Trenitalia train to Scalea–Santa Domenica Talao.',
    airportStep3: 'From the station, continue by taxi, transfer or the local route to the apartment.',
  },
  it: {
    amenitiesSuffix: 'L’appartamento dispone inoltre di asciugacapelli, forno a microonde e utensili da cucina essenziali.',
    availabilityQuestion: 'Come posso verificare le date disponibili?',
    availabilityAnswer: 'Scrivi su WhatsApp e il proprietario verificherà rapidamente la disponibilità per le tue date.',
    shopQuestion: 'Ci sono negozi nelle vicinanze?',
    shopAnswer: 'Sì. Interspar si trova a circa 230 m da ScaleaStay, circa 3 minuti a piedi.',
    beachQuestion: 'Cosa è disponibile per una giornata in spiaggia?',
    beachAnswer: 'Gli ospiti possono utilizzare un ombrellone da portare con sé al mare.',
    routesTitle: 'Posizione e percorsi',
    routesSubtitle: 'Percorsi precisi verso la spiaggia, dalla stazione di Scalea e dall’aeroporto internazionale più vicino.',
    beachTab: 'Alla spiaggia',
    stationTab: 'Dalla stazione',
    airportTab: 'Dall’aeroporto',
    beachMetric: '600 m · circa 5–8 min a piedi',
    stationMetric: 'Percorso dalla stazione',
    airportMetric: 'Lamezia Terme (SUF) — aeroporto più vicino',
    homeLabel: 'ScaleaStay',
    beachLabel: 'Accesso alla spiaggia',
    stationLabel: 'Scalea–S. Domenica Talao',
    airportLabel: 'Lamezia Terme · SUF',
    openRoute: 'Apri in Google Maps',
    publicTransport: 'Trasporto pubblico',
    byCar: 'In auto',
    airlinkInfo: 'Informazioni ufficiali Airlink',
    schematicNote: 'Il percorso pedonale esatto si apre in Google Maps.',
    airportNote: 'L’aeroporto si trova a circa 120 km da Scalea. Verifica gli orari per la data del viaggio.',
    airportStepsTitle: 'Come arrivare senza auto',
    airportStep1: 'Navetta Lamezia Airlink fino alla stazione Lamezia Terme Centrale.',
    airportStep2: 'Treno Trenitalia fino a Scalea–Santa Domenica Talao.',
    airportStep3: 'Dalla stazione, proseguire in taxi, con transfer o con il percorso locale verso l’appartamento.',
  },
  de: {
    amenitiesSuffix: 'Außerdem gibt es einen Haartrockner, eine Mikrowelle und die wichtigsten Küchenutensilien.',
    availabilityQuestion: 'Wie kann ich freie Termine prüfen?',
    availabilityAnswer: 'Schreiben Sie uns auf WhatsApp; der Eigentümer prüft die Verfügbarkeit für Ihre Daten schnell.',
    shopQuestion: 'Gibt es Geschäfte in der Nähe?',
    shopAnswer: 'Ja. Interspar liegt etwa 230 m von ScaleaStay entfernt, rund 3 Gehminuten.',
    beachQuestion: 'Was steht für einen Strandtag zur Verfügung?',
    beachAnswer: 'Für Gäste steht ein Sonnenschirm zur Verfügung, der mit zum Meer genommen werden kann.',
    routesTitle: 'Lage und Wege',
    routesSubtitle: 'Genaue Wege zum Strand, vom Bahnhof Scalea und vom nächstgelegenen internationalen Flughafen.',
    beachTab: 'Zum Strand',
    stationTab: 'Vom Bahnhof',
    airportTab: 'Vom Flughafen',
    beachMetric: '600 m · ca. 5–8 Min. zu Fuß',
    stationMetric: 'Route vom Bahnhof',
    airportMetric: 'Lamezia Terme (SUF) — nächster Flughafen',
    homeLabel: 'ScaleaStay',
    beachLabel: 'Strandzugang',
    stationLabel: 'Scalea–S. Domenica Talao',
    airportLabel: 'Lamezia Terme · SUF',
    openRoute: 'In Google Maps öffnen',
    publicTransport: 'Öffentliche Verkehrsmittel',
    byCar: 'Mit dem Auto',
    airlinkInfo: 'Offizielle Airlink-Informationen',
    schematicNote: 'Die genaue Fußroute wird in Google Maps geöffnet.',
    airportNote: 'Der Flughafen liegt etwa 120 km von Scalea entfernt. Prüfen Sie den Fahrplan für Ihr Reisedatum.',
    airportStepsTitle: 'Anreise ohne Auto',
    airportStep1: 'Mit dem Lamezia Airlink Bus zum Bahnhof Lamezia Terme Centrale fahren.',
    airportStep2: 'Mit dem Trenitalia-Zug nach Scalea–Santa Domenica Talao fahren.',
    airportStep3: 'Vom Bahnhof weiter per Taxi, Transfer oder über die lokale Route zum Apartment.',
  },
  cs: {
    amenitiesSuffix: 'V apartmánu je také fén, mikrovlnná trouba a základní kuchyňské vybavení.',
    availabilityQuestion: 'Jak ověřit volné termíny?',
    availabilityAnswer: 'Napište na WhatsApp a majitel rychle ověří dostupnost pro vaše termíny.',
    shopQuestion: 'Jsou v okolí obchody?',
    shopAnswer: 'Ano. Interspar je přibližně 230 m od ScaleaStay, asi 3 minuty pěšky.',
    beachQuestion: 'Co je k dispozici pro pobyt na pláži?',
    beachAnswer: 'Hosté mají k dispozici plážový slunečník, který si mohou vzít k moři.',
    routesTitle: 'Poloha a trasy',
    routesSubtitle: 'Přesné trasy na pláž, z nádraží Scalea a z nejbližšího mezinárodního letiště.',
    beachTab: 'Na pláž',
    stationTab: 'Z nádraží',
    airportTab: 'Z letiště',
    beachMetric: '600 m · přibližně 5–8 min pěšky',
    stationMetric: 'Trasa z vlakového nádraží',
    airportMetric: 'Lamezia Terme (SUF) — nejbližší letiště',
    homeLabel: 'ScaleaStay',
    beachLabel: 'Vstup na pláž',
    stationLabel: 'Scalea–S. Domenica Talao',
    airportLabel: 'Lamezia Terme · SUF',
    openRoute: 'Otevřít v Google Maps',
    publicTransport: 'Veřejná doprava',
    byCar: 'Autem',
    airlinkInfo: 'Oficiální informace Airlink',
    schematicNote: 'Přesná pěší trasa se otevře v Google Maps.',
    airportNote: 'Letiště je přibližně 120 km od města Scalea. Jízdní řád ověřte pro datum své cesty.',
    airportStepsTitle: 'Jak se dostat bez auta',
    airportStep1: 'Autobusem Lamezia Airlink na nádraží Lamezia Terme Centrale.',
    airportStep2: 'Vlakem Trenitalia do stanice Scalea–Santa Domenica Talao.',
    airportStep3: 'Z nádraží pokračujte taxíkem, transferem nebo místní trasou k apartmánu.',
  },
  pl: {
    amenitiesSuffix: 'W apartamencie są także suszarka do włosów, kuchenka mikrofalowa i podstawowe wyposażenie kuchenne.',
    availabilityQuestion: 'Jak sprawdzić wolne terminy?',
    availabilityAnswer: 'Napisz na WhatsApp, a właściciel szybko sprawdzi dostępność dla wybranych terminów.',
    shopQuestion: 'Czy w pobliżu są sklepy?',
    shopAnswer: 'Tak. Interspar znajduje się około 230 m od ScaleaStay, czyli około 3 minuty pieszo.',
    beachQuestion: 'Co jest dostępne na dzień na plaży?',
    beachAnswer: 'Goście mają do dyspozycji parasol plażowy, który można zabrać nad morze.',
    routesTitle: 'Lokalizacja i trasy',
    routesSubtitle: 'Sprawdzone trasy na plażę, ze stacji Scalea i z najbliższego międzynarodowego lotniska.',
    beachTab: 'Na plażę',
    stationTab: 'Ze stacji',
    airportTab: 'Z lotniska',
    beachMetric: '600 m · około 5–8 min pieszo',
    stationMetric: 'Trasa z dworca kolejowego',
    airportMetric: 'Lamezia Terme (SUF) — najbliższe lotnisko',
    homeLabel: 'ScaleaStay',
    beachLabel: 'Wejście na plażę',
    stationLabel: 'Scalea–S. Domenica Talao',
    airportLabel: 'Lamezia Terme · SUF',
    openRoute: 'Otwórz w Google Maps',
    publicTransport: 'Transport publiczny',
    byCar: 'Samochodem',
    airlinkInfo: 'Oficjalne informacje Airlink',
    schematicNote: 'Dokładna trasa piesza otworzy się w Google Maps.',
    airportNote: 'Lotnisko znajduje się około 120 km od Scalei. Rozkład sprawdź dla konkretnego dnia podróży.',
    airportStepsTitle: 'Jak dojechać bez samochodu',
    airportStep1: 'Autobusem Lamezia Airlink do stacji Lamezia Terme Centrale.',
    airportStep2: 'Pociągiem Trenitalia do Scalea–Santa Domenica Talao.',
    airportStep3: 'Ze stacji dalej taksówką, transferem lub lokalną trasą do apartamentu.',
  },
};

const HOME_LOCATION = '39.8074152,15.7949133';
const BEACH_LOCATION = '39.8064465,15.7889826';
const STATION_LOCATION = 'Scalea-Santa Domenica Talao railway station, Scalea CS, Italy';
const AIRPORT_LOCATION = 'Lamezia Terme International Airport (SUF), 88046 Lamezia Terme CZ, Italy';
const AIRLINK_URL = 'https://www.trenitalia.com/en/connections/lamezia-airlink.html';

const directionsUrl = (origin: string, destination: string, travelMode: TravelMode) =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=${travelMode}`;

const FAQ: React.FC = () => {
  const { t, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeRoute, setActiveRoute] = useState<RouteKey>('beach');
  const copy = LOCAL_COPY[language] || LOCAL_COPY.ru;

  const faqs = useMemo(() => [
    { q: t('faqQ1'), a: t('faqA1') },
    { q: t('faqQ2'), a: `${t('faqA2')} ${copy.amenitiesSuffix}` },
    { q: t('faqQ3'), a: t('faqA3') },
    { q: t('faqQ4'), a: t('faqA4') },
    { q: t('faqQ5'), a: t('faqA5') },
    { q: copy.availabilityQuestion, a: copy.availabilityAnswer },
    { q: t('faqQ7'), a: t('faqA7') },
    { q: copy.shopQuestion, a: copy.shopAnswer },
    { q: copy.beachQuestion, a: copy.beachAnswer },
  ], [copy, t]);

  const isBeach = activeRoute === 'beach';
  const isStation = activeRoute === 'station';
  const isAirport = activeRoute === 'airport';

  const routePath = isBeach
    ? 'M105 165 C210 145 255 55 355 78 S485 168 595 62'
    : isStation
      ? 'M90 60 C205 42 245 145 355 135 S485 48 610 162'
      : 'M82 165 C170 65 260 58 338 120 S500 176 620 64';

  const routeLabel = isBeach ? copy.beachTab : isStation ? copy.stationTab : copy.airportTab;
  const routeMetric = isBeach ? copy.beachMetric : isStation ? copy.stationMetric : copy.airportMetric;
  const routeUrl = isBeach
    ? directionsUrl(HOME_LOCATION, BEACH_LOCATION, 'walking')
    : isStation
      ? directionsUrl(STATION_LOCATION, HOME_LOCATION, 'walking')
      : directionsUrl(AIRPORT_LOCATION, HOME_LOCATION, 'transit');
  const airportDrivingUrl = directionsUrl(AIRPORT_LOCATION, HOME_LOCATION, 'driving');

  const setRoute = (route: RouteKey) => {
    setActiveRoute(route);
    trackEvent('route_tab_select', { route });
  };

  const tabClass = (route: RouteKey) =>
    `inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl font-black text-[11px] sm:text-xs transition-all ${
      activeRoute === route
        ? 'bg-cyan-700 text-white shadow-md shadow-cyan-900/15'
        : 'bg-white/90 text-slate-700 border border-cyan-100'
    }`;

  return (
    <>
      <section id="faq" className="py-12 px-4 bg-white scroll-mt-40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-slate-900 mb-4 break-words hyphens-none">
              {t('faqTitle')}
            </h2>
            <div className="w-12 h-1.5 bg-indigo-600 mx-auto rounded-full" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={`${faq.q}-${idx}`} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  aria-expanded={openIndex === idx}
                  className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-900 pr-4">{faq.q}</span>
                  {openIndex === idx
                    ? <ChevronUp className="w-5 h-5 text-indigo-600 shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                </button>

                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 pt-0 text-slate-500 leading-relaxed border-t border-slate-50">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="routes" className="py-9 px-4 bg-[linear-gradient(180deg,#f8fafc_0%,#eefbff_48%,#fffaf0_100%)] border-y border-cyan-100/70 scroll-mt-40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-5">
            <div className="inline-flex items-center gap-1.5 text-cyan-700 font-black text-[10px] uppercase tracking-[0.2em] mb-2">
              <MapPin className="w-3.5 h-3.5" /> Scalea
            </div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-slate-900 mb-2">{copy.routesTitle}</h2>
            <p className="max-w-2xl mx-auto text-sm text-slate-500">{copy.routesSubtitle}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-5" role="tablist" aria-label={copy.routesTitle}>
            <button type="button" role="tab" aria-selected={isBeach} onClick={() => setRoute('beach')} className={tabClass('beach')}>
              <Waves className="w-4 h-4" /> {copy.beachTab}
            </button>
            <button type="button" role="tab" aria-selected={isStation} onClick={() => setRoute('station')} className={tabClass('station')}>
              <Train className="w-4 h-4" /> {copy.stationTab}
            </button>
            <button type="button" role="tab" aria-selected={isAirport} onClick={() => setRoute('airport')} className={tabClass('airport')}>
              <Plane className="w-4 h-4" /> {copy.airportTab}
            </button>
          </div>

          <div className="bg-white/95 rounded-2xl border border-cyan-100 overflow-hidden shadow-[0_20px_55px_rgba(14,116,144,0.12)]">
            <div className="grid md:grid-cols-[1.15fr_0.85fr]">
              <div className="relative min-h-[230px] p-4 sm:p-6 bg-[linear-gradient(135deg,#fff6df_0%,#fffdf7_30%,#e7f9fb_68%,#dff6ff_100%)] overflow-hidden">
                <div
                  className="absolute inset-0"
                  aria-hidden="true"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 12% 20%, rgba(251,191,36,0.18), transparent 30%), radial-gradient(circle at 86% 18%, rgba(6,182,212,0.18), transparent 32%), radial-gradient(circle at 60% 90%, rgba(255,255,255,0.82), transparent 38%)',
                  }}
                />

                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 240" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M520 -20 C545 35 520 74 555 112 S635 174 700 160 L700 -20 Z" fill="rgba(165,243,252,0.36)" />
                  <path d="M526 -10 C551 36 526 75 561 113 S640 172 704 157" fill="none" stroke="rgba(6,182,212,0.36)" strokeWidth="4" />
                  <path d="M-20 50 C130 14 205 82 335 54 S540 10 730 72" fill="none" stroke="rgba(255,255,255,0.86)" strokeWidth="16" strokeLinecap="round" />
                  <path d="M-20 50 C130 14 205 82 335 54 S540 10 730 72" fill="none" stroke="rgba(180,157,116,0.36)" strokeWidth="2" strokeDasharray="10 10" strokeLinecap="round" />
                  <path d="M35 214 C145 168 228 226 330 190 S505 130 670 194" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="12" strokeLinecap="round" />
                  <path d="M35 214 C145 168 228 226 330 190 S505 130 670 194" fill="none" stroke="rgba(14,116,144,0.18)" strokeWidth="2" strokeDasharray="7 11" strokeLinecap="round" />
                  <g fill="rgba(255,255,255,0.5)" stroke="rgba(14,116,144,0.12)">
                    <rect x="70" y="82" width="62" height="34" rx="8" />
                    <rect x="160" y="112" width="78" height="42" rx="9" />
                    <rect x="410" y="128" width="66" height="36" rx="8" />
                    <rect x="280" y="16" width="58" height="31" rx="8" />
                  </g>
                  <path d="M562 98 C590 88 620 98 649 88" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="5" strokeLinecap="round" />
                  <path d="M574 117 C601 107 631 116 660 106" fill="none" stroke="rgba(255,255,255,0.72)" strokeWidth="4" strokeLinecap="round" />
                </svg>

                <div className="absolute left-5 top-4 w-9 h-9 rounded-full bg-amber-100/80 border border-white/80 shadow-sm flex items-center justify-center text-amber-700/70" aria-hidden="true">
                  {isAirport ? <Plane className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                </div>
                <div className="absolute right-5 bottom-5 w-10 h-10 rounded-full bg-cyan-100/80 border border-white/80 shadow-sm flex items-center justify-center text-cyan-700/70" aria-hidden="true">
                  {isAirport ? <Home className="w-5 h-5" /> : <Waves className="w-5 h-5" />}
                </div>

                <svg className="relative z-10 w-full h-[180px]" viewBox="0 0 700 210" role="img" aria-label={routeLabel}>
                  <path d={routePath} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="19" strokeLinecap="round" />
                  <path d={routePath} fill="none" stroke="rgb(165 243 252)" strokeWidth="15" strokeLinecap="round" />
                  <path d={routePath} fill="none" stroke="rgb(79 70 229)" strokeWidth="5" strokeLinecap="round" strokeDasharray="11 11" />
                  <circle r="8" fill="rgb(79 70 229)">
                    <animateMotion dur={isBeach ? '7s' : isStation ? '9s' : '11s'} repeatCount="indefinite" path={routePath} />
                  </circle>
                </svg>

                <div className="absolute z-20 left-4 sm:left-6 bottom-4 flex items-center gap-2 bg-white/92 backdrop-blur-sm border border-white rounded-xl px-3 py-2 shadow-sm max-w-[210px]">
                  {isBeach ? <Home className="w-4 h-4 text-indigo-600 shrink-0" /> : isStation ? <Train className="w-4 h-4 text-indigo-600 shrink-0" /> : <Plane className="w-4 h-4 text-indigo-600 shrink-0" />}
                  <span className="text-[11px] font-black text-slate-800 leading-tight">{isBeach ? copy.homeLabel : isStation ? copy.stationLabel : copy.airportLabel}</span>
                </div>
                <div className="absolute z-20 right-4 sm:right-6 top-4 flex items-center gap-2 bg-white/92 backdrop-blur-sm border border-white rounded-xl px-3 py-2 shadow-sm max-w-[180px]">
                  {isBeach ? <Waves className="w-4 h-4 text-cyan-700 shrink-0" /> : <Home className="w-4 h-4 text-indigo-600 shrink-0" />}
                  <span className="text-[11px] font-black text-slate-800 leading-tight">{isBeach ? copy.beachLabel : copy.homeLabel}</span>
                </div>
              </div>

              <div className="p-5 sm:p-6 flex flex-col justify-center bg-[linear-gradient(145deg,#ffffff_0%,#ffffff_65%,#ecfeff_100%)]">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700 mb-2">{routeLabel}</div>
                <div className="text-lg sm:text-xl font-black text-slate-900 mb-2">{routeMetric}</div>

                {isAirport ? (
                  <>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">{copy.airportNote}</p>
                    <div className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-700 mb-2">{copy.airportStepsTitle}</div>
                    <ol className="space-y-2 text-xs text-slate-600 mb-4">
                      <li className="flex gap-2"><Bus className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" /><span>{copy.airportStep1}</span></li>
                      <li className="flex gap-2"><Train className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" /><span>{copy.airportStep2}</span></li>
                      <li className="flex gap-2"><MapPin className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" /><span>{copy.airportStep3}</span></li>
                    </ol>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2">
                      <a
                        href={routeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('route_map_open', { route: 'airport', travel_mode: 'transit' })}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-3 font-black text-[11px] transition-colors active:scale-[0.98]"
                      >
                        <Bus className="w-4 h-4" /> {copy.publicTransport}
                      </a>
                      <a
                        href={airportDrivingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('route_map_open', { route: 'airport', travel_mode: 'driving' })}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-3 py-3 font-black text-[11px] transition-colors active:scale-[0.98]"
                      >
                        <Car className="w-4 h-4" /> {copy.byCar}
                      </a>
                    </div>
                    <a
                      href={AIRLINK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('airport_airlink_open')}
                      className="inline-flex items-center justify-center gap-1.5 mt-3 text-[11px] font-black text-cyan-800 hover:text-indigo-700"
                    >
                      {copy.airlinkInfo}<ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </>
                ) : (
                  <>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">{copy.schematicNote}</p>
                    <a
                      href={routeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('route_map_open', { route: activeRoute, travel_mode: 'walking' })}
                      className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 font-black text-xs transition-colors active:scale-[0.98]"
                    >
                      {copy.openRoute}<ExternalLink className="w-4 h-4" />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
