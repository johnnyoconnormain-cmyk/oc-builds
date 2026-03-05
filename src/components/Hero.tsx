import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-glow hero-glow--1" />
        <div className="hero-glow hero-glow--2" />
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Serving Orange County &amp; Greater LA
        </div>

        <h1 className="hero-title">
          Built Right.<br />
          <span className="hero-title-accent">Built to Last.</span>
        </h1>

        <p className="hero-subtitle">
          Custom homes, full renovations, and commercial builds—
          delivered on time, on budget, and with craftsmanship you can see.
        </p>

        <div className="hero-actions">
          <a href="#contact" className="btn-primary">
            Get a Free Quote
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#services" className="btn-outline">
            Our Services
          </a>
        </div>

        <div className="hero-stats">
          {[
            { value: '200+', label: 'Projects Completed' },
            { value: '15+', label: 'Years Experience' },
            { value: '98%', label: 'Client Satisfaction' },
          ].map(s => (
            <div key={s.label} className="hero-stat">
              <span className="hero-stat-value">{s.value}</span>
              <span className="hero-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
