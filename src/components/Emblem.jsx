// Emblème SVG fidèle au logo COM'ON Holding
export default function Emblem({ size = 60, color = '#8B1A1A' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g fill={color}>
        <circle cx="50" cy="50" r="6.5" />
        {/* Pétales cardinaux */}
        <ellipse cx="50" cy="20" rx="8.5" ry="13" />
        <ellipse cx="50" cy="80" rx="8.5" ry="13" />
        <ellipse cx="20" cy="50" rx="13" ry="8.5" />
        <ellipse cx="80" cy="50" rx="13" ry="8.5" />
        {/* Pétales diagonaux */}
        <ellipse cx="27" cy="27" rx="7.5" ry="11" transform="rotate(45 27 27)" />
        <ellipse cx="73" cy="27" rx="7.5" ry="11" transform="rotate(-45 73 27)" />
        <ellipse cx="27" cy="73" rx="7.5" ry="11" transform="rotate(-45 27 73)" />
        <ellipse cx="73" cy="73" rx="7.5" ry="11" transform="rotate(45 73 73)" />
        {/* Points terminaux */}
        <circle cx="50" cy="10" r="4.5" />
        <circle cx="50" cy="90" r="4.5" />
        <circle cx="10" cy="50" r="4.5" />
        <circle cx="90" cy="50" r="4.5" />
      </g>
    </svg>
  )
}
