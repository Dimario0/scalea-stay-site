import React from 'react';
import { renderNearby } from '../content/nearbyMarkup';
import { useLanguage } from '../context/LanguageContext';
import { useSiteData } from '../context/SiteContext';
import { ArrowRight, Footprints, Home, Landmark, Plane, Utensils, Waves } from 'lucide-react';
import { motion } from 'motion/react';
import { trackEvent } from '../analytics';

const LocalGuide: React.FC = () => {
  const { language } = useLanguage();
  const { data } = useSiteData();
  const apartmentImage = data.apartments?.[0]?.images?.find((image) => typeof image === 'string' && image.trim() !== '') || 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=85';
  const content = language === 'it' ? {
    eyebrow:'Organizza il soggiorno',title:'Guide utili per vivere Scalea con semplicità',subtitle:'Appartamento, arrivo, spostamenti a piedi, mare, centro storico e idee per la sera.',cards:[
      {href:'/it/appartamento-scalea-vicino-mare/',icon:<Home className="w-5 h-5" />,tag:'ScaleaStay',title:'Appartamento vicino al mare',text:'Servizi, posizione, distanze verificate e contatto diretto.',image:apartmentImage,event:'commercial_landing_open'},
      {href:'/it/come-arrivare-da-lamezia-terme-a-scalea/',icon:<Plane className="w-5 h-5" />,tag:'Arrivo',title:'Da Lamezia Terme a Scalea',text:'Airlink, stazione centrale, treno e ultimo tratto.',image:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',event:'seo_guide_open'},
      {href:'/it/scalea-senza-auto/',icon:<Footprints className="w-5 h-5" />,tag:'A piedi',title:'Scalea senza auto',text:'Mare, Interspar, stazione e centro storico a piedi.',image:'',event:'seo_guide_open'},
      {href:'/it/spiagge-scalea/',icon:<Waves className="w-5 h-5" />,tag:'Mare',title:'Spiagge di Scalea',text:'Spiaggia più vicina, Ajnella e Torre Talao.',image:'https://i.postimg.cc/bY72f4g5/italy-scalea-beach-pebble-sand-orig.jpg',event:'seo_guide_open'},
      {href:'/it/centro-storico-scalea-sera/',icon:<Landmark className="w-5 h-5" />,tag:'Borgo',title:'Centro storico e sera',text:'Piazza De Palma, vicoli, panorami e passeggiata serale.',image:'https://i.postimg.cc/Dz0dHGzW/Scalea.webp',event:'seo_guide_open'},
      {href:'/it/dove-mangiare-scalea/',icon:<Utensils className="w-5 h-5" />,tag:'Sapori',title:'Dove mangiare a Scalea',text:'Pesce, cucina calabrese, trattorie e cena informale.',image:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',event:'seo_guide_open'}
    ]
  } : language === 'pl' ? {
    eyebrow:'Zaplanuj pobyt',title:'Praktyczne przewodniki po Scalei',subtitle:'Apartament, dojazd, poruszanie się pieszo, plaże, stare miasto i pomysły na wieczór.',cards:[
      {href:'/pl/apartament-scalea-blisko-morza/',icon:<Home className="w-5 h-5" />,tag:'ScaleaStay',title:'Apartament blisko morza',text:'Wyposażenie, położenie, sprawdzone odległości i kontakt bezpośredni.',image:apartmentImage,event:'commercial_landing_open'},
      {href:'/pl/jak-dojechac-z-lamezia-terme-do-scalei/',icon:<Plane className="w-5 h-5" />,tag:'Dojazd',title:'Z Lamezia Terme do Scalei',text:'Airlink, stacja centralna, pociąg i ostatni odcinek.',image:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',event:'seo_guide_open'},
      {href:'/pl/scalea-bez-samochodu/',icon:<Footprints className="w-5 h-5" />,tag:'Pieszo',title:'Scalea bez samochodu',text:'Morze, Interspar, dworzec i stare miasto pieszo.',image:'',event:'seo_guide_open'},
      {href:'/pl/plaze-scalea/',icon:<Waves className="w-5 h-5" />,tag:'Morze',title:'Plaże w Scalei',text:'Najbliższa plaża, Ajnella i Torre Talao.',image:'https://i.postimg.cc/bY72f4g5/italy-scalea-beach-pebble-sand-orig.jpg',event:'seo_guide_open'},
      {href:'/pl/stare-miasto-scalea-wieczorem/',icon:<Landmark className="w-5 h-5" />,tag:'Miasto',title:'Stare miasto wieczorem',text:'Piazza De Palma, uliczki, widoki i wieczorny spacer.',image:'https://i.postimg.cc/Dz0dHGzW/Scalea.webp',event:'seo_guide_open'},
      {href:'/pl/gdzie-zjesc-scalea/',icon:<Utensils className="w-5 h-5" />,tag:'Smaki',title:'Gdzie zjeść w Scalei',text:'Ryby, kuchnia kalabryjska, trattorie i luźna kolacja.',image:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',event:'seo_guide_open'}
    ]
  } : null;
  return <><div dangerouslySetInnerHTML={{ __html: renderNearby(language) }} /><section className="pb-12 px-4 bg-white"><div className="max-w-6xl mx-auto">{content&&<div className="mt-16 rounded-[36px] bg-slate-950 px-5 py-8 md:px-8 md:py-10 overflow-hidden"><div className="max-w-3xl mb-8"><p className="text-indigo-300 text-xs font-black uppercase tracking-[0.24em] mb-3">{content.eyebrow}</p><h3 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-3">{content.title}</h3><p className="text-slate-300 text-sm md:text-base leading-relaxed">{content.subtitle}</p></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{content.cards.map((card,idx)=><motion.a key={card.href} href={card.href} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:idx*.05}} onClick={()=>trackEvent(card.event,{source:'guide_cards',language,href:card.href})} className="group relative min-h-[300px] overflow-hidden rounded-[28px] border border-white/10 bg-slate-900 shadow-xl">{card.image?<img src={card.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />:<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.35),transparent_34%),radial-gradient(circle_at_80%_72%,rgba(14,165,233,0.22),transparent_30%),linear-gradient(145deg,#111827,#020617)]" />}<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/10" /><div className="relative flex min-h-[300px] flex-col justify-end p-6"><div className="mb-auto flex items-center justify-between gap-3"><span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-white backdrop-blur-md">{card.icon}{card.tag}</span><span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-950"><ArrowRight className="w-4 h-4" /></span></div><h4 className="text-2xl font-black leading-tight text-white mb-3">{card.title}</h4><p className="text-sm leading-relaxed text-slate-200">{card.text}</p></div></motion.a>)}</div></div>}</div></section></>;
};
export default LocalGuide;
