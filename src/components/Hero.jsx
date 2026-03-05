export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#1a1a1a] noise-overlay"
    >
      {/* Orange diagonal accent — like a caution stripe in the top-right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, transparent 50%, rgba(255,107,43,0.06) 50%)',
        }}
      />
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, transparent 50%, rgba(255,107,43,0.04) 50%)',
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container-xl relative z-10 pt-28 pb-20 w-full">
        <div className="max-w-3xl">
          {/* Location badge */}
          <div className="h1 inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/60 text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wide">
            <span className="w-1.5 h-1.5 bg-[#FF6B2B] rounded-full animate-pulse" />
            Ellensburg, WA &nbsp;·&nbsp; CWU Football &nbsp;·&nbsp; Construction Management
          </div>

          {/* Headline */}
          <h1 className="h2 font-display font-bold leading-[1.0] tracking-tight mb-6">
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white">
              I build things.
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white/40 mt-1">
              Used to be houses.
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-orange-gradient mt-1">
              Now it's websites.
            </span>
          </h1>

          {/* Subtext */}
          <p className="h3 text-lg sm:text-xl text-white/55 leading-relaxed max-w-xl mb-10 font-body">
            I help small businesses in CWU country get online, get found, and get
            customers — without the agency price tag or the tech headache.
          </p>

          {/* CTAs */}
          <div className="h4 flex flex-wrap gap-4">
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
          <div className="mt-16 flex flex-wrap gap-8 border-t border-white/[0.08] pt-8">
            {[
              { value: '$399', label: 'Starting price' },
              { value: '48h', label: 'Avg. turnaround' },
              { value: '100%', label: 'Local & reachable' },
            ].map(s => (
              <div key={s.label}>
                <div className="font-display font-bold text-2xl text-[#FF6B2B]">{s.value}</div>
                <div className="text-xs text-white/40 font-medium mt-0.5 tracking-wide uppercase">{s.label}</div>
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
