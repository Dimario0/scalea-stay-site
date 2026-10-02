(function () {
  const forms = document.querySelectorAll('form[data-stay-inquiry]');
  const today = new Date();
  const localDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
  for (const form of forms) {
    const arrival = form.elements.arrival;
    const departure = form.elements.departure;
    const language = form.dataset.language;
    arrival.min = localDate;
    departure.min = localDate;
    const invalidDates = language === 'pl' ? 'Wyjazd musi być po przyjeździe.' : 'La partenza deve essere successiva all’arrivo.';
    function validateDates() {
      departure.min = arrival.value || localDate;
      departure.setCustomValidity(departure.value && arrival.value && departure.value <= arrival.value ? invalidDates : '');
    }
    arrival.addEventListener('input', validateDates);
    departure.addEventListener('input', validateDates);
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      validateDates();
      if (!form.reportValidity()) return;
      const message = language === 'pl'
        ? `Dzień dobry! Znalazłem apartament na scaleastay.com. Interesuje mnie ScaleaStay. Przyjazd: ${arrival.value}. Wyjazd: ${departure.value}. Liczba gości: ${form.elements.guests.value}. Czy termin jest wolny i jaka jest całkowita cena?`
        : `Buongiorno! Ho trovato l’appartamento su scaleastay.com. Mi interessa ScaleaStay. Arrivo: ${arrival.value}. Partenza: ${departure.value}. Ospiti: ${form.elements.guests.value}. Le date sono disponibili e qual è il prezzo totale?`;
      const link = document.createElement('a');
      link.href = 'https://wa.me/420774620060?text=' + encodeURIComponent(message);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('data-analytics-source', 'guide_stay_inquiry');
      link.hidden = true;
      form.appendChild(link);
      link.click();
      link.remove();
    });
  }
})();
