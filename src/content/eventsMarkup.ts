import { CONTACT_INFO } from '../constants';
import { EVENTS_PATH, LOCAL_EVENTS, eventDates, eventDate, eventStatus, romeToday, upcomingEvents, type LocalEvent } from './events';

const esc = (text: string) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');

export function renderEventCard(event: LocalEvent, today = romeToday()): string {
  const state = eventStatus(event, today);
  const message = `Ciao! Vorrei sapere se l’appartamento ScaleaStay è disponibile per ${event.title} (${eventDates(event)}). Date del soggiorno: __. Numero di ospiti: __.`;
  return `<article id="${esc(event.id)}" class="event-card" data-end="${event.end}" data-start="${event.start}" data-state="${state}" data-cancelled="${!!event.cancelled}">
    <div class="event-date"><time datetime="${event.start}">${esc(eventDates(event))}</time>${event.time ? ` · ${esc(event.time)}` : ''}</div>
    <p class="event-category">${esc(event.category)} · ${esc(event.city)}</p>
    <p class="event-state">${state === 'past' ? 'Evento concluso' : state === 'cancelled' ? 'Evento annullato' : 'In programma'}</p>
    <h3>${esc(event.title)}</h3><p class="event-venue">${esc(event.venue)}</p><p>${esc(event.description)}</p><p>${esc(event.admission)}</p>
    <a class="stay-link" href="${esc(event.source)}" target="_blank" rel="noopener noreferrer">${esc(event.sourceName)} ↗</a>
    <p class="event-checked">Fonte verificata il ${eventDate(event.checked)}</p>
    <a class="stay-cta event-cta" data-source="events_preview" href="${esc(CONTACT_INFO.whatsappLink(message))}" target="_blank" rel="noopener noreferrer">Verifica l’appartamento per queste date ↗</a>
  </article>`;
}

export function renderEventsTeaser(today = romeToday()): string {
  const events = upcomingEvents(today).slice(0, 3);
  return `<section id="events-preview" aria-labelledby="events-preview-title" style="padding:48px 24px;background:#f8fafc;color:#0f172a;font:16px/1.6 system-ui,sans-serif"><div style="max-width:1024px;margin:auto">
    <p style="color:#4338ca;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase">Da vivere nei dintorni</p>
    <h2 id="events-preview-title" style="font-size:32px;line-height:1.2;margin:12px 0 24px;font-weight:800">Un motivo in più per venire a Scalea</h2>
    ${events.length ? events.map(event => `<article style="padding:22px;border:1px solid #e2e8f0;border-radius:20px;background:white;margin-bottom:16px"><p style="color:#4338ca;font-weight:700">${esc(eventDates(event))} · ${esc(event.city)}</p><h3 style="font-size:24px;font-weight:700;margin:8px 0">${esc(event.title)}</h3><p>${esc(event.description)}</p><a href="${EVENTS_PATH}#${event.id}" style="display:inline-block;margin-top:14px;color:#4338ca;text-decoration:underline;font-weight:700">Luogo, orario e informazioni →</a></article>`).join('') : '<p>Non abbiamo ancora nuovi appuntamenti verificati da segnalare. Esplora le idee per il tuo soggiorno.</p>'}
    <a href="${EVENTS_PATH}" style="display:inline-block;color:#4338ca;text-decoration:underline;font-weight:700;margin-top:12px">Esplora l’agenda di Scalea e dintorni →</a>
  </div></section>`;
}
