import React from 'react';
import { Wifi, Flame, House, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT_INFO } from '../constants';
import { trackEvent } from '../analytics';
import { LONG_STAY_PATH, LONG_STAY_LINK_LABEL } from '../content/longStayLanding';
import { getLongStayCopy } from '../content/longStay';

const LongStay: React.FC = () => {
  const { language } = useLanguage();
  const copy = getLongStayCopy(language);
  const facts = [
    { Icon: Wifi, label: copy.wifi },
    { Icon: Flame, label: copy.heating },
    { Icon: House, label: copy.layout },
  ];

  return (
    <section id="long-stay" aria-labelledby="long-stay-title" className="px-4 py-12 sm:py-16 bg-indigo-50 text-slate-950 scroll-mt-48 hyphens-none">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div>
          <p className="text-indigo-700 text-xs font-bold uppercase tracking-widest mb-4">{copy.eyebrow}</p>
          <h2 id="long-stay-title" className="text-3xl sm:text-4xl font-black tracking-tight mb-5">{copy.title}</h2>
          <p className="text-slate-700 leading-relaxed mb-4">{copy.intro}</p>
          <p className="text-slate-600 text-sm leading-relaxed">{copy.location}</p>
        </div>
        <div className="bg-white border border-indigo-100 rounded-3xl p-5 sm:p-8 shadow-sm">
          <ul className="space-y-4 mb-5">
            {facts.map(({ Icon, label }) => (
              <li key={label} className="flex gap-3 items-center font-bold">
                <Icon aria-hidden="true" className="w-5 h-5 text-indigo-600 shrink-0" />{label}
              </li>
            ))}
          </ul>
          <p className="text-slate-700 text-sm leading-relaxed mb-6">{copy.terms}</p>
          <a href={CONTACT_INFO.whatsappLink(copy.message)} target="_blank" rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { source: 'long_stay', language })}
            className="flex items-center justify-center gap-3 w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-4 text-sm font-bold text-center transition-colors">
            {copy.cta}<ArrowRight aria-hidden="true" className="w-5 h-5 shrink-0" />
          </a>
          {language === 'it' && (
            <a href={LONG_STAY_PATH} className="inline-block mt-5 text-sm font-bold text-indigo-700 underline underline-offset-4">
              {LONG_STAY_LINK_LABEL} →
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default LongStay;
