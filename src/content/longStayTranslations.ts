import { getLongStayCopy } from './longStay';
import { LONG_STAY_LANDING } from './longStayLanding';
import { LONG_STAY_ROUTES, type StayLanguage } from './longStayRoutes';

type Landing = typeof LONG_STAY_LANDING;
type Details = {
  title: string; description: string; h1: string; eyebrow: string; intro: string;
  offer: Landing['offer']; minimumStayFaq: [string, string];
  features: [string, string][]; nearby: [string, string][];
  extraFaq: [string, string][];
};
const DETAILS: Record<Exclude<StayLanguage, 'it'>, Details> = {
  ru: {
    title: 'Зимняя аренда в Скалее: €450/мес. + коммунальные | ScaleaStay',
    description: 'Апартаменты в Скалее за €450 в месяц с ноября по март, минимум месяц. Коммунальные отдельно по счётчикам, разовый аванс €100 с перерасчётом.',
    h1: 'Апартаменты в Скалее на месяц зимой',
    eyebrow: 'Калабрия · Зима и несезон',
    intro: 'С ноября по март снимайте апартаменты ScaleaStay на срок от одного месяца за €450 в месяц плюс коммунальные по счётчикам. Отдельная спальня, Wi‑Fi, газовое отопление и оборудованная кухня — для привычной жизни рядом с морем.',
    offer: {
      price: '€450 в месяц за апартаменты',
      period: 'С ноября по март · минимум один месяц',
      utilities: 'Коммунальные услуги оплачиваются отдельно по фактическим показаниям счётчиков.',
      advance: 'При заселении вносится разовый аванс €100 за коммунальные услуги. После перерасчёта неиспользованный остаток возвращается, превышение оплачивается дополнительно.',
      availability: 'Свободные даты необходимо подтвердить у владельца.',
    },
    minimumStayFaq: ['Какой минимальный срок по зимнему предложению?', 'Предложение действует с ноября по март при проживании от одного месяца. Свободные даты необходимо подтвердить у владельца.'],
    features: [
      ['Комфорт в прохладные месяцы', 'В апартаментах есть газовое отопление и Wi‑Fi. Также доступны кондиционер и парковка для гостей.'],
      ['Живите в своём ритме', 'Готовьте на оборудованной кухне и отдыхайте в отдельной спальне. Устраивайте день так, как удобно вам.'],
    ],
    nearby: [['Ближайший пляж', 'Примерно 5–8 минут пешком до прогулки у моря.'], ['Interspar', 'Около 3 минут пешком за повседневными покупками.'], ['Железнодорожный вокзал', 'Около 8 минут пешком до станции Scalea–Santa Domenica Talao.']],
    extraFaq: [
      ['Сколько стоит проживание на месяц?', 'С ноября по март — €450 в месяц за апартаменты, минимальный срок — один месяц. Коммунальные услуги оплачиваются отдельно по счётчикам. При заселении вносится разовый аванс €100 за коммунальные услуги: после перерасчёта остаток возвращается, превышение оплачивается дополнительно.'],
      ['Можно ли приехать без автомобиля?', 'До моря, Interspar и вокзала можно дойти пешком. Для экскурсий и дальних поездок проверьте транспортное расписание на ваши даты.'],
    ],
  },
  en: {
    title: 'Scalea winter monthly rental: €450 + utilities | ScaleaStay',
    description: 'Scalea apartment for €450 per month from November to March, minimum one month. Metered utilities are extra, with a one-off €100 advance and reconciliation.',
    h1: 'Rent an apartment in Scalea for a month or more this winter',
    eyebrow: 'Calabria · Winter and off-season stays',
    intro: 'Rent the ScaleaStay apartment from November to March for €450 per month, with a minimum stay of one month and metered utilities charged separately. Enjoy a separate bedroom, Wi‑Fi, gas heating and an equipped kitchen near the sea.',
    offer: {
      price: '€450 per month for the apartment',
      period: 'November to March · minimum stay of one month',
      utilities: 'Utilities are charged separately according to actual meter readings.',
      advance: 'A one-off €100 advance towards utilities is paid on arrival. After reconciliation, any unused balance is refunded and any excess is payable separately.',
      availability: 'Available dates must be confirmed by the owner.',
    },
    minimumStayFaq: ['What is the minimum stay for the winter offer?', 'The offer applies from November to March for stays of at least one month, subject to confirmation of available dates.'],
    features: [
      ['Comfort in the cooler months', 'Gas heating and Wi‑Fi are available in the apartment. Air conditioning and guest parking complete the amenities.'],
      ['Room for your everyday routine', 'Prepare meals in the equipped kitchen and enjoy the privacy of a separate bedroom. Plan each day around what suits you.'],
    ],
    nearby: [['Nearest beach', 'About a 5–8 minute walk for some time by the sea.'], ['Interspar', 'About a 3-minute walk for everyday groceries.'], ['Railway station', 'About an 8-minute walk to Scalea–Santa Domenica Talao station.']],
    extraFaq: [
      ['How much does a month-long stay cost?', 'From November to March, the apartment costs €450 per month, with a minimum stay of one month. Utilities are extra and calculated from meter readings. A one-off €100 advance towards utilities is paid on arrival; any unused balance is refunded after reconciliation and any excess is payable separately.'],
      ['Can I stay without a car?', 'You can walk to the sea, Interspar and the railway station. For excursions and longer journeys, check transport timetables for your travel dates.'],
    ],
  },
  de: {
    title: 'Überwintern in Scalea: 450 €/Monat + Nebenkosten | ScaleaStay',
    description: 'Ferienwohnung in Scalea für 450 € pro Monat von November bis März, mindestens ein Monat. Verbrauchskosten extra; einmalig 100 € Vorschuss mit Abrechnung.',
    h1: 'Ferienwohnung in Scalea zum Überwintern mieten',
    eyebrow: 'Kalabrien · Winter und Nebensaison',
    intro: 'Mieten Sie die Ferienwohnung ScaleaStay von November bis März für 450 € pro Monat, bei einem Mindestaufenthalt von einem Monat. Verbrauchskosten werden separat nach Zählerständen abgerechnet. Ein separates Schlafzimmer, WLAN, Gasheizung und eine ausgestattete Küche machen den Alltag am Meer bequem.',
    offer: {
      price: '450 € pro Monat für die Ferienwohnung',
      period: 'November bis März · Mindestaufenthalt ein Monat',
      utilities: 'Die Verbrauchskosten werden separat nach den tatsächlichen Zählerständen abgerechnet.',
      advance: 'Bei der Anreise wird ein einmaliger Vorschuss von 100 € für die Verbrauchskosten gezahlt. Nach der Abrechnung wird ein Guthaben erstattet; ein Mehrverbrauch ist zusätzlich zu bezahlen.',
      availability: 'Verfügbare Reisedaten müssen vom Eigentümer bestätigt werden.',
    },
    minimumStayFaq: ['Wie lang ist der Mindestaufenthalt für das Winterangebot?', 'Das Angebot gilt von November bis März für Aufenthalte ab einem Monat. Verfügbare Reisedaten müssen bestätigt werden.'],
    features: [
      ['Komfort auch an kühleren Tagen', 'Die Ferienwohnung verfügt über Gasheizung und WLAN. Klimaanlage und ein Parkplatz für Gäste ergänzen die Ausstattung.'],
      ['Freiraum für Ihren Alltag', 'Bereiten Sie Ihre Mahlzeiten in der ausgestatteten Küche zu und genießen Sie die Privatsphäre eines separaten Schlafzimmers. Sie bestimmen Ihren Tagesablauf.'],
    ],
    nearby: [['Nächster Strand', 'Etwa 5–8 Minuten zu Fuß für einen Spaziergang am Meer.'], ['Interspar', 'Etwa 3 Minuten zu Fuß für den täglichen Einkauf.'], ['Bahnhof', 'Etwa 8 Minuten zu Fuß zum Bahnhof Scalea–Santa Domenica Talao.']],
    extraFaq: [
      ['Was kostet ein Aufenthalt von einem Monat?', 'Von November bis März kostet die Ferienwohnung 450 € pro Monat, bei einem Mindestaufenthalt von einem Monat. Verbrauchskosten werden separat nach Zählerständen abgerechnet. Bei der Anreise wird ein einmaliger Vorschuss von 100 € gezahlt; nach der Abrechnung wird ein Guthaben erstattet oder die Differenz nachgezahlt.'],
      ['Ist ein Aufenthalt ohne Auto möglich?', 'Das Meer, Interspar und der Bahnhof sind zu Fuß erreichbar. Prüfen Sie für Ausflüge und längere Strecken die Verbindungen für Ihre Reisedaten.'],
    ],
  },
  cs: {
    title: 'Zimní pronájem ve Scalee: 450 €/měsíc + energie a služby | ScaleaStay',
    description: 'Apartmán ve Scalee za 450 € měsíčně od listopadu do března, minimálně měsíc. Energie a služby dle měřidel zvlášť; jednorázová záloha 100 € s vyúčtováním.',
    h1: 'Pronájem apartmánu ve Scalee na měsíc v zimě',
    eyebrow: 'Kalábrie · Zima a pobyty mimo sezónu',
    intro: 'Od listopadu do března si pronajměte apartmán ScaleaStay za 450 € měsíčně, minimálně na jeden měsíc. Energie a služby se platí zvlášť podle měřidel. Samostatná ložnice, Wi‑Fi, plynové topení a vybavená kuchyň pro každodenní život u moře.',
    offer: {
      price: '450 € měsíčně za apartmán',
      period: 'Od listopadu do března · minimální pobyt jeden měsíc',
      utilities: 'Energie a služby se platí zvlášť podle skutečných odečtů měřidel.',
      advance: 'Při příjezdu se platí jednorázová záloha 100 € na energie a služby. Po vyúčtování se nevyužitý zůstatek vrací a případný nedoplatek se doplácí.',
      availability: 'Volný termín musí potvrdit majitel.',
    },
    minimumStayFaq: ['Jaká je minimální délka pobytu pro zimní nabídku?', 'Nabídka platí od listopadu do března pro pobyty alespoň na jeden měsíc, po potvrzení volného termínu.'],
    features: [
      ['Pohodlí i v chladnějších měsících', 'V apartmánu je plynové topení a Wi‑Fi. K vybavení patří také klimatizace a parkování pro hosty.'],
      ['Každý den podle vás', 'Připravte si jídlo ve vybavené kuchyni a užijte si soukromí samostatné ložnice. Denní program si určujete sami.'],
    ],
    nearby: [['Nejbližší pláž', 'Přibližně 5–8 minut pěšky na procházku k moři.'], ['Interspar', 'Přibližně 3 minuty pěšky na běžný nákup.'], ['Vlakové nádraží', 'Přibližně 8 minut pěšky na nádraží Scalea–Santa Domenica Talao.']],
    extraFaq: [
      ['Kolik stojí měsíční pobyt?', 'Od listopadu do března stojí apartmán 450 € měsíčně, minimální pobyt je jeden měsíc. Energie a služby se platí zvlášť podle měřidel. Při příjezdu se platí jednorázová záloha 100 €; po vyúčtování se nevyužitý zůstatek vrací nebo se doplácí rozdíl.'],
      ['Mohu přijet bez auta?', 'K moři, do Intersparu i na nádraží dojdete pěšky. Pro výlety a delší cesty si ověřte dopravní spojení na svůj termín.'],
    ],
  },
  pl: {
    title: 'Wynajem zimą w Scalei: 450 €/mies. + media | ScaleaStay',
    description: 'Apartament w Scalei za 450 € miesięcznie od listopada do marca, minimum miesiąc. Media osobno według liczników; jednorazowa zaliczka 100 € z rozliczeniem.',
    h1: 'Wynajem apartamentu w Scalei na miesiąc zimą',
    eyebrow: 'Kalabria · Zima i pobyty poza sezonem',
    intro: 'Od listopada do marca wynajmij apartament ScaleaStay za 450 € miesięcznie, na co najmniej jeden miesiąc. Media są płatne osobno według liczników. Oddzielna sypialnia, Wi‑Fi, ogrzewanie gazowe i wyposażona kuchnia ułatwiają codzienne życie blisko morza.',
    offer: {
      price: '450 € miesięcznie za apartament',
      period: 'Od listopada do marca · minimalny pobyt jeden miesiąc',
      utilities: 'Media są płatne osobno według rzeczywistych odczytów liczników.',
      advance: 'Przy przyjeździe wpłacana jest jednorazowa zaliczka 100 € na media. Po rozliczeniu niewykorzystana kwota jest zwracana, a ewentualną niedopłatę należy dopłacić.',
      availability: 'Wolny termin musi zostać potwierdzony przez właściciela.',
    },
    minimumStayFaq: ['Jaki jest minimalny pobyt w ofercie zimowej?', 'Oferta obowiązuje od listopada do marca przy pobycie przez co najmniej jeden miesiąc, po potwierdzeniu wolnego terminu.'],
    features: [
      ['Wygodnie również w chłodniejsze miesiące', 'Apartament ma ogrzewanie gazowe i Wi‑Fi. Do dyspozycji gości są również klimatyzacja i parking.'],
      ['Codzienność po swojemu', 'Przygotuj posiłek w wyposażonej kuchni i odpocznij w oddzielnej sypialni. Zaplanuj dzień tak, jak lubisz.'],
    ],
    nearby: [['Najbliższa plaża', 'Około 5–8 minut pieszo na spacer nad morzem.'], ['Interspar', 'Około 3 minuty pieszo po codzienne zakupy.'], ['Dworzec kolejowy', 'Około 8 minut pieszo do stacji Scalea–Santa Domenica Talao.']],
    extraFaq: [
      ['Ile kosztuje pobyt na miesiąc?', 'Od listopada do marca apartament kosztuje 450 € miesięcznie, minimalny pobyt to jeden miesiąc. Media są płatne osobno według liczników. Przy przyjeździe wpłacana jest jednorazowa zaliczka 100 €; po rozliczeniu niewykorzystana kwota jest zwracana lub dopłacana jest różnica.'],
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
    faq: [...home.faq.slice(0, 2), { q: d.minimumStayFaq[0], a: d.minimumStayFaq[1] }, ...d.extraFaq.map(([q, a]) => ({ q, a }))],
  };
}

// All interface labels, captions and image descriptions are translated too.
const UI = {
  it: ['Navigazione','Scopri l’appartamento','Parla direttamente con il proprietario','Interni dell’appartamento ScaleaStay a Scalea','Il piacere di avere i tuoi spazi','Uno sguardo ai tuoi spazi','Tutte le foto dell’appartamento','Il mare e le comodità di ogni giorno, a piedi','Il tuo prossimo soggiorno','Organizziamo il tuo soggiorno a Scalea','Indica il periodo, la durata e il numero di ospiti: riceverai una proposta per il tuo soggiorno, direttamente dal proprietario.','Guarda le foto','Le risposte prima di partire','Scopri ScaleaStay','Foto e informazioni sull’appartamento','Torna alla pagina principale','Camera da letto separata con letto matrimoniale e finestra','La tua camera da letto separata','Bagno con doccia, lavabo e lavatrice nell’appartamento ScaleaStay','Bagno con doccia e lavatrice','Lingua'],
  ru: ['Навигация','Посмотреть апартаменты','Напишите напрямую владельцу','Интерьер апартаментов ScaleaStay в Скалее','Место для привычной жизни','Загляните в апартаменты','Все фотографии апартаментов','Море и всё необходимое — пешком','Ваша следующая поездка','Спланируем ваше проживание в Скалее','Напишите даты, срок проживания и число гостей — получите предложение напрямую от владельца.','Посмотреть фотографии','Ответы перед поездкой','Знакомство со ScaleaStay','Фотографии и информация об апартаментах','На главную страницу','Отдельная спальня с двуспальной кроватью и окном','Ваша отдельная спальня','Ванная комната ScaleaStay с душем, раковиной и стиральной машиной','Ванная с душем и стиральной машиной','Язык'],
  en: ['Navigation','Explore the apartment','Contact the owner directly','Interior of the ScaleaStay apartment in Scalea','Space to feel at home','Take a look inside','All apartment photos','The sea and everyday essentials, on foot','Your next stay','Plan your stay in Scalea','Send your dates, length of stay and number of guests to receive a quote directly from the owner.','View photos','Answers before you travel','Discover ScaleaStay','Apartment photos and details','Back to the homepage','Separate bedroom with a double bed and window','Your separate bedroom','ScaleaStay bathroom with a shower, washbasin and washing machine','Bathroom with a shower and washing machine','Language'],
  de: ['Navigation','Ferienwohnung ansehen','Direkter Kontakt zum Eigentümer','Innenansicht der Ferienwohnung ScaleaStay in Scalea','Platz zum Wohlfühlen','Ein Blick in die Ferienwohnung','Alle Fotos der Ferienwohnung','Meer und Alltag bequem zu Fuß','Ihr nächster Aufenthalt','Planen Sie Ihren Aufenthalt in Scalea','Senden Sie Reisedaten, Aufenthaltsdauer und Gästezahl. Sie erhalten ein Angebot direkt vom Eigentümer.','Fotos ansehen','Antworten vor Ihrer Reise','ScaleaStay entdecken','Fotos und Informationen zur Ferienwohnung','Zur Startseite','Separates Schlafzimmer mit Doppelbett und Fenster','Ihr separates Schlafzimmer','Badezimmer von ScaleaStay mit Dusche, Waschbecken und Waschmaschine','Badezimmer mit Dusche und Waschmaschine','Sprache'],
  cs: ['Navigace','Prohlédnout apartmán','Kontaktujte přímo majitele','Interiér apartmánu ScaleaStay ve Scalee','Prostor, kde se budete cítit jako doma','Nahlédněte do apartmánu','Všechny fotografie apartmánu','K moři i za nákupy pěšky','Váš příští pobyt','Naplánujte si pobyt ve Scalee','Napište termín, délku pobytu a počet hostů. Nabídku obdržíte přímo od majitele.','Prohlédnout fotografie','Odpovědi před cestou','Objevte ScaleaStay','Fotografie a informace o apartmánu','Zpět na hlavní stránku','Samostatná ložnice s manželskou postelí a oknem','Vaše samostatná ložnice','Koupelna ScaleaStay se sprchou, umyvadlem a pračkou','Koupelna se sprchou a pračkou','Jazyk'],
  pl: ['Nawigacja','Zobacz apartament','Skontaktuj się bezpośrednio z właścicielem','Wnętrze apartamentu ScaleaStay w Scalei','Przestrzeń, w której poczujesz się jak w domu','Zajrzyj do apartamentu','Wszystkie zdjęcia apartamentu','Morze i codzienne zakupy w zasięgu spaceru','Twój kolejny pobyt','Zaplanuj pobyt w Scalei','Napisz termin, długość pobytu i liczbę gości. Otrzymasz ofertę bezpośrednio od właściciela.','Zobacz zdjęcia','Odpowiedzi przed wyjazdem','Poznaj ScaleaStay','Zdjęcia i informacje o apartamencie','Powrót na stronę główną','Oddzielna sypialnia z łóżkiem dwuosobowym i oknem','Twoja oddzielna sypialnia','Łazienka ScaleaStay z prysznicem, umywalką i pralką','Łazienka z prysznicem i pralką','Język'],
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
  const [navigation, apartment, owner, heroAlt, features, photos, allPhotos, nearby, offerEyebrow, offerTitle, offerText, viewPhotos, faq, arrival, details, back, bedroomAlt, bedroomCaption, bathroomAlt, bathroomCaption, languageLabel] = UI[language];
  return { ...TERRACE_PHOTO_COPY[language], navigation, apartment, owner, heroAlt, features, photos, allPhotos, nearby, offerEyebrow, offerTitle, offerText, viewPhotos, faq, arrival, details, back, bedroomAlt, bedroomCaption, bathroomAlt, bathroomCaption, languageLabel };
}
export const LONG_STAY_PAGES = (Object.keys(LONG_STAY_ROUTES) as StayLanguage[]).map(language => ({ language, ...LONG_STAY_ROUTES[language] }));
