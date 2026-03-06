const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-[#0F1A12] border-t border-white/[0.06] py-12">
      <div className="container-xl">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <svg width="138" height="32" viewBox="0 0 138 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Mark -->
                <rect x="0" y="0" width="32" height="32" rx="6" fill="#253D30"/>
                <rect x="5" y="5" width="9" height="2.5" rx="1.25" fill="#E8722A"/>
                <circle cx="11.5" cy="18" r="6.5" stroke="#F5EDD8" stroke-width="2.8" fill="none"/>
                <path d="M 22.2,12.3 A 6.5,6.5 0 1 0 22.2,23.7" stroke="#E8722A" stroke-width="2.8" stroke-linecap="round" fill="none"/>
                <!-- Wordmark -->
                <text x="41" y="15" fontFamily="'Clash Display', sans-serif" fontWeight="700" fontSize="13" fill="white" letterSpacing="-0.3">OC</text>
                <text x="41" y="27" fontFamily="'Clash Display', sans-serif" fontWeight="600" fontSize="7.5" fill="rgba(255,255,255,0.35)" letterSpacing="3.5">BUILDS</text>
              </svg>
            </div>
            <p className="text-white/40 text-xs leading-relaxed max-w-[200px]">
              Websites, chatbots, and automations for small businesses who just need it done.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white/30 text-xs font-bold tracking-widest uppercase mb-4">Navigate</h4>
            <ul className="space-y-2.5">
              {['Services', 'Work', 'Pricing', 'About', 'Contact'].map(l => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-150"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/30 text-xs font-bold tracking-widest uppercase mb-4">Get In Touch</h4>
            <ul className="space-y-2.5 text-sm text-white/50">
              <li>
                <a href="mailto:OCbuilds1@outlook.com" className="hover:text-white transition-colors">
                  OCbuilds1@outlook.com
                </a>
              </li>
              <li>
                <a href="tel:+14253246506" className="hover:text-white transition-colors">
                  (425) 324-6506
                </a>
              </li>
              <li>Ellensburg, WA</li>
            </ul>

            {/* Social links */}
            <div className="flex gap-3 mt-5">
              {[
                {
                  label: 'Instagram',
                  href: '#',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  ),
                },
                {
                  label: 'LinkedIn',
                  href: '#',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                    </svg>
                  ),
                },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 bg-white/[0.06] hover:bg-white/10 border border-white/[0.07] rounded-xl flex items-center justify-center text-white/50 hover:text-white transition-all duration-150"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25">
          <span>&copy; {year} OC Builds. All rights reserved.</span>
          <span>Built with AI tools. Deployed on Vercel.</span>
        </div>
      </div>
    </footer>
  )
}
