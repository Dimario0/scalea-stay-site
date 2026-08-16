import React, { createContext, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TRANSLATIONS, LANGUAGES } from '../constants';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  currentLanguage: typeof LANGUAGES[0];
}

type SeoEntry = {
  title: string;
  description: string;
  locale: string;
};

const SEO_BY_LANGUAGE: Record<string, SeoEntry> = {
  ru: {
    title: 'Апартаменты в Скалее у моря | ScaleaStay',
    description: 'ScaleaStay в Скалее, Калабрия: апартаменты с современным ремонтом, кондиционером, парковкой и кухней. Пляж — 600 м, около 5–8 минут пешком. Проверяйте даты напрямую.',
    locale: 'ru_RU',
  },
  en: {
    title: 'Holiday Apartment in Scalea, Calabria | ScaleaStay',
    description: 'ScaleaStay in Scalea, Calabria: a modern holiday apartment with air conditioning, parking and an equipped kitchen. The beach is 600 m away, about a 5–8 minute walk. Check dates directly.',
    locale: 'en_GB',
  },
  it: {
    title: 'Appartamento Vacanze a Scalea, Calabria | ScaleaStay',
    description: 'ScaleaStay a Scalea, Calabria: appartamento moderno con aria condizionata, parcheggio e cucina attrezzata. La spiaggia dista 600 m, circa 5–8 minuti a piedi. Verifica le date direttamente.',
    locale: 'it_IT',
  },
  de: {
    title: 'Ferienwohnung in Scalea, Kalabrien | ScaleaStay',
    description: 'ScaleaStay in Scalea, Kalabrien: moderne Ferienwohnung mit Klimaanlage, Parkplatz und ausgestatteter Küche. Der Strand ist 600 m entfernt, etwa 5–8 Gehminuten. Verfügbarkeit direkt prüfen.',
    locale: 'de_DE',
  },
  cs: {
    title: 'Apartmán ve Scalee, Kalábrie | ScaleaStay',
    description: 'ScaleaStay ve Scalee v Kalábrii: moderní apartmán s klimatizací, parkováním a vybavenou kuchyní. Pláž je 600 m daleko, přibližně 5–8 minut pěšky. Ověřte termíny přímo.',
    locale: 'cs_CZ',
  },
};

const CONTENT_OVERRIDES: Record<string, Record<string, string>> = {
  ru: {
    apt1Desc: 'ScaleaStay — уютные апартаменты в центральной части Скалеи рядом с морем. Современный интерьер, кондиционер, терраса, оборудованная кухня и парковка подходят для семейного отдыха до четырёх гостей.\n📍 Ближайший пляж — 600 м, около 5–8 минут пешком; маршрут открыт в разделе «Маршруты».',
    advLocationDesc: 'Центральная часть Скалеи: рядом магазины, прогулочные улицы и основные городские маршруты.',
    advSeaDesc: 'Ближайший пляж — 600 м, около 5–8 минут пешком. Точный пешеходный маршрут показан в разделе «Маршруты».',
    advSupermarket: 'Магазины рядом',
    advSupermarketDesc: 'В центральной части Скалеи удобно покупать продукты и всё необходимое для отдыха.',
    faqA1: 'Мы находимся по адресу Via Giuseppe Saragat 11 в центральной части Скалеи. До ближайшего пляжа — 600 м, обычно около 5–8 минут пешком. Точный маршрут можно открыть в разделе «Маршруты».',
    beachDistance: 'Пляж 5–8 мин',
    beachRouteLabel: 'Маршрут к пляжу',
    byPlaneDesc: 'Ближайший международный аэропорт — Lamezia Terme (SUF): Airlink до Lamezia Terme Centrale, затем поезд до Scalea или поездка на автомобиле.',
    routeDetailsDesc: 'Точные маршруты к пляжу, от станции и из аэропорта собраны в интерактивном разделе. Для автомобиля используйте координаты дома; гостевая парковка предусмотрена.',
    flawlessServiceDesc: 'AI-консьерж 24/7, понятные маршруты и помощь с информацией для подготовки поездки.',
    taItem4: 'Тем, кому важно удобно покупать продукты и всё необходимое рядом с квартирой.',
  },
  en: {
    apt1Desc: 'ScaleaStay is a comfortable apartment in central Scalea near the sea. A modern interior, air conditioning, terrace, equipped kitchen and parking make it suitable for families of up to four guests.\n📍 The nearest beach is 600 m away, about a 5–8 minute walk; the route is available in the Routes section.',
    advLocationDesc: 'Central Scalea, with shops, walking streets and the main local routes nearby.',
    advSeaDesc: 'The nearest beach is 600 m away, about a 5–8 minute walk. The exact walking route is shown in the interactive Routes section.',
    advSupermarket: 'Shops nearby',
    advSupermarketDesc: 'Groceries and everyday holiday essentials are easy to buy in central Scalea.',
    faqA1: 'We are located at Via Giuseppe Saragat 11 in central Scalea. The nearest beach is 600 m away, usually about a 5–8 minute walk. The exact route can be opened in the Routes section.',
    beachDistance: 'Beach 5–8 min',
    beachRouteLabel: 'View beach route',
    byPlaneDesc: 'The nearest international airport is Lamezia Terme (SUF): take Airlink to Lamezia Terme Centrale, then a train to Scalea, or continue by car.',
    routeDetailsDesc: 'Precise routes to the beach, from the station and from the airport are collected in the interactive section. Drivers can use the apartment coordinates; guest parking is available.',
    flawlessServiceDesc: 'A 24/7 AI concierge, clear routes and practical information to help prepare your trip.',
    taItem4: 'Guests who want groceries and everyday essentials conveniently available near the apartment.',
  },
  it: {
    apt1Desc: 'ScaleaStay è un appartamento accogliente nella zona centrale di Scalea, vicino al mare. Interni moderni, aria condizionata, terrazza, cucina attrezzata e parcheggio sono adatti a famiglie fino a quattro ospiti.\n📍 La spiaggia più vicina dista 600 m, circa 5–8 minuti a piedi; il percorso è disponibile nella sezione «Percorsi».',
    advLocationDesc: 'Zona centrale di Scalea, con negozi, vie per passeggiare e principali collegamenti urbani nelle vicinanze.',
    advSeaDesc: 'La spiaggia più vicina dista 600 m, circa 5–8 minuti a piedi. Il percorso pedonale preciso è mostrato nella sezione interattiva «Percorsi».',
    advSupermarket: 'Negozi nelle vicinanze',
    advSupermarketDesc: 'Nel centro di Scalea è facile acquistare generi alimentari e tutto il necessario per il soggiorno.',
    faqA1: 'Ci troviamo in Via Giuseppe Saragat 11, nella zona centrale di Scalea. La spiaggia più vicina dista 600 m, normalmente circa 5–8 minuti a piedi. Il percorso preciso si può aprire nella sezione «Percorsi».',
    beachDistance: 'Spiaggia 5–8 min',
    beachRouteLabel: 'Vedi il percorso per la spiaggia',
    byPlaneDesc: 'L’aeroporto internazionale più vicino è Lamezia Terme (SUF): Airlink fino a Lamezia Terme Centrale, poi treno per Scalea oppure proseguimento in auto.',
    routeDetailsDesc: 'I percorsi precisi verso la spiaggia, dalla stazione e dall’aeroporto sono raccolti nella sezione interattiva. In auto si possono usare le coordinate dell’appartamento; è disponibile il parcheggio per gli ospiti.',
    flawlessServiceDesc: 'Concierge AI 24/7, percorsi chiari e informazioni pratiche per preparare il viaggio.',
    taItem4: 'A chi desidera acquistare comodamente generi alimentari e beni essenziali vicino all’appartamento.',
  },
  de: {
    apt1Desc: 'ScaleaStay ist eine gemütliche Ferienwohnung im zentralen Teil von Scalea nahe am Meer. Moderne Einrichtung, Klimaanlage, Terrasse, ausgestattete Küche und Parkplatz eignen sich für Familien mit bis zu vier Gästen.\n📍 Der nächste Strand ist 600 m entfernt, etwa 5–8 Gehminuten; die Route ist im Bereich „Routen“ verfügbar.',
    advLocationDesc: 'Zentrale Lage in Scalea mit Geschäften, Spazierstraßen und den wichtigsten örtlichen Verbindungen in der Nähe.',
    advSeaDesc: 'Der nächste Strand ist 600 m entfernt, etwa 5–8 Gehminuten. Die genaue Fußroute wird im interaktiven Bereich „Routen“ angezeigt.',
    advSupermarket: 'Geschäfte in der Nähe',
    advSupermarketDesc: 'Lebensmittel und alles Wichtige für den Urlaub lassen sich im Zentrum von Scalea bequem einkaufen.',
    faqA1: 'Wir befinden uns in der Via Giuseppe Saragat 11 im zentralen Teil von Scalea. Der nächste Strand ist 600 m entfernt, normalerweise etwa 5–8 Gehminuten. Die genaue Route kann im Bereich „Routen“ geöffnet werden.',
    beachDistance: 'Strand 5–8 Min.',
    beachRouteLabel: 'Strandroute anzeigen',
    byPlaneDesc: 'Der nächstgelegene internationale Flughafen ist Lamezia Terme (SUF): mit Airlink nach Lamezia Terme Centrale, anschließend mit dem Zug nach Scalea oder weiter mit dem Auto.',
    routeDetailsDesc: 'Genaue Routen zum Strand, vom Bahnhof und vom Flughafen sind im interaktiven Bereich zusammengefasst. Für die Anfahrt mit dem Auto können die Koordinaten der Unterkunft genutzt werden; Gästeparkplätze sind vorhanden.',
    flawlessServiceDesc: 'Ein AI-Concierge rund um die Uhr, klare Routen und praktische Informationen zur Reisevorbereitung.',
    taItem4: 'Für Gäste, die Lebensmittel und Dinge des täglichen Bedarfs bequem in der Nähe der Unterkunft kaufen möchten.',
  },
  cs: {
    apt1Desc: 'ScaleaStay je útulný apartmán v centrální části města Scalea nedaleko moře. Moderní interiér, klimatizace, terasa, vybavená kuchyň a parkování jsou vhodné pro rodiny až se čtyřmi hosty.\n📍 Nejbližší pláž je 600 m daleko, přibližně 5–8 minut pěšky; trasa je dostupná v sekci „Trasy“.',
    advLocationDesc: 'Centrální část města Scalea s obchody, pěšími ulicemi a hlavními místními trasami v okolí.',
    advSeaDesc: 'Nejbližší pláž je 600 m daleko, přibližně 5–8 minut pěšky. Přesná pěší trasa je zobrazena v interaktivní sekci „Trasy“.',
    advSupermarket: 'Obchody v okolí',
    advSupermarketDesc: 'Potraviny a vše potřebné pro dovolenou lze pohodlně nakoupit v centru města Scalea.',
    faqA1: 'Nacházíme se na adrese Via Giuseppe Saragat 11 v centrální části města Scalea. Nejbližší pláž je 600 m daleko, obvykle přibližně 5–8 minut pěšky. Přesnou trasu lze otevřít v sekci „Trasy“.',
    beachDistance: 'Pláž 5–8 min',
    beachRouteLabel: 'Zobrazit trasu na pláž',
    byPlaneDesc: 'Nejbližší mezinárodní letiště je Lamezia Terme (SUF): Airlink do Lamezia Terme Centrale, poté vlak do Scalea nebo pokračování autem.',
    routeDetailsDesc: 'Přesné trasy na pláž, z nádraží a z letiště jsou soustředěny v interaktivní sekci. Pro cestu autem lze použít souřadnice apartmánu; parkování pro hosty je k dispozici.',
    flawlessServiceDesc: 'AI concierge 24/7, přehledné trasy a praktické informace pro přípravu cesty.',
    taItem4: 'Pro hosty, kteří chtějí pohodlně nakupovat potraviny a běžné potřeby v okolí apartmánu.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const setMetaContent = (selector: string, value: string) => {
  const element = document.querySelector<HTMLMetaElement>(selector);
  if (element) {
    element.setAttribute('content', value);
  }
};

const ensureMetaProperty = (property: string, value: string) => {
  let element = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathLang = location.pathname.split('/')[1];
  const language = TRANSLATIONS[pathLang] ? pathLang : 'ru';

  useEffect(() => {
    if (!TRANSLATIONS[pathLang]) {
      const saved = localStorage.getItem('scalea_language');
      const browserLang = navigator.language.split('-')[0];

      let targetLang = 'ru';
      if (saved && TRANSLATIONS[saved]) {
        targetLang = saved;
      } else if (TRANSLATIONS[browserLang]) {
        targetLang = browserLang;
      }

      const restOfPath = location.pathname === '/' ? '' : location.pathname;
      navigate(`/${targetLang}${restOfPath}${location.search}${location.hash}`, { replace: true });
    } else {
      localStorage.setItem('scalea_language', pathLang);
    }
  }, [pathLang, location.pathname, location.search, location.hash, navigate]);

  const setLanguage = (lang: string) => {
    if (TRANSLATIONS[lang] && lang !== language) {
      localStorage.setItem('scalea_language', lang);

      const pathParts = location.pathname.split('/');
      if (TRANSLATIONS[pathParts[1]]) {
        pathParts[1] = lang;
      } else {
        pathParts.splice(1, 0, lang);
      }

      const newPath = pathParts.join('/') || '/';
      navigate(`${newPath}${location.search}${location.hash}`);
    }
  };

  const t = (key: string) => CONTENT_OVERRIDES[language]?.[key] || TRANSLATIONS[language]?.[key] || key;
  const currentLanguage = LANGUAGES.find((item) => item.code === language) || LANGUAGES[0];

  useEffect(() => {
    const seo = SEO_BY_LANGUAGE[language] || SEO_BY_LANGUAGE.ru;
    const pageUrl = `https://scaleastay.com/${language}/`;

    document.documentElement.lang = language;
    document.title = seo.title;

    setMetaContent('meta[name="description"]', seo.description);
    setMetaContent('meta[property="og:title"]', seo.title);
    setMetaContent('meta[property="og:description"]', seo.description);
    setMetaContent('meta[property="og:url"]', pageUrl);
    setMetaContent('meta[property="twitter:title"]', seo.title);
    setMetaContent('meta[property="twitter:description"]', seo.description);
    setMetaContent('meta[property="twitter:url"]', pageUrl);

    ensureMetaProperty('og:site_name', 'ScaleaStay');
    ensureMetaProperty('og:locale', seo.locale);

    document.querySelectorAll('meta[property="og:locale:alternate"]').forEach((element) => element.remove());
    LANGUAGES
      .filter((item) => item.code !== language)
      .forEach((item) => {
        const alternateSeo = SEO_BY_LANGUAGE[item.code];
        if (!alternateSeo) return;
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:locale:alternate');
        meta.setAttribute('content', alternateSeo.locale);
        document.head.appendChild(meta);
      });

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', pageUrl);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};