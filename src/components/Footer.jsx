import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const filiales = [
  { label: "Com'on Assurances", to: '/assurances' },
  { label: "Vati&Co", to: '/vati-co' },
  { label: "Com'on Services", to: '/services' },
  { label: "Com'on Distri Agri", to: '/distri-agri' },
  { label: "Com'on Agro", to: '/agro' },
  { label: "SIGECED", to: '/sigeced' },
  { label: "CMET", to: '/cmet' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.brandRow}>
            <img src="/logos/emblem-clean.png" alt="" className={styles.brandEmblem} aria-hidden="true" />
            <div className={styles.brandText}>
              <span className={styles.brandName}>Com'on</span>
              <span className={styles.brandSub}>Holding</span>
            </div>
          </div>
          <p className={styles.tagline}>
            Groupe ivoirien · Innovation · Excellence · Développement
          </p>
        </div>

        {/* Filiales */}
        <div>
          <h4 className={styles.colTitle}>Nos Filiales</h4>
          <ul className={styles.list}>
            {filiales.map(f => (
              <li key={f.to}>
                <Link to={f.to} className={styles.footerLink}>{f.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <h4 className={styles.colTitle}>Navigation</h4>
          <ul className={styles.list}>
            <li><a href="/" className={styles.footerLink}>Accueil</a></li>
            <li><a href="/#apropos" className={styles.footerLink}>Le Groupe</a></li>
            <li><a href="/#equipe" className={styles.footerLink}>Direction</a></li>
            <li><a href="/#contact" className={styles.footerLink}>Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className={styles.colTitle}>Contact</h4>
          <address className={styles.address}>
            <p>Abidjan, Côte d'Ivoire</p>
            <a href="mailto:contact@comon-holding.ci" className={styles.footerLink}>
              contact@comon-holding.ci
            </a>
          </address>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <span>© {new Date().getFullYear()} COM'ON Holding — Tous droits réservés</span>
          <span>Abidjan, Côte d'Ivoire 🇨🇮</span>
        </div>
      </div>
    </footer>
  )
}
