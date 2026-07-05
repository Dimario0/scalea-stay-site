import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const TargetAudience: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black mb-12 text-center text-slate-900 uppercase tracking-tight">
          {t('taTitle')}
        </h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <span className="text-indigo-600 text-2xl shrink-0 mt-1">👨‍👩‍👧‍👦</span>
            <p className="text-slate-700 text-lg font-medium leading-relaxed">{t('taItem1')}</p>
          </div>
          <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <span className="text-indigo-600 text-2xl shrink-0 mt-1">🚗</span>
            <p className="text-slate-700 text-lg font-medium leading-relaxed">{t('taItem2')}</p>
          </div>
          <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <span className="text-indigo-600 text-2xl shrink-0 mt-1">🏙️</span>
            <p className="text-slate-700 text-lg font-medium leading-relaxed">{t('taItem3')}</p>
          </div>
          <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <span className="text-indigo-600 text-2xl shrink-0 mt-1">🛒</span>
            <p className="text-slate-700 text-lg font-medium leading-relaxed">{t('taItem4')}</p>
          </div>
          <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <span className="text-indigo-600 text-2xl shrink-0 mt-1">💬</span>
            <p className="text-slate-700 text-lg font-medium leading-relaxed">{t('taItem5')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;
