import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Shield, CheckCircle2, Phone, Mail, MessageCircle } from 'lucide-react'
import styles from './Assurances.module.css'
import SEO from '../../components/SEO'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const ASSURANCES = [
  `AFIYAH`, `AMAT-CI`, `AMG SANTE`, `ANKARA`, `ASCOMA CI`,
  `ATLANTIQUE ASSUR`, `AXA CI`, `BANASSUR`, `BIAM`, `CHORUS`,
  `CIMEF`, `e-CARE`, `FPAMP`, `FPEF`, `FPM`, `FPPN`,
  `GCYA SANT`, `GGA CI`, `IIPS`, `IVOIR'SANTE`, `MADGI`,
  `MAE-CI`, `MCI CARE`, `MENET SANTE`, `MGA & PS`,
  `M2U CIE`, `M2U SODECI`, `MSPCI`, `MUGAS CI`, `MUSCOP CI`,
  `MUSATRAPCI`, `MUTREPCI`, `MUT.ST RAPHAEL`, `MUTUELLE SANTE ET BIEN ETRE`,
  `MOYIVA`, `NOVELIA`, `NSIA`, `ODYSSEY`, `OLEA`,
  `SCA INTER A`, `SERENITY`, `SIPROMED`, `SOGEMAD`, `SOINS`,
  `VITA SATE`, `VITALIS`, `W.T.W`,
]

const ETAPES = [
  { num: '1', titre: `Vérification`, desc: `Consultez la liste des assurances acceptées ou contactez-nous pour vérifier votre couverture.` },
  { num: '2', titre: `Présentation`, desc: `Lors de votre visite, présentez votre carte d'assurance et votre pièce d'identité à l'accueil.` },
  { num: '3', titre: `Prise en charge`, desc: `Notre équipe administrative traite votre dossier directement avec votre assurance.` },
  { num: '4', titre: `Soins & Suivi`, desc: `Vous recevez vos soins. Votre quote-part est calculée selon votre contrat d'assurance.` },
]

export default function Assurances() {
  const gridRef = useRef(null)
  const inView = useInView(gridRef, { once: true, margin: '-60px' })

  return (
    <div className="page-content">
      <SEO
        title="Assurances Acceptées — CMET Toumodi"
        description="La CMET accepte les principales assurances maladie en Côte d'Ivoire. Consultez la liste des assurances partenaires et les modalités de prise en charge à la Clinique Médicale Espérance de Toumodi."
        slug="/cmet/assurances"
        favicon="/favicon-cmet.ico"
      />
      {/* Header */}
      <section className={styles.pageHero}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="label">Prise en charge</p>
            <div className="divider" />
            <h1>Assurances & Mutuelles Acceptées</h1>
            <p className={styles.heroLead}>
              CMET collabore avec plus de <strong>47 compagnies d'assurance et mutuelles</strong> pour
              faciliter votre accès aux soins et alléger votre reste-à-charge.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className={`section ${styles.intro}`}>
        <div className="container">
          <div className={styles.introGrid}>
            <div>
              <p className="label">Notre engagement</p>
              <div className="divider" />
              <h2>Soins Accessibles pour Tous</h2>
              <p style={{ marginTop: '18px', marginBottom: '16px' }}>
                CMET s'est engagée auprès de la grande majorité des assureurs privés et mutuelles
                de Côte d'Ivoire pour garantir à ses patients une prise en charge optimale et sans
                avance de frais excessive.
              </p>
              <p>
                Pour les patients non assurés, CMET pratique également des tarifs accessibles afin
                que chaque habitant de Toumodi puisse bénéficier de soins médicaux de qualité.
              </p>
            </div>
            <div className={styles.introCards}>
              {[
                { n: '47+', l: `Assurances partenaires`, color: 'bleu' },
                { n: '100%', l: `Actes pris en charge`, color: 'vert' },
              ].map(({ n, l, color }) => (
                <div key={l} className={`${styles.introCard} ${styles[`card${color.charAt(0).toUpperCase() + color.slice(1)}`]}`}>
                  <strong>{n}</strong>
                  <span>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Liste assurances */}
      <section className={`section ${styles.liste}`}>
        <div className="container">
          <div className="section-header">
            <p className="label">Nos partenaires</p>
            <div className="divider divider-center" />
            <h2>Assurances Acceptées</h2>
            <p style={{ marginTop: '12px' }}>Liste mise à jour. Contactez-nous pour confirmer la prise en charge de votre contrat.</p>
          </div>

          <motion.div
            ref={gridRef}
            className={styles.assurancesGrid}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
          >
            {ASSURANCES.map(name => (
              <motion.div key={name} className={styles.assurancePill} variants={fadeUp}>
                <Shield size={14} className={styles.pillIcon} />
                <span>{name}</span>
                <CheckCircle2 size={13} className={styles.pillCheck} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className={`section ${styles.processus}`}>
        <div className="container">
          <div className="section-header">
            <p className="label">Comment ça marche</p>
            <div className="divider divider-center" />
            <h2>Votre Prise en Charge en 4 Étapes</h2>
          </div>
          <div className={styles.etapesGrid}>
            {ETAPES.map(({ num, titre, desc }) => (
              <div key={num} className={styles.etapeCard}>
                <div className={styles.etapeNum}>{num}</div>
                <h3 className={styles.etapeTitre}>{titre}</h3>
                <p className={styles.etapeDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vérification assurance */}
      <section className={styles.verification}>
        <div className="container">
          <div className={styles.verifCard}>
            <div className={styles.verifText}>
              <Shield size={40} className={styles.verifIcon} />
              <h2>Votre Assurance est-elle Acceptée ?</h2>
              <p>
                Vous n'êtes pas sûr que votre assurance soit prise en charge par CMET ?
                Contactez-nous directement — notre équipe administrative vous répondra dans les plus brefs délais.
              </p>
            </div>
            <div className={styles.verifBtns}>
              <a href="tel:+2250707840220" className="btn btn-white">
                <Phone size={15} /> Appeler la clinique
              </a>
              <a
                href="https://wa.me/2250707840220?text=Bonjour, je souhaite vérifier si mon assurance est acceptée à CMET."
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${styles.btnWa}`}
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
              <Link to="/cmet/contact" className={`btn ${styles.btnContact}`}>
                <Mail size={15} /> Formulaire de contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
