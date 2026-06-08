import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * - Si l'URL a un hash (#filiales, #contact…) → scroll vers cette section
 * - Sinon → scroll en haut de page
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Petit délai pour laisser la page se rendre avant de scroller
      const id = hash.replace('#', '')
      const timer = setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
      return () => clearTimeout(timer)
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return null
}
