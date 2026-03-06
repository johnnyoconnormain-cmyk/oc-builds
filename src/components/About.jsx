import { useInView } from '../hooks/useInView'

const badges = [
  { icon: '🏈', label: 'CWU Wildcats D-Line' },
  { icon: '🏗️', label: 'Construction Management' },
  { icon: '📍', label: 'Ellensburg, WA' },
  { icon: '👨‍👧‍👦', label: 'Oldest of 7' },
]

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="about" className="bg-[#1E3329] py-24 overflow-hidden">
      <div className="container-xl">
        <div
          ref={ref}
          className={`reveal ${inView ? 'in-view' : ''} grid md:grid-cols-2 gap-12 lg:gap-20 items-center`}
        >
          {/* Photo */}
          <div className="relative order-2 md:order-1">
            <div className="aspect-[4/5] bg-[#253D30] border border-white/[0.07] rounded-3xl overflow-hidden relative">
              <img src="/johnny.png" alt="Johnny O'Connor" className="w-full h-full object-cover object-center" />
            </div>
            <div className="absolute -bottom-4 -right-4 hidden sm:flex bg-[#E8722A] text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl items-center gap-2">
              <span>🏈</span> CWU Wildcats
            </div>
            <div className="absolute -top-4 -left-4 hidden sm:flex bg-[#253D30] border border-white/10 text-white text-xs font-medium px-4 py-3 rounded-2xl shadow-xl items-center gap-2">
              <span className="text-[#E8722A]">📍</span> Ellensburg, WA
            </div>
          </div>

          {/* Text */}
          <div className="order-1 md:order-2">
            <p className="section-eyebrow">Who You're Working With</p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight mb-6">
              Hey, I'm Johnny.<br />
              <span className="text-orange-gradient">Nice to meet you.</span>
            </h2>

            <div className="space-y-4 text-white/55 text-base leading-relaxed mb-8">
              <p>
                I'm a Construction Management student at CWU and I play D-line
                for the Wildcats. I grew up in Bellevue as the oldest of seven
                kids — you learn to figure things out fast when you're running
                point for that many people.
              </p>
              <p>
                I started OC Builds because I kept running into great local
                businesses that had zero online presence, or a website that
                looked like it was built in 2009. The work these people do is
                good — they just weren't showing up when customers searched for
                them. That felt like a problem I could actually solve.
              </p>
              <p>
                I'm not an agency. There's no account manager, no sales team,
                no one passing you off. You deal with me directly from the first
                conversation to launch day and beyond.
              </p>
              <p className="callout-accent text-white/80 font-semibold">
                I answer my phone. I meet deadlines. And I actually care whether
                your business grows.
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
              Let's Talk
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
