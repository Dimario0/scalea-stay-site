const fs = require('fs');
let content = fs.readFileSync('src/components/AIConcierge.tsx', 'utf8');

// The file currently has two `const renderMessageContent` functions or a messed up structure.
// Let's strip out EVERYTHING between `const getWhatsAppButtonText` and `<div className="fixed bottom-6 right-6 z-[100] font-sans">` and put the correct code.

const startRegex = /const getWhatsAppButtonText = \(\) => \{/;
const endText = `  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">`;

const match = startRegex.exec(content);
const endIndex = content.indexOf(endText);

if (match && endIndex !== -1) {
  const replacement = `  const getWhatsAppButtonText = () => {
    switch (language) {
      case 'ru': return 'Написать в WhatsApp';
      case 'en': return 'Message on WhatsApp';
      case 'it': return 'Scrivi su WhatsApp';
      case 'de': return 'Auf WhatsApp schreiben';
      case 'cs': return 'Napsat na WhatsApp';
      default: return 'Message on WhatsApp';
    }
  };

  const renderMessageContent = (content: string, isUser: boolean) => {
    const urlRegex = /(https?:\\/\\/[^\\s]+)/g;
    const parts = content.split(urlRegex);
    
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        if (part.includes('wa.me') || part.includes('whatsapp')) {
          return (
            <a 
              key={i} 
              href={part} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={\`mt-3 flex items-center justify-center space-x-2 w-full text-center py-2.5 px-4 rounded-xl font-bold transition-all shadow-sm \${isUser ? 'bg-white text-indigo-600 hover:bg-indigo-50' : 'bg-emerald-500 text-white hover:bg-emerald-600'}\`}
              onClick={() => {
                trackEvent('ai_concierge_to_whatsapp', { 
                  page_path: window.location.pathname,
                  language: language
                });
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              <span>{getWhatsAppButtonText()}</span>
            </a>
          );
        }
        return (
          <a 
            key={i} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={\`underline font-medium break-all \${isUser ? 'text-white hover:text-indigo-100' : 'text-indigo-600 hover:text-indigo-800'}\`}
          >
            {part}
          </a>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

`;

  content = content.substring(0, match.index) + replacement + content.substring(endIndex);
  fs.writeFileSync('src/components/AIConcierge.tsx', content);
  console.log("Fixed");
} else {
  console.log("Could not find boundaries");
}
