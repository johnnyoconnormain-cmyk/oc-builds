import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useInView } from '../hooks/useInView'

const helpOptions = [
  'Website Build',
  'AI Chatbot',
  'Google Business Setup',
  'Social Media Content',
  'Automation / Workflows',
  'Branding Package',
  'Not sure yet, just exploring',
]

export default function Contact() {
  const submit = useMutation(api.submissions.submit)
  const [ref, inView] = useInView()

  const [form, setForm] = useState({ name: '', business: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('')

  function handle(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.business || !form.email || !form.message) {
      setErrorMsg('Please fill in the required fields.')
      return
    }
    setErrorMsg('')
    setStatus('submitting')
    try {
      const data = {
        name: form.name.trim(),
        business: form.business.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        message: form.message.trim(),
      }
      // Save to Convex DB
      await submit(data)
      // Send email notification via Web3Forms
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '9283ffa2-7690-473f-a770-70010c6d24ef',
          subject: `New lead: ${data.name} — ${data.business}`,
          from_name: 'OC Builds Contact Form',
          replyto: data.email,
          name: data.name,
          email: data.email,
          message: `Business: ${data.business}\nPhone: ${data.phone || 'Not provided'}\n\n${data.message}`,
        }),
      })
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Email me directly at hello@ocbuilds.com.')
    }
  }

  return (
    <section id="contact" className="bg-[#F5F0EB] py-24">
      <div className="container-xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: copy */}
          <div ref={ref} className={`reveal ${inView ? 'in-view' : ''}`}>
            <p className="section-eyebrow">Free Audit</p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-[#1a1a1a] tracking-tight mb-5">
              Let's see what<br />
              <span className="text-orange-gradient">we can build.</span>
            </h2>
            <p className="text-[#555] text-base leading-relaxed mb-8 max-w-sm">
              Fill this out and I'll get back to you within one business day with a free audit of your online presence and a clear recommendation. No fluff, no upsell.
            </p>

            <div className="space-y-4">
              {[
                { icon: '⚡', text: 'Free, no-obligation audit' },
                { icon: '📞', text: 'Response within 24 hours' },
                { icon: '📍', text: 'Local to Ellensburg, easy to meet up' },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-3 text-[#444] text-sm font-medium">
                  <span className="text-base">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white rounded-2xl border border-[#1a1a1a]/[0.08] p-7 shadow-sm">
            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#FF6B2B]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6B2B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="font-display font-bold text-[#1a1a1a] text-2xl mb-2">Got it!</h3>
                <p className="text-[#666] text-sm leading-relaxed mb-6">
                  I'll look over your info and get back to you within 24 hours. Talk soon.
                </p>
                <button
                  onClick={() => { setStatus('idle'); setForm({ name: '', business: '', email: '', phone: '', message: '' }) }}
                  className="text-sm text-[#FF6B2B] font-semibold hover:underline"
                >
                  Submit another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Your Name" name="name" type="text" placeholder="Johnny O'Connor" value={form.name} onChange={handle} required />
                  <Field label="Business Name" name="business" type="text" placeholder="Your Barbershop" value={form.business} onChange={handle} required />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handle} required />
                  <Field label="Phone (optional)" name="phone" type="tel" placeholder="(509) 555-0100" value={form.phone} onChange={handle} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1a1a1a] mb-1.5">
                    What do you need help with? <span className="text-[#FF6B2B]">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell me a little about your business and what you're looking for. No need to have it all figured out."
                    value={form.message}
                    onChange={handle}
                    required
                    className="w-full bg-[#F8F6F3] border border-[#1a1a1a]/10 rounded-xl px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#aaa] focus:outline-none focus:border-[#FF6B2B] transition-colors resize-none"
                  />
                </div>

                {errorMsg && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded-xl">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full btn-orange py-4 text-sm justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {status === 'submitting' ? 'Sending…' : 'Send It — It\'s Free'}
                  {status !== 'submitting' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  )}
                </button>

                <p className="text-center text-xs text-[#aaa]">
                  No spam. No sales pressure. Just a real conversation.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type, placeholder, value, onChange, required }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#1a1a1a] mb-1.5">
        {label} {required && <span className="text-[#FF6B2B]">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-[#F8F6F3] border border-[#1a1a1a]/10 rounded-xl px-4 py-3 text-sm text-[#1a1a1a] placeholder-[#aaa] focus:outline-none focus:border-[#FF6B2B] transition-colors"
      />
    </div>
  )
}
