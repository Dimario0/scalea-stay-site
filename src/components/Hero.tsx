import React, { useState, useEffect } from 'react';
import { CONTACT_INFO } from '../constants';
import { useSiteData } from '../context/SiteContext';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../analytics';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { data } = useSiteData();
  const userMainImage = data.siteImages.heroBackground;
  const localFallbacks = ['/web_ready_bg.jpg', '/bg-sea.jpg'];
  
  const [bgImage, setBgImage] = useState(userMainImage);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  const fallbackImage = "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1920&q=80";

  useEffect(() => {
    if (!bgImage) {
      setBgImage(fallbackImage);
      return;
    }
    const img = new Image();
    img.src = bgImage;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => {
      console.warn(`Не удалось загрузить изображение: ${bgImage}`);
      if (bgImage === userMainImage) {
        setBgImage(localFallbacks[0]);
      } else if (errorCount < localFallbacks.length) {
        const nextIndex = errorCount + 1;
        setErrorCount(nextIndex);
        setBgImage(localFallbacks[nextIndex] || fallbackImage);
      } else {
        setBgImage(fallbackImage);
        setIsLoaded(true);
      }
    };
  }, [bgImage, errorCount, userMainImage, fallbackImage]);

  const scrollToApartments = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('apartments');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const trustItems = [
    { icon: '🏖️', label: t('beachDistance') },
    { icon: '💬', label: t('directBooking') },
    { icon: '🧭', label: t('localExperience') }
  ];

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-slate-950 scroll-mt-40">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-[3000ms] ease-out"
        style={{ 
          backgroundImage: bgImage && bgImage.trim() !== "" ? `url('${bgImage}')` : 'none',
          transform: isLoaded ? 'scale(1)' : 'scale(1.15)',
          opacity: isLoaded ? 1 : 0
        }}
      />

      <div className="absolute inset-0 z-[1] bg-black/40 backdrop-blur-[1px]" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-slate-950/70 via-transparent to-slate-950" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-24 md:pt-28 xl:pt-32">
        <div className="inline-flex items-center space-x-2 mb-6 xl:mb-8 px-5 py-2.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 animate-fade-in shadow-2xl">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          <span className="text-white text-[11px] font-black uppercase tracking-[0.3em]">{t('heroBadge')}</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] 2xl:text-[120px] font-[900] text-white leading-[0.9] sm:leading-[0.8] tracking-tighter mb-6 xl:mb-10 animate-fade-in drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] uppercase break-words hyphens-none">
          {t('heroTitle')}
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 xl:mb-14 max-w-2xl mx-auto font-medium leading-relaxed animate-fade-in drop-shadow-lg break-words hyphens-none" style={{ animationDelay: '0.2s' }}>
          {t('heroSubtitle')}
        </p>
        
        <div className="flex flex-col items-center animate-fade-in w-full mx-auto" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full max-w-md sm:max-w-none">
            <a 
              href="#apartments" 
              onClick={scrollToApartments}
              className="w-full sm:w-auto bg-white text-slate-950 px-8 sm:px-14 py-4 sm:py-5 xl:py-6 rounded-[28px] font-black text-lg sm:text-xl transition-all hover:bg-indigo-50 hover:-translate-y-1 shadow-[0_20px_50px_rgba(255,255,255,0.2)] active:scale-95 text-center"
            >
              {t('ourApartments')}
            </a>
            <a 
              href={CONTACT_INFO.whatsappLink(t('heroWhatsappMsg'))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click')}
              className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 xl:py-6 rounded-[28px] font-black text-white border-2 border-white/40 backdrop-blur-md hover:bg-white/10 transition-all flex items-center justify-center space-x-4 group text-lg sm:text-xl"
            >
               <svg className="w-7 h-7 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"/>
               </svg>
               <span>WhatsApp</span>
            </a>
          </div>
          {t('heroCtaHint') && (
            <p className="mt-4 text-white/70 text-sm font-medium">
              {t('heroCtaHint')}
            </p>
          )}

          <div className="mt-5 xl:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl">
            {trustItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-slate-950/35 px-4 py-3 text-white/90 backdrop-blur-lg shadow-lg"
              >
                <span className="text-lg" aria-hidden="true">{item.icon}</span>
                <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.16em] leading-tight">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block opacity-50 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
