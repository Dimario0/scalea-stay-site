const fs = require('fs');
let content = fs.readFileSync('src/constants.tsx', 'utf8');

content = content.replace(/heroCtaHint: 'Napište nám na WhatsApp a ověřte dostupnost',\n};/g, "heroCtaHint: 'Napište nám na WhatsApp a ověřte dostupnost',\n  }\n};");

fs.writeFileSync('src/constants.tsx', content);
