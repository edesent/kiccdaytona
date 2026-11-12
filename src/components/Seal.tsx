/**
 * The church seal, redrawn as clean vector from the one on their flyers and
 * Facebook page: a gold-rimmed green ring with the church name, a crown over
 * a quartered shield (Bible, globe, cross, dove), wheat on both sides, the
 * motto ribbon, Hebrews 12:28,29 and EST. MMXXIII.
 *
 * `uid` must differ for every copy on a page (SVG ids are global).
 * `spin` slowly turns the lettered ring (hero only). `simple` drops the ribbon
 * and small lettering for header-size use.
 */
export default function Seal({
  uid,
  className = "",
  spin = false,
  simple = false,
}: {
  uid: string;
  className?: string;
  spin?: boolean;
  simple?: boolean;
}) {
  const g = `gold-${uid}`;
  const wheat = (side: 1 | -1) => (
    <g transform={`translate(200 0) scale(${side} 1)`} fill={`url(#${g})`}>
      <path d="M-62 318 C-108 296 -122 236 -104 168" fill="none" stroke={`url(#${g})`} strokeWidth="3" strokeLinecap="round" />
      {[
        [-100, 176, -8],
        [-110, 198, -20],
        [-95, 200, 14],
        [-113, 222, -24],
        [-97, 224, 10],
        [-112, 246, -30],
        [-95, 248, 4],
        [-106, 270, -38],
        [-89, 270, -4],
        [-95, 291, -48],
        [-78, 289, -16],
      ].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx="6.5" ry="13" transform={`rotate(${r} ${x} ${y})`} />
      ))}
      <ellipse cx="-103" cy="156" rx="6" ry="13" transform="rotate(8 -103 156)" />
    </g>
  );

  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Seal of Kingdom Impact Christian Center: a crown over a shield with a Bible, a globe, a cross and a dove">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#fbe9ad" />
          <stop offset="0.3" stopColor="#f3d98a" />
          <stop offset="0.6" stopColor="#d2a43a" />
          <stop offset="1" stopColor="#9a7320" />
        </linearGradient>
        <radialGradient id={`in-${uid}`} cx="0.5" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#3a6b4f" />
          <stop offset="0.55" stopColor="#12382a" />
          <stop offset="1" stopColor="#07140e" />
        </radialGradient>
        <path id={`top-${uid}`} d="M200 367 A167 167 0 1 1 200.1 367" />
        <path id={`bot-${uid}`} d="M200 14 A186 186 0 1 0 200.1 14" />
        <clipPath id={`sh-${uid}`}>
          <path d="M138 152 H262 V236 Q262 288 200 308 Q138 288 138 236 Z" />
        </clipPath>
      </defs>

      {/* Rim and lettered ring */}
      <circle cx="200" cy="200" r="198" fill={`url(#${g})`} />
      <circle cx="200" cy="200" r="193" fill="#0c2a1d" />
      <circle cx="200" cy="200" r="158" fill={`url(#${g})`} />
      <circle cx="200" cy="200" r="154" fill={`url(#in-${uid})`} />
      <g className={spin ? "seal-spin" : undefined}>
        <text fill={`url(#${g})`} fontFamily="var(--font-cinzel), serif" fontWeight="800" fontSize="23.5" letterSpacing="1">
          <textPath href={`#top-${uid}`} startOffset="50%" textAnchor="middle" textLength="690" lengthAdjust="spacing">
            KINGDOM IMPACT CHRISTIAN CENTER, INC
          </textPath>
        </text>
        <text fill={`url(#${g})`} fontFamily="var(--font-cinzel), serif" fontWeight="800" fontSize="17">
          <textPath href={`#bot-${uid}`} startOffset="50%" textAnchor="middle" textLength="150" lengthAdjust="spacing">
            EST. MMXXIII
          </textPath>
        </text>
        <circle cx="33" cy="236" r="4" fill={`url(#${g})`} />
        <circle cx="367" cy="236" r="4" fill={`url(#${g})`} />
      </g>

      {/* Light behind the crown */}
      <g opacity="0.5" stroke="#f3d98a" strokeWidth="1.2">
        {Array.from({ length: 13 }, (_, i) => {
          const a = ((-150 + i * 10) * Math.PI) / 180;
          return <line key={i} x1={200 + Math.cos(a) * 58} y1={128 + Math.sin(a) * 58} x2={200 + Math.cos(a) * 150} y2={128 + Math.sin(a) * 150} />;
        })}
      </g>

      {wheat(1)}
      {wheat(-1)}

      {/* Crown */}
      <g>
        <path d="M148 146 L139 96 L170 122 L200 78 L230 122 L261 96 L252 146 Z" fill={`url(#${g})`} stroke="#7a5a17" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="146" y="140" width="108" height="13" rx="2" fill={`url(#${g})`} stroke="#7a5a17" strokeWidth="1.5" />
        {[168, 200, 232].map((x) => (
          <circle key={x} cx={x} cy="134" r="5.5" fill="#1e8a5e" stroke="#fbe9ad" strokeWidth="1.2" />
        ))}
        {[139, 200, 261].map((x, i) => (
          <circle key={x} cx={x} cy={i === 1 ? 76 : 94} r="4" fill={`url(#${g})`} />
        ))}
      </g>

      {/* Quartered shield */}
      <g clipPath={`url(#sh-${uid})`}>
        <rect x="138" y="152" width="62" height="74" fill="#0f3f2b" />
        <rect x="200" y="152" width="62" height="74" fill="#0a0f0c" />
        <rect x="138" y="226" width="62" height="84" fill="#0a0f0c" />
        <rect x="200" y="226" width="62" height="84" fill="#0f3f2b" />
        <rect x="198.5" y="152" width="3" height="160" fill={`url(#${g})`} />
        <rect x="138" y="224.5" width="124" height="3" fill={`url(#${g})`} />
      </g>
      <path d="M138 152 H262 V236 Q262 288 200 308 Q138 288 138 236 Z" fill="none" stroke={`url(#${g})`} strokeWidth="4" strokeLinejoin="round" />

      {/* Bible */}
      <g transform="translate(169 190)">
        <path d="M0 -12 C-8 -17 -17 -17 -24 -13 V13 C-17 9 -8 9 0 14 C8 9 17 9 24 13 V-13 C17 -17 8 -17 0 -12 Z" fill={`url(#${g})`} stroke="#7a1a1a" strokeWidth="1.6" />
        <path d="M0 -12 V14" stroke="#7a5a17" strokeWidth="1.4" />
        <path d="M-19 -8 C-13 -10 -8 -9 -4 -7 M-19 -2 C-13 -4 -8 -3 -4 -1 M-19 4 C-13 2 -8 3 -4 5 M19 -8 C13 -10 8 -9 4 -7 M19 -2 C13 -4 8 -3 4 -1 M19 4 C13 2 8 3 4 5" stroke="#9a7320" strokeWidth="1" fill="none" />
      </g>

      {/* Globe */}
      <g transform="translate(231 189)">
        <circle r="22" fill="#063b33" stroke="#35b79a" strokeWidth="1.6" />
        <path d="M-14 -12 C-8 -17 0 -16 3 -12 C2 -7 -3 -6 -5 -1 C-9 0 -14 -4 -14 -12 Z M-6 3 C-1 2 4 6 3 11 C2 15 -1 18 -3 19 C-5 13 -8 8 -6 3 Z M8 -10 C13 -11 17 -6 17 -1 C15 4 11 5 9 1 C8 -3 6 -6 8 -10 Z" fill="#35b79a" />
      </g>

      {/* Cross */}
      <g transform="translate(169 262)" fill={`url(#${g})`}>
        <rect x="-3.5" y="-24" width="7" height="48" rx="1" />
        <rect x="-16" y="-12" width="32" height="7" rx="1" />
        {[
          [0, -26],
          [0, 26],
          [-18, -8.5],
          [18, -8.5],
        ].map(([x, y], i) => (
          <rect key={i} x={x - 4} y={y - 4} width="8" height="8" transform={`rotate(45 ${x} ${y})`} fill="#1e8a5e" stroke="#f3d98a" strokeWidth="1.2" />
        ))}
      </g>

      {/* Dove with an olive sprig */}
      <g transform="translate(231 258)">
        <path d="M-3 4 C-12 -4 -18 -15 -17 -24 C-9 -20 -3 -13 0 -5 C2 -14 8 -21 17 -24 C19 -14 14 -4 6 3 C11 3 15 1 18 -2 C17 6 11 13 3 15 L-2 26 L-5 15 C-11 14 -15 10 -16 5 C-12 6 -7 6 -3 4 Z" fill="#f7f1e1" stroke="#cdbf98" strokeWidth="0.8" />
        <path d="M18 -2 L26 -5" stroke="#3f9a4f" strokeWidth="1.6" strokeLinecap="round" />
        <ellipse cx="24" cy="-7.5" rx="3.6" ry="1.5" transform="rotate(-30 24 -7.5)" fill="#3f9a4f" />
      </g>

      {!simple && (
        <>
          {/* Motto ribbon */}
          <path d="M52 300 L68 285 H332 L348 300 L332 315 H68 Z" fill="#0c2a1d" stroke={`url(#${g})`} strokeWidth="2.2" strokeLinejoin="round" />
          <text x="200" y="304.6" textAnchor="middle" fill={`url(#${g})`} fontFamily="var(--font-cinzel), serif" fontWeight="800" fontSize="11.2" textLength="252" lengthAdjust="spacing">
            LOVE GOD. LOVE PEOPLE. MAKE AN IMPACT.
          </text>
          <rect x="140" y="322" width="120" height="17" rx="2" fill={`url(#${g})`} />
          <text x="200" y="334.6" textAnchor="middle" fill="#07140e" fontFamily="var(--font-cinzel), serif" fontWeight="800" fontSize="10.5" textLength="100" lengthAdjust="spacing">
            HEBREWS 12:28,29
          </text>
        </>
      )}
    </svg>
  );
}
