import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, ChevronDown, ArrowRight, ChevronLeft,
  PenLine, HardHat, Zap, Shield, Waves, Package,
  MapPin, Mail, Phone, Building2, Send,
} from 'lucide-react'
import styles from './Sigeced.module.css'
import SEO from '../components/SEO'

/* ─────────────────────────────────────────────
   COUNTER animé
───────────────────────────────────────────── */
function Counter({ target, suffix = '', prefix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const isNumeric = !isNaN(parseFloat(target)) && isFinite(target)
    if (!isNumeric) { setVal(target); return }
    const end = parseFloat(target)
    const duration = 1800
    const step = 16
    const inc = end / (duration / step)
    let cur = 0
    const timer = setInterval(() => {
      cur += inc
      if (cur >= end) { setVal(end % 1 === 0 ? end : end.toFixed(1)); clearInterval(timer) }
      else setVal(Math.floor(cur))
    }, step)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{prefix}{val}{suffix}</span>
}

/* ─────────────────────────────────────────────
   NAV ITEMS
───────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: 'hero',    label: 'Accueil' },
  { id: 'projets', label: 'Projets' },
  { id: 'metiers', label: 'Métiers' },
  { id: 'impact',  label: 'Chiffres Clés' },
  { id: 'flotte',  label: 'Flotte' },
  { id: 'galerie', label: 'Galerie' },
  { id: 'contact', label: 'Contact' },
]

/* ─────────────────────────────────────────────
   SUBNAV (portail)
───────────────────────────────────────────── */
function SigeceSubnav() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const scroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className={styles.subnav}>
      <div className={styles.subnavInner}>
        <Link to="/" className={styles.subnavBack}>
          <ArrowLeft size={11} /> Groupe
        </Link>
        <span className={styles.subnavDivider} />
        {NAV_ITEMS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scroll(id)}
            className={`${styles.subnavTab} ${active === id ? styles.subnavTabActive : ''}`}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  )
}

/* ─────────────────────────────────────────────
   PROJETS DATA
───────────────────────────────────────────── */
const PROJETS = [
  {
    titre: `Assainissement et voirie urbaine — Séguéla`,
    lieu: `Séguéla, Worodougou`,
    client: `ONAD`,
    status: 'active',
  },
  {
    titre: `Construction de la Sous-préfecture et clôture — Fadiadougou`,
    lieu: `Fadiadougou`,
    client: `État de Côte d'Ivoire`,
    status: 'done',
  },
  {
    titre: `Défrichement du lit d'eau du barrage de Toudjan`,
    lieu: `Marabadiassa`,
    client: `État de Côte d'Ivoire`,
    status: 'active',
  },
  {
    titre: `Station de désodorisation de Port-Bouët`,
    lieu: `Port-Bouët, Abidjan`,
    client: `SODECI`,
    status: 'active',
  },
  {
    titre: `Réfection des bureaux du MINHAS`,
    lieu: `Le Vallon, Abidjan`,
    client: `MINHAS`,
    status: 'done',
  },
  {
    titre: `Travaux de Génie Civil — Barrage d'Assounvouè`,
    lieu: `Assounvouè`,
    client: `État de Côte d'Ivoire`,
    status: 'active',
  },
  {
    titre: `Construction de 4 classes + bureau à Babien`,
    lieu: `Babien, Séguéla`,
    client: `Conseil Régional du Worodougou`,
    status: 'pending',
  },
  {
    titre: `Réhabilitation de l'entrepôt COM'ON DISTRI-AGRI`,
    lieu: `Yopougon, Abidjan`,
    client: `COM'ON DISTRI-AGRI`,
    status: 'done',
  },
  {
    titre: `Assainissement et caniveaux — Touba`,
    lieu: `Touba`,
    client: `ONAD`,
    status: 'active',
  },
  {
    titre: `Réhabilitation de la Clinique Espérance de Toumodi`,
    lieu: `Toumodi, Bélier`,
    client: `CMET`,
    status: 'active',
  },
  {
    titre: `Construction d'établissements scolaires`,
    lieu: `Région Agnéby-Tiassa`,
    client: `Conseil Régional Agnéby-Tiassa`,
    status: 'pending',
  },
  {
    titre: `Construction de toilettes préfabriquées`,
    lieu: `Yopougon & Abobo, Abidjan`,
    client: `ONAD`,
    status: 'active',
  },
  {
    titre: `Travaux de fouille réseau électrique — District d'Abidjan`,
    lieu: `District d'Abidjan`,
    client: `CIE`,
    status: 'active',
  },
  {
    titre: `Construction de mur voile — Aghien`,
    lieu: `Aghien, Abidjan`,
    client: `Privé`,
    status: 'active',
  },
]

/* ─────────────────────────────────────────────
   MÉTIERS DATA
───────────────────────────────────────────── */
const METIERS = [
  {
    num: '01',
    icon: PenLine,
    titre: `Bureau d'Études & Conception`,
    desc: `Conception de plans, devis de construction, calcul de structure, modélisation 3D et expertise de bâtiment pour tous types d'ouvrages.`,
  },
  {
    num: '02',
    icon: HardHat,
    titre: `Construction & Réhabilitation`,
    desc: `Réalisation de travaux neufs, réhabilitation et modification de tout ouvrage — tous corps d'état, du gros œuvre à la finition.`,
  },
  {
    num: '03',
    icon: Zap,
    titre: `Génie Civil & Électrification`,
    desc: `Études et conseils en génie civil, électrification publique, formation en génie civil et volumétrie 3D.`,
  },
  {
    num: '04',
    icon: Waves,
    titre: `Voirie, Réseaux & Assainissement`,
    desc: `Aménagement, voirie et réseaux divers (VRD), assainissement urbain et infrastructures hydrauliques.`,
  },
  {
    num: '05',
    icon: Shield,
    titre: `Sécurité & Gardiennage`,
    desc: `Services de sécurité et gardiennage pour entreprises, résidences, établissements publics ou privés.`,
  },
  {
    num: '06',
    icon: Package,
    titre: `Fournitures & Entretien`,
    desc: `Entretien des locaux, fourniture de matériaux de construction, de mobilier de bureau et d'équipements informatiques.`,
  },
]

/* ─────────────────────────────────────────────
   GALERIE DATA
───────────────────────────────────────────── */
const GALERIE = [
  { src: `/sigeced/chantier-voirie.png`,  caption: `Terrassement & Voirie`,      big: true  },
  { src: `/sigeced/chantier-fouille.png`, caption: `Fouilles CIE — Plateau`,     big: false },
  { src: `/sigeced/chantier-cie.png`,     caption: `Réseau BT — Abobo`,          big: false },
  { src: `/sigeced/chantier-barrage.png`, caption: `Ouvrage hydraulique`,        big: false },
  { src: `/sigeced/flotte-1.png`,         caption: `Logistique terrain`,         big: false },
  { src: `/sigeced/hero.jpg`,             caption: `Compactage voirie — Séguéla`, big: false },
]

/* ─────────────────────────────────────────────
   CLIENTS
───────────────────────────────────────────── */
const CLIENTS = [
  `ONAD`, `CIE`, `SODECI`, `État de Côte d'Ivoire`,
  `Conseil Régional Worodougou`, `Conseil Régional Agnéby-Tiassa`,
]

/* ─────────────────────────────────────────────
   STATUS HELPER
───────────────────────────────────────────── */
function StatusBadge({ status }) {
  if (status === 'active')  return <span className={`${styles.projectStatus} ${styles.statusActive}`}>En cours</span>
  if (status === 'done')    return <span className={`${styles.projectStatus} ${styles.statusDone}`}>Achevé</span>
  return <span className={`${styles.projectStatus} ${styles.statusPending}`}>En attente</span>
}

/* ─────────────────────────────────────────────
   PAGE PRINCIPALE
───────────────────────────────────────────── */
const fade = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } } }

export default function Sigeced() {
  const [formData, setFormData] = useState({ nom: '', email: '', objet: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  // Carousel projets
  const VISIBLE = 3           // cartes visibles à la fois (desktop)
  const TOTAL   = PROJETS.length
  const MAX_IDX = TOTAL - VISIBLE
  const [slideIdx, setSlideIdx] = useState(0)
  const prev = () => setSlideIdx(i => Math.max(0, i - 1))
  const next = () => setSlideIdx(i => Math.min(MAX_IDX, i + 1))

  const heroRef    = useRef(null)
  const projRef    = useRef(null)
  const metRef     = useRef(null)
  const impactRef  = useRef(null)
  const fleetRef   = useRef(null)
  const galRef     = useRef(null)
  const contactRef = useRef(null)

  useEffect(() => {
    const links = document.querySelectorAll("link[rel~='icon']")
    const origHrefs = Array.from(links).map(l => l.href)
    links.forEach(l => {
      l.setAttribute('type', 'image/x-icon')
      l.setAttribute('href', '/favicon-sigeced.ico')
    })
    const origTitle = document.title
    document.title = "SIGECED — BTP & Génie Civil en Côte d'Ivoire"
    return () => {
      Array.from(links).forEach((l, i) => l.setAttribute('href', origHrefs[i]))
      document.title = origTitle
    }
  }, [])

  const projInView    = useInView(projRef,    { once: true, margin: '-80px' })
  const metInView     = useInView(metRef,     { once: true, margin: '-80px' })
  const impactInView  = useInView(impactRef,  { once: true, margin: '-80px' })
  const fleetInView   = useInView(fleetRef,   { once: true, margin: '-80px' })
  const galInView     = useInView(galRef,     { once: true, margin: '-80px' })
  const contactInView = useInView(contactRef, { once: true, margin: '-80px' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const lignes = [
      `🏗️ *Demande de contact SIGECED*`,
      ``,
      `👤 *Nom :* ${formData.nom}`,
      `📧 *Email :* ${formData.email}`,
      formData.objet   ? `📋 *Objet :* ${formData.objet}`     : null,
      formData.message ? `💬 *Message :* ${formData.message}` : null,
    ].filter(Boolean).join('\n')
    window.open(`https://wa.me/2250707715789?text=${encodeURIComponent(lignes)}`, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  return (
    <div className={`${styles.page} page-enter`}>
      <SEO
        title="SIGECED — BTP & Génie Civil en Côte d'Ivoire"
        description="SIGECED, filiale BTP du Groupe COM'ON Holding. Construction, génie civil, rénovation, travaux publics et aménagement intérieur en Côte d'Ivoire."
        slug="/sigeced"
        image="https://www.comon-holding.ci/sigeced/hero.jpg"
        favicon="/favicon-sigeced.ico"
        jsonLd={{
          '@type': 'LocalBusiness',
          name: 'SIGECED',
          description: "Filiale BTP du Groupe COM'ON Holding spécialisée en construction, génie civil et travaux publics.",
          url: 'https://www.comon-holding.ci/sigeced',
          telephone: '+2250707715789',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Abidjan',
            addressCountry: 'CI',
          },
          areaServed: "Côte d'Ivoire",
          priceRange: '$$$',
        }}
      />

      {/* ── SUBNAV (portal) ── */}
      {createPortal(<SigeceSubnav />, document.body)}

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section id="hero" ref={heroRef} className={styles.hero}>
        <img src="/sigeced/hero.jpg" alt="Chantier SIGECED" className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroAccentLine} />

        <div className={styles.heroContent}>
          <motion.div
            className={styles.heroLogoWrap}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          >
            <img src="/logos/sigeced-blanc.png" alt="SIGECED" className={styles.heroLogo} />
          </motion.div>
          <span className={styles.heroEyebrow}>BTP · Génie Civil · Infrastructures · Depuis 2015</span>

          <h1 className={styles.heroTitle}>
            Nous Créons
            <span>Votre Confort.</span>
          </h1>

          <p className={styles.heroSub}>
            Société Ivoirienne de Génie Civil, d'Entretien et Divers
          </p>

          <div className={styles.heroCtas}>
            <button
              className={styles.ctaOrange}
              onClick={() => document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Nos Réalisations <ArrowRight size={14} />
            </button>
            <button
              className={styles.ctaGhost}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Nous Contacter
            </button>
          </div>
        </div>

        {/* Bande stats */}
        <div className={styles.heroStrip}>
          {[
            { n: '15', l: 'Chantiers actifs' },
            { n: '27', l: 'Véhicules en flotte' },
            { n: '10+', l: 'Villes couvertes' },
            { n: '11', l: `Années d'expérience` },
          ].map(({ n, l }) => (
            <div key={l} className={styles.heroStripItem}>
              <span className={styles.heroStripN}>{n}</span>
              <span className={styles.heroStripL}>{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          PROJETS ACTIFS
      ══════════════════════════════════ */}
      <section id="projets" ref={projRef} className={styles.projects}>
        <div className={styles.container}>
          <motion.div
            initial="hidden" animate={projInView ? 'visible' : 'hidden'} variants={fade}
          >
            <p className={styles.eyebrow}>Portefeuille</p>
            <h2 className={styles.h2}>Projets en cours &amp; Réalisations</h2>
            <p className={styles.lead}>
              De l'étude à la livraison, SIGECED conduit des chantiers d'envergure à travers toute la Côte d'Ivoire,
              au service des institutions et des collectivités.
            </p>
          </motion.div>

          {/* ── Navigation ── */}
          <motion.div
            className={styles.carouselNav}
            initial="hidden" animate={projInView ? 'visible' : 'hidden'} variants={fade}
          >
            <span className={styles.carouselCounter}>
              <strong>{slideIdx + 1}</strong> — {TOTAL} projets
            </span>
            <div className={styles.carouselBtns}>
              <button
                className={styles.carouselBtn}
                onClick={prev}
                disabled={slideIdx === 0}
                aria-label="Précédent"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                className={styles.carouselBtn}
                onClick={next}
                disabled={slideIdx === MAX_IDX}
                aria-label="Suivant"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>

          {/* ── Piste ── */}
          <motion.div
            className={styles.carouselViewport}
            initial="hidden" animate={projInView ? 'visible' : 'hidden'} variants={fade}
          >
            <div
              className={styles.carouselTrack}
              style={{ transform: `translateX(calc(-${slideIdx} * (33.333% + 2px)))` }}
            >
              {PROJETS.map((p) => (
                <div key={p.titre} className={styles.projectCard}>
                  <StatusBadge status={p.status} />
                  <p className={styles.projectTitle}>{p.titre}</p>
                  <div className={styles.projectMeta}>
                    <span className={styles.projectLocation}>
                      <MapPin size={11} /> {p.lieu}
                    </span>
                    <span className={styles.projectClient}>Client : {p.client}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Points ── */}
          <div className={styles.carouselDots}>
            {Array.from({ length: MAX_IDX + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIdx(i)}
                className={`${styles.carouselDot} ${i === slideIdx ? styles.carouselDotActive : ''}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          NOS MÉTIERS
      ══════════════════════════════════ */}
      <section id="metiers" ref={metRef} className={styles.expertise}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHead}
            initial="hidden" animate={metInView ? 'visible' : 'hidden'} variants={fade}
          >
            <p className={styles.eyebrow}>Savoir-Faire</p>
            <h2 className={styles.h2}>6 Corps de Métier</h2>
            <p className={styles.lead}>
              Une maîtrise pluridisciplinaire qui nous permet d'intervenir sur tous les corps d'état,
              de la conception à l'exploitation.
            </p>
          </motion.div>

          <motion.div
            className={styles.expertiseGrid}
            initial="hidden" animate={metInView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {METIERS.map((m) => {
              const Icon = m.icon
              return (
                <motion.div key={m.num} className={styles.expertCard} variants={fade}>
                  <div className={styles.expertNum}>{m.num}</div>
                  <div className={styles.expertIcon}>
                    <Icon size={22} />
                  </div>
                  <h3 className={styles.expertTitle}>{m.titre}</h3>
                  <p className={styles.expertDesc}>{m.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          IMPACT — CHIFFRES CLÉS
      ══════════════════════════════════ */}
      <section id="impact" ref={impactRef} className={styles.impact}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHead}
            initial="hidden" animate={impactInView ? 'visible' : 'hidden'} variants={fade}
          >
            <p className={styles.eyebrow}>Chiffres Clés</p>
            <h2 className={styles.h2}>SIGECED en Chiffres</h2>
          </motion.div>

          <motion.div
            className={styles.impactGrid}
            initial="hidden" animate={impactInView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {[
              { n: 15,    suffix: '',  label: `Chantiers actifs` },
              { n: 27,    suffix: '',  label: `Véhicules en flotte` },
              { n: 10,    suffix: '+', label: `Villes d'intervention` },
              { n: 11,    suffix: '',  label: `Années d'expérience` },
            ].map(({ n, suffix, label }) => (
              <motion.div key={label} className={styles.impactCard} variants={fade}>
                <span className={styles.impactN}>
                  <Counter target={n} suffix={suffix} />
                </span>
                <span className={styles.impactL}>{label}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className={styles.clientsRow}
            initial="hidden" animate={impactInView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } } }}
          >
            {CLIENTS.map((c) => (
              <motion.div key={c} className={styles.clientPill} variants={fade}>
                <span className={styles.clientName}>{c}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FLOTTE
      ══════════════════════════════════ */}
      <section id="flotte" ref={fleetRef} className={styles.fleet}>
        <div className={styles.container}>
          <motion.div
            className={styles.fleetIntro}
            initial="hidden" animate={fleetInView ? 'visible' : 'hidden'} variants={fade}
          >
            <div className={styles.fleetText}>
              <p className={styles.eyebrow}>Logistique</p>
              <h2 className={styles.h2}>Une Flotte de 27 Véhicules</h2>
              <p>
                SIGECED dispose d'une flotte robuste et opérationnelle pour garantir la mobilité de ses équipes
                sur l'ensemble du territoire ivoirien.
              </p>
              <p>
                16 pick-up bâchés 4×4 double cabine, 2 bâchés simple cabine, 5 berlines
                et 3 berlines 4×4 — une logistique terrain sans compromis.
              </p>
              <div className={styles.fleetStat}>
                <span className={styles.fleetStatN}>27</span>
                <span className={styles.fleetStatL}>Véhicules déployés<br />sur le terrain</span>
              </div>
            </div>
            <div className={styles.fleetImg}>
              <img src="/sigeced/flotte-2.png" alt="Toyota Land Cruiser SIGECED" />
            </div>
          </motion.div>

          <motion.div
            className={styles.fleetGrid}
            initial="hidden" animate={fleetInView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
          >
            {[
              { src: '/sigeced/flotte-1.png', alt: `Mitsubishi L200` },
              { src: '/sigeced/flotte-3.png', alt: `Toyota Hilux blanc` },
              { src: '/sigeced/flotte-4.png', alt: `Toyota Hilux noir` },
              { src: '/sigeced/flotte-5.png', alt: `Mitsubishi L200 argent` },
              { src: '/sigeced/flotte-6.png', alt: `Mitsubishi L200 pick-up` },
              { src: '/sigeced/flotte-2.png', alt: `Toyota Land Cruiser` },
            ].map(({ src, alt }) => (
              <motion.div key={src} className={styles.fleetThumb} variants={fade}>
                <img src={src} alt={alt} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          GALERIE
      ══════════════════════════════════ */}
      <section id="galerie" ref={galRef} className={styles.gallery}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHead}
            initial="hidden" animate={galInView ? 'visible' : 'hidden'} variants={fade}
          >
            <p className={styles.eyebrow}>Nos chantiers</p>
            <h2 className={styles.h2}>Galerie</h2>
          </motion.div>

          <motion.div
            className={styles.galleryGrid}
            initial="hidden" animate={galInView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {GALERIE.map(({ src, caption, big }) => (
              <motion.div
                key={src}
                className={`${styles.galleryItem} ${big ? styles.galleryBig : ''}`}
                variants={fade}
              >
                <img src={src} alt={caption} />
                <span className={styles.galleryCaption}>{caption}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CONTACT
      ══════════════════════════════════ */}
      <section id="contact" ref={contactRef} className={styles.contact}>
        <div className={styles.container}>
          <motion.div
            className={styles.contactGrid}
            initial="hidden" animate={contactInView ? 'visible' : 'hidden'} variants={fade}
          >
            {/* Infos */}
            <div className={styles.contactInfo}>
              <p className={styles.eyebrow}>Nous Rejoindre</p>
              <h3>Contactez-nous</h3>
              <p>
                Notre équipe d'ingénieurs et de techniciens est disponible pour répondre
                à toutes vos questions, de la conception jusqu'à la livraison.
              </p>

              <div className={styles.contactDetails}>
                <div className={styles.contactLine}>
                  <Mail size={15} />
                  <span>sigeced.sarl@gmail.com</span>
                </div>
                <div className={styles.contactLine}>
                  <Phone size={15} />
                  <span>+225 07 07 71 75 89<br />+225 07 08 62 50 87</span>
                </div>
                <div className={styles.contactLine}>
                  <MapPin size={15} />
                  <span>Marcory Zone 4, Rue Marconi<br />21 BP 5297 Abidjan 21</span>
                </div>
              </div>

              <Link to="/" className={styles.backBtn}>
                <ArrowLeft size={12} /> Retour au Groupe
              </Link>
            </div>

            {/* Formulaire */}
            <div>
              {submitted ? (
                <p className={styles.successMsg}>
                  ✓ &nbsp;Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.
                </p>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label htmlFor="nom">Nom complet</label>
                      <input
                        id="nom"
                        type="text"
                        placeholder="Votre nom"
                        value={formData.nom}
                        onChange={e => setFormData(p => ({ ...p, nom: e.target.value }))}
                        required
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="email">Adresse e-mail</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="objet">Objet</label>
                    <select
                      id="objet"
                      value={formData.objet}
                      onChange={e => setFormData(p => ({ ...p, objet: e.target.value }))}
                      required
                    >
                      <option value="">Sélectionnez un objet</option>
                      <option value="Bureau d'études">Bureau d'études & Conception</option>
                      <option value="Construction">Construction & Réhabilitation</option>
                      <option value="Génie civil">Génie Civil & Électrification</option>
                      <option value="VRD">Voirie, Réseaux & Assainissement</option>
                      <option value="Sécurité">Sécurité & Gardiennage</option>
                      <option value="Fournitures">Fournitures & Entretien</option>
                      <option value="Autre">Autre demande</option>
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      rows={6}
                      placeholder="Décrivez votre projet ou votre demande..."
                      value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      required
                    />
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    Envoyer le message <Send size={13} />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FOOTER
      ══════════════════════════════════ */}
      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerInner}`}>
          <div>
            <span className={styles.footerBrand}>SIGECED</span>
            <p>Société Ivoirienne de Génie Civil, d'Entretien et Divers</p>
          </div>
          <p className={styles.footerCopy}>
            © {new Date().getFullYear()} SIGECED SARL · Marcory Zone 4, Abidjan
          </p>
        </div>
      </footer>

    </div>
  )
}
