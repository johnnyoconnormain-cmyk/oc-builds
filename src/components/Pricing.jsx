import { useInView } from '../hooks/useInView'

const tiers = [
  {
    name: 'Starter',
    price: '$399',
    tagline: 'Get online and get found.',
    features: [
      '5-page website (Home, About, Services, Contact + 1 more)',
      'Mobile optimized & fast-loading',
      'Google Business profile setup',
      'Contact form wired to your email',
      '1 round of revisions',
      '30-day support after launch',
    ],
    cta: 'Start with Starter',
    highlight: false,
  },
  {
    name: 'Growth',
    price: '$899',
    tagline: 'Everything in Starter, plus tools to grow.',
    features: [
      'Everything in Starter',
      'AI chatbot on your site',
      '30-day social media content pack',
      'Brand kit (logo, colors, fonts)',
      '2 rounds of revisions',
      'Basic SEO setup',
    ],
    cta: 'Start Growing',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Full Stack',
    price: '$1,499',
    tagline: 'The whole playbook.',
    features: [
      'Everything in Growth',
      'Workflow automation setup',
      'Email marketing integration',
      'Google Ads landing page',
      'Unlimited revisions',
      '30-day priority support',
    ],
    cta: 'Go Full Stack',
    highlight: false,
  },
]

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-[#E8722A] mt-0.5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

export default function Pricing() {
  const [ref, inView] = useInView()

  return (
    <section id="pricing" className="noise-overlay bg-[#F5EDD8] py-24">
      <div className="container-xl relative z-10">
        <div ref={ref} className={`reveal ${inView ? 'in-view' : ''} text-center mb-14`}>
          <p className="section-eyebrow">Pricing</p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-[#1A1209] tracking-tight mb-4">
            Straight numbers.<br />No surprises.
          </h2>
          <p className="text-[#1A1209]/50 text-lg max-w-lg mx-auto">
            Every package is a flat rate. You know what you're getting and what it costs before we shake on it.
          </p>
        </div>

        {/* Tiers */}
        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {tiers.map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} delay={i * 100} />
          ))}
        </div>

        {/* Monthly add-ons */}
        <div className="mt-14 bg-[#1E3329] rounded-3xl p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
            <div>
              <h3 className="font-display font-bold text-white text-2xl mb-1">Monthly Add-ons</h3>
              <p className="text-white/50 text-sm">Keep things running and growing after launch.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: 'Site Maintenance', price: '$99–$199/mo', desc: 'Updates, security, backups, uptime monitoring.' },
              { name: 'Content Retainer', price: '$150/mo', desc: '30 days of social content, delivered monthly.' },
            ].map(a => (
              <div key={a.name} className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-5 flex items-start gap-4">
                <div className="w-8 h-8 bg-[#E8722A]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8722A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-white text-sm">{a.name}</span>
                    <span className="text-[#E8722A] text-xs font-bold">{a.price}</span>
                  </div>
                  <p className="text-white/40 text-xs">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PricingCard({ tier, delay }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''} relative flex flex-col rounded-3xl p-7 transition-all duration-200 ${
        tier.highlight
          ? 'bg-[#1E3329] border-2 border-[#E8722A] shadow-2xl shadow-[#E8722A]/10 scale-[1.02]'
          : 'bg-white border border-[#1A1209]/10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {tier.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="bg-[#E8722A] text-white text-xs font-bold px-4 py-1.5 rounded-full">
            {tier.badge}
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className={`font-display font-bold text-xl mb-1 ${tier.highlight ? 'text-white' : 'text-[#1A1209]'}`}>
          {tier.name}
        </h3>
        <div className="flex items-end gap-1 mb-2">
          <span className={`font-display font-bold text-4xl tracking-tight ${tier.highlight ? 'text-white' : 'text-[#1A1209]'}`}>
            {tier.price}
          </span>
          <span className={`text-sm mb-1 ${tier.highlight ? 'text-white/40' : 'text-[#999]'}`}>flat</span>
        </div>
        <p className={`text-sm ${tier.highlight ? 'text-white/50' : 'text-[#1A1209]/50'}`}>{tier.tagline}</p>
      </div>

      <ul className="space-y-3 flex-1 mb-7">
        {tier.features.map(f => (
          <li key={f} className="flex items-start gap-2.5">
            <Check />
            <span className={`text-sm leading-snug ${tier.highlight ? 'text-white/70' : 'text-[#1A1209]/60'}`}>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={`text-center font-bold py-3.5 rounded-full text-sm transition-all duration-200 hover:-translate-y-0.5 ${
          tier.highlight
            ? 'bg-[#E8722A] hover:bg-[#D0611A] text-white'
            : 'bg-[#1E3329] hover:bg-[#253D30] text-white'
        }`}
      >
        {tier.cta}
      </a>
    </div>
  )
}
