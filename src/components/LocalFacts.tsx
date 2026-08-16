import React from 'react';
import { ArrowDownRight, Castle, Landmark, ShoppingBasket, TrainFront, Waves } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../analytics';

type LocalFact = {
  title: string;
  metric: string;
  description?: string;
};

type LocalFactsCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  extraLabel: string;
  facts: [LocalFact, LocalFact, LocalFact, LocalFact];
  extras: [LocalFact, LocalFact];
};

const COPY: Record<string, LocalFactsCopy> = {
  ru: {
    eyebrow: 'Всё рядом пешком',
    title: 'Отдых у моря, где всё рядом',
    subtitle: 'От ScaleaStay легко дойти пешком до моря, супермаркета, вокзала, старого города и мест для вечерних прогулок.',
    cta: 'Посмотреть маршруты',
    extraLabel: 'Ещё рядом',
    facts: [
      { title: 'Пляж', metric: '600 м · около 8 мин пешком' },
      { title: 'Interspar', metric: '230 м · около 3 мин пешком' },
      { title: 'Вокзал Scalea', metric: '500 м · около 8 мин пешком' },
      {
        title: 'Исторический центр',
        metric: '950 м · около 13 мин пешком',
        description: 'Приятная прогулка по спокойным улицам Скалеи.',
      },
    ],
    extras: [
      { title: 'Torre Talao', metric: '900 м · около 12 мин пешком' },
      { title: 'Piazza Gregorio Caloprese', metric: '950 м · около 13 мин пешком' },
    ],
  },
  en: {
    eyebrow: 'Everything within walking distance',
    title: 'Enjoy Scalea without needing a car',
    subtitle: 'From ScaleaStay you can easily walk to the sea, supermarket, train station, old town and the main evening-walk area.',
    cta: 'View routes',
    extraLabel: 'Also nearby',
    facts: [
      { title: 'Beach', metric: '600 m · about 8 min walk' },
      { title: 'Interspar', metric: '230 m · about 3 min walk' },
      { title: 'Scalea station', metric: '500 m · about 8 min walk' },
      {
        title: 'Historic centre',
        metric: '950 m · about 13 min walk',
        description: 'A pleasant walk through quiet streets of Scalea.',
      },
    ],
    extras: [
      { title: 'Torre Talao', metric: '900 m · about 12 min walk' },
      { title: 'Piazza Gregorio Caloprese', metric: '950 m · about 13 min walk' },
    ],
  },
  it: {
    eyebrow: 'Tutto raggiungibile a piedi',
    title: 'Vivi Scalea senza dover usare l’auto',
    subtitle: 'Da ScaleaStay puoi raggiungere facilmente a piedi il mare, il supermercato, la stazione, il centro storico e la zona delle passeggiate serali.',
    cta: 'Vedi i percorsi',
    extraLabel: 'Anche nelle vicinanze',
    facts: [
      { title: 'Spiaggia', metric: '600 m · circa 8 min a piedi' },
      { title: 'Interspar', metric: '230 m · circa 3 min a piedi' },
      { title: 'Stazione di Scalea', metric: '500 m · circa 8 min a piedi' },
      {
        title: 'Centro storico',
        metric: '950 m · circa 13 min a piedi',
        description: 'Una piacevole passeggiata lungo tranquille vie di Scalea.',
      },
    ],
    extras: [
      { title: 'Torre Talao', metric: '900 m · circa 12 min a piedi' },
      { title: 'Piazza Gregorio Caloprese', metric: '950 m · circa 13 min a piedi' },
    ],
  },
  de: {
    eyebrow: 'Alles zu Fuß erreichbar',
    title: 'Scalea genießen, ohne auf ein Auto angewiesen zu sein',
    subtitle: 'Von ScaleaStay erreichen Sie Meer, Supermarkt, Bahnhof, Altstadt und die zentrale Abendpromenade bequem zu Fuß.',
    cta: 'Routen ansehen',
    extraLabel: 'Ebenfalls in der Nähe',
    facts: [
      { title: 'Strand', metric: '600 m · ca. 8 Min. zu Fuß' },
      { title: 'Interspar', metric: '230 m · ca. 3 Min. zu Fuß' },
      { title: 'Bahnhof Scalea', metric: '500 m · ca. 8 Min. zu Fuß' },
      {
        title: 'Historisches Zentrum',
        metric: '950 m · ca. 13 Min. zu Fuß',
        description: 'Ein angenehmer Spaziergang durch ruhige Straßen von Scalea.',
      },
    ],
    extras: [
      { title: 'Torre Talao', metric: '900 m · ca. 12 Min. zu Fuß' },
      { title: 'Piazza Gregorio Caloprese', metric: '950 m · ca. 13 Min. zu Fuß' },
    ],
  },
  cs: {
    eyebrow: 'Všude pohodlně pěšky',
    title: 'Užijte si Scaleu bez nutnosti používat auto',
    subtitle: 'Ze ScaleaStay snadno dojdete pěšky k moři, supermarketu, nádraží, historickému centru i do hlavní večerní pěší zóny.',
    cta: 'Zobrazit trasy',
    extraLabel: 'Také v okolí',
    facts: [
      { title: 'Pláž', metric: '600 m · přibližně 8 min pěšky' },
      { title: 'Interspar', metric: '230 m · přibližně 3 min pěšky' },
      { title: 'Nádraží Scalea', metric: '500 m · přibližně 8 min pěšky' },
      {
        title: 'Historické centrum',
        metric: '950 m · přibližně 13 min pěšky',
        description: 'Příjemná procházka klidnými ulicemi města Scalea.',
      },
    ],
    extras: [
      { title: 'Torre Talao', metric: '900 m · přibližně 12 min pěšky' },
      { title: 'Piazza Gregorio Caloprese', metric: '950 m · přibližně 13 min pěšky' },
    ],
  },
};

const ICONS = [Waves, ShoppingBasket, TrainFront, Castle];
const EXTRA_ICONS = [Landmark, ArrowDownRight];

const LocalFacts: React.FC = () => {
  const { language } = useLanguage();
  const copy = COPY[language] || COPY.ru;

  const openRoutes = () => {
    trackEvent('route_section_open', {
      source: 'local_facts',
    });
    document.getElementById('routes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="local-info" className="px-4 py-14 bg-gradient-to-b from-sky-50 via-white to-white scroll-mt-40">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-4xl mb-10">
          <span className="block text-[10px] sm:text-xs font-black uppercase tracking-[0.35em] text-indigo-600 mb-4">
            {copy.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 mb-4 break-words hyphens-none">
            {copy.title}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-3xl">
            {copy.subtitle}
          </p>
        </div>

        <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {copy.facts.map((fact, index) => {
            const Icon = ICONS[index];
            return (
              <div key={fact.title} className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm">
                <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <dt className="font-black uppercase tracking-tight text-slate-900 mb-2">
                  {fact.title}
                </dt>
                <dd className="text-sm font-black text-indigo-600 leading-relaxed">
                  {fact.metric}
                </dd>
                {fact.description && (
                  <dd className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-500">
                    {fact.description}
                  </dd>
                )}
              </div>
            );
          })}
        </dl>

        <div className="mt-6 rounded-[28px] border border-slate-100 bg-slate-50/70 p-5 sm:p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">
            {copy.extraLabel}
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {copy.extras.map((fact, index) => {
              const Icon = EXTRA_ICONS[index];
              return (
                <div key={fact.title} className="flex items-center gap-4 rounded-2xl bg-white px-4 py-4 border border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-tight text-slate-900">{fact.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{fact.metric}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={openRoutes}
          className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-slate-900 px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition-all hover:bg-indigo-600 active:scale-95"
        >
          {copy.cta}
          <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

export default LocalFacts;
