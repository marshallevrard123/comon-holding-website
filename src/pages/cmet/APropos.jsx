import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, Target, Eye, Heart, TrendingUp, Users, Award } from 'lucide-react'
import styles from './APropos.module.css'
import SEO from '../../components/SEO'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
}

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className} initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay } } }}>
      {children}
    </motion.div>
  )
}

const TIMELINE = [
  { annee: '2011', titre: `Création de la Clinique`, desc: `La Clinique Médicale Espérance démarre ses activités à Toumodi en tant qu'entreprise individuelle.` },
  { annee: '2013', titre: `Transformation en SARL`, desc: `La clinique devient une Société à Responsabilité Limitée en mai 2013, structurant son développement.` },
  { annee: '2017', titre: `Expansion des Services`, desc: `Ouverture du cabinet dentaire, du service d'imagerie (radiographie) et du service d'ophtalmologie.` },
  { annee: '2024', titre: `Intégration COM'ON Holding`, desc: `CMET intègre le groupe COM'ON Holding, renforçant ses capacités d'investissement et de développement.` },
  { annee: '2025', titre: `Rénovation & Modernisation`, desc: `Fermeture temporaire pour des rénovations majeures, dans le cadre du projet de future clinique.` },
  { annee: 'BIENTÔT', titre: `La Future Clinique`, desc: `Ouverture prochaine d'une nouvelle infrastructure moderne avec réanimation, néonatologie et hémodialyse.` },
]

const VALEURS = [
  { icon: Heart, titre: `Écoute & Bienveillance`, desc: `Chaque patient est accueilli avec empathie et respect. Nos équipes sont formées pour accompagner avec humanité.` },
  { icon: Award, titre: `Excellence Médicale`, desc: `Personnel qualifié, protocoles rigoureux et mise à jour continue des pratiques pour des soins de qualité.` },
  { icon: TrendingUp, titre: `Accessibilité`, desc: `Des tarifs adaptés pour les patients non assurés, et plus de 50 assurances acceptées pour une prise en charge maximale.` },
  { icon: Target, titre: `Engagement & Rigueur`, desc: `Respect des délais de prise en charge, suivi des patients et remise d'un dossier complet à la réception des soins.` },
]

export default function APropos() {
  return (
    <div className="page-content">
      <SEO
        title="À Propos — CMET Clinique Médicale Espérance de Toumodi"
        description="La CMET est une clinique pluridisciplinaire fondée à Toumodi, Côte d'Ivoire. Découvrez notre mission, nos valeurs et notre engagement à offrir des soins de qualité à toute la région du Bélier."
        slug="/cmet/a-propos"
        favicon="/favicon-cmet.ico"
      />

      {/* ── PAGE HEADER ── */}
      <section className={styles.pageHero}>
        <div className={`container ${styles.heroContent}`}>
          <Reveal>
            <p className="label">Qui sommes-nous</p>
            <div className="divider" />
            <h1>À Propos de CMET</h1>
            <p className={styles.heroLead}>
              Depuis 2011, la Clinique Médicale Espérance Toumodi œuvre pour un accès aux soins
              de qualité au cœur de la région du Bélier.
            </p>
          </Reveal>
        </div>
        <div className={styles.heroImg}>
          <img src="/images/batiment-ext.jpg" alt="CMET" />
          <div className={styles.heroImgOverlay} />
        </div>
      </section>

      {/* ── PRÉSENTATION ── */}
      <section className={`section ${styles.presentation}`}>
        <div className="container">
          <div className={styles.presGrid}>
            <Reveal>
              <div>
                <p className="label">Notre Histoire</p>
                <div className="divider" />
                <h2>Un Établissement de Référence</h2>
                <p style={{ marginTop: '20px', marginBottom: '16px' }}>
                  Fondée en 2011, la Clinique Médicale Espérance Toumodi (CMET) s'est imposée
                  comme la principale structure de santé privée de Toumodi et de ses environs.
                  Dûment agréée par les autorités sanitaires ivoiriennes, elle offre une gamme
                  complète de services médicaux et paramédicaux.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  Transformée en Société à Responsabilité Limitée (SARL) en mai 2013, CMET
                  a structuré son développement tout en maintenant son engagement premier :
                  offrir des soins accessibles, humains et de qualité à toute la population.
                </p>
                <p>
                  En 2024, CMET a intégré le groupe <strong>COM'ON Holding</strong>, ouvrant
                  de nouvelles perspectives de développement et d'investissement pour moderniser
                  ses installations et étendre ses services.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className={styles.presStats}>
                {[
                  { n: '142', l: `Professionnels`, icon: Users },
                  { n: '11+', l: `Spécialités`, icon: Award },
                  { n: '50+', l: `Assurances`, icon: CheckCircle2 },
                  { n: '24/7', l: `Urgences`, icon: Heart },
                ].map(({ n, l, icon: Icon }) => (
                  <div key={l} className={styles.presStat}>
                    <Icon size={22} className={styles.presStatIcon} />
                    <strong>{n}</strong>
                    <span>{l}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── MISSION / VISION ── */}
      <section className={`section ${styles.mvv}`}>
        <div className="container">
          <Reveal className="section-header">
            <p className="label">Nos fondements</p>
            <div className="divider divider-center" />
            <h2>Mission, Vision & Valeurs</h2>
          </Reveal>
          <div className={styles.mvvGrid}>
            <Reveal>
              <div className={styles.mvvCard}>
                <div className={`${styles.mvvIcon} ${styles.mvvBlue}`}><Target size={28} /></div>
                <h3>Notre Mission</h3>
                <p>
                  Offrir à chaque patient de Toumodi et de la région du Bélier un accès à des soins médicaux
                  complets, sûrs et humains. De la prévention au traitement, en passant par le diagnostic
                  et le suivi, CMET accompagne ses patients à chaque étape de leur parcours de santé.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className={styles.mvvCard}>
                <div className={`${styles.mvvIcon} ${styles.mvvGreen}`}><Eye size={28} /></div>
                <h3>Notre Vision</h3>
                <p>
                  Devenir le centre de santé de référence du centre de la Côte d'Ivoire, reconnu pour
                  l'excellence de ses soins, la modernité de ses équipements et le professionnalisme
                  de ses équipes. La future clinique représente cette ambition de développement.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className={styles.mvvCard}>
                <div className={`${styles.mvvIcon} ${styles.mvvRose}`}><Heart size={28} /></div>
                <h3>Nos Engagements</h3>
                <p>
                  Écoute optimale des patients, respect des délais de prise en charge, maîtrise des coûts
                  et qualité de construction/prestation. À la réception de chaque soin, CMET remet
                  un dossier complet pour une exploitation optimale par le patient.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── VALEURS ── */}
      <section className={`section ${styles.valeurs}`}>
        <div className="container">
          <Reveal className="section-header">
            <p className="label">Ce qui nous définit</p>
            <div className="divider divider-center" />
            <h2>Nos Valeurs</h2>
          </Reveal>
          <div className={styles.valeursGrid}>
            {VALEURS.map(({ icon: Icon, titre, desc }, i) => (
              <Reveal key={titre} delay={i * 0.1}>
                <div className={styles.valeurCard}>
                  <div className={styles.valeurIcon}><Icon size={24} /></div>
                  <h3 className={styles.valeurTitre}>{titre}</h3>
                  <p className={styles.valeurDesc}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className={`section ${styles.timeline}`}>
        <div className="container">
          <Reveal className="section-header">
            <p className="label">Notre parcours</p>
            <div className="divider divider-center" />
            <h2>Faits Marquants</h2>
          </Reveal>
          <div className={styles.timelineList}>
            {TIMELINE.map(({ annee, titre, desc }, i) => (
              <Reveal key={annee} delay={i * 0.08}>
                <div className={`${styles.timelineItem} ${annee === 'BIENTÔT' ? styles.timelineSoon : ''}`}>
                  <div className={styles.timelineYear}>{annee}</div>
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineContent}>
                    <h4>{titre}</h4>
                    <p>{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FUTURE CLINIQUE ── */}
      <section className={`section ${styles.future}`}>
        <div className="container">
          <div className={styles.futureGrid}>
            <Reveal>
              <div>
                <p className="label">Bientôt</p>
                <div className="divider" />
                <h2>La Future Clinique CMET</h2>
                <p style={{ marginTop: '20px', marginBottom: '16px' }}>
                  Dans le cadre de sa modernisation, CMET prépare l'ouverture d'une nouvelle
                  infrastructure médicale moderne, dotée d'équipements de pointe.
                </p>
                <p style={{ marginBottom: '24px' }}>
                  Les nouveaux services prévus incluent une unité de <strong>réanimation</strong>,
                  un service de <strong>néonatologie</strong> et une unité
                  d'<strong>hémodialyse</strong> — répondant ainsi aux besoins croissants
                  de la population de la région du Bélier.
                </p>
                <ul className={styles.futureList}>
                  {[`Réanimation`, `Néonatologie`, `Hémodialyse`, `Digitalisation des soins`, `Adhésion au réseau CMU`].map(s => (
                    <li key={s} className={styles.futureListItem}>
                      <CheckCircle2 size={15} style={{ color: 'var(--vert)', flexShrink: 0 }} />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className={styles.futureImgs}>
                <img src="/images/batiment-ext.jpg" alt="Future clinique CMET" className={styles.futureImg1} />
                <img src="/images/vue-aerienne.jpg" alt="Plan clinique CMET" className={styles.futureImg2} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

    </div>
  )
}
