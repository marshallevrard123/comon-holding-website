import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Calendar, ChevronDown } from 'lucide-react'
import Emblem from './Emblem'
import styles from './Navbar.module.css'

const FILIALES = [
  { slug: 'services',   name: "Com'on Services",   sector: "Commerce & Services",        logo: '/logos/services.png',    bg: '#F4F4F4' },
  { slug: 'sigeced',    name: "SIGECED",            sector: "Génie Civil · BTP",          logo: '/logos/sigeced.png',     bg: '#FFF4EC' },
  { slug: 'assurances', name: "Com'on Assurances",  sector: "Assurance",                  logo: '/logos/assurances.png',  bg: '#FFF0F0' },
  { slug: 'vati-co',    name: "Vati&Co",            sector: "Média d'investigation",      logo: '/logos/vati-co.png',     bg: '#071433', dark: true },
  { slug: 'agro',       name: "Com'on Agro",        sector: "Agro-industrie",             logo: '/logos/agro.png',        bg: '#F0F7EE' },
  { slug: 'distri-agri',name: "Com'on Distri Agri", sector: "Distribution Agricole",      logo: '/logos/distri-agri.png', bg: '#0A1F0A', dark: true },
  { slug: 'cmet',       name: "CMET",               sector: "Santé · Clinique Médicale",  logo: '/logos/cmet.png',        bg: '#D6EAF8' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [dropOpen, setDropOpen]   = useState(false)
  const [dateStr, setDateStr]     = useState('')
  const location  = useLocation()
  const dropRef   = useRef(null)

  const isHome = location.pathname === '/'
  const isDark = isHome && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false); setDropOpen(false) }, [location])

  // Ferme le dropdown si clic en dehors
  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    const update = () => {
      const str = new Date().toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })
      setDateStr(str.charAt(0).toUpperCase() + str.slice(1))
    }
    update()
    const t = setInterval(update, 60000)
    return () => clearInterval(t)
  }, [])

  const navLinks = [
    { to: '/',         label: 'Accueil' },
    { to: '/#equipe',  label: 'Direction' },
    { to: '/#contact', label: 'Contact' },
  ]

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${isDark ? styles.dark : ''}`}
      initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className={styles.inner}>

        {/* Logo */}
        <Link to="/" className={styles.brand}>
          <Emblem size={38} color={isDark ? '#B22222' : '#8B1A1A'} />
          <div className={styles.brandText}>
            <span className={styles.brandTop}>Com'on</span>
            <span className={styles.brandBottom}>Holding</span>
          </div>
        </Link>

        {/* Date */}
        {dateStr && (
          <motion.div className={`${styles.dateBadge} ${isDark ? styles.dateBadgeDark : ''}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <Calendar size={11} /><span>{dateStr}</span>
          </motion.div>
        )}

        {/* Desktop nav */}
        <ul className={styles.links}>
          {navLinks.map(l => (
            <li key={l.to}>
              <a href={l.to} className={styles.link}>{l.label}</a>
            </li>
          ))}

          {/* Dropdown Filiales */}
          <li ref={dropRef} className={styles.dropItem}>
            <button
              className={`${styles.link} ${styles.dropTrigger} ${isDark ? styles.dropTriggerDark : ''}`}
              onClick={() => setDropOpen(o => !o)}
              aria-expanded={dropOpen}>
              Nos Filiales <ChevronDown size={13} className={`${styles.chevron} ${dropOpen ? styles.chevronOpen : ''}`} />
            </button>

            <AnimatePresence>
              {dropOpen && (
                <motion.div
                  className={styles.dropdown}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}>
                  <div className={styles.dropGrid}>
                    {FILIALES.map(f => (
                      <Link key={f.slug} to={`/${f.slug}`} className={styles.dropCard} style={{ background: f.bg }}>
                        <div className={styles.dropLogoWrap}>
                          <img src={f.logo} alt={f.name} className={styles.dropLogo} />
                        </div>
                        <div className={styles.dropInfo}>
                          <span className={styles.dropName} style={f.dark ? { color: '#fff' } : {}}>{f.name}</span>
                          <span className={styles.dropSector} style={f.dark ? { color: 'rgba(255,255,255,0.5)' } : {}}>{f.sector}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          <li>
            <a href="/#contact" className={`btn btn-outline ${styles.ctaBtn}`}>Nous contacter</a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button className={styles.toggle} onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
            {navLinks.map(l => (
              <a key={l.to} href={l.to} className={styles.mobileLink}>{l.label}</a>
            ))}
            <div className={styles.mobileSep}>Nos Filiales</div>
            {FILIALES.map(f => (
              <Link key={f.slug} to={`/${f.slug}`} className={styles.mobileLink}>
                {f.name} <span className={styles.mobileSector}>— {f.sector}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
