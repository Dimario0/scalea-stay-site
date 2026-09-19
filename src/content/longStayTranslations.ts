import { getLongStayCopy } from './longStay';
import { LONG_STAY_LANDING } from './longStayLanding';
import { LONG_STAY_ROUTES, type StayLanguage } from './longStayRoutes';

type Landing = typeof LONG_STAY_LANDING;
type Details = {
  title: string; description: string; h1: string; eyebrow: string; intro: string;
  features: [string, string][]; nearby: [string, string][];
  extraFaq: [string, string][];
};
const DETAILS: Record<Exclude<StayLanguage, 'it'>, Details> = {
  ru: {
    title: 'Зимнее и длительное проживание в Скалее — Wi-Fi и отопление | ScaleaStay',
    description: 'Проведите несколько недель или месяц зимой в Скалее: апартаменты с одной спальней, Wi-Fi, газовым отоплением, кухней и террасой. Стоимость по запросу.',
    h1: 'Останьтесь в Скалее на зиму — с домашним комфортом',
    eyebrow: 'Калабрия · Зима и несезон',
    intro: 'Несколько недель или месяц у моря в своём ритме. Апартаменты с одной спальней и современным интерьером. Wi‑Fi, газовое отопление и оборудованная кухня — для привычной жизни вдали от дома.',
    features: [
      ['Комфорт в прохладные месяцы', 'В апартаментах есть газовое отопление и Wi‑Fi. Также доступны кондиционер и парковка для гостей.'],
      ['Живите в своём ритме', 'Готовьте на оборудованной кухне и отдыхайте в отдельной спальне. Устраивайте день так, как удобно вам.'],
    ],
    nearby: [['Ближайший пляж', 'Примерно 5–8 минут пешком до прогулки у моря.'], ['Interspar', 'Около 3 минут пешком за повседневными покупками.'], ['Железнодорожный вокзал', 'Около 8 минут пешком до станции Scalea–Santa Domenica Talao.']],
    extraFaq: [
      ['Сколько стоит проживание на месяц?', 'Стоимость по запросу: она зависит от дат, срока проживания и числа гостей. Цену согласуем до подтверждения бронирования.'],
      ['Коммунальные расходы включены в стоимость?', 'Нет, при длительном проживании коммунальные расходы оплачиваются отдельно. Состав платежей и порядок расчёта уточняем вместе с предложением.'],
      ['Можно ли приехать без автомобиля?', 'До моря, Interspar и вокзала можно дойти пешком. Для экскурсий и дальних поездок проверьте транспортное расписание на ваши даты.'],
    ],
  },
  en: {
    title: 'Winter and longer stays in Scalea with Wi-Fi and heating | ScaleaStay',
    description: 'Spend a few weeks or a month in Scalea this winter. A one-bedroom apartment with Wi-Fi, gas heating, a kitchen and a private terrace. Price on request.',
    h1: 'Make yourself at home in Scalea this winter',
    eyebrow: 'Calabria · Winter and off-season stays',
    intro: 'Spend a few weeks or a month by the sea at your own pace. Enjoy a one-bedroom apartment with modern interiors, Wi‑Fi, gas heating and an equipped kitchen.',
    features: [
      ['Comfort in the cooler months', 'Gas heating and Wi‑Fi are available in the apartment. Air conditioning and guest parking complete the amenities.'],
      ['Room for your everyday routine', 'Prepare meals in the equipped kitchen and enjoy the privacy of a separate bedroom. Plan each day around what suits you.'],
    ],
    nearby: [['Nearest beach', 'About a 5–8 minute walk for some time by the sea.'], ['Interspar', 'About a 3-minute walk for everyday groceries.'], ['Railway station', 'About an 8-minute walk to Scalea–Santa Domenica Talao station.']],
    extraFaq: [
      ['How much does a month-long stay cost?', 'Prices are available on request and depend on your dates, length of stay and number of guests. We agree the price before confirming your booking.'],
      ['Are utilities included?', 'No. Utilities are charged separately for longer stays. The charges and how they are calculated are explained with your quote.'],
      ['Can I stay without a car?', 'You can walk to the sea, Interspar and the railway station. For excursions and longer journeys, check transport timetables for your travel dates.'],
    ],
  },
  de: {
    title: 'Überwintern in Scalea: Ferienwohnung mit WLAN und Heizung | ScaleaStay',
    description: 'Einige Wochen oder einen Monat im Winter in Scalea verbringen: Ferienwohnung mit einem Schlafzimmer, WLAN, Gasheizung, Küche und Terrasse. Preis auf Anfrage.',
    h1: 'Den Winter in Scalea verbringen und sich zu Hause fühlen',
    eyebrow: 'Kalabrien · Winter und Nebensaison',
    intro: 'Einige Wochen oder einen Monat am Meer, ganz in Ihrem eigenen Rhythmus. Die modern eingerichtete Ferienwohnung bietet ein separates Schlafzimmer, WLAN, Gasheizung und eine ausgestattete Küche.',
    features: [
      ['Komfort auch an kühleren Tagen', 'Die Ferienwohnung verfügt über Gasheizung und WLAN. Klimaanlage und ein Parkplatz für Gäste ergänzen die Ausstattung.'],
      ['Freiraum für Ihren Alltag', 'Bereiten Sie Ihre Mahlzeiten in der ausgestatteten Küche zu und genießen Sie die Privatsphäre eines separaten Schlafzimmers. Sie bestimmen Ihren Tagesablauf.'],
    ],
    nearby: [['Nächster Strand', 'Etwa 5–8 Minuten zu Fuß für einen Spaziergang am Meer.'], ['Interspar', 'Etwa 3 Minuten zu Fuß für den täglichen Einkauf.'], ['Bahnhof', 'Etwa 8 Minuten zu Fuß zum Bahnhof Scalea–Santa Domenica Talao.']],
    extraFaq: [
      ['Was kostet ein Aufenthalt von einem Monat?', 'Den Preis erhalten Sie auf Anfrage. Er richtet sich nach Reisedaten, Aufenthaltsdauer und Gästezahl und wird vor der Buchungsbestätigung vereinbart.'],
      ['Sind die Nebenkosten im Preis enthalten?', 'Nein, bei längeren Aufenthalten werden die Nebenkosten separat berechnet. Welche Kosten anfallen und wie sie berechnet werden, klären wir mit dem Angebot.'],
      ['Ist ein Aufenthalt ohne Auto möglich?', 'Das Meer, Interspar und der Bahnhof sind zu Fuß erreichbar. Prüfen Sie für Ausflüge und längere Strecken die Verbindungen für Ihre Reisedaten.'],
    ],
  },
  cs: {
    title: 'Zimní a delší pobyty ve Scalee — Wi-Fi a topení | ScaleaStay',
    description: 'Několik týdnů nebo měsíc v zimní Scalee. Apartmán s jednou ložnicí, Wi-Fi, plynovým topením, kuchyní a vlastní terasou. Cena na vyžádání.',
    h1: 'Prožijte zimu ve Scalee s pohodlím domova',
    eyebrow: 'Kalábrie · Zima a pobyty mimo sezónu',
    intro: 'Několik týdnů nebo měsíc u moře ve vlastním rytmu. Moderně zařízený apartmán nabízí samostatnou ložnici, Wi‑Fi, plynové topení a vybavenou kuchyň.',
    features: [
      ['Pohodlí i v chladnějších měsících', 'V apartmánu je plynové topení a Wi‑Fi. K vybavení patří také klimatizace a parkování pro hosty.'],
      ['Každý den podle vás', 'Připravte si jídlo ve vybavené kuchyni a užijte si soukromí samostatné ložnice. Denní program si určujete sami.'],
    ],
    nearby: [['Nejbližší pláž', 'Přibližně 5–8 minut pěšky na procházku k moři.'], ['Interspar', 'Přibližně 3 minuty pěšky na běžný nákup.'], ['Vlakové nádraží', 'Přibližně 8 minut pěšky na nádraží Scalea–Santa Domenica Talao.']],
    extraFaq: [
      ['Kolik stojí měsíční pobyt?', 'Cena je na vyžádání a závisí na termínu, délce pobytu a počtu hostů. Dohodneme ji před potvrzením rezervace.'],
      ['Jsou energie a služby zahrnuté v ceně?', 'Ne, u delších pobytů se energie a služby hradí zvlášť. Jednotlivé položky a způsob výpočtu upřesníme společně s nabídkou.'],
      ['Mohu přijet bez auta?', 'K moři, do Intersparu i na nádraží dojdete pěšky. Pro výlety a delší cesty si ověřte dopravní spojení na svůj termín.'],
    ],
  },
  pl: {
    title: 'Zimowe i dłuższe pobyty w Scalei — Wi-Fi i ogrzewanie | ScaleaStay',
    description: 'Spędź kilka tygodni lub miesiąc zimą w Scalei. Apartament z jedną sypialnią, Wi-Fi, ogrzewaniem gazowym, kuchnią i tarasem. Cena na zapytanie.',
    h1: 'Spędź zimę w Scalei z wygodą własnego mieszkania',
    eyebrow: 'Kalabria · Zima i pobyty poza sezonem',
    intro: 'Kilka tygodni lub miesiąc nad morzem, we własnym rytmie. Nowocześnie urządzony apartament z oddzielną sypialnią, Wi‑Fi, ogrzewaniem gazowym i wyposażoną kuchnią.',
    features: [
      ['Wygodnie również w chłodniejsze miesiące', 'Apartament ma ogrzewanie gazowe i Wi‑Fi. Do dyspozycji gości są również klimatyzacja i parking.'],
      ['Codzienność po swojemu', 'Przygotuj posiłek w wyposażonej kuchni i odpocznij w oddzielnej sypialni. Zaplanuj dzień tak, jak lubisz.'],
    ],
    nearby: [['Najbliższa plaża', 'Około 5–8 minut pieszo na spacer nad morzem.'], ['Interspar', 'Około 3 minuty pieszo po codzienne zakupy.'], ['Dworzec kolejowy', 'Około 8 minut pieszo do stacji Scalea–Santa Domenica Talao.']],
    extraFaq: [
      ['Ile kosztuje pobyt na miesiąc?', 'Cena jest dostępna na zapytanie i zależy od terminu, długości pobytu oraz liczby gości. Ustalamy ją przed potwierdzeniem rezerwacji.'],
      ['Czy media są wliczone w cenę?', 'Nie, przy dłuższych pobytach media są płatne osobno. Zakres opłat i sposób rozliczenia wyjaśniamy razem z ofertą.'],
      ['Czy można przyjechać bez samochodu?', 'Do morza, Intersparu i dworca można dojść pieszo. Planując wycieczki i dalsze przejazdy, sprawdź połączenia na termin swojego pobytu.'],
    ],
  },
};

export function getLongStayLanding(language: StayLanguage): Landing {
  if (language === 'it') return LONG_STAY_LANDING;
  const d = DETAILS[language], home = getLongStayCopy(language);
  return { ...d, cta: home.availabilityCta, message: home.message,
    features: d.features.map(([title, text]) => ({ title, text })),
    nearby: d.nearby.map(([name, text], i) => ({ name, text, distance: ['600 m', '230 m', '500 m'][i] })),
    faq: [...home.faq, ...d.extraFaq.map(([q, a]) => ({ q, a }))],
  };
}

// All interface labels, captions and image descriptions are translated too.
const UI = {
  it: ['Navigazione','Scopri l’appartamento','Parla direttamente con il proprietario','Interni dell’appartamento ScaleaStay a Scalea','Il piacere di avere i tuoi spazi','Uno sguardo ai tuoi spazi','Tutte le foto dell’appartamento','Il mare e le comodità di ogni giorno, a piedi','Il tuo prossimo soggiorno','Organizziamo il tuo soggiorno a Scalea','Indica il periodo, la durata e il numero di ospiti: riceverai una proposta per il tuo soggiorno, direttamente dal proprietario.','Utenze a parte. Prezzo e condizioni concordati prima della conferma.','Guarda le foto','Le risposte prima di partire','Scopri ScaleaStay','Foto e informazioni sull’appartamento','Torna alla pagina principale','Camera da letto separata con letto matrimoniale e finestra','La tua camera da letto separata','Bagno con doccia, lavabo e lavatrice nell’appartamento ScaleaStay','Bagno con doccia e lavatrice','Lingua'],
  ru: ['Навигация','Посмотреть апартаменты','Напишите напрямую владельцу','Интерьер апартаментов ScaleaStay в Скалее','Место для привычной жизни','Загляните в апартаменты','Все фотографии апартаментов','Море и всё необходимое — пешком','Ваша следующая поездка','Спланируем ваше проживание в Скалее','Напишите даты, срок проживания и число гостей — получите предложение напрямую от владельца.','Коммунальные расходы отдельно. Стоимость и условия согласуем до подтверждения.','Посмотреть фотографии','Ответы перед поездкой','Знакомство со ScaleaStay','Фотографии и информация об апартаментах','На главную страницу','Отдельная спальня с двуспальной кроватью и окном','Ваша отдельная спальня','Ванная комната ScaleaStay с душем, раковиной и стиральной машиной','Ванная с душем и стиральной машиной','Язык'],
  en: ['Navigation','Explore the apartment','Contact the owner directly','Interior of the ScaleaStay apartment in Scalea','Space to feel at home','Take a look inside','All apartment photos','The sea and everyday essentials, on foot','Your next stay','Plan your stay in Scalea','Send your dates, length of stay and number of guests to receive a quote directly from the owner.','Utilities are charged separately. Price and terms are agreed before confirmation.','View photos','Answers before you travel','Discover ScaleaStay','Apartment photos and details','Back to the homepage','Separate bedroom with a double bed and window','Your separate bedroom','ScaleaStay bathroom with a shower, washbasin and washing machine','Bathroom with a shower and washing machine','Language'],
  de: ['Navigation','Ferienwohnung ansehen','Direkter Kontakt zum Eigentümer','Innenansicht der Ferienwohnung ScaleaStay in Scalea','Platz zum Wohlfühlen','Ein Blick in die Ferienwohnung','Alle Fotos der Ferienwohnung','Meer und Alltag bequem zu Fuß','Ihr nächster Aufenthalt','Planen Sie Ihren Aufenthalt in Scalea','Senden Sie Reisedaten, Aufenthaltsdauer und Gästezahl. Sie erhalten ein Angebot direkt vom Eigentümer.','Nebenkosten werden separat berechnet. Preis und Bedingungen werden vor der Bestätigung vereinbart.','Fotos ansehen','Antworten vor Ihrer Reise','ScaleaStay entdecken','Fotos und Informationen zur Ferienwohnung','Zur Startseite','Separates Schlafzimmer mit Doppelbett und Fenster','Ihr separates Schlafzimmer','Badezimmer von ScaleaStay mit Dusche, Waschbecken und Waschmaschine','Badezimmer mit Dusche und Waschmaschine','Sprache'],
  cs: ['Navigace','Prohlédnout apartmán','Kontaktujte přímo majitele','Interiér apartmánu ScaleaStay ve Scalee','Prostor, kde se budete cítit jako doma','Nahlédněte do apartmánu','Všechny fotografie apartmánu','K moři i za nákupy pěšky','Váš příští pobyt','Naplánujte si pobyt ve Scalee','Napište termín, délku pobytu a počet hostů. Nabídku obdržíte přímo od majitele.','Energie a služby se hradí zvlášť. Cenu a podmínky dohodneme před potvrzením.','Prohlédnout fotografie','Odpovědi před cestou','Objevte ScaleaStay','Fotografie a informace o apartmánu','Zpět na hlavní stránku','Samostatná ložnice s manželskou postelí a oknem','Vaše samostatná ložnice','Koupelna ScaleaStay se sprchou, umyvadlem a pračkou','Koupelna se sprchou a pračkou','Jazyk'],
  pl: ['Nawigacja','Zobacz apartament','Skontaktuj się bezpośrednio z właścicielem','Wnętrze apartamentu ScaleaStay w Scalei','Przestrzeń, w której poczujesz się jak w domu','Zajrzyj do apartamentu','Wszystkie zdjęcia apartamentu','Morze i codzienne zakupy w zasięgu spaceru','Twój kolejny pobyt','Zaplanuj pobyt w Scalei','Napisz termin, długość pobytu i liczbę gości. Otrzymasz ofertę bezpośrednio od właściciela.','Media płatne osobno. Cenę i warunki ustalamy przed potwierdzeniem.','Zobacz zdjęcia','Odpowiedzi przed wyjazdem','Poznaj ScaleaStay','Zdjęcia i informacje o apartamencie','Powrót na stronę główną','Oddzielna sypialnia z łóżkiem dwuosobowym i oknem','Twoja oddzielna sypialnia','Łazienka ScaleaStay z prysznicem, umywalką i pralką','Łazienka z prysznicem i pralką','Język'],
} satisfies Record<StayLanguage, string[]>;
const TERRACE_PHOTO_COPY: Record<StayLanguage, { terraceAlt: string; terraceCaption: string }> = {
  ru: { terraceAlt: 'Терраса апартаментов ScaleaStay с двумя креслами и круглым столиком', terraceCaption: 'Терраса апартаментов' },
  it: { terraceAlt: 'Terrazza dell’appartamento ScaleaStay con due poltroncine e un tavolino rotondo', terraceCaption: 'La terrazza dell’appartamento' },
  en: { terraceAlt: 'ScaleaStay apartment terrace with two armchairs and a round table', terraceCaption: 'The apartment terrace' },
  de: { terraceAlt: 'Terrasse der Ferienwohnung ScaleaStay mit zwei Sesseln und einem runden Tisch', terraceCaption: 'Die Terrasse der Ferienwohnung' },
  cs: { terraceAlt: 'Terasa apartmánu ScaleaStay se dvěma křesly a kulatým stolkem', terraceCaption: 'Terasa apartmánu' },
  pl: { terraceAlt: 'Taras apartamentu ScaleaStay z dwoma fotelami i okrągłym stolikiem', terraceCaption: 'Taras apartamentu' },
};
export function getLongStayUi(language: StayLanguage) {
  const [navigation, apartment, owner, heroAlt, features, photos, allPhotos, nearby, offerEyebrow, offerTitle, offerText, terms, viewPhotos, faq, arrival, details, back, bedroomAlt, bedroomCaption, bathroomAlt, bathroomCaption, languageLabel] = UI[language];
  return { ...TERRACE_PHOTO_COPY[language], navigation, apartment, owner, heroAlt, features, photos, allPhotos, nearby, offerEyebrow, offerTitle, offerText, terms, viewPhotos, faq, arrival, details, back, bedroomAlt, bedroomCaption, bathroomAlt, bathroomCaption, languageLabel };
}
export const LONG_STAY_PAGES = (Object.keys(LONG_STAY_ROUTES) as StayLanguage[]).map(language => ({ language, ...LONG_STAY_ROUTES[language] }));
