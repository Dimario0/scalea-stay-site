
import React from 'react';
import { Phone } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../analytics';

const FloatingCallButton: React.FC = () => {
  const { t } = useLanguage();

  return (
    <a 
      href={`tel:${CONTACT_INFO.phone}`}
      onClick={() => {
        const hrefStr = `tel:${CONTACT_INFO.phone}`;
        trackEvent('contact_click', {
          contact_type: hrefStr.includes('wa.me') || hrefStr.includes('whatsapp') ? 'floating_whatsapp_button' : 'floating_phone_button',
          page_path: window.location.pathname
        });
        if (hrefStr.includes('wa.me') || hrefStr.includes('whatsapp')) {
          trackEvent('whatsapp_click', {
            source: 'floating_contact_button',
            page_path: window.location.pathname
          });
        }
      }}
      className="fixed bottom-6 right-6 z-[100] sm:hidden bg-indigo-600 text-white p-4 rounded-full shadow-2xl border border-white/10 flex items-center space-x-2 animate-bounce-slow"
    >
      <Phone className="w-5 h-5" />
      <span className="text-[10px] font-black uppercase tracking-widest pr-1">{t('callUs')}</span>
    </a>
  );
};

export default FloatingCallButton;
