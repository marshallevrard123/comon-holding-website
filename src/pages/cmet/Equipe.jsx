import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users, UserCheck, GraduationCap, Calendar, Phone, ChevronRight } from 'lucide-react'
import styles from './Equipe.module.css'
import SEO from '../../components/SEO'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

/* ── SUGGESTION : données à compléter avec photos réelles ── */
const EQUIPE_PLACEHOLDER = [
  { initiale: 'Dr', nom: `Médecin Généraliste`, specialite: `Médecine Générale`, disponibilite: `Lun – Sam` },
  { initiale: 'Dr', nom: `Gynécologue-Obstétricien`, specialite: `Gynécologie-Obstétrique`, disponibilite: `Lun – Ven` },
  { initiale: 'Dr', nom: `Chirurgien Général`, specialite: `Chirurgie Générale`, disponibilite: `Sur RDV` },
  { initiale: 'Dr', nom: `Pédiatre`, specialite: `Pédiatrie`, disponibilite: `Lun – Sam` },
  { initiale: 'Dr', nom: `Ophtalmologiste`, specialite: `Ophtalmologie`, disponibilite: `Lun – Ven` },
  { initiale: 'Dr', nom: `Cardiologue`, specialite: `Cardiologie`, disponibilite: `Sur RDV` },
  { initiale: 'Dr', nom: `Chirurgien Dentiste`, specialite: `Odontologie`, disponibilite: `Lun – Sam` },
  { initiale: 'Dr', nom: `Médecin Urgentiste`, specialite: `Urgences 24h/24`, disponibilite: `24h/24 – 7j/7` },
]

const STATS = [
  { icon: Users,       n: '142', l: `Professionnels au total` },
  { icon: UserCheck,   n: '91',  l: `Salariés permanents` },
  { icon: GraduationCap, n: '51', l: `Prestataires vacataires` },
  { icon: Calendar,    n: '24/7', l: `Disponibilité urgences` },
]

export default function Equipe() {
  return (
    <div className="page-content">
      <SEO
        title="Notre Équipe Médicale — CMET Toumodi"
        description="Rencontrez l'équipe médicale pluridisciplinaire de la CMET : médecins, sages-femmes, infirmiers, laborantins et techniciens dédiés aux soins de santé à Toumodi, Côte d'Ivoire."
        slug="/cmet/equipe"
        favicon="/favicon-cmet.ico"
      />
      <section className={styles.pageHero}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="label">Nos professionnels</p>
            <div className="divider" />
            <h1>Notre Équipe Médicale</h1>
            <p className={styles.heroLead}>
              142 professionnels de santé — médecins généralistes et spécialistes, infirmiers,
              sages-femmes, techniciens de laboratoire et personnel de soutien —
              au service de votre santé.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats équipe */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {STATS.map(({ icon: Icon, n, l }) => (
              <div key={l} className={styles.statCard}>
                <div className={styles.statIcon}><Icon size={24} /></div>
                <strong className={styles.statN}>{n}</strong>
                <span className={styles.statL}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notice */}
      <section className={`section ${styles.notice}`}>
        <div className="container">
          <div className={styles.noticeBanner}>
            <div className={styles.noticeIcon}>ℹ️</div>
            <div>
              <h3>Section en cours de mise à jour</h3>
              <p>
                Les fiches détaillées de nos médecins et spécialistes sont en cours de rédaction.
                Cette section sera bientôt enrichie avec les noms, spécialités, photos et disponibilités
                de chaque praticien. En attendant, vous pouvez nous contacter directement pour
                prendre rendez-vous avec le spécialiste de votre choix.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cartes placeholder */}
      <section className={`section ${styles.team}`}>
        <div className="container">
          <div className="section-header">
            <p className="label">L'équipe</p>
            <div className="divider divider-center" />
            <h2>Nos Spécialistes</h2>
            <p style={{ marginTop: '12px' }}>
              *(Présentation provisoire — les noms réels seront ajoutés ultérieurement)*
            </p>
          </div>
          <motion.div
            className={styles.teamGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {EQUIPE_PLACEHOLDER.map(({ initiale, nom, specialite, disponibilite }) => (
              <motion.div key={specialite} className={styles.memberCard} variants={fadeUp}>
                <div className={styles.memberAvatar}>
                  <span>{initiale}</span>
                </div>
                <div className={styles.memberInfo}>
                  <h3 className={styles.memberName}>{nom}</h3>
                  <span className={`badge badge-bleu ${styles.memberSpec}`}>{specialite}</span>
                  <div className={styles.memberDispo}>
                    <Calendar size={12} />
                    <span>{disponibilite}</span>
                  </div>
                </div>
                <Link to="/cmet/contact" className={styles.memberBtn}>
                  Prendre RDV <ChevronRight size={13} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Catégories personnel */}
      <section className={`section ${styles.categories}`}>
        <div className="container">
          <div className="section-header">
            <p className="label">Notre organisation</p>
            <div className="divider divider-center" />
            <h2>Organisation des Ressources Humaines</h2>
          </div>
          <div className={styles.catsGrid}>
            {[
              { titre: `Personnel Médical`, desc: `Médecins généralistes, spécialistes et chirurgiens assurant les consultations, diagnostics et interventions.`, color: 'bleu' },
              { titre: `Personnel Paramédical`, desc: `Infirmiers, sages-femmes, aides-soignants, techniciens de laboratoire et de radiologie.`, color: 'vert' },
              { titre: `Personnel Administratif`, desc: `Équipe d'accueil, facturation, gestion des dossiers patients et coordination des rendez-vous.`, color: 'rose' },
              { titre: `Personnel de Soutien`, desc: `Maintenance, nettoyage, cuisine et logistique garantissant le bon fonctionnement de la clinique.`, color: 'bleu' },
            ].map(({ titre, desc, color }) => (
              <div key={titre} className={`${styles.catCard} ${styles[`cat${color.charAt(0).toUpperCase() + color.slice(1)}`]}`}>
                <h3>{titre}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rejoindre */}
      <section className={styles.recrutement}>
        <div className="container">
          <div className={styles.recrutCard}>
            <h2>Rejoindre l'Équipe CMET</h2>
            <p>
              CMET recrute régulièrement des professionnels de santé qualifiés et motivés.
              Si vous souhaitez rejoindre notre équipe, envoyez-nous votre candidature.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:cliniquesperancetdi@gmail.com?subject=Candidature spontanée CMET" className="btn btn-white">
                Envoyer ma candidature
              </a>
              <Link to="/cmet/contact" className={`btn ${styles.btnContact}`}>
                Nous contacter <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
