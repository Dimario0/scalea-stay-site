const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const targetStr = `      var priceSeen = false;

      function textLooksLikePriceBlock(text) {
        text = normalize(text);

        return (
          text.indexOf("price") !== -1 ||
          text.indexOf("prices") !== -1 ||
          text.indexOf("cena") !== -1 ||
          text.indexOf("prezzo") !== -1 ||
          text.indexOf("tariff") !== -1 ||
          text.indexOf("rate") !== -1 ||
          text.indexOf("стоимость") !== -1 ||
          text.indexOf("цена") !== -1 ||
          text.indexOf("€") !== -1 ||
          text.indexOf("eur") !== -1
        );
      }

      function candidatePriceSections() {
        var selectors = [
          "[id*='price']",
          "[class*='price']",
          "[id*='cena']",
          "[class*='cena']",
          "[id*='prezzo']",
          "[class*='prezzo']",
          "[id*='tariff']",
          "[class*='tariff']",
          "[id*='rate']",
          "[class*='rate']",
          "section",
          "article"
        ];

        var nodes = [];

        selectors.forEach(function (selector) {
          document.querySelectorAll(selector).forEach(function (node) {
            if (nodes.indexOf(node) === -1) {
              nodes.push(node);
            }
          });
        });

        return nodes;
      }

      function sendPriceView(node) {
        if (priceSeen) return;

        priceSeen = true;

        sendEvent("price_section_view", {
          section_hint: node && (node.id || node.className || getText(node).slice(0, 80)) || "price"
        });
      }

      function checkPriceSection() {
        if (priceSeen) return;

        var nodes = candidatePriceSections();
        var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        for (var i = 0; i < nodes.length; i++) {
          var rect = nodes[i].getBoundingClientRect();

          if (
            rect.top < viewportHeight &&
            rect.bottom > 0 &&
            textLooksLikePriceBlock(getText(nodes[i]))
          ) {
            sendPriceView(nodes[i]);
            break;
          }
        }
      }

      function setupPriceObserver() {
        var nodes = candidatePriceSections();
        if (!nodes.length) return;

        if ("IntersectionObserver" in window) {
          var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (priceSeen) return;

              if (
                entry.isIntersecting &&
                textLooksLikePriceBlock(getText(entry.target))
              ) {
                sendPriceView(entry.target);
                observer.disconnect();
              }
            });
          }, {
            threshold: 0.25
          });

          nodes.forEach(function (node) {
            observer.observe(node);
          });
        } else {
          checkPriceSection();
          window.addEventListener("scroll", checkPriceSection, { passive: true });
        }
      }

      window.addEventListener("load", function () {
        setupPriceObserver();
        setTimeout(checkPriceSection, 1500);
      });

      setTimeout(checkPriceSection, 3000);`;

const newStr = `      var apartmentsSeen = false;

      function candidateApartmentsSections() {
        var selectors = [
          "[data-analytics='apartments-section']",
          "[id*='apartment']"
        ];

        var nodes = [];

        selectors.forEach(function (selector) {
          document.querySelectorAll(selector).forEach(function (node) {
            if (nodes.indexOf(node) === -1) {
              nodes.push(node);
            }
          });
        });

        return nodes;
      }

      function sendApartmentsView(node) {
        if (apartmentsSeen) return;

        apartmentsSeen = true;

        sendEvent("apartments_section_view", {
          section: "apartments",
          page_path: window.location.pathname
        });

        // Legacy compatibility
        sendEvent("price_section_view", {
          section: "apartments_legacy",
          page_path: window.location.pathname
        });
      }

      function checkApartmentsSection() {
        if (apartmentsSeen) return;

        var nodes = candidateApartmentsSections();
        var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        for (var i = 0; i < nodes.length; i++) {
          var rect = nodes[i].getBoundingClientRect();

          if (
            rect.top < viewportHeight &&
            rect.bottom > 0
          ) {
            sendApartmentsView(nodes[i]);
            break;
          }
        }
      }

      function setupApartmentsObserver() {
        var nodes = candidateApartmentsSections();
        if (!nodes.length) return;

        if ("IntersectionObserver" in window) {
          var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (apartmentsSeen) return;

              if (entry.isIntersecting) {
                sendApartmentsView(entry.target);
                observer.disconnect();
              }
            });
          }, {
            threshold: 0.1
          });

          nodes.forEach(function (node) {
            observer.observe(node);
          });
        } else {
          checkApartmentsSection();
          window.addEventListener("scroll", checkApartmentsSection, { passive: true });
        }
      }

      window.addEventListener("load", function () {
        setupApartmentsObserver();
        setTimeout(checkApartmentsSection, 1500);
      });

      setTimeout(checkApartmentsSection, 3000);`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, newStr);
  fs.writeFileSync('index.html', content);
  console.log("Success");
} else {
  console.log("Target string not found, trying a more flexible replace...");
  const startIdx = content.indexOf('var priceSeen = false;');
  const endStr = 'setTimeout(checkPriceSection, 3000);';
  const endIdx = content.indexOf(endStr);
  
  if (startIdx !== -1 && endIdx !== -1) {
    const toReplace = content.substring(startIdx, endIdx + endStr.length);
    content = content.replace(toReplace, newStr);
    fs.writeFileSync('index.html', content);
    console.log("Flexible replace success");
  } else {
    console.log("Failed to find boundaries");
  }
}
