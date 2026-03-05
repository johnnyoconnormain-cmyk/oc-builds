import { useState, useEffect } from 'react'
import './Nav.css'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav-header${scrolled ? ' nav-header--scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#" className="nav-logo">
          <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 80 L50 20 L90 80 Z" fill="#e8c547"/>
            <rect x="36" y="60" width="28" height="20" fill="#0d0d1a"/>
          </svg>
          <span>OC Builds</span>
        </a>

        <nav className={`nav-links${open ? ' nav-links--open' : ''}`}>
          {links.map(l => (
            <a key={l.href} href={l.href} className="nav-link" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary nav-cta" onClick={() => setOpen(false)}>
            Get a Quote
          </a>
        </nav>

        <button
          className="nav-hamburger"
          aria-label="Toggle menu"
          onClick={() => setOpen(o => !o)}
        >
          <span className={open ? 'open' : ''} />
          <span className={open ? 'open' : ''} />
          <span className={open ? 'open' : ''} />
        </button>
      </div>
    </header>
  )
}
