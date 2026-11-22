import { MONTHLY_RATES, RATE_YEAR } from './seasonalRates';

const heading = 'Casa vacanze a Scalea per 4, a 600 m dal mare';
const march: number = MONTHLY_RATES[2];
const april: number = MONTHLY_RATES[3];
const springPrice = march === april
  ? `A marzo e aprile ${RATE_YEAR} l’intero appartamento costa ${march} € a notte.`
  : `Per l’intero appartamento la tariffa a notte è di ${march} € a marzo e ${april} € ad aprile ${RATE_YEAR}.`;

export const ITALIAN_HOME = {
  heading,
  title: `${heading} | ScaleaStay`,
  description: `Terrazza privata, Wi-Fi e spiaggia a 5–8 minuti a piedi. ${springPrice} Verifica le date direttamente su WhatsApp.`,
  winterLink: `Verifica le date per gennaio o febbraio ${RATE_YEAR} · 450 € al mese più utenze a consumo`,
  lastModified: '2026-11-22',
};
