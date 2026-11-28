import { BEACH_ACCESS, BEACH_WALK_POINTS } from '../content/beachWalk';

// North is up. At this scale a local projection preserves the turns and relative distances.
const latitudeScale = 111_320 * 1.1;
const longitudeScale = latitudeScale * Math.cos(BEACH_ACCESS[0] * Math.PI / 180);
const points = BEACH_WALK_POINTS.map(([lat, lon]) => ({
  x: 74 + (lon - BEACH_ACCESS[1]) * longitudeScale,
  y: 108 - (lat - BEACH_ACCESS[0]) * latitudeScale,
}));
const line = points.map(({ x, y }) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
const [start, , southTurn, northTurn, end] = points;

export default function BeachWalkMap({ beach, townHall, description }: {
  beach: string;
  townHall: string;
  description: string;
}) {
  return (
    <div className="flex items-center bg-[#f7f4eb] p-2 sm:p-4">
      <svg viewBox="0 0 630 225" role="img" aria-label={description} className="block w-full" data-beach-walk>
        <path fill="#f3dfb3" d="M0 0h79l22 225H0z" />
        <path fill="#a8dcd9" d="M0 0h26q8 65 4 111t12 114H0z" />
        <g fill="none" stroke="#fff" strokeWidth="13">
          <path d="M196 -10l35 245" />
          <path d="M-5 124L657 -5M216 183l441-91M268 -10l52 245" />
        </g>
        <g fill="#d9dfce" stroke="#c8cfbc" strokeWidth="1.5">
          <path d="M227 91l42-8 8 41-42 8z" />
        </g>
        <polyline points={line} fill="none" stroke="white" strokeWidth="12" strokeLinejoin="round" />
        <polyline points={line} fill="none" stroke="#2855a6" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" data-owner-path />
        <path d="M-5 -5l6 5-6 5" transform={`translate(${(northTurn.x + end.x) / 2} ${(northTurn.y + end.y) / 2}) rotate(169)`} stroke="#2855a6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <g fill="white" stroke="#2855a6" strokeWidth="3">
          <circle cx={southTurn.x} cy={southTurn.y} r="4" />
          <circle cx={northTurn.x} cy={northTurn.y} r="4" />
        </g>
        <circle cx={start.x} cy={start.y} r="8" fill="#1e3657" stroke="white" strokeWidth="3" />
        <circle cx={end.x} cy={end.y} r="8" fill="#007f7b" stroke="white" strokeWidth="3" />
        <g fill="#24394b" fontSize="20" fontWeight="650" paintOrder="stroke" stroke="#f7f4eb" strokeWidth="4" strokeLinejoin="round">
          <text x={start.x + 8} y={start.y - 17} textAnchor="end">ScaleaStay · 11</text>
          <text x={end.x - 20} y={end.y + 32}>{beach}</text>
          <text x="255" y="47" textAnchor="middle">{townHall}</text>
        </g>
        <path d="M254 53l-2 15m-3 12-2 15" fill="none" stroke="#75846d" strokeWidth="1.5" />
        <text x="219" y="212" textAnchor="middle" fill="#536155" fontSize="16">Corso Mediterraneo</text>
      </svg>
    </div>
  );
}
