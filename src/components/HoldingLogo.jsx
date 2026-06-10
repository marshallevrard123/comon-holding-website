/**
 * HoldingLogo — Reproduction fidèle du logo officiel COM'ON Holding
 *
 * Disposition :
 *   [COM'ON    ] [●]   ← gris #777576, Bebas Neue  +  emblème rouge
 *   [  HOLDING    ]   ← rouge #912839, Playfair Display
 *
 * Props :
 *   height  — hauteur cible en px (le SVG s'adapte proportionnellement)
 *   dark    — true quand le fond est sombre (COM'ON passe en blanc)
 */
export default function HoldingLogo({ height = 48, dark = false }) {
  const comonColor   = dark ? '#FFFFFF' : '#777576'
  const holdingColor = '#912839'
  const emblemColor  = '#912839'

  // viewBox : 480 × 195
  const vW = 480
  const vH = 195
  const width = (height / vH) * vW

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${vW} ${vH}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="COM'ON Holding"
      role="img"
    >
      {/* ── COM'ON ── */}
      <text
        x="6"
        y="95"
        fontFamily="'Bebas Neue', 'Impact', 'Arial Black', sans-serif"
        fontSize="96"
        letterSpacing="4"
        fill={comonColor}
      >
        COM&apos;ON
      </text>

      {/* ── Emblème ── */}
      <g transform="translate(298, 2) scale(0.90)" fill={emblemColor}>
        <circle cx="50" cy="50" r="6.5" />
        {/* Pétales cardinaux */}
        <ellipse cx="50" cy="20" rx="8.5" ry="13" />
        <ellipse cx="50" cy="80" rx="8.5" ry="13" />
        <ellipse cx="20" cy="50" rx="13"  ry="8.5" />
        <ellipse cx="80" cy="50" rx="13"  ry="8.5" />
        {/* Pétales diagonaux */}
        <ellipse cx="27" cy="27" rx="7.5" ry="11" transform="rotate(45 27 27)"   />
        <ellipse cx="73" cy="27" rx="7.5" ry="11" transform="rotate(-45 73 27)"  />
        <ellipse cx="27" cy="73" rx="7.5" ry="11" transform="rotate(-45 27 73)"  />
        <ellipse cx="73" cy="73" rx="7.5" ry="11" transform="rotate(45 73 73)"   />
        {/* Pointes */}
        <circle cx="50" cy="10" r="4.5" />
        <circle cx="50" cy="90" r="4.5" />
        <circle cx="10" cy="50" r="4.5" />
        <circle cx="90" cy="50" r="4.5" />
      </g>

      {/* ── HOLDING ── */}
      <text
        x="2"
        y="188"
        fontFamily="'Playfair Display', 'Georgia', serif"
        fontSize="82"
        fontWeight="400"
        letterSpacing="10"
        fill={holdingColor}
      >
        HOLDING
      </text>
    </svg>
  )
}
