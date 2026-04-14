import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const fullName = formData.get('fullName')?.toString() ?? ''
    const company = formData.get('company')?.toString() ?? ''
    const email = formData.get('email')?.toString() ?? ''
    const phone = formData.get('phone')?.toString() ?? ''
    const scope = formData.get('scope')?.toString() ?? ''

    if (!fullName || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    console.log('New quote request:', {
      fullName,
      company,
      email,
      phone,
      scope,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.redirect(new URL('/contact?submitted=true', request.url))
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
