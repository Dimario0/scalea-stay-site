const fs = require('fs');
let content = fs.readFileSync('src/components/AIConcierge.tsx', 'utf8');

// Remove geminiService import
content = content.replace("import { getGeminiResponse } from '../services/geminiService';\n", "");

// Define getLocalResponse function
const localResponseCode = `
const getLocalResponse = async (input: string, lang: string): Promise<string> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const lowerInput = input.toLowerCase();

  const isSea = /(море|пляж|купат|sea|beach|swim|coast|mare|spiaggia|bagn|meer|strand|schwimm|moř|pláž|koup)/i.test(lowerInput);
  const isShop = /(магазин|супермаркет|продукт|ед[ау]|interspar|покуш|shop|grocery|food|negozi|supermercat|cib|spes|geschäft|essen|einkauf|obchod|jíd|nákup)/i.test(lowerInput);
  const isParking = /(парковк|машин|паркинг|park|car|garage|parcheggi|auto|macchin|wagen|aut|vůz)/i.test(lowerInput);
  const isAC = /(кондиционер|жарк|ac|air|cool|klima|aria)/i.test(lowerInput);
  const isWiFi = /(wi-fi|wifi|интернет|вайфай|вай-фай|internet|wlan)/i.test(lowerInput);
  const isBooking = /(цен|бронь|бронирова|дат[аы]|свободн|available|price|book|cost|reserv|prezz|prenot|disponibil|tariff|preis|datum|termin|verfügbar|cen|voln|dostupn|kolik)/i.test(lowerInput);

  if (isWiFi) {
    switch (lang) {
      case 'ru': return "По этому вопросу лучше уточнить напрямую у владельца в WhatsApp: https://wa.me/420774620060";
      case 'en': return "For this question, it is best to check directly with the owner on WhatsApp: https://wa.me/420774620060";
      case 'it': return "Per questa domanda è meglio chiedere direttamente al proprietario su WhatsApp: https://wa.me/420774620060";
      case 'de': return "Zu dieser Frage wenden Sie sich am besten direkt an den Eigentümer über WhatsApp: https://wa.me/420774620060";
      case 'cs': return "S tímto dotazem se raději obraťte přímo na majitele na WhatsAppu: https://wa.me/420774620060";
      default: return "For this question, it is best to check directly with the owner on WhatsApp: https://wa.me/420774620060";
    }
  }

  if (isBooking) {
    switch (lang) {
      case 'ru': return "Я не вижу календарь в реальном времени. Напишите владельцу в WhatsApp, чтобы быстро проверить свободные даты и условия бронирования: https://wa.me/420774620060";
      case 'en': return "I do not see the real-time calendar. Please write to the owner on WhatsApp to quickly check available dates and booking conditions: https://wa.me/420774620060";
      case 'it': return "Non vedo il calendario in tempo reale. Scrivi al proprietario su WhatsApp per controllare rapidamente le date disponibili e le condizioni di prenotazione: https://wa.me/420774620060";
      case 'de': return "Ich sehe den Kalender nicht in Echtzeit. Bitte schreiben Sie dem Eigentümer auf WhatsApp, um verfügbare Daten und Buchungsbedingungen schnell zu prüfen: https://wa.me/420774620060";
      case 'cs': return "Nevidím kalendář v reálném čase. Napište prosím majiteli na WhatsApp, abyste rychle ověřili dostupné termíny a podmínky rezervace: https://wa.me/420774620060";
      default: return "I do not see the real-time calendar. Please write to the owner on WhatsApp to quickly check available dates and booking conditions: https://wa.me/420774620060";
    }
  }

  if (isSea) {
    switch (lang) {
      case 'ru': return "До моря примерно 400 м, около 6 минут пешком.";
      case 'en': return "The sea is about 400 meters away, a 6-minute walk.";
      case 'it': return "Il mare si trova a circa 400 metri, 6 minuti a piedi.";
      case 'de': return "Das Meer ist etwa 400 Meter entfernt, 6 Gehminuten.";
      case 'cs': return "Moře je vzdáleno cca 400 metrů, 6 minut chůze.";
      default: return "The sea is about 400 meters away, a 6-minute walk.";
    }
  }

  if (isShop) {
    switch (lang) {
      case 'ru': return "Рядом с апартаментами находится крупный супермаркет Interspar, удобно для ежедневных покупок.";
      case 'en': return "A large Interspar supermarket is nearby, convenient for daily groceries.";
      case 'it': return "Nelle vicinanze si trova un grande supermercato Interspar, comodo per la spesa quotidiana.";
      case 'de': return "Ein großer Interspar-Supermarkt befindet sich in der Nähe, praktisch für tägliche Einkäufe.";
      case 'cs': return "Nedaleko se nachází velký supermarket Interspar, pohodlné pro každodenní nákupy.";
      default: return "A large Interspar supermarket is nearby, convenient for daily groceries.";
    }
  }

  if (isParking) {
    switch (lang) {
      case 'ru': return "Да, для гостей есть парковка.";
      case 'en': return "Yes, there is parking available for guests.";
      case 'it': return "Sì, è disponibile un parcheggio per gli ospiti.";
      case 'de': return "Ja, es gibt Parkplätze für Gäste.";
      case 'cs': return "Ano, pro hosty je k dispozici parkoviště.";
      default: return "Yes, there is parking available for guests.";
    }
  }

  if (isAC) {
    switch (lang) {
      case 'ru': return "Да, в апартаментах есть кондиционер.";
      case 'en': return "Yes, the apartments have air conditioning.";
      case 'it': return "Sì, gli appartamenti sono dotati di aria condizionata.";
      case 'de': return "Ja, die Apartments verfügen über eine Klimaanlage.";
      case 'cs': return "Ano, apartmány mají klimatizaci.";
      default: return "Yes, the apartments have air conditioning.";
    }
  }

  switch (lang) {
    case 'ru': return "Я могу подсказать про расположение, море, парковку, Interspar и отдых в Скалее. Для свободных дат и бронирования лучше написать владельцу в WhatsApp: https://wa.me/420774620060";
    case 'en': return "I can help with information about the location, the sea, parking, Interspar, and holidays in Scalea. For available dates and booking, please write to the owner on WhatsApp: https://wa.me/420774620060";
    case 'it': return "Posso aiutarti con informazioni sulla posizione, il mare, il parcheggio, l'Interspar e le vacanze a Scalea. Per le date disponibili e le prenotazioni, scrivi al proprietario su WhatsApp: https://wa.me/420774620060";
    case 'de': return "Ich kann bei Informationen über Lage, Meer, Parkplätze, Interspar und Urlaub in Scalea helfen. Für verfügbare Daten und Buchungen schreiben Sie bitte dem Eigentümer auf WhatsApp: https://wa.me/420774620060";
    case 'cs': return "Mohu vám poradit ohledně polohy, moře, parkování, Intersparu a dovolené ve Scalei. Pro volné termíny a rezervace napište majiteli na WhatsApp: https://wa.me/420774620060";
    default: return "I can help with information about the location, the sea, parking, Interspar, and holidays in Scalea. For available dates and booking, please write to the owner on WhatsApp: https://wa.me/420774620060";
  }
};

const AIConcierge: React.FC = () => {`;

content = content.replace("const AIConcierge: React.FC = () => {", localResponseCode);

content = content.replace("const response = await getGeminiResponse(`${currentInput} (Please answer in ${language} language)`);", "const response = await getLocalResponse(currentInput, language);");

fs.writeFileSync('src/components/AIConcierge.tsx', content);
