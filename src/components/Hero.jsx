export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#1a1a1a] noise-overlay"
    >
      {/* Warm glow top-right */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(255,107,43,0.07) 0%, transparent 65%)' }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container-xl relative z-10 pt-28 pb-20 w-full">
        <div className="max-w-3xl">

          {/* Location badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/60 text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wide">
            <span className="w-1.5 h-1.5 bg-[#FF6B2B] rounded-full animate-pulse" />
            Serving Ellensburg &amp; the CWU community
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold leading-[1.05] tracking-tight mb-6">
            <span className="block text-5xl sm:text-6xl lg:text-7xl text-white">
              Your business
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl text-white">
              should be easy
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl text-orange-gradient">
              to find online.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-xl text-white/55 leading-relaxed max-w-xl mb-10 font-body">
            I'm Johnny — I build websites, set up Google listings, and create
            digital tools that help local businesses in Ellensburg get found and
            get more customers. Flat rates. Fast turnaround. One person you can
            actually call.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="btn-orange px-8 py-4 text-base">
              Get Your Free Audit
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#portfolio" className="btn-ghost px-8 py-4 text-base">
              See My Work
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 pt-8 border-t border-white/[0.08] flex flex-wrap gap-6 sm:gap-12">
            {[
              { value: '$399', label: 'Starting price', sub: 'flat rate, no surprises' },
              { value: '2 wks', label: 'Avg. site launch', sub: 'from first conversation' },
              { value: 'Local', label: 'Based in Ellensburg', sub: 'easy to meet up' },
            ].map(s => (
              <div key={s.label} className="flex flex-col">
                <div className="font-display font-bold text-[28px] text-[#FF6B2B] leading-none">{s.value}</div>
                <div className="text-sm text-white/70 font-medium mt-1">{s.label}</div>
                <div className="text-xs text-white/30 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1a1a1a] to-transparent pointer-events-none" />
    </section>
  )
}
