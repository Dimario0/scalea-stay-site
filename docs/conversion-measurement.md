# Measuring inquiries before improving acquisition

## Events after this change

- `whatsapp_click`: one event per link activation, including React pages, static guides and long-stay pages. Records page, language, placement (`source`) and `tracking_version: 2`. It is an outbound click, not a sent message, unique person, confirmed inquiry or booking.
- `apartment_link_click`: an internal transition toward apartment information. Use page and source to assess whether guide readers show interest in accommodation. Not a lead.
- `booking_button_click`: no longer also emitted for WhatsApp CTAs. External booking links can still emit the legacy event. Never add these event categories together as unique leads.
- `ai_concierge_to_whatsapp`: an additional diagnostic for the concierge; overlaps `whatsapp_click` and must not be added to it.

WhatsApp link query text is not included in the new custom event parameters. Contact numbers are unchanged. Main apartment inquiries and standalone guide links prefill a localized message naming scaleastay.com and asking for dates, guests and a quote; the user still edits and sends it manually. This source cue is not proof of a booking. The existing Google tag is reused; standalone generated guides initialize that same tag when missing. This implementation does not verify delivery to GA4 or change property settings.

## Comparing results

Record the actual production publication date before comparing periods. Historical WhatsApp totals can contain duplicate events; new counts are not directly comparable. Static guides previously lacked the Google tag, so increased measured visits after this release may reflect improved coverage rather than more visitors. Do not label either change as a marketing win/loss without checking acquisition data.

For weekly business review use separately:
1. Search Console search clicks and impressions on accommodation pages versus informational guides.
2. Guide-to-apartment clicks and WhatsApp clicks by page and placement.
3. Actual new conversations, confirmed bookings, booked nights and revenue, recorded by the person handling inquiries. Source may remain unknown; do not infer it from a click.

No automatic revenue or confirmed-booking event is emitted. Do not put guest names, phone numbers or message contents in analytics.

## Verification

`npm run build` runs conversion regression tests, installs one shared tracker on every generated HTML page, verifies coverage and source/build equality, and runs existing SEO/events checks. `npm run lint` checks types.

Use intercepted Google analytics requests or a stub `gtag` when testing clicks in a browser, so QA does not add real production events. Check a home page, a standalone guide and a winter landing. A second intentional activation should produce a second event; do not deduplicate different user actions with a time window.
