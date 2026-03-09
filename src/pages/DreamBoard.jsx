import { useState, useMemo } from 'react'
import { useAction } from 'convex/react'
import { api } from '../../convex/_generated/api'

const TOTAL_STEPS = 5

const INDUSTRIES = [
  { key: 'auto repair', label: '🔧 Auto Repair' },
  { key: 'barbershop', label: '✂️ Barbershop' },
  { key: 'cleaning', label: '🧹 Cleaning' },
  { key: 'construction', label: '🏗️ Construction' },
  { key: 'fitness', label: '💪 Fitness' },
  { key: 'landscaping', label: '🌿 Landscaping' },
  { key: 'restaurant', label: '🍽️ Restaurant' },
  { key: 'retail', label: '🛍️ Retail' },
  { key: 'salon', label: '💅 Salon' },
  { key: 'other', label: '⭐ Other' },
]

const VIBES = [
  { key: 'clean and minimal', label: 'Clean & Minimal', desc: 'Simple, open, easy to read', icon: '◻' },
  { key: 'bold and dark', label: 'Bold & Dark', desc: 'Strong, dramatic, commands attention', icon: '◼' },
  { key: 'warm and friendly', label: 'Warm & Friendly', desc: 'Approachable, cozy, personal feel', icon: '◕' },
  { key: 'professional', label: 'Professional', desc: 'Clean, formal, trust-building', icon: '◈' },
]

const FONT_STYLES = [
  { key: 'modern', label: 'Modern', sample: 'Aa', style: { fontFamily: 'system-ui, sans-serif', fontWeight: 600 } },
  { key: 'bold', label: 'Bold & Strong', sample: 'Aa', style: { fontFamily: 'Arial Black, sans-serif', fontWeight: 900 } },
  { key: 'classic', label: 'Classic Serif', sample: 'Aa', style: { fontFamily: 'Georgia, serif', fontWeight: 700 } },
  { key: 'friendly', label: 'Friendly Round', sample: 'Aa', style: { fontFamily: 'Trebuchet MS, sans-serif', fontWeight: 600 } },
]

const COLOR_PRESETS = [
  { name: 'Forest', accent: '#E8722A', bg: '#1E3329', text: '#F5EDD8' },
  { name: 'Ocean', accent: '#3B82F6', bg: '#0F172A', text: '#EFF6FF' },
  { name: 'Fire', accent: '#EF4444', bg: '#1C1C1C', text: '#F9FAFB' },
  { name: 'Teal', accent: '#14B8A6', bg: '#134E4A', text: '#F0FDFA' },
  { name: 'Gold', accent: '#D97706', bg: '#1C1917', text: '#FEFCE8' },
  { name: 'Purple', accent: '#8B5CF6', bg: '#1E1B4B', text: '#F5F3FF' },
  { name: 'Cream', accent: '#E8722A', bg: '#F5EDD8', text: '#1A1209' },
  { name: 'Sky', accent: '#0EA5E9', bg: '#F0F9FF', text: '#0C4A6E' },
]

const LAYOUTS = [
  {
    key: 'big hero',
    label: 'Big Opening',
    desc: 'Full-screen intro that grabs attention',
    preview: '▓▓▓▓▓▓▓▓\n▓      ▓\n▓  ██  ▓\n▓      ▓',
  },
  {
    key: 'services first',
    label: 'Services First',
    desc: 'Short intro, then straight to what you do',
    preview: '████████\n██  ██\n▓ ▓ ▓ ▓\n        ',
  },
  {
    key: 'simple clean',
    label: 'Simple & Direct',
    desc: 'Clean, minimal, no fluff',
    preview: '████████\n        \n▓▓▓▓▓▓▓▓\n        ',
  },
  {
    key: 'centered',
    label: 'Centered Hero',
    desc: 'Everything centered, very polished look',
    preview: '        \n  ████  \n  ▓▓▓▓  \n        ',
  },
]

const SECTION_OPTIONS = [
  { key: 'services', label: 'Services', desc: 'Show what you offer', locked: true },
  { key: 'about', label: 'About Us', desc: 'Tell your story' },
  { key: 'testimonials', label: 'Reviews', desc: 'Customer testimonials' },
  { key: 'gallery', label: 'Photo Gallery', desc: 'Show your work' },
  { key: 'faq', label: 'FAQ', desc: 'Answer common questions' },
  { key: 'pricing', label: 'Pricing', desc: 'Show your rates' },
  { key: 'contact', label: 'Contact Form', desc: 'Let people reach you', locked: true },
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
  'salon': ['Haircuts & Color', 'Highlights', 'Blowouts', 'Nail Services'],
  'other': ['Our Services', 'Consultations', 'Custom Projects', 'Get a Quote'],
}

function generatePreviewHTML({ bizName, industry, vibe, fontStyle, colors, layout, sections, tagline, ctaText }) {
  const { accent, bg, text: textCol } = colors
  const muted = bg.startsWith('#F') || bg.startsWith('#f') || parseInt(bg.slice(1), 16) > 0x888888
    ? textCol + '99'
    : textCol + '88'
  const surface = bg.startsWith('#F') || bg.startsWith('#f') || parseInt(bg.slice(1), 16) > 0x888888
    ? '#00000011'
    : '#ffffff0d'
  const surfaceBorder = bg.startsWith('#F') || bg.startsWith('#f') || parseInt(bg.slice(1), 16) > 0x888888
    ? '1px solid rgba(0,0,0,0.1)'
    : '1px solid rgba(255,255,255,0.08)'

  const industryKey = (industry || 'other').toLowerCase()
  const services = INDUSTRY_SERVICES[industryKey] || INDUSTRY_SERVICES['other']
  const domain = (bizName || 'yourbusiness').toLowerCase().replace(/[^a-z0-9]/g, '') + '.com'
  const cta = ctaText || 'Get a Free Quote'

  const fontMap = {
    modern: '"Helvetica Neue", Arial, sans-serif',
    bold: '"Arial Black", Impact, sans-serif',
    classic: 'Georgia, "Times New Roman", serif',
    friendly: '"Trebuchet MS", "Segoe UI", sans-serif',
  }
  const fontFamily = fontMap[fontStyle] || fontMap.modern

  const heroMin = layout === 'big hero' ? '100vh' : '70vh'
  const heroAlign = layout === 'centered' ? 'center' : 'flex-start'
  const heroTextAlign = layout === 'centered' ? 'center' : 'left'
  const heroPad = layout === 'big hero' ? '0 48px' : '0 48px'

  const btnR = vibe === 'warm and friendly' ? '50px' : vibe === 'clean and minimal' ? '8px' : '6px'
  const cardR = vibe === 'warm and friendly' ? '20px' : '12px'

  const serviceCards = services.map(s => `
    <div style="background:${surface};border:${surfaceBorder};border-radius:${cardR};padding:24px 20px;">
      <div style="width:36px;height:36px;background:${accent};border-radius:8px;margin-bottom:14px;display:flex;align-items:center;justify-content:center;">
        <div style="width:12px;height:12px;background:white;border-radius:2px;opacity:0.8;"></div>
      </div>
      <h3 style="font-size:15px;font-weight:700;color:${textCol};margin:0 0 6px;">${s}</h3>
      <p style="font-size:13px;color:${muted};line-height:1.5;margin:0;">Professional service tailored to you. Reach out for pricing.</p>
    </div>`).join('')

  const selectedSections = sections || ['services', 'contact']

  const testimonialsSection = selectedSections.includes('testimonials') ? `
    <section style="padding:72px 48px;background:${surface};">
      <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${accent};margin-bottom:10px;font-weight:700;">What People Say</p>
      <h2 style="font-size:28px;font-weight:800;color:${textCol};margin:0 0 40px;letter-spacing:-0.5px;">Customer Reviews</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;">
        ${['Great service, highly recommend!', 'Professional and affordable.', 'Will definitely use again.'].map(q => `
          <div style="background:${surface};border:${surfaceBorder};border-radius:${cardR};padding:20px;">
            <div style="color:${accent};font-size:18px;margin-bottom:8px;">★★★★★</div>
            <p style="font-size:14px;color:${muted};margin:0 0 12px;">"${q}"</p>
            <div style="font-size:13px;font-weight:700;color:${textCol};">— Happy Customer</div>
          </div>`).join('')}
      </div>
    </section>` : ''

  const aboutSection = selectedSections.includes('about') ? `
    <section style="padding:72px 48px;">
      <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${accent};margin-bottom:10px;font-weight:700;">Our Story</p>
      <h2 style="font-size:28px;font-weight:800;color:${textCol};margin:0 0 20px;letter-spacing:-0.5px;">About ${bizName || 'Us'}</h2>
      <p style="font-size:16px;color:${muted};max-width:600px;line-height:1.7;margin:0 0 28px;">We're a local ${industryKey} business built on trust, hard work, and doing the job right the first time. We've been serving our community for years and treat every customer like a neighbor.</p>
      <button style="background:${accent};color:#fff;border:none;padding:12px 24px;border-radius:${btnR};font-size:14px;font-weight:700;cursor:pointer;">Learn More About Us</button>
    </section>` : ''

  const faqSection = selectedSections.includes('faq') ? `
    <section style="padding:72px 48px;background:${surface};">
      <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${accent};margin-bottom:10px;font-weight:700;">Questions</p>
      <h2 style="font-size:28px;font-weight:800;color:${textCol};margin:0 0 32px;letter-spacing:-0.5px;">Frequently Asked</h2>
      ${['How do I get started?', 'What areas do you serve?', 'Do you offer free estimates?'].map(q => `
        <div style="border-bottom:${surfaceBorder};padding:18px 0;">
          <div style="font-size:15px;font-weight:700;color:${textCol};margin-bottom:8px;">${q}</div>
          <div style="font-size:14px;color:${muted};">Give us a call or fill out our contact form and we'll get back to you within 24 hours.</div>
        </div>`).join('')}
    </section>` : ''

  const gallerySection = selectedSections.includes('gallery') ? `
    <section style="padding:72px 48px;">
      <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${accent};margin-bottom:10px;font-weight:700;">Portfolio</p>
      <h2 style="font-size:28px;font-weight:800;color:${textCol};margin:0 0 32px;letter-spacing:-0.5px;">Our Work</h2>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
        ${[...Array(6)].map((_, i) => `<div style="aspect-ratio:1;background:${surface};border:${surfaceBorder};border-radius:${cardR};display:flex;align-items:center;justify-content:center;color:${muted};font-size:12px;">Photo ${i+1}</div>`).join('')}
      </div>
    </section>` : ''

  const pricingSection = selectedSections.includes('pricing') ? `
    <section style="padding:72px 48px;background:${surface};">
      <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${accent};margin-bottom:10px;font-weight:700;">Rates</p>
      <h2 style="font-size:28px;font-weight:800;color:${textCol};margin:0 0 32px;letter-spacing:-0.5px;">Simple Pricing</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;">
        ${[['Basic', '$99', ['1 service', 'Email support', 'Standard turnaround']], ['Standard', '$199', ['Up to 3 services', 'Phone support', 'Priority turnaround']], ['Premium', '$399', ['Unlimited services', 'Dedicated support', 'Same-day service']]].map(([name, price, feats], i) => `
          <div style="background:${i===1?accent+22:surface};border:${i===1?`2px solid ${accent}`:surfaceBorder};border-radius:${cardR};padding:24px;${i===1?'position:relative;':''}">
            ${i===1?`<div style="position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:${accent};color:#fff;font-size:10px;font-weight:700;padding:3px 12px;border-radius:50px;">POPULAR</div>`:''}
            <div style="font-size:14px;font-weight:700;color:${textCol};margin-bottom:6px;">${name}</div>
            <div style="font-size:28px;font-weight:900;color:${i===1?accent:textCol};margin-bottom:16px;">${price}<span style="font-size:13px;font-weight:400;">/job</span></div>
            ${feats.map(f=>`<div style="font-size:13px;color:${muted};margin-bottom:6px;">✓ ${f}</div>`).join('')}
          </div>`).join('')}
      </div>
    </section>` : ''

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${bizName || 'My Business'}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:${fontFamily};background:${bg};color:${textCol};line-height:1.6;-webkit-font-smoothing:antialiased}
nav{position:sticky;top:0;z-index:99;background:${bg}f0;backdrop-filter:blur(16px);border-bottom:${surfaceBorder};padding:0 48px;height:64px;display:flex;align-items:center;justify-content:space-between}
.nav-brand{font-size:17px;font-weight:800;color:${textCol};letter-spacing:-0.5px}
.nav-links{display:flex;gap:24px}
.nav-links a{font-size:13px;color:${muted};font-weight:500;text-decoration:none}
.nav-cta{background:${accent};color:#fff;font-size:13px;font-weight:700;padding:9px 20px;border-radius:${btnR};border:none;cursor:pointer}
.hero{min-height:${heroMin};display:flex;align-items:center;justify-content:${heroAlign};padding:80px ${heroPad};position:relative;overflow:hidden;text-align:${heroTextAlign}}
.hero::before{content:'';position:absolute;top:0;right:0;width:600px;height:600px;background:radial-gradient(circle at 70% 30%,${accent}1a 0%,transparent 60%);pointer-events:none}
.hero-content{position:relative;z-index:1;max-width:${layout==='centered'?'640px':'680px'}}
.badge{display:inline-flex;align-items:center;gap:8px;background:${accent}22;border:1px solid ${accent}44;border-radius:50px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${accent};margin-bottom:20px}
h1{font-size:${layout==='big hero'?'56px':'44px'};font-weight:900;line-height:1.05;letter-spacing:-1.5px;color:${textCol};margin-bottom:18px}
.accent-text{color:${accent}}
.hero-sub{font-size:17px;color:${muted};max-width:540px;${layout==='centered'?'margin:0 auto 32px;':'margin-bottom:32px;'}line-height:1.65}
.btn-row{display:flex;gap:12px;flex-wrap:wrap;${layout==='centered'?'justify-content:center;':''}}
.btn-p{background:${accent};color:#fff;font-size:14px;font-weight:700;padding:14px 28px;border-radius:${btnR};border:none;cursor:pointer}
.btn-g{background:transparent;color:${textCol};font-size:14px;font-weight:600;padding:14px 28px;border-radius:${btnR};border:1px solid ${textCol}30;cursor:pointer}
.services{padding:80px 48px}
.section-eye{font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${accent};margin-bottom:10px}
.section-h{font-size:30px;font-weight:800;color:${textCol};margin-bottom:40px;letter-spacing:-0.5px}
.grid4{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px}
.contact{padding:80px 48px;text-align:center}
.contact-box{max-width:480px;margin:0 auto;background:${surface};border:${surfaceBorder};border-radius:20px;padding:40px}
input,textarea{width:100%;background:${surface};border:${surfaceBorder};border-radius:10px;padding:12px 14px;color:${textCol};font-size:14px;font-family:inherit;margin-bottom:10px;outline:none}
input::placeholder,textarea::placeholder{color:${muted}}
footer{padding:28px 48px;border-top:${surfaceBorder};display:flex;justify-content:space-between;align-items:center;font-size:12px;color:${muted}}
.footer-mark{font-weight:700;color:${accent}}
</style></head><body>
<nav>
  <div class="nav-brand">${bizName || 'My Business'}</div>
  <div class="nav-links"><a href="#">Services</a><a href="#">About</a><a href="#">Contact</a></div>
  <button class="nav-cta">${cta}</button>
</nav>
<section class="hero">
  <div class="hero-content">
    <div class="badge">⚡ ${(industry || 'Local Business').charAt(0).toUpperCase() + (industry||'Local Business').slice(1)} · ${domain}</div>
    <h1>${bizName || 'Your Business'}<br><span class="accent-text">${tagline || 'Built for your community.'}</span></h1>
    <p class="hero-sub">We're a local ${(industry||'business').toLowerCase()} you can count on. Real people, real service, right here in your community.</p>
    <div class="btn-row">
      <button class="btn-p">${cta}</button>
      <button class="btn-g">See Our Work</button>
    </div>
  </div>
</section>
<section class="services">
  <p class="section-eye">What We Do</p>
  <h2 class="section-h">Our Services</h2>
  <div class="grid4">${serviceCards}</div>
</section>
${aboutSection}
${gallerySection}
${testimonialsSection}
${pricingSection}
${faqSection}
${selectedSections.includes('contact') ? `
<section class="contact">
  <p class="section-eye">Get In Touch</p>
  <h2 class="section-h" style="margin-bottom:28px;">Ready to get started?</h2>
  <div class="contact-box">
    <input placeholder="Your name" /><input placeholder="Phone or email" />
    <textarea rows="4" placeholder="Tell us what you need..." style="resize:none"></textarea>
    <button class="btn-p" style="width:100%;margin-top:4px">Send Message</button>
  </div>
</section>` : ''}
<footer>
  <span>&copy; 2025 ${bizName || 'My Business'}</span>
  <span>Website by <span class="footer-mark">OC Builds</span></span>
</footer>
</body></html>`
}

// ── Color picker swatch ──
function ColorSwatch({ label, value, onChange }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <label className="relative cursor-pointer group">
        <div
          className="w-14 h-14 rounded-2xl border-2 border-white/20 group-hover:border-white/50 transition-colors shadow-lg"
          style={{ backgroundColor: value }}
        />
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </div>
      </label>
      <span className="text-white/50 text-xs font-medium">{label}</span>
      <span className="text-white/25 text-xs font-mono">{value.toUpperCase()}</span>
    </div>
  )
}

export default function DreamBoard() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [loadingTagline, setLoadingTagline] = useState(false)

  const [form, setForm] = useState({
    bizName: '',
    industry: '',
    vibe: '',
    fontStyle: 'modern',
    colors: { accent: '#E8722A', bg: '#1E3329', text: '#F5EDD8' },
    layout: '',
    sections: ['services', 'contact'],
    tagline: '',
    ctaText: 'Get a Free Quote',
  })

  const generateTagline = useAction(api.dreamboards.generateTagline)

  function set(field, val) {
    setForm(f => ({ ...f, [field]: val }))
  }

  function toggleSection(key) {
    setForm(f => ({
      ...f,
      sections: f.sections.includes(key)
        ? f.sections.filter(s => s !== key)
        : [...f.sections, key],
    }))
  }

  function applyPreset(preset) {
    set('colors', { accent: preset.accent, bg: preset.bg, text: preset.text })
  }

  function canAdvance() {
    if (step === 1) return form.bizName.trim().length > 0 && form.industry !== ''
    if (step === 2) return form.vibe !== '' && form.fontStyle !== ''
    if (step === 3) return true
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
    setSubmitting(true)
    try {
      const body = {
        access_key: '9283ffa2-7690-473f-a770-70010c6d24ef',
        subject: `Dream Board submission — ${form.bizName}`,
        name: form.bizName,
        email: 'OCbuilds1@outlook.com',
        message: `New Dream Board Submission:

Business: ${form.bizName}
Industry: ${form.industry}
Vibe: ${form.vibe}
Font: ${form.fontStyle}
Colors: Accent ${form.colors.accent} | BG ${form.colors.bg} | Text ${form.colors.text}
Layout: ${form.layout}
Sections: ${form.sections.join(', ')}
CTA Text: ${form.ctaText}
Tagline: "${form.tagline}"`,
      }
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true) // still show success
    } finally {
      setSubmitting(false)
    }
  }

  const previewHTML = useMemo(() => {
    if (step < 5) return null
    return generatePreviewHTML({
      ...form,
      tagline: form.tagline || 'Your tagline will appear here...',
    })
  }, [form, step])

  function buildBriefText() {
    const industryServices = INDUSTRY_SERVICES[(form.industry || 'other').toLowerCase()] || INDUSTRY_SERVICES['other']
    return `Build a complete website for a client using the following spec from their OC Builds Dream Board. Match everything exactly.

━━━ CLIENT BRIEF ━━━

Business Name: ${form.bizName}
Industry: ${form.industry}
Tagline: "${form.tagline}"
CTA Button Text: "${form.ctaText}"

━━━ DESIGN ━━━

Vibe: ${form.vibe}
Font Style: ${form.fontStyle}
Layout: ${form.layout}

Colors:
  Accent (buttons, highlights): ${form.colors.accent}
  Background: ${form.colors.bg}
  Text: ${form.colors.text}

━━━ SECTIONS (in order) ━━━

${form.sections.map((s, i) => `${i + 1}. ${s.charAt(0).toUpperCase() + s.slice(1)}`).join('\n')}

━━━ SERVICES TO SHOW ━━━

${industryServices.map(s => `• ${s}`).join('\n')}

━━━ STYLE NOTES ━━━

- Vibe is "${form.vibe}" — apply this throughout (button shape, spacing, font weight, tone of copy)
- Font style is "${form.fontStyle}" — use appropriate font family
- Layout is "${form.layout}" — structure the hero section accordingly
- Footer should say "Website by OC Builds"
- All placeholder copy should be appropriate for a ${form.industry} business
- Mobile responsive
- Use the exact hex colors provided above`
  }

  const [copied, setCopied] = useState(false)

  function handleCopyBrief() {
    navigator.clipboard.writeText(buildBriefText()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  function handleDownload() {
    const html = generatePreviewHTML(form)
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(form.bizName || 'my-site').toLowerCase().replace(/[^a-z0-9]/g, '-')}-preview.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  const STEP_LABELS = ['Business', 'Style', 'Colors', 'Layout', 'Tagline']

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full text-center">
          <div className="w-24 h-24 bg-[#E8722A]/12 border-2 border-[#E8722A]/40 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#E8722A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <h1 className="font-display font-bold text-4xl text-white mb-3">Sent to Johnny!</h1>
          <p className="text-white/50 text-base leading-relaxed mb-10">
            He'll reach out within 24 hours to talk through your project. Here's what you picked:
          </p>
          <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-6 text-left mb-8 space-y-3">
            {[
              ['Business', form.bizName],
              ['Industry', form.industry],
              ['Vibe', form.vibe],
              ['Font', form.fontStyle],
              ['Layout', form.layout],
              ['Sections', form.sections.join(', ')],
              ['Tagline', `"${form.tagline}"`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 text-sm">
                <span className="text-white/30 font-medium shrink-0">{k}</span>
                <span className="text-white/75 text-right">{v}</span>
              </div>
            ))}
            <div className="flex justify-between gap-4 text-sm items-center">
              <span className="text-white/30 font-medium">Colors</span>
              <div className="flex gap-2">
                {[form.colors.accent, form.colors.bg, form.colors.text].map(c => (
                  <div key={c} className="w-5 h-5 rounded-full border border-white/20 shadow" style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <button
              onClick={handleCopyBrief}
              className="flex items-center gap-2 bg-white/[0.07] hover:bg-white/[0.12] border border-white/[0.1] text-white/70 hover:text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all"
            >
              {copied ? (
                <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E8722A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg><span className="text-[#E8722A]">Copied!</span></>
              ) : (
                <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy Build Brief</>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-white/[0.07] hover:bg-white/[0.12] border border-white/[0.1] text-white/70 hover:text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Preview
            </button>
          </div>
          <a href="/" className="btn-orange px-8 py-3.5 text-sm inline-flex items-center gap-2">
            Back to OC Builds
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] pb-20">

      {/* Header */}
      <div className="bg-[#0e0e0e]/90 backdrop-blur-md sticky top-0 z-50 border-b border-white/[0.06]">
        <div className="container-xl px-4 py-3.5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back
          </a>
          <div className="text-center">
            <div className="text-white font-display font-bold text-sm tracking-tight">Website Dream Board</div>
            <div className="text-[#E8722A] text-xs font-semibold">by OC Builds</div>
          </div>
          <div className="text-white/25 text-xs">{step}/{TOTAL_STEPS}</div>
        </div>

        {/* Step progress */}
        <div className="container-xl px-4 pb-3">
          <div className="flex items-center gap-1">
            {STEP_LABELS.map((label, i) => {
              const s = i + 1
              const done = step > s
              const active = step === s
              return (
                <div key={label} className="flex items-center flex-1">
                  <div className={`flex items-center gap-1.5 transition-all duration-300 ${active ? 'opacity-100' : done ? 'opacity-70' : 'opacity-30'}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300 ${
                      done ? 'bg-[#E8722A] text-white' : active ? 'bg-[#E8722A]/20 border-2 border-[#E8722A] text-[#E8722A]' : 'bg-white/10 text-white/40'
                    }`}>
                      {done ? '✓' : s}
                    </div>
                    <span className={`text-xs font-semibold hidden sm:block ${active ? 'text-white' : 'text-white/40'}`}>{label}</span>
                  </div>
                  {i < STEP_LABELS.length - 1 && (
                    <div className={`h-px flex-1 mx-2 transition-all duration-500 ${step > s ? 'bg-[#E8722A]' : 'bg-white/10'}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-10">

        {/* ── Step 1 ── */}
        {step === 1 && (
          <div>
            <div className="mb-8">
              <p className="text-[#E8722A] text-xs font-bold tracking-widest uppercase mb-2">Step 1 — Your Business</p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">Let's start with the basics</h2>
              <p className="text-white/40 text-base">What's your business called, and what do you do?</p>
            </div>

            <div className="mb-7">
              <label className="block text-white/60 text-sm font-semibold mb-2">Business name</label>
              <input
                type="text"
                value={form.bizName}
                onChange={e => set('bizName', e.target.value)}
                placeholder="e.g. Tony's Auto Repair"
                className="w-full bg-white/[0.05] border border-white/[0.1] focus:border-[#E8722A]/70 rounded-xl px-4 py-4 text-white placeholder-white/20 text-base outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-white/60 text-sm font-semibold mb-3">Type of business</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {INDUSTRIES.map(ind => (
                  <button
                    key={ind.key}
                    onClick={() => set('industry', ind.key)}
                    className={`px-4 py-3.5 rounded-xl text-sm font-semibold border transition-all duration-150 text-left ${
                      form.industry === ind.key
                        ? 'bg-[#E8722A] border-[#E8722A] text-white shadow-lg shadow-[#E8722A]/20'
                        : 'bg-white/[0.04] border-white/[0.07] text-white/55 hover:text-white hover:border-white/20 hover:bg-white/[0.07]'
                    }`}
                  >
                    {ind.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2 ── */}
        {step === 2 && (
          <div>
            <div className="mb-8">
              <p className="text-[#E8722A] text-xs font-bold tracking-widest uppercase mb-2">Step 2 — Style</p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">What's the vibe?</h2>
              <p className="text-white/40 text-base">Pick the overall feel and a font style.</p>
            </div>

            <div className="mb-8">
              <label className="block text-white/60 text-sm font-semibold mb-3">Overall feel</label>
              <div className="grid sm:grid-cols-2 gap-3">
                {VIBES.map(v => (
                  <button
                    key={v.key}
                    onClick={() => set('vibe', v.key)}
                    className={`p-5 rounded-2xl border text-left transition-all duration-150 ${
                      form.vibe === v.key
                        ? 'bg-[#E8722A]/10 border-[#E8722A]/60 ring-1 ring-[#E8722A]/30'
                        : 'bg-white/[0.04] border-white/[0.07] hover:border-white/20 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className={`font-bold text-base mb-1 ${form.vibe === v.key ? 'text-[#E8722A]' : 'text-white'}`}>{v.label}</div>
                    <div className="text-white/40 text-sm">{v.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white/60 text-sm font-semibold mb-3">Font style</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {FONT_STYLES.map(f => (
                  <button
                    key={f.key}
                    onClick={() => set('fontStyle', f.key)}
                    className={`p-4 rounded-xl border text-center transition-all duration-150 ${
                      form.fontStyle === f.key
                        ? 'bg-[#E8722A]/10 border-[#E8722A]/60 ring-1 ring-[#E8722A]/30'
                        : 'bg-white/[0.04] border-white/[0.07] hover:border-white/20'
                    }`}
                  >
                    <div className="text-2xl text-white mb-1" style={f.style}>{f.sample}</div>
                    <div className={`text-xs font-semibold ${form.fontStyle === f.key ? 'text-[#E8722A]' : 'text-white/45'}`}>{f.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Step 3 ── */}
        {step === 3 && (
          <div>
            <div className="mb-8">
              <p className="text-[#E8722A] text-xs font-bold tracking-widest uppercase mb-2">Step 3 — Colors</p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">Pick your colors</h2>
              <p className="text-white/40 text-base">Choose from a preset or click any swatch to pick your own custom color.</p>
            </div>

            {/* Quick presets */}
            <div className="mb-8">
              <label className="block text-white/60 text-sm font-semibold mb-3">Quick presets</label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {COLOR_PRESETS.map(preset => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    title={preset.name}
                    className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-150 ${
                      form.colors.accent === preset.accent && form.colors.bg === preset.bg
                        ? 'border-white/80 scale-105'
                        : 'border-transparent hover:border-white/30 hover:scale-105'
                    }`}
                  >
                    <div className="h-10 w-full" style={{ background: `linear-gradient(135deg, ${preset.accent} 40%, ${preset.bg} 40%)` }} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {COLOR_PRESETS.map(p => (
                  <span key={p.name} className="text-white/25 text-xs">{p.name}</span>
                ))}
              </div>
            </div>

            {/* Custom pickers */}
            <div className="mb-6">
              <label className="block text-white/60 text-sm font-semibold mb-4">Or pick your own — click any color to change it</label>
              <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-6 flex flex-wrap gap-8 justify-around">
                <ColorSwatch
                  label="Accent"
                  value={form.colors.accent}
                  onChange={v => set('colors', { ...form.colors, accent: v })}
                />
                <ColorSwatch
                  label="Background"
                  value={form.colors.bg}
                  onChange={v => set('colors', { ...form.colors, bg: v })}
                />
                <ColorSwatch
                  label="Text"
                  value={form.colors.text}
                  onChange={v => set('colors', { ...form.colors, text: v })}
                />
              </div>
            </div>

            {/* Live mini preview */}
            <div
              className="rounded-2xl overflow-hidden border border-white/10 h-20 flex items-center justify-between px-5 transition-all duration-300"
              style={{ background: form.colors.bg }}
            >
              <span className="font-bold text-base" style={{ color: form.colors.text }}>{form.bizName || 'Your Business'}</span>
              <div className="flex gap-2 items-center">
                <span className="text-sm" style={{ color: form.colors.text + '99' }}>Services</span>
                <div className="px-4 py-1.5 rounded-full text-xs font-bold text-white" style={{ background: form.colors.accent }}>
                  Contact Us
                </div>
              </div>
            </div>
            <p className="text-white/25 text-xs mt-2 text-center">Live color preview</p>
          </div>
        )}

        {/* ── Step 4 ── */}
        {step === 4 && (
          <div>
            <div className="mb-8">
              <p className="text-[#E8722A] text-xs font-bold tracking-widest uppercase mb-2">Step 4 — Layout & Sections</p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">How should it be laid out?</h2>
              <p className="text-white/40 text-base">Pick a structure and choose which sections to include.</p>
            </div>

            <div className="mb-8">
              <label className="block text-white/60 text-sm font-semibold mb-3">Page layout</label>
              <div className="grid sm:grid-cols-2 gap-3">
                {LAYOUTS.map(l => (
                  <button
                    key={l.key}
                    onClick={() => set('layout', l.key)}
                    className={`p-5 rounded-2xl border text-left transition-all duration-150 ${
                      form.layout === l.key
                        ? 'bg-[#E8722A]/10 border-[#E8722A]/60 ring-1 ring-[#E8722A]/30'
                        : 'bg-white/[0.04] border-white/[0.07] hover:border-white/20 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className={`font-bold text-base mb-1 ${form.layout === l.key ? 'text-[#E8722A]' : 'text-white'}`}>{l.label}</div>
                    <div className="text-white/40 text-sm">{l.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white/60 text-sm font-semibold mb-3">Sections to include</label>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {SECTION_OPTIONS.map(s => {
                  const checked = form.sections.includes(s.key)
                  return (
                    <button
                      key={s.key}
                      onClick={() => !s.locked && toggleSection(s.key)}
                      disabled={s.locked}
                      className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-150 ${
                        checked
                          ? 'bg-[#E8722A]/10 border-[#E8722A]/50'
                          : 'bg-white/[0.03] border-white/[0.07] hover:border-white/15'
                      } ${s.locked ? 'opacity-70' : ''}`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                        checked ? 'bg-[#E8722A] border-[#E8722A]' : 'border-white/25'
                      }`}>
                        {checked && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5"/>
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className={`text-sm font-semibold ${checked ? 'text-white' : 'text-white/55'}`}>
                          {s.label} {s.locked && <span className="text-white/30 font-normal text-xs">(required)</span>}
                        </div>
                        <div className="text-white/30 text-xs">{s.desc}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-white/60 text-sm font-semibold mb-2">CTA button text <span className="text-white/25 font-normal">(the main button on your site)</span></label>
              <input
                type="text"
                value={form.ctaText}
                onChange={e => set('ctaText', e.target.value)}
                placeholder="Get a Free Quote"
                className="w-full bg-white/[0.05] border border-white/[0.1] focus:border-[#E8722A]/70 rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm outline-none transition-colors"
              />
            </div>
          </div>
        )}

        {/* ── Step 5 ── */}
        {step === 5 && (
          <div>
            <div className="mb-8">
              <p className="text-[#E8722A] text-xs font-bold tracking-widest uppercase mb-2">Step 5 — Your Tagline</p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">One line that says it all</h2>
              <p className="text-white/40 text-base">Short and confident. Not sure what to write? Hit the AI button.</p>
            </div>

            <div className="relative mb-2">
              <input
                type="text"
                value={form.tagline}
                onChange={e => set('tagline', e.target.value)}
                placeholder="e.g. Quality work. Fair prices. Every time."
                className="w-full bg-white/[0.05] border border-white/[0.1] focus:border-[#E8722A]/70 rounded-xl px-4 py-4 text-white placeholder-white/20 text-base outline-none pr-44 transition-colors"
              />
              <button
                onClick={handleGenerateTagline}
                disabled={loadingTagline || !form.bizName}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#E8722A] hover:bg-[#d4651f] disabled:opacity-40 text-white text-xs font-bold px-3.5 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                {loadingTagline ? (
                  <><svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/></svg> Writing...</>
                ) : (
                  <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg> Write it for me</>
                )}
              </button>
            </div>
            <p className="text-white/25 text-xs mb-8">Under 10 words. Keep it simple and honest.</p>

            {/* Live preview — always visible */}
            <div className="dream-fade-in">
              <div className="flex items-center justify-between mb-3">
                <div className="text-white/40 text-xs font-bold uppercase tracking-widest">Live Preview</div>
                {!form.tagline && <div className="text-white/25 text-xs">← type a tagline to see your name here</div>}
              </div>
              <div className="bg-[#141414] rounded-2xl border border-white/[0.07] overflow-hidden shadow-2xl">
                  <div className="bg-[#1e1e1e] border-b border-white/[0.06] px-4 py-3 flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                      <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                      <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                    </div>
                    <div className="flex-1 bg-[#141414] border border-white/[0.07] rounded-md px-3 py-1.5 text-xs text-white/25 font-mono truncate">
                      🔒 {(form.bizName || 'yourbusiness').toLowerCase().replace(/[^a-z0-9]/g, '')}.com
                    </div>
                  </div>
                  <iframe
                    srcDoc={previewHTML}
                    title="Website Preview"
                    className="w-full border-0"
                    style={{ height: '540px' }}
                    sandbox="allow-same-origin"
                  />
                </div>
                <p className="text-white/20 text-xs mt-2 text-center">This is how your site will look. Real build will be even better.</p>

                {/* Export buttons */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={handleCopyBrief}
                    className="flex items-center gap-2 bg-white/[0.07] hover:bg-white/[0.12] border border-white/[0.1] text-white/80 hover:text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
                  >
                    {copied ? (
                      <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E8722A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg> <span className="text-[#E8722A]">Copied!</span></>
                    ) : (
                      <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy Build Brief for Claude</>
                    )}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 bg-white/[0.07] hover:bg-white/[0.12] border border-white/[0.1] text-white/80 hover:text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Download Preview HTML
                  </button>
                </div>
            </div>
          </div>
        )}

        {/* ── Nav buttons ── */}
        <div className={`flex items-center mt-10 pt-8 border-t border-white/[0.06] ${step === 1 ? 'justify-end' : 'justify-between'}`}>
          {step > 1 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex items-center gap-2 text-sm font-semibold text-white/40 hover:text-white transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              Back
            </button>
          )}

          {step < TOTAL_STEPS ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canAdvance()}
              className="btn-orange px-8 py-3.5 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continue
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canAdvance() || submitting}
              className="btn-orange px-8 py-3.5 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {submitting ? 'Sending...' : 'Send This to OC Builds'}
              {!submitting && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  )
}
