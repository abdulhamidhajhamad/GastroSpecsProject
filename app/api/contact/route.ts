import { NextRequest, NextResponse } from 'next/server'

import { CONTACT_SUCCESS_PATH } from '@/lib/constants'
import { parseContactFormData } from '@/lib/validations'
import type { ApiErrorResponse } from '@/types'

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

    console.log('New quote request:', {
      fullName,
      company,
      email,
      phone,
      scope,
      categories,
      timestamp: new Date().toISOString(),
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
