import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Microscope, Monitor, Zap, Eye, Smile, Activity, ChevronRight } from 'lucide-react'
import styles from './Equipements.module.css'
import SEO from '../../components/SEO'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

const EQUIPEMENTS = [
  {
    icon: Smile,
    titre: `Odontologie`,
    color: 'vert',
    img: `/images/equipements/dentaire-1.jpg`,
    desc: `Notre service d'odontologie dispose d'un plateau technique complet pour la prise en charge de toutes les pathologies bucco-dentaires, des soins conservateurs aux extractions chirurgicales.`,
    liste: [`Fauteuil dentaire avec unit intégré`, `Instrumentation complète multi-actes`, `Éclairage opératoire LED`, `Matériel de stérilisation`, `Soins conservateurs & chirurgie dentaire`],
  },
  {
    icon: Eye,
    titre: `Équipement Ophtalmologique`,
    color: 'bleu',
    img: `/images/equipements/ophtalmologie-1.jpg`,
    desc: `Plateau ophtalmologique spécialisé avec lampe à fente binoculaire et tonomètre pour l'examen complet de la vision et le dépistage des pathologies oculaires.`,
    liste: [`Lampe à fente binoculaire`, `Tonomètre à aplanation`, `Kératomètre automatique`, `Fond d'œil`, `Dépistage glaucome`],
  },
  {
    icon: Activity,
    titre: `Cardiologie — ECG`,
    color: 'vert',
    img: `/images/equipements/ecg.jpg`,
    desc: `Électrocardiographe numérique 12 dérivations pour le diagnostic des affections cardiaques et le suivi de l'hypertension artérielle.`,
    liste: [`ECG numérique 12 dérivations`, `Impression automatique`, `Suivi hypertension`, `Bilan cardiovasculaire`, `Monitoring patient`],
  },
  {
    icon: Monitor,
    titre: `Échographie — Imagerie`,
    color: 'bleu',
    img: `/images/equipements/echographe.jpg`,
    desc: `Échographe Mindray portable haute résolution pour les examens obstétricaux, gynécologiques et abdominaux.`,
    liste: [`Échographe Mindray portable`, `Échographie obstétricale`, `Échographie abdominale`, `Doppler vasculaire`, `Impression des clichés`],
  },
  {
    icon: Zap,
    titre: `Radiologie — Salle d'imagerie`,
    color: 'vert',
    img: `/images/equipements/radiologie-1.jpg`,
    desc: `Salle de radiologie équipée d'un appareil de radiographie standard et d'un mammographe pour le dépistage du cancer du sein.`,
    liste: [`Appareil de radiographie standard`, `Mammographe`, `Radio os & poumon`, `Radio obstétricale`, `Numérisation des clichés`],
  },
  {
    icon: Microscope,
    titre: `Radiologie — Panoramique`,
    color: 'bleu',
    img: `/images/equipements/radiologie-2.jpg`,
    desc: `Unité de traitement radiologique avec panoramique dentaire, développeur automatique Profect et système d'archivage numérique des clichés.`,
    liste: [`Panoramique dentaire`, `Développeur automatique Profect`, `Archivage numérique`, `Imprimante radiologique`, `Numérisation CR`],
  },
  {
    icon: Zap,
    titre: `Radiologie — Console de commande`,
    color: 'vert',
    img: `/images/equipements/radiologie-console.jpg`,
    desc: `Poste de commande de la salle de radiologie avec console de pilotage, écran de visualisation et système informatique d'interprétation des clichés.`,
    liste: [`Console de commande radiologie`, `Écran de visualisation`, `Poste informatique dédié`, `Pilotage à distance`, `Gestion des expositions`],
  },
]

export default function Equipements() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div className="page-content">
      <SEO
        title="Équipements Médicaux — CMET Toumodi"
        description="La CMET dispose d'un plateau technique moderne : imagerie médicale numérisée, laboratoire d'analyses, échographe, ECG, mammographe et bloc opératoire en cours d'équipement à Toumodi."
        slug="/cmet/equipements"
        favicon="/favicon-cmet.ico"
      />
      <section className={styles.pageHero}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="label">Nos installations</p>
            <div className="divider" />
            <h1>Équipements Médicaux</h1>
            <p className={styles.heroLead}>
              CMET investit en permanence dans des équipements médicaux modernes pour offrir
              des soins de qualité, des diagnostics précis et un suivi efficace à ses patients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className={`section ${styles.intro}`}>
        <div className="container">
          <div className={styles.introGrid}>
            <div>
              <p className="label">Notre plateau technique</p>
              <div className="divider" />
              <h2>Un Plateau Technique en Constante Évolution</h2>
              <p style={{ marginTop: '20px', marginBottom: '16px' }}>
                CMET dispose d'un plateau technique diversifié couvrant les principales disciplines
                médicales : imagerie, laboratoire, ophtalmologie, odontologie et chirurgie.
              </p>
              <p>
                Dans le cadre de sa modernisation et de son projet de nouvelle clinique,
                CMET prévoit d'intégrer de nouveaux équipements pour les unités de réanimation,
                néonatologie et hémodialyse prochainement.
              </p>
            </div>
            <div className={styles.introImgs}>
              <img src="/images/accueil-reception.jpg" alt="CMET installations" className={styles.introImg1} />
              <img src="/images/zone-attente.jpg" alt="Future clinique" className={styles.introImg2} />
            </div>
          </div>
        </div>
      </section>

      {/* Grille équipements */}
      <section className={`section ${styles.grid}`}>
        <div className="container">
          <div className="section-header">
            <p className="label">Nos équipements</p>
            <div className="divider divider-center" />
            <h2>Matériel Médical Disponible</h2>
          </div>
          <motion.div
            ref={ref}
            className={styles.equipGrid}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {EQUIPEMENTS.map(({ icon: Icon, titre, color, img, desc, liste }) => (
              <motion.div key={titre} className={styles.equipCard} variants={fadeUp}>
                <div className={styles.equipImg}>
                  <img src={img} alt={titre} />
                  <div className={`${styles.equipImgBadge} ${styles[`badge${color.charAt(0).toUpperCase() + color.slice(1)}`]}`}>
                    <Icon size={18} />
                  </div>
                </div>
                <div className={styles.equipBody}>
                  <h3 className={styles.equipTitle}>{titre}</h3>
                  <p className={styles.equipDesc}>{desc}</p>
                  <ul className={styles.equipListe}>
                    {liste.map(item => (
                      <li key={item} className={styles.equipItem}>
                        <span className={styles.equipDot} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Future */}
      <section className={`section ${styles.future}`}>
        <div className="container">
          <div className={styles.futureCard}>
            <div className={styles.futureText}>
              <p className="label" style={{ color: 'rgba(255,255,255,0.7)' }}>Bientôt</p>
              <h2 style={{ color: '#fff', marginTop: '8px' }}>Prochains Équipements</h2>
              <p style={{ color: 'rgba(255,255,255,0.72)', marginTop: '16px', lineHeight: '1.75' }}>
                Dans le cadre du projet de modernisation de CMET, de nouveaux équipements
                seront intégrés pour les services de réanimation, néonatologie et hémodialyse.
              </p>
              <ul style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[`Unité de réanimation complète`, `Couveuses et matériel néonatologie`, `Générateurs hémodialyse`, `Scanner / IRM (perspectives)`, `Système information hospitalier numérique`].map(s => (
                  <li key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.75)' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#86EFAC', flexShrink: 0 }} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.futureImg}>
              <img src="/images/vue-aerienne.jpg" alt="Future clinique CMET" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '56px 0', background: 'var(--gris-clair)' }}>
        <p className="label" style={{ justifyContent: 'center' }}>Des questions ?</p>
        <h2 style={{ marginBottom: '16px' }}>Besoin d'un Examen ou d'une Analyse ?</h2>
        <p style={{ maxWidth: '480px', margin: '0 auto 28px' }}>Prenez rendez-vous ou contactez notre équipe pour toute demande d'information sur nos équipements.</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/cmet/contact" className="btn btn-primary">
            Prendre rendez-vous <ChevronRight size={15} />
          </Link>
          <a href="tel:+2250707840220" className="btn btn-outline">Appeler la clinique</a>
        </div>
      </div>
    </div>
  )
}
