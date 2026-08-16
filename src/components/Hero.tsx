import React, { useState, useEffect } from 'react';
import { CONTACT_INFO } from '../constants';
import { useSiteData } from '../context/SiteContext';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../analytics';

type HeroCopy = {
  badge: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  whatsappCta: string;
  facts: [string, string, string];
};

const COPY: Record<string, HeroCopy> = {
  ru: {
    badge: 'Scalea • Calabria • Italia',
    title: 'Современные апартаменты у моря в Скалее',
    subtitle: 'ScaleaStay — апартаменты с современным ремонтом для отдыха у моря. Пляж, супермаркет, вокзал и центр Скалеи доступны пешком.',
    primaryCta: 'Посмотреть апартаменты',
    whatsappCta: 'Проверить свободные даты',
    facts: ['Пляж · 5–8 мин', 'Interspar · 3 мин', 'Вокзал · 8 мин'],
  },
  en: {
    badge: 'Scalea • Calabria • Italia',
    title: 'Modern holiday apartment by the sea in Scalea',
    subtitle: 'ScaleaStay is a modern apartment ideal for a seaside holiday, with the beach, supermarket, train station and central Scalea all within walking distance.',
    primaryCta: 'View the apartment',
    whatsappCta: 'Check available dates',
    facts: ['Beach · 5–8 min', 'Interspar · 3 min', 'Station · 8 min'],
  },
  it: {
    badge: 'Scalea • Calabria • Italia',
    title: 'Appartamento moderno vicino al mare a Scalea',
    subtitle: 'ScaleaStay è un appartamento con interni moderni, ideale per una vacanza al mare. Spiaggia, Interspar, stazione e centro di Scalea sono comodamente raggiungibili a piedi.',
    primaryCta: 'Scopri l’appartamento',
    whatsappCta: 'Verifica le date su WhatsApp',
    facts: ['Spiaggia · 5–8 min', 'Interspar · 3 min', 'Stazione · 8 min'],
  },
  de: {
    badge: 'Scalea • Calabria • Italia',
    title: 'Moderne Ferienwohnung am Meer in Scalea',
    subtitle: 'ScaleaStay ist eine moderne Ferienwohnung, ideal für einen Urlaub am Meer. Strand, Supermarkt, Bahnhof und das Zentrum von Scalea sind bequem zu Fuß erreichbar.',
    primaryCta: 'Wohnung ansehen',
    whatsappCta: 'Freie Termine prüfen',
    facts: ['Strand · 5–8 Min.', 'Interspar · 3 Min.', 'Bahnhof · 8 Min.'],
  },
  cs: {
    badge: 'Scalea • Calabria • Italia',
    title: 'Moderní apartmán u moře ve Scalee',
    subtitle: 'ScaleaStay je moderní apartmán ideální pro dovolenou u moře. Pláž, supermarket, nádraží i centrum města Scalea jsou pohodlně dostupné pěšky.',
    primaryCta: 'Prohlédnout apartmán',
    whatsappCta: 'Ověřit volné termíny',
    facts: ['Pláž · 5–8 min', 'Interspar · 3 min', 'Nádraží · 8 min'],
  },
  pl: {
    badge: 'Scalea • Calabria • Italia',
    title: 'Nowoczesny apartament blisko morza w Scalei',
    subtitle: 'ScaleaStay to komfortowy apartament z nowoczesnym wnętrzem na wakacje nad morzem. Plaża, Interspar, dworzec i centrum Scalei są w zasięgu spaceru.',
    primaryCta: 'Zobacz apartament',
    whatsappCta: 'Sprawdź terminy na WhatsApp',
    facts: ['Plaża · 5–8 min', 'Interspar · 3 min', 'Dworzec · 8 min'],
  },
};

const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const { data } = useSiteData();
  const copy = COPY[language] || COPY.ru;
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
    { icon: '🏖️', label: copy.facts[0] },
    { icon: '🛒', label: copy.facts[1] },
    { icon: '🚆', label: copy.facts[2] }
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-24 md:pt-28 xl:pt-32 [@media(orientation:landscape)_and_(max-height:850px)]:pt-28 [@media(orientation:landscape)_and_(max-height:700px)]:pt-24 [@media(orientation:landscape)_and_(max-height:850px)]:pb-5">
        <div className="inline-flex items-center space-x-2 mb-6 xl:mb-8 [@media(orientation:landscape)_and_(max-height:850px)]:mb-4 [@media(orientation:landscape)_and_(max-height:700px)]:mb-3 px-5 py-2.5 [@media(orientation:landscape)_and_(max-height:700px)]:py-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 animate-fade-in shadow-2xl">
          <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
          <span className="text-white text-[11px] font-black uppercase tracking-[0.3em]">{copy.badge}</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] 2xl:text-[110px] [@media(orientation:landscape)_and_(max-height:850px)]:text-[72px] [@media(orientation:landscape)_and_(max-height:700px)]:text-[60px] font-[900] text-white leading-[0.95] sm:leading-[0.9] tracking-tighter mb-6 xl:mb-8 [@media(orientation:landscape)_and_(max-height:850px)]:mb-5 [@media(orientation:landscape)_and_(max-height:700px)]:mb-4 animate-fade-in drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] uppercase break-words hyphens-none">
          {copy.title}
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl [@media(orientation:landscape)_and_(max-height:850px)]:text-xl [@media(orientation:landscape)_and_(max-height:700px)]:text-lg text-white/90 mb-8 xl:mb-10 [@media(orientation:landscape)_and_(max-height:850px)]:mb-5 [@media(orientation:landscape)_and_(max-height:700px)]:mb-4 max-w-3xl mx-auto font-medium leading-relaxed animate-fade-in drop-shadow-lg break-words hyphens-none" style={{ animationDelay: '0.2s' }}>
          {copy.subtitle}
        </p>
        
        <div className="flex flex-col items-center animate-fade-in w-full mx-auto" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 [@media(orientation:landscape)_and_(max-height:700px)]:gap-4 justify-center items-center w-full max-w-md sm:max-w-none">
            <a 
              href="#apartments" 
              onClick={scrollToApartments}
              className="w-full sm:w-auto bg-white text-slate-950 px-8 sm:px-12 py-4 sm:py-5 xl:py-6 [@media(orientation:landscape)_and_(max-height:850px)]:py-4 rounded-[28px] font-black text-base sm:text-lg [@media(orientation:landscape)_and_(max-height:700px)]:text-base transition-all hover:bg-indigo-50 hover:-translate-y-1 shadow-[0_20px_50px_rgba(255,255,255,0.2)] active:scale-95 text-center"
            >
              {copy.primaryCta}
            </a>
            <a 
              href={CONTACT_INFO.whatsappLink(t('heroWhatsappMsg'))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { source: 'hero' })}
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 xl:py-6 [@media(orientation:landscape)_and_(max-height:850px)]:py-4 rounded-[28px] font-black text-white border-2 border-white/40 backdrop-blur-md hover:bg-white/10 transition-all flex items-center justify-center space-x-3 group text-base sm:text-lg [@media(orientation:landscape)_and_(max-height:700px)]:text-base"
            >
               <svg className="w-6 h-6 [@media(orientation:landscape)_and_(max-height:700px)]:w-5 [@media(orientation:landscape)_and_(max-height:700px)]:h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"/>
               </svg>
               <span>{copy.whatsappCta}</span>
            </a>
          </div>

          <div className="mt-5 xl:mt-8 [@media(orientation:landscape)_and_(max-height:850px)]:mt-3 [@media(orientation:landscape)_and_(max-height:700px)]:mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 [@media(orientation:landscape)_and_(max-height:700px)]:gap-2 w-full max-w-3xl">
            {trustItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-slate-950/35 px-4 py-3 [@media(orientation:landscape)_and_(max-height:850px)]:py-2 text-white/90 backdrop-blur-lg shadow-lg"
              >
                <span className="text-lg" aria-hidden="true">{item.icon}</span>
                <span className="text-[11px] sm:text-xs [@media(orientation:landscape)_and_(max-height:700px)]:text-[10px] font-black uppercase tracking-[0.12em] leading-tight">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block [@media(orientation:landscape)_and_(max-height:850px)]:hidden opacity-50 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
