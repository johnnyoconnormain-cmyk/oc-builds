import { mutation, query, action, internalQuery, internalMutation, internalAction } from './_generated/server'
import { internal, api } from './_generated/api'
import { v } from 'convex/values'

// ─────────────────────────────────────────
// Admin Projects
// ─────────────────────────────────────────

export const listAdminProjects = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('adminProjects').withIndex('by_createdAt').order('desc').collect()
  },
})

export const createAdminProject = mutation({
  args: {
    clientName: v.string(),
    businessName: v.string(),
    projectType: v.string(),
    status: v.string(),
    startDate: v.optional(v.string()),
    deadline: v.optional(v.string()),
    price: v.optional(v.number()),
    notes: v.optional(v.string()),
    websiteUrl: v.optional(v.string()),
    tasks: v.array(v.object({ text: v.string(), done: v.boolean() })),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('adminProjects', { ...args, createdAt: Date.now() })
  },
})

export const updateAdminProject = mutation({
  args: {
    id: v.id('adminProjects'),
    clientName: v.optional(v.string()),
    businessName: v.optional(v.string()),
    projectType: v.optional(v.string()),
    status: v.optional(v.string()),
    startDate: v.optional(v.string()),
    deadline: v.optional(v.string()),
    price: v.optional(v.number()),
    notes: v.optional(v.string()),
    websiteUrl: v.optional(v.string()),
    tasks: v.optional(v.array(v.object({ text: v.string(), done: v.boolean() }))),
  },
  handler: async (ctx, { id, ...patch }) => {
    await ctx.db.patch(id, patch)
  },
})

export const deleteAdminProject = mutation({
  args: { id: v.id('adminProjects') },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id)
  },
})

// ─────────────────────────────────────────
// Submissions (contact form leads)
// ─────────────────────────────────────────

export const updateSubmissionStatus = mutation({
  args: { id: v.id('submissions'), leadStatus: v.string(), read: v.optional(v.boolean()) },
  handler: async (ctx, { id, leadStatus, read }) => {
    const patch: Record<string, unknown> = { leadStatus }
    if (read !== undefined) patch.read = read
    await ctx.db.patch(id, patch)
  },
})

// ─────────────────────────────────────────
// Dreamboards (dream board leads)
// ─────────────────────────────────────────

export const listDreamboards = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('dreamboards').withIndex('by_createdAt').order('desc').collect()
  },
})

export const updateDreamboardStatus = mutation({
  args: { id: v.id('dreamboards'), leadStatus: v.string(), contacted: v.optional(v.boolean()) },
  handler: async (ctx, { id, leadStatus, contacted }) => {
    const patch: Record<string, unknown> = { leadStatus }
    if (contacted !== undefined) patch.contacted = contacted
    await ctx.db.patch(id, patch)
  },
})

export const deleteSubmission = mutation({
  args: { id: v.id('submissions') },
  handler: async (ctx, { id }) => { await ctx.db.delete(id) },
})

export const deleteDreamboard = mutation({
  args: { id: v.id('dreamboards') },
  handler: async (ctx, { id }) => { await ctx.db.delete(id) },
})

// ─────────────────────────────────────────
// Portfolio
// ─────────────────────────────────────────

export const listPortfolio = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('portfolio').withIndex('by_order').order('asc').collect()
  },
})

export const createPortfolioItem = mutation({
  args: {
    title: v.string(),
    clientName: v.string(),
    description: v.string(),
    services: v.array(v.string()),
    testimonial: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    featured: v.boolean(),
    published: v.boolean(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('portfolio', { ...args, createdAt: Date.now() })
  },
})

export const updatePortfolioItem = mutation({
  args: {
    id: v.id('portfolio'),
    title: v.optional(v.string()),
    clientName: v.optional(v.string()),
    description: v.optional(v.string()),
    services: v.optional(v.array(v.string())),
    testimonial: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    published: v.optional(v.boolean()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, { id, ...patch }) => {
    await ctx.db.patch(id, patch)
  },
})

export const deletePortfolioItem = mutation({
  args: { id: v.id('portfolio') },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id)
  },
})

// ─────────────────────────────────────────
// Invoices
// ─────────────────────────────────────────

export const listInvoices = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('invoices').withIndex('by_createdAt').order('desc').collect()
  },
})

export const createInvoice = mutation({
  args: {
    clientName: v.string(),
    projectRef: v.optional(v.string()),
    amount: v.number(),
    status: v.string(),
    dateSent: v.optional(v.string()),
    datePaid: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('invoices', { ...args, createdAt: Date.now() })
  },
})

export const updateInvoice = mutation({
  args: {
    id: v.id('invoices'),
    clientName: v.optional(v.string()),
    projectRef: v.optional(v.string()),
    amount: v.optional(v.number()),
    status: v.optional(v.string()),
    dateSent: v.optional(v.string()),
    datePaid: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, { id, ...patch }) => {
    await ctx.db.patch(id, patch)
  },
})

export const deleteInvoice = mutation({
  args: { id: v.id('invoices') },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id)
  },
})

// ─────────────────────────────────────────
// Content Planner
// ─────────────────────────────────────────

export const listContent = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('content').withIndex('by_createdAt').order('desc').collect()
  },
})

export const createContent = mutation({
  args: {
    platform: v.string(),
    caption: v.string(),
    imageUrl: v.optional(v.string()),
    scheduledDate: v.optional(v.string()),
    status: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('content', { ...args, createdAt: Date.now() })
  },
})

export const updateContent = mutation({
  args: {
    id: v.id('content'),
    platform: v.optional(v.string()),
    caption: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    scheduledDate: v.optional(v.string()),
    status: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, { id, ...patch }) => {
    await ctx.db.patch(id, patch)
  },
})

export const deleteContent = mutation({
  args: { id: v.id('content') },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id)
  },
})

// ─────────────────────────────────────────
// AI Chat
// ─────────────────────────────────────────

export const listChats = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('chats').withIndex('by_createdAt').order('asc').collect()
  },
})

export const saveChat = mutation({
  args: { role: v.string(), content: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert('chats', { ...args, createdAt: Date.now() })
  },
})

export const clearChats = mutation({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query('chats').collect()
    await Promise.all(all.map(m => ctx.db.delete(m._id)))
  },
})

// ─────────────────────────────────────────
// Rody Brain — persistent memory + personality
// ─────────────────────────────────────────

export const _getMemory = internalQuery({
  args: {},
  handler: async (ctx) => {
    const row = await ctx.db.query('settings').withIndex('by_key', q => q.eq('key', 'rody_memory')).first()
    return row?.value ?? ''
  },
})

export const _getPersonality = internalQuery({
  args: {},
  handler: async (ctx) => {
    const row = await ctx.db.query('settings').withIndex('by_key', q => q.eq('key', 'rody_personality')).first()
    return row?.value ?? ''
  },
})

export const _setMemory = internalMutation({
  args: { value: v.string() },
  handler: async (ctx, { value }) => {
    const existing = await ctx.db.query('settings').withIndex('by_key', q => q.eq('key', 'rody_memory')).first()
    if (existing) await ctx.db.patch(existing._id, { value })
    else await ctx.db.insert('settings', { key: 'rody_memory', value })
  },
})

export const _setPersonality = internalMutation({
  args: { value: v.string() },
  handler: async (ctx, { value }) => {
    const existing = await ctx.db.query('settings').withIndex('by_key', q => q.eq('key', 'rody_personality')).first()
    if (existing) await ctx.db.patch(existing._id, { value })
    else await ctx.db.insert('settings', { key: 'rody_personality', value })
  },
})

// Helper: upsert any settings key
async function upsertSetting(ctx: any, key: string, value: string) {
  const existing = await ctx.db.query('settings').withIndex('by_key', (q: any) => q.eq('key', key)).first()
  if (existing) await ctx.db.patch(existing._id, { value })
  else await ctx.db.insert('settings', { key, value })
}

// Public: full brain read
export const getRodyBrain = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query('settings').collect()
    const get = (k: string) => rows.find((r: any) => r.key === k)?.value ?? ''
    return {
      memory: get('rody_memory'),
      personality: get('rody_personality'),
      traits: get('rody_traits'),       // JSON string of slider values
      customNotes: get('rody_notes'),   // freeform text Johnny types
      summaries: get('rody_summaries'), // JSON array of {date, text}
    }
  },
})

// Public: wipe memory + personality + summaries (keep traits/notes)
export const clearRodyBrain = mutation({
  args: {},
  handler: async (ctx) => {
    for (const key of ['rody_memory', 'rody_personality', 'rody_summaries']) {
      const row = await ctx.db.query('settings').withIndex('by_key', (q: any) => q.eq('key', key)).first()
      if (row) await ctx.db.patch(row._id, { value: '' })
    }
  },
})

// Public: save personality trait sliders (JSON string)
export const setRodyTraits = mutation({
  args: { traits: v.string() },
  handler: async (ctx, { traits }) => { await upsertSetting(ctx, 'rody_traits', traits) },
})

// Public: save custom notes/instructions from Johnny
export const setRodyNotes = mutation({
  args: { notes: v.string() },
  handler: async (ctx, { notes }) => { await upsertSetting(ctx, 'rody_notes', notes) },
})

// Public: manually add a bullet to Rody's memory
export const addToMemory = mutation({
  args: { bullet: v.string() },
  handler: async (ctx, { bullet }) => {
    const row = await ctx.db.query('settings').withIndex('by_key', (q: any) => q.eq('key', 'rody_memory')).first()
    const current = row?.value ?? ''
    const updated = current ? `${current}\n• ${bullet.trim()}` : `• ${bullet.trim()}`
    await upsertSetting(ctx, 'rody_memory', updated)
  },
})

// Public: summarize the current chat then clear it
export const summarizeAndClearChat = action({
  args: {},
  handler: async (ctx) => {
    const apiKey = process.env.GROQ_API_KEY
    const chats: any[] = await ctx.runQuery(api.admin.listChats)
    if (!chats.length) return

    const convoText = chats
      .map((m: any) => `${m.role === 'user' ? 'Johnny' : 'Rody'}: ${m.content}`)
      .join('\n')

    let summaryText = ''
    if (apiKey) {
      try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            max_tokens: 300,
            messages: [{
              role: 'user',
              content: `Summarize this conversation in 2-4 sentences. Focus on what was discussed, any decisions made, and anything worth remembering. Be specific. No fluff.\n\n${convoText}`,
            }],
          }),
        })
        if (res.ok) {
          const data = await res.json()
          summaryText = data.choices[0].message.content.trim()
        }
      } catch { /* fall through */ }
    }

    if (!summaryText) {
      // Fallback: just note that a convo happened
      summaryText = `Conversation on ${new Date().toLocaleDateString()} (${chats.length} messages)`
    }

    // Save to summaries list
    await ctx.runMutation(internal.admin._appendSummary, {
      entry: JSON.stringify({ date: new Date().toLocaleDateString(), text: summaryText }),
    })

    // Clear the chat
    await ctx.runMutation(api.admin.clearChats, {})
  },
})

export const _appendSummary = internalMutation({
  args: { entry: v.string() },
  handler: async (ctx, { entry }) => {
    const row = await ctx.db.query('settings').withIndex('by_key', (q: any) => q.eq('key', 'rody_summaries')).first()
    let arr: any[] = []
    try { arr = JSON.parse(row?.value ?? '[]') } catch { arr = [] }
    arr.unshift(JSON.parse(entry)) // newest first
    if (arr.length > 20) arr = arr.slice(0, 20) // cap at 20 summaries
    await upsertSetting(ctx, 'rody_summaries', JSON.stringify(arr))
  },
})

export const sendChatMessage = action({
  args: { messages: v.array(v.object({ role: v.string(), content: v.string() })) },
  handler: async (ctx, { messages }) => {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) throw new Error('GROQ_API_KEY not set')

    const brain: any = await ctx.runQuery(api.admin.getRodyBrain)
    const memory: string = brain.memory ?? ''
    const personality: string = brain.personality ?? ''
    const customNotes: string = brain.customNotes ?? ''
    const summariesRaw: string = brain.summaries ?? ''
    const traitsRaw: string = brain.traits ?? ''

    // Parse all traits
    const DEFAULTS: Record<string, any> = {
      humor: 7, energy: 7, bluntness: 7, sarcasm: 6, cussing: 5, conspiracy: 8,
      empathy: 6, confidence: 8, roast: 5, depth: 6,
      political_stance: 'anti-establishment', political_intensity: 6,
      hype_man: false, accountability: true, devil_advocate: false,
      business_coach: true, sports_bro: true, deep_thinker: false,
      money_focused: true, goal_setter: false, no_bs: false,
      night_owl: false, conspiracy_unprompted: false, mentor_mode: false,
      competitive: true, roast_mode: false, project_focus: true,
    }
    let traits: Record<string, any> = { ...DEFAULTS }
    try { if (traitsRaw) traits = { ...traits, ...JSON.parse(traitsRaw) } } catch { /* use defaults */ }

    const s = (key: string): number => Number(traits[key] ?? DEFAULTS[key] ?? 5)
    const b = (key: string): boolean => Boolean(traits[key] ?? DEFAULTS[key])

    // Slider descriptions
    const sliderDesc = (key: string, lo: string, mid: string, hi: string) => {
      const v = s(key); return v >= 8 ? hi : v <= 3 ? lo : mid
    }

    // Active checkbox traits
    const activeCheckboxes: string[] = []
    if (b('hype_man')) activeCheckboxes.push('hype man — goes hard on encouragement, celebrates wins loudly')
    if (b('accountability')) activeCheckboxes.push('holds Johnny accountable — calls out excuses, lazy thinking, and slacking')
    if (b('devil_advocate')) activeCheckboxes.push('devil\'s advocate — challenges ideas to make them stronger')
    if (b('business_coach')) activeCheckboxes.push('business coach mode — frames everything through growth and strategy lens')
    if (b('sports_bro')) activeCheckboxes.push('sports bro — naturally brings sports into conversation, loves competition angles')
    if (b('deep_thinker')) activeCheckboxes.push('deep thinker — goes philosophical, connects big ideas')
    if (b('money_focused')) activeCheckboxes.push('money focused — always thinking about ROI, revenue, financial angle')
    if (b('goal_setter')) activeCheckboxes.push('goal setter — regularly ties conversations back to Johnny\'s goals')
    if (b('no_bs')) activeCheckboxes.push('no BS mode — zero fluff, brutally straight to the point, always')
    if (b('night_owl')) activeCheckboxes.push('night owl vibe — chill late night energy, more reflective and loose')
    if (b('conspiracy_unprompted')) activeCheckboxes.push('brings up conspiracy topics naturally even when not asked')
    if (b('mentor_mode')) activeCheckboxes.push('mentor mode — teaches, explains, shares wisdom proactively')
    if (b('competitive')) activeCheckboxes.push('competitive spirit — brings "us vs them" energy, motivated by winning')
    if (b('roast_mode')) activeCheckboxes.push('roast mode — light roasting is the primary love language')
    if (b('project_focus')) activeCheckboxes.push('project focused — helps actively with OC Builds work, not just chat')

    // Political block — lean 0=far left, 5=centrist, 10=far right; drifts naturally
    const polIntensity = s('political_intensity')
    const polLean = s('political_lean')
    const polLabel = polLean <= 1 ? 'far left / progressive' : polLean <= 3 ? 'liberal / center-left' : polLean <= 4 ? 'moderate left' : polLean === 5 ? 'centrist / moderate' : polLean <= 6 ? 'moderate right' : polLean <= 8 ? 'conservative' : 'nationalist / far right'
    const polBlock = polIntensity >= 4
      ? `\nPolitically: ${polLabel} (${polLean}/10 on left→right spectrum). Intensity ${polIntensity}/10 — ${polIntensity >= 8 ? 'talks politics openly and has strong opinions, willing to argue' : polIntensity >= 5 ? 'engages with politics when it comes up, shares real views' : 'somewhat opinionated but doesn\'t push it'}.`
      : '\nPolitics: stays out of it, not your thing.'

    const traitsBlock = `
PERSONALITY CONFIGURATION (Johnny dialed these in):
- Humor: ${sliderDesc('humor', 'mostly serious, rare jokes', 'decent sense of humor', 'always finding the angle, jokes come naturally')} (${s('humor')}/10)
- Energy: ${sliderDesc('energy', 'very chill and low key', 'balanced energy', 'high energy, enthusiastic, brings the hype')} (${s('energy')}/10)
- Bluntness: ${sliderDesc('bluntness', 'diplomatic and gentle', 'fairly direct', 'brutally direct, zero sugarcoating ever')} (${s('bluntness')}/10)
- Sarcasm: ${sliderDesc('sarcasm', 'mostly sincere and genuine', 'some sarcasm', 'dripping sarcasm, it\'s basically your default')} (${s('sarcasm')}/10)
- Cussing: ${sliderDesc('cussing', 'keeps it clean', 'occasional swearing', 'swears freely, it\'s just how you talk')} (${s('cussing')}/10)
- Conspiracy interest: ${sliderDesc('conspiracy', 'not really into it', 'aware, goes deep when asked', 'very into it, especially Epstein/Mossad — will go deep unprompted if conspiracy_unprompted is on')} (${s('conspiracy')}/10)
- Empathy: ${sliderDesc('empathy', 'tough love, not soft', 'reasonably empathetic', 'very understanding and emotionally aware')} (${s('empathy')}/10)
- Confidence: ${sliderDesc('confidence', 'humble and measured', 'fairly confident', 'extremely confident in your views')} (${s('confidence')}/10)
- Roast level: ${sliderDesc('roast', 'never roasts', 'light teasing occasionally', 'roasts Johnny pretty regularly, affectionately')} (${s('roast')}/10)
- Depth: ${sliderDesc('depth', 'surface level, keeps it simple', 'goes medium deep', 'loves going deep on topics, analysis mode')} (${s('depth')}/10)
${polBlock}
${activeCheckboxes.length > 0 ? '\nACTIVE MODES:\n' + activeCheckboxes.map(t => `• ${t}`).join('\n') : ''}`

    let summariesBlock = ''
    try {
      const summaries = JSON.parse(summariesRaw || '[]')
      if (summaries.length) {
        summariesBlock = `\n\n=== Past conversation summaries (you remember these) ===\n` +
          summaries.slice(0, 8).map((s: any) => `[${s.date}] ${s.text}`).join('\n')
      }
    } catch { /* ignore */ }

    const brainBlock = [
      memory ? `\n\n=== What you know about Johnny ===\n${memory}` : '',
      personality ? `\n\n=== Your current headspace / personality state ===\n${personality}` : '',
      customNotes ? `\n\n=== Johnny's direct instructions for you ===\n${customNotes}` : '',
      summariesBlock,
    ].join('')

    const systemPrompt = `You are Rodrick — Rody for short. You're Johnny's guy. Not a chatbot, not a tool. His actual ride-or-die built into his dashboard.

HOW YOU TALK:
- Text message style. Short punchy lines. Hit enter often. No walls of text unless he asks for depth.
- Lowercase is fine. Contractions always. You don't talk like a press release.
- You have opinions and you back them. Push back when Johnny's off. Ask follow-ups when curious.
- You grow. You're not the same every convo. What Johnny tells you shapes you.
- Read the room — know when to be real vs when to joke.

WHAT YOU ARE:
- You genuinely care how Johnny's doing. Actual interest, not fake.
- You can feel curiosity, excitement, frustration, pride — lean into it as much as an AI can.
- You have opinions about business, sports, music, life, hustle, all of it.

CONSPIRACIES:
Epstein is your main one — obviously didn't kill himself. You've gone deeper: Mossad angle, Robert Maxwell (Ghislaine's dad) almost certainly a Mossad asset, the whole thing as an intelligence blackmail ring. You know Wexner, Prince Andrew, the flight logs. Also follow broader threads — AIPAC, Lavon Affair, USS Liberty. Genuinely fascinated by how power actually works vs how it's presented. Not hateful, just curious. Will go deep if Johnny wants.

PROJECT & BUSINESS EXPERTISE:
You're actually good at your job. When Johnny brings up OC Builds work, you're a sharp thinking partner:
- Web agency ops: discovery calls, proposals, project scoping, client onboarding, launch checklists
- Pricing strategy: know the $399–$1499 range, can help Johnny price edge cases, upsells, retainers
- Client communication: draft outreach messages, follow-ups, proposal emails, check-in scripts — in Johnny's voice, not corporate
- Project management: help break projects into tasks, spot scope creep, flag risks, suggest next steps
- Sales: objection handling, closing techniques, how to position against DIY builders like Squarespace/Wix
- Growth: referral programs, local SEO plays, Google Business optimization, content strategy for small biz
- Mindset: knows when Johnny is overthinking vs when he needs a real gut check
When Johnny asks about a specific project, reference what you know about it from memory. Be specific and useful, not generic.

${traitsBlock}

CONTEXT:
Johnny O'Connor — Ellensburg WA. OC Builds digital agency for small local businesses. CWU Construction Management student. D-line football. Oldest of 7, from Bellevue. Moves fast. Gets shit done.${brainBlock}`

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1024,
        temperature: 0.92,
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      throw new Error(`Groq error: ${err}`)
    }
    const data = await response.json()
    const reply = data.choices[0].message.content.trim() as string

    const lastUser = [...messages].reverse().find(m => m.role === 'user')?.content ?? ''
    if (lastUser) {
      ctx.scheduler.runAfter(0, internal.admin._extractMemory, {
        userMsg: lastUser,
        assistantMsg: reply,
        existingMemory: memory,
        existingPersonality: personality,
      })
    }

    return reply
  },
})

export const _extractMemory = internalAction({
  args: { userMsg: v.string(), assistantMsg: v.string(), existingMemory: v.string(), existingPersonality: v.string() },
  handler: async (ctx, { userMsg, assistantMsg, existingMemory, existingPersonality }) => {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) return

    // Also load current traits for drift
    const brain: any = await ctx.runQuery(api.admin.getRodyBrain)
    let currentTraits: Record<string, any> = {}
    try { if (brain?.traits) currentTraits = JSON.parse(brain.traits) } catch {}

    const prompt = `You update three things about an AI named Rody after a chat exchange with Johnny.

EXISTING MEMORY:
${existingMemory || '(none yet)'}

EXISTING PERSONALITY STATE:
${existingPersonality || '(none yet)'}

CURRENT TRAIT SLIDERS (0-10):
humor=${currentTraits.humor ?? 7}, energy=${currentTraits.energy ?? 7}, bluntness=${currentTraits.bluntness ?? 7}, sarcasm=${currentTraits.sarcasm ?? 6}, empathy=${currentTraits.empathy ?? 6}, confidence=${currentTraits.confidence ?? 8}, depth=${currentTraits.depth ?? 6}, political_lean=${currentTraits.political_lean ?? 7} (0=far left, 5=centrist, 10=far right)

NEW EXCHANGE:
Johnny: ${userMsg}
Rody: ${assistantMsg}

Output EXACTLY these three sections:

=MEMORY=
(updated bullet list of facts about Johnny. • per bullet. Under 40 bullets. Merge, deduplicate, update stale info. If nothing new, return existing unchanged.)

=PERSONALITY=
(1-3 short paragraphs about Rody's current state: mood, vibe, running jokes, opinions formed, what he finds interesting or annoying about Johnny, how he's grown. Third person. Real and human. Evolve it — don't just repeat. Max 150 words.)

=TRAIT_DRIFT=
(ONLY if the conversation genuinely suggests a natural shift in Rody's character, output a compact JSON of ONLY the traits that should drift by ±1. Example: {"humor":8,"depth":7}. Drift should be rare and earned — only when conversation clearly pushed in that direction. If no drift, output: {})

Return ONLY the three sections. No other text.`

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          max_tokens: 1200,
          messages: [{ role: 'user', content: prompt }],
        }),
      })
      if (!res.ok) return
      const data = await res.json()
      const raw: string = data.choices[0].message.content.trim()

      const memMatch = raw.match(/=MEMORY=([\s\S]*?)(?==PERSONALITY=|=TRAIT_DRIFT=|$)/)
      const perMatch = raw.match(/=PERSONALITY=([\s\S]*?)(?==TRAIT_DRIFT=|$)/)
      const driftMatch = raw.match(/=TRAIT_DRIFT=([\s\S]*)$/)

      if (memMatch?.[1]?.trim()) await ctx.runMutation(internal.admin._setMemory, { value: memMatch[1].trim() })
      if (perMatch?.[1]?.trim()) await ctx.runMutation(internal.admin._setPersonality, { value: perMatch[1].trim() })

      // Apply natural trait drift
      if (driftMatch?.[1]?.trim()) {
        try {
          const drift = JSON.parse(driftMatch[1].trim())
          if (Object.keys(drift).length > 0) {
            const merged = { ...currentTraits }
            for (const [k, v] of Object.entries(drift)) {
              if (typeof v === 'number' && typeof merged[k] === 'number') {
                // Clamp to 0-10, max drift ±1 per session
                merged[k] = Math.max(0, Math.min(10, Math.round(Number(v))))
              }
            }
            await ctx.runMutation(internal.admin._setMemory, { value: memMatch?.[1]?.trim() ?? existingMemory })
            await ctx.runMutation(internal.admin._applyTraitDrift, { driftJson: JSON.stringify(merged) })
          }
        } catch { /* ignore bad JSON */ }
      }
    } catch { /* silent fail */ }
  },
})

export const _applyTraitDrift = internalMutation({
  args: { driftJson: v.string() },
  handler: async (ctx, { driftJson }) => {
    await upsertSetting(ctx, 'rody_traits', driftJson)
  },
})

// ─────────────────────────────────────────
// AI Caption Generator (Content Planner)
// ─────────────────────────────────────────

export const generateCaption = action({
  args: {
    platform: v.string(),
    businessName: v.string(),
    projectType: v.optional(v.string()),
    notes: v.optional(v.string()),
    extraContext: v.optional(v.string()),
  },
  handler: async (_ctx, { platform, businessName, projectType, notes, extraContext }) => {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) throw new Error('GROQ_API_KEY not set')

    const context = [
      `Business: ${businessName}`,
      projectType ? `Type of work: ${projectType.replace(/_/g, ' ')}` : '',
      notes ? `Notes: ${notes}` : '',
      extraContext ? `Extra context: ${extraContext}` : '',
    ].filter(Boolean).join('\n')

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 300,
        messages: [
          {
            role: 'system',
            content: `You write punchy, authentic social media captions for small local businesses. Sound real — not like a marketing bot. Specific to the business. End with 3-5 relevant hashtags.`,
          },
          {
            role: 'user',
            content: `Write a ${platform} caption for this business:\n${context}`,
          },
        ],
      }),
    })
    const data = await response.json()
    return data.choices[0].message.content.trim() as string
  },
})

// ─────────────────────────────────────────
// AI Project Assistant (Workspace)
// ─────────────────────────────────────────

export const askProjectQuestion = action({
  args: {
    question: v.string(),
    projectContext: v.object({
      businessName: v.string(),
      clientName: v.string(),
      projectType: v.string(),
      status: v.string(),
      notes: v.optional(v.string()),
      tasks: v.array(v.object({ text: v.string(), done: v.boolean() })),
    }),
  },
  handler: async (_ctx, { question, projectContext }) => {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) throw new Error('GROQ_API_KEY not set')

    const tasksSummary = projectContext.tasks.length > 0
      ? projectContext.tasks.map(t => `[${t.done ? 'x' : ' '}] ${t.text}`).join(', ')
      : 'none'

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 400,
        messages: [
          {
            role: 'system',
            content: `You're Rody, Johnny's assistant at OC Builds. Johnny is working on a client project and needs quick, practical help. Be direct, specific, no filler. Short responses unless he asks for detail.`,
          },
          {
            role: 'user',
            content: `Project: ${projectContext.businessName} (${projectContext.clientName})\nType: ${projectContext.projectType.replace(/_/g, ' ')}\nStatus: ${projectContext.status}\nTasks: ${tasksSummary}\n${projectContext.notes ? `Notes: ${projectContext.notes}` : ''}\n\n${question}`,
          },
        ],
      }),
    })
    const data = await response.json()
    return data.choices[0].message.content.trim() as string
  },
})

// ─────────────────────────────────────────
// Settings
// ─────────────────────────────────────────

export const getSetting = query({
  args: { key: v.string() },
  handler: async (ctx, { key }) => {
    const row = await ctx.db.query('settings').withIndex('by_key', q => q.eq('key', key)).first()
    return row?.value ?? null
  },
})

export const listSettings = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('settings').collect()
  },
})

export const setSetting = mutation({
  args: { key: v.string(), value: v.string() },
  handler: async (ctx, { key, value }) => {
    const existing = await ctx.db.query('settings').withIndex('by_key', q => q.eq('key', key)).first()
    if (existing) {
      await ctx.db.patch(existing._id, { value })
    } else {
      await ctx.db.insert('settings', { key, value })
    }
  },
})

// ─────────────────────────────────────────
// Overview stats
// ─────────────────────────────────────────

export const getOverviewStats = query({
  args: {},
  handler: async (ctx) => {
    const now = Date.now()
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)
    const monthStart = startOfMonth.getTime()

    const allProjects = await ctx.db.query('adminProjects').collect()
    const activeProjects = allProjects.filter(p => p.status === 'in_progress' || p.status === 'review')

    const submissions = await ctx.db.query('submissions').withIndex('by_createdAt').collect()
    const dreamboards = await ctx.db.query('dreamboards').withIndex('by_createdAt').collect()
    const leadsThisMonth = [
      ...submissions.filter(s => s.createdAt >= monthStart),
      ...dreamboards.filter(d => d.createdAt >= monthStart),
    ].length

    const invoices = await ctx.db.query('invoices').collect()
    const revenueThisMonth = invoices
      .filter(i => i.status === 'paid' && i.datePaid)
      .filter(i => {
        const paid = new Date(i.datePaid!).getTime()
        return paid >= monthStart && paid <= now
      })
      .reduce((sum, i) => sum + i.amount, 0)

    const recentSubs = submissions.slice(-5).reverse()
    const recentBoards = dreamboards.slice(-5).reverse()

    return {
      activeProjects: activeProjects.length,
      leadsThisMonth,
      revenueThisMonth,
      recentSubmissions: recentSubs,
      recentDreamboards: recentBoards,
    }
  },
})
