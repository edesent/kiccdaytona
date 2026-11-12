import { places, type Place } from "@/lib/site";
import { nowInChurch } from "@/lib/schedule";

/**
 * A map of Daytona Beach in the seal's colours. The base (water and streets)
 * is the static file public/map/daytona-beach.svg, drawn from U.S. Census
 * map data by scripts/mkmap.py. The pins and labels are drawn here on top,
 * from `places` in site.ts, using the same projection as the script.
 */
const LON0 = -81.1;
const LAT0 = 29.17;
const LON1 = -80.98;
const LAT1 = 29.3;
const W = 600;
const H = 745;
const xy = (p: Place) => [((p.lon - LON0) / (LON1 - LON0)) * W, ((LAT1 - p.lat) / (LAT1 - LAT0)) * H] as const;

export function livePlaces() {
  const today = nowInChurch().date;
  return places.filter((p) => !p.endsOn || p.endsOn >= today);
}

export default function KiccMap({ className = "" }: { className?: string }) {
  const list = livePlaces();
  return (
    <div className={`relative overflow-hidden rounded-sm bg-forest-2 ring-[3px] ring-gold shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/map/daytona-beach.svg" alt="" width={W} height={H} className="block h-auto w-full" />
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" role="img" aria-label={`Map of Daytona Beach and Ormond Beach showing where Kingdom Impact gathers: ${list.map((p) => `${p.title}, ${p.where}`).join("; ")}.`}>
        <defs>
          <linearGradient id="pin-gold" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0" stopColor="#fbe9ad" />
            <stop offset="0.55" stopColor="#d2a43a" />
            <stop offset="1" stopColor="#9a7320" />
          </linearGradient>
          <radialGradient id="map-vignette" cx="0.5" cy="0.5" r="0.75">
            <stop offset="0.55" stopColor="#07140e" stopOpacity="0" />
            <stop offset="1" stopColor="#07140e" stopOpacity="0.75" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="url(#map-vignette)" />

        {/* Labels */}
        <g fontFamily="var(--font-cinzel), serif" fontWeight="700" fill="#f3d98a">
          <text x="505" y="330" fontSize="17" letterSpacing="7" opacity="0.55" transform="rotate(70 505 330)" textAnchor="middle">
            ATLANTIC OCEAN
          </text>
          <text x="118" y="92" fontSize="13" letterSpacing="4" opacity="0.9">
            ORMOND BEACH
          </text>
          <text x="52" y="648" fontSize="15" letterSpacing="5" opacity="0.95">
            DAYTONA BEACH
          </text>
          <text x="30" y="560" fontSize="9" letterSpacing="2" opacity="0.8" transform="rotate(72 30 560)">
            I-95
          </text>
        </g>

        {/* Compass */}
        <g transform="translate(548 60)" fill="none" stroke="#f3d98a" strokeWidth="1.2">
          <circle r="20" opacity="0.6" />
          <path d="M0 -15 L5 0 L0 15 L-5 0 Z" fill="url(#pin-gold)" stroke="none" />
          <text y="-25" textAnchor="middle" fontSize="10" fontFamily="var(--font-cinzel), serif" fontWeight="800" fill="#f3d98a" stroke="none">
            N
          </text>
        </g>

        {/* Pins */}
        {list.map((p, i) => {
          const [x, y] = xy(p);
          return (
            <g key={p.id} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
              <circle r="15" fill="#f3d98a" opacity="0.18">
                <animate attributeName="r" values="12;26;12" dur="3.2s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0;0.3" dur="3.2s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
              </circle>
              <path d="M0 0 C-4 -12 -17 -17 -17 -31 A17 17 0 1 1 17 -31 C17 -17 4 -12 0 0 Z" fill="url(#pin-gold)" stroke="#07140e" strokeWidth="1.5" />
              <circle cy="-31" r="11" fill="#0c2a1d" stroke="#fbe9ad" strokeWidth="1" />
              {p.home ? (
                <path d="M-7 -26 L-8 -36 L-3.5 -32 L0 -38 L3.5 -32 L8 -36 L7 -26 Z" fill="url(#pin-gold)" />
              ) : (
                <text y="-26.5" textAnchor="middle" fontSize="13" fontWeight="800" fill="#f3d98a" fontFamily="var(--font-figtree), sans-serif">
                  {i + 1}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
