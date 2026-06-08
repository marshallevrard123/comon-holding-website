import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import CmetNavbar from '../../components/cmet/CmetNavbar'
import CmetFooter from '../../components/cmet/CmetFooter'
import Accueil    from './Accueil'
import APropos    from './APropos'
import Specialites from './Specialites'
import Equipe     from './Equipe'
import Assurances from './Assurances'
import Equipements from './Equipements'
import Contact    from './Contact'
import SEO from '../../components/SEO'
import '../../cmet.css'

export default function CmetApp() {
  useEffect(() => {
    // Switch favicon to CMET logo
    const links = document.querySelectorAll("link[rel~='icon']")
    const origHrefs = Array.from(links).map(l => l.href)
    links.forEach(l => {
      l.setAttribute('type', 'image/x-icon')
      l.setAttribute('href', '/favicon-cmet.ico')
    })
    return () => {
      Array.from(links).forEach((l, i) => l.setAttribute('href', origHrefs[i]))
    }
  }, [])

  return (
    <div className="cmet-root">
      <SEO
        title="CMET — Clinique Médicale Espérance de Toumodi"
        description="La Clinique Médicale Espérance de Toumodi (CMET) offre des soins pluridisciplinaires : médecine générale, gynécologie, pédiatrie, chirurgie, cardiologie, laboratoire et imagerie médicale à Toumodi, Côte d'Ivoire."
        slug="/cmet"
        image="https://www.comonholding.com/cmet/hero.jpg"
        favicon="/favicon-cmet.ico"
        jsonLd={{
          '@type': 'MedicalClinic',
          name: 'Clinique Médicale Espérance de Toumodi (CMET)',
          description: "Clinique pluridisciplinaire à Toumodi offrant des soins de qualité en médecine générale, gynécologie-obstétrique, pédiatrie, chirurgie, cardiologie, diabétologie, ophtalmologie, dentisterie, laboratoire et imagerie médicale.",
          url: 'https://www.comonholding.com/cmet',
          telephone: '+2250707840220',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Toumodi',
            addressRegion: 'Bélier',
            addressCountry: 'CI',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: '6.5572',
            longitude: '-5.0193',
          },
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
            opens: '00:00',
            closes: '23:59',
          },
          medicalSpecialty: [
            'Médecine Générale','Gynécologie-Obstétrique','Pédiatrie',
            'Chirurgie Générale','Cardiologie','Diabétologie',
            'Ophtalmologie','Odontologie','Radiologie',
          ],
          availableService: [
            { '@type': 'MedicalProcedure', name: 'Consultation médicale' },
            { '@type': 'MedicalProcedure', name: 'Analyses biologiques' },
            { '@type': 'MedicalProcedure', name: 'Imagerie médicale' },
            { '@type': 'MedicalProcedure', name: 'Accouchement' },
          ],
          areaServed: "Toumodi et région du Bélier, Côte d'Ivoire",
          priceRange: '$$',
        }}
      />
      <CmetNavbar />
      <Routes>
        <Route index            element={<Accueil />} />
        <Route path="a-propos"  element={<APropos />} />
        <Route path="specialites" element={<Specialites />} />
        <Route path="equipe"    element={<Equipe />} />
        <Route path="assurances" element={<Assurances />} />
        <Route path="equipements" element={<Equipements />} />
        <Route path="contact"   element={<Contact />} />
      </Routes>
      <CmetFooter />
    </div>
  )
}
