import { useState, FormEvent } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import './Contact.css'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const projectTypes = [
  'Custom Home Build',
  'Full Renovation',
  'Commercial Build',
  'ADU Construction',
  'Kitchen / Bath Remodel',
  'Other',
]

export default function Contact() {
  const submitContact = useMutation(api.contacts.submit)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  })
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.')
      return
    }
    setError('')
    setStatus('submitting')
    try {
      await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        projectType: form.projectType || undefined,
        message: form.message.trim(),
      })
      setStatus('success')
      setForm({ name: '', email: '', phone: '', projectType: '', message: '' })
    } catch {
      setStatus('error')
      setError('Something went wrong. Please try again or call us directly.')
    }
  }

  return (
    <section id="contact" style={{ background: 'var(--color-surface)' }}>
      <div className="section contact-layout">
        <div className="contact-info">
          <p className="section-label">Get in Touch</p>
          <h2 className="section-title">Let's Build<br />Something Great</h2>
          <p className="section-subtitle">
            Tell us about your project and we'll get back to you within one business day with a free consultation.
          </p>

          <div className="contact-details">
            {[
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.4a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 14.92z"/>
                  </svg>
                ),
                label: 'Phone',
                value: '(714) 555-0192',
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                ),
                label: 'Email',
                value: 'hello@ocbuilds.com',
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                ),
                label: 'Location',
                value: 'Orange County, CA',
              },
            ].map(d => (
              <div key={d.label} className="contact-detail">
                <div className="contact-detail-icon">{d.icon}</div>
                <div>
                  <div className="contact-detail-label">{d.label}</div>
                  <div className="contact-detail-value">{d.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-form-wrap">
          {status === 'success' ? (
            <div className="contact-success">
              <div className="contact-success-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3>Message Received!</h3>
              <p>Thanks for reaching out. We'll be in touch within one business day.</p>
              <button className="btn-outline" onClick={() => setStatus('idle')} style={{ marginTop: 24 }}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Full Name <span className="required">*</span></label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Smith"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email Address <span className="required">*</span></label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(714) 555-0100"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="projectType">Project Type</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                  >
                    <option value="">Select a project type</option>
                    {projectTypes.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="message">Tell Us About Your Project <span className="required">*</span></label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Describe your project, timeline, and any specific requirements..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <p className="form-error">{error}</p>}

              <button
                type="submit"
                className="btn-primary form-submit"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending…' : 'Send Message'}
                {status !== 'submitting' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
