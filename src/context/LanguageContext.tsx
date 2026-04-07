
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TRANSLATIONS, LANGUAGES } from '../constants';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  currentLanguage: typeof LANGUAGES[0];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract language from URL path (e.g., /en/ or /en)
  const pathLang = location.pathname.split('/')[1];
  
  // Determine the effective language
  const language = TRANSLATIONS[pathLang] ? pathLang : 'ru';

  useEffect(() => {
    // If the path doesn't have a valid language, redirect to the default or saved language
    if (!TRANSLATIONS[pathLang]) {
      const saved = localStorage.getItem('scalea_language');
      const browserLang = navigator.language.split('-')[0];
      
      let targetLang = 'ru';
      if (saved && TRANSLATIONS[saved]) {
        targetLang = saved;
      } else if (TRANSLATIONS[browserLang]) {
        targetLang = browserLang;
      }
      
      // Preserve the rest of the path and hash
      const restOfPath = location.pathname === '/' ? '' : location.pathname;
      navigate(`/${targetLang}${restOfPath}${location.search}${location.hash}`, { replace: true });
    } else {
      // Save the valid language to localStorage
      localStorage.setItem('scalea_language', pathLang);
    }
  }, [pathLang, location.pathname, location.search, location.hash, navigate]);

  const setLanguage = (lang: string) => {
    if (TRANSLATIONS[lang] && lang !== language) {
      localStorage.setItem('scalea_language', lang);
      
      // Replace the language part in the URL
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

  const t = (key: string) => {
    return TRANSLATIONS[language]?.[key] || key;
  };

  const currentLanguage = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    document.documentElement.lang = language;
    
    // Update document title based on language
    const titles: Record<string, string> = {
      ru: 'Аренда апартаментов в Скалее, Италия | ScaleaStay',
      en: 'Apartment Rentals in Scalea, Italy | ScaleaStay',
      it: 'Affitto Appartamenti a Scalea, Italia | ScaleaStay',
      de: 'Ferienwohnungen mieten in Scalea, Italien | ScaleaStay',
      cs: 'Pronájem apartmánů ve Scalee, Itálie | ScaleaStay'
    };
    const currentTitle = titles[language] || titles['ru'];
    document.title = currentTitle;

    // Update meta description
    const descriptions: Record<string, string> = {
      ru: 'Снимите современные апартаменты у моря в Скалее (Калабрия). Идеально для семейного отдыха. Свежий ремонт, парковка, кондиционер. Бронируйте без посредников!',
      en: 'Rent modern apartments by the sea in Scalea (Calabria). Perfect for family holidays. Freshly renovated, parking, air conditioning. Book directly without intermediaries!',
      it: 'Affitta appartamenti moderni sul mare a Scalea (Calabria). Perfetto per vacanze in famiglia. Appena ristrutturati, parcheggio, aria condizionata. Prenota direttamente senza intermediari!',
      de: 'Mieten Sie moderne Ferienwohnungen am Meer in Scalea (Kalabrien). Perfekt für den Familienurlaub. Frisch renoviert, Parkplatz, Klimaanlage. Direkt buchen ohne Vermittler!',
      cs: 'Pronajměte si moderní apartmány u moře ve Scalee (Kalábrie). Ideální pro rodinnou dovolenou. Čerstvě zrekonstruované, parkování, klimatizace. Rezervujte přímo bez prostředníků!'
    };
    const currentDesc = descriptions[language] || descriptions['ru'];
    
    // Standard meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', currentDesc);

    // Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', currentTitle);
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', currentDesc);

    // Twitter tags
    const twTitle = document.querySelector('meta[property="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', currentTitle);
    
    const twDesc = document.querySelector('meta[property="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', currentDesc);

    // Update canonical link
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `https://scaleastay.com/${language}/`);
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
