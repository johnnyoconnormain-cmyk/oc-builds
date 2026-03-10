import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustStrip from './components/TrustStrip'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import Portfolio from './components/Portfolio'
import Pricing from './components/Pricing'
import About from './components/About'
import Contact from './components/Contact'
import ChatWidget from "./components/ChatWidget"
import Footer from './components/Footer'
import DreamBoard from './pages/DreamBoard'
import Admin from './pages/Admin'

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <HowItWorks />
        <Portfolio />
        <Pricing />
        <About />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dreamboard" element={<DreamBoard />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  )
}
