import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT_INFO } from '../constants';
import { ShieldCheck, MessageCircle, CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { trackEvent } from '../analytics';

const CTA_LABELS: Record<string, string> = {
  ru: 'Проверить свободные даты',
  en: 'Check available dates',
  it: 'Verifica le date disponibili',
  de: 'Freie Termine prüfen',
  cs: 'Ověřit volné termíny',
  pl: 'Sprawdź wolne terminy',
};

const DirectBookingBenefits: React.FC = () => {
  const { t, language } = useLanguage();

  const benefits = [
    { icon: <MessageCircle className="w-5 h-5" />, text: t('directBookItem1') },
    { icon: <CreditCard className="w-5 h-5" />, text: t('directBookItem2') },
    { icon: <ShieldCheck className="w-5 h-5" />, text: t('directBookItem3') },
    { icon: <ShieldCheck className="w-5 h-5" />, text: t('directBookItem4') },
    { icon: <CheckCircle2 className="w-5 h-5" />, text: t('directBookItem5') },
  ];

  return (
    <section className="py-12 px-4 bg-slate-50 border-t border-slate-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-slate-900 mb-4 break-words hyphens-none">
            {t('directBookTitle')}
          </h2>
          <div className="w-12 h-1 bg-indigo-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {benefits.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start space-x-4 ${
                idx === benefits.length - 1 && benefits.length % 2 !== 0 ? 'sm:col-span-2 sm:max-w-md sm:mx-auto w-full' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <p className="text-sm font-bold text-slate-700 leading-snug mt-2">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href={CONTACT_INFO.whatsappLink(t('whatsappBookingMsg'))}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent('booking_button_click', { source: 'direct_booking_benefits', page_path: window.location.pathname });
              trackEvent('whatsapp_click', { source: 'direct_booking_benefits', page_path: window.location.pathname });
            }}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-2xl bg-indigo-600 px-7 py-4 text-sm font-black text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-indigo-700 active:scale-95"
          >
            <span>{CTA_LABELS[language] || CTA_LABELS.ru}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DirectBookingBenefits;
