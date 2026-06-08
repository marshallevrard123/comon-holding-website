import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  Phone, Mail, MapPin, Clock, Calendar, ChevronRight, ArrowRight,
  Shield, Star, Users, Award, HeartPulse, Microscope, Eye,
  Baby, Stethoscope, Bone, Brain, FlaskConical, CheckCircle2,
} from 'lucide-react'
import styles from './Accueil.module.css'
import SEO from '../../components/SEO'

/* ─────────── ANIMATION HELPERS ─────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
}
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref} className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay } } }}
    >
      {children}
    </motion.div>
  )
}

/* ─────────── DATA ─────────── */
const SERVICES = [
  { icon: Stethoscope, titre: `Médecine Générale`, desc: `Consultations et suivi médical pour toute la famille, 24h/24.`, color: 'bleu' },
  { icon: Baby,        titre: `Gynécologie & Maternité`, desc: `Suivi de grossesse, accouchement et soins néonataux.`, color: 'vert' },
  { icon: Eye,         titre: `Ophtalmologie`, desc: `Bilan visuel, diagnostic et traitement des pathologies oculaires.`, color: 'bleu' },
  { icon: Microscope,  titre: `Laboratoire d'Analyses`, desc: `Analyses biologiques médicales complètes avec résultats rapides.`, color: 'vert' },
  { icon: Brain,       titre: `Radiologie & Imagerie`, desc: `Échographie, mammographie, radio numérisée, panoramique dentaire.`, color: 'bleu' },
  { icon: Bone,        titre: `Chirurgie`, desc: `Chirurgie générale, pédiatrique et traumatologique.`, color: 'vert' },
]

const STATS = [
  { n: '2011', label: `Année de création` },
  { n: '142',  label: `Professionnels de santé` },
  { n: '50+',  label: `Assurances acceptées` },
  { n: '11',   label: `Spécialités médicales` },
]

const ATOUTS = [
  `Établissement agréé par les autorités sanitaires ivoiriennes`,
  `Personnel médical qualifié et expérimenté`,
  `Plateau technique en constante évolution`,
  `50+ assurances médicales acceptées`,
  `Disponibilité 24h/24 pour les urgences`,
  `Prise en charge globale : prévention, diagnostic, traitement, suivi`,
  `Tarifs accessibles pour les patients non assurés`,
  `Position géographique stratégique à Toumodi`,
]

const ASSURANCES_PREVIEW = [
  `AMAT-CI`, `AXA CI`, `NSIA`, `NOVELIA`, `BIAM`, `AMG SANTE`,
  `ASCOMA CI`, `CHORUS`, `ATLANTIQUE ASSUR`, `IVOIR'SANTE`,
  `SOGEMAD`, `VITALIS`,
]

export default function Accueil() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  return (
    <div className={`page-content ${styles.page}`}>
      <SEO
        title="CMET Toumodi — Soins Médicaux de Qualité en Côte d'Ivoire"
        description="Bienvenue à la Clinique Médicale Espérance de Toumodi. Soins pluridisciplinaires disponibles 24h/24 : médecine générale, gynécologie, pédiatrie, chirurgie, cardiologie, laboratoire et imagerie."
        slug="/cmet"
        image="https://www.comon-holding.ci/images/hero.jpg"
        favicon="/favicon-cmet.ico"
      />

      {/* ══════════ HERO ══════════ */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroBg}>
          <img src="/images/hero.jpg" alt="Clinique CMET" className={styles.heroImg} />
          <div className={styles.heroOverlay} />
        </div>

        <div className={`container ${styles.heroContent}`}>
          <motion.div
            initial="hidden" animate={heroInView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            <motion.div variants={fadeUp} className={styles.heroBadge}>
              <span className={styles.dot} /> Établissement agréé · Ouvert 24h/24
            </motion.div>

            <motion.h1 variants={fadeUp} className={styles.heroTitle}>
              Votre Santé,<br />
              <span>Notre Priorité.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className={styles.heroDesc}>
              La Clinique Médicale Espérance Toumodi vous offre des soins médicaux complets,
              modernes et accessibles. Consultations, analyses, imagerie, chirurgie —
              une équipe pluridisciplinaire à votre service.
            </motion.p>

            <motion.div variants={fadeUp} className={styles.heroCtas}>
              <Link to="/cmet/contact" className="btn btn-primary">
                <Calendar size={16} /> Prendre rendez-vous
              </Link>
              <Link to="/cmet/specialites" className="btn btn-white">
                Voir nos spécialités <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className={styles.heroContact}>
              <a href="tel:+2250707840220" className={styles.heroContactItem}>
                <Phone size={14} /> 07 07 84 02 20
              </a>
              <span className={styles.heroContactSep}>|</span>
              <span className={styles.heroContactItem}>
                <MapPin size={14} /> Toumodi, Quartier Kondoubo
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <div className={styles.heroStats}>
          {STATS.map(({ n, label }) => (
            <div key={label} className={styles.heroStatItem}>
              <span className={styles.heroStatN}>{n}</span>
              <span className={styles.heroStatL}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ PRÉSENTATION RAPIDE ══════════ */}
      <section className={`section ${styles.intro}`}>
        <div className="container">
          <div className={styles.introGrid}>
            <Reveal>
              <div className={styles.introImg}>
                <img src="/images/batiment-sunset.jpg" alt="Clinique CMET" />
                <div className={styles.introImgBadge}>
                  <Award size={20} />
                  <div>
                    <strong>Agréée</strong>
                    <span>par le Ministère de la Santé</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className={styles.introText}>
                <p className="label">Qui sommes-nous</p>
                <div className="divider" />
                <h2>La Clinique Médicale Espérance de Toumodi</h2>
                <p style={{ marginTop: '20px', marginBottom: '20px' }}>
                  Fondée en 2011 et intégrée au groupe <strong>COM'ON Holding</strong> en 2024,
                  CMET est l'établissement de santé privé de référence de Toumodi et de la région du Bélier.
                  Dûment agréée par les autorités sanitaires ivoiriennes, la clinique offre une prise en charge
                  globale et pluridisciplinaire.
                </p>
                <p style={{ marginBottom: '32px' }}>
                  Avec 142 professionnels de santé — médecins, spécialistes, infirmiers, sages-femmes et
                  techniciens — CMET assure une disponibilité 24h/24 pour répondre à toutes vos urgences médicales.
                </p>
                <div className={styles.introChecks}>
                  {[
                    `Consultations générales et spécialisées`,
                    `Plateau technique complet`,
                    `50+ assurances acceptées`,
                    `Tarifs accessibles`,
                  ].map(item => (
                    <div key={item} className={styles.introCheck}>
                      <CheckCircle2 size={16} className={styles.checkIcon} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Link to="/cmet/a-propos" className="btn btn-outline" style={{ marginTop: '32px' }}>
                  En savoir plus <ChevronRight size={15} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ NOS SERVICES ══════════ */}
      <section className={`section ${styles.services}`}>
        <div className="container">
          <Reveal className="section-header">
            <p className="label">Ce que nous faisons</p>
            <div className="divider divider-center" />
            <h2>Nos Services Médicaux</h2>
            <p style={{ marginTop: '16px' }}>
              Une offre médicale complète pour accompagner chaque patient, de la consultation
              au suivi post-traitement.
            </p>
          </Reveal>

          <motion.div
            className={styles.servicesGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            {SERVICES.map(({ icon: Icon, titre, desc, color }) => (
              <motion.div
                key={titre}
                className={`${styles.serviceCard} ${styles[`card${color.charAt(0).toUpperCase() + color.slice(1)}`]}`}
                variants={fadeUp}
              >
                <div className={`${styles.serviceIcon} ${styles[`icon${color.charAt(0).toUpperCase() + color.slice(1)}`]}`}>
                  <Icon size={26} />
                </div>
                <h3 className={styles.serviceTitle}>{titre}</h3>
                <p className={styles.serviceDesc}>{desc}</p>
                <Link to="/cmet/specialites" className={styles.serviceLink}>
                  En savoir plus <ChevronRight size={14} />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/cmet/specialites" className="btn btn-primary">
              Toutes nos spécialités <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ POURQUOI CHOISIR CMET ══════════ */}
      <section className={`section ${styles.atouts}`}>
        <div className="container">
          <div className={styles.atoutsGrid}>
            <Reveal>
              <div className={styles.atoutsText}>
                <p className="label">Nos engagements</p>
                <div className="divider" />
                <h2>Pourquoi Choisir CMET ?</h2>
                <p style={{ margin: '20px 0 32px' }}>
                  CMET s'est imposée comme la référence médicale privée de Toumodi grâce à son
                  ancienneté, la qualité de son personnel et la diversité de ses prestations.
                </p>
                <ul className={styles.atoutsList}>
                  {ATOUTS.map(a => (
                    <li key={a} className={styles.atoutItem}>
                      <CheckCircle2 size={16} className={styles.checkIcon} />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className={styles.atoutsImgs}>
                <img src="/images/zone-attente.jpg" alt="Cour CMET" className={styles.atoutsImg1} />
                <img src="/images/couloir-attente.jpg" alt="Espace repos CMET" className={styles.atoutsImg2} />
                <div className={styles.atoutsCard}>
                  <HeartPulse size={28} className={styles.atoutsCardIcon} />
                  <strong>Soins de Qualité</strong>
                  <span>Personnel qualifié<br />& équipements modernes</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ ASSURANCES ══════════ */}
      <section className={`section ${styles.assurances}`}>
        <div className="container">
          <Reveal className="section-header">
            <p className="label">Prise en charge</p>
            <div className="divider divider-center" />
            <h2>Assurances Acceptées</h2>
            <p style={{ marginTop: '16px' }}>
              CMET travaille avec plus de 50 compagnies d'assurance et mutuelles
              pour faciliter votre accès aux soins.
            </p>
          </Reveal>

          <motion.div
            className={styles.assurancesGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          >
            {ASSURANCES_PREVIEW.map(name => (
              <motion.div key={name} className={styles.assurancePill} variants={fadeUp}>
                <Shield size={14} className={styles.assuranceIcon} />
                <span>{name}</span>
              </motion.div>
            ))}
          </motion.div>

          <div className={styles.assurancesMore}>
            <p>Et bien d'autres encore…</p>
            <div className={styles.assurancesCtas}>
              <Link to="/cmet/assurances" className="btn btn-outline">
                Voir toutes les assurances <ArrowRight size={15} />
              </Link>
              <Link to="/cmet/contact" className="btn btn-vert">
                Vérifier ma prise en charge <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ RENDEZ-VOUS / CTA ══════════ */}
      <section className={styles.ctaBand}>
        <div className="container">
          <Reveal>
            <div className={styles.ctaBandInner}>
              <div className={styles.ctaBandText}>
                <h2>Prenez Rendez-vous Dès Aujourd'hui</h2>
                <p>Notre équipe est disponible pour vous accompagner. Contactez-nous par téléphone ou via le formulaire en ligne.</p>
              </div>
              <div className={styles.ctaBandBtns}>
                <Link to="/cmet/contact" className="btn btn-white">
                  <Calendar size={16} /> Formulaire en ligne
                </Link>
                <a href="tel:+2250707840220" className={`btn ${styles.ctaPhone}`}>
                  <Phone size={16} /> 07 07 84 02 20
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ LOCALISATION ══════════ */}
      <section className={`section ${styles.localisation}`}>
        <div className="container">
          <Reveal className="section-header">
            <p className="label">Nous trouver</p>
            <div className="divider divider-center" />
            <h2>Localisation & Horaires</h2>
          </Reveal>

          <div className={styles.locGrid}>
            <Reveal className={styles.locMap}>
              <div className={styles.mapContainer}>
                <iframe
                  title="CMET Toumodi"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.0!2d-5.0167!3d6.5667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzQnMDAuMSJOIDXCsDAxJzAwLjEiVw!5e0!3m2!1sfr!2sci!4v1620000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>

            <div className={styles.locInfo}>
              <Reveal>
                <div className={styles.locCard}>
                  <div className={styles.locCardIcon}><MapPin size={20} /></div>
                  <div>
                    <h4>Adresse</h4>
                    <p>Toumodi, Quartier Kondoubo<br />Route de Dimbokro, Îlot 21<br />BP 253 Toumodi</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className={styles.locCard}>
                  <div className={styles.locCardIcon}><Phone size={20} /></div>
                  <div>
                    <h4>Téléphones</h4>
                    <p>
                      <a href="tel:+2250707840220">07 07 84 02 20</a><br />
                      <a href="tel:+2250140682066">01 40 68 20 66</a><br />
                      <a href="tel:+22527306290 39">27 30 62 90 39</a>
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className={styles.locCard}>
                  <div className={styles.locCardIcon}><Clock size={20} /></div>
                  <div>
                    <h4>Heures de visite</h4>
                    <p>
                      <strong>Lun – Sam :</strong><br />
                      6h30 – 7h30 &nbsp;·&nbsp; 12h30 – 13h30 &nbsp;·&nbsp; 18h30 – 19h30<br /><br />
                      <strong>Dim & Fériés :</strong><br />
                      11h30 – 14h30 &nbsp;·&nbsp; 18h30 – 19h30
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className={styles.locCard}>
                  <div className={styles.locCardIcon}><Mail size={20} /></div>
                  <div>
                    <h4>Email</h4>
                    <p><a href="mailto:cliniquesperancetdi@gmail.com">cliniquesperancetdi@gmail.com</a></p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
