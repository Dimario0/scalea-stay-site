import { getLongStayCopy } from './longStay';

const stay = getLongStayCopy('it');

export const LONG_STAY_LANDING = {
  title: 'Soggiorni invernali e lunghi a Scalea con Wi-Fi e riscaldamento | ScaleaStay',
  description: 'Appartamento a Scalea per soggiorni di alcune settimane o un mese in inverno o fuori stagione. Wi-Fi, riscaldamento a gas, cucina e terrazza. Preventivo su richiesta.',
  h1: 'Il tuo inverno a Scalea, con il comfort di casa',
  eyebrow: 'Calabria · Inverno e fuori stagione',
  intro: 'Una camera da letto separata, interni moderni e una terrazza privata. Scegli ScaleaStay per qualche settimana o un mese vicino al mare, con i tuoi spazi e le comodità di casa.',
  cta: 'Verifica disponibilità e prezzo',
  message: stay.message,
  features: [
    { title: 'Una terrazza tutta per te', text: 'Una colazione all’aperto, una pausa dopo una passeggiata, un momento per te. La terrazza privata aggiunge spazio alle tue giornate a Scalea.' },
    { title: 'La libertà di sentirti a casa', text: 'Prepara i pasti nella cucina attrezzata e ritrova la privacy di una camera da letto separata. Puoi seguire i tuoi orari e organizzare ogni giornata come preferisci.' },
    { title: 'Accogliente anche fuori stagione', text: 'Il riscaldamento a gas è una comodità in più nei mesi freschi. Wi‑Fi, aria condizionata e parcheggio per gli ospiti completano la dotazione dell’appartamento.' },
  ],
  nearby: [
    { name: 'Spiaggia più vicina', distance: '600 m', text: 'Circa 5–8 minuti a piedi per una passeggiata al mare.' },
    { name: 'Interspar', distance: '230 m', text: 'Circa 3 minuti a piedi per la spesa quotidiana.' },
    { name: 'Stazione ferroviaria', distance: '500 m', text: 'Circa 8 minuti a piedi dalla stazione di Scalea–Santa Domenica Talao.' },
  ],
  faq: [
    { q: 'Posso fermarmi per qualche settimana o un mese?', a: 'Sì, i soggiorni prolungati fuori stagione sono possibili previo accordo, in base alla disponibilità per il periodo desiderato.' },
    { q: 'C’è il riscaldamento per i mesi più freschi?', a: 'Sì, l’appartamento dispone di riscaldamento a gas.' },
    { q: 'È disponibile il Wi‑Fi?', a: 'Sì, il Wi‑Fi è disponibile in appartamento.' },
    { q: 'Quanto costa un soggiorno di un mese?', a: 'Il prezzo è su richiesta. Prepariamo un preventivo in base alle date, alla durata e al numero di ospiti, prima della conferma della prenotazione.' },
    { q: 'Le utenze sono incluse nel prezzo?', a: 'No, per i soggiorni lunghi le utenze si pagano separatamente. Le voci e le modalità di calcolo vengono chiarite insieme al preventivo.' },
    { q: 'Si può soggiornare senza automobile?', a: 'Puoi raggiungere a piedi il mare, Interspar e la stazione. Per le escursioni e gli spostamenti più lunghi, verifica i collegamenti per le date del tuo viaggio.' },
  ],
};
