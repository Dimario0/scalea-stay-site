
import React, { useState, useEffect } from 'react';
import { useSiteData } from '../context/SiteContext';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, X, RefreshCw, Copy, Check } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, updateImage, updateAboutImages, updateGuideImages, updateApartmentImages, resetData, exportConfig } = useSiteData();
  const [copied, setCopied] = useState(false);

  // Admin panel is only visible if ?admin=true is in the URL
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setHasAccess(true);
    }
  }, []);

  if (!hasAccess) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(exportConfig());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-[100] bg-slate-900 text-white p-4 rounded-full shadow-2xl border border-white/10 hover:scale-110 transition-transform flex items-center space-x-2 group"
      >
        <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
        <span className="text-xs font-bold uppercase tracking-widest pr-2">Панель управления</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-slate-950 z-[101] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] border-l border-white/10 overflow-y-auto p-8"
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Настройки сайта</h2>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-10">
              {/* Hero Image */}
              <section>
                <label className="block text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-3">Главное фото (Hero)</label>
                <input 
                  type="text" 
                  value={data.siteImages.heroBackground}
                  onChange={(e) => updateImage('heroBackground', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-indigo-500 outline-none transition-colors"
                  placeholder="URL изображения..."
                />
              </section>

              {/* About Images */}
              <section>
                <label className="block text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-3">Фото "О Скалее" (4 шт)</label>
                <div className="space-y-2">
                  {data.siteImages.aboutImages.map((img, idx) => (
                    <input 
                      key={idx}
                      type="text" 
                      value={img}
                      onChange={(e) => {
                        const newImages = [...data.siteImages.aboutImages];
                        newImages[idx] = e.target.value;
                        updateAboutImages(newImages);
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-indigo-500 outline-none transition-colors"
                      placeholder={`URL фото ${idx + 1}...`}
                    />
                  ))}
                </div>
              </section>

              {/* Guide Images */}
              <section>
                <label className="block text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-3">Фото в "Гид по Скалее" (3 шт)</label>
                <div className="space-y-2">
                  {data.siteImages.guideImages.map((img, idx) => (
                    <input 
                      key={idx}
                      type="text" 
                      value={img}
                      onChange={(e) => {
                        const newImages = [...data.siteImages.guideImages];
                        newImages[idx] = e.target.value;
                        updateGuideImages(newImages);
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-indigo-500 outline-none transition-colors"
                      placeholder={`URL фото ${idx + 1}...`}
                    />
                  ))}
                </div>
              </section>

              {/* Apartments Images */}
              {data.apartments.map(apt => (
                <section key={apt.id}>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-3">Галерея: {apt.name}</label>
                  <div className="space-y-2">
                    {apt.images.map((img, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input 
                          type="text" 
                          value={img}
                          onChange={(e) => {
                            const newImages = [...apt.images];
                            newImages[idx] = e.target.value;
                            updateApartmentImages(apt.id, newImages);
                          }}
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-indigo-500 outline-none transition-colors"
                          placeholder={`URL фото ${idx + 1}...`}
                        />
                        <button 
                          onClick={() => {
                            const newImages = apt.images.filter((_, i) => i !== idx);
                            updateApartmentImages(apt.id, newImages);
                          }}
                          className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={() => {
                        updateApartmentImages(apt.id, [...apt.images, '']);
                      }}
                      className="w-full py-3 border border-dashed border-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/40 hover:border-indigo-500 hover:text-indigo-400 transition-all"
                    >
                      + Добавить фото в галерею
                    </button>
                  </div>
                </section>
              ))}

              <div className="pt-10 border-t border-white/10 space-y-4">
                <button 
                  onClick={handleCopy}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-2 hover:bg-indigo-500 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Скопировано!' : 'Скопировать конфиг'}</span>
                </button>
                <p className="text-[10px] text-white/40 text-center leading-relaxed">
                  Скопируйте конфиг и пришлите его мне, чтобы я сохранил изменения навсегда.
                </p>
                <button 
                  onClick={resetData}
                  className="w-full bg-white/5 text-white/40 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center space-x-2 hover:bg-red-500/10 hover:text-red-400 transition-all"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Сбросить все изменения</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminPanel;
