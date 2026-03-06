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

export default function App() {
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
      <Analytics />
    </>
  )
}
