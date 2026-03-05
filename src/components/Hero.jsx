export default function Hero() {
  return (
    <section id="home" className="relative bg-[#FAF8F4] overflow-hidden pt-28 pb-20 min-h-screen flex items-center">

      {/* Subtle warm texture */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255,107,43,0.06) 0%, transparent 50%)' }} />

      {/* Orange accent line — left edge */}
      <div className="absolute left-0 top-24 bottom-24 w-1 rounded-full bg-[#FF6B2B] opacity-30" />

      <div className="container-xl relative z-10 w-full">
        <div className="max-w-4xl">

          {/* Location tag */}
          <div className="h1 inline-flex items-center gap-2 text-[#1A1614]/50 text-xs font-bold tracking-widest uppercase mb-10">
            <span className="w-1.5 h-1.5 bg-[#FF6B2B] rounded-full" />
            Ellensburg, WA
          </div>

          {/* Headline — editorial, big, confident */}
          <h1 className="h2 font-display font-bold tracking-tight mb-8" style={{ lineHeight: 1.0 }}>
            <span className="block text-5xl sm:text-6xl lg:text-[80px] text-[#1A1614]">
              Websites for
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-[80px] text-[#1A1614]">
              Ellensburg's
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-[80px] text-orange-gradient">
              small businesses.
            </span>
          </h1>

          {/* Subtext */}
          <p className="h3 text-lg sm:text-xl text-[#1A1614]/55 leading-relaxed max-w-2xl mb-10">
            I'm Johnny. I get local businesses online fast — a real website, Google
            listing, and whatever else you need to show up when customers search for
            you. Flat rates, no agency markup, one person you can actually reach.
          </p>

          {/* CTAs */}
          <div className="h4 flex flex-wrap gap-4">
            <a href="#contact" className="btn-orange px-8 py-4 text-base">
              Get Your Free Audit
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#portfolio" className="inline-flex items-center gap-2 border border-[#1A1614]/20 hover:border-[#FF6B2B]/50 text-[#1A1614]/70 hover:text-[#FF6B2B] font-semibold rounded-lg px-8 py-4 text-base transition-all duration-200 hover:bg-[#FF6B2B]/5">
              See My Work
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 pt-8 border-t border-[#1A1614]/10 flex flex-wrap gap-8 sm:gap-16">
            {[
              { value: '$399', label: 'Starting price', sub: 'flat rate, no surprises' },
              { value: '2 wks', label: 'Avg. site launch', sub: 'from first conversation' },
              { value: 'Local', label: 'Based in Ellensburg', sub: 'easy to meet up' },
            ].map(s => (
              <div key={s.label}>
                <div className="font-display font-bold text-[30px] text-[#FF6B2B] leading-none">{s.value}</div>
                <div className="text-sm text-[#1A1614]/70 font-semibold mt-1">{s.label}</div>
                <div className="text-xs text-[#1A1614]/35 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
