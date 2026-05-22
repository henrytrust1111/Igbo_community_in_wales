import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

import config from '@/payload.config'

export const dynamic = 'force-dynamic'

const INQUIRY_TYPES = [
  'General Inquiry',
  'Membership Application',
  'Event Partnership',
  'Volunteer Opportunities',
  'Cultural Heritage Support',
] as const

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FieldErrors = Partial<Record<'fullName' | 'email' | 'inquiryType' | 'message', string>>

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const {
    fullName,
    email,
    inquiryType,
    message,
    __icw_hp_url: honeypot,
  } = body as Record<string, unknown>

  if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
    return NextResponse.json({ ok: true })
  }

  const fieldErrors: FieldErrors = {}
  const fullNameClean = typeof fullName === 'string' ? fullName.trim() : ''
  const emailClean = typeof email === 'string' ? email.trim() : ''
  const messageClean = typeof message === 'string' ? message.trim() : ''
  if (fullNameClean.length < 2) fieldErrors.fullName = 'Please enter your full name.'
  if (!EMAIL_RE.test(emailClean)) fieldErrors.email = 'Please enter a valid email address.'
  if (
    typeof inquiryType !== 'string' ||
    !INQUIRY_TYPES.includes(inquiryType as (typeof INQUIRY_TYPES)[number])
  ) {
    fieldErrors.inquiryType = 'Please choose an inquiry type.'
  }
  if (messageClean.length < 1) fieldErrors.message = 'Please write a message.'

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ error: 'Validation failed', fieldErrors }, { status: 400 })
  }

  const recipient = process.env.CONTACT_EMAIL
  if (!recipient) {
    return NextResponse.json(
      { error: 'Server is not configured to receive contact emails.' },
      { status: 500 },
    )
  }

  try {
    console.log('Sending contact email', {
      fullName: fullNameClean,
      email: emailClean,
      inquiryType,
      message: messageClean,
      recipient,
    })
    const payload = await getPayload({ config: await config })
    await payload.sendEmail({
      to: recipient,
      replyTo: emailClean,
      subject: `[ICW Contact] ${inquiryType} — ${fullNameClean}`,
      html: renderEmailHtml({
        fullName: fullNameClean,
        email: emailClean,
        inquiryType: inquiryType as string,
        message: messageClean,
      }),
      text: renderEmailText({
        fullName: fullNameClean,
        email: emailClean,
        inquiryType: inquiryType as string,
        message: messageClean,
      }),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact email failed', err)
    return NextResponse.json(
      { error: 'We could not send your message right now. Please try again later.' },
      { status: 500 },
    )
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case '&':
        return '&amp;'
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '"':
        return '&quot;'
      case "'":
        return '&#39;'
      default:
        return c
    }
  })
}

type EmailPayload = {
  fullName: string
  email: string
  inquiryType: string
  message: string
}

function renderEmailHtml(p: EmailPayload): string {
  const messageHtml = escapeHtml(p.message).replace(/\n/g, '<br>')
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif; color: #1c1b1b;">
      <h2 style="color: #760000; margin: 0 0 16px;">New contact form submission</h2>
      <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; min-width: 480px;">
        <tr style="background: #f6f3f2;">
          <td style="font-weight: 600;">Name</td>
          <td>${escapeHtml(p.fullName)}</td>
        </tr>
        <tr>
          <td style="font-weight: 600;">Email</td>
          <td><a href="mailto:${escapeHtml(p.email)}">${escapeHtml(p.email)}</a></td>
        </tr>
        <tr style="background: #f6f3f2;">
          <td style="font-weight: 600;">Inquiry Type</td>
          <td>${escapeHtml(p.inquiryType)}</td>
        </tr>
        <tr valign="top">
          <td style="font-weight: 600;">Message</td>
          <td>${messageHtml}</td>
        </tr>
      </table>
      <p style="color: #5b403c; margin-top: 16px; font-size: 12px;">
        Reply directly to this email to respond to the sender.
      </p>
    </div>
  `
}

function renderEmailText(p: EmailPayload): string {
  return [
    `New contact form submission`,
    ``,
    `Name: ${p.fullName}`,
    `Email: ${p.email}`,
    `Inquiry Type: ${p.inquiryType}`,
    ``,
    `Message:`,
    p.message,
  ].join('\n')
}
