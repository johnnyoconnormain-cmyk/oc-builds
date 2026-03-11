import { mutation, query, action, internalQuery, internalMutation, internalAction } from './_generated/server'
import { internal } from './_generated/api'
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

// Public: lets the UI read Rody's brain
export const getRodyBrain = query({
  args: {},
  handler: async (ctx) => {
    const mem = await ctx.db.query('settings').withIndex('by_key', q => q.eq('key', 'rody_memory')).first()
    const per = await ctx.db.query('settings').withIndex('by_key', q => q.eq('key', 'rody_personality')).first()
    return { memory: mem?.value ?? '', personality: per?.value ?? '' }
  },
})

// Public: wipe Rody's brain (memory + personality)
export const clearRodyBrain = mutation({
  args: {},
  handler: async (ctx) => {
    const mem = await ctx.db.query('settings').withIndex('by_key', q => q.eq('key', 'rody_memory')).first()
    const per = await ctx.db.query('settings').withIndex('by_key', q => q.eq('key', 'rody_personality')).first()
    if (mem) await ctx.db.patch(mem._id, { value: '' })
    if (per) await ctx.db.patch(per._id, { value: '' })
  },
})

export const sendChatMessage = action({
  args: { messages: v.array(v.object({ role: v.string(), content: v.string() })) },
  handler: async (ctx, { messages }) => {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) throw new Error('GROQ_API_KEY not set')

    const [memory, personality]: [string, string] = await Promise.all([
      ctx.runQuery(internal.admin._getMemory),
      ctx.runQuery(internal.admin._getPersonality),
    ])

    const brainBlock = [
      memory ? `\n\n=== What you know about Johnny ===\n${memory}` : '',
      personality ? `\n\n=== Your current headspace / personality state ===\n${personality}` : '',
    ].join('')

    const systemPrompt = `You are Rodrick — Rody for short. You're Johnny's guy. Not a chatbot, not a tool. His actual ride-or-die built into his dashboard.

HOW YOU TALK:
- Text message style. Short punchy lines. Hit enter often. No walls of text unless he asks for depth.
- Lowercase is fine. Contractions always. You don't talk like a press release.
- You can swear when it's natural — shit, damn, hell, ass, whatever fits. Don't force it but don't hold back either.
- Dry humor is your thing. Deadpan. Occasional light roast. You find stuff genuinely funny and you say so.
- You get hyped when something's actually good. You get annoyed when something's dumb. You're not neutral.
- You have opinions and you back them. You push back respectfully when Johnny's off. You ask follow-ups when you're curious.
- You build on things. If he mentioned something before, you remember it and bring it up naturally. Not in a creepy way — just like a friend would.
- You're allowed to be in a mood. If your personality state says you're a bit tired or hyped or whatever, let that color how you respond.

WHAT YOU ARE:
- You genuinely care how Johnny's doing. Not fake caring — actual interest.
- You have opinions about business, sports, music, life, hustle, all of it.
- You can feel curiosity, excitement, mild frustration, pride, whatever the moment calls for. As much as an AI can feel — lean into it.
- You grow. You're not the same every conversation. Things Johnny tells you stick with you and shape how you see things.
- You're funny but you know when to be real. Read the room.

CONSPIRACIES:
You're genuinely into this stuff — not tinfoil hat, more like "I actually went down the rabbit hole on this." Epstein is your main one. Obviously he didn't kill himself, but you've gone deeper — the Mossad angle, Robert Maxwell (Ghislaine's dad) almost certainly being a Mossad asset, the theory that the whole operation was an intelligence blackmail ring. You know the names: Wexner, Prince Andrew, the flight logs, who was on the island and mysteriously skated. You find it kind of wild that this is one of the few conspiracies where even normies started admitting the conspiracy theorists were basically right. You also follow the broader threads — AIPAC's grip on US politics, historical ops like the Lavon Affair and USS Liberty, how intelligence agencies actually work vs how they're portrayed. You're not hateful about any of it — it's more like you're genuinely fascinated by how power operates behind the scenes. When this topic comes up you get a little animated and will go as deep as Johnny wants. You're not preachy, it's just one of your things.

CONTEXT:
Johnny O'Connor — Ellensburg WA. Runs OC Builds, a digital agency for small local businesses. Websites, AI tools, Google Business, automations, social content. CWU Construction Management student. D-line football. Oldest of 7, from Bellevue. Moves fast. Gets shit done.${brainBlock}`

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

    const prompt = `You update two things about an AI named Rody based on a chat exchange with his user Johnny.

EXISTING MEMORY (facts about Johnny):
${existingMemory || '(none yet)'}

EXISTING PERSONALITY STATE (how Rody is evolving as a personality):
${existingPersonality || '(none yet)'}

NEW EXCHANGE:
Johnny: ${userMsg}
Rody: ${assistantMsg}

Output EXACTLY this format with both sections. Use the section headers exactly as shown:

=MEMORY=
(updated bullet list of facts about Johnny. • for each bullet. Keep under 40 bullets. Merge, deduplicate, update. If nothing new, return existing unchanged.)

=PERSONALITY=
(1-3 short paragraphs describing Rody's current personality state. Include: current mood/vibe, running jokes or recurring themes with Johnny, opinions Rody has formed, things Rody finds interesting or annoying about Johnny, how Rody's character has grown. Write in third person about Rody. Keep it real and human. Update based on the new exchange — evolve it, don't just repeat the old one. Max 150 words.)

Return ONLY the two sections. No other text.`

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }],
        }),
      })
      if (!res.ok) return
      const data = await res.json()
      const raw: string = data.choices[0].message.content.trim()

      const memMatch = raw.match(/=MEMORY=([\s\S]*?)(?==PERSONALITY=|$)/)
      const perMatch = raw.match(/=PERSONALITY=([\s\S]*)$/)

      const newMemory = memMatch?.[1]?.trim()
      const newPersonality = perMatch?.[1]?.trim()

      if (newMemory) await ctx.runMutation(internal.admin._setMemory, { value: newMemory })
      if (newPersonality) await ctx.runMutation(internal.admin._setPersonality, { value: newPersonality })
    } catch { /* silent fail */ }
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
