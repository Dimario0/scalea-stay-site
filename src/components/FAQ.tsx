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
    routesSubtitle: 'Посмотрите, как пройти к ближайшему общественному выходу на пляж и как добраться от железнодорожной станции Scalea.',
    beachTab: 'До ближайшего пляжа',
    stationTab: 'От станции Scalea',
    beachMetric: 'Около 400 м пешком',
    stationMetric: 'Маршрут от ж/д станции',
    homeLabel: 'Casa Marittima',
    beachLabel: 'Общественный выход на пляж',
    stationLabel: 'Scalea–S. Domenica Talao',
    openRoute: 'Открыть точный маршрут',
    schematicNote: 'На сайте показана лёгкая схема. Точный пешеходный маршрут откроется в Google Maps.',
  },
  en: {
    amenitiesSuffix: 'The apartment also includes a hair dryer, microwave and essential kitchen utensils.',
    beachQuestion: 'What is provided for a day at the beach?',
    beachAnswer: 'Guests can use a beach umbrella and take it with them to the sea.',
    routesTitle: 'Location and routes',
    routesSubtitle: 'See how to reach the nearest public beach access and how to arrive from Scalea railway station.',
    beachTab: 'To the nearest beach',
    stationTab: 'From Scalea station',
    beachMetric: 'About 400 m on foot',
    stationMetric: 'Route from the railway station',
    homeLabel: 'Casa Marittima',
    beachLabel: 'Public beach access',
    stationLabel: 'Scalea–S. Domenica Talao',
    openRoute: 'Open exact route',
    schematicNote: 'The website shows a lightweight route diagram. The exact walking route opens in Google Maps.',
  },
  it: {
    amenitiesSuffix: 'L’appartamento dispone inoltre di asciugacapelli, forno a microonde e utensili da cucina essenziali.',
    beachQuestion: 'Cosa è disponibile per una giornata in spiaggia?',
    beachAnswer: 'Gli ospiti possono utilizzare un ombrellone da portare con sé al mare.',
    routesTitle: 'Posizione e percorsi',
    routesSubtitle: 'Scopri come raggiungere l’accesso pubblico alla spiaggia più vicino e come arrivare dalla stazione ferroviaria di Scalea.',
    beachTab: 'Alla spiaggia più vicina',
    stationTab: 'Dalla stazione di Scalea',
    beachMetric: 'Circa 400 m a piedi',
    stationMetric: 'Percorso dalla stazione',
    homeLabel: 'Casa Marittima',
    beachLabel: 'Accesso pubblico alla spiaggia',
    stationLabel: 'Scalea–S. Domenica Talao',
    openRoute: 'Apri il percorso esatto',
    schematicNote: 'Il sito mostra uno schema leggero. Il percorso pedonale esatto si apre in Google Maps.',
  },
  de: {
    amenitiesSuffix: 'Außerdem gibt es einen Haartrockner, eine Mikrowelle und die wichtigsten Küchenutensilien.',
    beachQuestion: 'Was steht für einen Strandtag zur Verfügung?',
    beachAnswer: 'Für Gäste steht ein Sonnenschirm zur Verfügung, der mit zum Meer genommen werden kann.',
    routesTitle: 'Lage und Wege',
    routesSubtitle: 'Sehen Sie den Weg zum nächsten öffentlichen Strandzugang und die Anreise vom Bahnhof Scalea.',
    beachTab: 'Zum nächsten Strand',
    stationTab: 'Vom Bahnhof Scalea',
    beachMetric: 'Etwa 400 m zu Fuß',
    stationMetric: 'Route vom Bahnhof',
    homeLabel: 'Casa Marittima',
    beachLabel: 'Öffentlicher Strandzugang',
    stationLabel: 'Scalea–S. Domenica Talao',
    openRoute: 'Genaue Route öffnen',
    schematicNote: 'Die Website zeigt eine leichte Routenskizze. Die genaue Fußroute wird in Google Maps geöffnet.',
  },
  cs: {
    amenitiesSuffix: 'V apartmánu je také fén, mikrovlnná trouba a základní kuchyňské vybavení.',
    beachQuestion: 'Co je k dispozici pro pobyt na pláži?',
    beachAnswer: 'Hosté mají k dispozici plážový slunečník, který si mohou vzít k moři.',
    routesTitle: 'Poloha a trasy',
    routesSubtitle: 'Podívejte se na cestu k nejbližšímu veřejnému vstupu na pláž a trasu z vlakového nádraží Scalea.',
    beachTab: 'K nejbližší pláži',
    stationTab: 'Z nádraží Scalea',
    beachMetric: 'Přibližně 400 m pěšky',
    stationMetric: 'Trasa z vlakového nádraží',
    homeLabel: 'Casa Marittima',
    beachLabel: 'Veřejný vstup na pláž',
    stationLabel: 'Scalea–S. Domenica Talao',
    openRoute: 'Otevřít přesnou trasu',
    schematicNote: 'Na webu je lehké schéma. Přesná pěší trasa se otevře v Google Maps.',
  },
};

const HOME_ADDRESS = 'Via Giuseppe Saragat 11, 87029 Scalea CS, Italy';
const BEACH_DESTINATION = 'Spiaggia libera, Scalea CS, Italy';
const STATION_ADDRESS = 'Scalea-Santa Domenica Talao railway station, Scalea CS, Italy';

const directionsUrl = (origin: string, destination: string, travelMode: 'walking' | 'driving') =>
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
    { q: t('faqQ6'), a: t('faqA6') },
    { q: t('faqQ7'), a: t('faqA7') },
    { q: t('faqQ8'), a: t('faqA8') },
    { q: copy.beachQuestion, a: copy.beachAnswer },
  ], [copy, t]);

  const isBeach = activeRoute === 'beach';
  const routeUrl = isBeach
    ? directionsUrl(HOME_ADDRESS, BEACH_DESTINATION, 'walking')
    : directionsUrl(STATION_ADDRESS, HOME_ADDRESS, 'walking');

  return (
    <>
      <section id="faq" className="py-12 px-4 bg-white scroll-mt-40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-slate-900 mb-4 break-words hyphens-none">
              {t('faqTitle')}
            </h2>
            <div className="w-12 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={`${faq.q}-${idx}`}
                className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  aria-expanded={openIndex === idx}
                  className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-900 pr-4">{faq.q}</span>
                  {openIndex === idx ? (
                    <ChevronUp className="w-5 h-5 text-indigo-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 pt-0 text-slate-500 leading-relaxed border-t border-slate-50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="routes" className="py-14 px-4 bg-slate-50 border-y border-slate-100 scroll-mt-40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-[0.24em] mb-4">
              <MapPin className="w-4 h-4" />
              Scalea
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-slate-900 mb-4 break-words hyphens-none">
              {copy.routesTitle}
            </h2>
            <p className="max-w-3xl mx-auto text-slate-500 leading-relaxed">
              {copy.routesSubtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8" role="tablist" aria-label={copy.routesTitle}>
            <button
              type="button"
              role="tab"
              aria-selected={isBeach}
              onClick={() => setActiveRoute('beach')}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-black text-sm transition-all ${
                isBeach ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              <Waves className="w-5 h-5" />
              {copy.beachTab}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={!isBeach}
              onClick={() => setActiveRoute('station')}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-black text-sm transition-all ${
                !isBeach ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              <Train className="w-5 h-5" />
              {copy.stationTab}
            </button>
          </div>

          <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
            <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
              <div className="relative min-h-[320px] p-6 sm:p-10 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.10),transparent_35%),linear-gradient(135deg,#f8fafc,#eef2ff)] overflow-hidden">
                <div className="absolute inset-0 opacity-40" aria-hidden="true" style={{ backgroundImage: 'linear-gradient(rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.18) 1px, transparent 1px)', backgroundSize: '34px 34px' }} />

                <svg className="relative w-full h-[250px]" viewBox="0 0 700 260" role="img" aria-label={isBeach ? copy.beachTab : copy.stationTab}>
                  <path
                    d={isBeach ? 'M110 195 C230 170 260 70 370 92 S510 205 610 80' : 'M90 70 C210 48 240 170 360 158 S500 55 620 188'}
                    fill="none"
                    stroke="rgb(199 210 254)"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />
                  <path
                    id="active-route-path"
                    d={isBeach ? 'M110 195 C230 170 260 70 370 92 S510 205 610 80' : 'M90 70 C210 48 240 170 360 158 S500 55 620 188'}
                    fill="none"
                    stroke="rgb(79 70 229)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="12 12"
                  />
                  <circle r="9" fill="rgb(79 70 229)">
                    <animateMotion
                      dur={isBeach ? '7s' : '9s'}
                      repeatCount="indefinite"
                      path={isBeach ? 'M110 195 C230 170 260 70 370 92 S510 205 610 80' : 'M90 70 C210 48 240 170 360 158 S500 55 620 188'}
                    />
                  </circle>
                </svg>

                <div className="absolute left-6 sm:left-10 bottom-7 flex items-center gap-3 bg-white/95 border border-slate-200 rounded-2xl px-4 py-3 shadow-sm max-w-[220px]">
                  {isBeach ? <Home className="w-5 h-5 text-indigo-600 shrink-0" /> : <Train className="w-5 h-5 text-indigo-600 shrink-0" />}
                  <span className="text-xs font-black text-slate-800 leading-tight">{isBeach ? copy.homeLabel : copy.stationLabel}</span>
                </div>

                <div className="absolute right-6 sm:right-10 top-7 flex items-center gap-3 bg-white/95 border border-slate-200 rounded-2xl px-4 py-3 shadow-sm max-w-[220px]">
                  {isBeach ? <Waves className="w-5 h-5 text-indigo-600 shrink-0" /> : <Home className="w-5 h-5 text-indigo-600 shrink-0" />}
                  <span className="text-xs font-black text-slate-800 leading-tight">{isBeach ? copy.beachLabel : copy.homeLabel}</span>
                </div>
              </div>

              <div className="p-7 sm:p-9 flex flex-col justify-center">
                <div className="text-xs font-black uppercase tracking-[0.22em] text-indigo-600 mb-3">
                  {isBeach ? copy.beachTab : copy.stationTab}
                </div>
                <div className="text-2xl font-black text-slate-900 mb-4">
                  {isBeach ? copy.beachMetric : copy.stationMetric}
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-7">
                  {copy.schematicNote}
                </p>
                <a
                  href={routeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-4 font-black text-sm transition-colors active:scale-[0.98]"
                >
                  {copy.openRoute}
                  <ExternalLink className="w-4 h-4" />
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
