# AI search visibility

The six home pages and the Italian/Polish apartment pages expose apartment facts
and localized FAQs in the initial HTML, before React loads. The same FAQ source
supplies the interactive page and FAQ JSON-LD. Commercial FAQ identifiers point
to the actual commercial canonical URL, and the WebPage refers to the declared
Accommodation entity.

Confirmed facts: up to four guests, one bedroom, equipped kitchen, private terrace,
Wi-Fi, gas heating, air conditioning and parking. The beach is 600 m away, about
5–8 minutes on foot; Interspar is about 230 m away and the station about 500 m.
The address is Via Giuseppe Saragat 11, 87029 Scalea, Italy; the CIN is
IT078138C2VN4E3MCD. Floor, lift, apartment area, bed configuration and measured
Wi-Fi speed are not newly claimed without owner confirmation.

`npm run build` verifies initial HTML and FAQ/schema agreement for all eight
apartment pages, declared capacity/bedrooms/address/CIN, and the commercial
WebPage reference. The existing 24-page SEO and public/dist llms.txt checks remain.
Only the eight changed pages receive a new sitemap lastmod.

Search eligibility is not a promise of ranking, citations or bookings. robots.txt
already allows OAI-SearchBot; access also depends on hosting/CDN rules. There is no
new AI-specific schema, fabricated review, review score or live availability.
Guests still ask the owner to confirm dates and price in WhatsApp.

After the separate reporting-agent PR is published, its daily report can identify
some referrals from known AI service hosts and their tracked contact clicks.
Google/Bing visits cannot reliably distinguish AI answers from other search
features; unattributed/direct traffic remains unknown. Clicks are not messages
or bookings. See the agent's AI_ACQUISITION_RU.md for query/status definitions.

Bing Webmaster Tools requires the owner's sign-in and verified-site access to
inspect its AI Performance report. No verification token, IndexNow key or
submission is added by this change. External review/profile work needs an actual
owner-controlled listing and real guest feedback; neither is invented here.

References:

- https://developers.openai.com/api/docs/bots
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/
