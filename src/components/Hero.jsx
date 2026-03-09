export default function Hero() {
  return (
    <section id="home" className="noise-overlay relative bg-[#F5EDD8] overflow-hidden pt-28 pb-20 min-h-screen flex items-center">

      {/* Subtle warm radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(232,114,42,0.07) 0%, transparent 55%)' }} />

      <div className="container-xl relative z-10 w-full">
        <div className="max-w-4xl">

          {/* Content */}
          <div>
            {/* Floating location badge */}
            <div className="h1 inline-flex items-center gap-2.5 bg-white/70 border border-[#1A1209]/10 text-[#1A1209]/60 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-10 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8722A] opacity-70" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8722A]" />
              </span>
              Ellensburg, WA
            </div>

            {/* Headline */}
            <h1 className="h2 font-display font-bold tracking-tight mb-8" style={{ lineHeight: 1.0 }}>
              <span className="block text-5xl sm:text-6xl lg:text-[76px] text-[#1A1209]">
                I build what
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-[76px] text-[#1A1209]">
                agencies
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-[76px] text-[#E8722A]">
                overcharge for.
              </span>
            </h1>

            {/* Subtext */}
            <p className="h3 text-lg sm:text-xl text-[#1A1209]/55 leading-relaxed max-w-xl mb-10">
              Websites, chatbots, and automations for local businesses. Done in days,
              not months. No agency markup, no account manager. Just me, and you've got
              my actual number.
            </p>

            {/* CTAs */}
            <div className="h4 flex flex-wrap gap-4">
              <a href="#contact" className="btn-orange px-8 py-4 text-base">
                Get Your Free Audit
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a href="#portfolio" className="inline-flex items-center gap-2 border border-[#1A1209]/20 hover:border-[#E8722A]/50 text-[#1A1209]/70 hover:text-[#E8722A] font-semibold rounded-full px-8 py-4 text-base transition-all duration-200 hover:bg-[#E8722A]/5">
                See My Work
              </a>
            </div>

            {/* Stats */}
            <div className="mt-14 pt-8 border-t border-[#1A1209]/10 flex flex-wrap gap-8 sm:gap-14">
              {[
                { value: '$399', label: 'Starting price', sub: 'flat rate, no surprises' },
                { value: '2 wks', label: 'Avg. site launch', sub: 'from first conversation' },
                { value: 'Local', label: 'Based in Ellensburg', sub: 'easy to meet up' },
              ].map(s => (
                <div key={s.label}>
                  <div className="font-display font-bold text-[28px] text-[#E8722A] leading-none">{s.value}</div>
                  <div className="text-sm text-[#1A1209]/70 font-semibold mt-1">{s.label}</div>
                  <div className="text-xs text-[#1A1209]/35 mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
