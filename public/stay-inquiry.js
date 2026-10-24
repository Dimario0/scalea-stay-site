(function () {
  if (window.scaleaStayInquiry) return;
  window.scaleaStayInquiry = true;
  function installForms() {
    const forms = document.querySelectorAll('form[data-stay-inquiry]');
    const today = new Date();
    const localDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    for (const form of forms) {
      if (form.dataset.stayInquiryTracking === '1') continue;
      const arrival = form.elements.arrival;
      const departure = form.elements.departure;
      const language = form.dataset.language;
      const monthly = form.dataset.minimumStay === 'month';
      arrival.min = localDate;
      departure.min = localDate;
      const invalidDates = language === 'pl' ? 'Wyjazd musi być po przyjeździe.' : 'La partenza deve essere successiva all’arrivo.';
      function monthAfter(value) {
        const [year, month, day] = value.split('-').map(Number);
        // Clamp the day at month end (31 January → 28/29 February), without DST shifts.
        const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
        const date = new Date(Date.UTC(year, month, Math.min(day, lastDay)));
        return date.toISOString().slice(0, 10);
      }
      function validateDates() {
        departure.min = monthly && arrival.value ? monthAfter(arrival.value) : arrival.value || localDate;
        let error = departure.value && arrival.value && departure.value <= arrival.value ? invalidDates : '';
        if (monthly && arrival.value && departure.value) {
          const [year, month] = arrival.value.split('-').map(Number);
          const winterYear = month >= 11 ? year : year - 1;
          if ((month > 3 && month < 11) || departure.value > `${winterYear + 1}-04-01`) {
            error = form.dataset.invalidSeason;
          } else if (departure.value < monthAfter(arrival.value)) {
            error = form.dataset.invalidMinimum;
          }
        }
        departure.setCustomValidity(error);
      }
      arrival.addEventListener('input', validateDates);
      departure.addEventListener('input', validateDates);
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        validateDates();
        if (!form.reportValidity()) return;
        const message = monthly
          ? form.dataset.inquiryMessage.replaceAll('{arrival}', arrival.value).replaceAll('{departure}', departure.value).replaceAll('{guests}', form.elements.guests.value)
          : language === 'pl'
          ? `Dzień dobry! Znalazłem apartament na scaleastay.com. Interesuje mnie ScaleaStay. Przyjazd: ${arrival.value}. Wyjazd: ${departure.value}. Liczba gości: ${form.elements.guests.value}. Czy termin jest wolny i jaka jest całkowita cena?`
          : `Buongiorno! Ho trovato l’appartamento su scaleastay.com. Mi interessa ScaleaStay. Arrivo: ${arrival.value}. Partenza: ${departure.value}. Ospiti: ${form.elements.guests.value}. Le date sono disponibili e qual è il prezzo totale?`;
        const link = document.createElement('a');
        link.href = 'https://wa.me/420774620060?text=' + encodeURIComponent(message);
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('data-analytics-source', form.getAttribute('data-analytics-source') || 'guide_stay_inquiry');
        link.setAttribute('data-stay-inquiry-submit', 'true');
        link.hidden = true;
        form.appendChild(link);
        link.click();
        link.remove();
      });
      // The updated handler is installed; this is not a visible-form or contact event.
      form.dataset.stayInquiryTracking = '1';
      document.dispatchEvent(new CustomEvent('scaleastay:stay-inquiry-ready'));
    }
  }
  // React replaces the prerendered form and can mount a new language version.
  document.addEventListener('scaleastay:stay-inquiry-mount', installForms);
  installForms();
})();
