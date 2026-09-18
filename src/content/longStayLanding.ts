import { getLongStayCopy } from './longStay';

export const LONG_STAY_PATH = '/it/soggiorni-lunghi-scalea/';
export const LONG_STAY_LINK_LABEL = 'Scopri i soggiorni lunghi a Scalea';
const stay = getLongStayCopy('it');

export const LONG_STAY_LANDING = {
  title: 'Soggiorni lunghi a Scalea con Wi-Fi e riscaldamento | ScaleaStay',
  description: 'Appartamento a Scalea per soggiorni di alcune settimane o un mese fuori stagione. Wi-Fi, riscaldamento a gas, cucina e terrazza. Preventivo su richiesta.',
  h1: 'Appartamento a Scalea per soggiorni lunghi',
  eyebrow: 'Calabria · Fuori stagione',
  intro: 'Qualche settimana al mare, o un mese per cambiare ritmo. A ScaleaStay trovi una camera da letto separata, una cucina attrezzata e una terrazza tutta per te, con Wi‑Fi e riscaldamento a gas anche per i soggiorni fuori stagione.',
  cta: stay.cta,
  message: stay.message,
  features: [
    { title: 'Il comfort di casa, anche fuori stagione', text: 'Il riscaldamento a gas ti permette di riscaldare l’appartamento durante i mesi più freschi. I costi delle utenze e le modalità di pagamento si concordano prima della prenotazione.' },
    { title: 'I tuoi spazi, per qualche settimana in più', text: 'Una camera da letto separata, una cucina dove preparare i pasti e una terrazza per i tuoi momenti all’aperto. L’appartamento dispone anche di aria condizionata e parcheggio per gli ospiti.' },
    { title: 'Wi‑Fi per restare in contatto', text: 'Il Wi‑Fi è attivo in appartamento. Se il viaggio prevede lavoro da remoto o videochiamate, chiedici prima della prenotazione le informazioni sulla connessione di cui hai bisogno.' },
  ],
  nearby: [
    { name: 'Interspar', distance: '230 m', text: 'Circa 3 minuti a piedi per la spesa quotidiana.' },
    { name: 'Stazione ferroviaria', distance: '500 m', text: 'Circa 8 minuti a piedi dalla stazione di Scalea–Santa Domenica Talao.' },
    { name: 'Spiaggia più vicina', distance: '600 m', text: 'Circa 5–8 minuti a piedi per raggiungere il mare.' },
  ],
  faq: [
    ...stay.faq,
    { q: 'Quanto costa un soggiorno di un mese?', a: 'Il prezzo è su richiesta e dipende dalle date e dalla durata del soggiorno. Scrivici il periodo desiderato e il numero di ospiti: ti comunicheremo disponibilità, prezzo e condizioni prima di prenotare.' },
    { q: 'Come si pagano le utenze?', a: 'Per i soggiorni lunghi le utenze si pagano separatamente. Le voci da pagare e le modalità di conteggio vengono concordate prima della prenotazione.' },
    { q: 'Si può soggiornare senza automobile?', a: 'Dall’appartamento puoi raggiungere a piedi Interspar, la stazione e la spiaggia più vicina. Per gli spostamenti più lunghi, verifica i collegamenti e gli orari per le date del tuo viaggio.' },
  ],
};
