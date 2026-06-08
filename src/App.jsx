import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Assurances from './pages/Assurances'
import VatiCo from './pages/VatiCo'
import Services from './pages/Services'
import DistriAgri from './pages/DistriAgri'
import Agro from './pages/Agro'
import Sigeced from './pages/Sigeced'
import CmetApp from './pages/cmet/CmetApp'

export default function App() {
  const location = useLocation()
  const isCmet    = location.pathname.startsWith('/cmet')
  const isStandalone = ['/distri-agri', '/agro', '/sigeced'].some(p => location.pathname.startsWith(p))
  const hideShell = isCmet || isStandalone

  return (
    <>
      <ScrollToTop />
      {!hideShell && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"            element={<Home />} />
          <Route path="/assurances"  element={<Assurances />} />
          <Route path="/vati-co"     element={<VatiCo />} />
          <Route path="/services"    element={<Services />} />
          <Route path="/distri-agri" element={<DistriAgri />} />
          <Route path="/agro"        element={<Agro />} />
          <Route path="/sigeced"     element={<Sigeced />} />
          <Route path="/cmet/*"      element={<CmetApp />} />
        </Routes>
      </AnimatePresence>
      {!hideShell && <Footer />}
    </>
  )
}
