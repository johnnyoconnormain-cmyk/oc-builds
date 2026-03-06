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
        scrolled
          ? 'bg-[#F5EDD8]/95 backdrop-blur-md border-b border-[#1A1209]/[0.08] py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-xl flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <svg width="148" height="34" viewBox="0 0 148 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Mark background -->
            <rect x="0" y="0" width="34" height="34" rx="6" fill="#1E3329"/>
            <!-- Orange accent bar -->
            <rect x="5" y="5" width="10" height="2.5" rx="1.25" fill="#E8722A"/>
            <!-- O — cream circle -->
            <circle cx="12.5" cy="19" r="7" stroke="#F5EDD8" stroke-width="3" fill="none"/>
            <!-- C — orange arc -->
            <path d="M 23.8,13.1 A 7,7 0 1 0 23.8,24.9" stroke="#E8722A" stroke-width="3" stroke-linecap="round" fill="none"/>
            <!-- Wordmark -->
            <text x="43" y="16" fontFamily="'Clash Display', sans-serif" fontWeight="700" fontSize="14" fill="#1A1209" letterSpacing="-0.3">OC</text>
            <text x="43" y="28" fontFamily="'Clash Display', sans-serif" fontWeight="600" fontSize="8" fill="rgba(26,18,9,0.38)" letterSpacing="3.5">BUILDS</text>
          </svg>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-sm font-medium text-[#1A1209]/60 hover:text-[#1A1209] rounded-full hover:bg-[#1A1209]/5 transition-all duration-150"
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-orange px-5 py-2.5 text-sm ml-3">
            Get Free Audit
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-[#1A1209] transition-all duration-200 origin-center ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#1A1209] transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#1A1209] transition-all duration-200 origin-center ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#F5EDD8]/95 backdrop-blur-md border-t border-[#1A1209]/[0.07] px-4 py-4 flex flex-col gap-1">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-3 text-sm font-medium text-[#1A1209]/70 hover:text-[#1A1209] rounded-full hover:bg-[#1A1209]/5 transition-all"
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
