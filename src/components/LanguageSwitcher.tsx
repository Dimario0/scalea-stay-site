
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LANGUAGES } from '../constants';
import { trackEvent } from '../analytics';

export const LanguageSwitcher: React.FC<{ scrolled?: boolean }> = ({ scrolled }) => {
  const { language, setLanguage, currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all text-[11px] font-bold uppercase tracking-wider border ${
          scrolled 
          ? 'bg-slate-100/80 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white' 
          : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
        }`}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLanguage.flag} {currentLanguage.name}</span>
        <span className="sm:hidden">{currentLanguage.flag}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-48 max-w-[calc(100vw-2rem)] rounded-2xl bg-white shadow-xl border border-slate-100 overflow-hidden z-50 origin-top-right"
          >
            <div className="py-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    trackEvent('language_switch', {
                      from_language: currentLanguage.code || language,
                      to_language: lang.code,
                      page_path: window.location.pathname
                    });
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors ${
                    language === lang.code ? 'text-indigo-600 font-semibold bg-indigo-50/50' : 'text-slate-700'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-sm">{lang.name}</span>
                  {language === lang.code && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
