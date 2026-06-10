// Emblème SVG — reproduction fidèle du logo COM'ON Holding
// 8 pétales (4 cardinaux + 4 diagonaux) + points terminaux + petits points inter-pétales + centre
export default function Emblem({ size = 60, color = '#8B1A1A' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g fill={color}>
        {/* Centre */}
        <circle cx="50" cy="50" r="5.5" />

        {/* Pétales cardinaux — plus larges et arrondis */}
        <ellipse cx="50" cy="21"  rx="10"  ry="14.5" />
        <ellipse cx="50" cy="79"  rx="10"  ry="14.5" />
        <ellipse cx="21" cy="50"  rx="14.5" ry="10"  />
        <ellipse cx="79" cy="50"  rx="14.5" ry="10"  />

        {/* Pétales diagonaux */}
        <ellipse cx="28" cy="28"  rx="8"  ry="12" transform="rotate(45 28 28)"   />
        <ellipse cx="72" cy="28"  rx="8"  ry="12" transform="rotate(-45 72 28)"  />
        <ellipse cx="28" cy="72"  rx="8"  ry="12" transform="rotate(-45 28 72)"  />
        <ellipse cx="72" cy="72"  rx="8"  ry="12" transform="rotate(45 72 72)"   />

        {/* Points terminaux cardinaux */}
        <circle cx="50" cy="9"  r="4.5" />
        <circle cx="50" cy="91" r="4.5" />
        <circle cx="9"  cy="50" r="4.5" />
        <circle cx="91" cy="50" r="4.5" />

        {/* Petits points inter-pétales (entre chaque paire de pétales adjacents) */}
        <circle cx="65" cy="14"  r="2.8" />
        <circle cx="86" cy="35"  r="2.8" />
        <circle cx="86" cy="65"  r="2.8" />
        <circle cx="65" cy="86"  r="2.8" />
        <circle cx="35" cy="86"  r="2.8" />
        <circle cx="14" cy="65"  r="2.8" />
        <circle cx="14" cy="35"  r="2.8" />
        <circle cx="35" cy="14"  r="2.8" />
      </g>
    </svg>
  )
}
