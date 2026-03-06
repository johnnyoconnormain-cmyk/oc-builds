import { useInView } from '../hooks/useInView'

const services = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: 'Website Build',
    desc: 'A real website that works on every phone and computer. Customers find you, see what you do, and know how to reach you.',
    price: 'From $399',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'AI Chatbot Setup',
    desc: 'A smart chat widget on your site that answers common questions 24/7 — even when you\'re at practice or on a job site.',
    price: 'From $150',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: 'Google Business Setup',
    desc: 'Get your business showing up on Google Maps when locals search. Photos, hours, reviews. Set up right the first time.',
    price: 'From $100',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
    title: 'Social Media Content Pack',
    desc: '30 days of ready-to-post content for Instagram or Facebook — captions, graphics, and hashtags. Copy, paste, post.',
    price: 'From $100/mo',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: 'Automation & Workflows',
    desc: 'Stop doing the same task twice. I set up automations that handle appointment reminders, follow-up emails, and lead tracking for you.',
    price: 'From $200',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
    title: 'Branding Package',
    desc: 'Logo, colors, and fonts that make your business look like you actually mean it. Consistent across print, digital, and signage.',
    price: 'From $150',
  },
]

export default function Services() {
  const [ref, inView] = useInView()

  return (
    <section id="services" className="noise-overlay bg-[#F5EDD8] py-24">
      <div className="container-xl relative z-10">
        <div ref={ref} className={`reveal ${inView ? 'in-view' : ''} flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12`}>
          <div>
            <p className="section-eyebrow">What I Do</p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-[#1A1209] tracking-tight mb-4">
              Everything your business<br className="hidden sm:block" /> needs to grow online.
            </h2>
            <p className="text-[#1A1209]/50 text-base max-w-lg leading-relaxed">
              Pick one thing or stack a few. No retainers, no contracts. You get exactly what you pay for, nothing you don't.
            </p>
          </div>
          <a href="#contact" className="flex-shrink-0 btn-orange px-6 py-3 text-sm">
            Get a Free Quote
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ icon, title, desc, price, delay }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''} bg-white border border-[#1A1209]/[0.07] rounded-3xl p-6 group hover:-translate-y-1 hover:shadow-xl hover:shadow-[#E8722A]/8 transition-all duration-200 cursor-default`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-11 h-11 bg-[#E8722A]/10 rounded-2xl flex items-center justify-center text-[#E8722A] mb-4 group-hover:bg-[#E8722A] group-hover:text-white transition-colors duration-200">
        {icon}
      </div>
      <h3 className="font-display font-bold text-[#1A1209] text-lg mb-2">{title}</h3>
      <p className="text-[#1A1209]/50 text-sm leading-relaxed mb-4">{desc}</p>
      <span className="inline-block text-xs font-bold text-[#E8722A] bg-[#E8722A]/10 px-3 py-1 rounded-full">
        {price}
      </span>
    </div>
  )
}
