const fs = require('fs');
let content = fs.readFileSync('src/components/AIConcierge.tsx', 'utf8');

// Replace isWiFi strings
content = content.replace(/case 'ru': return "По этому вопросу лучше уточнить напрямую у владельца в WhatsApp: https:\/\/wa\.me\/420774620060";/g, 'case \'ru\': return "По этому вопросу лучше уточнить напрямую у владельца в WhatsApp. https://wa.me/420774620060";');
content = content.replace(/case 'en': return "For this question, it is best to check directly with the owner on WhatsApp: https:\/\/wa\.me\/420774620060";/g, 'case \'en\': return "For this question, it is best to check directly with the owner on WhatsApp. https://wa.me/420774620060";');
content = content.replace(/case 'it': return "Per questa domanda è meglio chiedere direttamente al proprietario su WhatsApp: https:\/\/wa\.me\/420774620060";/g, 'case \'it\': return "Per questa domanda è meglio chiedere direttamente al proprietario su WhatsApp. https://wa.me/420774620060";');
content = content.replace(/case 'de': return "Zu dieser Frage wenden Sie sich am besten direkt an den Eigentümer über WhatsApp: https:\/\/wa\.me\/420774620060";/g, 'case \'de\': return "Zu dieser Frage wenden Sie sich am besten direkt an den Eigentümer über WhatsApp. https://wa.me/420774620060";');
content = content.replace(/case 'cs': return "S tímto dotazem se raději obraťte přímo na majitele na WhatsAppu: https:\/\/wa\.me\/420774620060";/g, 'case \'cs\': return "S tímto dotazem se raději obraťte přímo na majitele na WhatsAppu. https://wa.me/420774620060";');
content = content.replace(/default: return "For this question, it is best to check directly with the owner on WhatsApp: https:\/\/wa\.me\/420774620060";/g, 'default: return "For this question, it is best to check directly with the owner on WhatsApp. https://wa.me/420774620060";');

// Replace isBooking strings
content = content.replace(/case 'ru': return "Я не вижу календарь в реальном времени. Напишите владельцу в WhatsApp, чтобы быстро проверить свободные даты и условия бронирования: https:\/\/wa\.me\/420774620060";/g, 'case \'ru\': return "Я не вижу календарь в реальном времени. Напишите владельцу в WhatsApp — он быстро проверит свободные даты и условия бронирования. https://wa.me/420774620060";');
content = content.replace(/case 'en': return "I do not see the real-time calendar. Please write to the owner on WhatsApp to quickly check available dates and booking conditions: https:\/\/wa\.me\/420774620060";/g, 'case \'en\': return "I cannot see the live calendar. Message the owner on WhatsApp to quickly check availability and booking conditions. https://wa.me/420774620060";');
content = content.replace(/case 'it': return "Non vedo il calendario in tempo reale. Scrivi al proprietario su WhatsApp per controllare rapidamente le date disponibili e le condizioni di prenotazione: https:\/\/wa\.me\/420774620060";/g, 'case \'it\': return "Non vedo il calendario in tempo reale. Scrivi al proprietario su WhatsApp per verificare rapidamente disponibilità e condizioni di prenotazione. https://wa.me/420774620060";');
content = content.replace(/case 'de': return "Ich sehe den Kalender nicht in Echtzeit. Bitte schreiben Sie dem Eigentümer auf WhatsApp, um verfügbare Daten und Buchungsbedingungen schnell zu prüfen: https:\/\/wa\.me\/420774620060";/g, 'case \'de\': return "Ich kann den Kalender nicht in Echtzeit sehen. Schreiben Sie dem Eigentümer auf WhatsApp, um freie Termine und Buchungsbedingungen schnell zu prüfen. https://wa.me/420774620060";');
content = content.replace(/case 'cs': return "Nevidím kalendář v reálném čase. Napište prosím majiteli na WhatsApp, abyste rychle ověřili dostupné termíny a podmínky rezervace: https:\/\/wa\.me\/420774620060";/g, 'case \'cs\': return "Nevidím kalendář v reálném čase. Napište majiteli na WhatsApp a rychle ověříte dostupnost a podmínky rezervace. https://wa.me/420774620060";');
content = content.replace(/default: return "I do not see the real-time calendar. Please write to the owner on WhatsApp to quickly check available dates and booking conditions: https:\/\/wa\.me\/420774620060";/g, 'default: return "I cannot see the live calendar. Message the owner on WhatsApp to quickly check availability and booking conditions. https://wa.me/420774620060";');

// Replace default strings
content = content.replace(/case 'ru': return "Я могу подсказать про расположение, море, парковку, Interspar и отдых в Скалее. Для свободных дат и бронирования лучше написать владельцу в WhatsApp: https:\/\/wa\.me\/420774620060";/g, 'case \'ru\': return "Я могу подсказать про расположение, море, парковку, Interspar и отдых в Скалее. Для свободных дат и бронирования лучше написать владельцу в WhatsApp. https://wa.me/420774620060";');
content = content.replace(/case 'en': return "I can help with information about the location, the sea, parking, Interspar, and holidays in Scalea. For available dates and booking, please write to the owner on WhatsApp: https:\/\/wa\.me\/420774620060";/g, 'case \'en\': return "I can help with information about the location, the sea, parking, Interspar, and holidays in Scalea. For available dates and booking, please write to the owner on WhatsApp. https://wa.me/420774620060";');
content = content.replace(/case 'it': return "Posso aiutarti con informazioni sulla posizione, il mare, il parcheggio, l'Interspar e le vacanze a Scalea. Per le date disponibili e le prenotazioni, scrivi al proprietario su WhatsApp: https:\/\/wa\.me\/420774620060";/g, 'case \'it\': return "Posso aiutarti con informazioni sulla posizione, il mare, il parcheggio, l\'Interspar e le vacanze a Scalea. Per le date disponibili e le prenotazioni, scrivi al proprietario su WhatsApp. https://wa.me/420774620060";');
content = content.replace(/case 'de': return "Ich kann bei Informationen über Lage, Meer, Parkplätze, Interspar und Urlaub in Scalea helfen. Für verfügbare Daten und Buchungen schreiben Sie bitte dem Eigentümer auf WhatsApp: https:\/\/wa\.me\/420774620060";/g, 'case \'de\': return "Ich kann bei Informationen über Lage, Meer, Parkplätze, Interspar und Urlaub in Scalea helfen. Für verfügbare Daten und Buchungen schreiben Sie bitte dem Eigentümer auf WhatsApp. https://wa.me/420774620060";');
content = content.replace(/case 'cs': return "Mohu vám poradit ohledně polohy, moře, parkování, Intersparu a dovolené ve Scalei. Pro volné termíny a rezervace napište majiteli na WhatsApp: https:\/\/wa\.me\/420774620060";/g, 'case \'cs\': return "Mohu vám poradit ohledně polohy, moře, parkování, Intersparu a dovolené ve Scalei. Pro volné termíny a rezervace napište majiteli na WhatsApp. https://wa.me/420774620060";');
content = content.replace(/default: return "I can help with information about the location, the sea, parking, Interspar, and holidays in Scalea. For available dates and booking, please write to the owner on WhatsApp: https:\/\/wa\.me\/420774620060";/g, 'default: return "I can help with information about the location, the sea, parking, Interspar, and holidays in Scalea. For available dates and booking, please write to the owner on WhatsApp. https://wa.me/420774620060";');

// Render message content logic
const renderMessageReplacement = `  const getWhatsAppButtonText = () => {
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
  };`;

const renderMessageOriginal = `  const renderMessageContent = (content: string, isUser: boolean) => {
    const urlRegex = /(https?:\\/\\/[^\\s]+)/g;
    const parts = content.split(urlRegex);
    
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={i} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={\`underline font-medium break-all \${isUser ? 'text-white hover:text-indigo-100' : 'text-indigo-600 hover:text-indigo-800'}\`}
            onClick={() => {
              if (part.includes('wa.me') || part.includes('whatsapp')) {
                trackEvent('ai_concierge_to_whatsapp', { page_path: window.location.pathname });
              }
            }}
          >
            {part}
          </a>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };`;

if (content.includes("const renderMessageContent = (content: string, isUser: boolean) => {")) {
  const startIndex = content.indexOf("const renderMessageContent = (content: string, isUser: boolean) => {");
  const endIndex = content.indexOf("  return (", startIndex);
  if (startIndex !== -1 && endIndex !== -1) {
    content = content.substring(0, startIndex) + renderMessageReplacement + "\n\n" + content.substring(endIndex);
  }
}

fs.writeFileSync('src/components/AIConcierge.tsx', content);
console.log('Done');
