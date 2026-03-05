import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('projects').order('desc').collect()
  },
})

export const add = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    services: v.array(v.string()),
    quote: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('projects', {
      ...args,
      featured: args.featured ?? false,
      createdAt: Date.now(),
    })
  },
})

export const remove = mutation({
  args: { id: v.id('projects') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})
