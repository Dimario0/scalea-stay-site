
import React from 'react';
import { Phone } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const FloatingCallButton: React.FC = () => {
  const { t } = useLanguage();

  return (
    <a 
      href={`tel:${CONTACT_INFO.phone}`}
      className="fixed bottom-6 right-6 z-[100] sm:hidden bg-indigo-600 text-white p-4 rounded-full shadow-2xl border border-white/10 flex items-center space-x-2 animate-bounce-slow"
    >
      <Phone className="w-5 h-5" />
      <span className="text-[10px] font-black uppercase tracking-widest pr-1">{t('callUs')}</span>
    </a>
  );
};

export default FloatingCallButton;
