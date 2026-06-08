import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Calendar, CheckCircle2 } from 'lucide-react'
import styles from './Contact.module.css'
import SEO from '../../components/SEO'

const SPECIALITES_OPTIONS = [
  `Médecine Générale`, `Gynécologie-Obstétrique`, `Pédiatrie`,
  `Chirurgie Générale`, `Ophtalmologie`, `Cabinet Dentaire`,
  `Cardiologie`, `Diabétologie`, `Radiologie / Imagerie`,
  `Laboratoire d'Analyses`, `Urgences`, `Autre`,
]

export default function Contact() {
  const [form, setForm] = useState({
    nom: '', prenom: '', tel: '', email: '',
    specialite: '', motif: '', message: '', rdv: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()

    // Construire le message WhatsApp avec les données du formulaire
    const lignes = [
      `🏥 *Demande de rendez-vous CMET*`,
      ``,
      `👤 *Patient :* ${form.prenom} ${form.nom}`,
      `📞 *Téléphone :* ${form.tel}`,
      form.email ? `📧 *Email :* ${form.email}` : null,
      form.specialite ? `🩺 *Spécialité :* ${form.specialite}` : null,
      form.motif ? `📋 *Motif :* ${form.motif}` : null,
      form.message ? `💬 *Message :* ${form.message}` : null,
      form.rdv ? `✅ Confirmation souhaitée par SMS/WhatsApp` : null,
    ].filter(Boolean).join('\n')

    const url = `https://wa.me/2250707840220?text=${encodeURIComponent(lignes)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  return (
    <div className="page-content">
      <SEO
        title="Contact & Rendez-vous — CMET Toumodi"
        description="Prenez rendez-vous à la Clinique Médicale Espérance de Toumodi. Appelez le 07 07 84 02 20 ou contactez-nous via WhatsApp. Urgences disponibles 24h/24, 7j/7."
        slug="/cmet/contact"
        favicon="/favicon-cmet.ico"
      />
      {/* Header */}
      <section className={styles.pageHero}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="label">Nous joindre</p>
            <div className="divider" />
            <h1>Contact & Rendez-vous</h1>
            <p className={styles.heroLead}>
              Notre équipe est disponible pour répondre à toutes vos questions,
              vous orienter et vous aider à prendre rendez-vous avec le spécialiste adapté.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Infos rapides */}
      <section className={styles.quickInfo}>
        <div className="container">
          <div className={styles.quickGrid}>
            <a href="tel:+2250707840220" className={styles.quickCard}>
              <div className={`${styles.quickIcon} ${styles.qBlue}`}><Phone size={22} /></div>
              <div>
                <span className={styles.quickLabel}>Appel direct</span>
                <strong>07 07 84 02 20</strong>
                <span className={styles.quickSub}>01 40 68 20 66 — 27 30 62 90 39</span>
              </div>
            </a>
            <a
              href="https://wa.me/2250707840220?text=Bonjour, je souhaite prendre rendez-vous à CMET."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.quickCard}
            >
              <div className={`${styles.quickIcon} ${styles.qWa}`}><MessageCircle size={22} /></div>
              <div>
                <span className={styles.quickLabel}>WhatsApp</span>
                <strong>07 07 84 02 20</strong>
                <span className={styles.quickSub}>Réponse rapide</span>
              </div>
            </a>
            <a href="mailto:cliniquesperancetdi@gmail.com" className={styles.quickCard}>
              <div className={`${styles.quickIcon} ${styles.qGreen}`}><Mail size={22} /></div>
              <div>
                <span className={styles.quickLabel}>Email</span>
                <strong>cliniquesperancetdi@gmail.com</strong>
                <span className={styles.quickSub}>Réponse sous 24h</span>
              </div>
            </a>
            <div className={`${styles.quickCard} ${styles.qNoLink}`}>
              <div className={`${styles.quickIcon} ${styles.qOrange}`}><Clock size={22} /></div>
              <div>
                <span className={styles.quickLabel}>Urgences</span>
                <strong>Ouvert 24h/24 · 7j/7</strong>
                <span className={styles.quickSub}>Sans rendez-vous pour urgences</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grille Contact */}
      <section className={`section ${styles.contactSection}`}>
        <div className="container">
          <div className={styles.contactGrid}>
            {/* Formulaire */}
            <div className={styles.formWrapper}>
              <div className={styles.formHeader}>
                <Calendar size={22} className={styles.formHeaderIcon} />
                <div>
                  <h2>Prendre Rendez-vous</h2>
                  <p>Remplissez ce formulaire et nous vous recontactons dans les plus brefs délais.</p>
                </div>
              </div>

              {submitted ? (
                <div className={styles.successBox}>
                  <CheckCircle2 size={48} className={styles.successIcon} />
                  <h3>Message envoyé !</h3>
                  <p>Merci pour votre message. Notre équipe vous contactera très prochainement pour confirmer votre rendez-vous.</p>
                  <button className="btn btn-outline" onClick={() => setSubmitted(false)}>
                    Nouveau message
                  </button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label htmlFor="nom">Nom *</label>
                      <input id="nom" type="text" placeholder="Votre nom" required value={form.nom} onChange={e => set('nom', e.target.value)} />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="prenom">Prénom *</label>
                      <input id="prenom" type="text" placeholder="Votre prénom" required value={form.prenom} onChange={e => set('prenom', e.target.value)} />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label htmlFor="tel">Téléphone *</label>
                      <input id="tel" type="tel" placeholder="+225 00 00 00 00 00" required value={form.tel} onChange={e => set('tel', e.target.value)} />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="email">Email</label>
                      <input id="email" type="email" placeholder="votre@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="specialite">Spécialité souhaitée</label>
                    <select id="specialite" value={form.specialite} onChange={e => set('specialite', e.target.value)}>
                      <option value="">Sélectionnez une spécialité</option>
                      {SPECIALITES_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="motif">Motif de la consultation</label>
                    <input id="motif" type="text" placeholder="Ex : douleurs abdominales, suivi grossesse..." value={form.motif} onChange={e => set('motif', e.target.value)} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="message">Message complémentaire</label>
                    <textarea id="message" rows={4} placeholder="Informations supplémentaires, questions..." value={form.message} onChange={e => set('message', e.target.value)} />
                  </div>
                  <div className={styles.checkField}>
                    <input type="checkbox" id="rdv" checked={form.rdv} onChange={e => set('rdv', e.target.checked)} />
                    <label htmlFor="rdv">Je souhaite une confirmation de rendez-vous par SMS / WhatsApp</label>
                  </div>
                  <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
                    <Send size={15} /> Envoyer ma demande
                  </button>
                </form>
              )}
            </div>

            {/* Infos contact */}
            <div className={styles.infoCol}>
              <div className={styles.infoCard}>
                <h3>Informations Pratiques</h3>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}><MapPin size={18} /></div>
                  <div>
                    <strong>Adresse</strong>
                    <p>Toumodi, Quartier Kondoubo<br />Route de Dimbokro, Îlot 21<br />BP 253 Toumodi</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}><Phone size={18} /></div>
                  <div>
                    <strong>Téléphones</strong>
                    <p>
                      <a href="tel:+2250707840220">07 07 84 02 20</a><br />
                      <a href="tel:+2250140682066">01 40 68 20 66</a><br />
                      <a href="tel:+22527306290 39">27 30 62 90 39</a>
                    </p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}><Mail size={18} /></div>
                  <div>
                    <strong>Email</strong>
                    <p><a href="mailto:cliniquesperancetdi@gmail.com">cliniquesperancetdi@gmail.com</a></p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}><Clock size={18} /></div>
                  <div>
                    <strong>Heures de visite aux patients</strong>
                    <p>
                      <em>Lundi – Samedi :</em><br />
                      6h30 – 7h30<br />
                      12h30 – 13h30<br />
                      18h30 – 19h30<br /><br />
                      <em>Dimanche & Jours fériés :</em><br />
                      11h30 – 14h30<br />
                      18h30 – 19h30
                    </p>
                  </div>
                </div>

                <div className={styles.urgenceBox}>
                  <div className={styles.urgenceDot} />
                  <div>
                    <strong>Urgences</strong>
                    <p>Disponibles 24h/24, 7j/7 sans rendez-vous</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp rapide */}
              <a
                href="https://wa.me/2250707840220?text=Bonjour CMET, je souhaite prendre rendez-vous."
                target="_blank"
                rel="noopener noreferrer"
                className={styles.waCard}
              >
                <MessageCircle size={28} />
                <div>
                  <strong>Contacter via WhatsApp</strong>
                  <span>Réponse rapide — disponible 24h/24</span>
                </div>
              </a>
            </div>
          </div>

          {/* Carte Google Maps */}
          <div className={styles.mapSection}>
            <h3 style={{ marginBottom: '24px' }}>Nous Localiser</h3>
            <div className={styles.mapContainer}>
              <iframe
                title="CMET Toumodi"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63569.0!2d-5.0!3d6.57!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1c39e44e8f5b7a41%3A0x0!2zVG91bW9kaSwgQ8O0dGUgZCdJdm9pcmU!5e0!3m2!1sfr!2sci!4v1620000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
