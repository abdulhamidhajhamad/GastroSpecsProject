import { NextRequest, NextResponse } from 'next/server'

import {
  PORTAL_DASHBOARD_PATH,
  PORTAL_LOGIN_PATH,
  PORTAL_SESSION_COOKIE,
  PORTAL_SESSION_MAX_AGE,
} from '@/lib/constants'
import { portalLoginSchema } from '@/lib/validations'

function buildLoginRedirect(request: NextRequest, errorCode: string, nextPath?: string) {
  const loginUrl = new URL(PORTAL_LOGIN_PATH, request.url)
  loginUrl.searchParams.set('error', errorCode)

  if (nextPath) {
    loginUrl.searchParams.set('next', nextPath)
  }

  return NextResponse.redirect(loginUrl)
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const parsed = portalLoginSchema.safeParse({
      email: formData.get('email')?.toString() ?? '',
      password: formData.get('password')?.toString() ?? '',
      next: formData.get('next')?.toString(),
    })

    if (!parsed.success) {
      return buildLoginRedirect(request, 'invalid-input')
    }

    const configuredEmail = process.env.PORTAL_LOGIN_EMAIL
    const configuredPassword = process.env.PORTAL_LOGIN_PASSWORD

    const fallbackEnabled = process.env.NODE_ENV !== 'production'
    const hasConfiguredCredentials = Boolean(configuredEmail && configuredPassword)
    const validByEnv = hasConfiguredCredentials
      ? parsed.data.email === configuredEmail && parsed.data.password === configuredPassword
      : false

    const isAuthorized = hasConfiguredCredentials ? validByEnv : fallbackEnabled

    if (!isAuthorized) {
      return buildLoginRedirect(request, 'invalid-credentials', parsed.data.next)
    }

    const targetPath = parsed.data.next ?? PORTAL_DASHBOARD_PATH
    const response = NextResponse.redirect(new URL(targetPath, request.url))

    response.cookies.set(PORTAL_SESSION_COOKIE, 'active', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: PORTAL_SESSION_MAX_AGE,
      path: '/',
    })

    return response
  } catch {
    return buildLoginRedirect(request, 'server-error')
  }
}
