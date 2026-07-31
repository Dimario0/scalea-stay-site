import React from 'react';
import { ArrowDownRight, ShoppingBasket, TrainFront, UsersRound, Waves } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../analytics';

type LocalFact = {
  title: string;
  description: string;
};

type LocalFactsCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  facts: [LocalFact, LocalFact, LocalFact, LocalFact];
};

const COPY: Record<string, LocalFactsCopy> = {
  ru: {
    eyebrow: 'Полезно до поездки',
    title: 'Что удобно рядом с Casa Marittima',
    subtitle: 'Проверенные ориентиры без приблизительных обещаний о расстоянии и времени.',
    cta: 'Открыть маршруты',
    facts: [
      {
        title: 'Ближайший пляж',
        description: 'Пешеходный путь строится между точными координатами дома и ближайшего пляжного выхода. Фактическое время зависит от выбранных улиц.',
      },
      {
        title: 'Покупки на каждый день',
        description: 'В центральной части Скалеи удобно покупать продукты, воду и всё необходимое для отдыха.',
      },
      {
        title: 'Без автомобиля',
        description: 'Станция Scalea–Santa Domenica Talao связана с городом. Из аэропорта SUF можно ехать Airlink до Lamezia Terme Centrale, затем поездом до Scalea.',
      },
      {
        title: 'Для семей до 4 гостей',
        description: 'В квартире есть кухня, микроволновая печь, кондиционер, терраса, пляжный зонт и гостевая парковка.',
      },
    ],
  },
  en: {
    eyebrow: 'Useful before arrival',
    title: 'What is convenient around Casa Marittima',
    subtitle: 'Confirmed practical information without approximate distance or walking-time promises.',
    cta: 'Open routes',
    facts: [
      {
        title: 'Nearest beach access',
        description: 'The walking route is built between the confirmed apartment and beach-access coordinates. Actual time depends on the streets selected.',
      },
      {
        title: 'Everyday shopping',
        description: 'Groceries, water and everyday holiday essentials are easy to buy in central Scalea.',
      },
      {
        title: 'Arrival without a car',
        description: 'Scalea–Santa Domenica Talao station serves the town. From SUF Airport, take Airlink to Lamezia Terme Centrale and continue by train to Scalea.',
      },
      {
        title: 'For families up to 4 guests',
        description: 'The apartment includes a kitchen, microwave, air conditioning, terrace, beach umbrella and guest parking.',
      },
    ],
  },
  it: {
    eyebrow: 'Utile prima del viaggio',
    title: 'Cosa è comodo vicino a Casa Marittima',
    subtitle: 'Informazioni pratiche confermate, senza promesse approssimative su distanza o tempi a piedi.',
    cta: 'Apri i percorsi',
    facts: [
      {
        title: 'Accesso alla spiaggia più vicino',
        description: 'Il percorso pedonale viene costruito tra le coordinate confermate dell’appartamento e dell’accesso alla spiaggia. Il tempo effettivo dipende dalle strade scelte.',
      },
      {
        title: 'Acquisti quotidiani',
        description: 'Nel centro di Scalea è facile acquistare generi alimentari, acqua e tutto il necessario per il soggiorno.',
      },
      {
        title: 'Arrivo senza auto',
        description: 'La stazione Scalea–Santa Domenica Talao serve la città. Dall’aeroporto SUF: Airlink fino a Lamezia Terme Centrale e poi treno per Scalea.',
      },
      {
        title: 'Per famiglie fino a 4 ospiti',
        description: 'L’appartamento dispone di cucina, microonde, aria condizionata, terrazza, ombrellone e parcheggio per gli ospiti.',
      },
    ],
  },
  de: {
    eyebrow: 'Nützlich vor der Anreise',
    title: 'Was rund um Casa Marittima praktisch ist',
    subtitle: 'Bestätigte praktische Angaben ohne ungefähre Versprechen zu Entfernung oder Gehzeit.',
    cta: 'Routen öffnen',
    facts: [
      {
        title: 'Nächstgelegener Strandzugang',
        description: 'Der Fußweg wird zwischen den bestätigten Koordinaten der Unterkunft und des Strandzugangs berechnet. Die tatsächliche Zeit hängt von den gewählten Straßen ab.',
      },
      {
        title: 'Einkaufen im Alltag',
        description: 'Lebensmittel, Wasser und alles Wichtige für den Urlaub lassen sich im Zentrum von Scalea bequem einkaufen.',
      },
      {
        title: 'Anreise ohne Auto',
        description: 'Der Bahnhof Scalea–Santa Domenica Talao bedient die Stadt. Vom Flughafen SUF geht es mit Airlink nach Lamezia Terme Centrale und weiter mit dem Zug nach Scalea.',
      },
      {
        title: 'Für Familien bis 4 Gäste',
        description: 'Die Wohnung bietet Küche, Mikrowelle, Klimaanlage, Terrasse, Sonnenschirm und Gästeparkplatz.',
      },
    ],
  },
  cs: {
    eyebrow: 'Užitečné před cestou',
    title: 'Co je praktické v okolí Casa Marittima',
    subtitle: 'Ověřené praktické informace bez přibližných slibů o vzdálenosti nebo době chůze.',
    cta: 'Otevřít trasy',
    facts: [
      {
        title: 'Nejbližší vstup na pláž',
        description: 'Pěší trasa se vytváří mezi potvrzenými souřadnicemi apartmánu a vstupu na pláž. Skutečný čas závisí na zvolených ulicích.',
      },
      {
        title: 'Každodenní nákupy',
        description: 'Potraviny, vodu a vše potřebné pro dovolenou lze pohodlně nakoupit v centru města Scalea.',
      },
      {
        title: 'Příjezd bez auta',
        description: 'Město obsluhuje stanice Scalea–Santa Domenica Talao. Z letiště SUF jeďte Airlinkem do Lamezia Terme Centrale a poté vlakem do Scalea.',
      },
      {
        title: 'Pro rodiny až se 4 hosty',
        description: 'Apartmán nabízí kuchyň, mikrovlnnou troubu, klimatizaci, terasu, slunečník a parkování pro hosty.',
      },
    ],
  },
};

const ICONS = [Waves, ShoppingBasket, TrainFront, UsersRound];

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
        <div className="max-w-3xl mb-10">
          <span className="block text-[10px] sm:text-xs font-black uppercase tracking-[0.35em] text-indigo-600 mb-4">
            {copy.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 mb-4 break-words hyphens-none">
            {copy.title}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl">
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
                <dt className="font-black uppercase tracking-tight text-slate-900 mb-3">
                  {fact.title}
                </dt>
                <dd className="text-sm leading-relaxed text-slate-500">
                  {fact.description}
                </dd>
              </div>
            );
          })}
        </dl>

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
