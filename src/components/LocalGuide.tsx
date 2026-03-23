
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteContext';
import { Utensils, TowerControl as Tower, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

const LocalGuide: React.FC = () => {
  const { t } = useLanguage();
  const { data } = useSiteData();
  const guideImages = data.siteImages.guideImages || [];

  const places = [
    { 
      icon: <Utensils className="w-6 h-6" />, 
      title: t('guidePlace1'), 
      desc: t('guideDesc1'),
      image: guideImages[0] || 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80'
    },
    { 
      icon: <Tower className="w-6 h-6" />, 
      title: t('guidePlace2'), 
      desc: t('guideDesc2'),
      image: guideImages[1] || 'https://i.postimg.cc/Dz0dHGzW/Scalea.webp'
    },
    { 
      icon: <MapPin className="w-6 h-6" />, 
      title: t('guidePlace3'), 
      desc: t('guideDesc3'),
      image: guideImages[2] || 'https://i.postimg.cc/bY72f4g5/italy-scalea-beach-pebble-sand-orig.jpg'
    },
  ];

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 mb-4 break-words hyphens-auto">
            {t('guideTitle')}
          </h2>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">{t('guideSubtitle')}</p>
          <div className="w-12 h-1.5 bg-indigo-600 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {places.map((place, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={place.image} 
                  alt={place.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              <div className="p-8">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                  {place.icon}
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-3">
                  {place.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {place.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocalGuide;
