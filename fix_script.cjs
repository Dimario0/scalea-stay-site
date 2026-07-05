const fs = require('fs');
let content = fs.readFileSync('src/constants.tsx', 'utf8');

content = content.replace(/heroCtaHint: '(.*?)',,\n/g, "heroCtaHint: '$1',\n  },\n");

fs.writeFileSync('src/constants.tsx', content);
