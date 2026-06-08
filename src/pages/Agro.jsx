import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, ChevronDown, ArrowRight,
  Wheat, Leaf, FlaskConical, Sprout, Globe, Tractor,
  MapPin, Mail, Phone,
} from 'lucide-react'
import styles from './Agro.module.css'
import SEO from '../components/SEO'

/* ════════════════════════════════
   Compteur animé
   ════════════════════════════════ */
function Counter({ target, suffix = '' }) {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const num = parseInt(String(target).replace(/\D/g, ''))
    if (!num) { setVal(target); return }
    const steps = 54
    let step = 0
    const t = setInterval(() => {
      step++
      const ease = 1 - Math.pow(1 - step / steps, 3)
      setVal(Math.round(ease * num))
      if (step >= steps) { setVal(num); clearInterval(t) }
    }, 1800 / steps)
    return () => clearInterval(t)
  }, [inView, target])

  return <span ref={ref}>{val.toLocaleString('fr-FR')}{suffix}</span>
}

/* ════════════════════════════════
   Subnav Agro (portal)
   ════════════════════════════════ */
const NAV_ITEMS = [
  { id: 'hero',         label: 'Accueil'      },
  { id: 'apropos',      label: 'À Propos'     },
  { id: 'activites',    label: 'Activités'    },
  { id: 'produits',     label: 'Produits'     },
  { id: 'realisations', label: 'Réalisations' },
  { id: 'actualites',   label: 'Actualités'   },
  { id: 'galerie',      label: 'Galerie'      },
  { id: 'contact',      label: 'Contact'      },
]

function AgroSubnav() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const obs = []
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id) },
        { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
      )
      o.observe(el)
      obs.push(o)
    })
    return () => obs.forEach(o => o.disconnect())
  }, [])

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return createPortal(
    <nav className={styles.subnav}>
      <div className={styles.subnavInner}>
        <Link to="/" className={styles.subnavBack}>
          <ArrowLeft size={12} /> Groupe
        </Link>
        <div className={styles.subnavDivider} />
        {NAV_ITEMS.map(({ id, label }) => (
          <button
            key={id}
            className={`${styles.subnavTab} ${active === id ? styles.subnavTabActive : ''}`}
            onClick={() => go(id)}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>,
    document.body
  )
}

/* ════════════════════════════════
   Données
   ════════════════════════════════ */
const ACTIVITES = [
  {
    icon: Wheat,
    title: `Production Agricole`,
    desc: `Riziculture, maïs, soja, igname et manioc sur 3 000 ha. Mécanisation avancée et systèmes d'irrigation pour une production à grande échelle et toute l'année.`,
  },
  {
    icon: Sprout,
    title: `Accompagnement des Producteurs`,
    desc: `Pépinières, transfert de compétences et appui technique aux agriculteurs locaux pour améliorer les rendements, la qualité et la durabilité des récoltes.`,
  },
  {
    icon: FlaskConical,
    title: `Transformation`,
    desc: `Amidon de manioc, poudre et huile essentielle de piment bec d'oiseau, conditionnement du riz. Valorisation locale à haute valeur ajoutée de toutes nos cultures.`,
  },
  {
    icon: Globe,
    title: `Distribution & Export`,
    desc: `Commercialisation sur les marchés locaux et régionaux. Stratégie d'exportation active vers Madagascar, le Sénégal et l'ensemble de l'Afrique de l'Ouest.`,
  },
  {
    icon: Tractor,
    title: `Innovation Agricole`,
    desc: `Nouveau concept de culture résiliente au changement climatique. Partenariat avec AfricaRice et le programme LEGACY pour l'autosuffisance africaine en riz d'ici 2035.`,
  },
]

const PRODUITS = [
  {
    img: `/agro/produit-riz.png`,
    badge: `Riziculture`,
    name: `Riz Premium`,
    desc: `Riz local, riz noir et riz rouge de Madagascar cultivés sur nos rizières irriguées — 3 à 4 récoltes par an, pour un riz de qualité à grande échelle.`,
  },
  {
    img: `/agro/produit-manioc.png`,
    badge: `Transformation`,
    name: `Manioc & Amidon`,
    desc: `Manioc cultivé sur nos terres d'Assounvoué, transformé en amidon industriel dans notre unité locale. Destiné aux marchés industriels et à l'export.`,
  },
  {
    img: `/agro/produit-piment.png`,
    badge: `Valorisation`,
    name: `Piment Bec d'Oiseau`,
    desc: `Récolte manuelle de piment bec d'oiseau, transformé en poudre conditionnée et en huile essentielle à haute valeur ajoutée. Production en extension rapide.`,
  },
  {
    img: `/agro/produit-igname.png`,
    badge: `Tubercules`,
    name: `Igname`,
    desc: `Six variétés — Lokpa, Klêklê, Savié, Bondoukou, Florido, Brésil — cultivées sur 70 ha en 2026, avec extension à 200 ha d'ici 2028.`,
  },
  {
    img: `/agro/produit-mais.png`,
    badge: `Cultures Saisonnières`,
    name: `Maïs & Soja`,
    desc: `Production en rotation sur 75 ha (grande saison), stockage de semences pour les marchés à haute valeur. Extension prévue à 400 ha d'ici 2028.`,
  },
  {
    img: `/agro/produit-maraichage.png`,
    badge: `Maraîchage`,
    name: `Légumes Frais`,
    desc: `Cultures maraîchères à cycle court — pastèques, gombo, aubergines — sur le site d'Assounvoué, pour les marchés locaux de proximité.`,
  },
]

const STATS = [
  { val: 3000,  sfx: ` ha`, label: `Hectares cultivés`     },
  { val: 6,     sfx: ``,         label: `Filières agricoles`    },
  { val: 720,   sfx: ` t`,  label: `Production riz / an`   },
  { val: 3,     sfx: ``,         label: `Pays d'implantation`   },
  { val: 15,    sfx: `+`,        label: `Agents de terrain`     },
  { val: 2035,  sfx: ``,         label: `Vision Afrique`        },
]

const ACTU = [
  {
    img: `/agro/actu-1.png`,
    tag: `Terrain`,
    date: `Janvier 2026`,
    title: `Entretien de la bananeraie : l'équipe à l'œuvre à Assounvoué`,
    desc: `Les équipes de terrain poursuivent l'entretien et l'extension de la plantation de banane plantin. Les premières récoltes confirment la viabilité de la filière.`,
  },
  {
    img: `/agro/actu-2.png`,
    tag: `Récolte`,
    date: `Décembre 2025`,
    title: `Grande récolte d'igname : un camion entier à Assounvoué`,
    desc: `Les 21 premiers hectares d'igname ont été récoltés avec succès. La production dépasse les objectifs initiaux et ouvre la voie à l'extension à 70 ha.`,
  },
  {
    img: `/agro/actu-3.png`,
    tag: `Mécanisation`,
    date: `Novembre 2025`,
    title: `Nouveau chantier de défrichement : 100 ha/mois désormais possibles`,
    desc: `La cellule d'appui mécanisée de COM'ON AGRO monte en puissance. L'excavatrice ouvre de nouvelles parcelles pour la riziculture et les cultures vivrières.`,
  },
]

const GALERIE = [
  `/agro/galerie-1.png`,
  `/agro/galerie-2.png`,
  `/agro/galerie-3.png`,
  `/agro/galerie-4.png`,
  `/agro/galerie-5.png`,
  `/agro/galerie-6.png`,
]

/* ════════════════════════════════
   Helper d'animation
   ════════════════════════════════ */
const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: `-80px` },
  transition:  { duration: 0.72, delay, ease: [0.4, 0, 0.2, 1] },
})

/* ════════════════════════════════
   PAGE PRINCIPALE
   ════════════════════════════════ */
export default function Agro() {
  const [form, setForm]   = useState({ nom: ``, email: ``, tel: ``, message: `` })
  const [sent, setSent]   = useState(false)

  useEffect(() => {
    const links = document.querySelectorAll("link[rel~='icon']")
    const origHrefs = Array.from(links).map(l => l.href)
    links.forEach(l => {
      l.setAttribute('type', 'image/x-icon')
      l.setAttribute('href', '/favicon-agro.ico')
    })
    const origTitle = document.title
    document.title = "COM'ON Agro — Agro-industrie en Côte d'Ivoire"
    return () => {
      Array.from(links).forEach((l, i) => l.setAttribute('href', origHrefs[i]))
      document.title = origTitle
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const lignes = [
      `🌾 *Demande de contact COM'ON Agro*`,
      ``,
      `👤 *Nom :* ${form.nom}`,
      form.email   ? `📧 *Email :* ${form.email}`     : null,
      form.tel     ? `📞 *Téléphone :* ${form.tel}`   : null,
      form.message ? `💬 *Message :* ${form.message}` : null,
    ].filter(Boolean).join('\n')
    window.open(`https://wa.me/2250711461847?text=${encodeURIComponent(lignes)}`, '_blank', 'noopener,noreferrer')
    setSent(true)
    setForm({ nom: ``, email: ``, tel: ``, message: `` })
    setTimeout(() => setSent(false), 5000)
  }

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  return (
    <div className={styles.page}>
      <SEO
        title="COM'ON Agro — Agro-industrie en Côte d'Ivoire"
        description="COM'ON Agro est la filiale agro-industrielle du Groupe COM'ON Holding. Transformation fruitière, aviculture, maraîchage et distribution alimentaire en Côte d'Ivoire."
        slug="/agro"
        image="https://www.comon-holding.ci/agro/hero-agro.jpg"
        favicon="/favicon-agro.ico"
        jsonLd={{
          '@type': 'LocalBusiness',
          name: "COM'ON Agro",
          description: "Filiale agro-industrielle du Groupe COM'ON Holding spécialisée en transformation fruitière, aviculture et distribution alimentaire.",
          url: 'https://www.comon-holding.ci/agro',
          telephone: '+2250711461847',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Abidjan',
            addressCountry: 'CI',
          },
          areaServed: "Côte d'Ivoire",
          priceRange: '$$',
        }}
      />
      <AgroSubnav />

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section id="hero" className={styles.hero}>
        <img
          src="/agro/hero.png"
          alt="COM'ON AGRO — Plantations en Côte d'Ivoire"
          className={styles.heroBg}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <motion.img
            src="/logos/comon-agro.png"
            alt="COM'ON AGRO"
            className={styles.heroLogo}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          />

          <motion.span className={styles.heroEyebrow}
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}>
            COM'ON AGRO · Côte d'Ivoire
          </motion.span>

          <motion.h1 className={styles.heroTitle}
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14 }}>
            Cultiver <em>l'Avenir</em><br />de l'Afrique
          </motion.h1>

          <motion.p className={styles.heroSub}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}>
            Agriculture résiliente · Innovation · Impact durable
          </motion.p>

          <motion.div className={styles.heroCtas}
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.44 }}>
            <a href="#activites" className={styles.ctaPrimary}>Découvrir nos activités</a>
            <a href="#contact"   className={styles.ctaOutline}>Nous contacter</a>
          </motion.div>
        </div>

        <motion.div className={styles.heroStatsBar}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.7 }}>
          {STATS.slice(0, 4).map((s, i) => (
            <div key={i} className={styles.heroStat}>
              <span className={styles.heroStatN}>{s.val.toLocaleString('fr-FR')}{s.sfx}</span>
              <span className={styles.heroStatL}>{s.label}</span>
            </div>
          ))}
        </motion.div>

        <a href="#apropos" className={styles.scrollHint} aria-label="Défiler">
          <ChevronDown size={20} />
        </a>
      </section>

      {/* ══ À PROPOS ══════════════════════════════════════════ */}
      <section id="apropos" className={styles.about}>
        <div className={styles.container}>
          <div className={styles.aboutGrid}>
            <motion.div className={styles.aboutImgWrap} {...fadeUp(0)}>
              <img
                src="/agro/apropos.png"
                alt="Champs COM'ON AGRO"
              />
              <div className={styles.aboutBadge}>
                <span className={styles.aboutBadgeN}>3 000</span>
                <span className={styles.aboutBadgeL}>hectares cultivés</span>
              </div>
            </motion.div>

            <motion.div className={styles.aboutText} {...fadeUp(0.14)}>
              <span className={styles.label}>Notre Histoire</span>
              <h2 className={styles.h2}>
                Une Agriculture Moderne<br />au Service de l'Afrique
              </h2>
              <p>
                COM'ON AGRO est la filiale agro-industrielle du groupe COM'ON Holding.
                Pionnière d'un nouveau concept de culture résiliente face aux changements
                climatiques, nous opérons sur 3 000 ha en Côte d'Ivoire avec une vision
                panafricaine d'expansion à Madagascar, au Sénégal et dans toute l'Afrique de l'Ouest.
              </p>
              <p>
                De la riziculture à la valorisation du piment bec d'oiseau, en passant par
                les tubercules et le maraîchage, nous construisons une agriculture diversifiée,
                mécanisée et innovante — pour nourrir l'Afrique d'aujourd'hui et de demain,
                en visant l'autosuffisance alimentaire du continent d'ici 2035.
              </p>

              <div className={styles.aboutPillars}>
                {[
                  { icon: `🌱`, title: `Durabilité`,  desc: `Pratiques respectueuses de l'environnement et du sol` },
                  { icon: `⚡`, title: `Innovation`,  desc: `Mécanisation, irrigation et recherche variétale avancées` },
                  { icon: `🌍`, title: `Impact`,      desc: `Vision autosuffisance alimentaire Afrique 2035` },
                ].map((p, i) => (
                  <div key={i} className={styles.pillar}>
                    <span className={styles.pillarIcon}>{p.icon}</span>
                    <div>
                      <span className={styles.pillarTitle}>{p.title}</span>
                      <p className={styles.pillarDesc}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ ACTIVITÉS ═════════════════════════════════════════ */}
      <section id="activites" className={styles.activities}>
        <div className={styles.container}>
          <motion.div className={styles.sectionHead} {...fadeUp()}>
            <span className={styles.label}>Ce que nous faisons</span>
            <h2 className={styles.h2}>Nos Domaines d'Intervention</h2>
            <p className={styles.lead}>
              De la production à la distribution, COM'ON AGRO couvre l'ensemble
              de la chaîne de valeur agricole en Afrique.
            </p>
          </motion.div>
          <div className={styles.activitiesGrid}>
            {ACTIVITES.map((a, i) => {
              const Icon = a.icon
              return (
                <motion.div key={i} className={styles.actCard} {...fadeUp(i * 0.09)}>
                  <div className={styles.actIconWrap}><Icon size={26} /></div>
                  <h3 className={styles.actTitle}>{a.title}</h3>
                  <p className={styles.actDesc}>{a.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══ PRODUITS ══════════════════════════════════════════ */}
      <section id="produits" className={styles.products}>
        <div className={styles.container}>
          <motion.div className={styles.sectionHead} {...fadeUp()}>
            <span className={styles.label}>Nos Produits</span>
            <h2 className={styles.h2}>De la Terre à Votre Table</h2>
            <p className={styles.lead}>
              Des produits agricoles de qualité, cultivés avec soin sur nos sites en Côte d'Ivoire
              et valorisés localement pour des marchés exigeants.
            </p>
          </motion.div>
          <div className={styles.productsGrid}>
            {PRODUITS.map((p, i) => (
              <motion.div key={i} className={styles.productCard} {...fadeUp(i * 0.08)}>
                <div className={styles.productThumb}>
                  <img src={p.img} alt={p.name} />
                  <span className={styles.productBadge}>{p.badge}</span>
                </div>
                <div className={styles.productBody}>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ RÉALISATIONS ══════════════════════════════════════ */}
      <section id="realisations" className={styles.real}>
        <img
          src="/agro/realisations-bg.png"
          className={styles.realBg} alt=""
        />
        <div className={styles.realOverlay} />
        <div className={styles.container}>
          <motion.div className={styles.sectionHead} {...fadeUp()}>
            <span className={`${styles.label} ${styles.labelGold}`}>Nos Chiffres</span>
            <h2 className={`${styles.h2} ${styles.h2White}`}>L'Impact COM'ON AGRO</h2>
          </motion.div>

          <div className={styles.realGrid}>
            {STATS.map((s, i) => (
              <motion.div key={i} className={styles.realCard} {...fadeUp(i * 0.09)}>
                <span className={styles.realN}>
                  <Counter target={s.val} suffix={s.sfx} />
                </span>
                <span className={styles.realL}>{s.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div className={styles.realQuote} {...fadeUp(0.3)}>
            <blockquote>
              « Apprendre, partager, tant qu'y a de l'échange, y'a de l'espoir. »
            </blockquote>
            <cite>Vision COM'ON AGRO — 2026</cite>
          </motion.div>
        </div>
      </section>

      {/* ══ ACTUALITÉS ════════════════════════════════════════ */}
      <section id="actualites" className={styles.news}>
        <div className={styles.container}>
          <motion.div className={styles.sectionHead} {...fadeUp()}>
            <span className={styles.label}>Actualités</span>
            <h2 className={styles.h2}>Dernières Nouvelles</h2>
          </motion.div>
          <div className={styles.newsGrid}>
            {ACTU.map((a, i) => (
              <motion.article key={i} className={styles.newsCard} {...fadeUp(i * 0.12)}>
                <div className={styles.newsThumb}>
                  <img src={a.img} alt={a.title} />
                  <span className={styles.newsTag}>{a.tag}</span>
                </div>
                <div className={styles.newsBody}>
                  <span className={styles.newsDate}>{a.date}</span>
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GALERIE ═══════════════════════════════════════════ */}
      <section id="galerie" className={styles.gallery}>
        <div className={styles.container}>
          <motion.div className={styles.sectionHead} {...fadeUp()}>
            <span className={styles.label}>En Images</span>
            <h2 className={styles.h2}>COM'ON AGRO sur le Terrain</h2>
          </motion.div>
          <div className={styles.galleryGrid}>
            {GALERIE.map((src, i) => (
              <motion.div
                key={i}
                className={`${styles.galleryItem} ${i === 0 ? styles.galleryBig : ''}`}
                {...fadeUp(i * 0.07)}
              >
                <img src={src} alt={`COM'ON AGRO — Photo ${i + 1}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ═══════════════════════════════════════════ */}
      <section id="contact" className={styles.contact}>
        <div className={styles.container}>
          <motion.div className={styles.sectionHead} {...fadeUp()}>
            <span className={`${styles.label} ${styles.labelGold}`}>Contactez-nous</span>
            <h2 className={`${styles.h2} ${styles.h2White}`}>Contactez-nous</h2>
          </motion.div>

          <div className={styles.contactGrid}>
            {/* Infos */}
            <motion.div className={styles.contactInfo} {...fadeUp(0)}>
              <h3>COM'ON AGRO</h3>
              <p>
                Filiale agro-industrielle du groupe COM'ON Holding.<br />
                Nous sommes présents en Côte d'Ivoire, Madagascar et Sénégal.
              </p>
              <div className={styles.contactDetails}>
                <div className={styles.contactLine}>
                  <MapPin size={15} />
                  <span>Site de la Cabane — Assounvoué, Côte d'Ivoire</span>
                </div>
                <div className={styles.contactLine}>
                  <Mail size={15} />
                  <span>agro@comon-holding.ci</span>
                </div>
                <div className={styles.contactLine}>
                  <Phone size={15} />
                  <span>+225 27 21 39 86 54</span>
                </div>
              </div>
              <Link to="/" className={styles.backBtn}>
                <ArrowLeft size={13} /> Retour au groupe COM'ON Holding
              </Link>
            </motion.div>

            {/* Formulaire */}
            <motion.form className={styles.form} onSubmit={handleSubmit} {...fadeUp(0.14)}>
              {sent && (
                <div className={styles.successMsg}>
                  ✓ Merci ! Votre message a été envoyé. Nous vous répondrons rapidement.
                </div>
              )}
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label>Nom complet *</label>
                  <input
                    type="text" required placeholder="Votre nom"
                    value={form.nom} onChange={set('nom')}
                  />
                </div>
                <div className={styles.field}>
                  <label>Email *</label>
                  <input
                    type="email" required placeholder="votre@email.com"
                    value={form.email} onChange={set('email')}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label>Téléphone</label>
                <input
                  type="tel" placeholder="+225 XX XX XX XX XX"
                  value={form.tel} onChange={set('tel')}
                />
              </div>
              <div className={styles.field}>
                <label>Message *</label>
                <textarea
                  required rows={5}
                  placeholder="Décrivez votre projet, votre demande de partenariat ou votre question..."
                  value={form.message} onChange={set('message')}
                />
              </div>
              <button type="submit" className={styles.submitBtn}>
                Envoyer le message <ArrowRight size={15} />
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════ */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerInner}>
            <div>
              <span className={styles.footerBrand}>COM'ON AGRO</span>
              <p>Filiale de COM'ON Holding · Côte d'Ivoire · {new Date().getFullYear()}</p>
            </div>
            <p className={styles.footerCopy}>
              © {new Date().getFullYear()} COM'ON AGRO. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
