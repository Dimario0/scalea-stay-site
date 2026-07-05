const fs = require('fs');
const files = [
  'src/constants.tsx',
  'src/App.tsx',
  'src/components/FAQ.tsx',
  'src/components/Hero.tsx',
  'src/components/AdminPanel.tsx',
  'src/components/Navbar.tsx',
  'src/components/JSONLD.tsx'
];

let changedFiles = [];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;
    
    // regex to replace 300 followed by distance units
    content = content.replace(/300\s*(м|m|meters|metres|metri|Meter)\b/gi, (match, p1) => {
      return `400 ${p1.trim()}`;
    });
    content = content.replace(/300м/gi, '400 м');
    content = content.replace(/300m/gi, '400m');
    content = content.replace(/300\s*метров/gi, '400 метров');
    
    if (content !== originalContent) {
      fs.writeFileSync(file, content);
      changedFiles.push(file);
    }
  }
});

console.log("Changed files:", changedFiles);
