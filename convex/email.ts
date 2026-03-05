import { internalAction } from './_generated/server'
import { v } from 'convex/values'

export const sendNotification = internalAction({
  args: {
    name: v.string(),
    business: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (_ctx, args) => {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) return

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'OC Builds <onboarding@resend.dev>',
        to: 'OCbuilds1@outlook.com',
        reply_to: args.email,
        subject: `New lead: ${args.name} — ${args.business}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #fff;">
            <div style="border-left: 4px solid #FF6B2B; padding-left: 16px; margin-bottom: 24px;">
              <h2 style="margin: 0; color: #1a1a1a; font-size: 22px;">New OC Builds Lead</h2>
              <p style="margin: 4px 0 0; color: #999; font-size: 13px;">Someone filled out the contact form</p>
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; color: #999; width: 90px;">Name</td>
                <td style="padding: 10px 0; font-weight: 600; color: #1a1a1a;">${args.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; color: #999;">Business</td>
                <td style="padding: 10px 0; font-weight: 600; color: #1a1a1a;">${args.business}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; color: #999;">Email</td>
                <td style="padding: 10px 0;">
                  <a href="mailto:${args.email}" style="color: #FF6B2B; text-decoration: none;">${args.email}</a>
                </td>
              </tr>
              ${args.phone ? `
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; color: #999;">Phone</td>
                <td style="padding: 10px 0;">
                  <a href="tel:${args.phone}" style="color: #FF6B2B; text-decoration: none;">${args.phone}</a>
                </td>
              </tr>` : ''}
            </table>
            <div style="margin-top: 20px; padding: 16px; background: #f8f6f3; border-radius: 8px; font-size: 14px;">
              <p style="margin: 0 0 8px; color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
              <p style="margin: 0; color: #1a1a1a; line-height: 1.6;">${args.message.replace(/\n/g, '<br>')}</p>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #bbb;">
              Hit reply to respond directly to ${args.name}.
            </p>
          </div>
        `,
      }),
    })
  },
})
