import FilialePage from '../components/FilialePage'
import { Car, Ambulance, Cog, LayoutDashboard, Package, Wrench } from 'lucide-react'

// Charte : Rouge vif + Gris foncé (logo CS gris/rouge)
export default function Services() {
  return (
    <FilialePage
      slug="services"
      name="Com'on Services"
      sector="Commerce & Services"
      tagline="L'acquisition de matériels professionnels au service de votre activité."
      description={`Com'on Services est la filiale commerciale du groupe COM'ON Holding, spécialisée dans l'acquisition et la fourniture de matériels professionnels à destination des entreprises, institutions et collectivités.\n\nDe la voiture de société à l'ambulance médicalisée, en passant par des équipements techniques spécialisés, Com'on Services répond aux besoins les plus exigeants avec réactivité et fiabilité.`}
      logo="/logos/services.png"
      heroColor="#4F4F4F"
      primaryColor="#EF0E00"
      accentColor="#A6A6A6"
      lightBg="#F6F6F6"
      services={[
        { title: "Véhicules de Société",            icon: Car,           desc: "Fourniture de véhicules utilitaires, berlines et 4x4 pour les flottes d'entreprise." },
        { title: "Ambulances & Véhicules Médicaux", icon: Ambulance,     desc: "Ambulances équipées et véhicules médicalisés pour établissements de santé." },
        { title: "Équipements Techniques",          icon: Cog,           desc: "Matériels et équipements spécialisés adaptés aux secteurs industriel et tertiaire." },
        { title: "Mobilier & Agencement",           icon: LayoutDashboard, desc: "Solutions d'aménagement pour bureaux, établissements et espaces professionnels." },
        { title: "Import & Logistique",             icon: Package,       desc: "Gestion de l'importation, dédouanement et livraison sur tout le territoire ivoirien." },
        { title: "Maintenance & SAV",               icon: Wrench,        desc: "Service après-vente et maintenance préventive pour tous les équipements fournis." },
      ]}
      contact={{ email: 'comonservicesarl@gmail.com', tel: '+225 27 21 39 86 54' }}
    />
  )
}
