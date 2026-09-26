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

  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    var url;
    try { url = new URL(link.href, window.location.href); } catch (_) { return; }
    var whatsapp = ['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(url.hostname);
    var apartment = url.origin === window.location.origin && (
      /^\/(it\/appartamento-scalea-vicino-mare|pl\/apartament-scalea-blisko-morza)\/?$/.test(url.pathname) ||
      (/^\/(ru|en|it|de|cs|pl)\/?$/.test(url.pathname) && url.hash === '#apartments')
    );
    if (!whatsapp && !apartment) return;
    var section = link.closest('section[id], header, nav, footer');
    var source = link.getAttribute('data-analytics-source') || link.getAttribute('data-source') ||
      (section && (section.id || section.tagName.toLowerCase())) || 'page';
    window.gtag('event', whatsapp ? 'whatsapp_click' : 'apartment_link_click', {
      source: source,
      page_path: window.location.pathname.replace(/\/+$/, '') + '/',
      language: document.documentElement.lang,
      destination: whatsapp ? 'whatsapp' : url.pathname + url.hash,
      tracking_version: '2',
      transport_type: 'beacon'
    });
  }, true);
})();
