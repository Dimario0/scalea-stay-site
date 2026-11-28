import { BEACH_ACCESS, BEACH_WALK_POINTS } from '../content/beachWalk';

// North is up. At this scale a local projection preserves the turns and relative distances.
const latitudeScale = 111_320 * 1.1;
const longitudeScale = latitudeScale * Math.cos(BEACH_ACCESS[0] * Math.PI / 180);
const points = BEACH_WALK_POINTS.map(([lat, lon]) => ({
  x: 74 + (lon - BEACH_ACCESS[1]) * longitudeScale,
  y: 108 - (lat - BEACH_ACCESS[0]) * latitudeScale,
}));
const line = points.map(({ x, y }) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
const [start, fiumeLaoTurn, seaTurn, townHallJunction, end] = points;
const arrowAngle = Math.atan2(townHallJunction.y - seaTurn.y, townHallJunction.x - seaTurn.x) * 180 / Math.PI;

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
          <path d="M184 -10l35 245M504 -10l69 245" />
          <path d="M-5 117L642 43" />
        </g>
        <g fill="#d9dfce" stroke="#c8cfbc" strokeWidth="1.5">
          <path d="M239 104l41-5 5 31-41 5z" />
        </g>
        <polyline points={line} fill="none" stroke="white" strokeWidth="12" strokeLinejoin="round" />
        <polyline points={line} fill="none" stroke="#2855a6" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" data-owner-path />
        <path d="M-5 -5l6 5-6 5" transform={`translate(${(seaTurn.x + townHallJunction.x) / 2} ${(seaTurn.y + townHallJunction.y) / 2}) rotate(${arrowAngle})`} stroke="#2855a6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <g fill="white" stroke="#2855a6" strokeWidth="3">
          <circle cx={fiumeLaoTurn.x} cy={fiumeLaoTurn.y} r="4" />
          <circle cx={seaTurn.x} cy={seaTurn.y} r="4" />
        </g>
        <circle cx={start.x} cy={start.y} r="8" fill="#1e3657" stroke="white" strokeWidth="3" />
        <circle cx={end.x} cy={end.y} r="8" fill="#007f7b" stroke="white" strokeWidth="3" />
        <g fill="#24394b" fontSize="20" fontWeight="650" paintOrder="stroke" stroke="#f7f4eb" strokeWidth="4" strokeLinejoin="round">
          <text x={start.x + 20} y={start.y + 36} textAnchor="end">ScaleaStay · 11</text>
          <text x={end.x - 20} y={end.y + 32}>{beach}</text>
          <text x="265" y="157" textAnchor="middle">{townHall}</text>
        </g>
        <g textAnchor="middle" fill="#44594e" fontSize="17">
          <text x="191" y="201">Corso Mediterraneo</text>
          <text x="365" y="53" transform="rotate(-6 365 53)">Viale Fazio degli Uberti</text>
        </g>
      </svg>
    </div>
  );
}
