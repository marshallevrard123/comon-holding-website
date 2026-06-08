import { lazy, Suspense, useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FILIALES_LOCATIONS } from '../data/locations'
import SEO from './SEO'
import FloatingParticles from './FloatingParticles'
import FilialeSubnav from './FilialeSubnav'
import styles from './FilialePage.module.css'

/* ── Compteur animé ── */
function AnimatedStat({ value, primaryColor }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const numeric = parseInt(value.replace(/\D/g, ''))
    if (isNaN(numeric) || numeric === 0) { setDisplay(value); return }
    const suffix = value.replace(/[\d]/g, '')
    const duration = 1200
    const steps = 40
    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * numeric)
      setDisplay(current + suffix)
      if (step >= steps) { setDisplay(value); clearInterval(timer) }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref} className={styles.statN} style={{ color: primaryColor }}>
      {display}
    </span>
  )
}

const MapSection = lazy(() => import('./MapSection'))

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.4,0,0.2,1] }
  }),
}

/**
 * Template générique pour chaque page filiale.
 *
 * Props:
 *  - name         : string  — nom complet de la filiale
 *  - sector       : string  — secteur d'activité
 *  - tagline      : string  — accroche courte
 *  - description  : string  — description longue (\n\n = nouveau paragraphe)
 *  - logo         : string? — chemin vers le logo (ex: "/logos/assurances.png")
 *  - logoDark     : boolean? — true si le logo a un fond sombre
 *  - icon         : ReactNode — icône Lucide (fallback si pas de logo)
 *  - services     : { title, desc }[] — liste de services/offres
 *  - heroColor    : string  — couleur de fond du hero
 *  - primaryColor : string  — couleur principale (accents, boutons, titres de section)
 *  - accentColor  : string  — couleur secondaire
 *  - lightBg      : string  — couleur de fond clair des sections services
 *  - url          : string? — lien vers site externe
 *  - contact      : { adresse?, email?, tel? }?
 */
export default function FilialePage({
  slug,
  name, sector, tagline, description,
  logo, logoDark = false, icon: Icon,
  services = [],
  gallery = [],
  stats = [],
  valeurs = [],
  heroColor = '#0D0D0D',
  primaryColor = '#8B1A1A',
  accentColor = '#B22222',
  lightBg = '#F4F4F2',
  url, contact,
}) {
  const paragraphs = description ? description.split('\n\n') : []

  // Trouve les coordonnées de cette filiale
  const locationData = FILIALES_LOCATIONS.find(l => l.slug === slug)
  const mapLocation = locationData
    ? [{ ...locationData, color: primaryColor }]
    : null

  // Injection des couleurs custom via style inline sur la racine
  const cssVars = {
    '--fp-primary':   primaryColor,
    '--fp-accent':    accentColor,
    '--fp-light-bg':  lightBg,
    '--fp-hero':      heroColor,
  }

  /* ── Favicon dynamique via canvas → data URL (contourne le cache navigateur) ── */
  useEffect(() => {
    const setFavicon = (href, type = 'image/png') => {
      // Supprime tous les favicons existants
      document.querySelectorAll("link[rel*='icon']").forEach(el => el.remove())
      const link = document.createElement('link')
      link.rel = 'icon'
      link.type = type
      link.href = href
      document.head.appendChild(link)
    }

    if (!logo) return

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = 64
        canvas.height = 64
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, 64, 64)
        setFavicon(canvas.toDataURL('image/png'))
      } catch {
        // fallback si canvas bloqué (CORS)
        setFavicon(logo + '?v=' + Date.now())
      }
    }
    img.onerror = () => setFavicon(logo + '?v=' + Date.now())
    img.src = logo

    return () => setFavicon('/favicon.svg', 'image/svg+xml')
  }, [logo])

  /* ── Résumé SEO : 1er paragraphe de la description (max 155 car.) ── */
  const seoDescription = (() => {
    const base = paragraphs[0] || tagline || ''
    const suffix = ` — Filiale de COM'ON Holding, Abidjan, Côte d'Ivoire.`
    return (base + suffix).slice(0, 155)
  })()

  /* ── Sections visibles pour la subnav ── */
  const subnavSections = [
    ...(description                ? [{ id: 'fp-apropos',      label: 'À propos'         }] : []),
    ...(valeurs.length > 0         ? [{ id: 'fp-engagements',  label: 'Nos Engagements'  }] : []),
    ...(services.length > 0        ? [{ id: 'fp-services',     label: 'Nos Services'     }] : []),
    ...(gallery.length > 0         ? [{ id: 'fp-galerie',      label: 'En Images'        }] : []),
    ...(true                       ? [{ id: 'fp-contact',      label: 'Contact'          }] : []),
  ]

  return (
    <main className="page-enter" style={cssVars}>
      <SEO
        title={`${name} – ${sector}`}
        description={seoDescription}
        slug={`/${slug}`}
        favicon={logo || null}
        jsonLd={{
          '@type': 'LocalBusiness',
          name,
          description: paragraphs[0] || tagline,
          url: url || `https://www.comonholding.com/${slug}`,
          parentOrganization: { '@type': 'Organization', name: "COM'ON Holding", url: 'https://www.comonholding.com' },
          address: contact?.adresse
            ? { '@type': 'PostalAddress', streetAddress: contact.adresse, addressCountry: 'CI' }
            : undefined,
          telephone: contact?.tel,
          email: contact?.email,
        }}
      />

      {createPortal(
        <FilialeSubnav sections={subnavSections} primaryColor={primaryColor} />,
        document.body
      )}

      {/* ── HERO FILIALE ── */}
      <section className={styles.hero} style={{ background: heroColor }}>
        <FloatingParticles color={accentColor} />
        <div className={styles.heroGlow} />
        {/* Lien retour — collé au bord gauche, hors container */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
          style={{ position: 'absolute', top: 36, left: 40, zIndex: 10 }}>
          <Link to="/" className={styles.backLink}>
            <ArrowLeft size={14} /> Retour au Groupe
          </Link>
        </motion.div>

        <div className={`container ${styles.heroInner}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div className={styles.heroMain} variants={fadeUp} initial="hidden" animate="visible" custom={1}>
            {logo
              ? <img src={logo} alt={name} className={styles.heroLogo} />
              : Icon && <div className={styles.heroIcon} style={{ color: accentColor }}><Icon size={48} strokeWidth={1} /></div>
            }
            <p className={styles.heroSector}>{sector}</p>
            <h1 className={styles.heroTitle}>{name}</h1>
            {tagline && <p className={styles.heroTagline}>{tagline}</p>}
            <div className={styles.heroDivider} />
            {url && (
              <a href={url} target="_blank" rel="noreferrer"
                className={styles.heroBtn}
                style={{ borderColor: accentColor, color: '#fff' }}>
                Visiter le site <ArrowRight size={14} />
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      {stats.length > 0 && (
        <section className={styles.statsBar}>
          <div className="container">
            <div className={styles.statsGrid}>
              {stats.map((s, i) => (
                <motion.div key={i} className={styles.statItem}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                  <AnimatedStat value={s.n} primaryColor={primaryColor} />
                  <span className={styles.statL}>{s.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── DESCRIPTION ── */}
      {description && (
        <section id="fp-apropos" className={`section ${styles.descSection}`}>
          {/* Logo filigrane centré */}
          {logo && (
            <img src={logo} aria-hidden="true" className={styles.descFiligrane} alt="" />
          )}
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div className={styles.descGrid}>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <p className={styles.label}>À propos</p>
                <h2>{name}</h2>
                <div className={styles.divider} />
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>
                {paragraphs.map((p, i) => (
                  <p key={i} style={{ marginBottom: i < paragraphs.length - 1 ? 20 : 0 }}>{p}</p>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ── VALEURS / ENGAGEMENTS ── */}
      {valeurs.length > 0 && (
        <section id="fp-engagements" className={styles.valeursSection} style={{ background: heroColor }}>
          <div className={styles.valeursGlow} style={{ background: `radial-gradient(ellipse at 50% 0%, ${primaryColor}22 0%, transparent 65%)` }} />
          <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 90, paddingBottom: 90 }}>
            <motion.div className={styles.servicesHeader}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className={styles.label} style={{ color: accentColor }}>Nos Engagements</p>
              <h2 style={{ color: '#fff' }}>Ce qui nous distingue</h2>
              <div className={styles.divider} style={{ margin: '20px auto 48px', background: primaryColor }} />
            </motion.div>
            <div className={styles.valeursGrid}>
              {valeurs.map((v, i) => (
                <motion.div key={i} className={styles.valeurCard}
                  style={{ borderColor: `${primaryColor}44` }}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i % 3}>
                  <span className={styles.valeurNum} style={{ color: primaryColor }}>0{i + 1}</span>
                  <h3 className={styles.valeurTitre}>{v.titre}</h3>
                  <p className={styles.valeurDesc}>{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SERVICES / OFFRES ── */}
      {services.length > 0 && (
        <section id="fp-services" className={styles.services} style={{ background: lightBg }}>
          <div className="container" style={{ paddingTop: 90, paddingBottom: 90 }}>
            <motion.div className={styles.servicesHeader}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className={styles.label}>Nos Offres</p>
              <h2>Ce que nous proposons</h2>
              <div className={styles.divider} style={{ margin: '20px auto 36px' }} />
            </motion.div>
            <div className={styles.servicesGrid}>
              {services.map((s, i) => (
                <motion.div key={i} className={styles.serviceCard}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i % 3}
                  style={{ '--card-accent': primaryColor }}>
                  {/* Illustration décorative en fond */}
                  {s.icon && (
                    <div className={styles.serviceIllustration} style={{ color: primaryColor }}>
                      <s.icon size={90} strokeWidth={0.8} />
                    </div>
                  )}
                  <span className={styles.serviceNum}
                    style={{ color: primaryColor, opacity: 0.18 }}>0{i + 1}</span>
                  <h3 className={styles.serviceTitle}>{s.title}</h3>
                  <p className={styles.serviceDesc}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── GALERIE PHOTOS ── */}
      {gallery.length > 0 && (
        <section id="fp-galerie" className={styles.gallery}>
          <div className="container" style={{ paddingTop: 80, paddingBottom: 80 }}>
            <motion.div className={styles.servicesHeader}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className={styles.label}>En images</p>
              <h2>Notre établissement</h2>
              <div className={styles.divider} style={{ margin: '20px auto 48px' }} />
            </motion.div>
            <div className={styles.galleryGrid}>
              {gallery.map((img, i) => (
                <motion.div key={i} className={`${styles.galleryItem} ${i === 0 ? styles.galleryItemLarge : ''}`}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i % 3}>
                  <img src={img.src} alt={img.alt || name} className={styles.galleryImg} />
                  {img.caption && <p className={styles.galleryCaption}>{img.caption}</p>}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CARTE ── */}
      {mapLocation && (
        <Suspense fallback={
          <div style={{ height: 400, background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: '#444', letterSpacing: 3, fontSize: 11, textTransform: 'uppercase' }}>Chargement de la carte…</p>
          </div>
        }>
          <MapSection
            locations={mapLocation}
            title={`Nous trouver`}
            subtitle={mapLocation[0]?.address}
            height="420px"
            singleMode={true}
          />
        </Suspense>
      )}

      {/* ── CTA ── */}
      <section id="fp-contact" className={styles.cta} style={{ background: heroColor }}>
        <div className={styles.ctaGlow} style={{ background: `radial-gradient(ellipse at center, ${primaryColor}33 0%, transparent 70%)` }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div className={styles.ctaInner}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className={styles.label} style={{ color: accentColor }}>Contact</p>
            <h2 style={{ color: '#fff' }}>Intéressé par nos services ?</h2>

            {/* Infos de contact */}
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
              {contact?.adresse && (
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>
                  📍 {contact.adresse}
                </p>
              )}
              {contact?.tel && (
                <a href={`tel:${contact.tel.replace(/\s/g,'')}`}
                  style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, letterSpacing: 1, fontWeight: 500, textDecoration: 'none' }}>
                  📞 {contact.tel}
                </a>
              )}
              {contact?.email && (
                <a href={`mailto:${contact.email}`}
                  style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'none' }}>
                  ✉ {contact.email}
                </a>
              )}
            </div>

            <div style={{ marginTop: 36, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/#contact"
                className={styles.ctaBtn}
                style={{ background: primaryColor, color: '#fff', border: `1.5px solid ${primaryColor}` }}>
                Nous contacter
              </Link>
              <Link to="/" className={styles.ctaBtnOutline}>
                <ArrowLeft size={14} /> Retour au Groupe
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
