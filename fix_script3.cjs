const fs = require('fs');
let content = fs.readFileSync('src/constants.tsx', 'utf8');

content = content.replace(/faqQ7: 'L'appartamento/g, 'faqQ7: "L\'appartamento');
content = content.replace(/in famiglia\?',/g, 'in famiglia?",');

fs.writeFileSync('src/constants.tsx', content);
