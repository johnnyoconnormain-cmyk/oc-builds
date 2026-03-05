import { useInView } from '../hooks/useInView'

const badges = [
  { icon: '🏈', label: 'CWU Wildcat Football' },
  { icon: '🏗️', label: 'Construction Management' },
  { icon: '📍', label: 'Ellensburg, WA' },
  { icon: '🤖', label: 'AI Tools Daily' },
]

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="about" className="bg-[#1a1a1a] py-24">
      <div className="container-xl">
        <div
          ref={ref}
          className={`reveal ${inView ? 'in-view' : ''} grid md:grid-cols-2 gap-12 lg:gap-20 items-center`}
        >
          {/* Photo placeholder */}
          <div className="relative order-2 md:order-1">
            <div className="aspect-[4/5] bg-[#242424] border border-white/[0.07] rounded-2xl overflow-hidden relative">
              {/* Construction-tape diagonal accent */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, #FF6B2B 0, #FF6B2B 20px, transparent 0, transparent 50%)',
                  backgroundSize: '40px 40px',
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-20 h-20 bg-[#FF6B2B]/10 rounded-full flex items-center justify-center">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FF6B2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <p className="text-white/20 text-xs font-medium">Photo coming soon</p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-5 hidden sm:flex bg-[#FF6B2B] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl items-center gap-2">
              <span>🏈</span> CWU Wildcats
            </div>
          </div>

          {/* Text */}
          <div className="order-1 md:order-2">
            <p className="section-eyebrow">Who's Behind This</p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight mb-6">
              I'm Johnny.<br />
              <span className="text-orange-gradient">I'm from here.</span>
            </h2>

            <div className="space-y-4 text-white/55 text-base leading-relaxed mb-8">
              <p>
                I play football at Central Washington University and study Construction Management. Before I got into tech, I grew up watching my family build things — houses, barns, you name it.
              </p>
              <p>
                At some point I realized the same principles apply to digital — good foundation, honest work, things built to last. Except now my tools are Claude, Cursor, and Bolt.new instead of a hammer and a level.
              </p>
              <p>
                I started OC Builds because I kept seeing great local businesses get left behind online. They can't afford an agency. They don't have time to learn tech. But they deserve a real shot at showing up where their customers are looking.
              </p>
              <p className="text-white/80 font-medium">
                That's where I come in. One person, local, reachable — and I actually pick up the phone.
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {badges.map(b => (
                <span key={b.label} className="flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.08] text-white/70 text-xs font-medium px-3.5 py-2 rounded-full">
                  <span>{b.icon}</span> {b.label}
                </span>
              ))}
            </div>

            <a href="#contact" className="btn-orange px-8 py-4 text-sm">
              Let's Work Together
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
