const fs = require('fs');
let content = fs.readFileSync('src/constants.tsx', 'utf8');

const additions = {
  ru: {
    directBookTitle: 'Почему стоит бронировать напрямую',
    directBookItem1: 'Прямая связь с владельцем',
    directBookItem2: 'Без лишней комиссии платформы (Booking/Airbnb)',
    directBookItem3: 'Быстрое уточнение свободных дат в WhatsApp',
    directBookItem4: 'Проверенный объект (мы есть на Booking и Airbnb)',
    directBookItem5: 'Мгновенное подтверждение бронирования',
    heroCtaHint: 'Напишите в WhatsApp — проверим свободные даты'
  },
  en: {
    directBookTitle: 'Why book directly with us',
    directBookItem1: 'Direct contact with the owner',
    directBookItem2: 'No extra platform fees (Booking/Airbnb)',
    directBookItem3: 'Quickly check availability via WhatsApp',
    directBookItem4: 'Verified property (listed on Booking & Airbnb)',
    directBookItem5: 'Instant booking confirmation',
    heroCtaHint: 'Message us on WhatsApp to check availability'
  },
  it: {
    directBookTitle: 'Perché prenotare direttamente',
    directBookItem1: 'Contatto diretto con il proprietario',
    directBookItem2: 'Nessuna commissione extra (Booking/Airbnb)',
    directBookItem3: 'Verifica rapida della disponibilità su WhatsApp',
    directBookItem4: 'Struttura verificata (presente su Booking e Airbnb)',
    directBookItem5: 'Conferma immediata della prenotazione',
    heroCtaHint: 'Scrivici su WhatsApp per verificare la disponibilità'
  },
  de: {
    directBookTitle: 'Warum direkt buchen',
    directBookItem1: 'Direkter Kontakt mit dem Eigentümer',
    directBookItem2: 'Keine zusätzlichen Plattformgebühren (Booking/Airbnb)',
    directBookItem3: 'Schnelle Verfügbarkeitsprüfung über WhatsApp',
    directBookItem4: 'Verifizierte Unterkunft (gelistet auf Booking & Airbnb)',
    directBookItem5: 'Sofortige Buchungsbestätigung',
    heroCtaHint: 'Schreiben Sie uns auf WhatsApp, um die Verfügbarkeit zu prüfen'
  },
  cs: {
    directBookTitle: 'Proč rezervovat přímo',
    directBookItem1: 'Přímý kontakt s majitelem',
    directBookItem2: 'Bez dalších poplatků platformě (Booking/Airbnb)',
    directBookItem3: 'Rychlé ověření dostupnosti přes WhatsApp',
    directBookItem4: 'Ověřené ubytování (jsme na Booking a Airbnb)',
    directBookItem5: 'Okamžité potvrzení rezervace',
    heroCtaHint: 'Napište nám na WhatsApp a ověřte dostupnost'
  }
};

for (const [lang, strings] of Object.entries(additions)) {
  const regex = new RegExp(`(${lang}:\\s*{[\\s\\S]*?)(?=,\\n\\s*[a-z]{2}:\\s*{|\\n\\s*};)`, 'g');
  content = content.replace(regex, (match, p1) => {
    let newProps = '';
    for (const [key, value] of Object.entries(strings)) {
      newProps += `\n    ${key}: '${value}',`;
    }
    return p1 + newProps;
  });
}

// Modify FAQ 6 and 7
content = content.replace(/faqQ6:\s*'.*?',/g, "faqQ6: 'Как проверить свободные даты?',");
content = content.replace(/faqA6:\s*'.*?',/g, "faqA6: 'Вы можете просто написать нам в WhatsApp — мы быстро ответим, свободны ли апартаменты на ваши даты.',");

// Add faq 7 to all languages
const faq7 = {
  ru: { faqQ7: 'Подходит ли квартира для семейного отдыха?', faqA7: 'Да, апартаменты отлично подходят для семей. Мы позаботились о том, чтобы у вас было всё необходимое для комфортного проживания с детьми.' },
  en: { faqQ7: 'Is the apartment suitable for a family vacation?', faqA7: 'Yes, the apartments are perfect for families. We made sure you have everything you need for a comfortable stay with children.' },
  it: { faqQ7: 'L\'appartamento è adatto per una vacanza in famiglia?', faqA7: 'Sì, gli appartamenti sono perfetti per le famiglie. Ci siamo assicurati che abbiate tutto il necessario per un soggiorno confortevole con i bambini.' },
  de: { faqQ7: 'Ist die Wohnung für einen Familienurlaub geeignet?', faqA7: 'Ja, die Wohnungen sind perfekt für Familien. Wir haben dafür gesorgt, dass Sie alles haben, was Sie für einen angenehmen Aufenthalt mit Kindern benötigen.' },
  cs: { faqQ7: 'Je apartmán vhodný pro rodinnou dovolenou?', faqA7: 'Ano, apartmány jsou ideální pro rodiny. Postarali jsme se o to, abyste měli vše, co potřebujete pro pohodlný pobyt s dětmi.' }
};

for (const [lang, strings] of Object.entries(faq7)) {
  const regex = new RegExp(`(${lang}:\\s*{[\\s\\S]*?faqA6:\\s*'.*?',)`, 'g');
  content = content.replace(regex, (match, p1) => {
    return p1 + `\n    faqQ7: '${strings.faqQ7}',\n    faqA7: '${strings.faqA7}',`;
  });
}

// Update other languages for faqQ6
content = content.replace(/'Why choose a vacation in Scalea on the Riviera dei Cedri\?'/g, "'How to check available dates?'");
content = content.replace(/'Scalea offers a unique combination of clean sea, historical sights, and affordable rental prices in Italy\.'/g, "'You can simply message us on WhatsApp – we will quickly reply if the apartments are available for your dates.'");

content = content.replace(/'Perché scegliere una vacanza a Scalea sulla Riviera dei Cedri\?'/g, "'Come verificare le date disponibili?'");
content = content.replace(/'Scalea offre una combinazione unica di mare pulito, attrazioni storiche e prezzi di affitto convenienti in Italia\.'/g, "'Puoi semplicemente scriverci su WhatsApp: ti risponderemo rapidamente se gli appartamenti sono disponibili per le tue date.'");

content = content.replace(/'Warum einen Urlaub in Scalea an der Riviera dei Cedri wählen\?'/g, "'Wie kann man verfügbare Daten prüfen?'");
content = content.replace(/'Scalea bietet eine einzigartige Kombination aus sauberem Meer, historischen Sehenswürdigkeiten und erschwinglichen Mietpreisen in Italien\.'/g, "'Schreiben Sie uns einfach auf WhatsApp – wir antworten schnell, ob die Apartments für Ihre Daten verfügbar sind.'");

content = content.replace(/'Proč si vybrat dovolenou ve Scalee na Riviera dei Cedri\?'/g, "'Jak ověřit volné termíny?'");
content = content.replace(/'Scalea nabízí jedinečnou kombinaci čistého moře, historických památek a cenově dostupného pronájmu v Itálii\.'/g, "'Můžete nám jednoduše napsat na WhatsApp – rychle vám odpovíme, zda jsou apartmány pro vaše termíny volné.'");

fs.writeFileSync('src/constants.tsx', content);
