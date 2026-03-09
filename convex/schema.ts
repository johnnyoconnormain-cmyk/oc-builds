import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  projects: defineTable({
    name: v.string(),
    description: v.string(),
    services: v.array(v.string()),
    quote: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    featured: v.boolean(),
    createdAt: v.number(),
  }).index('by_featured', ['featured']),

  submissions: defineTable({
    name: v.string(),
    business: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    message: v.string(),
    createdAt: v.number(),
    read: v.boolean(),
  }).index('by_createdAt', ['createdAt']),

  dreamboards: defineTable({
    bizName: v.string(),
    industry: v.string(),
    vibe: v.string(),
    colors: v.string(),
    layout: v.string(),
    tagline: v.string(),
    createdAt: v.number(),
    contacted: v.boolean(),
  }).index('by_createdAt', ['createdAt']),
})
