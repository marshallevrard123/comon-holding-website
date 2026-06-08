import styles from './FloatingParticles.module.css'

/* Positions déterministes (pas de Math.random pour éviter les re-renders) */
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  size:     1.5 + (i % 3) * 1.2,
  x:        (i * 37 + 13) % 100,
  y:        (i * 53 + 7)  % 100,
  duration: 14 + (i * 7)  % 18,
  delay:    -((i * 11)    % 24),
  opacity:  0.04 + (i % 6) * 0.025,
  drift:    (i % 2 === 0 ? 1 : -1) * (8 + (i % 4) * 4),
}))

export default function FloatingParticles({ color = 'rgba(255,255,255,0.8)' }) {
  return (
    <div className={styles.wrap} aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={styles.particle}
          style={{
            width:  p.size,
            height: p.size,
            left:   `${p.x}%`,
            top:    `${p.y}%`,
            background: color,
            opacity: p.opacity,
            animationDuration:  `${p.duration}s`,
            animationDelay:     `${p.delay}s`,
            '--drift': `${p.drift}px`,
          }}
        />
      ))}
    </div>
  )
}
