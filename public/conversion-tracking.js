// A click is an outbound action, not a confirmed inquiry or booking.
(function () {
  if (window.scaleaConversionTracking) return;
  window.scaleaConversionTracking = true;

  // Standalone guides do not inherit the application's Google tag.
  if (typeof window.gtag !== 'function') {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', 'G-6CLH40VT41');
    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=G-6CLH40VT41';
    document.head.appendChild(tag);
  }

  function parameters(source, destination) {
    return {
      source: source,
      page_path: window.location.pathname.replace(/\/+$/, '') + '/',
      language: document.documentElement.lang,
      destination: destination,
      tracking_version: '3',
      transport_type: 'beacon'
    };
  }
  var formReadyPages = new Set();
  function reportFormReady() {
    var page = window.location.pathname.replace(/\/+$/, '') + '/';
    var form = document.querySelector('form[data-stay-inquiry][data-stay-inquiry-tracking="1"]');
    if (formReadyPages.has(page) || !form) return;
    formReadyPages.add(page);
    window.gtag('event', 'guide_stay_inquiry_ready', parameters(form.getAttribute('data-analytics-source') || 'guide_stay_inquiry', 'form'));
  }
  document.addEventListener('scaleastay:stay-inquiry-ready', reportFormReady);
  reportFormReady();

  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    var url;
    try { url = new URL(link.href, window.location.href); } catch (_) { return; }
    var whatsapp = ['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(url.hostname);
    var apartment = url.origin === window.location.origin && (
      (/^\/(it\/appartamento-scalea-vicino-mare|pl\/apartament-scalea-blisko-morza)\/?$/.test(url.pathname) &&
        url.pathname.replace(/\/+$/, '') !== window.location.pathname.replace(/\/+$/, '')) ||
      (/^\/(ru|en|it|de|cs|pl)\/?$/.test(url.pathname) && url.hash === '#apartments')
    );
    if (!whatsapp && !apartment) return;
    var section = link.closest('section[id], header, nav, footer');
    var source = link.getAttribute('data-analytics-source') || link.getAttribute('data-source') ||
      (section && (section.id || section.tagName.toLowerCase())) || 'page';
    var params = parameters(source, whatsapp ? 'whatsapp' : url.pathname + url.hash);
    window.gtag('event', whatsapp ? 'whatsapp_click' : 'apartment_link_click', params);
    // Only the validated form creates this link. Direct-write links share source but not this marker.
    if (whatsapp && ['guide_stay_inquiry', 'apartment_stay_inquiry'].includes(source) &&
        link.getAttribute('data-stay-inquiry-submit') === 'true' && link.closest('form[data-stay-inquiry]')) {
      window.gtag('event', 'guide_stay_inquiry_whatsapp_click', params);
    }
  }, true);
})();
