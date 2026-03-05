const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-[#111] border-t border-white/[0.06] py-12">
      <div className="container-xl">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 bg-[#FF6B2B] rounded-md flex items-center justify-center">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <span className="font-display font-bold text-white text-base">OC Builds</span>
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
                <a href="mailto:hello@ocbuilds.com" className="hover:text-white transition-colors">
                  hello@ocbuilds.com
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
                  className="w-8 h-8 bg-white/[0.06] hover:bg-white/10 border border-white/[0.07] rounded-lg flex items-center justify-center text-white/50 hover:text-white transition-all duration-150"
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
