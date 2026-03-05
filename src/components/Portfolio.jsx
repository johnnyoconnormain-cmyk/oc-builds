import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useInView } from '../hooks/useInView'
import ErrorBoundary from './ErrorBoundary'

const PLACEHOLDERS = [
  {
    _id: 'p1',
    name: 'El Rancho Barbershop',
    description: 'Full website build + Google Business profile setup. Customers can now find them on Maps and book online.',
    services: ['Website Build', 'Google Business Setup'],
    quote: 'Finally started getting calls from people who found us on Google. Worth every penny.',
    url: '/demos/barbershop.html',
  },
  {
    _id: 'p2',
    name: 'Peak Fitness Ellensburg',
    description: 'New website with class schedule, an AI chatbot for FAQs, and a 30-day social content pack.',
    services: ['Website Build', 'AI Chatbot', 'Social Media Pack'],
    quote: 'Johnny had the whole thing done in two weeks. Our Instagram went from 80 to 400 followers.',
    url: '/demos/fitness.html',
  },
  {
    _id: 'p3',
    name: 'Afterzz',
    description: 'Campus social events platform built for college students. Find what\'s happening on and around campus, tonight.',
    services: ['Web App', 'Branding', 'Launch Strategy'],
    quote: 'Built from scratch in Ellensburg. Real product, real users.',
    url: 'https://afterzz.com',
  },
]

const GRADIENTS = [
  'from-[#FF6B2B]/20 to-[#1a1a1a]',
  'from-[#2563eb]/20 to-[#1a1a1a]',
  'from-[#16a34a]/20 to-[#1a1a1a]',
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
    <section id="portfolio" className="bg-[#141414] py-24">
      <div className="container-xl">
        <div ref={ref} className={`reveal ${inView ? 'in-view' : ''} flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12`}>
          <div>
            <p className="section-eyebrow">My Work</p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight">
              Real businesses.<br />Real results.
            </h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((p, i) => (
            <ProjectCard key={p._id} project={p} gradient={GRADIENTS[i % GRADIENTS.length]} delay={i * 100} />
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
    <section id="portfolio" className="bg-[#141414] py-24">
      <div className="container-xl">
        <p className="section-eyebrow">My Work</p>
        <h2 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight mb-12">
          Real businesses.<br />Real results.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PLACEHOLDERS.map((p, i) => (
            <ProjectCard key={p._id} project={p} gradient={GRADIENTS[i % GRADIENTS.length]} delay={0} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, gradient, delay }) {
  const [ref, inView] = useInView()
  const url = project.url || null

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''} card-dark overflow-hidden group flex flex-col`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`h-44 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display font-bold text-4xl text-white/10">
            {project.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
          </span>
        </div>
        {project.imageUrl && (
          <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover" />
        )}
      </div>

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
        {project.quote && (
          <blockquote className="border-l-2 border-[#FF6B2B] pl-3 text-white/40 text-xs italic leading-relaxed mb-4">
            "{project.quote}"
          </blockquote>
        )}
        {url && (
          <div className="mt-auto pt-3 border-t border-white/[0.06]">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF6B2B] hover:text-[#FF8C5A] transition-colors"
            >
              View Site
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
