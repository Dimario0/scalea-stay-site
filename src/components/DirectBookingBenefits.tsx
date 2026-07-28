import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, MessageCircle, CreditCard, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const DirectBookingBenefits: React.FC = () => {
  const { t } = useLanguage();

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
      </div>
    </section>
  );
};

export default DirectBookingBenefits;
