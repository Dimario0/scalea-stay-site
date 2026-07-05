
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../analytics';
import { motion, AnimatePresence } from 'motion/react';


const getLocalResponse = async (input: string, lang: string): Promise<string> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const lowerInput = input.toLowerCase();

  const isSea = /(море|пляж|купат|sea|beach|swim|coast|mare|spiaggia|bagn|meer|strand|schwimm|moř|pláž|koup)/i.test(lowerInput);
  const isShop = /(магазин|супермаркет|продукт|ед[ау]|interspar|покуш|shop|grocery|food|negozi|supermercat|cib|spes|geschäft|essen|einkauf|obchod|jíd|nákup)/i.test(lowerInput);
  const isParking = /(парковк|машин|паркинг|park|car|garage|parcheggi|auto|macchin|wagen|aut|vůz)/i.test(lowerInput);
  const isAC = /(кондиционер|жарк|ac|air|cool|klima|aria)/i.test(lowerInput);
  const isWiFi = /(wi-fi|wifi|интернет|вайфай|вай-фай|internet|wlan)/i.test(lowerInput);
  const isBooking = /(цен|бронь|бронирова|дат[аы]|свободн|available|price|book|cost|reserv|prezz|prenot|disponibil|tariff|preis|datum|termin|verfügbar|cen|voln|dostupn|kolik)/i.test(lowerInput);

  if (isWiFi) {
    switch (lang) {
      case 'ru': return "По этому вопросу лучше уточнить напрямую у владельца в WhatsApp. https://wa.me/420774620060";
      case 'en': return "For this question, it is best to check directly with the owner on WhatsApp. https://wa.me/420774620060";
      case 'it': return "Per questa domanda è meglio chiedere direttamente al proprietario su WhatsApp. https://wa.me/420774620060";
      case 'de': return "Zu dieser Frage wenden Sie sich am besten direkt an den Eigentümer über WhatsApp. https://wa.me/420774620060";
      case 'cs': return "S tímto dotazem se raději obraťte přímo na majitele na WhatsAppu. https://wa.me/420774620060";
      default: return "For this question, it is best to check directly with the owner on WhatsApp. https://wa.me/420774620060";
    }
  }

  if (isBooking) {
    switch (lang) {
      case 'ru': return "Я не вижу календарь в реальном времени. Напишите владельцу в WhatsApp — он быстро проверит свободные даты и условия бронирования. https://wa.me/420774620060";
      case 'en': return "I cannot see the live calendar. Message the owner on WhatsApp to quickly check availability and booking conditions. https://wa.me/420774620060";
      case 'it': return "Non vedo il calendario in tempo reale. Scrivi al proprietario su WhatsApp per verificare rapidamente disponibilità e condizioni di prenotazione. https://wa.me/420774620060";
      case 'de': return "Ich kann den Kalender nicht in Echtzeit sehen. Schreiben Sie dem Eigentümer auf WhatsApp, um freie Termine und Buchungsbedingungen schnell zu prüfen. https://wa.me/420774620060";
      case 'cs': return "Nevidím kalendář v reálném čase. Napište majiteli na WhatsApp a rychle ověříte dostupnost a podmínky rezervace. https://wa.me/420774620060";
      default: return "I cannot see the live calendar. Message the owner on WhatsApp to quickly check availability and booking conditions. https://wa.me/420774620060";
    }
  }

  if (isSea) {
    switch (lang) {
      case 'ru': return "До моря примерно 400 м, около 6 минут пешком.";
      case 'en': return "The sea is about 400 meters away, a 6-minute walk.";
      case 'it': return "Il mare si trova a circa 400 metri, 6 minuti a piedi.";
      case 'de': return "Das Meer ist etwa 400 Meter entfernt, 6 Gehminuten.";
      case 'cs': return "Moře je vzdáleno cca 400 metrů, 6 minut chůze.";
      default: return "The sea is about 400 meters away, a 6-minute walk.";
    }
  }

  if (isShop) {
    switch (lang) {
      case 'ru': return "Рядом с апартаментами находится крупный супермаркет Interspar, удобно для ежедневных покупок.";
      case 'en': return "A large Interspar supermarket is nearby, convenient for daily groceries.";
      case 'it': return "Nelle vicinanze si trova un grande supermercato Interspar, comodo per la spesa quotidiana.";
      case 'de': return "Ein großer Interspar-Supermarkt befindet sich in der Nähe, praktisch für tägliche Einkäufe.";
      case 'cs': return "Nedaleko se nachází velký supermarket Interspar, pohodlné pro každodenní nákupy.";
      default: return "A large Interspar supermarket is nearby, convenient for daily groceries.";
    }
  }

  if (isParking) {
    switch (lang) {
      case 'ru': return "Да, для гостей есть парковка.";
      case 'en': return "Yes, there is parking available for guests.";
      case 'it': return "Sì, è disponibile un parcheggio per gli ospiti.";
      case 'de': return "Ja, es gibt Parkplätze für Gäste.";
      case 'cs': return "Ano, pro hosty je k dispozici parkoviště.";
      default: return "Yes, there is parking available for guests.";
    }
  }

  if (isAC) {
    switch (lang) {
      case 'ru': return "Да, в апартаментах есть кондиционер.";
      case 'en': return "Yes, the apartments have air conditioning.";
      case 'it': return "Sì, gli appartamenti sono dotati di aria condizionata.";
      case 'de': return "Ja, die Apartments verfügen über eine Klimaanlage.";
      case 'cs': return "Ano, apartmány mají klimatizaci.";
      default: return "Yes, the apartments have air conditioning.";
    }
  }

  switch (lang) {
    case 'ru': return "Я могу подсказать про расположение, море, парковку, Interspar и отдых в Скалее. Для свободных дат и бронирования лучше написать владельцу в WhatsApp. https://wa.me/420774620060";
    case 'en': return "I can help with information about the location, the sea, parking, Interspar, and holidays in Scalea. For available dates and booking, please write to the owner on WhatsApp. https://wa.me/420774620060";
    case 'it': return "Posso aiutarti con informazioni sulla posizione, il mare, il parcheggio, l'Interspar e le vacanze a Scalea. Per le date disponibili e le prenotazioni, scrivi al proprietario su WhatsApp. https://wa.me/420774620060";
    case 'de': return "Ich kann bei Informationen über Lage, Meer, Parkplätze, Interspar und Urlaub in Scalea helfen. Für verfügbare Daten und Buchungen schreiben Sie bitte dem Eigentümer auf WhatsApp. https://wa.me/420774620060";
    case 'cs': return "Mohu vám poradit ohledně polohy, moře, parkování, Intersparu a dovolené ve Scalei. Pro volné termíny a rezervace napište majiteli na WhatsApp. https://wa.me/420774620060";
    default: return "I can help with information about the location, the sea, parking, Interspar, and holidays in Scalea. For available dates and booking, please write to the owner on WhatsApp. https://wa.me/420774620060";
  }
};

const AIConcierge: React.FC = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      { role: 'assistant', content: t('aiGreeting') }
    ]);
  }, [language]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timer);
    }
  }, [messages, isOpen, isTyping]);

  const toggleChat = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState) {
      trackEvent('ai_concierge_open', { page_path: window.location.pathname });
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const currentInput = input;
    
    trackEvent('ai_concierge_message', { 
      page_path: window.location.pathname, 
      language: language, 
      message_length: currentInput.length 
    });

    const userMsg: ChatMessage = { role: 'user', content: currentInput };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const response = await getLocalResponse(currentInput, language);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
  };

      const getWhatsAppButtonText = () => {
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
    const urlRegex = /(https?:\/\/[^\s]+)/g;
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
              className={`mt-3 flex items-center justify-center space-x-2 w-full text-center py-2.5 px-4 rounded-xl font-bold transition-all shadow-sm ${isUser ? 'bg-white text-indigo-600 hover:bg-indigo-50' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}
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
            className={`underline font-medium break-all ${isUser ? 'text-white hover:text-indigo-100' : 'text-indigo-600 hover:text-indigo-800'}`}
          >
            {part}
          </a>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white w-[calc(100vw-2rem)] sm:w-[400px] h-[500px] sm:h-[550px] max-h-[80vh] rounded-[40px] shadow-[0_40px_80px_rgba(0,0,0,0.2)] flex flex-col border border-slate-100 overflow-hidden mb-4 transform origin-bottom-right max-w-full"
          >
          <div className="p-6 bg-white border-b border-slate-50 flex justify-between items-center shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                ✨
              </div>
              <div>
                <p className="text-sm font-black text-slate-900">{t('aiAssistant')}</p>
                <div className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{t('online')}</p>
                </div>
              </div>
            </div>
            <button 
              onClick={toggleChat} 
              className="p-2 rounded-xl hover:bg-slate-50 transition-colors group"
              aria-label="Close chat"
            >
              <svg className="w-6 h-6 text-slate-400 group-hover:text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-md' 
                    : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                }`}>
                  {renderMessageContent(m.content, m.role === 'user')}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100 rounded-tl-none flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-slate-50 flex space-x-2 shrink-0">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t('aiPlaceholder')}
              className="flex-1 bg-slate-50 border-none rounded-2xl px-5 py-3 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={isTyping}
              aria-label="Send message"
              className="bg-indigo-600 text-white p-3 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <button 
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open chat with assistant"}
        className="bg-indigo-600 text-white w-16 h-16 rounded-[24px] shadow-2xl flex items-center justify-center hover:scale-110 transition-all active:scale-95 group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-700 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {isOpen ? (
          <svg className="w-8 h-8 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative z-10 flex flex-col items-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
        )}
      </button>
    </div>
  );
};

export default AIConcierge;
