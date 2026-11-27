import React from 'react';
import {
  ArrowDownRight,
  BedDouble,
  Castle,
  ExternalLink,
  Landmark,
  MapPin,
  MessageCircle,
  ShoppingBasket,
  Sparkles,
  TrainFront,
  Waves,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT_INFO } from '../constants';
import { getLongStayCopy } from '../content/longStay';
import { trackEvent } from '../analytics';

type LocalFact = {
  title: string;
  metric: string;
  description?: string;
};

type GuestChoiceCopy = {
  sleepingTitle: string;
  bedroomLabel: string;
  bedroomValue: string;
  livingRoomLabel: string;
  livingRoomValue: string;
  linenText: string;
  distancesTitle: string;
  primaryDistances: [LocalFact, LocalFact, LocalFact];
  termsTitle: string;
  nightlyTermsLabel: string;
  nightlyTermsText: string;
  winterTermsLabel: string;
  winterTermsText: string;
  stationRouteCta: string;
  whatsappCta: string;
  walkExtras: [LocalFact, LocalFact, LocalFact];
};

type LocalFactsCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  extraLabel: string;
  facts: [LocalFact, LocalFact, LocalFact, LocalFact];
  extras: [LocalFact, LocalFact];
  guestChoice?: GuestChoiceCopy;
};

const STATION_TO_HOME_WALKING_URL =
  'https://www.google.com/maps/dir/?api=1&origin=' +
  encodeURIComponent('Scalea-Santa Domenica Talao railway station, Scalea CS, Italy') +
  '&destination=' +
  encodeURIComponent('39.8074152,15.7949133') +
  '&travelmode=walking';

const COPY: Record<string, LocalFactsCopy> = {
  ru: {
    eyebrow: 'До 4 гостей · Всё рядом пешком',
    title: 'Отдых у моря, где всё рядом',
    subtitle:
      'Апартаменты на Via Giuseppe Saragat 11 вмещают до четырёх гостей: пляж, железнодорожный вокзал и супермаркет Interspar находятся в пешей доступности.',
    cta: 'Посмотреть все маршруты',
    extraLabel: 'Ещё рядом для прогулок',
    facts: [
      { title: 'Пляж', metric: '600 м · около 5–8 мин пешком' },
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
    guestChoice: {
      sleepingTitle: 'Как спят 4 гостя',
      bedroomLabel: 'Отдельная спальня',
      bedroomValue: 'Двуспальная кровать',
      livingRoomLabel: 'Гостиная',
      livingRoomValue: 'Раскладной диван на двоих',
      linenText: 'Постельное бельё и полотенца предоставляем.',
      distancesTitle: 'Расстояния пешком',
      primaryDistances: [
        { title: 'Пляж', metric: '600 м · около 5–8 мин пешком' },
        { title: 'Вокзал Scalea–Santa Domenica Talao', metric: '500 м · около 8 мин пешком' },
        { title: 'Супермаркет Interspar', metric: '230 м · около 3 мин пешком' },
      ],
      termsTitle: 'Что включено в стоимость',
      nightlyTermsLabel: 'Прямые посуточные тарифы',
      nightlyTermsText: 'Уборка и электричество включены в стоимость. Бельё и полотенца предоставляем.',
      winterTermsLabel: 'Зимняя аренда за €450 в месяц',
      winterTermsText: 'С ноября по март (от одного месяца) коммунальные услуги оплачиваются отдельно.',
      stationRouteCta: 'Пеший маршрут от вокзала до квартиры',
      whatsappCta: 'Написать в WhatsApp',
      walkExtras: [
        { title: 'Исторический центр', metric: '950 м · около 13 мин пешком' },
        { title: 'Torre Talao', metric: '900 м · около 12 мин пешком' },
        { title: 'Piazza Gregorio Caloprese', metric: '950 м · около 13 мин пешком' },
      ],
    },
  },
  en: {
    eyebrow: 'Everything within walking distance',
    title: 'Enjoy Scalea without needing a car',
    subtitle: 'From ScaleaStay you can easily walk to the sea, supermarket, train station, old town and the main evening-walk area.',
    cta: 'View routes',
    extraLabel: 'Also nearby',
    facts: [
      { title: 'Beach', metric: '600 m · about 5–8 min walk' },
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
    eyebrow: 'Fino a 4 ospiti · Tutto a piedi',
    title: 'Vacanze al mare, con tutto vicino',
    subtitle:
      'L’appartamento in Via Giuseppe Saragat 11 accoglie fino a quattro ospiti: spiaggia, stazione ferroviaria e supermercato Interspar si raggiungono a piedi.',
    cta: 'Scopri tutti i percorsi',
    extraLabel: 'Anche nelle vicinanze',
    facts: [
      { title: 'Spiaggia', metric: '600 m · circa 5–8 min a piedi' },
      { title: 'Interspar', metric: '230 m · circa 3 min a piedi' },
      { title: 'Stazione di Scalea', metric: '500 m · circa 8 min a piedi' },
      {
        title: 'Centro storico',
        metric: '950 m · circa 13 min a piedi',
        description: 'Una piacevole passeggiata tra le vie tranquille di Scalea.',
      },
    ],
    extras: [
      { title: 'Torre Talao', metric: '900 m · circa 12 min a piedi' },
      { title: 'Piazza Gregorio Caloprese', metric: '950 m · circa 13 min a piedi' },
    ],
    guestChoice: {
      sleepingTitle: 'Come dormono 4 ospiti',
      bedroomLabel: 'Camera da letto separata',
      bedroomValue: 'Letto matrimoniale',
      livingRoomLabel: 'Soggiorno',
      livingRoomValue: 'Divano letto apribile per due persone',
      linenText: 'Biancheria da letto e asciugamani sono forniti.',
      distancesTitle: 'Distanze a piedi',
      primaryDistances: [
        { title: 'Spiaggia', metric: '600 m · circa 5–8 min a piedi' },
        { title: 'Stazione Scalea–Santa Domenica Talao', metric: '500 m · circa 8 min a piedi' },
        { title: 'Supermercato Interspar', metric: '230 m · circa 3 min a piedi' },
      ],
      termsTitle: 'Cosa è incluso',
      nightlyTermsLabel: 'Tariffe giornaliere dirette',
      nightlyTermsText: 'Pulizia ed elettricità sono incluse nel prezzo. Biancheria e asciugamani forniti.',
      winterTermsLabel: 'Affitto invernale a 450 € al mese',
      winterTermsText: 'Da novembre a marzo (minimo un mese) le utenze si pagano a parte.',
      stationRouteCta: 'Percorso a piedi dalla stazione a casa',
      whatsappCta: 'Scrivici su WhatsApp',
      walkExtras: [
        { title: 'Centro storico', metric: '950 m · circa 13 min a piedi' },
        { title: 'Torre Talao', metric: '900 m · circa 12 min a piedi' },
        { title: 'Piazza Gregorio Caloprese', metric: '950 m · circa 13 min a piedi' },
      ],
    },
  },
  de: {
    eyebrow: 'Alles bequem zu Fuß',
    title: 'Urlaub am Meer, alles in der Nähe',
    subtitle: 'Von ScaleaStay erreichen Sie Strand, Interspar, Bahnhof, Altstadt und die beliebtesten Bereiche für einen Abendspaziergang bequem zu Fuß.',
    cta: 'Wege ansehen',
    extraLabel: 'Auch in der Nähe',
    facts: [
      { title: 'Strand', metric: '600 m · ca. 5–8 Min. zu Fuß' },
      { title: 'Interspar', metric: '230 m · ca. 3 Min. zu Fuß' },
      { title: 'Bahnhof Scalea', metric: '500 m · ca. 8 Min. zu Fuß' },
      {
        title: 'Historisches Zentrum',
        metric: '950 m · ca. 13 Min. zu Fuß',
        description: 'Ein angenehmer Spaziergang durch die ruhigen Straßen von Scalea.',
      },
    ],
    extras: [
      { title: 'Torre Talao', metric: '900 m · ca. 12 Min. zu Fuß' },
      { title: 'Piazza Gregorio Caloprese', metric: '950 m · ca. 13 Min. zu Fuß' },
    ],
  },
  cs: {
    eyebrow: 'Všechno pohodlně pěšky',
    title: 'Dovolená u moře, kde je vše blízko',
    subtitle: 'Ze ScaleaStay pohodlně dojdete na pláž, do Intersparu, na nádraží, do historického centra i do míst vhodných pro večerní procházku.',
    cta: 'Prohlédnout trasy',
    extraLabel: 'Také v okolí',
    facts: [
      { title: 'Pláž', metric: '600 m · přibližně 5–8 min pěšky' },
      { title: 'Interspar', metric: '230 m · přibližně 3 min pěšky' },
      { title: 'Nádraží Scalea', metric: '500 m · přibližně 8 min pěšky' },
      {
        title: 'Historické centrum',
        metric: '950 m · přibližně 13 min pěšky',
        description: 'Příjemná procházka klidnými ulicemi Scalei.',
      },
    ],
    extras: [
      { title: 'Torre Talao', metric: '900 m · přibližně 12 min pěšky' },
      { title: 'Piazza Gregorio Caloprese', metric: '950 m · přibližně 13 min pěšky' },
    ],
  },
  pl: {
    eyebrow: 'Wszystko w zasięgu spaceru',
    title: 'Wakacje nad morzem, gdzie wszystko jest blisko',
    subtitle: 'Ze ScaleaStay dojdziesz pieszo na plażę, do Intersparu, na dworzec, do historycznego centrum i w miejsca idealne na wieczorny spacer.',
    cta: 'Zobacz trasy',
    extraLabel: 'Także w pobliżu',
    facts: [
      { title: 'Plaża', metric: '600 m · około 5–8 min pieszo' },
      { title: 'Interspar', metric: '230 m · około 3 min pieszo' },
      { title: 'Dworzec Scalea', metric: '500 m · około 8 min pieszo' },
      {
        title: 'Historyczne centrum',
        metric: '950 m · około 13 min pieszo',
        description: 'Przyjemny spacer spokojnymi uliczkami Scalei.',
      },
    ],
    extras: [
      { title: 'Torre Talao', metric: '900 m · około 12 min pieszo' },
      { title: 'Piazza Gregorio Caloprese', metric: '950 m · około 13 min pieszo' },
    ],
  },
};

const ICONS = [Waves, ShoppingBasket, TrainFront, Castle];
const PRIMARY_DISTANCE_ICONS = [Waves, TrainFront, ShoppingBasket];
const WALK_EXTRA_ICONS = [Castle, Landmark, ArrowDownRight];
const EXTRA_ICONS = [Landmark, ArrowDownRight];

export const LocalFactsContent: React.FC<{ language: string }> = ({ language }) => {
  const copy = COPY[language] || COPY.ru;
  const stayCopy = getLongStayCopy(language);
  const whatsappUrl = CONTACT_INFO.whatsappLink(stayCopy.inquiry);

  const openRoutes = () => {
    trackEvent('route_section_open', {
      source: 'local_facts',
    });
    document.getElementById('routes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleStationMapOpen = () => {
    trackEvent('route_map_open', {
      route: 'station',
      travel_mode: 'walking',
      source: 'local_facts',
    });
  };

  return (
    <section id="local-info" className="px-4 py-14 bg-gradient-to-b from-sky-50 via-white to-white scroll-mt-40">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-4xl mb-8 sm:mb-10">
          <span className="block text-[10px] sm:text-xs font-black uppercase tracking-[0.35em] text-indigo-600 mb-4">
            {copy.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4 break-words hyphens-none">
            {copy.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
            {copy.subtitle}
          </p>
        </div>

        {copy.guestChoice ? (
          <>
            <div className="grid lg:grid-cols-2 gap-4 sm:gap-5">
              <div
                data-guest-sleeping
                className="rounded-[28px] border border-indigo-100 bg-white p-5 sm:p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <BedDouble className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl sm:text-2xl text-slate-900">
                      {copy.guestChoice.sleepingTitle}
                    </h3>
                  </div>

                  <dl className="space-y-3">
                    <div className="rounded-2xl bg-slate-50/90 border border-slate-100 px-4 py-3.5">
                      <dt className="text-xs font-black uppercase tracking-wider text-indigo-600">
                        {copy.guestChoice.bedroomLabel}
                      </dt>
                      <dd className="mt-1 text-sm sm:text-base font-bold text-slate-900">
                        {copy.guestChoice.bedroomValue}
                      </dd>
                    </div>
                    <div className="rounded-2xl bg-slate-50/90 border border-slate-100 px-4 py-3.5">
                      <dt className="text-xs font-black uppercase tracking-wider text-indigo-600">
                        {copy.guestChoice.livingRoomLabel}
                      </dt>
                      <dd className="mt-1 text-sm sm:text-base font-bold text-slate-900">
                        {copy.guestChoice.livingRoomValue}
                      </dd>
                    </div>
                  </dl>
                </div>

                <p className="mt-4 flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                  <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" aria-hidden="true" />
                  <span>{copy.guestChoice.linenText}</span>
                </p>
              </div>

              <div
                data-guest-distances
                className="rounded-[28px] border border-slate-100 bg-white p-5 sm:p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl sm:text-2xl text-slate-900">
                    {copy.guestChoice.distancesTitle}
                  </h3>
                </div>

                <dl className="space-y-3">
                  {copy.guestChoice.primaryDistances.map((item, idx) => {
                    const Icon = PRIMARY_DISTANCE_ICONS[idx];
                    return (
                      <div
                        key={item.title}
                        className="flex items-start gap-3.5 rounded-2xl bg-slate-50/90 border border-slate-100 px-4 py-3.5"
                      >
                        <div className="w-9 h-9 rounded-xl bg-white text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <dt className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                            {item.title}
                          </dt>
                          <dd className="mt-0.5 text-sm font-black text-indigo-600 leading-snug">
                            {item.metric}
                          </dd>
                        </div>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </div>

            <div
              data-guest-terms
              className="mt-5 rounded-[28px] border border-indigo-100 bg-indigo-50/75 p-5 sm:p-6"
            >
              <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.28em] text-indigo-700 mb-3.5">
                {copy.guestChoice.termsTitle}
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white px-4 py-3.5 border border-indigo-100/90">
                  <p className="text-xs font-black uppercase tracking-wide text-slate-900">
                    {copy.guestChoice.nightlyTermsLabel}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {copy.guestChoice.nightlyTermsText}
                  </p>
                </div>
                <div className="rounded-2xl bg-white px-4 py-3.5 border border-indigo-100/90">
                  <p className="text-xs font-black uppercase tracking-wide text-slate-900">
                    {copy.guestChoice.winterTermsLabel}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {copy.guestChoice.winterTermsText}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row flex-wrap gap-3">
                <a
                  href={STATION_TO_HOME_WALKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleStationMapOpen}
                  className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2.5 rounded-2xl bg-slate-900 px-5 py-3.5 text-sm text-white text-center transition-colors hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900"
                >
                  <TrainFront className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{copy.guestChoice.stationRouteCta}</span>
                  <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics-source="local_facts"
                  className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2.5 rounded-2xl bg-indigo-600 px-5 py-3.5 text-sm text-white text-center transition-colors hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{copy.guestChoice.whatsappCta}</span>
                </a>
              </div>
            </div>

            <div className="mt-5 rounded-[28px] border border-slate-100 bg-slate-50/70 p-5 sm:p-6">
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                {copy.extraLabel}
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {copy.guestChoice.walkExtras.map((fact, index) => {
                  const Icon = WALK_EXTRA_ICONS[index];
                  return (
                    <div key={fact.title} className="flex items-center gap-3.5 rounded-2xl bg-white px-4 py-3.5 border border-slate-100">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-black uppercase tracking-tight text-slate-900">{fact.title}</p>
                        <p className="text-xs text-slate-500 mt-1">{fact.metric}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <>
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
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
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
          </>
        )}

        <button
          type="button"
          onClick={openRoutes}
          className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-slate-900 px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition-all hover:bg-indigo-600 active:scale-95"
        >
          {copy.cta}
          <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

const LocalFacts: React.FC = () => {
  const { language } = useLanguage();
  return <LocalFactsContent language={language} />;
};

export default LocalFacts;
