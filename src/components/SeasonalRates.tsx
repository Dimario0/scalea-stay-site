import React from 'react';
import { CONTACT_INFO } from '../constants';
import { MONTHLY_RATES, RATE_YEAR, getRatesCopy } from '../content/seasonalRates';
import { getLongStayRoute } from '../content/longStayRoutes';

const SeasonalRates: React.FC<{ language: string }> = ({ language }) => {
  const copy = getRatesCopy(language);
  const months = new Intl.DateTimeFormat(language, { month: 'long', timeZone: 'UTC' });

  return (
    <section id="prices" aria-labelledby="rates-title" data-rates-year={RATE_YEAR} data-booking-status="closed" className="rates-section scroll-mt-40">
      <div className="rates-inner">
        <p className="rates-eyebrow">ScaleaStay · {RATE_YEAR}</p>
        <h2 id="rates-title">{copy.title}</h2>
        <p className="rates-intro">{copy.intro}</p>
        <div className="rates-status" role="note">
          <strong>{copy.closedTitle}</strong>
          <p>{copy.closedText}</p>
        </div>
        <table className="rates-table">
          <caption className="sr-only">{copy.title} — {copy.intro}</caption>
          <thead><tr><th scope="col">{copy.month}</th><th scope="col">{copy.night}</th></tr></thead>
          <tbody>
            {MONTHLY_RATES.map((price, index) => (
              <tr key={index} data-rate-month={index + 1} data-nightly-rate={price}>
                <th scope="row">{months.format(new Date(Date.UTC(RATE_YEAR, index, 1)))}</th>
                <td>€{price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="rates-includes">{copy.includes}</p>
        <a className="rates-contact" href={CONTACT_INFO.whatsappLink(copy.contact)} target="_blank" rel="noopener noreferrer" data-analytics-source="rates_2027_question">{copy.contact} <span aria-hidden="true">→</span></a>
        <p className="rates-winter"><a href={getLongStayRoute(language).path}>{copy.winterNote} →</a></p>
      </div>
    </section>
  );
};

export default SeasonalRates;
