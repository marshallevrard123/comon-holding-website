import FilialePage from '../components/FilialePage'
import { Search, FileSearch, PenLine, Landmark, TrendingUp, Megaphone } from 'lucide-react'

// Charte : Rouge + Bleu électrique (logo V&Co rouge/bleu sur noir)
export default function VatiCo() {
  return (
    <FilialePage
      slug="vati-co"
      name="Vati&Co"
      sector="Média d'investigation"
      tagline="L'investigation au service de la bonne gouvernance et de la démocratie."
      description={`Vati&Co est la filiale média du groupe COM'ON Holding, éditrice de letau.net — média d'investigation ivoirien résolument engagé dans la promotion de la bonne gouvernance, le respect des droits humains, la défense de l'État de droit et des valeurs démocratiques.\n\nAvec une ligne éditoriale exigeante et indépendante, letau.net publie des enquêtes de fond, des éditoriaux engagés et assure le suivi des affaires qui font l'actualité en Côte d'Ivoire. Un journalisme de terrain, rigoureux et courageux, au service des citoyens.`}
      logo="/logos/vati-co.png"
      logoDark={true}
      heroColor="#071433"
      primaryColor="#CC0000"
      accentColor="#4A90E2"
      lightBg="#F5F5FA"
      url="https://letau.net"
      services={[
        { title: "Enquêtes d'Investigation",  icon: Search,     desc: "Investigations de fond sur la gouvernance, les affaires publiques et les dérives économiques en Côte d'Ivoire." },
        { title: "SAV – Service Après-Vente",  icon: FileSearch, desc: "Retour sur les sujets publiés pour vérifier les suites données — un journalisme qui va jusqu'au bout." },
        { title: "L'Éditorial",               icon: PenLine,    desc: "Tribunes et analyses engagées sur les grands enjeux politiques, sociaux et économiques du pays." },
        { title: "Politique & Institutions",  icon: Landmark,   desc: "Décryptage de l'actualité politique ivoirienne et du fonctionnement des institutions." },
        { title: "Économie & Société",        icon: TrendingUp, desc: "Analyses économiques, questions sociales et faits de société qui façonnent la Côte d'Ivoire." },
        { title: "Publicité & Partenariats",  icon: Megaphone,  desc: "Visibilité premium pour votre marque auprès d'une audience engagée, éduquée et qualifiée." },
      ]}
      contact={{ email: 'infos@letau.net', tel: '+225 27 22 31 38 02', adresse: 'Mosquée du Golf, Cocody, Abidjan' }}
    />
  )
}
