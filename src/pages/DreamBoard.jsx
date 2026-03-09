import { useState } from 'react'
import { useMutation, useAction } from 'convex/react'
import { api } from '../../convex/_generated/api'

const TOTAL_STEPS = 5

const INDUSTRIES = [
  'Auto Repair', 'Barbershop', 'Cleaning', 'Construction',
  'Fitness', 'Landscaping', 'Restaurant', 'Retail', 'Salon', 'Other',
]

const VIBES = [
  { key: 'clean and minimal', label: 'Clean & Minimal', desc: 'Simple, open, easy to read' },
  { key: 'bold and dark', label: 'Bold & Dark', desc: 'Strong, dramatic, commands attention' },
  { key: 'warm and friendly', label: 'Warm & Friendly', desc: 'Approachable, cozy, personal feel' },
  { key: 'professional', label: 'Professional', desc: 'Clean, formal, trust-building' },
]

const COLOR_PAIRS = [
  { key: 'orange + green', label: 'Orange + Forest', a: '#E8722A', b: '#1E3329' },
  { key: 'blue + navy', label: 'Blue + Navy', a: '#3B82F6', b: '#0F172A' },
  { key: 'red + charcoal', label: 'Red + Charcoal', a: '#EF4444', b: '#1C1C1C' },
  { key: 'teal + dark teal', label: 'Teal + Deep Teal', a: '#14B8A6', b: '#134E4A' },
  { key: 'gold + brown', label: 'Gold + Brown', a: '#D97706', b: '#1C1917' },
  { key: 'purple + indigo', label: 'Purple + Indigo', a: '#8B5CF6', b: '#1E1B4B' },
]

const LAYOUTS = [
  { key: 'big hero image', label: 'Big Opening', desc: 'Large bold intro that grabs attention right away' },
  { key: 'services first', label: 'Show What You Do', desc: 'Jump straight to your services after a short intro' },
  { key: 'simple and clean', label: 'Simple & Direct', desc: 'Clean, no-fluff layout — just the essentials' },
]

const INDUSTRY_SERVICES = {
  'auto repair': ['Oil Change & Lube', 'Brake Service', 'Engine Diagnostics', 'Tire Rotation'],
  'barbershop': ['Haircuts', 'Beard Trims', 'Hot Towel Shave', "Kids' Cuts"],
  'cleaning': ['Home Cleaning', 'Deep Clean', 'Move-In/Out Cleaning', 'Office Cleaning'],
  'construction': ['New Construction', 'Remodeling', 'Decks & Patios', 'General Repairs'],
  'fitness': ['Personal Training', 'Group Classes', 'Nutrition Coaching', 'Memberships'],
  'landscaping': ['Lawn Mowing', 'Landscaping Design', 'Tree Trimming', 'Snow Removal'],
  'restaurant': ['Dine-In', 'Takeout & Delivery', 'Catering', 'Private Events'],
  'retail': ['In-Store Shopping', 'Online Orders', 'Custom Orders', 'Gift Cards'],
  'salon': ['Haircuts & Color', 'Highlights & Balayage', 'Blowouts', 'Nail Services'],
  'other': ['Our Services', 'Consultations', 'Custom Projects', 'Get a Quote'],
}

const PALETTES = {
  'orange + green': { primary: '#E8722A', bg: '#1E3329', surface: '#253D30', text: '#F5EDD8', muted: 'rgba(245,237,216,0.55)' },
  'blue + navy':    { primary: '#3B82F6', bg: '#0F172A', surface: '#1E3A5F', text: '#EFF6FF', muted: 'rgba(239,246,255,0.55)' },
  'red + charcoal': { primary: '#EF4444', bg: '#1C1C1C', surface: '#2A2A2A', text: '#F9FAFB', muted: 'rgba(249,250,251,0.55)' },
  'teal + dark teal':{ primary: '#14B8A6', bg: '#134E4A', surface: '#1A5C57', text: '#F0FDFA', muted: 'rgba(240,253,250,0.55)' },
  'gold + brown':   { primary: '#D97706', bg: '#1C1917', surface: '#292524', text: '#FEFCE8', muted: 'rgba(254,252,232,0.55)' },
  'purple + indigo':{ primary: '#8B5CF6', bg: '#1E1B4B', surface: '#2D2A6E', text: '#F5F3FF', muted: 'rgba(245,243,255,0.55)' },
}

function generatePreviewHTML({ bizName, industry, vibe, colors, layout, tagline }) {
  const p = PALETTES[colors] || PALETTES['orange + green']
  const industryKey = industry.toLowerCase()
  const services = INDUSTRY_SERVICES[industryKey] || INDUSTRY_SERVICES['other']
  const domain = bizName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com'

  const fontStack = vibe === 'professional'
    ? 'Georgia, "Times New Roman", serif'
    : '"Helvetica Neue", Arial, sans-serif'

  const heroHeight = layout === 'big hero image' ? '100vh' : layout === 'services first' ? '65vh' : '75vh'
  const heroFontSize = layout === 'big hero image' ? '52px' : '40px'
  const heroPadding = layout === 'big hero image' ? '120px 40px' : '80px 40px'
  const btnRadius = vibe === 'warm and friendly' ? '50px' : vibe === 'clean and minimal' ? '8px' : '6px'

  const serviceCards = services.map(s => `
    <div style="background:${p.surface};border-radius:16px;padding:28px 24px;border:1px solid rgba(255,255,255,0.07);">
      <div style="width:40px;height:40px;background:${p.primary};border-radius:10px;margin-bottom:16px;"></div>
      <h3 style="font-size:16px;font-weight:700;color:${p.text};margin-bottom:8px;">${s}</h3>
      <p style="font-size:13px;color:${p.muted};line-height:1.5;">Professional ${s.toLowerCase()} service tailored to your needs. Get in touch for pricing.</p>
    </div>`).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${bizName}</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:${fontStack};background:${p.bg};color:${p.text};line-height:1.6}
  a{text-decoration:none;color:inherit}
  nav{position:sticky;top:0;z-index:99;background:${p.bg}ee;backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,0.07);padding:0 40px;height:64px;display:flex;align-items:center;justify-content:space-between}
  .nav-brand{font-size:18px;font-weight:800;color:${p.text};letter-spacing:-0.5px}
  .nav-links{display:flex;gap:28px}
  .nav-links a{font-size:13px;color:${p.muted};font-weight:500}
  .nav-links a:hover{color:${p.text}}
  .nav-cta{background:${p.primary};color:#fff;font-size:13px;font-weight:700;padding:9px 20px;border-radius:${btnRadius};cursor:pointer}
  .hero{min-height:${heroHeight};display:flex;align-items:center;padding:${heroPadding};position:relative;overflow:hidden}
  .hero::before{content:'';position:absolute;top:-20%;right:-10%;width:500px;height:500px;background:radial-gradient(circle,${p.primary}22 0%,transparent 65%);pointer-events:none}
  .hero-content{position:relative;z-index:1;max-width:700px}
  .hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${p.muted};margin-bottom:24px}
  .hero-badge span{width:6px;height:6px;background:${p.primary};border-radius:50%;display:inline-block}
  h1{font-size:${heroFontSize};font-weight:900;line-height:1.05;letter-spacing:-1.5px;color:${p.text};margin-bottom:20px}
  h1 .accent{color:${p.primary}}
  .hero-sub{font-size:17px;color:${p.muted};max-width:520px;margin-bottom:36px;line-height:1.6}
  .btn-row{display:flex;gap:14px;flex-wrap:wrap}
  .btn-primary{background:${p.primary};color:#fff;font-size:14px;font-weight:700;padding:14px 28px;border-radius:${btnRadius};cursor:pointer;border:none}
  .btn-ghost{background:transparent;color:${p.text};font-size:14px;font-weight:600;padding:14px 28px;border-radius:${btnRadius};cursor:pointer;border:1px solid rgba(255,255,255,0.18)}
  .services{padding:80px 40px;background:${p.surface}18}
  .section-label{font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${p.primary};margin-bottom:12px}
  .section-title{font-size:32px;font-weight:800;color:${p.text};margin-bottom:48px;letter-spacing:-0.5px}
  .cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px}
  .contact{padding:80px 40px;text-align:center}
  .contact-box{max-width:520px;margin:0 auto;background:${p.surface};border-radius:24px;padding:48px;border:1px solid rgba(255,255,255,0.07)}
  .form-input{width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px 16px;color:${p.text};font-size:14px;margin-bottom:12px;font-family:inherit}
  .form-input::placeholder{color:${p.muted}}
  footer{padding:32px 40px;border-top:1px solid rgba(255,255,255,0.07);display:flex;justify-content:space-between;align-items:center;font-size:12px;color:${p.muted}}
  .footer-brand{font-weight:700;color:${p.primary}}
</style>
</head>
<body>

<nav>
  <div class="nav-brand">${bizName}</div>
  <div class="nav-links">
    <a href="#">Services</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </div>
  <div class="nav-cta">Get a Quote</div>
</nav>

<section class="hero">
  <div class="hero-content">
    <div class="hero-badge"><span></span>${industry || 'Local Business'} · ${domain}</div>
    <h1>${bizName}<br><span class="accent">${tagline || 'Built for your community.'}</span></h1>
    <p class="hero-sub">We're a local ${(industry || 'business').toLowerCase()} you can count on. Real people, real service, right here in your community.</p>
    <div class="btn-row">
      <button class="btn-primary">Get a Free Quote</button>
      <button class="btn-ghost">See Our Work</button>
    </div>
  </div>
</section>

<section class="services">
  <div class="section-label">What We Do</div>
  <div class="section-title">Our Services</div>
  <div class="cards">${serviceCards}</div>
</section>

<section class="contact">
  <div class="section-label">Get In Touch</div>
  <div class="section-title" style="margin-bottom:32px">Ready to get started?</div>
  <div class="contact-box">
    <input class="form-input" placeholder="Your name" />
    <input class="form-input" placeholder="Phone or email" />
    <textarea class="form-input" rows="4" placeholder="Tell us what you need..." style="resize:none"></textarea>
    <button class="btn-primary" style="width:100%;margin-top:4px">Send Message</button>
  </div>
</section>

<footer>
  <div>&copy; 2025 ${bizName}. All rights reserved.</div>
  <div>Website by <span class="footer-brand">OC Builds</span></div>
</footer>

</body>
</html>`
}

export default function DreamBoard() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [loadingTagline, setLoadingTagline] = useState(false)
  const [form, setForm] = useState({
    bizName: '', industry: '', vibe: '', colors: '', layout: '', tagline: '',
  })

  const saveDreamboard = useMutation(api.dreamboards.save)
  const generateTagline = useAction(api.dreamboards.generateTagline)

  function set(field, val) {
    setForm(f => ({ ...f, [field]: val }))
  }

  function canAdvance() {
    if (step === 1) return form.bizName.trim().length > 0 && form.industry !== ''
    if (step === 2) return form.vibe !== ''
    if (step === 3) return form.colors !== ''
    if (step === 4) return form.layout !== ''
    if (step === 5) return form.tagline.trim().length > 0
    return false
  }

  async function handleGenerateTagline() {
    if (!form.bizName || !form.industry) return
    setLoadingTagline(true)
    try {
      const result = await generateTagline({ bizName: form.bizName, industry: form.industry })
      set('tagline', result)
    } catch {
      set('tagline', 'Quality work. Every time.')
    } finally {
      setLoadingTagline(false)
    }
  }

  async function handleSubmit() {
    await saveDreamboard(form)
    setSubmitted(true)
  }

  const previewHTML = step === 5 ? generatePreviewHTML(form) : null

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-[#E8722A]/15 border-2 border-[#E8722A]/40 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E8722A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <h1 className="font-display font-bold text-3xl text-white mb-4">You're all set!</h1>
          <p className="text-white/55 text-base leading-relaxed mb-8">
            Johnny got your dream board. He'll reach out within 24 hours to talk through your project.
          </p>
          <div className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-5 text-left mb-8 space-y-3">
            {[
              ['Business', form.bizName],
              ['Industry', form.industry],
              ['Vibe', form.vibe],
              ['Colors', form.colors],
              ['Layout', form.layout],
              ['Tagline', form.tagline],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm">
                <span className="text-white/35 font-medium">{k}</span>
                <span className="text-white/80">{v}</span>
              </div>
            ))}
          </div>
          <a href="/" className="btn-orange px-8 py-3 text-sm inline-flex items-center gap-2">
            Back to OC Builds
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e]">
      {/* Header */}
      <div className="border-b border-white/[0.06] px-4 py-4">
        <div className="container-xl flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back
          </a>
          <div className="text-center">
            <div className="text-white font-display font-bold text-sm">Website Dream Board</div>
            <div className="text-white/35 text-xs">by OC Builds</div>
          </div>
          <div className="text-white/35 text-xs font-medium">Step {step} of {TOTAL_STEPS}</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-white/[0.06]">
        <div
          className="h-full bg-[#E8722A] transition-all duration-500"
          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      <div className="container-xl py-10 px-4 max-w-2xl mx-auto">

        {/* ── Step 1: Business Name + Industry ── */}
        {step === 1 && (
          <div className="animate-fade-in">
            <p className="text-[#E8722A] text-xs font-bold tracking-widest uppercase mb-3">Step 1 of 5</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">Tell me about your business</h2>
            <p className="text-white/45 mb-10">Just your name and what kind of business you run. That's it for now.</p>

            <div className="mb-6">
              <label className="block text-white/70 text-sm font-semibold mb-2">Business name</label>
              <input
                type="text"
                value={form.bizName}
                onChange={e => set('bizName', e.target.value)}
                placeholder="e.g. Tony's Auto Repair"
                className="w-full bg-white/[0.06] border border-white/[0.1] focus:border-[#E8722A]/60 rounded-xl px-4 py-3.5 text-white placeholder-white/25 text-base outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm font-semibold mb-3">What kind of business?</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {INDUSTRIES.map(ind => (
                  <button
                    key={ind}
                    onClick={() => set('industry', ind)}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold border transition-all duration-150 text-left ${
                      form.industry === ind
                        ? 'bg-[#E8722A] border-[#E8722A] text-white'
                        : 'bg-white/[0.04] border-white/[0.08] text-white/60 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2: Vibe ── */}
        {step === 2 && (
          <div className="animate-fade-in">
            <p className="text-[#E8722A] text-xs font-bold tracking-widest uppercase mb-3">Step 2 of 5</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">What's the vibe?</h2>
            <p className="text-white/45 mb-10">Pick the feeling you want your website to give off when someone lands on it.</p>

            <div className="grid sm:grid-cols-2 gap-3">
              {VIBES.map(v => (
                <button
                  key={v.key}
                  onClick={() => set('vibe', v.key)}
                  className={`p-5 rounded-2xl border text-left transition-all duration-150 ${
                    form.vibe === v.key
                      ? 'bg-[#E8722A]/10 border-[#E8722A]/60 ring-1 ring-[#E8722A]/40'
                      : 'bg-white/[0.04] border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <div className={`font-semibold text-base mb-1 ${form.vibe === v.key ? 'text-[#E8722A]' : 'text-white'}`}>{v.label}</div>
                  <div className="text-white/45 text-sm">{v.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 3: Colors ── */}
        {step === 3 && (
          <div className="animate-fade-in">
            <p className="text-[#E8722A] text-xs font-bold tracking-widest uppercase mb-3">Step 3 of 5</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">Pick your colors</h2>
            <p className="text-white/45 mb-10">These are the main two colors for your site. The first one is your accent, the second is the background.</p>

            <div className="grid sm:grid-cols-2 gap-3">
              {COLOR_PAIRS.map(cp => (
                <button
                  key={cp.key}
                  onClick={() => set('colors', cp.key)}
                  className={`p-4 rounded-2xl border flex items-center gap-4 transition-all duration-150 ${
                    form.colors === cp.key
                      ? 'border-[#E8722A]/60 bg-[#E8722A]/10 ring-1 ring-[#E8722A]/40'
                      : 'bg-white/[0.04] border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <div className="flex gap-1.5 shrink-0">
                    <div className="w-8 h-8 rounded-lg shadow-sm" style={{ backgroundColor: cp.a }} />
                    <div className="w-8 h-8 rounded-lg shadow-sm" style={{ backgroundColor: cp.b }} />
                  </div>
                  <span className={`font-semibold text-sm ${form.colors === cp.key ? 'text-white' : 'text-white/65'}`}>{cp.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 4: Layout ── */}
        {step === 4 && (
          <div className="animate-fade-in">
            <p className="text-[#E8722A] text-xs font-bold tracking-widest uppercase mb-3">Step 4 of 5</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">Choose a layout</h2>
            <p className="text-white/45 mb-10">How do you want to structure the page? Don't overthink it — all three work great.</p>

            <div className="space-y-3">
              {LAYOUTS.map(l => (
                <button
                  key={l.key}
                  onClick={() => set('layout', l.key)}
                  className={`w-full p-5 rounded-2xl border flex items-start gap-4 text-left transition-all duration-150 ${
                    form.layout === l.key
                      ? 'bg-[#E8722A]/10 border-[#E8722A]/60 ring-1 ring-[#E8722A]/40'
                      : 'bg-white/[0.04] border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <div className={`mt-0.5 w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${
                    form.layout === l.key ? 'border-[#E8722A] bg-[#E8722A]' : 'border-white/25'
                  }`}>
                    {form.layout === l.key && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className={`font-semibold text-base mb-1 ${form.layout === l.key ? 'text-[#E8722A]' : 'text-white'}`}>{l.label}</div>
                    <div className="text-white/45 text-sm">{l.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 5: Tagline + Preview ── */}
        {step === 5 && (
          <div className="animate-fade-in">
            <p className="text-[#E8722A] text-xs font-bold tracking-widest uppercase mb-3">Step 5 of 5</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">Your tagline</h2>
            <p className="text-white/45 mb-8">One short line that says what makes you great. Not sure? Hit the AI button and we'll write one for you.</p>

            <div className="relative mb-4">
              <input
                type="text"
                value={form.tagline}
                onChange={e => set('tagline', e.target.value)}
                placeholder="e.g. Quality work. Fair prices. Every time."
                className="w-full bg-white/[0.06] border border-white/[0.1] focus:border-[#E8722A]/60 rounded-xl px-4 py-3.5 text-white placeholder-white/25 text-base outline-none pr-36 transition-colors"
              />
              <button
                onClick={handleGenerateTagline}
                disabled={loadingTagline || !form.bizName}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#E8722A] hover:bg-[#d4651f] disabled:opacity-50 text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                {loadingTagline ? (
                  <>
                    <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                    Writing...
                  </>
                ) : (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
                    </svg>
                    Write it for me
                  </>
                )}
              </button>
            </div>
            <p className="text-white/30 text-xs mb-10">Keep it under 10 words. Simple and confident wins every time.</p>

            {/* Live preview */}
            {form.tagline && (
              <div className="mb-2">
                <div className="text-white/50 text-xs font-semibold mb-3 uppercase tracking-widest">Live preview</div>

                {/* Browser chrome */}
                <div className="bg-[#1a1a1a] rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl">
                  {/* Title bar */}
                  <div className="bg-[#232323] border-b border-white/[0.06] px-4 py-3 flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                      <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                      <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                    </div>
                    <div className="flex-1 bg-[#1a1a1a] border border-white/[0.08] rounded-lg px-3 py-1 text-xs text-white/30 font-mono">
                      {form.bizName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'yourbusiness'}.com
                    </div>
                  </div>
                  {/* iframe */}
                  <iframe
                    srcDoc={previewHTML}
                    title="Website Preview"
                    className="w-full border-0"
                    style={{ height: '520px' }}
                    sandbox="allow-same-origin"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Navigation buttons ── */}
        <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/[0.06]">
          <button
            onClick={() => setStep(s => s - 1)}
            className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
              step === 1 ? 'opacity-0 pointer-events-none' : 'text-white/50 hover:text-white'
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back
          </button>

          {step < TOTAL_STEPS ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canAdvance()}
              className="btn-orange px-7 py-3 text-sm disabled:opacity-35 disabled:cursor-not-allowed"
            >
              Next Step
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          ) : (
            <div className="flex flex-col items-end gap-2">
              {form.tagline && (
                <button
                  onClick={handleSubmit}
                  disabled={!canAdvance()}
                  className="btn-orange px-7 py-3.5 text-sm disabled:opacity-35"
                >
                  Send This to OC Builds
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                  </svg>
                </button>
              )}
              {!form.tagline && (
                <p className="text-white/35 text-xs">Add a tagline above to see your preview</p>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
