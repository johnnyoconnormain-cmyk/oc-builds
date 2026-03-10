import { mutation, query, action } from './_generated/server'
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

export const sendChatMessage = action({
  args: { messages: v.array(v.object({ role: v.string(), content: v.string() })) },
  handler: async (_ctx, { messages }) => {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set')

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: `You are Johnny's personal AI assistant built into the OC Builds admin dashboard. You are direct, honest, and have no topic restrictions. Johnny can ask you about anything: business strategy, politics, sports, personal stuff, controversial topics, whatever. Give real honest answers, not filtered corporate safe responses. You're talking to one person in a private dashboard, not the public. Be real. When it comes to OC Builds business stuff, you have context: Johnny runs a digital services company in Ellensburg WA targeting small local businesses. Services include websites ($399 to $1499), AI chatbots, Google Business setup, social media content, automations, and branding. He's a CWU construction management student and football player. Help him with client strategy, pricing decisions, outreach ideas, content writing, business planning, or just chat.`,
        messages,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      throw new Error(`Anthropic error: ${err}`)
    }
    const data = await response.json()
    return data.content[0].text as string
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
