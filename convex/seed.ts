import { mutation } from './_generated/server'

/**
 * Run this once from the Convex dashboard to seed placeholder portfolio projects.
 * Dashboard → Functions → seed.populate → Run
 */
export const populate = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query('projects').collect()
    if (existing.length > 0) return { message: 'Already seeded', count: existing.length }

    const projects = [
      {
        name: 'El Rancho Barbershop',
        description: 'Full website build + Google Business profile setup. Customers can now find them on Maps and book online.',
        services: ['Website Build', 'Google Business Setup'],
        quote: "Finally started getting calls from people who found us on Google. Worth every penny.",
        featured: true,
      },
      {
        name: 'Peak Fitness Ellensburg',
        description: 'New website with class schedule, a chatbot for FAQs, and a 30-day social media content pack to launch their Instagram.',
        services: ['Website Build', 'AI Chatbot', 'Social Media Pack'],
        quote: "Johnny had the whole thing done in two weeks. Our Instagram went from 80 to 400 followers.",
        featured: true,
      },
      {
        name: 'Cascade Valley Hardware',
        description: 'Full rebrand — new logo, color system, business card design — plus a clean landing page that matches the new look.',
        services: ['Branding Package', 'Website Build'],
        quote: "Looks like we finally caught up with the times. Customers notice it.",
        featured: false,
      },
    ]

    const ids = []
    for (const project of projects) {
      const id = await ctx.db.insert('projects', {
        ...project,
        createdAt: Date.now(),
      })
      ids.push(id)
    }

    return { message: 'Seeded successfully', count: ids.length }
  },
})
