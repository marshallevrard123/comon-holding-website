import { motion } from 'framer-motion'
import FilialePage from '../components/FilialePage'
import { Car, HeartPulse, Building2, Users, Sprout, BookOpen } from 'lucide-react'

const PARTENAIRES = [
  { nom: 'SUNU Assurances',   logo: '/logos/assurances/sunu.png'          },
  { nom: 'AXA Côte d\'Ivoire', logo: '/logos/assurances/axa.png'          },
  { nom: 'NSIA Assurances',   logo: '/logos/assurances/nsia.png'          },
  { nom: 'SanlamAllianz CI',  logo: '/logos/assurances/sanlamallianz.png' },
]

function PartenairesSection() {
  return (
    <section style={{
      padding: '72px 0',
      background: '#fff',
      borderTop: '1px solid #f0f0f0',
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '2.5px',
            textTransform: 'uppercase', color: '#CC0000', marginBottom: 12,
          }}>Nos partenaires</p>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#1a1a1a' }}>
            Compagnies d'assurance partenaires
          </h2>
          <p style={{ color: '#666', marginTop: 12, maxWidth: 480, margin: '12px auto 0' }}>
            Com'on Assurances travaille avec les leaders du marché ivoirien pour vous offrir
            les meilleures couvertures.
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 24,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {PARTENAIRES.map(({ nom, logo }) => (
            <motion.div
              key={nom}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px 32px',
                background: '#fafafa',
                border: '1px solid #ebebeb',
                borderRadius: 12,
                minWidth: 180,
                minHeight: 90,
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
              whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
            >
              <img
                src={logo}
                alt={nom}
                style={{
                  maxHeight: 52,
                  maxWidth: 140,
                  objectFit: 'contain',
                  filter: 'grayscale(20%)',
                  transition: 'filter 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.filter = 'grayscale(0%)'}
                onMouseLeave={e => e.currentTarget.style.filter = 'grayscale(20%)'}
                onError={e => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.parentElement.querySelector('span').style.display = 'block'
                }}
              />
              <span style={{ display: 'none', fontWeight: 600, color: '#444', fontSize: 14 }}>{nom}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Charte : Rouge vif + Gris anthracite (logo CA rouge/gris)
export default function Assurances() {
  return (
    <>
      <FilialePage
        slug="assurances"
        name="Com'on Assurances"
        sector="Assurance"
        tagline="Protéger ce qui compte le plus, avec des solutions adaptées à chaque besoin."
        description={`Com'on Assurances est la filiale assurance du groupe COM'ON Holding. Elle propose des solutions de couverture adaptées aux particuliers, aux professionnels et aux entreprises en Côte d'Ivoire.\n\nForte d'une équipe d'experts engagés, Com'on Assurances accompagne ses clients dans la protection de leur santé, de leur patrimoine et de leurs activités professionnelles, avec réactivité et professionnalisme.`}
        logo="/logos/assurances.png"
        heroColor="#1C0000"
        primaryColor="#CC0000"
        accentColor="#FF3333"
        lightBg="#FDF5F5"
        services={[
          { title: "Assurance Auto",       icon: Car,       desc: "Couverture complète pour vos véhicules personnels et professionnels, avec assistance et protection étendue." },
          { title: "Assurance Santé",      icon: HeartPulse, desc: "Accès aux meilleurs soins avec des garanties santé sur mesure pour vous et votre famille." },
          { title: "Assurance Entreprise", icon: Building2,  desc: "Protection de vos locaux, équipements, responsabilité civile et continuité d'activité." },
          { title: "Assurance Vie",        icon: Users,      desc: "Sécurisez l'avenir de vos proches avec nos produits d'épargne et de prévoyance." },
          { title: "Assurance Agricole",   icon: Sprout,     desc: "Solutions spécialement conçues pour les exploitants agricoles et les coopératives." },
          { title: "Conseil & Expertise",  icon: BookOpen,   desc: "Nos conseillers vous guident pour trouver la couverture la plus adaptée à votre situation." },
        ]}
        contact={{ email: 'assurances@comon-holding.ci', tel: '+225 27 22 25 44 12', adresse: "M'Badon, sise Tridem Pharma, Abidjan" }}
      />
      <PartenairesSection />
    </>
  )
}
