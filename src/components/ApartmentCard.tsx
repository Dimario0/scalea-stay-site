import React, { useState } from 'react';
import { Apartment } from '../types';
import { CONTACT_INFO } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../analytics';

interface Props {
  apartment: Apartment;
}

type ApartmentCopy = {
  eyebrow: string;
  summary: string;
  cta: string;
  facts: [string, string, string, string, string];
};

const COPY: Record<string, ApartmentCopy> = {
  ru: {
    eyebrow: 'Апартаменты в Скалее',
    summary: 'Светлые и уютные апартаменты с современным ремонтом для комфортного отдыха у моря. Оборудованная кухня, кондиционер и терраса подходят и для короткой поездки, и для длительного отпуска.',
    cta: 'Проверить свободные даты',
    facts: ['До 4 гостей', 'Кондиционер', 'Кухня', 'Терраса', 'Парковка'],
  },
  en: {
    eyebrow: 'Apartment in Scalea',
    summary: 'A bright and comfortable apartment with modern interiors for a relaxed seaside stay. An equipped kitchen, air conditioning and a terrace work equally well for a short break or a longer holiday.',
    cta: 'Check available dates',
    facts: ['Up to 4 guests', 'Air conditioning', 'Kitchen', 'Terrace', 'Parking'],
  },
  it: {
    eyebrow: 'Il tuo appartamento a Scalea',
    summary: 'Luminoso e accogliente, con interni moderni e tutto il necessario per una vacanza al mare comoda e rilassante. Cucina attrezzata, aria condizionata e terrazza lo rendono adatto sia a soggiorni brevi sia a vacanze più lunghe.',
    cta: 'Verifica le date su WhatsApp',
    facts: ['Fino a 4 ospiti', 'Aria condizionata', 'Cucina', 'Terrazza', 'Parcheggio'],
  },
  de: {
    eyebrow: 'Ferienwohnung in Scalea',
    summary: 'Eine helle und gemütliche Ferienwohnung mit modernem Interieur für einen entspannten Aufenthalt am Meer. Ausgestattete Küche, Klimaanlage und Terrasse eignen sich sowohl für Kurzreisen als auch für längere Ferien.',
    cta: 'Freie Termine prüfen',
    facts: ['Bis zu 4 Gäste', 'Klimaanlage', 'Küche', 'Terrasse', 'Parkplatz'],
  },
  cs: {
    eyebrow: 'Apartmán ve Scalee',
    summary: 'Světlý a útulný apartmán s moderním interiérem pro pohodovou dovolenou u moře. Vybavená kuchyň, klimatizace a terasa se hodí jak pro krátký pobyt, tak pro delší dovolenou.',
    cta: 'Ověřit volné termíny',
    facts: ['Až 4 hosté', 'Klimatizace', 'Kuchyň', 'Terasa', 'Parkování'],
  },
};

const ApartmentCard: React.FC<Props> = ({ apartment }) => {
  const { t, language } = useLanguage();
  const copy = COPY[language] || COPY.ru;
  const [currentImg, setCurrentImg] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const validImages = apartment.images.filter(img => typeof img === 'string' && img.trim() !== "");
  const displayImages = validImages.length > 0 ? validImages : ["https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=85"];

  const nextImg = () => setCurrentImg(p => (p < displayImages.length - 1 ? p + 1 : 0));
  const prevImg = () => setCurrentImg(p => (p > 0 ? p - 1 : displayImages.length - 1));

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextImg();
    if (isRightSwipe) prevImg();
  };

  const openBeachRoute = () => {
    trackEvent('route_section_open', {
      source: 'apartment_card',
      route: 'beach',
    });
    document.getElementById('routes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="group bg-white rounded-[40px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] transition-all duration-700 flex flex-col lg:flex-row border border-slate-100 mb-12">
      <div className="relative lg:w-3/5 aspect-video lg:aspect-auto overflow-hidden bg-slate-100 max-w-full" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <div className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" style={{ transform: `translateX(-${currentImg * 100}%)` }}>
          {displayImages.map((img, idx) => (
            <img key={idx} src={img} className="w-full h-full object-cover flex-shrink-0" alt={`ScaleaStay - Scalea, Italy - ${t('navApartments')} photo ${idx + 1}`} loading="lazy" referrerPolicy="no-referrer" />
          ))}
        </div>

        <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-none">
          <button type="button" onClick={openBeachRoute} className="pointer-events-auto bg-indigo-600/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg hover:bg-indigo-500 transition-colors active:scale-95">
            {t('beachRouteLabel')} <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 pointer-events-none">
          {displayImages.map((_, idx) => (
            <div key={idx} className={`h-1 rounded-full transition-all duration-500 ${currentImg === idx ? 'w-8 bg-white' : 'w-2 bg-white/40'}`} />
          ))}
        </div>

        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 flex justify-between items-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500">
          <button type="button" onClick={prevImg} className="w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow-lg flex items-center justify-center text-slate-900 hover:bg-white transition-all active:scale-90" aria-label="Previous photo">←</button>
          <button type="button" onClick={nextImg} className="w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow-lg flex items-center justify-center text-slate-900 hover:bg-white transition-all active:scale-90" aria-label="Next photo">→</button>
        </div>
      </div>

      <div className="p-5 sm:p-8 lg:p-12 lg:w-2/5 flex flex-col justify-center">
        <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-indigo-600 mb-3">{copy.eyebrow}</span>
        <h3 className="text-3xl sm:text-4xl font-black tracking-tighter text-slate-900 mb-5 break-words hyphens-none">ScaleaStay</h3>
        <p className="text-slate-500 text-sm lg:text-base leading-relaxed mb-6 sm:mb-8 break-words hyphens-none">{copy.summary}</p>

        <div className="flex flex-wrap gap-2 mb-10">
          {copy.facts.map(fact => (
            <span key={fact} className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-slate-50 text-slate-500 rounded-lg border border-slate-100 group-hover:border-indigo-100 group-hover:text-indigo-600 transition-colors break-words hyphens-none max-w-full">{fact}</span>
          ))}
        </div>

        <a
          href={CONTACT_INFO.whatsappLink(t('apartmentBookingMsg').replace('{name}', 'ScaleaStay'))}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackEvent('booking_button_click', { source: 'apartment_card', page_path: window.location.pathname });
            const hrefStr = CONTACT_INFO.whatsappLink('');
            if (hrefStr.includes('wa.me') || hrefStr.includes('whatsapp')) {
              trackEvent('whatsapp_click', { source: 'booking_button', page_path: window.location.pathname });
            }
          }}
          className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black text-center transition-all hover:bg-indigo-600 shadow-xl hover:-translate-y-1 active:scale-95"
        >
          {copy.cta}
        </a>
      </div>
    </div>
  );
};

export default ApartmentCard;
