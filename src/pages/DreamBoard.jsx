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
    key: 'fullscreen-bold',
    label: 'Fullscreen Bold',
    desc: 'Giant headline, dark + dramatic. Grabs attention immediately.',
    badge: 'DARK',
  },
  {
    key: 'bright-clean',
    label: 'Bright & Clean',
    desc: 'White background, light and professional. Easy to read.',
    badge: 'LIGHT',
  },
  {
    key: 'split-screen',
    label: 'Split Screen',
    desc: 'Half your color, half your accent. Bold and modern.',
    badge: 'BOLD',
  },
  {
    key: 'card-focus',
    label: 'Services First',
    desc: 'Short intro then big numbered service cards. Straight to business.',
    badge: 'ANY',
  },
  {
    key: 'editorial',
    label: 'Editorial',
    desc: 'Clean magazine-style with strong type. Feels established.',
    badge: 'LIGHT',
  },
  {
    key: 'gradient-glass',
    label: 'Modern Glass',
    desc: 'Gradient mesh background with frosted glass cards. Very current.',
    badge: 'DARK',
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

const AFTERZ_LOGO_INLINE = `<svg width="26" height="26" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0;border-radius:6px"><defs><linearGradient id="afg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FF2D78"/><stop offset="50%" stop-color="#FF5C4D"/><stop offset="100%" stop-color="#FF6B3D"/></linearGradient><linearGradient id="afg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FF6B3D"/><stop offset="100%" stop-color="#FF8A2B"/></linearGradient></defs><circle cx="50" cy="50" r="48" fill="#0A0A0E"/><text x="50" y="44" font-family="Arial,sans-serif" font-size="33" font-weight="800" fill="url(#afg1)" text-anchor="middle">AFT</text><text x="50" y="70" font-family="Arial,sans-serif" font-size="33" font-weight="800" fill="url(#afg2)" text-anchor="middle">ERZ</text></svg>`

function generatePreviewHTML(form) {
  const { bizName, industry, fontStyle, colors, layout, sections, tagline, ctaText } = form
  const { accent, bg, text: textCol } = colors
  const industryKey = (industry || 'other').toLowerCase()
  const svcs = INDUSTRY_SERVICES[industryKey] || INDUSTRY_SERVICES['other']
  const cta = ctaText || 'Get a Free Quote'
  const tl = tagline || 'Built for your community.'
  const biz = bizName || 'My Business'
  const sel = sections || ['services', 'contact']
  const logo = AFTERZ_LOGO_INLINE

  const fontMap = { modern: '"Helvetica Neue",Arial,sans-serif', bold: '"Arial Black",Impact,sans-serif', classic: 'Georgia,"Times New Roman",serif', friendly: '"Trebuchet MS","Segoe UI",sans-serif' }
  const ff = fontMap[fontStyle] || fontMap.modern

  // shared optional sections builder
  function extras(bgAlt, borderCol, cardBg, cardBorder, textC, mutedC, btnR) {
    let out = ''
    if (sel.includes('testimonials')) out += `<section style="padding:60px 48px;background:${bgAlt}"><p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${accent};margin:0 0 8px;font-weight:700">What People Say</p><h2 style="font-size:24px;font-weight:800;color:${textC};margin:0 0 32px">Customer Reviews</h2><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">${['Great work, highly recommend!','Professional and on time.','Will definitely use again.'].map(q=>`<div style="background:${cardBg};border:${cardBorder};border-radius:12px;padding:18px"><div style="color:${accent};margin-bottom:6px">★★★★★</div><p style="font-size:13px;color:${mutedC};margin:0 0 10px">"${q}"</p><div style="font-size:12px;font-weight:700;color:${textC}">— Happy Customer</div></div>`).join('')}</div></section>`
    if (sel.includes('about')) out += `<section style="padding:60px 48px"><p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${accent};margin:0 0 8px;font-weight:700">Our Story</p><h2 style="font-size:24px;font-weight:800;color:${textC};margin:0 0 16px">About ${biz}</h2><p style="font-size:15px;color:${mutedC};max-width:560px;line-height:1.7;margin:0 0 24px">We're a local ${industryKey} business built on trust and doing the job right the first time. You deal with us directly — no middleman.</p><button style="background:${accent};color:#fff;border:none;padding:11px 22px;border-radius:${btnR};font-size:13px;font-weight:700;cursor:pointer">Our Story</button></section>`
    if (sel.includes('faq')) out += `<section style="padding:60px 48px;background:${bgAlt}">${['How do I get started?','What areas do you serve?','Do you offer free estimates?'].map(q=>`<div style="border-bottom:${borderCol};padding:16px 0"><div style="font-size:14px;font-weight:700;color:${textC};margin-bottom:6px">${q}</div><div style="font-size:13px;color:${mutedC}">Give us a call and we'll get back to you within 24 hours.</div></div>`).join('')}</section>`
    if (sel.includes('gallery')) out += `<section style="padding:60px 48px"><p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${accent};margin:0 0 8px;font-weight:700">Our Work</p><h2 style="font-size:24px;font-weight:800;color:${textC};margin:0 0 24px">Portfolio</h2><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">${[...Array(6)].map((_,i)=>`<div style="aspect-ratio:1;background:${cardBg};border:${cardBorder};border-radius:10px;display:flex;align-items:center;justify-content:center;color:${mutedC};font-size:12px">Photo ${i+1}</div>`).join('')}</div></section>`
    if (sel.includes('pricing')) out += `<section style="padding:60px 48px;background:${bgAlt}"><p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${accent};margin:0 0 8px;font-weight:700">Rates</p><h2 style="font-size:24px;font-weight:800;color:${textC};margin:0 0 28px">Simple Pricing</h2><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">${[['Basic','$99'],['Standard','$199'],['Premium','$399']].map(([n,p],i)=>`<div style="background:${i===1?accent+'25':cardBg};border:${i===1?`2px solid ${accent}`:cardBorder};border-radius:12px;padding:20px;text-align:center;position:relative">${i===1?`<div style="position:absolute;top:-9px;left:50%;transform:translateX(-50%);background:${accent};color:#fff;font-size:9px;font-weight:700;padding:2px 10px;border-radius:50px">POPULAR</div>`:''}<div style="font-size:13px;font-weight:700;color:${textC};margin-bottom:4px">${n}</div><div style="font-size:24px;font-weight:900;color:${i===1?accent:textC}">${p}</div></div>`).join('')}</div></section>`
    if (sel.includes('contact')) out += `<section style="padding:60px 48px;text-align:center"><p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${accent};margin:0 0 8px;font-weight:700">Get In Touch</p><h2 style="font-size:24px;font-weight:800;color:${textC};margin:0 0 24px">Ready to get started?</h2><div style="max-width:440px;margin:0 auto;background:${cardBg};border:${cardBorder};border-radius:16px;padding:32px"><input placeholder="Your name" style="width:100%;background:${bgAlt};border:${borderCol};border-radius:8px;padding:10px 12px;color:${textC};font-family:${ff};margin-bottom:8px;outline:none;display:block"/><input placeholder="Phone or email" style="width:100%;background:${bgAlt};border:${borderCol};border-radius:8px;padding:10px 12px;color:${textC};font-family:${ff};margin-bottom:8px;outline:none;display:block"/><textarea rows="3" placeholder="Tell us what you need..." style="width:100%;background:${bgAlt};border:${borderCol};border-radius:8px;padding:10px 12px;color:${textC};font-family:${ff};margin-bottom:10px;outline:none;resize:none;display:block"></textarea><button style="width:100%;background:${accent};color:#fff;border:none;padding:12px;border-radius:${btnR};font-size:14px;font-weight:700;cursor:pointer">${cta}</button></div></section>`
    return out
  }

  const wrap = (css, body) => `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:${ff};-webkit-font-smoothing:antialiased}${css}</style></head><body>${body}<footer style="padding:20px 40px;border-top:1px solid rgba(128,128,128,0.15);display:flex;justify-content:space-between;font-size:11px;color:#888"><span>© 2025 ${biz}</span><span>Website by <b style="color:${accent}">OC Builds</b></span></footer></body></html>`

  // ── LAYOUT 1: Fullscreen Bold ── dark, centered, cinematic
  if (layout === 'fullscreen-bold') {
    const dark = bg; const light = textCol; const dim = textCol + '60'
    return wrap(`
      body{background:${dark};color:${light}}
      nav{position:sticky;top:0;z-index:9;padding:0 48px;height:60px;display:flex;align-items:center;justify-content:space-between;background:${dark}cc;backdrop-filter:blur(12px)}
      .nb{font-size:16px;font-weight:900;letter-spacing:-0.5px;color:${light}}
      .nc{background:${accent};color:#fff;border:none;padding:8px 18px;border-radius:6px;font-size:12px;font-weight:700;cursor:pointer}
      .hero{min-height:90vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:60px 40px;position:relative;overflow:hidden}
      .hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,${accent}18 0%,transparent 65%);pointer-events:none}
      h1{font-size:64px;font-weight:900;line-height:1;letter-spacing:-3px;color:${light};margin-bottom:16px}
      .tl{color:${accent}}
      .sub{font-size:16px;color:${dim};max-width:480px;margin:0 auto 32px;line-height:1.6}
      .btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
      .bp{background:${accent};color:#fff;border:none;padding:14px 32px;border-radius:6px;font-size:14px;font-weight:700;cursor:pointer}
      .bg{background:rgba(255,255,255,0.08);color:${light};border:1px solid rgba(255,255,255,0.15);padding:14px 32px;border-radius:6px;font-size:14px;cursor:pointer}
      .svcs{padding:72px 48px}
      .eye{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${accent};margin-bottom:8px;font-weight:700}
      .sh{font-size:26px;font-weight:800;color:${light};margin-bottom:32px;letter-spacing:-0.5px}
      .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden}
      .card{background:${dark};padding:28px 20px}
      .cnum{font-size:32px;font-weight:900;color:${accent};margin-bottom:8px;line-height:1}
      .ct{font-size:14px;font-weight:700;color:${light};margin-bottom:6px}
      .cd{font-size:12px;color:${dim};line-height:1.5}
    `,`
      <nav><div style="display:flex;align-items:center;gap:8px">${logo}<div class="nb">${biz}</div></div><div style="display:flex;gap:20px;align-items:center"><a href="#" style="font-size:12px;color:${dim};text-decoration:none">Services</a><a href="#" style="font-size:12px;color:${dim};text-decoration:none">Contact</a><button class="nc">${cta}</button></div></nav>
      <section class="hero"><div><h1>${biz}<br><span class="tl">${tl}</span></h1><p class="sub">Local ${industryKey} you can count on. Real people, real service.</p><div class="btns"><button class="bp">${cta}</button><button class="bg">See Our Work</button></div></div></section>
      <section class="svcs"><p class="eye">What We Do</p><h2 class="sh">Our Services</h2><div class="grid">${svcs.map((s,i)=>`<div class="card"><div class="cnum">0${i+1}</div><div class="ct">${s}</div><div class="cd">Professional service, fair pricing.</div></div>`).join('')}</div></section>
      ${extras(dark+'88','1px solid rgba(255,255,255,0.08)',dark,'1px solid rgba(255,255,255,0.08)',light,dim,'6px')}
    `)
  }

  // ── LAYOUT 2: Bright & Clean ── white bg, spacious, minimal
  if (layout === 'bright-clean') {
    const pageBg = '#FFFFFF'; const pageText = '#111111'; const pageMuted = '#666666'; const pageBorder = '1px solid #E5E7EB'
    return wrap(`
      body{background:${pageBg};color:${pageText}}
      nav{height:56px;padding:0 48px;display:flex;align-items:center;justify-content:space-between;border-bottom:${pageBorder};background:${pageBg}}
      .nb{font-size:15px;font-weight:800;color:${pageText}}
      .nl a{font-size:13px;color:${pageMuted};text-decoration:none;margin-left:24px}
      .nc{background:${accent};color:#fff;border:none;padding:8px 16px;border-radius:50px;font-size:12px;font-weight:700;cursor:pointer}
      .hero{padding:80px 48px 64px;max-width:720px}
      .tag{display:inline-block;background:${accent}18;color:${accent};font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:4px 12px;border-radius:50px;margin-bottom:20px}
      h1{font-size:52px;font-weight:900;line-height:1.05;letter-spacing:-2px;color:${pageText};margin-bottom:16px}
      h1 span{color:${accent}}
      .sub{font-size:17px;color:${pageMuted};max-width:500px;line-height:1.7;margin-bottom:32px}
      .bp{background:${accent};color:#fff;border:none;padding:14px 28px;border-radius:50px;font-size:14px;font-weight:700;cursor:pointer;margin-right:12px}
      .bg{background:transparent;color:${pageText};border:1.5px solid #D1D5DB;padding:13px 28px;border-radius:50px;font-size:14px;cursor:pointer}
      .svcs{padding:72px 48px;background:#F9FAFB;border-top:${pageBorder};border-bottom:${pageBorder}}
      .eye{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${accent};margin-bottom:8px;font-weight:700}
      .sh{font-size:28px;font-weight:800;color:${pageText};margin-bottom:32px;letter-spacing:-0.5px}
      .grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
      .card{background:${pageBg};border:${pageBorder};border-radius:12px;padding:24px;display:flex;gap:16px;align-items:flex-start}
      .cicon{width:40px;height:40px;background:${accent}18;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
      .cdot{width:14px;height:14px;background:${accent};border-radius:50%}
      .ct{font-size:15px;font-weight:700;color:${pageText};margin-bottom:4px}
      .cd{font-size:13px;color:${pageMuted};line-height:1.5}
    `,`
      <nav><div style="display:flex;align-items:center;gap:8px">${logo}<div class="nb">${biz}</div></div><div class="nl"><a href="#">Services</a><a href="#">About</a><a href="#">Contact</a><button class="nc">${cta}</button></div></nav>
      <section class="hero"><div class="tag">${industryKey}</div><h1>${biz}<br><span>${tl}</span></h1><p class="sub">We're a local ${industryKey} business serving our community. Honest work, fair prices, and always available when you need us.</p><button class="bp">${cta}</button><button class="bg">See Our Work</button></section>
      <section class="svcs"><p class="eye">What We Do</p><h2 class="sh">Our Services</h2><div class="grid">${svcs.map(s=>`<div class="card"><div class="cicon"><div class="cdot"></div></div><div><div class="ct">${s}</div><div class="cd">Professional service. Fair pricing. Get in touch to learn more.</div></div></div>`).join('')}</div></section>
      ${extras('#F9FAFB',pageBorder,pageBg,pageBorder,pageText,pageMuted,'50px')}
    `)
  }

  // ── LAYOUT 3: Split Screen ── half bg, half accent, bold
  if (layout === 'split-screen') {
    const dim = textCol + '70'
    return wrap(`
      body{background:${bg};color:${textCol}}
      nav{height:60px;background:${accent};padding:0 48px;display:flex;align-items:center;justify-content:space-between}
      .nb{font-size:16px;font-weight:900;color:#fff;letter-spacing:-0.5px}
      .nl a{font-size:12px;color:rgba(255,255,255,0.7);text-decoration:none;margin-left:20px}
      .nc{background:#fff;color:${accent};border:none;padding:8px 16px;border-radius:4px;font-size:12px;font-weight:800;cursor:pointer}
      .hero{display:grid;grid-template-columns:1fr 1fr;min-height:85vh}
      .hl{background:${bg};padding:64px 48px;display:flex;flex-direction:column;justify-content:center}
      .hr{background:${accent};display:flex;align-items:center;justify-content:center;padding:40px}
      h1{font-size:48px;font-weight:900;line-height:1.05;letter-spacing:-2px;color:${textCol};margin-bottom:16px}
      .sub{font-size:16px;color:${dim};line-height:1.65;margin-bottom:28px;max-width:420px}
      .bp{background:${accent};color:#fff;border:none;padding:14px 28px;border-radius:4px;font-size:14px;font-weight:700;cursor:pointer;margin-right:10px}
      .bg{background:transparent;color:${textCol};border:1px solid ${textCol}40;padding:13px 28px;border-radius:4px;font-size:14px;cursor:pointer}
      .stat{color:rgba(255,255,255,0.9);text-align:center;padding:16px}
      .sn{font-size:40px;font-weight:900;color:#fff;line-height:1}
      .sl{font-size:12px;color:rgba(255,255,255,0.7);margin-top:4px}
      .svcs{padding:64px 48px}
      .eye{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${accent};margin-bottom:8px;font-weight:700}
      .sh{font-size:26px;font-weight:800;color:${textCol};margin-bottom:28px;letter-spacing:-0.5px}
      .srow{display:flex;align-items:center;gap:16px;padding:16px 0;border-bottom:1px solid ${textCol}15}
      .sn2{font-size:11px;font-weight:800;color:${accent};letter-spacing:1px;min-width:28px}
      .st{font-size:15px;font-weight:600;color:${textCol}}
      .sa{margin-left:auto;background:${accent};color:#fff;border:none;padding:6px 14px;border-radius:4px;font-size:11px;font-weight:700;cursor:pointer}
    `,`
      <nav><div style="display:flex;align-items:center;gap:8px">${logo}<div class="nb">${biz}</div></div><div><a class="nl" href="#" style="font-size:12px;color:rgba(255,255,255,0.7);text-decoration:none;margin-left:20px">Services</a><a href="#" style="font-size:12px;color:rgba(255,255,255,0.7);text-decoration:none;margin-left:20px">Contact</a><button class="nc">${cta}</button></div></nav>
      <section class="hero"><div class="hl"><h1>${biz}<br>${tl}</h1><p class="sub">Local ${industryKey}. Real people, honest work, and prices that make sense.</p><div><button class="bp">${cta}</button><button class="bg">Learn More</button></div></div><div class="hr">${['4.9★ Rated','100% Local','Fast Response'].map((s,i)=>`<div class="stat"><div class="sn">${['⭐','📍','⚡'][i]}</div><div class="sl">${s}</div></div>`).join('')}</div></section>
      <section class="svcs"><p class="eye">What We Do</p><h2 class="sh">Our Services</h2>${svcs.map((s,i)=>`<div class="srow"><span class="sn2">0${i+1}</span><span class="st">${s}</span><button class="sa">Book</button></div>`).join('')}</section>
      ${extras(bg+'44','1px solid '+textCol+'15',bg+'66','1px solid '+textCol+'15',textCol,dim,'4px')}
    `)
  }

  // ── LAYOUT 4: Card Focus ── compact hero, big service blocks
  if (layout === 'card-focus') {
    const dim = textCol + '65'
    return wrap(`
      body{background:${bg};color:${textCol}}
      nav{height:58px;padding:0 40px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid ${textCol}12}
      .nb{font-size:15px;font-weight:800;color:${textCol}}
      .nc{background:${accent};color:#fff;border:none;padding:8px 16px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer}
      .hero{padding:48px 40px 40px;display:flex;align-items:center;justify-content:space-between;gap:40px}
      h1{font-size:36px;font-weight:900;letter-spacing:-1.5px;color:${textCol};line-height:1.1;margin-bottom:10px}
      h1 span{color:${accent}}
      .sub{font-size:14px;color:${dim};line-height:1.6;max-width:400px}
      .badge{background:${accent}22;color:${accent};font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:4px 12px;border-radius:50px;margin-bottom:12px;display:inline-block}
      .bp{margin-top:16px;background:${accent};color:#fff;border:none;padding:11px 24px;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer}
      .svcs{padding:0 40px 60px}
      .sh{font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${accent};margin-bottom:16px}
      .grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
      .card{background:${textCol}0a;border:1px solid ${textCol}12;border-radius:16px;padding:28px;cursor:pointer;transition:all 0.15s}
      .cn{font-size:48px;font-weight:900;color:${accent};line-height:1;margin-bottom:8px;opacity:0.5}
      .ct{font-size:17px;font-weight:800;color:${textCol};margin-bottom:6px}
      .cd{font-size:13px;color:${dim};line-height:1.5}
      .arr{display:inline-block;margin-top:12px;font-size:12px;font-weight:700;color:${accent}}
    `,`
      <nav><div style="display:flex;align-items:center;gap:8px">${logo}<div class="nb">${biz}</div></div><button class="nc">${cta}</button></nav>
      <section class="hero"><div><div class="badge">${industryKey}</div><h1>${biz}<br><span>${tl}</span></h1><p class="sub">Serving your community with quality ${industryKey} services.</p><button class="bp">${cta}</button></div></section>
      <section class="svcs"><p class="sh">Our Services</p><div class="grid">${svcs.map((s,i)=>`<div class="card"><div class="cn">0${i+1}</div><div class="ct">${s}</div><div class="cd">Professional service with fair, upfront pricing. No surprises.</div><div class="arr">Book now →</div></div>`).join('')}</div></section>
      ${extras(textCol+'06','1px solid '+textCol+'10',textCol+'0a','1px solid '+textCol+'12',textCol,dim,'8px')}
    `)
  }

  // ── LAYOUT 5: Editorial ── light bg, strong type, magazine feel
  if (layout === 'editorial') {
    const pageBg = '#FAFAF8'; const pg = '#1a1a1a'; const pm = '#555'
    return wrap(`
      body{background:${pageBg};color:${pg}}
      nav{height:52px;padding:0 48px;display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid ${pg}}
      .nb{font-size:20px;font-weight:900;color:${pg};letter-spacing:-1px}
      .nl{display:flex;gap:24px;align-items:center}
      .nl a{font-size:12px;color:${pm};text-decoration:none;font-weight:600;letter-spacing:0.5px;text-transform:uppercase}
      .nc{background:${pg};color:${pageBg};border:none;padding:8px 16px;font-size:11px;font-weight:700;cursor:pointer;letter-spacing:1px;text-transform:uppercase}
      .hero{padding:72px 48px 60px;border-bottom:1px solid #E0E0D8}
      .date{font-size:11px;color:${pm};letter-spacing:2px;text-transform:uppercase;margin-bottom:20px}
      h1{font-size:58px;font-weight:900;line-height:1;letter-spacing:-3px;color:${pg};margin-bottom:20px;max-width:700px}
      h1 em{color:${accent};font-style:normal}
      .sub{font-size:18px;color:${pm};max-width:540px;line-height:1.6;margin-bottom:28px;font-style:italic}
      .bp{background:${accent};color:#fff;border:none;padding:13px 28px;font-size:13px;font-weight:700;cursor:pointer;letter-spacing:0.5px}
      .bg{background:transparent;color:${pg};border:1px solid ${pg};padding:12px 28px;font-size:13px;cursor:pointer;margin-left:10px}
      .svcs{padding:64px 48px}
      .sh{font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:${pm};margin-bottom:32px;padding-bottom:12px;border-bottom:1px solid #E0E0D8}
      .srow{display:grid;grid-template-columns:80px 1fr auto;align-items:start;padding:20px 0;border-bottom:1px solid #E8E8E0;gap:16px}
      .sn{font-size:40px;font-weight:900;color:${accent};line-height:1}
      .st{font-size:17px;font-weight:800;color:${pg};margin-bottom:4px}
      .sd{font-size:13px;color:${pm};line-height:1.5}
      .sa{background:${accent};color:#fff;border:none;padding:8px 16px;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap}
    `,`
      <nav><div style="display:flex;align-items:center;gap:8px">${logo}<div class="nb">${biz}</div></div><div class="nl"><a href="#">Services</a><a href="#">About</a><a href="#">Contact</a><button class="nc">${cta}</button></div></nav>
      <section class="hero"><div class="date">Est. 2024 · ${industryKey.toUpperCase()}</div><h1>${biz}<br><em>${tl}</em></h1><p class="sub">Trusted local ${industryKey} services. We show up on time, do the job right, and stand behind our work.</p><button class="bp">${cta}</button><button class="bg">View Work</button></section>
      <section class="svcs"><div class="sh">What We Do</div>${svcs.map((s,i)=>`<div class="srow"><div class="sn">0${i+1}</div><div><div class="st">${s}</div><div class="sd">Professional quality. Fair pricing. Available now.</div></div><button class="sa">Book</button></div>`).join('')}</section>
      ${extras('#F3F3EF','1px solid #E0E0D8','#FFFFFF','1px solid #E0E0D8',pg,pm,'0px')}
    `)
  }

  // ── LAYOUT 6: Gradient Glass ── mesh gradient, frosted glass cards
  if (layout === 'gradient-glass') {
    const gc1 = bg; const gc2 = accent + 'cc'
    return wrap(`
      body{background:${gc1};color:${textCol};min-height:100vh}
      body::before{content:'';position:fixed;inset:0;background:radial-gradient(ellipse at 20% 20%,${accent}30 0%,transparent 50%),radial-gradient(ellipse at 80% 80%,${accent}18 0%,transparent 50%),radial-gradient(ellipse at 60% 10%,${textCol}08 0%,transparent 40%);pointer-events:none;z-index:0}
      *{position:relative;z-index:1}
      nav{height:60px;padding:0 48px;display:flex;align-items:center;justify-content:space-between;background:rgba(0,0,0,0.2);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.1)}
      .nb{font-size:16px;font-weight:900;color:${textCol};letter-spacing:-0.5px}
      .nl a{font-size:12px;color:${textCol}80;text-decoration:none;margin-left:20px}
      .nc{background:${accent};color:#fff;border:none;padding:8px 18px;border-radius:50px;font-size:12px;font-weight:700;cursor:pointer}
      .hero{padding:80px 48px 72px;text-align:center}
      .pill{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.1);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.15);border-radius:50px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${textCol}aa;margin-bottom:24px}
      h1{font-size:56px;font-weight:900;line-height:1.05;letter-spacing:-2px;color:${textCol};margin-bottom:16px}
      h1 span{color:${accent}}
      .sub{font-size:17px;color:${textCol}70;max-width:500px;margin:0 auto 32px;line-height:1.6}
      .btns{display:flex;gap:12px;justify-content:center}
      .bp{background:${accent};color:#fff;border:none;padding:14px 28px;border-radius:50px;font-size:14px;font-weight:700;cursor:pointer}
      .bg{background:rgba(255,255,255,0.1);color:${textCol};border:1px solid rgba(255,255,255,0.2);backdrop-filter:blur(10px);padding:13px 28px;border-radius:50px;font-size:14px;cursor:pointer}
      .svcs{padding:64px 48px}
      .eye{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${accent};margin-bottom:8px;font-weight:700;text-align:center}
      .sh{font-size:28px;font-weight:800;color:${textCol};margin-bottom:32px;letter-spacing:-0.5px;text-align:center}
      .grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
      .card{background:rgba(255,255,255,0.07);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:24px}
      .ci{width:36px;height:36px;background:${accent}33;border:1px solid ${accent}55;border-radius:10px;margin-bottom:14px}
      .ct{font-size:15px;font-weight:700;color:${textCol};margin-bottom:6px}
      .cd{font-size:13px;color:${textCol}60;line-height:1.5}
    `,`
      <nav><div style="display:flex;align-items:center;gap:8px">${logo}<div class="nb">${biz}</div></div><div><a class="nl" href="#" style="font-size:12px;color:${textCol+'80'};text-decoration:none;margin-left:20px">Services</a><a href="#" style="font-size:12px;color:${textCol+'80'};text-decoration:none;margin-left:20px">Contact</a><button class="nc">${cta}</button></div></nav>
      <section class="hero"><div class="pill">⚡ ${industryKey}</div><h1>${biz}<br><span>${tl}</span></h1><p class="sub">Local ${industryKey} services done right. Real people, fair prices.</p><div class="btns"><button class="bp">${cta}</button><button class="bg">Learn More</button></div></section>
      <section class="svcs"><p class="eye">What We Do</p><h2 class="sh">Our Services</h2><div class="grid">${svcs.map(s=>`<div class="card"><div class="ci"></div><div class="ct">${s}</div><div class="cd">Professional service with upfront pricing and fast turnaround.</div></div>`).join('')}</div></section>
      ${extras('rgba(0,0,0,0.15)','1px solid rgba(255,255,255,0.1)','rgba(255,255,255,0.07)','1px solid rgba(255,255,255,0.12)',textCol,textCol+'60','50px')}
    `)
  }

  // fallback → bright-clean
  return generatePreviewHTML({ ...form, layout: 'bright-clean' })
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
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-bold text-base ${form.layout === l.key ? 'text-[#E8722A]' : 'text-white'}`}>{l.label}</span>
                      <span className="text-[10px] font-bold tracking-widest px-1.5 py-0.5 rounded bg-white/10 text-white/40">{l.badge}</span>
                    </div>
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
