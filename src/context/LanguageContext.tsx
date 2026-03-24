
import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS, LANGUAGES } from '../constants';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  currentLanguage: typeof LANGUAGES[0];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('scalea_language');
    if (saved && TRANSLATIONS[saved]) return saved;
    
    // Try to detect browser language
    const browserLang = navigator.language.split('-')[0];
    if (TRANSLATIONS[browserLang]) return browserLang;
    
    return 'ru'; // Default
  });

  const setLanguage = (lang: string) => {
    if (TRANSLATIONS[lang]) {
      setLanguageState(lang);
      localStorage.setItem('scalea_language', lang);
    }
  };

  const t = (key: string) => {
    return TRANSLATIONS[language][key] || key;
  };

  const currentLanguage = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    document.documentElement.lang = language;
    
    // Update document title based on language
    const titles: Record<string, string> = {
      ru: 'Аренда апартаментов в Скалее, Италия | ScaleaStay',
      en: 'Scalea Apartments | Rent in Italy | Holidays in Calabria',
      it: 'Appartamenti Scalea | Affitto in Italia | Vacanze in Calabria',
      de: 'Scalea Apartments | Mieten in Italien | Urlaub in Kalabrien',
      cs: 'Scalea Apartments | Pronájem v Itálii | Dovolená v Kalábrii'
    };
    document.title = titles[language] || titles['ru'];

    // Update meta description
    const descriptions: Record<string, string> = {
      ru: 'Снимите современные апартаменты у моря в Скалее (Калабрия). Идеально для семейного отдыха. Свежий ремонт, парковка, кондиционер. Бронируйте без посредников!',
      en: 'ScaleaStay - Apartment rentals in Scalea, Italy. Cozy accommodation by the sea in the city center. Perfect for holidays in Calabria. Book your vacation on the Riviera dei Cedri.',
      it: 'ScaleaStay - Affitto appartamenti a Scalea, Italia. Alloggi accoglienti sul mare nel centro della città. Perfetto per le vacanze in Calabria. Prenota la tua vacanza sulla Riviera dei Cedri.',
      de: 'ScaleaStay - Ferienwohnungen in Scalea, Italien. Gemütliche Unterkunft am Meer im Stadtzentrum. Perfekt für den Urlaub in Kalabrien. Buchen Sie Ihren Urlaub an der Riviera dei Cedri.',
      cs: 'ScaleaStay - Pronájem apartmánů ve Scalee, Itálie. Útulné ubytování u moře v centru města. Ideální pro dovolenou v Kalábrii. Rezervujte si dovolenou na Riviera dei Cedri.'
    };
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', descriptions[language] || descriptions['ru']);
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
