
import React, { useState, useEffect } from 'react';
import { CONTACT_INFO } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { trackEvent } from '../analytics';

const ROUTE_LABELS: Record<string, string> = {
  ru: 'Маршруты',
  en: 'Routes',
  it: 'Percorsi',
  de: 'Wege',
  cs: 'Trasy',
  pl: 'Trasy',
};

const Navbar: React.FC = () => {
  const { t, language } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const sections = ['home', 'apartments', 'weather', 'about', 'faq', 'routes', 'contact'];
    
    const handleActiveSection = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleActiveSection);
    handleActiveSection();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleActiveSection);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      setActiveSection(id);
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (id === 'routes') {
        trackEvent('route_section_open', { source: 'navigation' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: t('navHome'), id: 'home' },
    { name: t('navApartments'), id: 'apartments' },
    { name: t('navWeather'), id: 'weather' },
    { name: t('navAbout'), id: 'about' },
    { name: t('navFaq'), id: 'faq' },
    { name: ROUTE_LABELS[language] || ROUTE_LABELS.ru, id: 'routes' },
    { name: t('navContact'), id: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 pt-6 transition-all duration-700 pointer-events-none ${scrolled ? 'translate-y-0' : 'translate-y-2'}`}>
        <div className={`pointer-events-auto flex flex-wrap items-center justify-between gap-2 sm:gap-4 px-2 sm:px-6 md:px-10 py-3 sm:py-4 rounded-[32px] md:rounded-[40px] transition-all duration-500 border ${
          scrolled 
          ? "bg-white/95 backdrop-blur-2xl border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.18)]" 
          : "bg-black/30 backdrop-blur-md border-white/10"
        }`}>
          <div 
            className="flex items-center space-x-4 cursor-pointer group shrink-0" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-all duration-500">
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"/>
              </svg>
            </div>
            <span className={`text-xl md:text-2xl font-black tracking-tight transition-colors duration-500 ${scrolled ? 'text-slate-900' : 'text-white'}`}>
              Scalea<span className="text-indigo-400 md:text-indigo-500">Stay</span>
            </span>
          </div>
          
          <div className={`hidden lg:flex items-center p-1 rounded-2xl ${scrolled ? 'bg-slate-100/80' : 'bg-white/10'}`}>
            {navLinks.map((link, idx) => (
              <a 
                key={link.id}
                href={`#${link.id}`} 
                onClick={(e) => scrollToSection(e, link.id)}
                className={`px-3 xl:px-4 py-2.5 rounded-xl text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-300 flex items-center justify-center leading-none ${
                  idx > 0 ? 'ml-0.5' : ''
                } ${
                  activeSection === link.id
                    ? scrolled 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'bg-white text-slate-900 shadow-lg'
                    : scrolled
                      ? 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher scrolled={scrolled} />
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-3 rounded-xl transition-all ${scrolled ? 'text-slate-900 bg-slate-100' : 'text-white bg-white/10'}`}
              aria-label="Menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>

            <a 
              href={CONTACT_INFO.whatsappLink(t('navWhatsappMsg'))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent('booking_button_click');
                const hrefStr = CONTACT_INFO.whatsappLink('');
                if (hrefStr.includes('wa.me') || hrefStr.includes('whatsapp')) {
                  trackEvent('whatsapp_click');
                }
              }}
              className={`hidden sm:flex px-6 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl text-[12px] md:text-xs font-bold uppercase tracking-widest transition-all shadow-2xl active:scale-95 items-center space-x-3 shrink-0 ${
                scrolled 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-300/40' 
                : 'bg-white text-indigo-600 hover:bg-indigo-50 shadow-white/20'
              }`}
            >
              <span>{t('bookNow')}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

        <div className={`lg:hidden mt-4 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
          <div className="bg-white/95 backdrop-blur-2xl rounded-[32px] p-6 shadow-2xl border border-white/20 space-y-2 max-h-[70vh] overflow-y-auto">
            {navLinks.map((link) => (
              <a 
                key={link.id}
                href={`#${link.id}`} 
                onClick={(e) => scrollToSection(e, link.id)}
                className={`block px-6 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all ${
                  activeSection === link.id
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a 
              href={CONTACT_INFO.whatsappLink(t('navWhatsappMsg'))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent('booking_button_click');
                const hrefStr = CONTACT_INFO.whatsappLink('');
                if (hrefStr.includes('wa.me') || hrefStr.includes('whatsapp')) {
                  trackEvent('whatsapp_click');
                }
              }}
              className="block w-full text-center px-6 py-5 bg-indigo-600 text-white rounded-2xl text-sm font-bold uppercase tracking-widest shadow-xl mt-4"
            >
              {t('bookNow')}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
