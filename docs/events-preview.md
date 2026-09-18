# Events prototype

The Italian agenda (`/it/eventi-scalea/`) and Italian home teaser are review-only.
Netlify `CONTEXT=deploy-preview` enables them. For a local build use
`VITE_EVENTS_PREVIEW=true npm run build`, then `npm run preview`.
`CONTEXT=production` always disables them, even if the local preview flag is set.
The agenda is noindex and is excluded from the sitemap. Publishing requires
separate owner approval and a deliberate change to these gates/metadata.

Edit verified announcements in `src/content/events.ts`. Each item needs an ID,
start/end dates (inclusive, Europe/Rome calendar days), location, original summary,
source URL and actual checked date. Add an exact time only when the source gives it.
Mark cancellations with `cancelled: true`; postponed dates need an editorial update.
Do not infer future editions from annual recurrence or copy third-party posters.

The page groups expired dates into the archive on load and every minute while open.
The home teaser selects up to three current/future records. No-JavaScript HTML is
a dated build snapshot; it does not independently refresh. Source changes and
cancellations are NOT automatically fetched. Before publication decide the editorial
review cadence and how frequently static snapshots should be rebuilt.

Current sources checked 2026-09-18:
- FAItango event 172629: Cocktail Tango, 20 September 2026 at 19:30, Grand Hotel De Rose,
  Scalea, €15 including refreshments, advance reservation recommended.
- Official Peperoncino Festival 2026 programme: 9–13 September 2026, Diamante; archived.

Run `node scripts/verify-events.mjs` for Rome date boundaries, multi-day events,
cancellations and empty listings. Also verify preview/production builds, mobile layout,
source links and the inquiry text. Tests must not send messages or analytics requests.
