
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Navigation } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const RouteModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[40px] overflow-hidden shadow-2xl"
          >
            <div className="p-8 sm:p-10">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                  <Navigation className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900">{t('routeDetails')}</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('howToGet')}</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center space-x-3 mb-3 text-indigo-600">
                    <MapPin className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-widest">{t('addressLabel')}</span>
                  </div>
                  <p className="text-slate-900 font-bold text-lg leading-tight">
                    {t('addressValue')}
                  </p>
                </div>

                <div className="prose prose-slate prose-sm">
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {t('routeDetailsDesc')}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t('addressValue'))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest text-center hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
                  >
                    Google Maps
                  </a>
                  <button 
                    onClick={onClose}
                    className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest text-center hover:bg-slate-200 transition-all active:scale-95"
                  >
                    {t('close')}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RouteModal;
