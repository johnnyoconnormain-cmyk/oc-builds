import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  // ── existing public portfolio projects ──
  projects: defineTable({
    name: v.string(),
    description: v.string(),
    services: v.array(v.string()),
    quote: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    featured: v.boolean(),
    createdAt: v.number(),
  }).index('by_featured', ['featured']),

  // ── contact form submissions ──
  submissions: defineTable({
    name: v.string(),
    business: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    message: v.string(),
    createdAt: v.number(),
    read: v.boolean(),
    leadStatus: v.optional(v.string()), // new | contacted | proposal_sent | converted | lost
  }).index('by_createdAt', ['createdAt']),

  // ── dream board entries ──
  dreamboards: defineTable({
    bizName: v.string(),
    industry: v.string(),
    vibe: v.string(),
    colors: v.string(),
    layout: v.string(),
    tagline: v.string(),
    createdAt: v.number(),
    contacted: v.boolean(),
    leadStatus: v.optional(v.string()), // new | contacted | proposal_sent | converted | lost
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
  }).index('by_createdAt', ['createdAt']),

  // ── admin client projects ──
  adminProjects: defineTable({
    clientName: v.string(),
    businessName: v.string(),
    projectType: v.string(), // website | chatbot | google_business | branding | automation | content | full_stack
    status: v.string(),      // lead | in_progress | review | completed | cancelled
    startDate: v.optional(v.string()),
    deadline: v.optional(v.string()),
    price: v.optional(v.number()),
    notes: v.optional(v.string()),
    tasks: v.array(v.object({ text: v.string(), done: v.boolean() })),
    createdAt: v.number(),
  }).index('by_status', ['status']).index('by_createdAt', ['createdAt']),

  // ── public portfolio items (admin-managed) ──
  portfolio: defineTable({
    title: v.string(),
    clientName: v.string(),
    description: v.string(),
    services: v.array(v.string()),
    testimonial: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    featured: v.boolean(),
    published: v.boolean(),
    order: v.number(),
    createdAt: v.number(),
  }).index('by_published', ['published']).index('by_order', ['order']),

  // ── invoices ──
  invoices: defineTable({
    clientName: v.string(),
    projectRef: v.optional(v.string()),
    amount: v.number(),
    status: v.string(), // draft | sent | paid | overdue
    dateSent: v.optional(v.string()),
    datePaid: v.optional(v.string()),
    notes: v.optional(v.string()),
    createdAt: v.number(),
  }).index('by_status', ['status']).index('by_createdAt', ['createdAt']),

  // ── content planner ──
  content: defineTable({
    platform: v.string(), // instagram | facebook | tiktok | linkedin
    caption: v.string(),
    imageUrl: v.optional(v.string()),
    scheduledDate: v.optional(v.string()),
    status: v.string(), // draft | scheduled | posted
    notes: v.optional(v.string()),
    createdAt: v.number(),
  }).index('by_status', ['status']).index('by_scheduledDate', ['scheduledDate']),

  // ── AI chat history ──
  chats: defineTable({
    role: v.string(), // user | assistant
    content: v.string(),
    createdAt: v.number(),
  }).index('by_createdAt', ['createdAt']),

  // ── admin settings ──
  settings: defineTable({
    key: v.string(),
    value: v.string(),
  }).index('by_key', ['key']),
})
