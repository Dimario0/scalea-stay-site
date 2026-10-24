import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const source = readFileSync(new URL('../src/content/events.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
const { romeToday, eventStatus, upcomingEvents, LOCAL_EVENTS } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
assert.equal(romeToday(new Date('2026-09-20T21:59:59Z')), '2026-09-20');
assert.equal(romeToday(new Date('2026-09-20T22:00:00Z')), '2026-09-21');
assert.equal(romeToday(new Date('2026-12-20T23:00:00Z')), '2026-12-21');
assert.equal(eventStatus({start:'2026-09-09',end:'2026-09-13'}, '2026-09-13'), 'upcoming');
assert.equal(eventStatus({start:'2026-09-09',end:'2026-09-13'}, '2026-09-14'), 'past');
assert.equal(eventStatus({start:'2026-09-20',end:'2026-09-20',cancelled:true}, '2026-09-18'), 'cancelled');
assert.deepEqual(upcomingEvents('2026-09-18').map(e=>e.id), ['cocktail-tango-2026-09-20', 'trofeo-arcomagno-2026']);
assert.deepEqual(upcomingEvents('2026-09-21').map(e=>e.id), ['trofeo-arcomagno-2026']);
assert.deepEqual(upcomingEvents('2026-09-27').map(e=>e.id), ['trofeo-arcomagno-2026']);
assert.deepEqual(upcomingEvents('2026-09-28'), []);
assert.deepEqual(upcomingEvents('2026-09-18', LOCAL_EVENTS.map(e=>({...e,cancelled:true}))), []);
assert.equal(new Set(LOCAL_EVENTS.map(e=>e.id)).size, LOCAL_EVENTS.length);
for (const event of LOCAL_EVENTS) {
  assert(event.start <= event.end);
  assert.equal(new URL(event.source).protocol, 'https:');
  assert(event.checked && event.venue && event.city);
}
console.log('PASS: Rome midnight and winter offset, multi-day end date, cancellations, expired and empty listings, source data');
