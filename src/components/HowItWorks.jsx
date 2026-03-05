import { useInView } from '../hooks/useInView'

const steps = [
  {
    num: '01',
    title: 'Free Audit',
    desc: "Tell me about your business. I look at what you have, what you're missing, and what would actually move the needle.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Pick Your Package',
    desc: "Choose what fits your budget and goals. No pressure — I'll tell you exactly what you get and what it costs before we start.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'We Build It',
    desc: "I handle everything — design, copy, tech setup — while you stay focused on running your business. I'll keep you posted without drowning you in details.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'You Grow',
    desc: "New customers start finding you. You get calls, bookings, and visibility you didn't have before. That's the whole point.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
]

export default function HowItWorks() {
  const [ref, inView] = useInView()

  return (
    <section className="bg-[#1a1a1a] py-24 overflow-hidden">
      <div className="container-xl">
        <div ref={ref} className={`reveal ${inView ? 'in-view' : ''} text-center mb-16`}>
          <p className="section-eyebrow">The Process</p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight">
            Simple. Fast. Done right.
          </h2>
          <p className="text-white/50 text-lg mt-4 max-w-lg mx-auto">
            Four steps from "I need a website" to "customers are calling."
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#FF6B2B]/30 to-transparent" />

          {steps.map((step, i) => (
            <StepCard key={step.num} {...step} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepCard({ num, title, desc, icon, delay }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''} relative flex flex-col items-start`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Number badge */}
      <div className="relative mb-5">
        <div className="w-16 h-16 rounded-xl bg-[#242424] border border-white/[0.08] flex items-center justify-center text-[#FF6B2B]">
          {icon}
        </div>
        <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#FF6B2B] rounded-full text-white text-xs font-display font-bold flex items-center justify-center">
          {num.replace('0', '')}
        </span>
      </div>

      <h3 className="font-display font-bold text-white text-xl mb-2">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}
