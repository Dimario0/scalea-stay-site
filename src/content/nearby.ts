import type { StayLanguage } from './longStayRoutes';

// Destination facts checked against these official visitor sources on 2026-09-18.
export const NEARBY_PLACES = [
  { id: 'scalea', destination: 'Torre Talao, Scalea, Italy', mode: 'walking', source: 'https://www.italia.it/it/calabria/cosenza/scalea' },
  { id: 'diamante', destination: 'Centro storico, Diamante, Italy', mode: 'driving', source: 'https://www.italia.it/it/calabria/diamante' },
  { id: 'arcomagno', destination: 'San Nicola Arcella, Italy', mode: 'driving', source: 'https://www.arcomagnocalabria.it/prodotto/biglietti-escursione-arcomagno/' },
  // Drive to the coast, not to the island. Boat availability must be checked locally.
  { id: 'dino', destination: 'Spiaggia di Fiuzzi, Praia a Mare, Italy', mode: 'driving', source: 'https://www.italia.it/en/calabria/things-to-do/calabria-boat-dino-cirella-island' },
] as const;

type PlaceCopy = { title: string; text: string; practical: string };
type NearbyCopy = {
  nav: string; eyebrow: string; title: string; intro: string; map: string;
  source: string; access: string; season: string; places: [PlaceCopy, PlaceCopy, PlaceCopy, PlaceCopy];
};
export const NEARBY_COPY: Record<StayLanguage, NearbyCopy> = {
  ru: {
    nav: 'Что посмотреть', eyebrow: 'Впечатления рядом', title: 'Красивые места для ваших прогулок и поездок',
    intro: 'Сегодня — улочки старой Скалеи, завтра — росписи Диаманте или морские панорамы. Выберите настроение дня, а вечером возвращайтесь в свои апартаменты.',
    map: 'Маршрут от апартаментов', source: 'О месте', access: 'Условия посещения',
    season: 'В несезон начните со старых городов и прогулок вдоль моря. Перед поездкой к Аркоманьо проверьте доступ и погоду; морские экскурсии к острову Дино зависят от сезона, состояния моря и расписания организаторов.',
    places: [
      { title: 'Старая Скалея и Torre Talao', text: 'Узкие улочки, лестницы и виды на море. Совместите прогулку по историческому центру с набережной у башни — символа Скалеи.', practical: 'Пешком по городу. В старом центре есть подъёмы и ступени; карта ведёт к Torre Talao.' },
      { title: 'Диаманте — город настенных росписей', text: 'Разглядывайте рисунки на фасадах, сворачивайте в переулки и выходите к морю. Идея для неспешной прогулки с фотоаппаратом.', practical: 'Поездка в соседний город на машине, затем прогулка пешком по центру.' },
      { title: 'Сан-Никола-Арчелла и Аркоманьо', text: 'Панорамы побережья и природная скальная арка над небольшой бухтой — место для тех, кто любит выразительные морские пейзажи.', practical: 'На машине до Сан-Никола-Арчеллы. К Аркоманьо ведёт отдельная тропа со ступенями; условия входа проверьте перед поездкой.' },
      { title: 'Остров Дино у Прайя-а-Маре', text: 'Полюбуйтесь островом с берега Фьюцци. Морская прогулка позволяет увидеть его скалы и пещеры с другого ракурса.', practical: 'Карта ведёт к берегу Фьюцци на машине. Поездку на лодке нужно согласовать отдельно с организатором.' },
    ],
  },
  en: {
    nav: 'Places to explore', eyebrow: 'Discover the area', title: 'Beautiful places for walks and day trips',
    intro: 'Scalea’s old lanes today, Diamante’s murals or coastal views tomorrow. Follow your mood, then return to your own apartment in the evening.',
    map: 'Directions from the apartment', source: 'About this place', access: 'Visitor information',
    season: 'Outside summer, start with the old towns and seaside walks. Check access and weather before visiting Arcomagno; boat trips around Dino Island depend on the season, sea conditions and operators’ schedules.',
    places: [
      { title: 'Old Scalea and Torre Talao', text: 'Narrow lanes, stone steps and sea views. Combine the historic centre with a walk along the seafront beside Scalea’s landmark tower.', practical: 'Explore on foot. The old town has slopes and steps; the map leads to Torre Talao.' },
      { title: 'Diamante, a town of murals', text: 'Discover paintings on the façades, wander through little lanes and stroll down to the sea. A lovely outing to enjoy with a camera.', practical: 'Drive to the neighbouring town, then explore the centre on foot.' },
      { title: 'San Nicola Arcella and Arcomagno', text: 'Coastal panoramas and a natural rock arch above a small cove: a destination for anyone drawn to dramatic seascapes.', practical: 'Drive to San Nicola Arcella. Arcomagno has a separate footpath with steps; check entry arrangements before your trip.' },
      { title: 'Dino Island near Praia a Mare', text: 'Admire the island from the Fiuzzi shore. A boat trip offers another perspective on its cliffs and sea caves.', practical: 'The map gives driving directions to the Fiuzzi shore. Arrange any boat trip separately with an operator.' },
    ],
  },
  it: {
    nav: 'Cosa vedere', eyebrow: 'Da scoprire nei dintorni', title: 'Luoghi da vivere, tra passeggiate e gite',
    intro: 'Oggi i vicoli di Scalea, domani i murales di Diamante o i panorami della costa. Scegli il ritmo della giornata e torna nel tuo appartamento la sera.',
    map: 'Itinerario dall’appartamento', source: 'Scopri il luogo', access: 'Informazioni per la visita',
    season: 'Fuori stagione, parti dai centri storici e dalle passeggiate sul lungomare. Prima di visitare l’Arcomagno verifica accessi e meteo; le escursioni intorno all’Isola di Dino dipendono dalla stagione, dal mare e dai programmi degli operatori.',
    places: [
      { title: 'Scalea vecchia e Torre Talao', text: 'Vicoli, scalinate e scorci sul mare. Abbina il centro storico a una passeggiata sul lungomare, accanto alla torre simbolo di Scalea.', practical: 'A piedi in città. Il borgo presenta salite e gradini; la mappa conduce a Torre Talao.' },
      { title: 'Diamante, la città dei murales', text: 'Dipinti sulle facciate, vicoli da esplorare e una passeggiata verso il mare. Un’idea per una gita lenta, con la macchina fotografica a portata di mano.', practical: 'In auto fino alla cittadina vicina, poi a piedi nel centro.' },
      { title: 'San Nicola Arcella e l’Arcomagno', text: 'Panorami sulla costa e un arco naturale di roccia sopra una piccola baia: una meta per chi ama i paesaggi marini più suggestivi.', practical: 'In auto fino a San Nicola Arcella. L’Arcomagno si raggiunge con un sentiero separato, con gradini: verifica le condizioni d’ingresso.' },
      { title: 'Isola di Dino, a Praia a Mare', text: 'Ammira l’isola dalla costa di Fiuzzi. Un’uscita in barca permette di scoprire le sue pareti rocciose e le grotte marine da un’altra prospettiva.', practical: 'La mappa indica il percorso in auto fino alla costa di Fiuzzi. L’escursione in barca va concordata separatamente con un operatore.' },
    ],
  },
  de: {
    nav: 'Ausflugsziele', eyebrow: 'Die Umgebung entdecken', title: 'Schöne Orte für Spaziergänge und Ausflüge',
    intro: 'Heute die Gassen von Scalea, morgen die Wandbilder von Diamante oder weite Blicke aufs Meer. Gestalten Sie Ihren Tag und kehren Sie abends in Ihre Ferienwohnung zurück.',
    map: 'Route ab der Ferienwohnung', source: 'Mehr zum Ort', access: 'Besucherinformationen',
    season: 'In der Nebensaison bieten sich Altstädte und Spaziergänge am Meer an. Prüfen Sie vor einem Besuch des Arcomagno Zugang und Wetter. Bootsausflüge zur Insel Dino hängen von Saison, Seegang und den Angeboten der Veranstalter ab.',
    places: [
      { title: 'Scaleas Altstadt und Torre Talao', text: 'Enge Gassen, Treppen und Meerblicke. Verbinden Sie die Altstadt mit einem Spaziergang an der Promenade beim Wahrzeichen von Scalea.', practical: 'Zu Fuß durch die Stadt. Die Altstadt hat Steigungen und Stufen; die Karte führt zur Torre Talao.' },
      { title: 'Diamante, die Stadt der Wandbilder', text: 'Entdecken Sie bemalte Fassaden, kleine Gassen und den Weg hinunter zum Meer. Ein schöner Ausflug für einen entspannten Tag mit der Kamera.', practical: 'Mit dem Auto in den Nachbarort, anschließend zu Fuß durch das Zentrum.' },
      { title: 'San Nicola Arcella und Arcomagno', text: 'Küstenpanoramen und ein natürlicher Felsbogen über einer kleinen Bucht: ein Ziel für alle, die eindrucksvolle Meereslandschaften lieben.', practical: 'Mit dem Auto nach San Nicola Arcella. Zum Arcomagno führt ein separater Fußweg mit Stufen; prüfen Sie vorher die Zugangsbedingungen.' },
      { title: 'Insel Dino bei Praia a Mare', text: 'Bewundern Sie die Insel vom Ufer bei Fiuzzi aus. Bei einer Bootsfahrt erleben Sie ihre Felswände und Meereshöhlen aus einem anderen Blickwinkel.', practical: 'Die Karte zeigt die Autofahrt zur Küste bei Fiuzzi. Eine Bootsfahrt vereinbaren Sie separat mit einem Anbieter.' },
    ],
  },
  cs: {
    nav: 'Co vidět', eyebrow: 'Objevte okolí', title: 'Krásná místa na procházky a výlety',
    intro: 'Dnes staré uličky Scalei, zítra nástěnné malby v Diamante nebo výhledy na pobřeží. Vyberte si program podle nálady a večer se vraťte do svého apartmánu.',
    map: 'Trasa od apartmánu', source: 'O tomto místě', access: 'Informace k návštěvě',
    season: 'Mimo sezónu začněte historickými městy a procházkami podél moře. Před návštěvou Arcomagna si ověřte přístup a počasí; výlety lodí kolem ostrova Dino závisejí na sezóně, stavu moře a nabídce pořadatelů.',
    places: [
      { title: 'Stará Scalea a Torre Talao', text: 'Úzké uličky, schodiště a výhledy na moře. Spojte historické centrum s procházkou po nábřeží u věže, která je symbolem Scalei.', practical: 'Pěšky po městě. V historickém centru jsou svahy a schody; mapa vede k Torre Talao.' },
      { title: 'Diamante, město nástěnných maleb', text: 'Objevujte obrazy na fasádách, malé uličky a cestu k moři. Příjemný nápad na poklidný výlet s fotoaparátem.', practical: 'Autem do sousedního města, poté pěšky po centru.' },
      { title: 'San Nicola Arcella a Arcomagno', text: 'Výhledy na pobřeží a přírodní skalní oblouk nad malou zátokou. Místo pro každého, kdo má rád působivé mořské scenérie.', practical: 'Autem do San Nicola Arcella. K Arcomagnu vede samostatná pěší stezka se schody; před cestou ověřte podmínky vstupu.' },
      { title: 'Ostrov Dino u Praia a Mare', text: 'Prohlédněte si ostrov z pobřeží Fiuzzi. Výlet lodí nabízí jiný pohled na jeho skály a mořské jeskyně.', practical: 'Mapa ukazuje cestu autem na pobřeží Fiuzzi. Výlet lodí si domluvte zvlášť s pořadatelem.' },
    ],
  },
  pl: {
    nav: 'Co zobaczyć', eyebrow: 'Odkryj okolicę', title: 'Piękne miejsca na spacery i wycieczki',
    intro: 'Dziś uliczki starej Scalei, jutro murale w Diamante albo widoki na wybrzeże. Wybierz plan zgodny ze swoim nastrojem i wróć wieczorem do własnego apartamentu.',
    map: 'Trasa z apartamentu', source: 'O tym miejscu', access: 'Informacje dla odwiedzających',
    season: 'Poza sezonem zacznij od starówek i spacerów nad morzem. Przed wizytą przy Arcomagno sprawdź dostęp i pogodę; rejsy wokół wyspy Dino zależą od sezonu, warunków na morzu i oferty organizatorów.',
    places: [
      { title: 'Stara Scalea i Torre Talao', text: 'Wąskie uliczki, schody i widoki na morze. Połącz zwiedzanie starego miasta ze spacerem promenadą przy wieży będącej symbolem Scalei.', practical: 'Pieszo po mieście. Na starówce są podejścia i schody; mapa prowadzi do Torre Talao.' },
      { title: 'Diamante, miasto murali', text: 'Odkrywaj malowidła na fasadach, zaglądaj w zaułki i zejdź nad morze. Pomysł na spokojną wycieczkę z aparatem.', practical: 'Samochodem do sąsiedniego miasta, następnie pieszo po centrum.' },
      { title: 'San Nicola Arcella i Arcomagno', text: 'Panoramy wybrzeża i naturalny skalny łuk nad niewielką zatoką. Miejsce dla miłośników wyrazistych nadmorskich krajobrazów.', practical: 'Samochodem do San Nicola Arcella. Do Arcomagno prowadzi osobna ścieżka ze schodami; przed wyjazdem sprawdź warunki wejścia.' },
      { title: 'Wyspa Dino przy Praia a Mare', text: 'Podziwiaj wyspę z brzegu Fiuzzi. Rejs pozwala zobaczyć jej skaliste ściany i morskie groty z innej perspektywy.', practical: 'Mapa prowadzi samochodem na wybrzeże Fiuzzi. Rejs trzeba uzgodnić osobno z organizatorem.' },
    ],
  },
};
export const getNearbyCopy = (language: string) => NEARBY_COPY[language as StayLanguage] || NEARBY_COPY.en;
export const nearbyMap = (place: typeof NEARBY_PLACES[number]) => `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent('Via Giuseppe Saragat 11, Scalea, Italy')}&destination=${encodeURIComponent(place.destination)}&travelmode=${place.mode}`;
