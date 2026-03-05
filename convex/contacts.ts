import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    projectType: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert('contacts', {
      ...args,
      createdAt: Date.now(),
      read: false,
    })
    return id
  },
})

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query('contacts')
      .withIndex('by_createdAt')
      .order('desc')
      .collect()
  },
})
