import { mutation, action } from './_generated/server'
import { v } from 'convex/values'

export const save = mutation({
  args: {
    bizName: v.string(),
    industry: v.string(),
    vibe: v.string(),
    colors: v.string(),
    layout: v.string(),
    tagline: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('dreamboards', {
      ...args,
      createdAt: Date.now(),
      contacted: false,
    })
  },
})

export const generateTagline = action({
  args: {
    bizName: v.string(),
    industry: v.string(),
  },
  handler: async (_ctx, { bizName, industry }) => {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) throw new Error('GROQ_API_KEY not set')

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'user',
            content: `Generate exactly 1 short tagline (under 10 words) for a ${industry} business called ${bizName}. Just the tagline, nothing else. No quotes.`,
          },
        ],
        max_tokens: 30,
        temperature: 0.8,
      }),
    })

    if (!response.ok) throw new Error('Failed to generate tagline')
    const data = await response.json()
    return data.choices[0].message.content.trim() as string
  },
})
