
import React from 'react';
import { MapPin, Waves, Sparkles, Users, Car } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';

const Advantages: React.FC = () => {
  const { t } = useLanguage();

  const advantages = [
    { icon: <MapPin className="w-6 h-6" />, title: t('advLocation'), desc: t('advLocationDesc') },
    { icon: <Waves className="w-6 h-6" />, title: t('advSea'), desc: t('advSeaDesc') },
    { icon: <Sparkles className="w-6 h-6" />, title: t('advRenovation'), desc: t('advRenovationDesc') },
    { icon: <Users className="w-6 h-6" />, title: t('advFamily'), desc: t('advFamilyDesc') },
    { icon: <Car className="w-6 h-6" />, title: t('advParking'), desc: t('advParkingDesc') },
  ];

  return (
    <section className="py-12 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-slate-900 mb-4 break-words hyphens-auto">
            {t('advantagesTitle')}
          </h2>
          <div className="w-12 h-1 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {advantages.map((adv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-500 group text-center"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 sm:mb-4 mx-auto group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                <div className="scale-75 sm:scale-90">{adv.icon}</div>
              </div>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900 mb-1 sm:mb-2 leading-tight break-words hyphens-auto">
                {adv.title}
              </h3>
              <p className="text-slate-500 text-[10px] sm:text-xs leading-relaxed font-medium break-words hyphens-auto">
                {adv.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
