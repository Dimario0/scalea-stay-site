import React, { createContext, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ALL_TRANSLATIONS, translate } from '../content/translations';
import { LANGUAGES, SiteLanguage } from '../languages';
import { getLongStayCopy } from '../content/longStay';
import { ITALIAN_HOME } from '../content/italianHome';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  currentLanguage: SiteLanguage;
}

type SeoEntry = {
  title: string;
  description: string;
  locale: string;
};


const SEO_BY_LANGUAGE: Record<string, SeoEntry> = {
  ru: {
    title: 'Апартаменты в Скалее у моря | ScaleaStay',
    description: 'ScaleaStay в Скалее, Калабрия: апартаменты с современным ремонтом, кондиционером, парковкой и кухней. Пляж — около 500 м, 5–8 минут пешком. Проверяйте даты напрямую.',
    locale: 'ru_RU',
  },
  en: {
    title: 'Holiday Apartment in Scalea, Calabria | ScaleaStay',
    description: 'ScaleaStay in Scalea, Calabria: a modern holiday apartment with air conditioning, parking and an equipped kitchen. The beach is about 500 m away, a 5–8 minute walk. Check dates directly.',
    locale: 'en_GB',
  },
  it: {
    title: ITALIAN_HOME.title,
    description: ITALIAN_HOME.description,
    locale: 'it_IT',
  },
  de: {
    title: 'Ferienwohnung in Scalea, Kalabrien | ScaleaStay',
    description: 'ScaleaStay in Scalea, Kalabrien: moderne Ferienwohnung mit Klimaanlage, Parkplatz und ausgestatteter Küche. Der Strand ist etwa 500 m entfernt, 5–8 Gehminuten. Verfügbarkeit direkt prüfen.',
    locale: 'de_DE',
  },
  cs: {
    title: 'Apartmán ve Scalee, Kalábrie | ScaleaStay',
    description: 'ScaleaStay ve Scalee v Kalábrii: moderní apartmán s klimatizací, parkováním a vybavenou kuchyní. Pláž je přibližně 500 m daleko, 5–8 minut pěšky. Ověřte termíny přímo.',
    locale: 'cs_CZ',
  },
  pl: {
    title: 'Apartament w Scalei blisko morza | ScaleaStay',
    description: 'ScaleaStay w Scalei w Kalabrii: nowoczesny apartament z klimatyzacją, parkingiem i wyposażoną kuchnią. Plaża jest około 500 m dalej, zwykle 5–8 minut pieszo. Sprawdź wolne terminy bezpośrednio.',
    locale: 'pl_PL',
  },
};


const COMMERCIAL_PATHS: Partial<Record<string, string>> = {
  it: '/it/appartamento-scalea-vicino-mare/',
  pl: '/pl/apartament-scalea-blisko-morza/',
};

const isCommercialPath = (pathname: string) =>
  pathname.includes('/appartamento-scalea-vicino-mare') || pathname.includes('/apartament-scalea-blisko-morza');

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
  const language = ALL_TRANSLATIONS[pathLang] ? pathLang : 'ru';

  useEffect(() => {
    if (!ALL_TRANSLATIONS[pathLang]) {
      const saved = localStorage.getItem('scalea_language');
      const browserLang = navigator.language.split('-')[0];

      let targetLang = 'ru';
      if (saved && ALL_TRANSLATIONS[saved]) {
        targetLang = saved;
      } else if (ALL_TRANSLATIONS[browserLang]) {
        targetLang = browserLang;
      }

      const restOfPath = location.pathname === '/' ? '' : location.pathname;
      navigate(`/${targetLang}${restOfPath}${location.search}${location.hash}`, { replace: true });
    } else {
      localStorage.setItem('scalea_language', pathLang);
    }
  }, [pathLang, location.pathname, location.search, location.hash, navigate]);

  const setLanguage = (lang: string) => {
    if (!ALL_TRANSLATIONS[lang] || lang === language) return;

    localStorage.setItem('scalea_language', lang);

    if (isCommercialPath(location.pathname)) {
      const commercialTarget = COMMERCIAL_PATHS[lang];
      navigate(`${commercialTarget || `/${lang}/`}${location.search}${location.hash}`);
      return;
    }

    const pathParts = location.pathname.split('/');
    if (ALL_TRANSLATIONS[pathParts[1]]) {
      pathParts[1] = lang;
    } else {
      pathParts.splice(1, 0, lang);
    }

    const newPath = pathParts.join('/') || '/';
    navigate(`${newPath}${location.search}${location.hash}`);
  };

  const t = (key: string) => translate(language, key);
  const currentLanguage = LANGUAGES.find((item) => item.code === language) || LANGUAGES[0];

  useEffect(() => {
    document.documentElement.lang = language;

    const isLanguageHome = location.pathname === `/${language}` || location.pathname === `/${language}/`;
    if (!isLanguageHome) {
      return;
    }

    const seo = { ...(SEO_BY_LANGUAGE[language] || SEO_BY_LANGUAGE.ru), description: getLongStayCopy(language).seo };
    const pageUrl = `https://scaleastay.com/${language}/`;
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
  }, [language, location.pathname]);

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
