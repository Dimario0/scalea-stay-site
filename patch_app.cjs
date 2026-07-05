const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add import
const importTargetAudience = "import TargetAudience from './components/TargetAudience';\n";
content = content.replace("import Advantages from './components/Advantages';", importTargetAudience + "import Advantages from './components/Advantages';");

// Add component
const targetAudienceComponent = "        {/* Target Audience Section */}\n        <TargetAudience />\n";
content = content.replace("        {/* Direct Booking Benefits */}", targetAudienceComponent + "\n        {/* Direct Booking Benefits */}");

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx updated');
