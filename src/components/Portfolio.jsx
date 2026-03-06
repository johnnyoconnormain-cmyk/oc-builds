import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useInView } from '../hooks/useInView'
import ErrorBoundary from './ErrorBoundary'

/* ── Per-project branded card headers ────────────────────── */
function BarbershopHero() {
  return (
    <div className="h-48 relative overflow-hidden flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #1C1410 0%, #2A1E15 100%)' }}>
      {/* Diagonal stripe texture */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 18px, rgba(201,150,59,0.05) 18px, rgba(201,150,59,0.05) 19px)',
      }} />
      {/* Barber pole accent */}
      <div className="absolute right-6 top-4 bottom-4 w-4 rounded-full overflow-hidden opacity-20" style={{
        background: 'repeating-linear-gradient(180deg, #fff 0, #fff 8px, #C9963B 8px, #C9963B 16px, #c0392b 16px, #c0392b 24px)',
      }} />
      {/* Logo */}
      <svg width="170" height="42" viewBox="0 0 170 42" fill="none">
        <g transform="translate(0,5)">
          <circle cx="6" cy="7" r="4.5" stroke="#C9963B" strokeWidth="1.8" fill="none"/>
          <circle cx="6" cy="23" r="4.5" stroke="#C9963B" strokeWidth="1.8" fill="none"/>
          <line x1="10" y1="10" x2="24" y2="15" stroke="#C9963B" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="10" y1="20" x2="24" y2="15" stroke="#C9963B" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="24" y1="15" x2="34" y2="10" stroke="#C9963B" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="24" y1="15" x2="34" y2="20" stroke="#C9963B" strokeWidth="1.8" strokeLinecap="round"/>
        </g>
        <text x="42" y="19" fontFamily="'Playfair Display', Georgia, serif" fontWeight="900" fontSize="13" fill="#F5EFE6" letterSpacing="0.5">EL RANCHO</text>
        <line x1="42" y1="23" x2="168" y2="23" stroke="#C9963B" strokeWidth="0.6" opacity="0.5"/>
        <text x="42" y="34" fontFamily="'Playfair Display', Georgia, serif" fontWeight="400" fontSize="10" fill="#C9963B" letterSpacing="2.5">BARBERSHOP</text>
        <text x="42" y="44" fontFamily="Georgia, serif" fontWeight="400" fontSize="7" fill="rgba(201,150,59,0.4)" letterSpacing="1.5">ELLENSBURG, WA • EST. 2011</text>
      </svg>
    </div>
  )
}

function FitnessHero() {
  return (
    <div className="h-48 relative overflow-hidden flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #080808 0%, #141414 100%)' }}>
      {/* Big background number */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-[100px] leading-none select-none pointer-events-none"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", color: 'rgba(232,255,0,0.04)', letterSpacing: '-0.05em' }}>
        400
      </div>
      {/* Angled yellow accent line */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: '#E8FF00' }} />
      {/* Logo */}
      <svg width="160" height="44" viewBox="0 0 160 44" fill="none">
        <rect x="0" y="2" width="32" height="36" rx="3" fill="#E8FF00"/>
        <polygon points="21,7 12,22 18,22 11,38 24,20 17,20 24,7" fill="#080808"/>
        <text x="40" y="22" fontFamily="'Barlow Condensed', Impact, sans-serif" fontWeight="900" fontSize="18" fill="#ffffff" letterSpacing="1">PEAK</text>
        <text x="40" y="38" fontFamily="'Barlow Condensed', Impact, sans-serif" fontWeight="600" fontSize="11" fill="rgba(255,255,255,0.35)" letterSpacing="4">FITNESS</text>
      </svg>
    </div>
  )
}

function AfterzHero() {
  return (
    <div className="h-48 relative overflow-hidden flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #08080A 0%, #130B1E 100%)' }}>
      {/* Blob glows */}
      <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full opacity-30"
        style={{ background: '#A855F7', filter: 'blur(40px)' }} />
      <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-20"
        style={{ background: '#EC4899', filter: 'blur(40px)' }} />
      {/* Logo */}
      <svg width="150" height="44" viewBox="0 0 150 44" fill="none">
        <defs>
          <linearGradient id="cg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7"/>
            <stop offset="50%" stopColor="#EC4899"/>
            <stop offset="100%" stopColor="#F97316"/>
          </linearGradient>
        </defs>
        <path d="M5 34 L16 8 L27 34" stroke="url(#cg1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="9" y1="25" x2="23" y2="25" stroke="url(#cg1)" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="30" cy="10" r="3" fill="#A855F7"/>
        <circle cx="30" cy="10" r="6" fill="#A855F7" opacity="0.15"/>
        <text x="42" y="26" fontFamily="'Inter', system-ui, sans-serif" fontWeight="900" fontSize="20" fill="white" letterSpacing="-1">after<tspan fill="url(#cg1)">zz</tspan></text>
        <text x="42" y="39" fontFamily="'Inter', system-ui, sans-serif" fontWeight="500" fontSize="8" fill="rgba(168,85,247,0.6)" letterSpacing="2">CAMPUS EVENTS</text>
      </svg>
    </div>
  )
}

const PROJECT_HEROES = {
  p1: BarbershopHero,
  p2: FitnessHero,
  p3: AfterzHero,
}

const PLACEHOLDERS = [
  {
    _id: 'p1',
    name: 'El Rancho Barbershop',
    description: 'Full website build + Google Business profile setup. Customers can now find them on Maps and book online.',
    services: ['Website Build', 'Google Business Setup'],
    url: '/demos/barbershop.html',
  },
  {
    _id: 'p2',
    name: 'Peak Fitness Ellensburg',
    description: 'New website with class schedule, an AI chatbot for FAQs, and a 30-day social content pack.',
    services: ['Website Build', 'AI Chatbot', 'Social Media Pack'],
    url: '/demos/fitness.html',
  },
  {
    _id: 'p3',
    name: 'Afterzz',
    description: 'Campus social events platform built for college students. Find what\'s happening on and around campus, tonight.',
    services: ['Web App', 'Branding', 'Launch Strategy'],
    url: 'https://afterzz.com',
    demoEmail: 'demo@ocbuilds.com',
    demoPassword: 'OcBuilds2025!',
  },
]

export default function Portfolio() {
  return (
    <ErrorBoundary fallback={<PortfolioFallback />}>
      <PortfolioInner />
    </ErrorBoundary>
  )
}

function PortfolioInner() {
  const [ref, inView] = useInView()
  const projects = useQuery(api.projects.list)
  const items = (projects && projects.length > 0) ? projects : PLACEHOLDERS

  return (
    <section id="portfolio" className="bg-[#1E3329] py-24">
      <div className="container-xl">
        <div ref={ref} className={`reveal ${inView ? 'in-view' : ''} flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12`}>
          <div>
            <p className="section-eyebrow">My Work</p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight">
              Here's what<br />I've built.
            </h2>
            <p className="text-white/45 text-base mt-3 max-w-sm leading-relaxed">
              Real sites for real businesses. Yours could be next.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((p, i) => (
            <ProjectCard key={p._id} project={p} index={i} delay={i * 100} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#contact" className="btn-ghost px-8 py-3.5 text-sm inline-flex">
            Want to be next? Let's talk
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

function PortfolioFallback() {
  return (
    <section id="portfolio" className="bg-[#1E3329] py-24">
      <div className="container-xl">
        <p className="section-eyebrow">My Work</p>
        <h2 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight mb-12">
          Real businesses.<br />Real results.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PLACEHOLDERS.map((p, i) => (
            <ProjectCard key={p._id} project={p} index={i} delay={0} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index, delay }) {
  const [ref, inView] = useInView()
  const url = project.url || null
  const HeroComponent = PROJECT_HEROES[project._id] || null

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''} card-dark overflow-hidden group flex flex-col`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Branded header */}
      {HeroComponent ? (
        <HeroComponent />
      ) : (
        <div className="h-48 bg-gradient-to-br from-[#E8722A]/20 to-[#1E3329] relative overflow-hidden flex items-center justify-center">
          {project.imageUrl
            ? <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover" />
            : <span className="font-display font-bold text-5xl text-white/10">{project.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</span>
          }
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-bold text-white text-lg mb-1">{project.name}</h3>
        <p className="text-white/50 text-sm leading-relaxed mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.services.map(s => (
            <span key={s} className="text-xs bg-white/[0.06] text-white/60 px-2.5 py-1 rounded-full border border-white/[0.06]">
              {s}
            </span>
          ))}
        </div>
        {url && (
          <div className="mt-auto pt-3 border-t border-white/[0.06] space-y-2">
            {project.demoEmail && (
              <div className="bg-white/[0.04] rounded-xl px-3 py-2 text-xs text-white/40 space-y-0.5">
                <div className="text-white/25 text-[10px] font-semibold uppercase tracking-wider mb-1">Demo Login</div>
                <div><span className="text-white/30">Email:</span> <span className="text-white/60 font-mono">{project.demoEmail}</span></div>
                <div><span className="text-white/30">Pass:</span> <span className="text-white/60 font-mono">{project.demoPassword}</span></div>
              </div>
            )}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E8722A] hover:text-[#F08B4A] transition-colors"
            >
              View Live Site
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
