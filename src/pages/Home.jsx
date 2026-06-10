import { useEffect, useRef, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Emblem from '../components/Emblem'
import SEO from '../components/SEO'
import FloatingParticles from '../components/FloatingParticles'
import { ALL_LOCATIONS } from '../data/locations'
import styles from './Home.module.css'

// Chargement différé de la carte (évite les erreurs SSR de Leaflet)
const MapSection = lazy(() => import('../components/MapSection'))

/* ── Données filiales ── */
const filiales = [
  {
    slug: 'services',
    name: "Com'on Services",
    sector: "Commerce & Services",
    desc: "Acquisition et fourniture de matériels professionnels : véhicules, ambulances, équipements spécialisés.",
    logo: '/logos/services.png',
    bg: '#F4F4F4',               // gris neutre clair
  },
  {
    slug: 'sigeced',
    name: "SIGECED",
    sector: "Génie Civil · BTP · Entretien",
    desc: "Société Ivoirienne de Génie Civil, d'Entretien et Divers. Nous créons votre confort en Côte d'Ivoire.",
    logo: '/logos/sigeced.png',
    bg: '#FFF4EC',               // orange très clair
  },
  {
    slug: 'assurances',
    name: "Com'on Assurances",
    sector: "Assurance",
    desc: "Solutions d'assurance adaptées aux particuliers et entreprises ivoiriennes, avec des garanties sur mesure.",
    logo: '/logos/assurances.png',
    bg: '#FFF0F0',               // rouge très clair
  },
  {
    slug: 'vati-co',
    name: "Vati&Co",
    sector: "Média d'investigation",
    desc: "Média d'investigation ivoirien engagé pour la bonne gouvernance, les droits humains et l'État de droit — letau.net.",
    logo: '/logos/vati-co.png',
    logoDark: true,
    bg: '#071433',               // bleu nuit
    darkCard: true,
    url: 'https://letau.net',
  },
  {
    slug: 'agro',
    name: "Com'on Agro",
    sector: "Agro-industrie",
    desc: "Transformation et valorisation des produits agricoles ivoiriens, contribuant à la chaîne agro-industrielle.",
    logo: '/logos/agro.png',
    bg: '#F0F7EE',               // vert très clair
  },
  {
    slug: 'distri-agri',
    name: "Com'on Distri Agri",
    sector: "Distribution Agricole",
    desc: "Distribution d'intrants agricoles, semences et produits phytosanitaires pour l'agriculture ivoirienne.",
    logo: '/logos/distri-agri.png',
    logoDark: true,
    bg: '#0A1F0A',               // vert forêt profond
    darkCard: true,
  },
  {
    slug: 'cmet',
    name: "Clinique Médicale Espérance de Toumodi",
    sector: "Santé · Clinique Médicale",
    desc: "Clinique médicale moderne offrant des soins de qualité avec des équipements de pointe et une équipe dédiée.",
    logo: '/logos/cmet.png',
    logoDark: true,
    bg: '#D6EAF8',               // bleu clair (demande utilisateur)
  },
]

const pdg = { initials: 'EKT', name: 'Eric Kouadio-Tiacoh', titre: 'Président Directeur Général' }
const dirigeants = [
  { initials: 'VC', name: 'Vamara Coulibaly', titre: 'Secrétaire Général' },
  { initials: 'KD', name: 'Kanama Diabaté', titre: 'Conseiller Spécial' },
  { initials: 'BM', name: 'Boli Michael', titre: 'Directeur Général Adjoint' },
]

/* ── Animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.4,0,0.2,1] } }),
}

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <main className="page-enter">
      <SEO
        title="Groupe plurisectoriel ivoirien"
        description="COM'ON Holding est un groupe ivoirien regroupant 7 filiales spécialisées : assurance, agro-industrie, BTP, santé, média d'investigation, distribution agricole et services. Basé à Abidjan, Côte d'Ivoire."
        slug="/"
        jsonLd={{
          '@type': 'Corporation',
          name: "COM'ON Holding",
          numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 50 },
          foundingLocation: { '@type': 'Place', name: 'Abidjan, Côte d\'Ivoire' },
          areaServed: 'Côte d\'Ivoire',
          subOrganization: [
            { '@type': 'Organization', name: "Com'on Assurances",   url: 'https://www.comonholding.com/assurances' },
            { '@type': 'Organization', name: 'Vati&Co (letau.net)', url: 'https://letau.net' },
            { '@type': 'Organization', name: "Com'on Services",     url: 'https://www.comonholding.com/services' },
            { '@type': 'Organization', name: "Com'on Distri Agri",  url: 'https://www.comonholding.com/distri-agri' },
            { '@type': 'Organization', name: "Com'on Agro",         url: 'https://www.comonholding.com/agro' },
            { '@type': 'Organization', name: 'SIGECED',             url: 'https://www.comonholding.com/sigeced' },
            { '@type': 'Organization', name: 'Clinique Médicale Espérance de Toumodi', url: 'https://www.comonholding.com/cmet' },
          ],
        }}
      />

      {/* ══ HERO ══ */}
      <section ref={heroRef} className={styles.hero} id="hero">
        <FloatingParticles color="rgba(220,50,50,0.7)" />
        <motion.div className={styles.heroBg} style={{ y: heroY }} />
        <div className={styles.heroNoise} />
        <motion.div className={styles.heroContent} style={{ opacity: heroOpacity }}>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <img src="/logos/emblem-clean.png" alt="COM'ON Holding" className={styles.heroEmblem} />
          </motion.div>
          <motion.p className={styles.heroLabel} variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            Abidjan · Côte d'Ivoire
          </motion.p>
          <motion.h1 className={styles.heroTitle} variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            <span>Com'on</span>
            <span className={styles.heroTitleRed}>Holding</span>
          </motion.h1>
          <motion.div className={styles.heroDivider} variants={fadeUp} initial="hidden" animate="visible" custom={3} />
          <motion.p className={styles.heroText} variants={fadeUp} initial="hidden" animate="visible" custom={4}>
            Un groupe qui fédère des expertises complémentaires au service de l'excellence,<br />
            de l'innovation et du développement durable en Côte d'Ivoire.
          </motion.p>
          <motion.div className={styles.heroCtas} variants={fadeUp} initial="hidden" animate="visible" custom={5}>
            <a href="#filiales" className="btn btn-white">Découvrir nos filiales</a>
            <a href="#apropos" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
              Le Groupe <ArrowRight size={14} />
            </a>
          </motion.div>
        </motion.div>

      </section>

      {/* ══ CHIFFRES ══ */}
      <section className={styles.stats}>
        <div className="container">
          <div className={styles.statsGrid}>
            {[
              { n: '7', label: 'Filiales' },
              { n: '6+', label: 'Secteurs d\'activité' },
              { n: '🇨🇮', label: 'Groupe Ivoirien' },
              { n: '∞', label: 'Vision & Innovation' },
            ].map((s, i) => (
              <motion.div key={i} className={styles.statItem}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                <span className={styles.statN}>{s.n}</span>
                <span className={styles.statL}>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MOT DU PRÉSIDENT ══ */}
      <section className={`section ${styles.apropos}`} id="apropos">
        {/* Emblème filigrane en fond */}
        <div className={styles.aproposFiligrane} aria-hidden="true">
          <img src="/logos/emblem-clean.png" alt="" style={{ width: 500, opacity: 0.07 }} />
        </div>
        <div className="container">
          <div className={styles.aproposGrid}>

            {/* Photo du PDG */}
            <motion.div className={styles.pdgVisual}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className={styles.pdgPhotoWrap}>
                {/* Remplacer src par le vrai chemin une fois la photo ajoutée */}
                <img src="/pdg.jpeg" alt="Eric Kouadio-Tiacoh" className={styles.pdgPhoto}
                  onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }} />
                <div className={styles.pdgPlaceholder} style={{ display: 'none' }}>
                  <span>ET</span>
                </div>
              </div>
              <div className={styles.pdgIdentite}>
                <p className={styles.pdgNom}>Eric Kouadio-Tiacoh</p>
                <p className={styles.pdgTitre}>Président Directeur Général</p>
                <p className={styles.pdgGroupe}>COM'ON Holding</p>
              </div>
            </motion.div>

            {/* Mot du président */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>
              <p className="label">Mot du Président</p>
              <h2>Une ambition ivoirienne, une vision africaine</h2>
              <div className="divider" />
              <blockquote className={styles.motPresident}>
                "COM'ON Holding est né d'une conviction profonde : que la Côte d'Ivoire regorge
                de talents, de ressources et d'opportunités qui n'attendent qu'à être organisés
                et valorisés. C'est pour répondre à cette ambition que nous avons bâti un groupe
                plurisectoriel, ancré dans les réalités locales mais ouvert sur le monde.
              </blockquote>
              <p className={styles.motPresidentSuite}>
                Notre mission est simple : créer de la valeur durablement, pour nos clients,
                nos partenaires et pour la Côte d'Ivoire. Chaque filiale du groupe porte cette
                vision avec excellence et engagement. Ensemble, nous construisons l'avenir."
              </p>
              <div style={{ marginTop: 40 }}>
                <a href="#filiales" className="btn btn-outline">Découvrir nos filiales <ArrowRight size={14} /></a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══ FILIALES ══ */}
      <section className={styles.filialesSection} id="filiales">
        <div className="container">
          <motion.div className={styles.filialesHeader}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="label" style={{ color: '#B22222' }}>Nos Filiales</p>
            <h2 style={{ color: '#fff' }}>Un groupe, des expertises complémentaires</h2>
            <div className="divider divider-center" />
          </motion.div>
        </div>
        <div className={styles.filialesGrid}>
          {filiales.map((f, i) => (
            <Link key={f.slug} to={`/${f.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
              <motion.div className={styles.filialeCard}
                style={{ background: f.bg, height: '100%' }}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i % 3}>
                <div className={styles.filialeCardInner}>
                  {f.logo && (
                    <div className={styles.filialeLogoWrap}>
                      <img
                        src={f.logo}
                        alt={f.name}
                        className={styles.filialeLogo}
                      />
                    </div>
                  )}
                  <p className={styles.filialeSector}>{f.sector}</p>
                  <h3 className={styles.filialeName}
                    style={f.darkCard ? { color: '#fff' } : {}}>
                    {f.name}
                  </h3>
                  <p className={styles.filialeDesc}
                    style={f.darkCard ? { color: 'rgba(255,255,255,0.55)' } : {}}>
                    {f.desc}
                  </p>
                  <span className={styles.filialeLink}>
                    En savoir plus <ArrowRight size={12} />
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ ÉQUIPE — masqué temporairement ══ */}

      {/* ══ CARTE ══ */}
      <Suspense fallback={
        <div style={{ height: 520, background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#444', letterSpacing: 3, fontSize: 11, textTransform: 'uppercase' }}>Chargement de la carte…</p>
        </div>
      }>
        <MapSection
          locations={ALL_LOCATIONS}
          title="Nos implantations en Côte d'Ivoire"
          subtitle="Cliquez sur un marqueur pour découvrir l'entreprise"
          height="580px"
        />
      </Suspense>

      {/* ══ CONTACT ══ */}
      <section className={`section ${styles.contact}`} id="contact">
        <div className="container">
          <div className={styles.contactGrid}>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="label">Nous Contacter</p>
              <h2>Entrons en contact</h2>
              <div className="divider" />
              <p style={{ marginBottom: 36 }}>
                Vous souhaitez en savoir plus sur COM'ON Holding ou l'une de nos filiales ?
                Notre équipe est à votre écoute.
              </p>
              <div className={styles.contactInfos}>
                <div className={styles.contactInfo}>
                  <span className={styles.contactInfoLabel}>Adresse</span>
                  <span>Marcory Zone 4C, Rue Marconi<br />26 BP 1455 Abidjan 26</span>
                </div>
                <div className={styles.contactInfo}>
                  <span className={styles.contactInfoLabel}>Téléphone</span>
                  <a href="tel:+22527213986 54">+225 27 21 39 86 54</a>
                </div>
                <div className={styles.contactInfo}>
                  <span className={styles.contactInfoLabel}>Email</span>
                  <a href="mailto:contact@comon-holding.ci">contact@comon-holding.ci</a>
                </div>
              </div>
            </motion.div>

            <motion.form className={styles.form} onSubmit={e => e.preventDefault()}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>
              <div className={styles.formRow}>
                <input type="text" placeholder="Votre nom" required />
                <input type="email" placeholder="Votre email" required />
              </div>
              <input type="text" placeholder="Sujet" />
              <textarea rows={5} placeholder="Votre message..." />
              <button type="submit" className="btn btn-solid">
                Envoyer <ArrowRight size={14} />
              </button>
            </motion.form>
          </div>
        </div>
      </section>

    </main>
  )
}
