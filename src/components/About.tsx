import './About.css'

const values = [
  { title: 'Transparent Pricing', desc: 'Detailed estimates upfront—no hidden fees, no surprises at the finish line.' },
  { title: 'Licensed & Insured', desc: 'Fully licensed in California (CSLB) and comprehensively insured for your peace of mind.' },
  { title: 'Quality Materials', desc: 'We partner with top suppliers to source materials that look great and stand up to SoCal conditions.' },
  { title: 'On-Time Delivery', desc: 'We hold our schedule to the same standard as our craftsmanship—because your time matters.' },
]

export default function About() {
  return (
    <section id="about">
      <div className="section about-grid">
        <div className="about-text">
          <p className="section-label">About OC Builds</p>
          <h2 className="section-title">Orange County's<br />Trusted Builder</h2>
          <p className="section-subtitle">
            Founded in Orange County over 15 years ago, OC Builds has grown from a small residential contractor to one of the region's most trusted full-service construction firms. We've built everything from coastal cottages to multi-unit commercial complexes—always with the same obsession for quality.
          </p>
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            Our team of licensed project managers, architects, and tradespeople work in lockstep so nothing falls through the cracks on your project.
          </p>
          <a href="#contact" className="btn-primary" style={{ marginTop: 36, display: 'inline-flex' }}>
            Start Your Project
          </a>
        </div>

        <div className="about-values">
          {values.map(v => (
            <div key={v.title} className="about-value">
              <div className="about-value-check">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div>
                <h4 className="about-value-title">{v.title}</h4>
                <p className="about-value-desc">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
