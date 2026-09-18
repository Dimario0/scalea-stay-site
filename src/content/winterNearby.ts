import type { StayLanguage } from './longStayRoutes';

type WinterNearbyCopy = {
  eyebrow: string; title: string; intro: string; weatherTitle: string;
  photoAlt: string; essentials: string; seaWalk: string;
};

// Winter priorities: local culture, a longer historical trip, then weather-dependent coast visits.
export const WINTER_NEARBY_COPY: Record<StayLanguage, WinterNearbyCopy> = {
  ru: {
    eyebrow: 'Зима с новыми впечатлениями',
    title: 'Старые города, история и красивые маршруты',
    intro: 'Начните с улочек старой Скалеи и росписей Диаманте. Для Помпей выделите отдельный день, а вечером возвращайтесь в тёплые апартаменты. Планируйте прогулки с учётом погоды.',
    weatherTitle: 'Морские пейзажи — в хорошую погоду',
    photoAlt: 'Исторический центр Скалеи на склоне холма',
    essentials: 'Магазин и вокзал — рядом', seaWalk: 'Прогулки у моря',
  },
  it: {
    eyebrow: 'Un inverno da scoprire',
    title: 'Borghi, storia e itinerari da vivere',
    intro: 'Inizia dai vicoli di Scalea vecchia e dai murales di Diamante. Dedica una giornata intera a Pompei e la sera ritrova il comfort del tuo appartamento riscaldato. Organizza le passeggiate in base al meteo.',
    weatherTitle: 'Panorami sul mare nelle giornate di bel tempo',
    photoAlt: 'Il centro storico di Scalea sulle pendici della collina',
    essentials: 'Supermercato e stazione a pochi passi', seaWalk: 'Passeggiate sul mare',
  },
  en: {
    eyebrow: 'More to discover this winter',
    title: 'Old towns, history and scenic days out',
    intro: 'Start with the lanes of old Scalea and the murals of Diamante. Set aside a full day for Pompeii, then return to a warm apartment in the evening. Plan outdoor visits around the weather.',
    weatherTitle: 'Coastal views for fair-weather days',
    photoAlt: 'Scalea’s historic centre on the hillside',
    essentials: 'Shops and the station within walking distance', seaWalk: 'Walks by the sea',
  },
  de: {
    eyebrow: 'Entdeckungen im Winter',
    title: 'Altstädte, Geschichte und schöne Ausflüge',
    intro: 'Beginnen Sie mit den Gassen von Scalea und den Wandbildern von Diamante. Planen Sie für Pompeji einen ganzen Tag ein und kehren Sie abends in Ihre warme Ferienwohnung zurück. Richten Sie Spaziergänge nach dem Wetter aus.',
    weatherTitle: 'Küstenpanoramen für Tage mit gutem Wetter',
    photoAlt: 'Die historische Altstadt von Scalea am Hang',
    essentials: 'Supermarkt und Bahnhof zu Fuß erreichbar', seaWalk: 'Spaziergänge am Meer',
  },
  cs: {
    eyebrow: 'Zima plná objevování',
    title: 'Historická města, památky a krásné výlety',
    intro: 'Začněte uličkami staré Scalei a nástěnnými malbami v Diamante. Na Pompeje si vyhraďte celý den a večer se vraťte do vyhřátého apartmánu. Procházky plánujte podle počasí.',
    weatherTitle: 'Výhledy na moře za příznivého počasí',
    photoAlt: 'Historické centrum Scalei na svahu kopce',
    essentials: 'Supermarket i nádraží v pěší vzdálenosti', seaWalk: 'Procházky u moře',
  },
  pl: {
    eyebrow: 'Zima pełna odkryć',
    title: 'Starówki, historia i malownicze wycieczki',
    intro: 'Zacznij od uliczek starej Scalei i murali w Diamante. Na Pompeje przeznacz cały dzień, a wieczorem wróć do ciepłego apartamentu. Spacery planuj z uwzględnieniem pogody.',
    weatherTitle: 'Nadmorskie widoki na dni z dobrą pogodą',
    photoAlt: 'Historyczne centrum Scalei na zboczu wzgórza',
    essentials: 'Supermarket i stacja w zasięgu spaceru', seaWalk: 'Spacery nad morzem',
  },
};
export const getWinterNearbyCopy = (language: string) => WINTER_NEARBY_COPY[language as StayLanguage] || WINTER_NEARBY_COPY.en;
