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
  },
  {
    _id: 'p2',
    name: 'Peak Fitness Ellensburg',
    description: 'New website with class schedule, an AI chatbot for FAQs, and a 30-day social content pack.',
    services: ['Website Build', 'AI Chatbot', 'Social Media Pack'],
    quote: 'Johnny had the whole thing done in two weeks. Our Instagram went from 80 to 400 followers.',
  },
  {
    _id: 'p3',
    name: 'Cascade Valley Hardware',
    description: 'Full rebrand: new logo, color system, and a clean landing page that matches the new look.',
    services: ['Branding Package', 'Website Build'],
    quote: 'Looks like we finally caught up with the times. Customers notice it.',
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
  const isPlaceholder = !projects || projects.length === 0

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
          {isPlaceholder && (
            <p className="text-white/30 text-sm max-w-xs text-right hidden sm:block">
              Sample projects shown. Real work added as it ships.
            </p>
          )}
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
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''} card-dark overflow-hidden group`}
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

      <div className="p-5">
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
          <blockquote className="border-l-2 border-[#FF6B2B] pl-3 text-white/40 text-xs italic leading-relaxed">
            "{project.quote}"
          </blockquote>
        )}
      </div>
    </div>
  )
}
