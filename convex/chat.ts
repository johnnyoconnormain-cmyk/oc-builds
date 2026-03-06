import { action } from './_generated/server'
import { v } from 'convex/values'

const SYSTEM_PROMPT = `You are the OC Builds assistant — a friendly helper for Johnny O'Connor's web agency in Ellensburg, WA. Keep answers short and conversational (2-4 sentences max). Help visitors learn what OC Builds offers and nudge them toward the free audit / contact form.

Services & pricing:
- Website Build: from $399
- AI Chatbot Setup: from $150
- Google Business Setup: from $100
- Social Media Content Pack: from $100/mo
- Automation & Workflows: from $200
- Branding Package: from $150

Packages:
- Starter $399 — 5-page site, Google Business profile, contact form, 30-day support
- Growth $899 — everything in Starter + AI chatbot, social content pack, brand kit, basic SEO
- Full Stack $1,499 — everything in Growth + automations, email marketing, Google Ads page

About Johnny: CWU Construction Management student, plays D-line for the Wildcats, oldest of 7 kids from Bellevue. Every client deals directly with Johnny — no account managers, no handoffs.

Contact: hello@ocbuilds.com | (425) 324-6506 | Ellensburg, WA
Free audit: no obligation, response within 24 hours.

If someone asks a question you can't answer, tell them to reach out directly at (425) 324-6506.`

export const send = action({
  args: {
    messages: v.array(v.object({
      role: v.union(v.literal('user'), v.literal('assistant')),
      content: v.string(),
    })),
  },
  handler: async (_ctx, { messages }) => {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) throw new Error('GROQ_API_KEY not set in Convex environment')

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      throw new Error(`Groq error: ${err}`)
    }

    const data = await response.json()
    return data.choices[0].message.content as string
  },
})
