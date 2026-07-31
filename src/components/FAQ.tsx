import React, { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Home,
  MapPin,
  Train,
  Waves,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type RouteKey = 'beach' | 'station';

type LocalCopy = {
  amenitiesSuffix: string;
  beachQuestion: string;
  beachAnswer: string;
  routesTitle: string;
  routesSubtitle: string;
  beachTab: string;
  stationTab: string;
  beachMetric: string;
  stationMetric: string;
  homeLabel: string;
  beachLabel: string;
  stationLabel: string;
  openRoute: string;
  schematicNote: string;
};

const LOCAL_COPY: Record<string, LocalCopy> = {
  ru: {
    amenitiesSuffix: 'Также в квартире есть фен, микроволновая печь и необходимые кухонные принадлежности.',
    beachQuestion: 'Что предусмотрено для отдыха на пляже?',
    beachAnswer: 'Для гостей предусмотрен пляжный зонт, который можно взять с собой к морю.',
    routesTitle: 'Расположение и маршруты',
    routesSubtitle: 'Маршрут к ближайшему выходу на пляж и дорога от станции Scalea.',
    beachTab: 'До пляжа',
    stationTab: 'От станции',
    beachMetric: 'Маршрут к ближайшему пляжу',
    stationMetric: 'Маршрут от ж/д станции',
    homeLabel: 'Casa Marittima',
    beachLabel: 'Выход к пляжу',
    stationLabel: 'Scalea–S. Domenica Talao',
    openRoute: 'Открыть в Google Maps',
    schematicNote: 'Точный пешеходный маршрут откроется в Google Maps.',
  },
  en: {
    amenitiesSuffix: 'The apartment also includes a hair dryer, microwave and essential kitchen utensils.',
    beachQuestion: 'What is provided for a day at the beach?',
    beachAnswer: 'Guests can use a beach umbrella and take it with them to the sea.',
    routesTitle: 'Location and routes',
    routesSubtitle: 'Route to the nearest beach access and directions from Scalea station.',
    beachTab: 'To the beach',
    stationTab: 'From station',
    beachMetric: 'Route to the nearest beach',
    stationMetric: 'Route from the railway station',
    homeLabel: 'Casa Marittima',
    beachLabel: 'Beach access',
    stationLabel: 'Scalea–S. Domenica Talao',
    openRoute: 'Open in Google Maps',
    schematicNote: 'The exact walking route opens in Google Maps.',
  },
  it: {
    amenitiesSuffix: 'L’appartamento dispone inoltre di asciugacapelli, forno a microonde e utensili da cucina essenziali.',
    beachQuestion: 'Cosa è disponibile per una giornata in spiaggia?',
    beachAnswer: 'Gli ospiti possono utilizzare un ombrellone da portare con sé al mare.',
    routesTitle: 'Posizione e percorsi',
    routesSubtitle: 'Percorso verso l’accesso alla spiaggia più vicino e indicazioni dalla stazione di Scalea.',
    beachTab: 'Alla spiaggia',
    stationTab: 'Dalla stazione',
    beachMetric: 'Percorso verso la spiaggia più vicina',
    stationMetric: 'Percorso dalla stazione',
    homeLabel: 'Casa Marittima',
    beachLabel: 'Accesso alla spiaggia',
    stationLabel: 'Scalea–S. Domenica Talao',
    openRoute: 'Apri in Google Maps',
    schematicNote: 'Il percorso pedonale esatto si apre in Google Maps.',
  },
  de: {
    amenitiesSuffix: 'Außerdem gibt es einen Haartrockner, eine Mikrowelle und die wichtigsten Küchenutensilien.',
    beachQuestion: 'Was steht für einen Strandtag zur Verfügung?',
    beachAnswer: 'Für Gäste steht ein Sonnenschirm zur Verfügung, der mit zum Meer genommen werden kann.',
    routesTitle: 'Lage und Wege',
    routesSubtitle: 'Weg zum nächsten Strandzugang und Anreise vom Bahnhof Scalea.',
    beachTab: 'Zum Strand',
    stationTab: 'Vom Bahnhof',
    beachMetric: 'Weg zum nächsten Strand',
    stationMetric: 'Route vom Bahnhof',
    homeLabel: 'Casa Marittima',
    beachLabel: 'Strandzugang',
    stationLabel: 'Scalea–S. Domenica Talao',
    openRoute: 'In Google Maps öffnen',
    schematicNote: 'Die genaue Fußroute wird in Google Maps geöffnet.',
  },
  cs: {
    amenitiesSuffix: 'V apartmánu je také fén, mikrovlnná trouba a základní kuchyňské vybavení.',
    beachQuestion: 'Co je k dispozici pro pobyt na pláži?',
    beachAnswer: 'Hosté mají k dispozici plážový slunečník, který si mohou vzít k moři.',
    routesTitle: 'Poloha a trasy',
    routesSubtitle: 'Trasa k nejbližšímu vstupu na pláž a cesta z nádraží Scalea.',
    beachTab: 'Na pláž',
    stationTab: 'Z nádraží',
    beachMetric: 'Trasa k nejbližší pláži',
    stationMetric: 'Trasa z vlakového nádraží',
    homeLabel: 'Casa Marittima',
    beachLabel: 'Vstup na pláž',
    stationLabel: 'Scalea–S. Domenica Talao',
    openRoute: 'Otevřít v Google Maps',
    schematicNote: 'Přesná pěší trasa se otevře v Google Maps.',
  },
};

const HOME_ADDRESS = '39.8074152,15.7949133';
const BEACH_DESTINATION = '39.8064465,15.7889826';
const STATION_ADDRESS = 'Scalea-Santa Domenica Talao railway station, Scalea CS, Italy';

const directionsUrl = (origin: string, destination: string) =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=walking`;

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
    { q: t('faqQ6'), a: t('faqA6') },
    { q: t('faqQ7'), a: t('faqA7') },
    { q: t('faqQ8'), a: t('faqA8') },
    { q: copy.beachQuestion, a: copy.beachAnswer },
  ], [copy, t]);

  const isBeach = activeRoute === 'beach';
  const routeUrl = isBeach
    ? directionsUrl(HOME_ADDRESS, BEACH_DESTINATION)
    : directionsUrl(STATION_ADDRESS, HOME_ADDRESS);
  const routePath = isBeach
    ? 'M105 165 C210 145 255 55 355 78 S485 168 595 62'
    : 'M90 60 C205 42 245 145 355 135 S485 48 610 162';

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

          <div className="flex flex-row justify-center gap-2 mb-5" role="tablist" aria-label={copy.routesTitle}>
            <button
              type="button"
              role="tab"
              aria-selected={isBeach}
              onClick={() => setActiveRoute('beach')}
              className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl font-black text-xs transition-all ${isBeach ? 'bg-cyan-700 text-white shadow-md shadow-cyan-900/15' : 'bg-white/90 text-slate-700 border border-cyan-100'}`}
            >
              <Waves className="w-4 h-4" /> {copy.beachTab}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={!isBeach}
              onClick={() => setActiveRoute('station')}
              className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl font-black text-xs transition-all ${!isBeach ? 'bg-cyan-700 text-white shadow-md shadow-cyan-900/15' : 'bg-white/90 text-slate-700 border border-cyan-100'}`}
            >
              <Train className="w-4 h-4" /> {copy.stationTab}
            </button>
          </div>

          <div className="bg-white/95 rounded-2xl border border-cyan-100 overflow-hidden shadow-[0_20px_55px_rgba(14,116,144,0.12)]">
            <div className="grid md:grid-cols-[1.25fr_0.75fr]">
              <div className="relative min-h-[220px] p-4 sm:p-6 bg-[linear-gradient(135deg,#fff6df_0%,#fffdf7_30%,#e7f9fb_68%,#dff6ff_100%)] overflow-hidden">
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
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="absolute right-5 bottom-5 w-10 h-10 rounded-full bg-cyan-100/80 border border-white/80 shadow-sm flex items-center justify-center text-cyan-700/70" aria-hidden="true">
                  <Waves className="w-5 h-5" />
                </div>

                <svg className="relative z-10 w-full h-[170px]" viewBox="0 0 700 210" role="img" aria-label={isBeach ? copy.beachTab : copy.stationTab}>
                  <path d={routePath} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="19" strokeLinecap="round" />
                  <path d={routePath} fill="none" stroke="rgb(165 243 252)" strokeWidth="15" strokeLinecap="round" />
                  <path d={routePath} fill="none" stroke="rgb(79 70 229)" strokeWidth="5" strokeLinecap="round" strokeDasharray="11 11" />
                  <circle r="8" fill="rgb(79 70 229)">
                    <animateMotion dur={isBeach ? '7s' : '9s'} repeatCount="indefinite" path={routePath} />
                  </circle>
                </svg>

                <div className="absolute z-20 left-4 sm:left-6 bottom-4 flex items-center gap-2 bg-white/92 backdrop-blur-sm border border-white rounded-xl px-3 py-2 shadow-sm max-w-[190px]">
                  {isBeach ? <Home className="w-4 h-4 text-indigo-600 shrink-0" /> : <Train className="w-4 h-4 text-indigo-600 shrink-0" />}
                  <span className="text-[11px] font-black text-slate-800 leading-tight">{isBeach ? copy.homeLabel : copy.stationLabel}</span>
                </div>
                <div className="absolute z-20 right-4 sm:right-6 top-4 flex items-center gap-2 bg-white/92 backdrop-blur-sm border border-white rounded-xl px-3 py-2 shadow-sm max-w-[180px]">
                  {isBeach ? <Waves className="w-4 h-4 text-cyan-700 shrink-0" /> : <Home className="w-4 h-4 text-indigo-600 shrink-0" />}
                  <span className="text-[11px] font-black text-slate-800 leading-tight">{isBeach ? copy.beachLabel : copy.homeLabel}</span>
                </div>
              </div>

              <div className="p-5 sm:p-6 flex flex-col justify-center bg-[linear-gradient(145deg,#ffffff_0%,#ffffff_65%,#ecfeff_100%)]">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700 mb-2">{isBeach ? copy.beachTab : copy.stationTab}</div>
                <div className="text-xl font-black text-slate-900 mb-2">{isBeach ? copy.beachMetric : copy.stationMetric}</div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{copy.schematicNote}</p>
                <a
                  href={routeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 font-black text-xs transition-colors active:scale-[0.98]"
                >
                  {copy.openRoute}<ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;