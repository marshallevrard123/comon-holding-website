import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Phone, Menu, X, Calendar, ChevronLeft } from 'lucide-react'
import styles from './CmetNavbar.module.css'

const LIENS = [
  { to: '/cmet',             label: 'Accueil' },
  { to: '/cmet/a-propos',    label: 'À Propos' },
  { to: '/cmet/specialites', label: 'Spécialités' },
  { to: '/cmet/equipe',      label: 'Équipe' },
  { to: '/cmet/assurances',  label: 'Assurances' },
  { to: '/cmet/equipements', label: 'Équipements' },
  { to: '/cmet/contact',     label: 'Contact' },
]

export default function CmetNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      {/* Barre supérieure urgences + retour holding */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <Link to="/" className={styles.backHolding}>
            <ChevronLeft size={13} /> Com'on Holding
          </Link>
          <span className={styles.topBarItem}>
            <span className={styles.dot} /> Ouvert 24h/24
          </span>
          <span className={styles.topBarItem}>
            <Phone size={12} /> Urgences : <strong>07 07 84 02 20</strong>
          </span>
          <span className={styles.topBarItem}>
            Toumodi, Quartier Kondoubo
          </span>
        </div>
      </div>

      {/* Navigation principale */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          {/* Logo / Marque */}
          <Link to="/cmet" className={styles.brand}>
            <img src="/logos/cmet.png" alt="CMET" className={styles.brandLogo} />
            <div className={styles.brandText}>
              <span className={styles.brandName}>CMET</span>
              <span className={styles.brandSub}>Clinique Médicale Espérance de Toumodi</span>
            </div>
          </Link>

          {/* Liens desktop */}
          <ul className={styles.links}>
            {LIENS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/cmet'}
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.linkActive : ''}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link to="/cmet/contact" className={`btn btn-primary ${styles.ctaBtn}`}>
            <Calendar size={15} /> Rendez-vous
          </Link>

          {/* Burger mobile */}
          <button
            className={styles.burger}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileLinks}>
            {LIENS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/cmet'}
                  className={({ isActive }) =>
                    `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className={styles.mobileCta}>
            <Link to="/cmet/contact" className="btn btn-primary">
              <Calendar size={15} /> Prendre rendez-vous
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
