const fs = require('fs');
let content = fs.readFileSync('src/constants.tsx', 'utf8');

// The messed up part looks like:
//   }
//     directBookTitle: 'Почему стоит бронировать напрямую',
// ...
//     heroCtaHint: 'Напишите в WhatsApp — проверим свободные даты',,

content = content.replace(/  }\n    directBookTitle/g, "    directBookTitle");
content = content.replace(/heroCtaHint: 'Напишите в WhatsApp — проверим свободные даты',\n,\n  en: {/g, "heroCtaHint: 'Напишите в WhatsApp — проверим свободные даты',\n  },\n  en: {");

// Wait, the error is in multiple languages. It's better to just manually replace the messed up parts.
