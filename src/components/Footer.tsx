import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a href="#" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 800, fontSize: 20 }}>
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
              <path d="M10 80 L50 20 L90 80 Z" fill="#e8c547"/>
              <rect x="36" y="60" width="28" height="20" fill="#0d0d1a"/>
            </svg>
            OC Builds
          </a>
          <p className="footer-tagline">Built Right. Built to Last.</p>
        </div>

        <nav className="footer-links">
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <p className="footer-copy">
          &copy; {year} OC Builds. All rights reserved. · Orange County, CA
        </p>
      </div>
    </footer>
  )
}
