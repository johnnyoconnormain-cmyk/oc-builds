import { useState, useEffect } from 'react'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#1a1a1a]/90 backdrop-blur-md border-b border-white/[0.06] py-3' : 'py-5'
      }`}
    >
      <div className="container-xl flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <svg width="130" height="34" viewBox="0 0 130 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Mark: interlocking O and C blocks */}
            <rect x="0" y="5" width="14" height="14" rx="2" fill="#FF6B2B"/>
            <rect x="0" y="21" width="14" height="8" rx="2" fill="#FF6B2B" opacity="0.45"/>
            <rect x="6" y="0" width="14" height="8" rx="2" fill="#FF6B2B" opacity="0.45"/>
            <rect x="6" y="10" width="14" height="14" rx="2" fill="#FF6B2B" opacity="0.7"/>
            {/* Wordmark */}
            <text x="28" y="18" fontFamily="'Clash Display', sans-serif" fontWeight="700" fontSize="15" fill="white" letterSpacing="-0.3">OC</text>
            <text x="28" y="31" fontFamily="'Clash Display', sans-serif" fontWeight="600" fontSize="9" fill="rgba(255,255,255,0.4)" letterSpacing="3">BUILDS</text>
          </svg>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-150"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-orange px-5 py-2.5 text-sm ml-3"
          >
            Get Free Audit
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-200 origin-center ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-200 origin-center ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#1f1f1f] border-t border-white/[0.07] px-4 py-4 flex flex-col gap-1">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-3 text-sm font-medium text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-all"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-orange px-5 py-3 text-sm mt-2 justify-center"
            onClick={() => setOpen(false)}
          >
            Get Free Audit
          </a>
        </div>
      )}
    </header>
  )
}
