import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { APARTMENT_PAGE_COPY, ApartmentPageLanguage } from '../content/apartmentPage';

const MobileStayInquiry: React.FC<{ language: ApartmentPageLanguage }> = ({ language }) => {
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById('apartment-stay-inquiry');
    if (!form || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting));
    observer.observe(form);
    return () => observer.disconnect();
  }, [language]);

  return (
    <div hidden={formVisible} data-mobile-date-cta className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pt-3 shadow-[0_-8px_30px_rgba(15,23,42,0.1)] backdrop-blur-md md:hidden"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
      <a href="#apartment-stay-inquiry" data-analytics-source="commercial_landing_mobile_dates"
        className="flex min-h-12 items-center justify-center gap-3 rounded-xl bg-indigo-600 px-4 py-3 text-center text-sm font-bold text-white hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        {APARTMENT_PAGE_COPY[language].datesCta}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
      </a>
    </div>
  );
};

export default MobileStayInquiry;
