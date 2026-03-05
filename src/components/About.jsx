import { useInView } from '../hooks/useInView'

const badges = [
  { icon: '🏈', label: 'CWU Wildcat Football' },
  { icon: '🏗️', label: 'Construction Management' },
  { icon: '📍', label: 'From Bellevue, WA' },
  { icon: '👨‍👧‍👦', label: 'Oldest of 7' },
]

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="about" className="bg-[#1a1a1a] py-24 overflow-hidden">
      <div className="container-xl">
        <div
          ref={ref}
          className={`reveal ${inView ? 'in-view' : ''} grid md:grid-cols-2 gap-12 lg:gap-20 items-center`}
        >
          {/* Photo placeholder */}
          <div className="relative order-2 md:order-1">
            <div className="aspect-[4/5] bg-[#242424] border border-white/[0.07] rounded-2xl overflow-hidden relative">
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, #FF6B2B 0, #FF6B2B 20px, transparent 0, transparent 50%)',
                  backgroundSize: '40px 40px',
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-24 h-24 bg-[#FF6B2B]/10 rounded-full flex items-center justify-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FF6B2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <p className="text-white/20 text-xs font-medium tracking-wide">Photo coming soon</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 hidden sm:flex bg-[#FF6B2B] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl items-center gap-2">
              <span>🏈</span> CWU Wildcats
            </div>
            <div className="absolute -top-4 -left-4 hidden sm:flex bg-[#242424] border border-white/10 text-white text-xs font-medium px-4 py-3 rounded-xl shadow-xl items-center gap-2">
              <span className="text-[#FF6B2B]">📍</span> Bellevue → Ellensburg
            </div>
          </div>

          {/* Text */}
          <div className="order-1 md:order-2">
            <p className="section-eyebrow">Who's Behind This</p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight mb-6">
              I'm Johnny.<br />
              <span className="text-orange-gradient">First year. All in.</span>
            </h2>

            <div className="space-y-4 text-white/55 text-base leading-relaxed mb-8">
              <p>
                I'm from Bellevue, Washington. I grew up playing football and being the oldest of seven kids.
                When you're the oldest of seven, you learn to figure things out fast. That's just how it goes.
              </p>
              <p>
                Now I'm a first-year Construction Management student at CWU and I play D-line for the Wildcats.
                Between practice and class, I started learning AI tools like Claude, Cursor, and Bolt.new. Turns out
                I can build real websites and automations for local businesses faster and cheaper than any agency out there.
              </p>
              <p>
                I started OC Builds because small businesses around here deserve to be found online.
                Not six months from now. Not after a five-thousand-dollar invoice. Now.
              </p>
              <p className="text-white/80 font-semibold">
                I'm not a faceless company. I'm a real person right here in Ellensburg and I actually pick up the phone.
              </p>
            </div>

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
