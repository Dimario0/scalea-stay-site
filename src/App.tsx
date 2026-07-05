
import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ApartmentCard from './components/ApartmentCard';
import WeatherForecast from './components/WeatherForecast';
import AIConcierge from './components/AIConcierge';
import BackToTop from './components/BackToTop';
import { REVIEWS, CONTACT_INFO } from './constants';
import { useSiteData } from './context/SiteContext';
import { useLanguage } from './context/LanguageContext';
import AdminPanel from './components/AdminPanel';
import AboutGrid from './components/AboutGrid';
import RouteModal from './components/RouteModal';
import Advantages from './components/Advantages';
import LocalGuide from './components/LocalGuide';
import FAQ from './components/FAQ';
import DirectBookingBenefits from './components/DirectBookingBenefits';
import JSONLD from './components/JSONLD';
import FloatingCallButton from './components/FloatingCallButton';
import { trackEvent } from './analytics';

const App: React.FC = () => {
  const { data } = useSiteData();
  const { t } = useLanguage();
  const [isRouteModalOpen, setIsRouteModalOpen] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackEvent('price_section_view', { section_hint: 'prices' });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    const priceSection = document.getElementById('prices');
    if (priceSection) {
      observer.observe(priceSection);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex-1 min-h-[100dvh] w-full overflow-x-hidden bg-slate-950 selection:bg-indigo-100 selection:text-indigo-900 flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        <Hero />

        {/* Apartments Grid */}
        <section id="apartments" data-analytics="price-section" className="pt-16 pb-6 px-4 scroll-mt-40">
          <div id="prices" className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-indigo-400 font-black text-xs uppercase tracking-[0.4em] mb-4 block animate-fade-in">Selection 2026</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase animate-fade-in break-words hyphens-none">
                {t('ourApartments')}
              </h2>
            </div>

            <div className="max-w-5xl mx-auto">
              {data.apartments.map(apt => (
                <ApartmentCard key={apt.id} apartment={apt} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Advantages Section */}
        <Advantages />

        {/* Weather Forecast Section */}
        <WeatherForecast />

        {/* Local Guide Section */}
        <LocalGuide />

        {/* Testimonials (Trust Block) */}
        <section className="py-8 px-4 bg-white border-y border-slate-50 w-full overflow-hidden">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-black uppercase tracking-tighter break-words hyphens-none">{t('reviews')}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {REVIEWS.map((rev, i) => (
                <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-500 group max-w-full">
                  <div className="text-amber-400 text-sm mb-3 transition-transform group-hover:scale-110">★★★★★</div>
                  <p className="text-slate-600 text-xs font-medium leading-relaxed mb-4 italic break-words hyphens-none">"{t(rev.textKey)}"</p>
                  <p className="text-slate-900 font-black uppercase text-[9px] tracking-widest break-words hyphens-none">— {t(rev.nameKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section / About */}
        <section id="about" className="pt-16 pb-12 px-4 overflow-hidden bg-slate-950 text-white rounded-t-[60px] scroll-mt-40">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tighter uppercase leading-none break-words hyphens-none">
                  {t('aboutScalea')}
                </h2>
                <p className="text-slate-400 text-lg mb-12 leading-relaxed break-words hyphens-none">
                  {t('aboutScaleaDesc')}
                </p>
                
                <div className="space-y-12">
                  <div className="group flex space-x-6">
                    <div className="w-16 h-16 rounded-3xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 text-2xl">
                      🌊
                    </div>
                    <div>
                      <h4 className="text-xl font-black mb-2 uppercase">{t('localExperience')}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{t('localExperienceDesc')}</p>
                    </div>
                  </div>

                  <div className="group flex space-x-6">
                    <div className="w-16 h-16 rounded-3xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 text-2xl">
                      ✨
                    </div>
                    <div>
                      <h4 className="text-xl font-black mb-2 uppercase">{t('flawlessService')}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{t('flawlessServiceDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[30px]">
                <AboutGrid images={data.siteImages.aboutImages} />
              </div>
            </div>
          </div>
        </section>

        {/* Direct Booking Benefits */}
        <DirectBookingBenefits />

        {/* FAQ Section */}
        <FAQ />

        <JSONLD />

        {/* CTA Footer / Contact */}
        <section id="contact" className="mt-auto pt-8 pb-16 bg-slate-950 text-white text-center scroll-mt-40">
          <div className="max-w-4xl mx-auto px-6">
             <div className="mb-6 inline-block px-6 py-2 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.5em] text-white/40">
               {t('directBooking')}
             </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 tracking-tighter leading-none uppercase break-words hyphens-none">
              Scalea <br /> <span className="text-indigo-400 italic text-3xl sm:text-4xl md:text-5xl break-words hyphens-none">{t('waitsForYou')}</span>
            </h2>
            
            {/* How to get here block */}
            <div className="mb-16 text-left max-w-2xl mx-auto bg-white/5 p-8 rounded-[32px] border border-white/10">
              <h3 className="text-xl font-black uppercase tracking-widest mb-8 text-center text-indigo-400 hyphens-none break-words">{t('howToGet')}</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <span className="text-2xl">🚂</span>
                  <div>
                    <h4 className="font-black uppercase text-xs tracking-widest mb-1">{t('byTrain')}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{t('byTrainDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="text-2xl">🚗</span>
                  <div>
                    <h4 className="font-black uppercase text-xs tracking-widest mb-1">{t('byCar')}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{t('byCarDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="text-2xl">✈️</span>
                  <div>
                    <h4 className="font-black uppercase text-xs tracking-widest mb-1">{t('byPlane')}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{t('byPlaneDesc')}</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setIsRouteModalOpen(true)}
                className="mt-10 w-full py-4 border-2 border-indigo-400/30 text-indigo-400 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-400 hover:text-white transition-all active:scale-95"
              >
                {t('detailedRoute')}
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <a 
                href={CONTACT_INFO.whatsappLink(t('whatsappBookingMsg'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-[24px] font-black text-lg transition-all shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:-translate-y-2 active:scale-95 flex items-center space-x-4 group"
              >
                <span>WhatsApp</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-12 border-t border-white/5 opacity-50 text-[9px] font-black uppercase tracking-widest">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-center"><span>🏖️</span><span>{t('beachDistance')}</span></div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-center"><span>❄️</span><span>{t('acReady')}</span></div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-center"><span>🚗</span><span>{t('parkingInc')}</span></div>
            </div>
            <p className="mt-12 text-slate-500 font-bold uppercase tracking-[0.5em] text-[9px]">{t('footerCopyright')}</p>
            <p className="mt-2 text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">CIN: IT078138C2VN4E3MCD</p>
          </div>
        </section>
      </main>

      <BackToTop />
      <AIConcierge />
      <AdminPanel />
      <FloatingCallButton />
      <RouteModal isOpen={isRouteModalOpen} onClose={() => setIsRouteModalOpen(false)} />
      
      {/* Design Credit Banner */}
      <div className="bg-slate-900 text-white/60 py-4 px-4 text-center border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3">
          <p className="text-[10px] font-bold uppercase tracking-widest">
            {t('designCreditTitle')}
          </p>
          <a 
            href="https://t.me/+420773594223" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
          >
            {t('designCreditBtn')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
