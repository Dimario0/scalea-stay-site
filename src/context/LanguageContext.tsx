import React, { createContext, useContext, useState, useEffect } from 'react';
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
    description: 'Casa Marittima в Скалее, Калабрия: кондиционер, частная парковка, оборудованная кухня и понятные маршруты от пляжа, станции и аэропорта Ламеция-Терме. Проверяйте даты напрямую.',
    locale: 'ru_RU',
  },
  en: {
    title: 'Holiday Apartment in Scalea, Calabria | ScaleaStay',
    description: 'Casa Marittima in Scalea, Calabria, with air conditioning, private parking, an equipped kitchen and clear routes from the beach, station and Lamezia Terme Airport. Check dates directly.',
    locale: 'en_GB',
  },
  it: {
    title: 'Appartamento Vacanze a Scalea, Calabria | ScaleaStay',
    description: 'Casa Marittima a Scalea, Calabria: aria condizionata, parcheggio privato, cucina attrezzata e indicazioni chiare dalla spiaggia, dalla stazione e dall’aeroporto di Lamezia Terme. Verifica le date direttamente.',
    locale: 'it_IT',
  },
  de: {
    title: 'Ferienwohnung in Scalea, Kalabrien | ScaleaStay',
    description: 'Casa Marittima in Scalea, Kalabrien, mit Klimaanlage, Privatparkplatz, ausgestatteter Küche und klaren Wegen vom Strand, Bahnhof und Flughafen Lamezia Terme. Verfügbarkeit direkt prüfen.',
    locale: 'de_DE',
  },
  cs: {
    title: 'Apartmán ve Scalee, Kalábrie | ScaleaStay',
    description: 'Casa Marittima ve Scalee v Kalábrii nabízí klimatizaci, soukromé parkování, vybavenou kuchyň a jasné trasy od pláže, nádraží i letiště Lamezia Terme. Ověřte termíny přímo.',
    locale: 'cs_CZ',
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

  const t = (key: string) => TRANSLATIONS[language]?.[key] || key;
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
