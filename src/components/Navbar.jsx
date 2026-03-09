import { useState, useEffect } from 'react'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
]

const DREAMBOARD_HREF = '/dreamboard'

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
        <a href="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="OC Builds" className="w-8 h-8 object-cover rounded-xl shrink-0" />
          <span className="font-display font-black text-[15px] tracking-tight text-[#1A1209] leading-none">
            OC <span className="font-semibold text-[#1A1209]/40 tracking-[0.18em] text-[10px] align-middle">BUILDS</span>
          </span>
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
          <a href={DREAMBOARD_HREF} className="px-4 py-2 text-sm font-medium text-[#E8722A] hover:text-[#E8722A] rounded-full hover:bg-[#E8722A]/8 transition-all duration-150 flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
            </svg>
            Build Your Site
          </a>
          <a href="#contact" className="btn-orange px-5 py-2.5 text-sm ml-2">
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
            href={DREAMBOARD_HREF}
            className="px-4 py-3 text-sm font-semibold text-[#E8722A] rounded-full hover:bg-[#E8722A]/8 transition-all flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            Build Your Site
          </a>
          <a
            href="#contact"
            className="btn-orange px-5 py-3 text-sm mt-1 justify-center"
            onClick={() => setOpen(false)}
          >
            Get Free Audit
          </a>
        </div>
      )}
    </header>
  )
}
