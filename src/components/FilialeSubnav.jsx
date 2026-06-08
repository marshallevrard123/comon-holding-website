import { useState, useEffect } from 'react'
import styles from './FilialeSubnav.module.css'

export default function FilialeSubnav({ sections, primaryColor }) {
  const [active, setActive] = useState(sections[0]?.id || '')

  // Détecte la section active
  useEffect(() => {
    const observers = []
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [sections])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (!sections.length) return null

  return (
    <div className={styles.subnav}>
      <div className={styles.inner}>
        {sections.map((s) => (
          <button
            key={s.id}
            className={`${styles.tab} ${active === s.id ? styles.tabActive : ''}`}
            style={active === s.id ? { color: primaryColor, borderBottomColor: primaryColor } : {}}
            onClick={() => scrollTo(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}
