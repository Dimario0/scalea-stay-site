import { getLongStayCopy } from './longStay';

const stay = getLongStayCopy('it');

export const LONG_STAY_LANDING = {
  title: 'Affitto invernale a Scalea: 450 €/mese + utenze | ScaleaStay',
  description: 'Appartamento a Scalea a 450 € al mese da novembre a marzo, minimo un mese. Utenze a consumo escluse, anticipo una tantum di 100 € con conguaglio.',
  h1: 'Appartamento a Scalea in affitto mensile per l’inverno',
  eyebrow: 'Calabria · Inverno e fuori stagione',
  intro: 'Da novembre a marzo, affitta l’appartamento ScaleaStay per almeno un mese a 450 € al mese, più utenze a consumo. Una camera da letto separata, Wi‑Fi, riscaldamento a gas e cucina attrezzata per la tua vita quotidiana vicino al mare.',
  offer: {
    price: '450 € al mese per l’appartamento',
    period: 'Da novembre a marzo · soggiorno minimo di un mese',
    utilities: 'Le utenze si pagano a parte, in base ai consumi effettivi rilevati dai contatori.',
    advance: 'All’arrivo si versa un anticipo una tantum di 100 € per le utenze. Al conguaglio, l’importo non utilizzato viene restituito; eventuali consumi eccedenti si pagano a parte.',
    availability: 'Le date disponibili devono essere confermate dal proprietario.',
  },
  cta: 'Verifica le date disponibili',
  message: stay.message,
  features: [
    { title: 'Accogliente anche fuori stagione', text: 'Il riscaldamento a gas è una comodità in più nei mesi freschi. Wi‑Fi, aria condizionata e parcheggio per gli ospiti completano la dotazione dell’appartamento.' },
    { title: 'La libertà di sentirti a casa', text: 'Prepara i pasti nella cucina attrezzata e ritrova la privacy di una camera da letto separata. Puoi seguire i tuoi orari e organizzare ogni giornata come preferisci.' },
  ],
  nearby: [
    { name: 'Spiaggia più vicina', distance: '600 m', text: 'Circa 5–8 minuti a piedi per una passeggiata al mare.' },
    { name: 'Interspar', distance: '230 m', text: 'Circa 3 minuti a piedi per la spesa quotidiana.' },
    { name: 'Stazione ferroviaria', distance: '500 m', text: 'Circa 8 minuti a piedi dalla stazione di Scalea–Santa Domenica Talao.' },
  ],
  faq: [
    { q: 'Qual è il soggiorno minimo per l’offerta invernale?', a: 'L’offerta è valida da novembre a marzo per soggiorni di almeno un mese, previa conferma delle date disponibili.' },
    { q: 'C’è il riscaldamento per i mesi più freschi?', a: 'Sì, l’appartamento dispone di riscaldamento a gas.' },
    { q: 'È disponibile il Wi‑Fi?', a: 'Sì, il Wi‑Fi è disponibile in appartamento.' },
    { q: 'Quanto costa un soggiorno di un mese?', a: 'Da novembre a marzo il prezzo per l’appartamento è di 450 € al mese, con soggiorno minimo di un mese. Le utenze sono escluse e si calcolano dai contatori. All’arrivo si versa un anticipo una tantum di 100 € per le utenze: al conguaglio si restituisce l’importo non utilizzato oppure si paga la differenza.' },
    { q: 'Si può soggiornare senza automobile?', a: 'Puoi raggiungere a piedi il mare, Interspar e la stazione. Per le escursioni e gli spostamenti più lunghi, verifica i collegamenti per le date del tuo viaggio.' },
  ],
};
