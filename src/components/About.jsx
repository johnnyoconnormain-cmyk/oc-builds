import { useInView } from '../hooks/useInView'


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
                Construction Management student at CWU, D-line for the Wildcats.
                Grew up in Bellevue as the oldest of seven. Figuring things out
                fast kind of just comes with the territory at that point.
              </p>
              <p>
                Started OC Builds because I kept running into great local
                businesses with no online presence, or a website that looked like
                it hadn't been touched since 2009. The work they do is good.
                They just weren't showing up when people went looking. That felt
                like a problem I could actually fix.
              </p>
              <p>
                Before this I worked at Schwartz Brothers and Chick-fil-A back
                in Bellevue. Sounds unrelated, but those jobs taught me how to
                deal with people, move fast under pressure, and show up every
                single day no matter what. Same energy here.
              </p>
              <p>
                No account manager, no sales team, no getting passed off. You
                talk to me from the first conversation to launch day and beyond.
                I use AI tools to build websites, chatbots, and automations
                faster and cheaper than any agency. Days, not months.
              </p>
              <p className="callout-accent text-white/80 font-semibold">
                I answer my phone. I meet deadlines. And I actually care whether
                your business grows.
              </p>
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
