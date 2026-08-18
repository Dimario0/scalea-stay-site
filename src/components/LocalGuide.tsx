import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteContext';
import {
  ArrowRight,
  Footprints,
  Home,
  MapPin,
  Plane,
  TowerControl as Tower,
  Utensils,
} from 'lucide-react';
import { motion } from 'motion/react';
import { trackEvent } from '../analytics';

const LocalGuide: React.FC = () => {
  const { t, language } = useLanguage();
  const { data } = useSiteData();
  const guideImages = data.siteImages.guideImages || [];
  const apartmentImage = data.apartments?.[0]?.images?.find(
    (image) => typeof image === 'string' && image.trim() !== '',
  ) || 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=85';

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

  const planningContent = language === 'it'
    ? {
        eyebrow: 'Organizza il soggiorno',
        title: 'Guide utili per vivere Scalea con semplicità',
        subtitle: 'Tre percorsi rapidi per capire dove alloggiare, come arrivare e cosa puoi fare a piedi.',
        cards: [
          {
            href: '/it/appartamento-scalea-vicino-mare/',
            icon: <Home className="w-5 h-5" />,
            tag: 'ScaleaStay',
            title: 'Appartamento vicino al mare',
            text: 'Scopri servizi, posizione, distanze verificate e come controllare le date direttamente.',
            image: apartmentImage,
            event: 'commercial_landing_open',
          },
          {
            href: '/it/come-arrivare-da-lamezia-terme-a-scalea/',
            icon: <Plane className="w-5 h-5" />,
            tag: 'Arrivo',
            title: 'Da Lamezia Terme a Scalea',
            text: 'Airlink, stazione centrale, treno per Scalea e ultimo tratto fino all’appartamento.',
            image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
            event: 'seo_guide_open',
          },
          {
            href: '/it/scalea-senza-auto/',
            icon: <Footprints className="w-5 h-5" />,
            tag: 'A piedi',
            title: 'Scalea senza auto',
            text: 'Mare, Interspar, stazione e centro storico: guarda cosa è davvero raggiungibile a piedi.',
            image: '',
            event: 'seo_guide_open',
          },
        ],
      }
    : language === 'pl'
      ? {
          eyebrow: 'Zaplanuj pobyt',
          title: 'Praktyczne przewodniki po Scalei',
          subtitle: 'Trzy szybkie ścieżki: gdzie nocować, jak dojechać i co jest dostępne pieszo.',
          cards: [
            {
              href: '/pl/apartament-scalea-blisko-morza/',
              icon: <Home className="w-5 h-5" />,
              tag: 'ScaleaStay',
              title: 'Apartament blisko morza',
              text: 'Zobacz wyposażenie, położenie, sprawdzone odległości i sposób rezerwacji bezpośrednio.',
              image: apartmentImage,
              event: 'commercial_landing_open',
            },
            {
              href: '/pl/jak-dojechac-z-lamezia-terme-do-scalei/',
              icon: <Plane className="w-5 h-5" />,
              tag: 'Dojazd',
              title: 'Z Lamezia Terme do Scalei',
              text: 'Airlink, stacja centralna, pociąg do Scalei i ostatni odcinek do apartamentu.',
              image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
              event: 'seo_guide_open',
            },
            {
              href: '/pl/scalea-bez-samochodu/',
              icon: <Footprints className="w-5 h-5" />,
              tag: 'Pieszo',
              title: 'Scalea bez samochodu',
              text: 'Morze, Interspar, dworzec i stare miasto: sprawdź, co naprawdę jest w zasięgu spaceru.',
              image: '',
              event: 'seo_guide_open',
            },
          ],
        }
      : null;

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 mb-4 break-words hyphens-none">
            {t('guideTitle')}
          </h2>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-widest hyphens-none break-words">{t('guideSubtitle')}</p>
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

        {planningContent && (
          <div className="mt-16 rounded-[36px] bg-slate-950 px-5 py-8 md:px-8 md:py-10 overflow-hidden">
            <div className="max-w-3xl mb-8">
              <p className="text-indigo-300 text-xs font-black uppercase tracking-[0.24em] mb-3">
                {planningContent.eyebrow}
              </p>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
                {planningContent.title}
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                {planningContent.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {planningContent.cards.map((card, idx) => (
                <motion.a
                  key={card.href}
                  href={card.href}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  onClick={() => trackEvent(card.event, { source: 'guide_cards', language, href: card.href })}
                  className="group relative min-h-[310px] overflow-hidden rounded-[28px] border border-white/10 bg-slate-900 shadow-xl"
                >
                  {card.image ? (
                    <img
                      src={card.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.35),transparent_34%),radial-gradient(circle_at_80%_72%,rgba(14,165,233,0.22),transparent_30%),linear-gradient(145deg,#111827,#020617)]">
                      <div className="absolute left-[18%] top-[24%] flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 backdrop-blur-sm">
                        <Footprints className="h-7 w-7" aria-hidden="true" />
                      </div>
                      <div className="absolute right-[18%] top-[48%] flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 backdrop-blur-sm">
                        <MapPin className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="absolute left-[30%] top-[39%] h-px w-[42%] rotate-[16deg] border-t border-dashed border-white/35"></div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/10"></div>

                  <div className="relative flex min-h-[310px] flex-col justify-end p-6">
                    <div className="mb-auto flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-white backdrop-blur-md">
                        {card.icon}
                        {card.tag}
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-950 transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </div>

                    <h4 className="text-2xl font-black leading-tight text-white mb-3">
                      {card.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-200">
                      {card.text}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LocalGuide;