import type { StayLanguage } from './longStayRoutes';

// Entrance and visitor links verified against Pompeii Sites on 2026-09-18.
export const POMPEII_MAP = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent('Via Giuseppe Saragat 11, Scalea, Italy')}&destination=${encodeURIComponent('Piazza Anfiteatro, Pompei, Italy')}&travelmode=driving`;
export const POMPEII_VISIT = 'https://pompeiisites.org/en/visiting-info/timetables-and-tickets/';
export const POMPEII_TRAVEL = 'https://pompeiisites.org/en/visiting-info/how-to-get-there/';
export const POMPEII_PHOTO_IDS = ['pompeii-forum', 'pompeii-columns'] as const;
type Copy = { badge: string; title: string; text: string; plan: string; practical: string; car: string; tickets: string; travel: string; photos: [string, string] };
const COPY: Record<StayLanguage, Copy> = {
  ru: {
    badge: 'Дальняя поездка на целый день · Кампания', title: 'Помпеи — прогулка по древнему городу',
    text: 'Мощёные улицы, площади и колонны форума, а на горизонте — Везувий. Посвятите отдельный день знакомству с древнеримским городом под открытым небом.',
    plan: 'Помпеи находятся в другом регионе. Планируйте ранний выезд из Скалеи, несколько часов на осмотр и дорогу обратно.',
    practical: 'Автомобильный маршрут ведёт к входу Piazza Anfiteatro; время в пути проверьте на карте перед выездом. Билеты и часы посещения уточняйте на сайте парка: в зимний период он закрывается раньше. Если едете поездом, заранее проверьте пересадки и обратный рейс.',
    car: 'Маршрут на машине', tickets: 'Билеты и часы посещения', travel: 'Как добраться: сайт парка',
    photos: ['Форум Помпей с Везувием на горизонте', 'Колонны и арки форума Помпей'],
  },
  en: {
    badge: 'A longer, full-day trip · Campania', title: 'Pompeii — walk through an ancient city',
    text: 'Paved streets, squares and the columns of the forum, with Vesuvius on the horizon. Set aside a day to explore an ancient Roman city under the open sky.',
    plan: 'Pompeii is in a different region. Plan an early departure from Scalea, several hours at the site and the journey back.',
    practical: 'The driving route leads to the Piazza Anfiteatro entrance; check journey times on the map before leaving. Check tickets and opening hours on the park’s website: closing is earlier in winter. For train travel, check connections and the return service in advance.',
    car: 'Driving directions', tickets: 'Tickets and opening hours', travel: 'Getting there: park website',
    photos: ['The forum of Pompeii with Vesuvius on the horizon', 'Columns and arches of the forum of Pompeii'],
  },
  it: {
    badge: 'Una gita più lontana, per l’intera giornata · Campania', title: 'Pompei — una passeggiata nella città antica',
    text: 'Strade lastricate, piazze e colonne del foro, con il Vesuvio all’orizzonte. Dedica una giornata alla scoperta di una città romana a cielo aperto.',
    plan: 'Pompei si trova in un’altra regione. Prevedi una partenza presto da Scalea, alcune ore per la visita e il viaggio di ritorno.',
    practical: 'L’itinerario in auto conduce all’ingresso di Piazza Anfiteatro; verifica i tempi sulla mappa prima di partire. Consulta biglietti e orari sul sito del Parco: in inverno la chiusura è anticipata. Se viaggi in treno, controlla in anticipo coincidenze e ritorno.',
    car: 'Itinerario in auto', tickets: 'Biglietti e orari', travel: 'Come arrivare: sito del Parco',
    photos: ['Il foro di Pompei con il Vesuvio all’orizzonte', 'Colonne e archi del foro di Pompei'],
  },
  de: {
    badge: 'Ein weiterer Ausflug für einen ganzen Tag · Kampanien', title: 'Pompeji — ein Spaziergang durch die Antike',
    text: 'Gepflasterte Straßen, Plätze und die Säulen des Forums, am Horizont der Vesuv. Nehmen Sie sich einen Tag Zeit, um eine antike römische Stadt unter freiem Himmel zu erkunden.',
    plan: 'Pompeji liegt in einer anderen Region. Planen Sie eine frühe Abfahrt aus Scalea, mehrere Stunden für den Besuch und die Rückfahrt ein.',
    practical: 'Die Autoroute führt zum Eingang Piazza Anfiteatro; prüfen Sie die Fahrtzeit vor der Abreise auf der Karte. Tickets und Öffnungszeiten finden Sie auf der Website des Parks: Im Winter schließt er früher. Prüfen Sie bei einer Bahnfahrt die Umstiege und die Rückverbindung im Voraus.',
    car: 'Route mit dem Auto', tickets: 'Tickets und Öffnungszeiten', travel: 'Anreise: Website des Parks',
    photos: ['Das Forum von Pompeji mit dem Vesuv am Horizont', 'Säulen und Bögen des Forums von Pompeji'],
  },
  cs: {
    badge: 'Vzdálenější výlet na celý den · Kampánie', title: 'Pompeje — procházka starověkým městem',
    text: 'Dlážděné ulice, náměstí a sloupy fóra, na obzoru Vesuv. Vyhraďte si den na objevování starověkého římského města pod širým nebem.',
    plan: 'Pompeje leží v jiném regionu. Počítejte s časným odjezdem ze Scalei, několika hodinami na prohlídku a cestou zpět.',
    practical: 'Trasa autem vede ke vstupu Piazza Anfiteatro; dobu jízdy si před odjezdem ověřte na mapě. Vstupenky a otevírací dobu zjistíte na webu parku: v zimě zavírá dříve. Při cestě vlakem si předem ověřte přestupy a zpáteční spoj.',
    car: 'Trasa autem', tickets: 'Vstupenky a otevírací doba', travel: 'Jak se tam dostat: web parku',
    photos: ['Fórum v Pompejích s Vesuvem na obzoru', 'Sloupy a oblouky fóra v Pompejích'],
  },
  pl: {
    badge: 'Dalsza wycieczka na cały dzień · Kampania', title: 'Pompeje — spacer po starożytnym mieście',
    text: 'Brukowane ulice, place i kolumny forum, a na horyzoncie Wezuwiusz. Poświęć dzień na odkrywanie starożytnego rzymskiego miasta pod gołym niebem.',
    plan: 'Pompeje leżą w innym regionie. Zaplanuj wczesny wyjazd ze Scalei, kilka godzin zwiedzania i drogę powrotną.',
    practical: 'Trasa samochodem prowadzi do wejścia Piazza Anfiteatro; przed wyjazdem sprawdź czas jazdy na mapie. Bilety i godziny zwiedzania znajdziesz na stronie parku: zimą zamyka się wcześniej. Podróżując pociągiem, sprawdź wcześniej przesiadki i połączenie powrotne.',
    car: 'Trasa samochodem', tickets: 'Bilety i godziny zwiedzania', travel: 'Dojazd: strona parku',
    photos: ['Forum w Pompejach z Wezuwiuszem na horyzoncie', 'Kolumny i łuki forum w Pompejach'],
  },
};
export const getPompeiiCopy = (language: string) => COPY[language as StayLanguage] || COPY.en;
