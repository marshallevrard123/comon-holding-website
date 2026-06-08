import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  ChevronLeft, ChevronDown, Phone, Mail, MapPin,
  ShoppingCart, Wheat, Hammer, Send, MessageCircle,
  TrendingUp, Package, Users, Truck, Globe, Leaf,
  Menu, X,
} from 'lucide-react'
import styles from './DistriAgri.module.css'
import SEO from '../components/SEO'

/* ── Animation helpers ─────────────── */
const fadeUp  = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } }
const fadeIn  = { hidden: { opacity: 0 },         visible: { opacity: 1 } }
const fadeLeft  = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } }
const fadeRight = { hidden: { opacity: 0, x: 40  }, visible: { opacity: 1, x: 0 } }

function useView(opts = {}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px', ...opts })
  return [ref, inView]
}

/* ── Données ───────────────────────── */
const POLES = [
  {
    icon: ShoppingCart,
    titre: 'Produits de Grande Consommation',
    color: '#E8720C',
    img: '/distri/livraison-jus.png',
    desc: 'Distribution de jus, eaux minérales et produits de consommation courante sur Abidjan et l\'intérieur.',
    tags: ['Jus\'mo', 'Riz', 'Eaux minérales', 'Maquis & Restaurants'],
  },
  {
    icon: Wheat,
    titre: 'Agro-Distribution',
    color: '#2D7A4F',
    img: '/distri/marche-vivriers.png',
    desc: 'De la terre à la table : manioc, pastèques, ignames et produits vivriers en flux direct depuis les producteurs.',
    tags: ['Manioc', 'Ignames', 'Pastèques', 'Marché Bagnon'],
  },
  {
    icon: Hammer,
    titre: 'Quincaillerie & BTP',
    color: '#C8941A',
    img: '/distri/entrepot-riz.png',
    desc: 'Matériaux de construction, équipements modernes et solutions innovantes pour les bâtisseurs de demain.',
    tags: ['Matériaux', 'Équipements', 'Isolation', 'Solaire'],
  },
]

const TERRAIN_BLOCKS = [
  {
    img: '/distri/stock-jus.png',
    tag: 'PGC — Jus & Riz',
    titre: 'L\'obsession du terrain',
    desc: 'Nous ne sommes pas de simples livreurs — nous sommes des créateurs de consommation et de proximité. Notre stratégie terrain couvre Abidjan et toute la zone Centre-Nord.',
    liste: [
      'Travail de nuit pour conquérir maquis et restaurants',
      '8 grossistes stratégiques à Tiébissou, Bouaké, Béoumi, Sakassou, Katiola',
      'Dégustation, réapprovisionnement instantané, écoute client',
      'Action spéciale dans les supermarchés des stations-service',
    ],
    reverse: false,
  },
  {
    img: '/distri/degustation-bagnon.png',
    tag: 'Partenariats — Terrain',
    titre: 'Les femmes de Bagnon : nos alliées stratégiques',
    desc: 'Au marché de Bagnon, nous avons construit des partenariats solides avec les revendeuses pour assurer un approvisionnement continu en produits vivriers.',
    liste: [
      'Réseau de "Mamans du marché" fidélisées',
      'Approvisionnement continu en vivriers locaux',
      'Séances de dégustation et formation produits',
      'Circuit direct producteur → marché → consommateur',
    ],
    reverse: true,
  },
]

const PERSPECTIVES = [
  {
    icon: '🏪',
    bg: 'rgba(232,114,12,0.15)',
    titre: 'Com\'on Fresh',
    desc: 'Création de magasins de produits frais — viande, fruits et légumes bio — avec la touche locale et ivoirienne.',
  },
  {
    icon: '💧',
    bg: 'rgba(45,122,79,0.2)',
    titre: 'Branding Territorial',
    desc: 'Lancement de marques d\'eau de proximité (Eau de Toumodi, Eau de Yamoussoukro…) pour ancrer l\'appartenance locale.',
  },
  {
    icon: '🌶️',
    bg: 'rgba(200,148,26,0.15)',
    titre: 'Export & Transformation',
    desc: 'Piment bec d\'oiseau emballé, amidon de manioc et boutures — des produits à fort potentiel d\'exportation internationale.',
  },
  {
    icon: '🌍',
    bg: 'rgba(76,175,117,0.15)',
    titre: 'Partenariats Internationaux',
    desc: 'Expansion vers Burkina Faso et nouvelles marques nationales pour élargir notre réseau de distribution sous-régional.',
  },
]

const NAV_LINKS = [
  { href: '#apropos',      label: 'À Propos' },
  { href: '#poles',        label: 'Nos Pôles' },
  { href: '#terrain',      label: 'En Action' },
  { href: '#perspectives', label: 'Vision 2026' },
  { href: '#contact',      label: 'Contact' },
]

/* ══════════════════════════════════════
   Composant principal
   ══════════════════════════════════════ */
export default function DistriAgri() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [form, setForm] = useState({ nom: '', email: '', tel: '', objet: '', message: '' })
  const [sent, setSent] = useState(false)

  // Favicon + titre dynamique
  useEffect(() => {
    const links = document.querySelectorAll("link[rel~='icon']")
    const origHrefs = Array.from(links).map(l => l.href)
    links.forEach(l => { l.setAttribute('type', 'image/x-icon'); l.setAttribute('href', '/favicon-distri.ico') })
    const origTitle = document.title
    document.title = "COM'ON DISTRI-AGRI — Distribution & Commerce en Côte d'Ivoire"
    return () => {
      Array.from(links).forEach((l, i) => l.setAttribute('href', origHrefs[i]))
      document.title = origTitle
    }
  }, [])

  // Scroll
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    const msg = [
      `🛒 *Contact COM'ON DISTRI-AGRI*`,
      ``,
      `👤 *Nom :* ${form.nom}`,
      form.email   ? `📧 *Email :* ${form.email}`     : null,
      form.tel     ? `📞 *Tél :* ${form.tel}`         : null,
      form.objet   ? `📋 *Objet :* ${form.objet}`     : null,
      form.message ? `💬 *Message :* ${form.message}` : null,
    ].filter(Boolean).join('\n')
    window.open(`https://wa.me/2250711461847?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer')
    setSent(true)
    setForm({ nom: '', email: '', tel: '', objet: '', message: '' })
    setTimeout(() => setSent(false), 6000)
  }

  // Refs inView
  const [heroRef,    heroIn]    = useView()
  const [aboutRef,   aboutIn]   = useView()
  const [polesRef,   polesIn]   = useView()
  const [terrainRef, terrainIn] = useView()
  const [galRef,     galIn]     = useView()
  const [perspRef,   perspIn]   = useView()
  const [ctaRef,     ctaIn]     = useView()
  const [contactRef, contactIn] = useView()

  return (
    <div className={styles.page}>
      <SEO
        title="COM'ON DISTRI-AGRI — Distribution & Commerce en Côte d'Ivoire"
        description="COM'ON DISTRI-AGRI, spécialiste de la distribution alimentaire et du commerce en Côte d'Ivoire. Jus de fruits, riz, produits vivriers locaux et importés. Présent à Abidjan et Yamoussoukro."
        slug="/distri-agri"
        image="https://www.comonholding.com/distri/stock-jus.png"
        favicon="/favicon-distri.ico"
        jsonLd={{
          '@type': 'LocalBusiness',
          name: "COM'ON DISTRI-AGRI",
          description: "Distribution alimentaire et commerce en Côte d'Ivoire. Jus de fruits, riz, vivriers locaux et importés.",
          url: 'https://www.comonholding.com/distri-agri',
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

      {/* ══ NAVBAR ══ */}
      <header className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}
        style={{ background: scrolled ? undefined : 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 100%)' }}>
        <div className={styles.navbarTop}>
          <Link to="/" className={styles.backLink}>
            <ChevronLeft size={12} /> Com'on Holding
          </Link>
          <span className={styles.navbarTopItem}><Phone size={12} /> 07 11 46 18 47</span>
          <span className={styles.navbarTopItem}><MapPin size={12} /> Abidjan · Yamoussoukro</span>
        </div>
        <nav>
          <div className={styles.navInner}>
            <Link to="/distri-agri" className={styles.brand}>
              <img src="/distri/logo-distri.png" alt="COM'ON DISTRI-AGRI" className={styles.brandLogo} />
              <div className={styles.brandText}>
                <span className={styles.brandName}>COM'ON DISTRI-AGRI</span>
                <span className={styles.brandSub}>Distribution & Commerce</span>
              </div>
            </Link>
            <ul className={styles.navLinks}>
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className={styles.navLink}>{label}</a>
                </li>
              ))}
            </ul>
            <a href="#contact" className={styles.navCta}>Nous contacter</a>
            <button className={styles.burger} onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className={styles.mobileMenu}>
            <ul className={styles.mobileLinks}>
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className={styles.mobileLink} onClick={() => setMenuOpen(false)}>{label}</a>
                </li>
              ))}
            </ul>
            <a href="#contact" className={styles.navCta} onClick={() => setMenuOpen(false)}>Nous contacter</a>
          </div>
        )}
      </header>

      {/* ══ HERO ══ */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <motion.div
            ref={heroRef}
            initial="hidden" animate={heroIn ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div className={styles.heroEyebrow} variants={fadeUp}>
              <span /> Fondée en 2025 — L'avenir en marche
            </motion.div>
            <motion.h1 className={styles.heroTitle} variants={fadeUp}>
              De la terre à la table,<br />
              <em>du dépôt au marché.</em>
            </motion.h1>
            <motion.p className={styles.heroLead} variants={fadeUp}>
              COM'ON DISTRI-AGRI est la filiale de distribution du Groupe COM'ON Holding,
              dédiée aux produits de grande consommation, aux vivriers et aux matériaux
              de construction en Côte d'Ivoire.
            </motion.p>
            <motion.div className={styles.heroStats} variants={fadeUp}>
              <div className={styles.heroStat}>
                <div className={styles.heroStatNum}>250T</div>
                <div className={styles.heroStatLabel}>Riz réceptionné en 3 mois</div>
              </div>
              <div className={styles.heroStat}>
                <div className={styles.heroStatNum}>30K</div>
                <div className={styles.heroStatLabel}>Cartons objectif 2026</div>
              </div>
              <div className={styles.heroStat}>
                <div className={styles.heroStatNum}>3</div>
                <div className={styles.heroStatLabel}>Pôles d'activités</div>
              </div>
              <div className={styles.heroStat}>
                <div className={styles.heroStatNum}>2</div>
                <div className={styles.heroStatLabel}>Entrepôts opérationnels</div>
              </div>
            </motion.div>
            <motion.div className={styles.heroCtas} variants={fadeUp}>
              <a href="#poles" className={styles.btnPrimary}>
                <Package size={16} /> Découvrir nos pôles
              </a>
              <a href="#contact" className={styles.btnOutline}>
                <MessageCircle size={16} /> Nous contacter
              </a>
            </motion.div>
          </motion.div>
        </div>
        <div className={styles.heroScroll}>
          <ChevronDown size={18} />
          <span>Découvrir</span>
        </div>
      </section>

      {/* ══ À PROPOS ══ */}
      <section id="apropos" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.aboutGrid}>
            {/* Images */}
            <motion.div
              ref={aboutRef}
              className={styles.aboutImgs}
              initial="hidden" animate={aboutIn ? 'visible' : 'hidden'}
              variants={fadeLeft} transition={{ duration: 0.7 }}
            >
              <img src="/distri/entrepot-riz.png" alt="Entrepôt riz" className={styles.aboutImg1} />
              <img src="/distri/reunion-equipe.png" alt="Équipe dirigeante" className={styles.aboutImg2} />
              <div className={styles.aboutBadge}>
                <span className={styles.aboutBadgeNum}>3 mois</span>
                <span className={styles.aboutBadgeLabel}>d'existence</span>
              </div>
            </motion.div>

            {/* Texte */}
            <motion.div
              className={styles.aboutText}
              initial="hidden" animate={aboutIn ? 'visible' : 'hidden'}
              variants={fadeRight} transition={{ duration: 0.7, delay: 0.15 }}
            >
              <p className={styles.eyebrow}><Leaf size={14} /> Notre histoire</p>
              <div className={styles.divider} style={{ margin: '12px 0 20px' }} />
              <h2 className={styles.h2}>Jeunes, agiles et déjà en mouvement</h2>
              <div className={styles.aboutKpis}>
                <div className={styles.kpi}>
                  <div className={styles.kpiNum}>5 000</div>
                  <div className={styles.kpiLabel}>Sacs de riz réceptionnés</div>
                </div>
                <div className={styles.kpi}>
                  <div className={styles.kpiNum}>2 400</div>
                  <div className={styles.kpiLabel}>Cartons de Jus'mo livrés</div>
                </div>
                <div className={styles.kpi}>
                  <div className={styles.kpiNum}>8+</div>
                  <div className={styles.kpiLabel}>Grossistes partenaires</div>
                </div>
              </div>
              <p className={styles.aboutDesc}>
                Créée en novembre 2025, COM'ON DISTRI-AGRI est une entité stratégique du
                Groupe COM'ON Holding, dédiée à l'optimisation de la chaîne de distribution
                de biens de consommation en Côte d'Ivoire.
              </p>
              <p className={styles.aboutDesc}>
                En seulement 3 mois d'existence, nous avons réceptionné 250 tonnes de riz,
                lancé la distribution de Jus'mo sur Abidjan et la zone Centre-Nord, et ouvert
                un entrepôt à Yamoussoukro. L'ambition est entière — la mise en place se fait
                morceau par morceau.
              </p>
              <a href="#contact" className={styles.btnPrimary} style={{ marginTop: '8px', display: 'inline-flex' }}>
                <TrendingUp size={16} /> Travailler avec nous
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ NOS 3 PÔLES ══ */}
      <section id="poles" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}><Package size={14} /> Nos activités</p>
            <div className={styles.divider} />
            <h2 className={styles.h2}>Trois pôles, un seul objectif</h2>
            <p className={styles.lead} style={{ marginTop: '16px' }}>
              Chaque département est piloté par un responsable spécialisé pour une efficacité maximale sur le terrain.
            </p>
          </div>

          <motion.div
            ref={polesRef}
            className={styles.polesGrid}
            initial="hidden" animate={polesIn ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {POLES.map(({ icon: Icon, titre, color, img, desc, tags }) => (
              <motion.div key={titre} className={styles.poleCard} variants={fadeUp}>
                <div className={styles.poleImg}>
                  <img src={img} alt={titre} />
                  <div className={styles.poleImgOverlay} />
                  <div className={styles.poleIconWrap} style={{ background: color }}>
                    <Icon size={22} />
                  </div>
                </div>
                <div className={styles.poleBody}>
                  <h3 className={styles.poleTitle}>{titre}</h3>
                  <p className={styles.poleDesc}>{desc}</p>
                  <div className={styles.poleTags}>
                    {tags.map(t => <span key={t} className={styles.poleTag}>{t}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ EN ACTION (alternance) ══ */}
      <section id="terrain" className={styles.terrainSection}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}><Truck size={14} /> Sur le terrain</p>
            <div className={styles.divider} />
            <h2 className={styles.h2}>Nous ne dormons jamais</h2>
            <p className={styles.lead} style={{ marginTop: '16px' }}>
              Le marché ne s'arrête pas — et nous non plus. De l'entrepôt au marché, voici comment nous opérons.
            </p>
          </div>

          <motion.div
            ref={terrainRef}
            initial="hidden" animate={terrainIn ? 'visible' : 'hidden'}
          >
            {TERRAIN_BLOCKS.map(({ img, tag, titre, desc, liste, reverse }, i) => (
              <motion.div
                key={titre}
                className={`${styles.terrainBlock} ${reverse ? styles.terrainBlockReverse : ''}`}
                variants={fadeUp}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <div className={styles.terrainImg}>
                  <img src={img} alt={titre} />
                </div>
                <div>
                  <p className={styles.terrainTag}><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--da-orange)', display: 'inline-block', marginRight: 8 }} />{tag}</p>
                  <h3 className={styles.terrainTitle}>{titre}</h3>
                  <p className={styles.terrainDesc}>{desc}</p>
                  <ul className={styles.terrainList}>
                    {liste.map(item => (
                      <li key={item}>
                        <span className={styles.terrainDot} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ GALERIE ══ */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}><Users size={14} /> Notre quotidien</p>
            <div className={styles.divider} />
            <h2 className={styles.h2}>DISTRI-AGRI en images</h2>
          </div>
          <motion.div
            ref={galRef}
            className={styles.galerie}
            initial="hidden" animate={galIn ? 'visible' : 'hidden'}
            variants={fadeIn} transition={{ duration: 0.8 }}
          >
            <div className={`${styles.galerieItem} ${styles.galerieItemBig}`}>
              <img src="/distri/degustation-bagnon.png" alt="Séance dégustation Bagnon" />
            </div>
            <div className={styles.galerieItem}>
              <img src="/distri/marche-vivriers.png" alt="Marché vivriers" />
            </div>
            <div className={styles.galerieItem}>
              <img src="/distri/stock-jus.png" alt="Stock jus entrepôt" />
            </div>
            <div className={styles.galerieItem}>
              <img src="/distri/directeur-meeting.png" alt="Direction en réunion" />
            </div>
            <div className={styles.galerieItem}>
              <img src="/distri/piment-export.png" alt="Piment bec d'oiseau export" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ PERSPECTIVES 2026 ══ */}
      <section id="perspectives" className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <p className={`${styles.eyebrow} ${styles.eyebrowDark}`}><Globe size={14} /> Vision 2026</p>
            <div className={styles.divider} />
            <h2 className={`${styles.h2} ${styles.h2White}`}>Rêver grand, agir vite</h2>
            <p className={`${styles.lead} ${styles.leadWhite}`} style={{ marginTop: '16px' }}>
              Aujourd'hui un maillon, demain une chaîne autonome. Voici les projets qui façonnent notre avenir.
            </p>
          </div>

          <motion.div
            ref={perspRef}
            className={styles.perspGrid}
            initial="hidden" animate={perspIn ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {PERSPECTIVES.map(({ icon, bg, titre, desc }) => (
              <motion.div key={titre} className={styles.perspCard} variants={fadeUp}>
                <div className={styles.perspIcon} style={{ background: bg }}>
                  <span style={{ fontSize: 24 }}>{icon}</span>
                </div>
                <h3 className={styles.perspTitle}>{titre}</h3>
                <p className={styles.perspDesc}>{desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Chiffre CTA */}
          <motion.div
            ref={ctaRef}
            initial="hidden" animate={ctaIn ? 'visible' : 'hidden'}
            variants={fadeUp} transition={{ delay: 0.3 }}
            style={{
              marginTop: 56, background: 'rgba(232,114,12,0.15)',
              border: '1px solid rgba(232,114,12,0.3)',
              borderRadius: 20, padding: '40px 48px',
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', flexWrap: 'wrap', gap: 24,
            }}
          >
            <div>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, marginBottom: 8 }}>OBJECTIF 2026</p>
              <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, color: '#FFAD5C', lineHeight: 1 }}>
                30 000 cartons
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: 8, fontSize: 14 }}>
                soit 25 chargements de 1 200 cartons de Jus'mo
              </p>
            </div>
            <a href="#contact" className={styles.btnPrimary} style={{ flexShrink: 0 }}>
              <TrendingUp size={16} /> Rejoindre l'aventure
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}><MessageCircle size={14} /> Contact</p>
            <div className={styles.divider} />
            <h2 className={styles.h2}>Contactez-nous</h2>
          </div>

          <motion.div
            ref={contactRef}
            className={styles.contactGrid}
            initial="hidden" animate={contactIn ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            {/* Formulaire */}
            <motion.div className={styles.contactForm} variants={fadeLeft}>
              <h3 className={styles.formTitle}>Envoyer un message</h3>
              <p className={styles.formSub}>Votre demande sera transmise directement via WhatsApp.</p>

              {sent ? (
                <div className={styles.successMsg}>
                  ✓ &nbsp;Message envoyé ! Nous vous répondons dans les meilleurs délais.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label>Nom complet *</label>
                      <input type="text" placeholder="Votre nom" required value={form.nom} onChange={set('nom')} />
                    </div>
                    <div className={styles.field}>
                      <label>Téléphone</label>
                      <input type="tel" placeholder="+225 00 00 00 00 00" value={form.tel} onChange={set('tel')} />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label>Email</label>
                    <input type="email" placeholder="votre@email.com" value={form.email} onChange={set('email')} />
                  </div>
                  <div className={styles.field}>
                    <label>Objet</label>
                    <select value={form.objet} onChange={set('objet')}>
                      <option value="">Sélectionnez un objet</option>
                      <option value="Commande PGC">Commande PGC (Jus, Riz…)</option>
                      <option value="Commande vivriers">Commande Vivriers</option>
                      <option value="Quincaillerie">Quincaillerie & Matériaux</option>
                      <option value="Partenariat">Partenariat commercial</option>
                      <option value="Recrutement">Recrutement</option>
                      <option value="Autre">Autre demande</option>
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label>Message</label>
                    <textarea rows={4} placeholder="Décrivez votre demande..." value={form.message} onChange={set('message')} />
                  </div>
                  <button type="submit" className={styles.submitBtn}>
                    <Send size={15} /> Envoyer via WhatsApp
                  </button>
                </form>
              )}
            </motion.div>

            {/* Infos */}
            <motion.div className={styles.contactInfo} variants={fadeRight}>
              <h3 className={styles.contactInfoTitle}>Informations pratiques</h3>
              <p className={styles.contactInfoLead}>
                Nous opérons depuis deux sites stratégiques : Abidjan (KM17) pour la distribution
                urbaine et Yamoussoukro pour le Centre-Nord.
              </p>
              <div className={styles.contactItems}>
                <div className={styles.contactItem}>
                  <div className={styles.contactItemIcon}><MapPin size={20} /></div>
                  <div>
                    <div className={styles.contactItemLabel}>Entrepôt Principal</div>
                    <div className={styles.contactItemVal}>Abidjan, KM17 — Entrepôt opérationnel</div>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactItemIcon}><MapPin size={20} /></div>
                  <div>
                    <div className={styles.contactItemLabel}>Siège — Yamoussoukro</div>
                    <div className={styles.contactItemVal}>Yamoussoukro — Hub Centre-Nord</div>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactItemIcon}><Phone size={20} /></div>
                  <div>
                    <div className={styles.contactItemLabel}>Téléphone</div>
                    <div className={styles.contactItemVal}>
                      <a href="tel:+2250711461847">07 11 46 18 47</a>
                    </div>
                  </div>
                </div>
              </div>
              <a
                href="https://wa.me/2250711461847?text=Bonjour%20COM'ON%20DISTRI-AGRI,%20je%20souhaite%20vous%20contacter."
                target="_blank" rel="noopener noreferrer"
                className={styles.waBtn}
              >
                <MessageCircle size={22} />
                <div>
                  <div style={{ fontSize: 15 }}>Contacter sur WhatsApp</div>
                  <div style={{ fontSize: 12, opacity: 0.8 }}>07 11 46 18 47 — Réponse rapide</div>
                </div>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══ CARTE ══ */}
      <section className={styles.mapSection}>
        <div className={styles.container}>
          <div className={styles.mapHeader}>
            <p className={styles.eyebrow}><MapPin size={14} /> Nos implantations</p>
            <div className={styles.divider} />
            <h2 className={styles.h2}>Où nous trouver</h2>
          </div>
          <div className={styles.mapTabs}>
            <div className={styles.mapBadge}>
              <MapPin size={14} /> Abidjan — Entrepôt KM17
            </div>
            <div className={styles.mapBadge}>
              <MapPin size={14} /> Yamoussoukro — Siège
            </div>
          </div>
          <div className={styles.mapWrapper}>
            <iframe
              title="COM'ON DISTRI-AGRI — Abidjan & Yamoussoukro"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254508.38522992474!2d-4.0917385!3d5.3599517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ea5311959121%3A0x3bfa1bfad5e33c78!2sAbidjan%2C%20C%C3%B4te%20d'Ivoire!5e0!3m2!1sfr!2sci!4v1700000000000"
              width="100%" height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            <div>
              <div className={styles.footerBrand}>
                <img src="/distri/logo-distri.png" alt="COM'ON DISTRI-AGRI" className={styles.footerLogo} />
                <div>
                  <div className={styles.footerBrandName}>COM'ON DISTRI-AGRI</div>
                  <div className={styles.footerBrandSub}>Distribution & Commerce</div>
                </div>
              </div>
              <p className={styles.footerDesc}>
                Filiale de distribution du Groupe COM'ON Holding. Produits de grande consommation,
                vivriers et matériaux de construction en Côte d'Ivoire.
              </p>
            </div>
            <div>
              <h4 className={styles.footerColTitle}>Navigation</h4>
              <ul className={styles.footerLinks}>
                {NAV_LINKS.map(({ href, label }) => (
                  <li key={href}><a href={href} className={styles.footerLink}>{label}</a></li>
                ))}
                <li><Link to="/" className={styles.footerLink}>← Retour au Groupe</Link></li>
              </ul>
            </div>
            <div>
              <h4 className={styles.footerColTitle}>Contact</h4>
              <ul className={styles.footerContacts}>
                <li><MapPin size={14} /><span>Abidjan, KM17</span></li>
                <li><MapPin size={14} /><span>Yamoussoukro — Siège</span></li>
                <li><Phone size={14} /><span><a href="tel:+2250711461847" className={styles.footerLink}>07 11 46 18 47</a></span></li>
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>© {new Date().getFullYear()} COM'ON DISTRI-AGRI SARL. Tous droits réservés.</p>
            <p className={styles.footerHolding}>Membre de <strong>COM'ON Holding</strong></p>
          </div>
        </div>
      </footer>

    </div>
  )
}
