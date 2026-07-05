const fs = require('fs');
let content = fs.readFileSync('src/constants.tsx', 'utf8');

const ruInsertion = `    advParkingDesc: 'Ваш автомобиль будет в безопасности на нашей частной парковке.',
    advSupermarket: 'Супермаркет Interspar',
    advSupermarketDesc: 'Крупный супермаркет Interspar рядом — удобно для ежедневных покупок во время отдыха.',`;
content = content.replace("    advParkingDesc: 'Ваш автомобиль будет в безопасности на нашей частной парковке.',", ruInsertion);

const ruFaqInsertion = `    faqQ7: 'Подходит ли квартира для семейного отдыха?',
    faqA7: 'Да, апартаменты отлично подходят для семей. Мы позаботились о том, чтобы у вас было всё необходимое для комфортного проживания с детьми.',
    faqQ8: 'Есть ли рядом магазины?',
    faqA8: 'Да, рядом с апартаментами находится крупный супермаркет Interspar, удобно для ежедневных покупок во время отдыха.',`;
content = content.replace("    faqA7: 'Да, апартаменты отлично подходят для семей. Мы позаботились о том, чтобы у вас было всё необходимое для комфортного проживания с детьми.',", ruFaqInsertion.replace("    faqQ7: 'Подходит ли квартира для семейного отдыха?',\n", ""));


const enInsertion = `    advParkingDesc: 'Your car will be safe in our private parking lot.',
    advSupermarket: 'Interspar Supermarket',
    advSupermarketDesc: 'A large Interspar supermarket is nearby — convenient for daily groceries during your stay.',`;
content = content.replace("    advParkingDesc: 'Your car will be safe in our private parking lot.',", enInsertion);

const enFaqInsertion = `    faqQ7: 'Is the apartment suitable for family vacations?',
    faqA7: 'Yes, the apartments are perfect for families. We have made sure you have everything you need for a comfortable stay with children.',
    faqQ8: 'Are there shops nearby?',
    faqA8: 'Yes, a large Interspar supermarket is nearby, convenient for daily groceries during your stay.',`;
content = content.replace("    faqA7: 'Yes, the apartments are perfect for families. We have made sure you have everything you need for a comfortable stay with children.',", enFaqInsertion.replace("    faqQ7: 'Is the apartment suitable for family vacations?',\n", ""));

const itInsertion = `    advParkingDesc: 'La tua auto sarà al sicuro nel nostro parcheggio privato.',
    advSupermarket: 'Supermercato Interspar',
    advSupermarketDesc: 'Un grande supermercato Interspar si trova nelle vicinanze — comodo per la spesa quotidiana durante il soggiorno.',`;
content = content.replace("    advParkingDesc: 'La tua auto sarà al sicuro nel nostro parcheggio privato.',", itInsertion);

const itFaqInsertion = `    faqQ7: 'L\\'appartamento è adatto per vacanze in famiglia?',
    faqA7: 'Sì, gli appartamenti sono perfetti per le famiglie. Ci siamo assicurati che tu abbia tutto il necessario per un soggiorno confortevole con i bambini.',
    faqQ8: 'Ci sono negozi nelle vicinanze?',
    faqA8: 'Sì, nelle vicinanze si trova un grande supermercato Interspar, comodo per la spesa quotidiana durante il soggiorno.',`;
content = content.replace("    faqA7: 'Sì, gli appartamenti sono perfetti per le famiglie. Ci siamo assicurati che tu abbia tutto il necessario per un soggiorno confortevole con i bambini.',", itFaqInsertion.replace("    faqQ7: 'L\\'appartamento è adatto per vacanze in famiglia?',\n", ""));

const deInsertion = `    advParkingDesc: 'Ihr Auto steht sicher auf unserem Privatparkplatz.',
    advSupermarket: 'Interspar Supermarkt',
    advSupermarketDesc: 'Ein großer Interspar-Supermarkt befindet sich in der Nähe — praktisch für tägliche Einkäufe während des Aufenthalts.',`;
content = content.replace("    advParkingDesc: 'Ihr Auto steht sicher auf unserem Privatparkplatz.',", deInsertion);

const deFaqInsertion = `    faqQ7: 'Ist die Wohnung für einen Familienurlaub geeignet?',
    faqA7: 'Ja, die Apartments sind ideal für Familien. Wir haben dafür gesorgt, dass Sie alles haben, was Sie für einen komfortablen Aufenthalt mit Kindern benötigen.',
    faqQ8: 'Gibt es Geschäfte in der Nähe?',
    faqA8: 'Ja, ein großer Interspar-Supermarkt befindet sich in der Nähe, praktisch für tägliche Einkäufe während des Aufenthalts.',`;
content = content.replace("    faqA7: 'Ja, die Apartments sind ideal für Familien. Wir haben dafür gesorgt, dass Sie alles haben, was Sie für einen komfortablen Aufenthalt mit Kindern benötigen.',", deFaqInsertion.replace("    faqQ7: 'Ist die Wohnung für einen Familienurlaub geeignet?',\n", ""));

const csInsertion = `    advParkingDesc: 'Vaše auto bude v bezpečí na našem soukromém parkovišti.',
    advSupermarket: 'Supermarket Interspar',
    advSupermarketDesc: 'Velký supermarket Interspar je nedaleko — pohodlné pro každodenní nákupy během pobytu.',`;
content = content.replace("    advParkingDesc: 'Vaše auto bude v bezpečí na našem soukromém parkovišti.',", csInsertion);

const csFaqInsertion = `    faqQ7: 'Je apartmán vhodný pro rodinnou dovolenou?',
    faqA7: 'Ano, apartmány jsou skvělé pro rodiny. Postarali jsme se o to, abyste měli vše potřebné pro pohodlný pobyt s dětmi.',
    faqQ8: 'Jsou v okolí obchody?',
    faqA8: 'Ano, nedaleko apartmánů je velký supermarket Interspar, pohodlný pro každodenní nákupy během pobytu.',`;
content = content.replace("    faqA7: 'Ano, apartmány jsou skvělé pro rodiny. Postarali jsme se o to, abyste měli vše potřebné pro pohodlný pobyt s dětmi.',", csFaqInsertion.replace("    faqQ7: 'Je apartmán vhodný pro rodinnou dovolenou?',\n", ""));

fs.writeFileSync('src/constants.tsx', content);
