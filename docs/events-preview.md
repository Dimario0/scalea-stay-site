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
cancellations are NOT automatically fetched. The owner approved source reviews once
a week and again 1–2 days before each event on 2026-09-18. This is an editorial
policy; no recurring automation has been enabled. Each review must check dates,
venue, admission and cancellations against the organizer or federation, then record
its findings in Notion. Do not refresh the checked date if verification failed.
Rebuild the static snapshot after each content update and after an event ends;
an automatic rebuild mechanism still needs to be set up before production launch.
Publication of the agenda itself still requires separate owner approval.

Current sources checked 2026-09-18:
- FAItango event 172629: Cocktail Tango, 20 September 2026 at 19:30, Grand Hotel De Rose,
  Scalea, €15 including refreshments, advance reservation recommended.
- Official Peperoncino Festival 2026 programme: 9–13 September 2026, Diamante; archived.
- Italian Chess Federation calendar, record 22010: Trofeo Arcomagno, IV edition,
  25–27 September 2026 at Hotel San Giorgio, San Nicola Arcella, with three Open
  groups by Elo. Entry conditions and companion access are referred to the organizer;
  no unverified start time, price, travel time or spectator access is promised.

Run `node scripts/verify-events.mjs` for Rome date boundaries, multi-day events,
cancellations and empty listings. Also verify preview/production builds, mobile layout,
source links and the inquiry text. Tests must not send messages or analytics requests.
