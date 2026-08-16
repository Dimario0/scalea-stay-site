import React from 'react';
import { AirVent, Car, ChefHat, Sparkles, TreePine, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';

type Advantage = {
  title: string;
  desc: string;
};

type AdvantagesCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: [Advantage, Advantage, Advantage, Advantage, Advantage, Advantage];
};

const COPY: Record<string, AdvantagesCopy> = {
  ru: {
    eyebrow: 'ScaleaStay',
    title: 'Почему здесь удобно отдыхать',
    subtitle: 'Преимущества самой квартиры — без повторения информации о расположении.',
    items: [
      { title: 'Современный ремонт', desc: 'Современный интерьер и новая мебель для комфортного отдыха.' },
      { title: 'Кондиционер', desc: 'Комфортная температура в квартире в жаркие летние дни.' },
      { title: 'Оборудованная кухня', desc: 'Всё необходимое, чтобы готовить дома во время отпуска.' },
      { title: 'Терраса', desc: 'Дополнительное пространство для спокойного отдыха.' },
      { title: 'Парковка', desc: 'Парковочное место для гостей ScaleaStay.' },
      { title: 'До 4 гостей', desc: 'Удобный вариант для пары, семьи или небольшой компании.' },
    ],
  },
  en: {
    eyebrow: 'ScaleaStay',
    title: 'Why the apartment is comfortable',
    subtitle: 'Features of the apartment itself, without repeating the location information.',
    items: [
      { title: 'Modern interior', desc: 'A modern interior and new furniture for a comfortable stay.' },
      { title: 'Air conditioning', desc: 'A comfortable indoor temperature during hot summer days.' },
      { title: 'Equipped kitchen', desc: 'Everything you need to prepare meals during your holiday.' },
      { title: 'Terrace', desc: 'Extra space for quiet moments and relaxed evenings.' },
      { title: 'Parking', desc: 'Guest parking is available for ScaleaStay.' },
      { title: 'Up to 4 guests', desc: 'A practical choice for couples, families or a small group.' },
    ],
  },
  it: {
    eyebrow: 'ScaleaStay',
    title: 'Perché l’appartamento è comodo',
    subtitle: 'I vantaggi dell’alloggio, senza ripetere le informazioni sulla posizione.',
    items: [
      { title: 'Interni moderni', desc: 'Interni moderni e arredi nuovi per un soggiorno confortevole.' },
      { title: 'Aria condizionata', desc: 'Temperatura confortevole anche nelle giornate estive più calde.' },
      { title: 'Cucina attrezzata', desc: 'Tutto il necessario per preparare i pasti durante la vacanza.' },
      { title: 'Terrazza', desc: 'Uno spazio in più per rilassarsi con calma.' },
      { title: 'Parcheggio', desc: 'Posto auto disponibile per gli ospiti di ScaleaStay.' },
      { title: 'Fino a 4 ospiti', desc: 'Una soluzione pratica per coppie, famiglie o piccoli gruppi.' },
    ],
  },
  de: {
    eyebrow: 'ScaleaStay',
    title: 'Warum die Wohnung angenehm ist',
    subtitle: 'Die Vorteile der Unterkunft selbst, ohne die Lageinformationen zu wiederholen.',
    items: [
      { title: 'Modernes Interieur', desc: 'Modernes Interieur und neue Möbel für einen angenehmen Aufenthalt.' },
      { title: 'Klimaanlage', desc: 'Angenehme Raumtemperatur auch an heißen Sommertagen.' },
      { title: 'Ausgestattete Küche', desc: 'Alles Nötige, um während des Urlaubs selbst zu kochen.' },
      { title: 'Terrasse', desc: 'Zusätzlicher Platz für ruhige und entspannte Momente.' },
      { title: 'Parkplatz', desc: 'Ein Gästeparkplatz steht für ScaleaStay zur Verfügung.' },
      { title: 'Bis zu 4 Gäste', desc: 'Eine praktische Wahl für Paare, Familien oder kleine Gruppen.' },
    ],
  },
  cs: {
    eyebrow: 'ScaleaStay',
    title: 'Proč se v apartmánu pohodlně bydlí',
    subtitle: 'Výhody samotného apartmánu bez opakování informací o poloze.',
    items: [
      { title: 'Moderní interiér', desc: 'Moderní interiér a nový nábytek pro pohodlný pobyt.' },
      { title: 'Klimatizace', desc: 'Příjemná teplota v apartmánu i během horkých letních dnů.' },
      { title: 'Vybavená kuchyň', desc: 'Vše potřebné pro vaření během dovolené.' },
      { title: 'Terasa', desc: 'Další prostor pro klidný odpočinek.' },
      { title: 'Parkování', desc: 'Parkovací místo je hostům ScaleaStay k dispozici.' },
      { title: 'Až 4 hosté', desc: 'Praktická volba pro páry, rodiny nebo menší skupinu.' },
    ],
  },
};

const ICONS = [Sparkles, AirVent, ChefHat, TreePine, Car, Users];

const Advantages: React.FC = () => {
  const { language } = useLanguage();
  const copy = COPY[language] || COPY.ru;

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <span className="block text-[10px] sm:text-xs font-black uppercase tracking-[0.35em] text-indigo-600 mb-4">
            {copy.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-slate-900 mb-4 break-words hyphens-none">
            {copy.title}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            {copy.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {copy.items.map((adv, idx) => {
            const Icon = ICONS[idx];
            return (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-500 group text-center"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 sm:mb-4 mx-auto group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900 mb-1 sm:mb-2 leading-tight break-words hyphens-none">
                  {adv.title}
                </h3>
                <p className="text-slate-500 text-[10px] sm:text-xs leading-relaxed font-medium break-words hyphens-none">
                  {adv.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
