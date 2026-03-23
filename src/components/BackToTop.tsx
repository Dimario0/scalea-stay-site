
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const BackToTop: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label={t('backToTop')}
      className={`fixed bottom-24 sm:bottom-6 left-6 z-[100] flex items-center space-x-2 px-5 py-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200 shadow-2xl transition-all duration-500 hover:bg-white hover:-translate-y-1 active:scale-95 group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center transition-transform group-hover:-translate-y-1">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </div>
      <span className="text-xs font-black uppercase tracking-widest text-slate-900">{t('backToTop')}</span>
    </button>
  );
};

export default BackToTop;
