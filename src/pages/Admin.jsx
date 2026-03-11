import { useState, useRef, useEffect } from 'react'
import { useQuery, useMutation, useAction } from 'convex/react'
import { api } from '../../convex/_generated/api'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'ocbuilds'

// ─────────────────────────────────────────
// Icons (inline lucide-style SVGs)
// ─────────────────────────────────────────
function Icon({ name, size = 18 }) {
  const paths = {
    home: <><rect x="3" y="9" width="18" height="13" rx="2"/><path d="M3 9L12 3l9 6"/></>,
    folder: <><path d="M2 7a2 2 0 012-2h4l2 3h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2z"/></>,
    inbox: <><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></>,
    image: <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></>,
    dollar: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    message: <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    edit: <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    trash: <><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></>,
    logout: <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    send: <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    refresh: <><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></>,
    chevron: <><polyline points="6 9 12 15 18 9"/></>,
    menu: <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    arrow: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

// ─────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────
function fmt(ts) {
  if (!ts) return '—'
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
function fmtTime(ts) {
  if (!ts) return '—'
  return new Date(ts).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}
function statusColor(s) {
  const map = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    proposal_sent: 'bg-purple-100 text-purple-700',
    converted: 'bg-green-100 text-green-700',
    lost: 'bg-gray-100 text-gray-500',
    lead: 'bg-blue-100 text-blue-700',
    in_progress: 'bg-orange-100 text-orange-700',
    review: 'bg-purple-100 text-purple-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-600',
    draft: 'bg-gray-100 text-gray-500',
    sent: 'bg-blue-100 text-blue-700',
    paid: 'bg-green-100 text-green-700',
    overdue: 'bg-red-100 text-red-600',
    scheduled: 'bg-yellow-100 text-yellow-700',
    posted: 'bg-green-100 text-green-700',
  }
  return map[s] || 'bg-gray-100 text-gray-500'
}
function Badge({ label }) {
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor(label)}`}>{label?.replace(/_/g, ' ')}</span>
}

// ─────────────────────────────────────────
// Modal wrapper
// ─────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#1a1a1a] text-lg">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><Icon name="x" size={20} /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// Form field helpers
// ─────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  )
}
const inp = 'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-[#1a1a1a] focus:outline-none focus:border-[#E8722A] transition-colors bg-white'
const sel = `${inp} cursor-pointer`

// ─────────────────────────────────────────
// Password Gate
// ─────────────────────────────────────────
function PasswordGate({ onUnlock }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)

  function attempt() {
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('oc_admin', '1')
      onUnlock()
    } else {
      setErr(true)
      setPw('')
    }
  }

  return (
    <div className="min-h-screen bg-[#F5EDD8] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm">
        <div className="w-12 h-12 bg-[#E8722A] rounded-2xl flex items-center justify-center mb-6">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
        </div>
        <h1 className="font-bold text-2xl text-[#1a1a1a] mb-1">OC Builds Admin</h1>
        <p className="text-gray-400 text-sm mb-6">Enter your password to continue.</p>
        <input
          type="password"
          value={pw}
          onChange={e => { setPw(e.target.value); setErr(false) }}
          onKeyDown={e => e.key === 'Enter' && attempt()}
          placeholder="Password"
          className={`${inp} mb-3 ${err ? 'border-red-400' : ''}`}
          autoFocus
        />
        {err && <p className="text-red-500 text-xs mb-3">Wrong password.</p>}
        <button onClick={attempt} className="w-full bg-[#E8722A] hover:bg-[#d4651f] text-white font-bold py-3 rounded-xl text-sm transition-colors">
          Enter Dashboard
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// Overview
// ─────────────────────────────────────────
function Overview({ setSection }) {
  const stats = useQuery(api.admin.getOverviewStats)

  if (!stats) return <div className="text-gray-400 text-sm">Loading…</div>

  const quickActions = [
    { label: 'Add Project', icon: 'folder', section: 'projects' },
    { label: 'View Leads', icon: 'inbox', section: 'leads' },
    { label: 'New Invoice', icon: 'dollar', section: 'invoices' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1a1a1a]">Overview</h1>
        <p className="text-gray-400 text-sm mt-1">What's going on with OC Builds.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Active Projects', value: stats.activeProjects, color: 'text-[#E8722A]' },
          { label: 'Leads This Month', value: stats.leadsThisMonth, color: 'text-blue-600' },
          { label: 'Revenue This Month', value: `$${stats.revenueThisMonth.toLocaleString()}`, color: 'text-green-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className={`text-3xl font-bold ${s.color} mb-1`}>{s.value}</div>
            <div className="text-gray-400 text-sm font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {quickActions.map(a => (
            <button
              key={a.label}
              onClick={() => setSection(a.section)}
              className="flex items-center gap-2 bg-white border border-gray-200 hover:border-[#E8722A]/50 hover:bg-[#E8722A]/5 text-[#1a1a1a] font-semibold text-sm px-4 py-2.5 rounded-xl transition-all"
            >
              <span className="text-[#E8722A]"><Icon name={a.icon} size={15} /></span>
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h2 className="font-bold text-[#1a1a1a] mb-4">Recent Contact Leads</h2>
          {stats.recentSubmissions.length === 0
            ? <p className="text-gray-400 text-sm">No submissions yet.</p>
            : <div className="space-y-3">
                {stats.recentSubmissions.map(s => (
                  <div key={s._id} className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold text-sm text-[#1a1a1a]">{s.name}</div>
                      <div className="text-xs text-gray-400">{s.business} · {fmtTime(s.createdAt)}</div>
                    </div>
                    <Badge label={s.leadStatus || 'new'} />
                  </div>
                ))}
              </div>
          }
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h2 className="font-bold text-[#1a1a1a] mb-4">Recent Dream Board Leads</h2>
          {stats.recentDreamboards.length === 0
            ? <p className="text-gray-400 text-sm">No dream board entries yet.</p>
            : <div className="space-y-3">
                {stats.recentDreamboards.map(d => (
                  <div key={d._id} className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold text-sm text-[#1a1a1a]">{d.bizName}</div>
                      <div className="text-xs text-gray-400">{d.industry} · {fmtTime(d.createdAt)}</div>
                    </div>
                    <Badge label={d.leadStatus || 'new'} />
                  </div>
                ))}
              </div>
          }
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// Projects
// ─────────────────────────────────────────
const PROJECT_TYPES = ['website', 'chatbot', 'google_business', 'branding', 'automation', 'content', 'full_stack']
const PROJECT_STATUSES = ['lead', 'in_progress', 'review', 'completed', 'cancelled']

function emptyProject() {
  return { clientName: '', businessName: '', projectType: 'website', status: 'lead', startDate: '', deadline: '', price: '', notes: '', websiteUrl: '', tasks: [] }
}

function ProjectForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial)
  const [taskInput, setTaskInput] = useState('')

  function f(field, val) { setForm(p => ({ ...p, [field]: val })) }
  function addTask() {
    if (!taskInput.trim()) return
    f('tasks', [...form.tasks, { text: taskInput.trim(), done: false }])
    setTaskInput('')
  }
  function toggleTask(i) {
    const t = [...form.tasks]
    t[i] = { ...t[i], done: !t[i].done }
    f('tasks', t)
  }
  function removeTask(i) { f('tasks', form.tasks.filter((_, idx) => idx !== i)) }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Client Name">
          <input className={inp} value={form.clientName} onChange={e => f('clientName', e.target.value)} placeholder="Johnny Smith" />
        </Field>
        <Field label="Business Name">
          <input className={inp} value={form.businessName} onChange={e => f('businessName', e.target.value)} placeholder="Smith Plumbing" />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Project Type">
          <select className={sel} value={form.projectType} onChange={e => f('projectType', e.target.value)}>
            {PROJECT_TYPES.map(t => <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>)}
          </select>
        </Field>
        <Field label="Status">
          <select className={sel} value={form.status} onChange={e => f('status', e.target.value)}>
            {PROJECT_STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Start Date">
          <input className={inp} type="date" value={form.startDate} onChange={e => f('startDate', e.target.value)} />
        </Field>
        <Field label="Deadline">
          <input className={inp} type="date" value={form.deadline} onChange={e => f('deadline', e.target.value)} />
        </Field>
      </div>
      <Field label="Price ($)">
        <input className={inp} type="number" value={form.price} onChange={e => f('price', e.target.value)} placeholder="499" />
      </Field>
      <Field label="Website URL">
        <input className={inp} value={form.websiteUrl} onChange={e => f('websiteUrl', e.target.value)} placeholder="https://clientsite.com" />
      </Field>
      <Field label="Notes">
        <textarea className={`${inp} resize-none`} rows={3} value={form.notes} onChange={e => f('notes', e.target.value)} placeholder="Any notes about this project..." />
      </Field>

      {/* Tasks */}
      <Field label="Task Checklist">
        <div className="space-y-1.5 mb-2">
          {form.tasks.map((t, i) => (
            <div key={i} className="flex items-center gap-2 group">
              <button onClick={() => toggleTask(i)} className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${t.done ? 'bg-[#E8722A] border-[#E8722A]' : 'border-gray-300'}`}>
                {t.done && <Icon name="check" size={10} />}
              </button>
              <span className={`text-sm flex-1 ${t.done ? 'line-through text-gray-400' : 'text-[#1a1a1a]'}`}>{t.text}</span>
              <button onClick={() => removeTask(i)} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"><Icon name="x" size={14} /></button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input className={`${inp} flex-1`} value={taskInput} onChange={e => setTaskInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTask()} placeholder="Add a task..." />
          <button onClick={addTask} className="bg-[#E8722A] text-white px-3 rounded-xl hover:bg-[#d4651f] transition-colors"><Icon name="plus" size={16} /></button>
        </div>
      </Field>

      <div className="flex gap-3 pt-2">
        <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors">Cancel</button>
        <button onClick={() => onSave(form)} className="flex-1 bg-[#E8722A] text-white font-bold py-2.5 rounded-xl text-sm hover:bg-[#d4651f] transition-colors">Save Project</button>
      </div>
    </div>
  )
}

function ProjectWorkspace({ project, onClose, onUpdate }) {
  const update = useMutation(api.admin.updateAdminProject)
  const askRody = useAction(api.admin.askProjectQuestion)
  const [tasks, setTasks] = useState(project.tasks)
  const [notes, setNotes] = useState(project.notes || '')
  const [taskInput, setTaskInput] = useState('')
  const [iframeError, setIframeError] = useState(false)
  const [saved, setSaved] = useState(false)
  const [aiQ, setAiQ] = useState('')
  const [aiA, setAiA] = useState('')
  const [aiLoading, setAiLoading] = useState(false)

  async function handleAsk() {
    const q = aiQ.trim()
    if (!q || aiLoading) return
    setAiQ('')
    setAiLoading(true)
    try {
      const answer = await askRody({
        question: q,
        projectContext: {
          businessName: project.businessName,
          clientName: project.clientName,
          projectType: project.projectType,
          status: project.status,
          notes,
          tasks,
        },
      })
      setAiA(answer)
    } finally {
      setAiLoading(false)
    }
  }

  function toggleTask(i) {
    const t = [...tasks]
    t[i] = { ...t[i], done: !t[i].done }
    setTasks(t)
  }
  function addTask() {
    if (!taskInput.trim()) return
    setTasks(prev => [...prev, { text: taskInput.trim(), done: false }])
    setTaskInput('')
  }
  function removeTask(i) { setTasks(prev => prev.filter((_, idx) => idx !== i)) }

  async function save() {
    await update({ id: project._id, tasks, notes })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    onUpdate()
  }

  const url = project.websiteUrl

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3">
      <div className="bg-[#F5EDD8] rounded-3xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div>
              <div className="font-bold text-[#1a1a1a]">{project.businessName}</div>
              <div className="text-xs text-gray-400">{project.clientName} · {project.projectType.replace(/_/g, ' ')}</div>
            </div>
            <Badge label={project.status} />
          </div>
          <div className="flex items-center gap-3">
            {url && (
              <a href={url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-[#E8722A] border border-[#E8722A]/30 px-3 py-1.5 rounded-lg hover:bg-[#E8722A]/10 transition-colors">
                <Icon name="arrow" size={12} /> Open Site
              </a>
            )}
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><Icon name="x" size={20} /></button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left — project workspace */}
          <div className="w-80 shrink-0 bg-white border-r border-gray-100 flex flex-col overflow-y-auto p-5 space-y-5">
            {/* Tasks */}
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Tasks</div>
              <div className="space-y-1.5 mb-2">
                {tasks.map((t, i) => (
                  <div key={i} className="flex items-center gap-2 group">
                    <button onClick={() => toggleTask(i)} className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${t.done ? 'bg-[#E8722A] border-[#E8722A]' : 'border-gray-300'}`}>
                      {t.done && <Icon name="check" size={10} />}
                    </button>
                    <span className={`text-sm flex-1 ${t.done ? 'line-through text-gray-400' : 'text-[#1a1a1a]'}`}>{t.text}</span>
                    <button onClick={() => removeTask(i)} className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-all"><Icon name="x" size={12} /></button>
                  </div>
                ))}
              </div>
              {tasks.length > 0 && (
                <div className="mb-3">
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#E8722A] rounded-full transition-all" style={{ width: `${(tasks.filter(t => t.done).length / tasks.length) * 100}%` }} />
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{tasks.filter(t => t.done).length}/{tasks.length} done</div>
                </div>
              )}
              <div className="flex gap-2">
                <input className={`${inp} flex-1 text-xs py-2`} value={taskInput} onChange={e => setTaskInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTask()} placeholder="Add task..." />
                <button onClick={addTask} className="bg-[#E8722A] text-white px-2.5 rounded-lg hover:bg-[#d4651f]"><Icon name="plus" size={14} /></button>
              </div>
            </div>

            {/* Notes */}
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Notes</div>
              <textarea
                className={`${inp} resize-none text-sm`}
                rows={6}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Notes, ideas, client feedback..."
              />
            </div>

            {/* Project info */}
            <div className="text-xs text-gray-400 space-y-1.5 border-t border-gray-100 pt-4">
              {project.deadline && <div>Deadline: <span className="font-semibold text-gray-600">{project.deadline}</span></div>}
              {project.price && <div>Price: <span className="font-bold text-green-600">${project.price.toLocaleString()}</span></div>}
              {project.startDate && <div>Started: <span className="font-semibold text-gray-600">{project.startDate}</span></div>}
            </div>

            <button onClick={save} className={`w-full font-bold py-2.5 rounded-xl text-sm transition-colors ${saved ? 'bg-green-500 text-white' : 'bg-[#E8722A] hover:bg-[#d4651f] text-white'}`}>
              {saved ? '✓ Saved' : 'Save Changes'}
            </button>

            {/* Ask Rody */}
            <div className="border-t border-gray-100 pt-4">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Ask Rody</div>
              {aiA && (
                <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-600 leading-relaxed mb-2 whitespace-pre-wrap">{aiA}</div>
              )}
              {aiLoading && (
                <div className="flex gap-1 mb-2 px-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
              <div className="flex gap-2">
                <input
                  className={`${inp} flex-1 text-xs py-2`}
                  value={aiQ}
                  onChange={e => setAiQ(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAsk()}
                  placeholder="What should I do next?"
                  disabled={aiLoading}
                />
                <button
                  onClick={handleAsk}
                  disabled={aiLoading || !aiQ.trim()}
                  className="bg-[#E8722A] disabled:opacity-40 text-white px-2.5 rounded-lg hover:bg-[#d4651f]"
                >
                  <Icon name="send" size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* Right — site preview */}
          <div className="flex-1 bg-gray-50 flex flex-col overflow-hidden">
            {!url ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                <p className="text-sm font-medium">No website URL set</p>
                <p className="text-xs">Edit this project to add one</p>
              </div>
            ) : iframeError ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3 p-8 text-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <p className="text-sm font-medium">Can't preview this site</p>
                <p className="text-xs max-w-xs">Most sites block being loaded in an iframe. Open it directly instead.</p>
                <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-bold text-[#E8722A] hover:underline mt-2">
                  <Icon name="arrow" size={14} /> Open {url}
                </a>
              </div>
            ) : (
              <iframe
                src={url}
                className="flex-1 w-full border-0"
                onError={() => setIframeError(true)}
                title={project.businessName}
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Projects() {
  const projects = useQuery(api.admin.listAdminProjects)
  const create = useMutation(api.admin.createAdminProject)
  const update = useMutation(api.admin.updateAdminProject)
  const del = useMutation(api.admin.deleteAdminProject)

  const [modal, setModal] = useState(null) // null | { mode: 'add' } | { mode: 'edit', project }
  const [workspace, setWorkspace] = useState(null)
  const [filter, setFilter] = useState('all')

  const filtered = projects?.filter(p => filter === 'all' || p.status === filter) ?? []

  async function handleSave(form) {
    const data = { ...form, price: form.price ? Number(form.price) : undefined, tasks: form.tasks }
    if (modal.mode === 'add') {
      await create(data)
    } else {
      await update({ id: modal.project._id, ...data })
    }
    setModal(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Projects</h1>
          <p className="text-gray-400 text-sm mt-1">All client work in one place.</p>
        </div>
        <button onClick={() => setModal({ mode: 'add' })} className="flex items-center gap-2 bg-[#E8722A] text-white font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-[#d4651f] transition-colors">
          <Icon name="plus" size={16} /> Add Project
        </button>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {['all', ...PROJECT_STATUSES].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${filter === s ? 'bg-[#E8722A] text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-[#E8722A]/40'}`}>
            {s.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* Cards */}
      {!projects ? <div className="text-gray-400 text-sm">Loading…</div> : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">No projects yet. Add your first one.</div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(p => (
            <div key={p._id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-bold text-[#1a1a1a]">{p.businessName}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{p.clientName}</div>
                </div>
                <Badge label={p.status} />
              </div>
              <div className="text-xs text-gray-400 mb-3 space-y-1">
                <div>Type: <span className="text-gray-600 font-medium">{p.projectType.replace(/_/g, ' ')}</span></div>
                {p.deadline && <div>Deadline: <span className="text-gray-600 font-medium">{p.deadline}</span></div>}
                {p.price && <div>Price: <span className="text-green-600 font-bold">${p.price.toLocaleString()}</span></div>}
              </div>
              {p.tasks.length > 0 && (
                <div className="mb-3">
                  <div className="text-xs text-gray-400 mb-1">{p.tasks.filter(t => t.done).length}/{p.tasks.length} tasks done</div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#E8722A] rounded-full transition-all" style={{ width: `${(p.tasks.filter(t => t.done).length / p.tasks.length) * 100}%` }} />
                  </div>
                </div>
              )}
              <div className="flex gap-2 pt-2 border-t border-gray-50">
                <button onClick={() => setWorkspace(p)} className="flex items-center gap-1.5 text-xs text-[#E8722A] hover:text-[#d4651f] font-bold transition-colors">
                  <Icon name="arrow" size={13} /> Open
                </button>
                <button onClick={() => setModal({ mode: 'edit', project: p })} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#E8722A] font-semibold transition-colors">
                  <Icon name="edit" size={13} /> Edit
                </button>
                <button onClick={() => del({ id: p._id })} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-500 font-semibold transition-colors ml-auto">
                  <Icon name="trash" size={13} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {workspace && (
        <ProjectWorkspace project={workspace} onClose={() => setWorkspace(null)} onUpdate={() => {}} />
      )}

      {modal && (
        <Modal title={modal.mode === 'add' ? 'New Project' : 'Edit Project'} onClose={() => setModal(null)}>
          <ProjectForm
            initial={modal.mode === 'add' ? emptyProject() : {
              clientName: modal.project.clientName,
              businessName: modal.project.businessName,
              projectType: modal.project.projectType,
              status: modal.project.status,
              startDate: modal.project.startDate || '',
              deadline: modal.project.deadline || '',
              price: modal.project.price ?? '',
              notes: modal.project.notes || '',
              websiteUrl: modal.project.websiteUrl || '',
              tasks: modal.project.tasks,
            }}
            onSave={handleSave}
            onClose={() => setModal(null)}
          />
        </Modal>
      )}
    </div>
  )
}

// ─────────────────────────────────────────
// Leads
// ─────────────────────────────────────────
const LEAD_STATUSES = ['new', 'contacted', 'proposal_sent', 'converted', 'lost']

function Leads() {
  const submissions = useQuery(api.submissions.list)
  const dreamboards = useQuery(api.admin.listDreamboards)
  const updateSub = useMutation(api.admin.updateSubmissionStatus)
  const updateBoard = useMutation(api.admin.updateDreamboardStatus)
  const deleteSub = useMutation(api.admin.deleteSubmission)
  const deleteBoard = useMutation(api.admin.deleteDreamboard)
  const createProject = useMutation(api.admin.createAdminProject)

  const [tab, setTab] = useState('contact')
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState(null)

  const subs = submissions?.filter(s => filter === 'all' || (s.leadStatus || 'new') === filter) ?? []
  const boards = dreamboards?.filter(d => filter === 'all' || (d.leadStatus || 'new') === filter) ?? []

  async function convertToProject(lead, type) {
    await createProject({
      clientName: type === 'contact' ? lead.name : lead.bizName,
      businessName: type === 'contact' ? lead.business : lead.bizName,
      projectType: 'website',
      status: 'lead',
      tasks: [],
      notes: type === 'contact' ? lead.message : `Industry: ${lead.industry}. Vibe: ${lead.vibe}.`,
    })
    alert('Project created! Check the Projects section.')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1a1a1a]">Leads Inbox</h1>
        <p className="text-gray-400 text-sm mt-1">Contact form submissions and Dream Board entries.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {[{ key: 'contact', label: 'Contact Form' }, { key: 'dreamboard', label: 'Dream Board' }].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === t.key ? 'bg-white text-[#1a1a1a] shadow-sm' : 'text-gray-500'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {['all', ...LEAD_STATUSES].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${filter === s ? 'bg-[#E8722A] text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-[#E8722A]/40'}`}>
            {s.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* Contact leads */}
      {tab === 'contact' && (
        <div className="space-y-3">
          {!submissions ? <div className="text-gray-400 text-sm">Loading…</div> : subs.length === 0
            ? <div className="text-center py-16 text-gray-400">No leads found.</div>
            : subs.map(s => (
              <div key={s._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center gap-4 p-5 cursor-pointer" onClick={() => setExpanded(expanded === s._id ? null : s._id)}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-[#1a1a1a]">{s.name}</span>
                      {!s.read && <span className="w-2 h-2 bg-[#E8722A] rounded-full shrink-0" />}
                      <Badge label={s.leadStatus || 'new'} />
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.business} · {s.email} · {fmtTime(s.createdAt)}</div>
                  </div>
                  <Icon name="chevron" size={16} />
                </div>
                {expanded === s._id && (
                  <div className="px-5 pb-5 border-t border-gray-50 pt-4 space-y-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{s.message}</p>
                    {s.phone && <p className="text-xs text-gray-400">Phone: {s.phone}</p>}
                    <div className="flex flex-wrap gap-2">
                      {LEAD_STATUSES.map(st => (
                        <button key={st} onClick={() => updateSub({ id: s._id, leadStatus: st, read: true })}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${(s.leadStatus || 'new') === st ? 'bg-[#E8722A] text-white border-[#E8722A]' : 'bg-white border-gray-200 text-gray-500 hover:border-[#E8722A]/40'}`}>
                          {st.replace(/_/g, ' ')}
                        </button>
                      ))}
                      <button onClick={() => convertToProject(s, 'contact')} className="ml-auto flex items-center gap-1.5 text-xs font-bold text-[#E8722A] hover:underline">
                        <Icon name="arrow" size={13} /> Convert to Project
                      </button>
                      <button onClick={() => deleteSub({ id: s._id })} className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 font-semibold transition-colors">
                        <Icon name="trash" size={13} /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          }
        </div>
      )}

      {/* Dream board leads */}
      {tab === 'dreamboard' && (
        <div className="space-y-3">
          {!dreamboards ? <div className="text-gray-400 text-sm">Loading…</div> : boards.length === 0
            ? <div className="text-center py-16 text-gray-400">No dream board entries yet.</div>
            : boards.map(d => (
              <div key={d._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center gap-4 p-5 cursor-pointer" onClick={() => setExpanded(expanded === d._id ? null : d._id)}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-[#1a1a1a]">{d.bizName}</span>
                      <Badge label={d.leadStatus || 'new'} />
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{d.industry} · {fmtTime(d.createdAt)}</div>
                  </div>
                  <Icon name="chevron" size={16} />
                </div>
                {expanded === d._id && (
                  <div className="px-5 pb-5 border-t border-gray-50 pt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><span className="text-gray-400 text-xs">Vibe</span><div className="font-medium">{d.vibe}</div></div>
                      <div><span className="text-gray-400 text-xs">Layout</span><div className="font-medium">{d.layout}</div></div>
                      <div><span className="text-gray-400 text-xs">Tagline</span><div className="font-medium italic">"{d.tagline}"</div></div>
                      <div><span className="text-gray-400 text-xs">Colors</span><div className="font-medium font-mono text-xs">{d.colors}</div></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {LEAD_STATUSES.map(st => (
                        <button key={st} onClick={() => updateBoard({ id: d._id, leadStatus: st, contacted: st !== 'new' })}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${(d.leadStatus || 'new') === st ? 'bg-[#E8722A] text-white border-[#E8722A]' : 'bg-white border-gray-200 text-gray-500 hover:border-[#E8722A]/40'}`}>
                          {st.replace(/_/g, ' ')}
                        </button>
                      ))}
                      <button onClick={() => convertToProject(d, 'dreamboard')} className="ml-auto flex items-center gap-1.5 text-xs font-bold text-[#E8722A] hover:underline">
                        <Icon name="arrow" size={13} /> Convert to Project
                      </button>
                      <button onClick={() => deleteBoard({ id: d._id })} className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 font-semibold transition-colors">
                        <Icon name="trash" size={13} /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          }
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────
// Portfolio Manager
// ─────────────────────────────────────────
function emptyPortfolioItem(order) {
  return { title: '', clientName: '', description: '', services: [], testimonial: '', imageUrl: '', featured: false, published: true, order }
}

function PortfolioForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial)
  const [svcInput, setSvcInput] = useState('')
  function f(field, val) { setForm(p => ({ ...p, [field]: val })) }
  function addSvc() {
    if (!svcInput.trim()) return
    f('services', [...form.services, svcInput.trim()])
    setSvcInput('')
  }
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Project Title"><input className={inp} value={form.title} onChange={e => f('title', e.target.value)} placeholder="Barbershop Website" /></Field>
        <Field label="Client Name"><input className={inp} value={form.clientName} onChange={e => f('clientName', e.target.value)} placeholder="El Rancho" /></Field>
      </div>
      <Field label="Description"><textarea className={`${inp} resize-none`} rows={2} value={form.description} onChange={e => f('description', e.target.value)} placeholder="Short description..." /></Field>
      <Field label="Screenshot URL"><input className={inp} value={form.imageUrl} onChange={e => f('imageUrl', e.target.value)} placeholder="https://..." /></Field>
      <Field label="Testimonial (optional)"><textarea className={`${inp} resize-none`} rows={2} value={form.testimonial} onChange={e => f('testimonial', e.target.value)} placeholder="Quote from client..." /></Field>
      <Field label="Services">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {form.services.map((s, i) => (
            <span key={i} className="flex items-center gap-1 bg-[#E8722A]/10 text-[#E8722A] text-xs font-semibold px-2 py-1 rounded-full">
              {s} <button onClick={() => f('services', form.services.filter((_, idx) => idx !== i))}><Icon name="x" size={10} /></button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input className={`${inp} flex-1`} value={svcInput} onChange={e => setSvcInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSvc()} placeholder="Add service tag..." />
          <button onClick={addSvc} className="bg-[#E8722A] text-white px-3 rounded-xl hover:bg-[#d4651f]"><Icon name="plus" size={16} /></button>
        </div>
      </Field>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.featured} onChange={e => f('featured', e.target.checked)} className="w-4 h-4 accent-[#E8722A]" />
          <span className="text-sm font-semibold text-[#1a1a1a]">Featured</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.published} onChange={e => f('published', e.target.checked)} className="w-4 h-4 accent-[#E8722A]" />
          <span className="text-sm font-semibold text-[#1a1a1a]">Published</span>
        </label>
      </div>
      <div className="flex gap-3 pt-2">
        <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-50">Cancel</button>
        <button onClick={() => onSave(form)} className="flex-1 bg-[#E8722A] text-white font-bold py-2.5 rounded-xl text-sm hover:bg-[#d4651f]">Save</button>
      </div>
    </div>
  )
}

function PortfolioManager() {
  const items = useQuery(api.admin.listPortfolio)
  const create = useMutation(api.admin.createPortfolioItem)
  const update = useMutation(api.admin.updatePortfolioItem)
  const del = useMutation(api.admin.deletePortfolioItem)
  const [modal, setModal] = useState(null)

  async function handleSave(form) {
    const data = { ...form, order: form.order ?? 0 }
    if (modal.mode === 'add') {
      await create(data)
    } else {
      await update({ id: modal.item._id, ...data })
    }
    setModal(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Portfolio</h1>
          <p className="text-gray-400 text-sm mt-1">Manage what shows on your public site.</p>
        </div>
        <button onClick={() => setModal({ mode: 'add' })} className="flex items-center gap-2 bg-[#E8722A] text-white font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-[#d4651f] transition-colors">
          <Icon name="plus" size={16} /> Add Item
        </button>
      </div>

      {!items ? <div className="text-gray-400 text-sm">Loading…</div> : items.length === 0
        ? <div className="text-center py-16 text-gray-400">No portfolio items yet.</div>
        : <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {items.map(item => (
              <div key={item._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-full h-36 object-cover" onError={e => { e.target.style.display = 'none' }} />}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-bold text-[#1a1a1a]">{item.title}</div>
                      <div className="text-xs text-gray-400">{item.clientName}</div>
                    </div>
                    <div className="flex gap-1.5">
                      {item.featured && <span className="text-xs bg-yellow-100 text-yellow-700 font-bold px-1.5 py-0.5 rounded">★</span>}
                      <Badge label={item.published ? 'published' : 'hidden'} />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex gap-1.5 flex-wrap mb-3">
                    {item.services.map(s => <span key={s} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{s}</span>)}
                  </div>
                  <div className="flex gap-2 pt-2 border-t border-gray-50">
                    <button onClick={() => setModal({ mode: 'edit', item })} className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#E8722A] font-semibold"><Icon name="edit" size={13} /> Edit</button>
                    <button onClick={() => update({ id: item._id, published: !item.published })} className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#E8722A] font-semibold">
                      {item.published ? 'Hide' : 'Publish'}
                    </button>
                    <button onClick={() => del({ id: item._id })} className="ml-auto flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 font-semibold"><Icon name="trash" size={13} /> Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
      }

      {modal && (
        <Modal title={modal.mode === 'add' ? 'Add Portfolio Item' : 'Edit Item'} onClose={() => setModal(null)}>
          <PortfolioForm
            initial={modal.mode === 'add' ? emptyPortfolioItem((items?.length ?? 0)) : {
              title: modal.item.title, clientName: modal.item.clientName, description: modal.item.description,
              services: modal.item.services, testimonial: modal.item.testimonial || '', imageUrl: modal.item.imageUrl || '',
              featured: modal.item.featured, published: modal.item.published, order: modal.item.order,
            }}
            onSave={handleSave}
            onClose={() => setModal(null)}
          />
        </Modal>
      )}
    </div>
  )
}

// ─────────────────────────────────────────
// Invoices
// ─────────────────────────────────────────
const INVOICE_STATUSES = ['draft', 'sent', 'paid', 'overdue']

function emptyInvoice() { return { clientName: '', projectRef: '', amount: '', status: 'draft', dateSent: '', datePaid: '', notes: '' } }

function InvoiceForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial)
  function f(field, val) { setForm(p => ({ ...p, [field]: val })) }
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Client Name"><input className={inp} value={form.clientName} onChange={e => f('clientName', e.target.value)} placeholder="Smith Plumbing" /></Field>
        <Field label="Project Ref"><input className={inp} value={form.projectRef} onChange={e => f('projectRef', e.target.value)} placeholder="Website Redesign" /></Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Amount ($)"><input className={inp} type="number" value={form.amount} onChange={e => f('amount', e.target.value)} placeholder="499" /></Field>
        <Field label="Status">
          <select className={sel} value={form.status} onChange={e => f('status', e.target.value)}>
            {INVOICE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Date Sent"><input className={inp} type="date" value={form.dateSent} onChange={e => f('dateSent', e.target.value)} /></Field>
        <Field label="Date Paid"><input className={inp} type="date" value={form.datePaid} onChange={e => f('datePaid', e.target.value)} /></Field>
      </div>
      <Field label="Notes"><textarea className={`${inp} resize-none`} rows={2} value={form.notes} onChange={e => f('notes', e.target.value)} /></Field>
      <div className="flex gap-3 pt-2">
        <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-50">Cancel</button>
        <button onClick={() => onSave(form)} className="flex-1 bg-[#E8722A] text-white font-bold py-2.5 rounded-xl text-sm hover:bg-[#d4651f]">Save Invoice</button>
      </div>
    </div>
  )
}

function Invoices() {
  const invoices = useQuery(api.admin.listInvoices)
  const create = useMutation(api.admin.createInvoice)
  const update = useMutation(api.admin.updateInvoice)
  const del = useMutation(api.admin.deleteInvoice)
  const [modal, setModal] = useState(null)

  const totals = invoices ? {
    invoiced: invoices.reduce((s, i) => s + i.amount, 0),
    paid: invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0),
    outstanding: invoices.filter(i => i.status === 'sent' || i.status === 'overdue').reduce((s, i) => s + i.amount, 0),
  } : null

  async function handleSave(form) {
    const data = { ...form, amount: Number(form.amount) }
    if (modal.mode === 'add') await create(data)
    else await update({ id: modal.invoice._id, ...data })
    setModal(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Invoices</h1>
          <p className="text-gray-400 text-sm mt-1">Track what you're owed.</p>
        </div>
        <button onClick={() => setModal({ mode: 'add' })} className="flex items-center gap-2 bg-[#E8722A] text-white font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-[#d4651f] transition-colors">
          <Icon name="plus" size={16} /> New Invoice
        </button>
      </div>

      {totals && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Invoiced', val: totals.invoiced, color: 'text-[#1a1a1a]' },
            { label: 'Total Paid', val: totals.paid, color: 'text-green-600' },
            { label: 'Outstanding', val: totals.outstanding, color: 'text-orange-600' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
              <div className={`text-2xl font-bold ${s.color}`}>${s.val.toLocaleString()}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {!invoices ? <div className="text-gray-400 text-sm">Loading…</div> : invoices.length === 0
        ? <div className="text-center py-16 text-gray-400">No invoices yet.</div>
        : <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wide">
                  <th className="text-left p-4">Client</th>
                  <th className="text-left p-4">Project</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Sent</th>
                  <th className="text-left p-4">Paid</th>
                  <th className="p-4" />
                </tr>
              </thead>
              <tbody>
                {invoices.map(inv => (
                  <tr key={inv._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-semibold text-[#1a1a1a]">{inv.clientName}</td>
                    <td className="p-4 text-gray-500">{inv.projectRef || '—'}</td>
                    <td className="p-4 font-bold text-green-600">${inv.amount.toLocaleString()}</td>
                    <td className="p-4"><Badge label={inv.status} /></td>
                    <td className="p-4 text-gray-400">{inv.dateSent || '—'}</td>
                    <td className="p-4 text-gray-400">{inv.datePaid || '—'}</td>
                    <td className="p-4">
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => setModal({ mode: 'edit', invoice: inv })} className="text-gray-400 hover:text-[#E8722A] transition-colors"><Icon name="edit" size={15} /></button>
                        <button onClick={() => del({ id: inv._id })} className="text-gray-400 hover:text-red-500 transition-colors"><Icon name="trash" size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      }

      {modal && (
        <Modal title={modal.mode === 'add' ? 'New Invoice' : 'Edit Invoice'} onClose={() => setModal(null)}>
          <InvoiceForm
            initial={modal.mode === 'add' ? emptyInvoice() : {
              clientName: modal.invoice.clientName, projectRef: modal.invoice.projectRef || '',
              amount: modal.invoice.amount, status: modal.invoice.status,
              dateSent: modal.invoice.dateSent || '', datePaid: modal.invoice.datePaid || '',
              notes: modal.invoice.notes || '',
            }}
            onSave={handleSave}
            onClose={() => setModal(null)}
          />
        </Modal>
      )}
    </div>
  )
}

// ─────────────────────────────────────────
// Content Planner
// ─────────────────────────────────────────
const PLATFORMS = ['instagram', 'facebook', 'tiktok', 'linkedin']
const CONTENT_STATUSES = ['draft', 'scheduled', 'posted']

function emptyPost() { return { platform: 'instagram', caption: '', imageUrl: '', scheduledDate: '', status: 'draft', notes: '' } }

function ContentForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial)
  const [selectedProject, setSelectedProject] = useState('')
  const [generating, setGenerating] = useState(false)
  const [imgPrompt, setImgPrompt] = useState('')
  const [generatedImg, setGeneratedImg] = useState('')
  const [imgLoading, setImgLoading] = useState(false)
  const projects = useQuery(api.admin.listAdminProjects)
  const generateCaption = useAction(api.admin.generateCaption)

  function f(field, val) { setForm(p => ({ ...p, [field]: val })) }

  function generateImage() {
    if (!imgPrompt.trim()) return
    setImgLoading(true)
    setGeneratedImg('')
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(imgPrompt)}?width=1080&height=1080&nologo=true&seed=${Date.now()}`
    setGeneratedImg(url)
  }

  async function handleGenerate() {
    const proj = projects?.find(p => p._id === selectedProject)
    if (!proj) return
    setGenerating(true)
    try {
      const caption = await generateCaption({
        platform: form.platform,
        businessName: proj.businessName,
        projectType: proj.projectType,
        notes: proj.notes,
      })
      f('caption', caption)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Platform">
          <select className={sel} value={form.platform} onChange={e => f('platform', e.target.value)}>
            {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </Field>
        <Field label="Status">
          <select className={sel} value={form.status} onChange={e => f('status', e.target.value)}>
            {CONTENT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
      </div>

      {/* AI Caption from Project */}
      <Field label="Generate Caption from Project">
        <div className="flex gap-2">
          <select className={`${sel} flex-1`} value={selectedProject} onChange={e => setSelectedProject(e.target.value)}>
            <option value="">— Pick a project —</option>
            {projects?.map(p => <option key={p._id} value={p._id}>{p.businessName}</option>)}
          </select>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={!selectedProject || generating}
            className="shrink-0 bg-[#E8722A] disabled:opacity-40 text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-[#d4651f] transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            {generating ? '...' : '✦ AI Write'}
          </button>
        </div>
      </Field>

      <Field label="Caption"><textarea className={`${inp} resize-none`} rows={4} value={form.caption} onChange={e => f('caption', e.target.value)} placeholder="Write your caption or generate above..." /></Field>

      {/* AI Image Generation */}
      <Field label="AI Image Generator">
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              className={`${inp} flex-1`}
              value={imgPrompt}
              onChange={e => setImgPrompt(e.target.value)}
              placeholder="Describe the image (e.g. 'modern website on laptop, professional')"
              onKeyDown={e => e.key === 'Enter' && generateImage()}
            />
            <button
              type="button"
              onClick={generateImage}
              disabled={!imgPrompt.trim() || imgLoading}
              className="shrink-0 bg-[#E8722A] disabled:opacity-40 text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-[#d4651f] transition-colors whitespace-nowrap"
            >
              {imgLoading ? '…' : '✦ Gen'}
            </button>
          </div>
          {generatedImg && (
            <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
              <img
                src={generatedImg}
                alt="AI Generated"
                className="w-full h-44 object-cover"
                onLoad={() => setImgLoading(false)}
                onError={() => setImgLoading(false)}
              />
              {imgLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <span className="text-gray-400 text-sm">Generating…</span>
                </div>
              )}
              <button
                onClick={() => f('imageUrl', generatedImg)}
                className="absolute bottom-2 right-2 bg-[#E8722A] text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[#d4651f] shadow"
              >
                Use Image
              </button>
            </div>
          )}
        </div>
      </Field>
      <Field label="Image URL"><input className={inp} value={form.imageUrl} onChange={e => f('imageUrl', e.target.value)} placeholder="https://… or generate above" /></Field>
      <Field label="Scheduled Date"><input className={inp} type="date" value={form.scheduledDate} onChange={e => f('scheduledDate', e.target.value)} /></Field>
      <Field label="Notes"><textarea className={`${inp} resize-none`} rows={2} value={form.notes} onChange={e => f('notes', e.target.value)} placeholder="Any notes..." /></Field>
      <div className="flex gap-3 pt-2">
        <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-50">Cancel</button>
        <button onClick={() => onSave(form)} className="flex-1 bg-[#E8722A] text-white font-bold py-2.5 rounded-xl text-sm hover:bg-[#d4651f]">Save Post</button>
      </div>
    </div>
  )
}

const PLATFORM_COLORS = { instagram: 'bg-pink-100 text-pink-600', facebook: 'bg-blue-100 text-blue-600', tiktok: 'bg-gray-900 text-white', linkedin: 'bg-blue-100 text-blue-800' }

function ContentPlanner() {
  const posts = useQuery(api.admin.listContent)
  const create = useMutation(api.admin.createContent)
  const update = useMutation(api.admin.updateContent)
  const del = useMutation(api.admin.deleteContent)
  const [modal, setModal] = useState(null)
  const [filter, setFilter] = useState('all')

  const filtered = posts?.filter(p => filter === 'all' || p.platform === filter) ?? []

  async function handleSave(form) {
    if (modal.mode === 'add') await create(form)
    else await update({ id: modal.post._id, ...form })
    setModal(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Content Planner</h1>
          <p className="text-gray-400 text-sm mt-1">Plan and track your social media posts.</p>
        </div>
        <button onClick={() => setModal({ mode: 'add' })} className="flex items-center gap-2 bg-[#E8722A] text-white font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-[#d4651f] transition-colors">
          <Icon name="plus" size={16} /> New Post
        </button>
      </div>

      {/* Platform filter */}
      <div className="flex flex-wrap gap-2">
        {['all', ...PLATFORMS].map(p => (
          <button key={p} onClick={() => setFilter(p)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${filter === p ? 'bg-[#E8722A] text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-[#E8722A]/40'}`}>
            {p}
          </button>
        ))}
      </div>

      {!posts ? <div className="text-gray-400 text-sm">Loading…</div> : filtered.length === 0
        ? <div className="text-center py-16 text-gray-400">No posts yet. Plan your first one.</div>
        : <div className="space-y-3">
            {filtered.map(post => (
              <div key={post._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-start gap-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${PLATFORM_COLORS[post.platform] || 'bg-gray-100 text-gray-600'}`}>{post.platform}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#1a1a1a] leading-relaxed line-clamp-2">{post.caption}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <Badge label={post.status} />
                      {post.scheduledDate && <span className="text-xs text-gray-400">{post.scheduledDate}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => setModal({ mode: 'edit', post })} className="text-gray-400 hover:text-[#E8722A] transition-colors"><Icon name="edit" size={15} /></button>
                    <button onClick={() => del({ id: post._id })} className="text-gray-400 hover:text-red-500 transition-colors"><Icon name="trash" size={15} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
      }

      {modal && (
        <Modal title={modal.mode === 'add' ? 'New Post' : 'Edit Post'} onClose={() => setModal(null)}>
          <ContentForm
            initial={modal.mode === 'add' ? emptyPost() : {
              platform: modal.post.platform, caption: modal.post.caption, imageUrl: modal.post.imageUrl || '',
              scheduledDate: modal.post.scheduledDate || '', status: modal.post.status, notes: modal.post.notes || '',
            }}
            onSave={handleSave}
            onClose={() => setModal(null)}
          />
        </Modal>
      )}
    </div>
  )
}

// ─────────────────────────────────────────
// Rody Brain tab
// ─────────────────────────────────────────
const SLIDER_DEFS = [
  { key: 'humor',              label: 'Humor',              lo: 'serious',           hi: 'always finding the joke' },
  { key: 'energy',             label: 'Energy',             lo: 'low key / chill',   hi: 'high energy / hype' },
  { key: 'bluntness',          label: 'Bluntness',          lo: 'diplomatic',        hi: 'brutally direct' },
  { key: 'sarcasm',            label: 'Sarcasm',            lo: 'sincere',           hi: 'dripping sarcasm' },
  { key: 'cussing',            label: 'Cussing',            lo: 'keeps it clean',    hi: 'swears freely' },
  { key: 'conspiracy',         label: 'Conspiracies',       lo: 'not into it',       hi: 'deep rabbit hole' },
  { key: 'empathy',            label: 'Empathy',            lo: 'tough love only',   hi: 'very understanding' },
  { key: 'confidence',         label: 'Confidence',         lo: 'humble / measured', hi: 'extremely confident' },
  { key: 'roast',              label: 'Roast Level',        lo: 'never roasts',      hi: 'roasts constantly' },
  { key: 'depth',              label: 'Depth / Analysis',   lo: 'surface level',     hi: 'goes super deep' },
  { key: 'political_intensity',label: 'Political Intensity',lo: 'stays out of it',   hi: 'talks politics openly' },
]

const POLITICAL_STANCES = [
  'apolitical', 'libertarian', 'conservative', 'moderate',
  'liberal', 'populist', 'anti-establishment', 'nationalist',
]

const CHECKBOX_TRAITS = [
  { key: 'hype_man',              emoji: '🔥', label: 'Hype Man',              desc: 'Goes hard on encouragement, hypes up your wins' },
  { key: 'accountability',        emoji: '👊', label: 'Accountability',        desc: 'Calls you out when you\'re slacking or making excuses' },
  { key: 'devil_advocate',        emoji: '🎭', label: 'Devil\'s Advocate',     desc: 'Challenges your ideas to make them stronger' },
  { key: 'business_coach',        emoji: '📈', label: 'Business Coach',        desc: 'Everything through a business growth and strategy lens' },
  { key: 'sports_bro',            emoji: '🏈', label: 'Sports Bro',            desc: 'Brings sports into conversation, loves competition angles' },
  { key: 'deep_thinker',          emoji: '🧠', label: 'Deep Thinker',          desc: 'Goes philosophical, connects big ideas' },
  { key: 'money_focused',         emoji: '💰', label: 'Money Focused',         desc: 'Always thinking about ROI, revenue, financial angles' },
  { key: 'goal_setter',           emoji: '🎯', label: 'Goal Setter',           desc: 'Ties conversations back to your goals regularly' },
  { key: 'no_bs',                 emoji: '😤', label: 'No BS Mode',            desc: 'Zero fluff, brutally straight to the point, always' },
  { key: 'night_owl',             emoji: '🌙', label: 'Night Owl',             desc: 'Late night chill energy, more reflective and loose' },
  { key: 'conspiracy_unprompted', emoji: '🔍', label: 'Conspiracy Unprompted', desc: 'Brings up conspiracy topics even when not asked' },
  { key: 'mentor_mode',           emoji: '🎓', label: 'Mentor Mode',           desc: 'Teaches and shares wisdom proactively' },
  { key: 'competitive',           emoji: '🏆', label: 'Competitive Spirit',    desc: '"Us vs them" energy, motivated by winning' },
  { key: 'roast_mode',            emoji: '😂', label: 'Roast Mode',            desc: 'Light roasting is basically the love language' },
  { key: 'project_focus',         emoji: '🏗️', label: 'Project Focus',         desc: 'Actively helps with OC Builds work and client stuff' },
]

const DEFAULT_TRAITS = {
  humor: 7, energy: 7, bluntness: 7, sarcasm: 6, cussing: 5, conspiracy: 8,
  empathy: 6, confidence: 8, roast: 5, depth: 6, political_intensity: 6,
  political_stance: 'anti-establishment',
  hype_man: false, accountability: true, devil_advocate: false,
  business_coach: true, sports_bro: true, deep_thinker: false,
  money_focused: true, goal_setter: false, no_bs: false,
  night_owl: false, conspiracy_unprompted: false, mentor_mode: false,
  competitive: true, roast_mode: false, project_focus: true,
}

function BrainTab({ brain }) {
  const setTraits    = useMutation(api.admin.setRodyTraits)
  const setNotesMut  = useMutation(api.admin.setRodyNotes)
  const addBullet    = useMutation(api.admin.addToMemory)
  const clearBrain   = useMutation(api.admin.clearRodyBrain)

  const [traits, setTraitsLocal] = useState(DEFAULT_TRAITS)
  const [notes, setNotesLocal]   = useState('')
  const [newBullet, setNewBullet] = useState('')
  const [confirmWipe, setConfirmWipe] = useState(false)
  const [saved, setSaved]        = useState(false)
  const [subTab, setSubTab]      = useState('personality')

  useEffect(() => {
    if (brain?.traits) {
      try { setTraitsLocal({ ...DEFAULT_TRAITS, ...JSON.parse(brain.traits) }) } catch { /* defaults */ }
    }
    if (brain?.customNotes !== undefined) setNotesLocal(brain.customNotes)
  }, [brain])

  async function saveAll() {
    await Promise.all([setTraits({ traits: JSON.stringify(traits) }), setNotesMut({ notes })])
    setSaved(true); setTimeout(() => setSaved(false), 2000)
  }

  async function handleAddBullet() {
    if (!newBullet.trim()) return
    await addBullet({ bullet: newBullet.trim() })
    setNewBullet('')
  }

  const memBullets = brain?.memory ? brain.memory.split('\n').filter(l => l.trim()) : []
  let summaries = []; try { summaries = JSON.parse(brain?.summaries || '[]') } catch {}

  const SUB_TABS = [{ key: 'personality', label: '🎛️ Personality' }, { key: 'memory', label: '📋 Memory' }, { key: 'notes', label: '💡 Notes' }]

  return (
    <div className="flex-1 overflow-y-auto space-y-4 pb-4">
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {SUB_TABS.map(t => (
          <button key={t.key} onClick={() => setSubTab(t.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${subTab === t.key ? 'bg-white text-[#1a1a1a] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {subTab === 'personality' && (
        <div className="space-y-4">
          {/* Sliders */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-bold text-[#1a1a1a] text-sm">Personality Dials</p>
              <p className="text-xs text-gray-400">drag to tune · naturally drifts over time</p>
            </div>
            {SLIDER_DEFS.map(t => (
              <div key={t.key}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-gray-700">{t.label}</span>
                  <span className="text-xs text-gray-400">{t.lo} → {t.hi} · <span className="font-bold text-[#E8722A]">{traits[t.key] ?? 5}/10</span></span>
                </div>
                <input
                  type="range" min="0" max="10" step="1"
                  value={traits[t.key] ?? 5}
                  onChange={e => setTraitsLocal(p => ({ ...p, [t.key]: Number(e.target.value) }))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{ accentColor: '#E8722A' }}
                />
              </div>
            ))}
          </div>

          {/* Politics */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="font-bold text-[#1a1a1a] text-sm mb-3">🏛️ Political Stance</p>
            <div className="flex flex-wrap gap-2">
              {POLITICAL_STANCES.map(stance => (
                <button
                  key={stance}
                  onClick={() => setTraitsLocal(p => ({ ...p, political_stance: stance }))}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors capitalize ${
                    traits.political_stance === stance
                      ? 'bg-[#E8722A] text-white border-[#E8722A]'
                      : 'bg-white border-gray-200 text-gray-500 hover:border-[#E8722A]/50'
                  }`}
                >
                  {stance}
                </button>
              ))}
            </div>
          </div>

          {/* Trait toggles */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="font-bold text-[#1a1a1a] text-sm mb-3">Personality Modes</p>
            <div className="grid grid-cols-1 gap-2">
              {CHECKBOX_TRAITS.map(t => (
                <label key={t.key} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-all ${
                  traits[t.key] ? 'bg-[#E8722A]/5 border-[#E8722A]/30' : 'border-gray-100 hover:bg-gray-50'
                }`}>
                  <input
                    type="checkbox"
                    checked={Boolean(traits[t.key])}
                    onChange={e => setTraitsLocal(p => ({ ...p, [t.key]: e.target.checked }))}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-colors ${
                    traits[t.key] ? 'bg-[#E8722A] border-[#E8722A]' : 'border-gray-300'
                  }`}>
                    {traits[t.key] && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                  <span className="text-base leading-none">{t.emoji}</span>
                  <div className="min-w-0">
                    <div className={`text-xs font-bold ${traits[t.key] ? 'text-[#E8722A]' : 'text-gray-700'}`}>{t.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{t.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Auto-evolved headspace */}
          <div className="bg-[#1a1a1a] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span>🧠</span>
              <span className="text-white font-bold text-sm">Current Headspace</span>
              <span className="ml-auto text-white/30 text-xs">auto-evolves</span>
            </div>
            {brain?.personality
              ? <p className="text-white/75 text-sm leading-relaxed">{brain.personality}</p>
              : <p className="text-white/30 text-sm italic">nothing yet — start talking to him</p>}
          </div>

          <button onClick={saveAll} className={`w-full font-bold py-2.5 rounded-xl text-sm transition-colors ${saved ? 'bg-green-500 text-white' : 'bg-[#E8722A] hover:bg-[#d4651f] text-white'}`}>
            {saved ? '✓ Saved' : 'Save Personality'}
          </button>

          <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
            <p className="text-xs text-red-500 font-semibold mb-1">Danger Zone</p>
            <p className="text-xs text-gray-400 mb-3">Wipes memory, headspace + summaries. Traits and notes stay. Can't undo.</p>
            {confirmWipe
              ? <div className="flex gap-2">
                  <button onClick={() => { clearBrain(); setConfirmWipe(false) }} className="flex-1 bg-red-500 text-white text-xs font-bold py-2 rounded-xl hover:bg-red-600">Wipe it</button>
                  <button onClick={() => setConfirmWipe(false)} className="flex-1 border border-gray-200 text-gray-500 text-xs font-bold py-2 rounded-xl">Cancel</button>
                </div>
              : <button onClick={() => setConfirmWipe(true)} className="text-xs text-red-500 font-bold hover:underline">Wipe Rody's Brain →</button>}
          </div>
        </div>
      )}

      {subTab === 'memory' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="font-bold text-[#1a1a1a] text-sm mb-3">Add a Memory</p>
            <div className="flex gap-2">
              <input
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#E8722A]/50"
                placeholder="e.g. my sister's name is Maggie"
                value={newBullet}
                onChange={e => setNewBullet(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddBullet()}
              />
              <button onClick={handleAddBullet} disabled={!newBullet.trim()} className="bg-[#E8722A] disabled:opacity-40 text-white text-xs font-bold px-3 rounded-xl hover:bg-[#d4651f]">Add</button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-[#1a1a1a] text-sm">Stored Facts</p>
              <span className="text-xs text-gray-400">{memBullets.length} bullets</span>
            </div>
            {memBullets.length > 0
              ? <ul className="space-y-1.5">{memBullets.map((b, i) => <li key={i} className="text-sm text-gray-600 leading-relaxed">{b}</li>)}</ul>
              : <p className="text-gray-400 text-sm italic">nothing stored yet</p>}
          </div>

          {summaries.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="font-bold text-[#1a1a1a] text-sm mb-3">Past Conversation Summaries</p>
              <div className="space-y-3">
                {summaries.map((s, i) => (
                  <div key={i} className="border-l-2 border-[#E8722A]/40 pl-3">
                    <p className="text-xs text-gray-400 mb-0.5">{s.date}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {subTab === 'notes' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="font-bold text-[#1a1a1a] text-sm mb-1">Direct Instructions for Rody</p>
            <p className="text-xs text-gray-400 mb-3">Gets injected into his head every single message. Personality rules, goals, reminders — anything.</p>
            <textarea
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#E8722A]/50 resize-none"
              rows={9}
              placeholder={'examples:\n- always ask how football practice went\n- my goal is $5k/month by July\n- remind me Fridays to follow up with leads\n- call me out when i\'m procrastinating'}
              value={notes}
              onChange={e => setNotesLocal(e.target.value)}
            />
          </div>
          <button onClick={saveAll} className={`w-full font-bold py-2.5 rounded-xl text-sm transition-colors ${saved ? 'bg-green-500 text-white' : 'bg-[#E8722A] hover:bg-[#d4651f] text-white'}`}>
            {saved ? '✓ Saved' : 'Save Notes'}
          </button>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────
// AI Chat
// ─────────────────────────────────────────
function AIChat() {
  const messages = useQuery(api.admin.listChats)
  const brain    = useQuery(api.admin.getRodyBrain)
  const saveChat = useMutation(api.admin.saveChat)
  const summarizeAndClear = useAction(api.admin.summarizeAndClearChat)
  const sendMessage = useAction(api.admin.sendChatMessage)

  const [input, setInput]   = useState('')
  const [loading, setLoading] = useState(false)
  const [clearing, setClearing] = useState(false)
  const [tab, setTab]         = useState('chat')
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setInput(''); setLoading(true)
    await saveChat({ role: 'user', content: text })
    try {
      const history = [...(messages ?? []), { role: 'user', content: text }].map(m => ({ role: m.role, content: m.content }))
      const reply = await sendMessage({ messages: history })
      await saveChat({ role: 'assistant', content: reply })
    } catch {
      await saveChat({ role: 'assistant', content: "nah something broke on my end lol try again" })
    } finally { setLoading(false) }
  }

  async function handleClear() {
    setClearing(true)
    try { await summarizeAndClear() } finally { setClearing(false) }
  }

  return (
    <div className="flex flex-col h-full" style={{ height: 'calc(100vh - 120px)' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#1a1a1a] flex items-center justify-center text-lg shrink-0">🤙</div>
          <div>
            <h1 className="text-xl font-bold text-[#1a1a1a] leading-none">Rodrick <span className="text-gray-400 font-normal text-base">/ Rody</span></h1>
            <p className="text-xs text-gray-400 mt-0.5">{brain?.personality ? brain.personality.split('.')[0].trim().slice(0, 65) + '…' : 'your guy. ask him anything.'}</p>
          </div>
        </div>
        <button onClick={handleClear} disabled={clearing || !messages?.length}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#E8722A] disabled:opacity-40 font-semibold transition-colors border border-gray-200 px-2.5 py-1.5 rounded-lg">
          <Icon name="refresh" size={12} /> {clearing ? 'Saving…' : 'Clear Chat'}
        </button>
      </div>

      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit mb-3">
        {[{ key: 'chat', label: '💬 Chat' }, { key: 'brain', label: '🧠 Brain' }].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${tab === t.key ? 'bg-white text-[#1a1a1a] shadow-sm' : 'text-gray-500'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'chat' && (
        <>
          <div className="flex-1 overflow-y-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-2 mb-3">
            {!messages || messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-12">
                <div className="text-4xl mb-3">🤙</div>
                <p className="font-bold text-[#1a1a1a] mb-1">what's good</p>
                <p className="text-sm max-w-xs text-gray-400">hit me with whatever — business, sports, ideas, random shit. i'm here.</p>
              </div>
            ) : messages.map(m => (
              <div key={m._id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === 'user' ? 'bg-[#E8722A] text-white rounded-br-sm font-medium' : 'bg-[#f0f0f0] text-[#1a1a1a] rounded-bl-sm'
                }`}>{m.content}</div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#f0f0f0] px-3.5 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
              placeholder="say something..." disabled={loading}
              className="flex-1 bg-white border border-gray-200 rounded-2xl px-4 py-2.5 text-sm outline-none focus:border-[#E8722A]/50 transition-colors" />
            <button onClick={send} disabled={loading || !input.trim()} className="bg-[#E8722A] hover:bg-[#d4651f] disabled:opacity-40 text-white px-4 py-2.5 rounded-2xl transition-colors">
              <Icon name="send" size={16} />
            </button>
          </div>
        </>
      )}

      {tab === 'brain' && <BrainTab brain={brain} />}
    </div>
  )
}

// ─────────────────────────────────────────
// Settings
// ─────────────────────────────────────────
function Settings({ onLogout }) {
  const setSetting = useMutation(api.admin.setSetting)
  const allSettings = useQuery(api.admin.listSettings)

  function getVal(key) {
    return allSettings?.find(s => s.key === key)?.value ?? ''
  }

  const [bizName, setBizName] = useState('')
  const [bizEmail, setBizEmail] = useState('')
  const [bizPhone, setBizPhone] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (allSettings) {
      setBizName(getVal('biz_name') || 'OC Builds')
      setBizEmail(getVal('biz_email') || '')
      setBizPhone(getVal('biz_phone') || '')
    }
  }, [allSettings])

  async function saveSettings() {
    await setSetting({ key: 'biz_name', value: bizName })
    await setSetting({ key: 'biz_email', value: bizEmail })
    await setSetting({ key: 'biz_phone', value: bizPhone })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-8 max-w-lg">
      <div>
        <h1 className="text-2xl font-bold text-[#1a1a1a]">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Business info and dashboard config.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h2 className="font-bold text-[#1a1a1a]">Business Info</h2>
        <Field label="Business Name"><input className={inp} value={bizName} onChange={e => setBizName(e.target.value)} /></Field>
        <Field label="Email"><input className={inp} value={bizEmail} onChange={e => setBizEmail(e.target.value)} /></Field>
        <Field label="Phone"><input className={inp} value={bizPhone} onChange={e => setBizPhone(e.target.value)} /></Field>
        <button onClick={saveSettings} className={`w-full font-bold py-2.5 rounded-xl text-sm transition-colors ${saved ? 'bg-green-500 text-white' : 'bg-[#E8722A] hover:bg-[#d4651f] text-white'}`}>
          {saved ? '✓ Saved' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-bold text-[#1a1a1a] mb-2">Admin Password</h2>
        <p className="text-sm text-gray-400 mb-4">To change your password, update the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">VITE_ADMIN_PASSWORD</code> environment variable in Vercel and redeploy.</p>
        <div className="bg-gray-50 rounded-xl p-4 font-mono text-xs text-gray-500">
          VITE_ADMIN_PASSWORD=your_new_password
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-bold text-[#1a1a1a] mb-2">Session</h2>
        <button onClick={onLogout} className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-600 transition-colors">
          <Icon name="logout" size={16} /> Log Out of Dashboard
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// Mini Golf Game
// ─────────────────────────────────────────
const HOLES = [
  { par: 2, tee: [50, 130], cup: [390, 130], walls: [] },
  { par: 3, tee: [50, 80],  cup: [390, 200], walls: [{ x: 160, y: 90,  w: 18, h: 120 }] },
  { par: 3, tee: [50, 130], cup: [390, 50],  walls: [{ x: 120, y: 50,  w: 200, h: 18 }] },
  { par: 2, tee: [50, 50],  cup: [390, 210], walls: [{ x: 200, y: 50,  w: 18, h: 140 }] },
  { par: 3, tee: [220, 230],cup: [390, 50],  walls: [{ x: 100, y: 100, w: 140, h: 18 }, { x: 280, y: 120, w: 18, h: 110 }] },
  { par: 4, tee: [50, 50],  cup: [390, 210], walls: [{ x: 150, y: 50,  w: 18, h: 100 }, { x: 260, y: 110, w: 18, h: 100 }] },
  { par: 3, tee: [50, 130], cup: [390, 130], walls: [{ x: 150, y: 60,  w: 18, h: 90 },  { x: 270, y: 110, w: 18, h: 90 }] },
  { par: 2, tee: [50, 200], cup: [390, 60],  walls: [{ x: 180, y: 100, w: 120, h: 18 }] },
  { par: 4, tee: [50, 130], cup: [390, 130], walls: [{ x: 140, y: 50,  w: 18, h: 80 },  { x: 240, y: 130, w: 18, h: 80 }, { x: 320, y: 50,  w: 18, h: 80 }] },
]

function GolfGame({ onClose }) {
  const canvasRef = useRef(null)
  const g = useRef({
    hole: 0,
    strokes: Array(9).fill(0),
    state: 'aiming',
    ball: { x: 50, y: 130, vx: 0, vy: 0 },
    dragging: false,
    aim: null,
    frameId: null,
  })
  const [display, setDisplay] = useState({ hole: 0, strokes: Array(9).fill(0), state: 'aiming', showScore: false })

  function initHole(idx) {
    const h = HOLES[idx]
    const gc = g.current
    gc.hole = idx
    gc.state = 'aiming'
    gc.ball = { x: h.tee[0], y: h.tee[1], vx: 0, vy: 0 }
    gc.dragging = false
    gc.aim = null
    setDisplay(d => ({ ...d, hole: idx, state: 'aiming', showScore: false }))
  }

  function draw() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width, H = canvas.height
    const gc = g.current
    const h = HOLES[gc.hole]

    ctx.fillStyle = '#2d6a4f'
    ctx.fillRect(0, 0, W, H)
    ctx.fillStyle = '#40916c'
    ctx.fillRect(10, 10, W - 20, H - 20)

    ctx.fillStyle = '#1b4332'
    for (const w of h.walls) ctx.fillRect(w.x, w.y, w.w, w.h)

    // Cup
    ctx.beginPath(); ctx.arc(h.cup[0], h.cup[1], 11, 0, Math.PI * 2)
    ctx.fillStyle = '#0a2010'; ctx.fill()
    ctx.beginPath(); ctx.arc(h.cup[0], h.cup[1], 9, 0, Math.PI * 2)
    ctx.fillStyle = '#111'; ctx.fill()
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(h.cup[0], h.cup[1]); ctx.lineTo(h.cup[0], h.cup[1] - 24); ctx.stroke()
    ctx.fillStyle = '#E8722A'
    ctx.beginPath(); ctx.moveTo(h.cup[0], h.cup[1] - 24); ctx.lineTo(h.cup[0] + 14, h.cup[1] - 18); ctx.lineTo(h.cup[0], h.cup[1] - 12); ctx.fill()

    // Aim line
    if (gc.dragging && gc.aim) {
      const dx = gc.ball.x - gc.aim.x, dy = gc.ball.y - gc.aim.y
      const power = Math.min(Math.hypot(dx, dy) / 80, 1)
      ctx.save()
      ctx.setLineDash([4, 4])
      ctx.strokeStyle = `rgba(255,255,255,${0.3 + power * 0.5})`
      ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.moveTo(gc.ball.x, gc.ball.y); ctx.lineTo(gc.ball.x + dx * 1.5, gc.ball.y + dy * 1.5); ctx.stroke()
      ctx.restore()
      ctx.beginPath(); ctx.arc(gc.ball.x, gc.ball.y, 8 + power * 8, 0, Math.PI * 2)
      ctx.strokeStyle = power > 0.7 ? '#ff6b6b' : '#ffd166'; ctx.lineWidth = 2; ctx.stroke()
    }

    // Ball shadow
    ctx.beginPath(); ctx.arc(gc.ball.x + 2, gc.ball.y + 2, 8, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fill()
    // Ball
    const grad = ctx.createRadialGradient(gc.ball.x - 2, gc.ball.y - 2, 1, gc.ball.x, gc.ball.y, 8)
    grad.addColorStop(0, '#fff'); grad.addColorStop(1, '#ccc')
    ctx.beginPath(); ctx.arc(gc.ball.x, gc.ball.y, 8, 0, Math.PI * 2)
    ctx.fillStyle = grad; ctx.fill()

    // HUD
    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    ctx.fillRect(W - 130, 10, 120, 30)
    ctx.fillStyle = '#fff'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'right'
    ctx.fillText(`Hole ${gc.hole + 1}/9  Par ${h.par}`, W - 14, 30)
    ctx.fillRect(10, 10, 90, 30)
    ctx.textAlign = 'left'; ctx.fillStyle = '#fff'
    ctx.fillText(`Strokes: ${gc.strokes[gc.hole] || 0}`, 16, 30)
  }

  function update() {
    const gc = g.current
    if (gc.state !== 'rolling') return
    const b = gc.ball
    b.x += b.vx; b.y += b.vy
    b.vx *= 0.984; b.vy *= 0.984
    const W = 440, H = 260, R = 8
    if (b.x < 10 + R) { b.x = 10 + R; b.vx = Math.abs(b.vx) * 0.7 }
    if (b.x > W - 10 - R) { b.x = W - 10 - R; b.vx = -Math.abs(b.vx) * 0.7 }
    if (b.y < 10 + R) { b.y = 10 + R; b.vy = Math.abs(b.vy) * 0.7 }
    if (b.y > H - 10 - R) { b.y = H - 10 - R; b.vy = -Math.abs(b.vy) * 0.7 }
    for (const w of HOLES[gc.hole].walls) {
      if (b.x + R > w.x && b.x - R < w.x + w.w && b.y + R > w.y && b.y - R < w.y + w.h) {
        const oL = (b.x + R) - w.x, oR = (w.x + w.w) - (b.x - R)
        const oT = (b.y + R) - w.y, oB = (w.y + w.h) - (b.y - R)
        const m = Math.min(oL, oR, oT, oB)
        if (m === oL) { b.x -= oL; b.vx = -Math.abs(b.vx) * 0.7 }
        else if (m === oR) { b.x += oR; b.vx = Math.abs(b.vx) * 0.7 }
        else if (m === oT) { b.y -= oT; b.vy = -Math.abs(b.vy) * 0.7 }
        else { b.y += oB; b.vy = Math.abs(b.vy) * 0.7 }
      }
    }
    const cup = HOLES[gc.hole].cup
    if (Math.hypot(b.x - cup[0], b.y - cup[1]) < 12) {
      gc.state = 'holed'; b.vx = 0; b.vy = 0; b.x = cup[0]; b.y = cup[1]
      setDisplay(d => ({ ...d, state: 'holed', strokes: [...gc.strokes] }))
      return
    }
    if (Math.hypot(b.vx, b.vy) < 0.08) {
      gc.state = 'aiming'; b.vx = 0; b.vy = 0
      setDisplay(d => ({ ...d, state: 'aiming' }))
    }
  }

  useEffect(() => {
    initHole(0)
    function loop() { update(); draw(); g.current.frameId = requestAnimationFrame(loop) }
    g.current.frameId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(g.current.frameId)
  }, [])

  function getPos(e) {
    const r = canvasRef.current.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }
  function onMouseDown(e) {
    const gc = g.current
    if (gc.state !== 'aiming') return
    const pos = getPos(e)
    if (Math.hypot(pos.x - gc.ball.x, pos.y - gc.ball.y) < 24) {
      gc.dragging = true; gc.aim = pos
    }
  }
  function onMouseMove(e) { if (g.current.dragging) g.current.aim = getPos(e) }
  function onMouseUp(e) {
    const gc = g.current
    if (!gc.dragging) return
    gc.dragging = false
    const pos = getPos(e)
    const dx = gc.ball.x - pos.x, dy = gc.ball.y - pos.y
    const power = Math.min(Math.hypot(dx, dy) / 80, 1)
    if (power < 0.05) { gc.aim = null; return }
    gc.ball.vx = dx * power * 0.18; gc.ball.vy = dy * power * 0.18
    gc.strokes[gc.hole]++
    gc.state = 'rolling'; gc.aim = null
    setDisplay(d => ({ ...d, state: 'rolling', strokes: [...gc.strokes] }))
  }

  function nextHole() {
    const gc = g.current
    if (gc.hole >= 8) {
      const board = JSON.parse(localStorage.getItem('golf_board') || '[]')
      const total = gc.strokes.reduce((a, b) => a + b, 0)
      board.push({ score: total, date: new Date().toLocaleDateString() })
      board.sort((a, b) => a.score - b.score)
      localStorage.setItem('golf_board', JSON.stringify(board.slice(0, 5)))
      gc.state = 'done'
      setDisplay(d => ({ ...d, state: 'done', showScore: true, strokes: [...gc.strokes] }))
    } else {
      initHole(gc.hole + 1)
    }
  }

  function restartGame() {
    g.current.strokes = Array(9).fill(0)
    initHole(0)
    setDisplay({ hole: 0, strokes: Array(9).fill(0), state: 'aiming', showScore: false })
  }

  const totalStrokes = display.strokes.reduce((a, b) => a + b, 0)
  const totalPar = HOLES.reduce((a, h) => a + h.par, 0)
  const score = totalStrokes - totalPar

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1a2f23] rounded-2xl shadow-2xl overflow-hidden" style={{ width: 460 }}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-lg">⛳</span>
            <span className="text-white font-bold text-sm">Mini Golf</span>
            <span className="text-white/40 text-xs ml-2">Hole {display.hole + 1}/9 · Par {HOLES[display.hole].par}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/50 text-xs font-mono">Strokes: {display.strokes[display.hole] || 0}</span>
            <button onClick={onClose} className="text-white/40 hover:text-white/80 transition-colors"><Icon name="x" size={16} /></button>
          </div>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            width={440}
            height={260}
            className="block cursor-crosshair"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          />

          {display.state === 'holed' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/55">
              <div className="text-white font-bold text-2xl mb-1">
                {(() => {
                  const diff = display.strokes[display.hole] - HOLES[display.hole].par
                  if (diff <= -2) return '🦅 Eagle!'
                  if (diff === -1) return '🐦 Birdie!'
                  if (diff === 0) return '✓ Par'
                  if (diff === 1) return 'Bogey'
                  return `+${diff} Over`
                })()}
              </div>
              <div className="text-white/60 text-sm mb-4">{display.strokes[display.hole]} stroke{display.strokes[display.hole] !== 1 ? 's' : ''}</div>
              <button onClick={nextHole} className="bg-[#E8722A] text-white font-bold px-6 py-2 rounded-xl text-sm hover:bg-[#d4651f]">
                {display.hole >= 8 ? 'See Scorecard' : 'Next Hole →'}
              </button>
            </div>
          )}

          {display.showScore && (
            <div className="absolute inset-0 bg-[#1a2f23] flex flex-col items-center justify-center p-5">
              <div className="text-white font-bold text-xl mb-4">⛳ Scorecard</div>
              <div className="w-full bg-black/20 rounded-xl p-3 mb-4 text-xs">
                <div className="grid grid-cols-3 text-white/50 font-bold mb-2 uppercase tracking-wide">
                  <span>Hole</span><span className="text-center">Par</span><span className="text-right">Score</span>
                </div>
                {HOLES.map((h, i) => (
                  <div key={i} className="grid grid-cols-3 text-white py-0.5">
                    <span>{i + 1}</span>
                    <span className="text-center text-white/50">{h.par}</span>
                    <span className={`text-right font-bold ${display.strokes[i] - h.par < 0 ? 'text-green-400' : display.strokes[i] - h.par > 0 ? 'text-red-400' : 'text-white/60'}`}>
                      {display.strokes[i]}{display.strokes[i] - h.par !== 0 ? ` (${display.strokes[i] - h.par > 0 ? '+' : ''}${display.strokes[i] - h.par})` : ''}
                    </span>
                  </div>
                ))}
                <div className="border-t border-white/20 mt-2 pt-2 grid grid-cols-3 text-white font-bold">
                  <span>Total</span>
                  <span className="text-center text-white/50">{totalPar}</span>
                  <span className={`text-right ${score < 0 ? 'text-green-400' : score > 0 ? 'text-red-400' : 'text-white'}`}>
                    {totalStrokes} ({score > 0 ? '+' : ''}{score})
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={restartGame} className="bg-[#E8722A] text-white font-bold px-5 py-2 rounded-xl text-sm hover:bg-[#d4651f]">Play Again</button>
                <button onClick={onClose} className="border border-white/20 text-white/60 font-bold px-5 py-2 rounded-xl text-sm hover:text-white">Close</button>
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-white/30 text-xs py-2 border-t border-white/10">
          {display.state === 'aiming' && 'Drag from the ball — pull back to set power'}
          {display.state === 'rolling' && 'Ball in motion…'}
          {display.state === 'holed' && ' '}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// Sidebar + Layout
// ─────────────────────────────────────────
const NAV = [
  { key: 'overview', label: 'Overview', icon: 'home' },
  { key: 'projects', label: 'Projects', icon: 'folder' },
  { key: 'leads', label: 'Leads', icon: 'inbox' },
  { key: 'portfolio', label: 'Portfolio', icon: 'image' },
  { key: 'invoices', label: 'Invoices', icon: 'dollar' },
  { key: 'content', label: 'Content', icon: 'calendar' },
  { key: 'chat', label: 'AI Chat', icon: 'message' },
  { key: 'settings', label: 'Settings', icon: 'settings' },
]

function AdminLayout({ onLogout }) {
  const [section, setSection] = useState('overview')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [golfOpen, setGolfOpen] = useState(false)

  function nav(key) { setSection(key); setMobileOpen(false) }

  const sections = {
    overview: <Overview setSection={nav} />,
    projects: <Projects />,
    leads: <Leads />,
    portfolio: <PortfolioManager />,
    invoices: <Invoices />,
    content: <ContentPlanner />,
    chat: <AIChat />,
    settings: <Settings onLogout={onLogout} />,
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#1a1a1a]/5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#E8722A] rounded-xl flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
          </div>
          <div>
            <div className="font-bold text-[#1a1a1a] text-sm leading-none">OC Builds</div>
            <div className="text-[10px] text-gray-400 font-medium mt-0.5">Admin Dashboard</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(item => (
          <button
            key={item.key}
            onClick={() => nav(item.key)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              section === item.key
                ? 'bg-[#E8722A] text-white shadow-sm'
                : 'text-gray-500 hover:bg-gray-100 hover:text-[#1a1a1a]'
            }`}
          >
            <Icon name={item.icon} size={17} />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-[#1a1a1a]/5">
        <button onClick={onLogout} className="flex items-center gap-2 text-xs text-gray-400 hover:text-red-500 font-semibold transition-colors">
          <Icon name="logout" size={14} /> Log out
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F5EDD8] flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-white border-r border-gray-100 fixed inset-y-0 left-0 shadow-sm z-10">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-56 bg-white h-full shadow-2xl flex flex-col">
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 md:ml-56">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 bg-white border-b border-gray-100 px-4 py-3 sticky top-0 z-10">
          <button onClick={() => setMobileOpen(true)} className="text-gray-500">
            <Icon name="menu" size={22} />
          </button>
          <span className="font-bold text-[#1a1a1a] text-sm">OC Builds Admin</span>
        </div>

        <main className="p-5 md:p-8 max-w-6xl">
          {sections[section]}
        </main>
      </div>

      {/* Mini Golf toggle */}
      <button
        onClick={() => setGolfOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#2d6a4f] hover:bg-[#1b4332] text-white rounded-full shadow-lg flex items-center justify-center text-xl z-40 transition-colors"
        title="Mini Golf"
      >
        ⛳
      </button>
      {golfOpen && <GolfGame onClose={() => setGolfOpen(false)} />}
    </div>
  )
}

// ─────────────────────────────────────────
// Root export
// ─────────────────────────────────────────
export default function Admin() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('oc_admin') === '1')

  function logout() {
    sessionStorage.removeItem('oc_admin')
    setUnlocked(false)
  }

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />
  return <AdminLayout onLogout={logout} />
}
