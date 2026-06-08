import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Heart } from 'lucide-react'
import styles from './CmetFooter.module.css'

const LIENS = [
  { to: '/cmet',             label: 'Accueil' },
  { to: '/cmet/a-propos',    label: 'À Propos' },
  { to: '/cmet/specialites', label: 'Spécialités' },
  { to: '/cmet/equipe',      label: 'Équipe médicale' },
  { to: '/cmet/assurances',  label: 'Assurances' },
  { to: '/cmet/equipements', label: 'Équipements' },
  { to: '/cmet/contact',     label: 'Contact' },
]

const SPECIALITES = [
  `Médecine Générale`, `Gynécologie-Obstétrique`, `Pédiatrie`,
  `Chirurgie Générale`, `Ophtalmologie`, `Cabinet Dentaire`,
  `Cardiologie`, `Radiologie`, `Laboratoire`,
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className="container">
          <div className={styles.grid}>
            {/* Colonne 1 — Brand */}
            <div className={styles.col}>
              <div className={styles.brand}>
                <img src="/logos/cmet.png" alt="CMET" className={styles.brandLogo} />
                <div>
                  <span className={styles.brandName}>CMET</span>
                  <span className={styles.brandSub}>Clinique Médicale Espérance de Toumodi</span>
                </div>
              </div>
              <p className={styles.brandDesc}>
                Établissement privé de santé agréé, au service des populations de Toumodi
                et de la région du Bélier depuis 2011.
              </p>
              <div className={styles.badge}>
                <span className={styles.dot} /> Ouvert 24h/24
              </div>
            </div>

            {/* Colonne 2 — Navigation */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Navigation</h4>
              <ul className={styles.links}>
                {LIENS.map(({ to, label }) => (
                  <li key={to}><Link to={to} className={styles.link}>{label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Colonne 3 — Spécialités */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Nos Spécialités</h4>
              <ul className={styles.links}>
                {SPECIALITES.map(s => (
                  <li key={s}><Link to="/cmet/specialites" className={styles.link}>{s}</Link></li>
                ))}
              </ul>
            </div>

            {/* Colonne 4 — Contact */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Contact</h4>
              <ul className={styles.contactList}>
                <li>
                  <MapPin size={14} />
                  <span>Toumodi, Quartier Kondoubo,<br />Route de Dimbokro, Îlot 21</span>
                </li>
                <li>
                  <Phone size={14} />
                  <span>07 07 84 02 20<br />01 40 68 20 66<br />27 30 62 90 39</span>
                </li>
                <li>
                  <Mail size={14} />
                  <span>cliniquesperancetdi@gmail.com</span>
                </li>
                <li>
                  <Clock size={14} />
                  <div>
                    <strong>Visites Lun–Sam :</strong><br />
                    6h30–7h30 · 12h30–13h30 · 18h30–19h30
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p>© {new Date().getFullYear()} CMET — Clinique Médicale Espérance Toumodi SARL. Tous droits réservés.</p>
            <p className={styles.holding}>
              Membre de <strong>COM'ON Holding</strong>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
