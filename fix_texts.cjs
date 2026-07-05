const fs = require('fs');
let content = fs.readFileSync('src/constants.tsx', 'utf8');

// Update directBookItem5
content = content.replace(/directBookItem5: 'Мгновенное подтверждение бронирования'/g, "directBookItem5: 'Быстрое подтверждение после проверки свободных дат'");
content = content.replace(/directBookItem5: 'Instant booking confirmation'/g, "directBookItem5: 'Fast confirmation after checking availability'");
content = content.replace(/directBookItem5: 'Conferma immediata della prenotazione'/g, "directBookItem5: 'Conferma rapida dopo aver verificato la disponibilità'");
content = content.replace(/directBookItem5: 'Sofortige Buchungsbestätigung'/g, "directBookItem5: 'Schnelle Bestätigung nach Überprüfung der Verfügbarkeit'");
content = content.replace(/directBookItem5: 'Okamžité potvrzení rezervace'/g, "directBookItem5: 'Rychlé potvrzení po ověření dostupnosti'");

// Update faqA5
content = content.replace(/faqA5: 'Вы можете забронировать жилье напрямую через наш сайт или WhatsApp, что гарантирует лучшую цену без комиссий посредников.'/g, "faqA5: 'Вы можете забронировать апартаменты напрямую через наш сайт или WhatsApp. Так вы общаетесь с владельцем напрямую, можете быстро проверить свободные даты и избежать комиссий платформ при прямом бронировании.'");
content = content.replace(/faqA5: 'You can book accommodation directly through our website or WhatsApp, which guarantees the best price without intermediary commissions.'/g, "faqA5: 'You can book the apartments directly through our website or WhatsApp. This way, you communicate directly with the owner, can quickly check available dates, and avoid platform fees with direct booking.'");
content = content.replace(/faqA5: 'È possibile prenotare l\\'alloggio direttamente tramite il nostro sito web o WhatsApp, garantendo il miglior prezzo senza commissioni di intermediari.'/g, "faqA5: 'Puoi prenotare gli appartamenti direttamente tramite il nostro sito web o WhatsApp. In questo modo comunichi direttamente con il proprietario, puoi controllare rapidamente le date disponibili ed evitare le commissioni delle piattaforme.'");
content = content.replace(/faqA5: 'Sie können Ihre Unterkunft direkt über unsere Website oder WhatsApp buchen. Das garantiert Ihnen den besten Preis ohne Vermittlungsprovisionen.'/g, "faqA5: 'Sie können die Apartments direkt über unsere Website oder WhatsApp buchen. So kommunizieren Sie direkt mit dem Eigentümer, können freie Termine schnell prüfen und bei Direktbuchung Plattformgebühren vermeiden.'");
content = content.replace(/faqA5: 'Ubytování si můžete rezervovat přímo přes naše webové stránky nebo WhatsApp, což zaručuje nejlepší cenu bez provizí zprostředkovatelů.'/g, "faqA5: 'Apartmány si můžete zarezervovat přímo přes naše webové stránky nebo WhatsApp. Získáte tak přímý kontakt s majitelem, můžete rychle ověřit volné termíny a vyhnete se tak poplatkům platformám při přímé rezervaci.'");

fs.writeFileSync('src/constants.tsx', content);
