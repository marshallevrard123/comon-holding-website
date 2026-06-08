import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  Stethoscope, Baby, Eye, FlaskConical, Brain, Bone,
  Smile, Heart, Activity, Microscope, Thermometer, Calendar, ChevronRight,
} from 'lucide-react'
import styles from './Specialites.module.css'
import SEO from '../../components/SEO'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
}

const SPECIALITES = [
  {
    icon: Stethoscope,
    titre: `Médecine Générale`,
    color: 'bleu',
    desc: `Consultation, diagnostic et suivi médical pour toutes pathologies courantes. Service disponible 24h/24, 7j/7 pour les urgences.`,
    actes: [`Consultation générale`, `Suivi de maladies chroniques`, `Bilans de santé`, `Médecine préventive`, `Certificats médicaux`],
  },
  {
    icon: Baby,
    titre: `Gynécologie-Obstétrique`,
    color: 'rose',
    desc: `Prise en charge complète de la santé féminine, de la grossesse à l'accouchement. Service de maternité en cours de rénovation.`,
    actes: [`Consultations gynécologiques`, `Suivi de grossesse`, `Échographies obstétricales`, `Accouchement`, `Soins post-nataux`],
  },
  {
    icon: Bone,
    titre: `Chirurgie Générale & Pédiatrique`,
    color: 'bleu',
    badge: `Bientôt`,
    desc: `Interventions chirurgicales générales et pédiatriques. Bloc opératoire en cours d'équipement pour les actes programmés et urgences chirurgicales.`,
    actes: [`Chirurgie générale`, `Chirurgie pédiatrique`, `Traumatologie`, `Chirurgie digestive`, `Petite chirurgie ambulatoire`],
  },
  {
    icon: Heart,
    titre: `Cardiologie`,
    color: 'rose',
    desc: `Diagnostic et suivi des affections cardiovasculaires. Électrocardiogramme et bilan cardiologique complet disponibles.`,
    actes: [`Électrocardiogramme (ECG)`, `Bilan cardiovasculaire`, `Suivi hypertension`, `Consultation cardiologique`, `Écho-doppler`],
  },
  {
    icon: Activity,
    titre: `Pédiatrie`,
    color: 'vert',
    desc: `Soins médicaux spécialisés pour les nourrissons, enfants et adolescents. Suivi de croissance et vaccinations.`,
    actes: [`Consultation pédiatrique`, `Suivi de croissance`, `Vaccinations`, `Prise en charge néonatale`, `Urgences pédiatriques`],
  },
  {
    icon: Thermometer,
    titre: `Diabétologie`,
    color: 'vert',
    desc: `Prise en charge du diabète et des maladies métaboliques. Suivi glycémique et éducation thérapeutique du patient.`,
    actes: [`Consultation diabétologique`, `Bilan glycémique`, `Éducation thérapeutique`, `Suivi complications`, `Adaptation traitement`],
  },
  {
    icon: Eye,
    titre: `Ophtalmologie`,
    color: 'bleu',
    desc: `Bilan visuel complet et traitement des pathologies oculaires. Équipement spécialisé pour l'examen et le diagnostic ophtalmologique.`,
    actes: [`Bilan visuel`, `Fond d'œil`, `Mesure de la pression`, `Prescription de lunettes`, `Suivi glaucome`],
  },
  {
    icon: Smile,
    titre: `Cabinet Dentaire`,
    color: 'vert',
    desc: `Soins bucco-dentaires complets dans un cabinet équipé. Du détartrage aux soins complexes, votre santé dentaire entre de bonnes mains.`,
    actes: [`Consultation dentaire`, `Détartrage`, `Soins conservateurs`, `Extractions`, `Radiographie panoramique`],
  },
  {
    icon: Microscope,
    titre: `Laboratoire d'Analyses`,
    color: 'bleu',
    desc: `Analyses biologiques médicales complètes avec résultats rapides. Hématologie, biochimie, microbiologie et parasitologie.`,
    actes: [`Hématologie (NFS)`, `Biochimie sanguine`, `Analyses urinaires`, `Microbiologie`, `Tests sérologiques`, `Bilan prénuptial`],
  },
  {
    icon: Brain,
    titre: `Radiologie & Imagerie`,
    color: 'rose',
    desc: `Plateau d'imagerie médicale complet pour un diagnostic précis. Numérisé pour des résultats rapides et de qualité.`,
    actes: [`Radiographie numérisée`, `Échographie générale`, `Mammographie`, `Panoramique dentaire`, `Radio os & poumon`],
  },
  {
    icon: FlaskConical,
    titre: `Dermatologie`,
    color: 'vert',
    desc: `Diagnostic et traitement des affections cutanées. Consultations dermatologiques spécialisées. *(Suggestion — à confirmer)*`,
    actes: [`Consultation dermatologique`, `Traitement infections cutanées`, `Pathologies chroniques`, `Soins esthétiques médicaux`],
  },
  {
    icon: Baby,
    titre: `Réanimation & Néonatologie`,
    color: 'bleu',
    badge: `Bientôt`,
    desc: `Service en cours d'ouverture. Unité de réanimation adulte et néonatologie pour les soins intensifs nouveau-nés.`,
    actes: [`Réanimation adulte (prochainement)`, `Néonatologie (prochainement)`, `Soins intensifs`],
  },
]

export default function Specialites() {
  const gridRef = useRef(null)
  const inView = useInView(gridRef, { once: true, margin: '-60px' })

  return (
    <div className="page-content">
      <SEO
        title="Spécialités Médicales — CMET Toumodi"
        description="Découvrez toutes les spécialités médicales de la CMET : médecine générale, gynécologie, pédiatrie, cardiologie, chirurgie, diabétologie, ophtalmologie, dentisterie, laboratoire et imagerie médicale à Toumodi."
        slug="/cmet/specialites"
        favicon="/favicon-cmet.ico"
      />
      {/* Header */}
      <section className={styles.pageHero}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="label">Ce que nous traitons</p>
            <div className="divider" />
            <h1>Nos Spécialités Médicales</h1>
            <p className={styles.heroLead}>
              CMET propose une offre médicale complète et pluridisciplinaire pour répondre
              aux besoins de santé de toute la population de Toumodi et de la région du Bélier.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grille spécialités */}
      <section className={`section ${styles.grid}`}>
        <div className="container">
          <motion.div
            ref={gridRef}
            className={styles.specialitesGrid}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          >
            {SPECIALITES.map(({ icon: Icon, titre, color, desc, actes, badge }) => (
              <motion.div
                key={titre}
                className={`${styles.card} ${styles[`card${color.charAt(0).toUpperCase() + color.slice(1)}`]}`}
                variants={fadeUp}
              >
                <div className={styles.cardHeader}>
                  <div className={`${styles.cardIcon} ${styles[`icon${color.charAt(0).toUpperCase() + color.slice(1)}`]}`}>
                    <Icon size={24} />
                  </div>
                  {badge && <span className={`badge badge-vert ${styles.badge}`}>{badge}</span>}
                </div>
                <h3 className={styles.cardTitle}>{titre}</h3>
                <p className={styles.cardDesc}>{desc}</p>
                <ul className={styles.actesList}>
                  {actes.map(a => (
                    <li key={a} className={styles.acteItem}>
                      <span className={styles.acteDot} />
                      {a}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaInner}>
            <h2>Besoin d'une Consultation ?</h2>
            <p>Notre équipe médicale pluridisciplinaire est disponible pour vous. Prenez rendez-vous facilement.</p>
            <div className={styles.ctaBtns}>
              <Link to="/cmet/contact" className="btn btn-white">
                <Calendar size={16} /> Prendre rendez-vous
              </Link>
              <a href="tel:+2250707840220" className={`btn ${styles.ctaPhone}`}>
                07 07 84 02 20
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
