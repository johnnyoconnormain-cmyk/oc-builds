import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const submit = mutation({
  args: {
    name: v.string(),
    business: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('submissions', {
      ...args,
      createdAt: Date.now(),
      read: false,
    })
  },
})

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query('submissions')
      .withIndex('by_createdAt')
      .order('desc')
      .collect()
  },
})
