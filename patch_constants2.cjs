const fs = require('fs');
let content = fs.readFileSync('src/constants.tsx', 'utf8');

const translations = {
  ru: `    taTitle: 'Кому подойдут наши апартаменты',\n    taItem1: 'Семьям, которые хотят отдыхать рядом с морем и жить в спокойной квартире.',\n    taItem2: 'Гостям, которые приезжают в Калабрию на машине и хотят иметь парковку.',\n    taItem3: 'Тем, кому важно жить в центре Скалеи, рядом с магазинами и прогулочными местами.',\n    taItem4: 'Тем, кто хочет быстро покупать продукты рядом — крупный Interspar находится недалеко.',\n    taItem5: 'Тем, кто хочет уточнить свободные даты напрямую через WhatsApp.',`,
  en: `    taTitle: 'Who our apartments are ideal for',\n    taItem1: 'Families who want to stay close to the sea in a comfortable apartment.',\n    taItem2: 'Guests travelling to Calabria by car who need parking.',\n    taItem3: 'Travellers who want to stay in the centre of Scalea, close to shops and walking areas.',\n    taItem4: 'Guests who want easy daily groceries — a large Interspar supermarket is nearby.',\n    taItem5: 'Guests who prefer to check availability directly via WhatsApp.',`,
  it: `    taTitle: 'Per chi sono ideali i nostri appartamenti',\n    taItem1: 'Famiglie che vogliono soggiornare vicino al mare in un appartamento confortevole.',\n    taItem2: 'Ospiti che arrivano in Calabria in auto e hanno bisogno di parcheggio.',\n    taItem3: 'Viaggiatori che vogliono soggiornare nel centro di Scalea, vicino a negozi e zone per passeggiare.',\n    taItem4: 'Ospiti che vogliono fare la spesa facilmente ogni giorno — un grande supermercato Interspar è nelle vicinanze.',\n    taItem5: 'Ospiti che preferiscono verificare la disponibilità direttamente su WhatsApp.',`,
  de: `    taTitle: 'Für wen unsere Apartments ideal sind',\n    taItem1: 'Für Familien, die nah am Meer in einem komfortablen Apartment wohnen möchten.',\n    taItem2: 'Für Gäste, die mit dem Auto nach Kalabrien reisen und Parkmöglichkeiten benötigen.',\n    taItem3: 'Für Reisende, die im Zentrum von Scalea wohnen möchten, in der Nähe von Geschäften und Spazierwegen.',\n    taItem4: 'Für Gäste, die bequem einkaufen möchten — ein großer Interspar-Supermarkt befindet sich in der Nähe.',\n    taItem5: 'Für Gäste, die die Verfügbarkeit direkt über WhatsApp prüfen möchten.',`,
  cs: `    taTitle: 'Pro koho jsou naše apartmány ideální',\n    taItem1: 'Pro rodiny, které chtějí bydlet blízko moře v pohodlném apartmánu.',\n    taItem2: 'Pro hosty, kteří přijíždějí do Kalábrie autem a potřebují parkování.',\n    taItem3: 'Pro cestovatele, kteří chtějí bydlet v centru Scalei, blízko obchodů a míst na procházky.',\n    taItem4: 'Pro hosty, kteří chtějí pohodlně nakupovat potraviny — velký supermarket Interspar je nedaleko.',\n    taItem5: 'Pro hosty, kteří chtějí ověřit dostupnost přímo přes WhatsApp.',`
};

Object.keys(translations).forEach(lang => {
  content = content.replace(new RegExp(`  ${lang}: \\{`), `  ${lang}: {\n${translations[lang]}`);
});

fs.writeFileSync('src/constants.tsx', content);
console.log('Constants fixed');
