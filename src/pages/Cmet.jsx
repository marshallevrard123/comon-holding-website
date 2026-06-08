import FilialePage from '../components/FilialePage'
import { Stethoscope, ScanLine, FlaskConical, Scissors, Heart, Siren, Eye, Smile, Activity, Baby } from 'lucide-react'

// Charte : Bleu royal + Bleu clair
export default function Cmet() {
  return (
    <FilialePage
      slug="cmet"
      name="Clinique Médicale Espérance de Toumodi"
      sector="Santé · Clinique Médicale Privée"
      tagline="La santé de qualité, accessible à tous, au cœur de Toumodi."
      description={`Créée en 2011 et transformée en SARL en mai 2013, la Clinique Médicale Espérance de Toumodi (CMET) est la première structure de médecine privée implantée dans la commune de Toumodi. Filiale santé du groupe COM'ON Holding, elle est établie au Quartier Kondoubo, Route de Dimbokro, et dessert les populations de Toumodi et de toute sa région.\n\nAvec une équipe de 142 professionnels de santé — dont 91 salariés permanents et 51 prestataires vacataires spécialistes —, la CMET offre une gamme complète de services médicaux allant des consultations simples aux interventions chirurgicales. Son positionnement de pôle en médecine privée dans la commune lui confère un avantage concurrentiel unique, renforcé par plus d'une décennie d'expérience au service des patients.`}
      logo="/logos/cmet.png"
      logoDark={true}
      heroColor="#030C2A"
      primaryColor="#1565C0"
      accentColor="#42A5F5"
      lightBg="#F2F6FC"

      stats={[
        { n: '2011', label: 'Année de création' },
        { n: '142',  label: 'Professionnels de santé' },
        { n: '11+',  label: 'Spécialités médicales' },
        { n: '24h',  label: 'Urgences disponibles' },
      ]}

      valeurs={[
        {
          titre: 'Accessibilité des soins',
          desc: 'Première structure de médecine privée de Toumodi, la CMET rend les soins spécialisés accessibles aux populations de la commune et de toute la région.',
        },
        {
          titre: 'Excellence médicale',
          desc: 'Une équipe pluridisciplinaire de médecins spécialistes, chirurgiens, sages-femmes, infirmiers spécialistes et techniciens biomédicaux à votre service.',
        },
        {
          titre: 'Équipements modernes',
          desc: 'Radiologie numérisée, mammographie, panoramique dentaire, bloc opératoire équipé — des équipements de pointe pour un diagnostic et des soins fiables.',
        },
        {
          titre: 'Accompagnement personnalisé',
          desc: 'Chaque patient bénéficie d\'une prise en charge humaine, attentive et individualisée, du premier contact jusqu\'au suivi post-consultation.',
        },
        {
          titre: 'Expertise & ancienneté',
          desc: 'Plus de 13 ans d\'expérience en médecine privée à Toumodi constituent un atout majeur pour la qualité et la continuité des soins prodigués.',
        },
        {
          titre: 'Développement continu',
          desc: 'De nouveaux services sont en cours d\'ouverture : maternité, néonatologie, réanimation, dialyse et stérilisation, pour une offre toujours plus complète.',
        },
      ]}

      services={[
        {
          title: 'Consultations & Spécialités',
          icon: Stethoscope,
          desc: 'Médecine générale, gynéco-obstétrique, cardiologie, pédiatrie, diabétologie, traumatologie et chirurgie générale & pédiatrique assurées par des spécialistes.',
        },
        {
          title: 'Chirurgie & Bloc Opératoire',
          icon: Scissors,
          desc: 'Bloc opératoire équipé pour les interventions chirurgicales programmées et urgentes — chirurgie générale, pédiatrique et gynécologique.',
        },
        {
          title: 'Imagerie & Radiologie',
          icon: ScanLine,
          desc: 'Radiologie complète avec numérisation, mammographie, panoramique dentaire et examens d\'imagerie diagnostique pour un suivi précis.',
        },
        {
          title: 'Laboratoire d\'Analyses',
          icon: FlaskConical,
          desc: 'Laboratoire d\'analyses biologiques médicales pour des résultats rapides et fiables, essentiels à un diagnostic de qualité.',
        },
        {
          title: 'Ophtalmologie & Dentaire',
          icon: Eye,
          desc: 'Cabinet d\'ophtalmologie et cabinet dentaire avec soins complets, consultations spécialisées et équipements adaptés.',
        },
        {
          title: 'Urgences 24h/24',
          icon: Siren,
          desc: 'Service d\'urgences médicales disponible 24h/24 et 7j/7, pour une prise en charge immédiate quelle que soit l\'heure.',
        },
        {
          title: 'Kinésithérapie',
          icon: Activity,
          desc: 'Séances de kinésithérapie et de rééducation fonctionnelle pour accompagner la récupération post-opératoire et les affections chroniques.',
        },
        {
          title: 'Pharmacie & Hospitalisations',
          icon: Heart,
          desc: 'Pharmacie interne et unités d\'hospitalisation pour assurer la continuité des soins et le suivi des patients en toute sécurité.',
        },
        {
          title: 'Maternité & Pédiatrie',
          icon: Baby,
          desc: 'Services de maternité et de pédiatrie en développement, pour accompagner les femmes enceintes et les nouveau-nés dans les meilleures conditions.',
        },
      ]}

      gallery={[
        { src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80', alt: 'Couloir de la clinique', caption: 'Nos infrastructures modernes' },
        { src: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=700&q=80', alt: 'Consultation médicale', caption: 'Consultations spécialisées' },
        { src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=700&q=80', alt: 'Équipements médicaux', caption: 'Équipements de pointe' },
        { src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700&q=80', alt: 'Équipe médicale', caption: 'Notre équipe soignante' },
        { src: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=700&q=80', alt: 'Maternité', caption: 'Maternité & pédiatrie' },
      ]}

      contact={{
        email: 'cliniquesperancetdi@gmail.com',
        tel: '+225 07 07 84 02 20 / 01 40 68 20 66 / 27 30 62 90 39',
        adresse: 'Quartier Kondoubo, Route Dimbokro, Ilot 21 — BP 253 Toumodi',
      }}
    />
  )
}
