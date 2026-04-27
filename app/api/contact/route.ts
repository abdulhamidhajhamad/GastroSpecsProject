import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'

import { CONTACT_SUCCESS_PATH } from '@/lib/constants'
import { parseContactFormData } from '@/lib/validations'
import type { ApiErrorResponse } from '@/types'

export const runtime = 'nodejs'

function buildEmailTransport() {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT ?? '587')
  const secure = (process.env.SMTP_SECURE ?? 'false').toLowerCase() === 'true'
  const user = process.env.SMTP_USER
  const password = process.env.SMTP_PASSWORD

  if (!host || !user || !password) {
    throw new Error('Missing SMTP_HOST, SMTP_USER, or SMTP_PASSWORD environment variables.')
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass: password,
    },
  })
}

function getRecipientEmail() {
  const recipient = process.env.QUOTE_REQUEST_TO_EMAIL?.trim() || process.env.PORTAL_LOGIN_EMAIL?.trim()

  if (!recipient) {
    throw new Error('Missing QUOTE_REQUEST_TO_EMAIL or PORTAL_LOGIN_EMAIL environment variable.')
  }

  return recipient
}

function formatRequestEmailBody(input: {
  fullName: string
  company?: string
  email: string
  phone?: string
  categories: string[]
  scope?: string
}) {
  const lines = [
    `Full Name: ${input.fullName}`,
    `Company / Organization: ${input.company || 'N/A'}`,
    `Work Email: ${input.email}`,
    `Contact Number: ${input.phone || 'N/A'}`,
    `Service Type: ${input.categories.length > 0 ? input.categories.join(', ') : 'N/A'}`,
    '',
    'Project / Service Details:',
    input.scope?.trim() || 'N/A',
  ]

  return lines.join('\n')
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const parsed = parseContactFormData(formData)
    if (!parsed.success) {
      const validationError: ApiErrorResponse = {
        success: false,
        error: 'Invalid quote request payload.',
        details: parsed.error.flatten().fieldErrors,
      }
      return NextResponse.json(validationError, { status: 400 })
    }

    const { fullName, company, email, phone, scope, categories } = parsed.data

    const recipientEmail = getRecipientEmail()
    const transport = buildEmailTransport()
    const subjectParts = [fullName, categories.length > 0 ? categories.join(' / ') : 'Project Request']
    const subject = `GastroSpecs Quote Request - ${subjectParts.join(' - ')}`
    const textBody = formatRequestEmailBody({ fullName, company, email, phone, categories, scope })
    const htmlBody = textBody
      .split('\n')
      .map((line) => (line === '' ? '<br />' : line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')))
      .join('<br />')

    await transport.sendMail({
      from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
      to: recipientEmail,
      replyTo: email,
      subject,
      text: textBody,
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">${htmlBody}</div>`,
    })

    return NextResponse.redirect(new URL(CONTACT_SUCCESS_PATH, request.url))
  } catch (error) {
    console.error('Contact form error:', error)

    const serverError: ApiErrorResponse = {
      success: false,
      error: 'Internal server error.',
    }

    return NextResponse.json(serverError, { status: 500 })
  }
}
