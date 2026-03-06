import { useInView } from '../hooks/useInView'

const steps = [
  {
    num: '01',
    title: 'Free Audit',
    desc: "Tell me about your business. I look at what you have, what you're missing, and what would actually move the needle.",
  },
  {
    num: '02',
    title: 'Pick Your Package',
    desc: "Choose what fits your budget and goals. No pressure. I'll tell you exactly what you get and what it costs before we start.",
  },
  {
    num: '03',
    title: 'We Build It',
    desc: "I handle design, copy, and tech setup while you stay focused on running your business. I'll keep you posted without drowning you in details.",
  },
  {
    num: '04',
    title: 'You Grow',
    desc: "New customers start finding you. You get calls, bookings, and visibility you didn't have before. That's the whole point.",
  },
]

export default function HowItWorks() {
  const [ref, inView] = useInView()

  return (
    <section className="bg-[#1E3329] py-24 overflow-hidden">
      <div className="container-xl">
        <div ref={ref} className={`reveal ${inView ? 'in-view' : ''} text-center mb-16`}>
          <p className="section-eyebrow">How It Works</p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight">
            Straightforward from<br />start to finish.
          </h2>
          <p className="text-white/50 text-lg mt-4 max-w-lg mx-auto">
            No confusing process, no surprise invoices. Here's exactly what working with me looks like.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-transparent via-[#E8722A]/40 to-transparent" style={{ top: '20px' }} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {steps.map((step, i) => (
              <TimelineStep key={step.num} {...step} delay={i * 100} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineStep({ num, title, desc, delay }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''} flex flex-col items-center text-center`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Timeline dot */}
      <div className="relative mb-6 z-10">
        <div className="w-10 h-10 rounded-full bg-[#1E3329] border-2 border-[#E8722A] flex items-center justify-center">
          <span className="text-[#E8722A] font-display font-bold text-sm">{parseInt(num)}</span>
        </div>
      </div>

      <h3 className="font-display font-bold text-white text-xl mb-2">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}
