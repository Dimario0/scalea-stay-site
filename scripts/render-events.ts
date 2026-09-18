import { EVENTS_CHECKED, LOCAL_EVENTS, eventDate, eventStatus, romeToday } from '../src/content/events';
import { renderEventCard } from '../src/content/eventsMarkup';
import { longStayStyles } from './render-long-stay';

export const eventsStyles = `${longStayStyles}<style>
.events-hero{padding:64px 0 44px;max-width:850px}.events-hero h1{max-width:800px}.events-nav{display:flex;flex-wrap:wrap;gap:12px 24px}.events-nav a{text-decoration:underline!important;text-underline-offset:4px;font-weight:700}.events-list{display:grid;gap:24px}.event-card{padding:32px;border:1px solid #e2e8f0;background:white;border-radius:24px;max-width:850px;scroll-margin-top:24px}.event-card h3{font-size:32px;margin:12px 0}.event-date{color:#4338ca;font-weight:700}.event-category{font-size:12px;text-transform:uppercase;letter-spacing:.08em;margin-top:12px!important}.event-state{font-size:12px;font-weight:700;color:#475569}.event-venue{font-weight:700}.event-card p{max-width:690px}.event-checked{font-size:13px;color:#64748b;margin-top:12px!important}.event-card .stay-link{margin-top:0}.event-card[data-state="past"] .event-cta,.event-card[data-state="cancelled"] .event-cta{display:none}.events-empty{padding:28px;background:#eef2ff;border-radius:20px;max-width:850px}.event-card[data-state="past"]{background:#f1f5f9}.events-note{font-size:14px;color:#64748b;max-width:760px} [hidden]{display:none!important}
@media(max-width:540px){.event-card{padding:24px 20px}.events-hero{padding:40px 0}.event-card h3{font-size:27px}}
</style>`;

// Only updates date-based grouping. Announcements/cancellations still need editorial checking.
export const eventsClient = `<script>
(()=>{const todayInRome=${romeToday.toString()};const statusOf=${eventStatus.toString()};
function refresh(){const today=todayInRome();const upcoming=document.querySelector('#upcoming-list'),archive=document.querySelector('#archive-list');
const cards=[...document.querySelectorAll('.event-card')];
cards.sort((a,b)=>a.dataset.start.localeCompare(b.dataset.start)).forEach(card=>{const status=statusOf({end:card.dataset.end,cancelled:card.dataset.cancelled==='true'},today);card.dataset.state=status;card.querySelector('.event-state').textContent=status==='past'?'Evento concluso':status==='cancelled'?'Evento annullato':'In programma';(status==='upcoming'?upcoming:archive).append(card);});
[...archive.children].reverse().forEach(card=>archive.append(card));document.querySelector('#events-empty').hidden=upcoming.children.length>0;document.querySelector('#events-archive').hidden=archive.children.length===0;}
refresh();setInterval(refresh,60000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh()});})();
</script>`;

export function renderEvents(today = romeToday()): string {
  const upcoming = LOCAL_EVENTS.filter(e => eventStatus(e, today) === 'upcoming').sort((a,b)=>a.start.localeCompare(b.start));
  const archive = LOCAL_EVENTS.filter(e => eventStatus(e, today) !== 'upcoming').sort((a,b)=>b.start.localeCompare(a.start));
  return `<div id="root" class="stay-page">
<header class="stay-top"><div class="stay-wrap"><a class="stay-brand" href="/it/">Scalea<span>Stay</span></a><nav aria-label="Navigazione"><a href="/it/#apartments">Scopri l’appartamento →</a></nav></div></header>
<main><div class="stay-wrap"><section class="events-hero"><p class="stay-eyebrow">Concerti · Sapori · Cultura</p><h1>Eventi a Scalea e dintorni</h1><p class="stay-lead">Una serata da ricordare, un festival da scoprire. Scegli cosa vivere durante il tuo soggiorno sulla Riviera dei Cedri.</p><p class="events-note">Selezione verificata il ${eventDate(EVENTS_CHECKED)}. Prima di partire, controlla eventuali variazioni e le condizioni di accesso nella fonte di ciascun evento.</p><nav class="events-nav" aria-label="Sezioni dell’agenda"><a href="#prossimi">Prossimi appuntamenti</a><a href="#events-archive">Archivio degli eventi</a></nav><noscript><p class="events-note">Calendario delle date al ${eventDate(today)}. Controlla le date riportate: la suddivisione si aggiorna durante la navigazione con JavaScript attivo.</p></noscript></section></div>
<section id="prossimi" class="stay-section stay-white"><div class="stay-wrap"><h2>Prossimi appuntamenti</h2><div id="upcoming-list" class="events-list">${upcoming.map(e=>renderEventCard(e,today)).join('')}</div><div id="events-empty" class="events-empty" ${upcoming.length ? 'hidden' : ''}><h3>Le prossime date sono da scoprire</h3><p>Non abbiamo ancora nuovi appuntamenti verificati da segnalare. Intanto, scopri <a class="stay-link" href="/it/scalea-senza-auto/">cosa raggiungere a piedi da ScaleaStay →</a></p></div></div></section>
<section id="events-archive" class="stay-section" ${archive.length ? '' : 'hidden'}><div class="stay-wrap"><h2>Archivio degli eventi</h2><p class="events-note">Eventi conclusi o annullati. Le date riportate non annunciano una prossima edizione.</p><div id="archive-list" class="events-list">${archive.map(e=>renderEventCard(e,today)).join('')}</div></div></section>
<section class="stay-section stay-white"><div class="stay-wrap"><h2>Fermati a Scalea, al ritmo che preferisci</h2><p>Una camera da letto separata, cucina e terrazza. Scopri l’appartamento e organizza il tuo soggiorno.</p><div class="stay-links"><a href="/it/#apartments">Guarda l’appartamento →</a><a href="/it/soggiorni-lunghi-scalea/">Restare più a lungo, anche fuori stagione →</a></div></div></section>
</main><footer class="stay-footer"><div class="stay-wrap"><p>ScaleaStay · Via Giuseppe Saragat 11 · Scalea, Calabria</p><p>CIN: IT078138C2VN4E3MCD</p><p>Gli eventi sono organizzati da terzi. Per biglietti e partecipazione, consulta i riferimenti nell’annuncio.</p></div></footer></div>`;
}
