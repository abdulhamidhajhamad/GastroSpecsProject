import { NextRequest, NextResponse } from 'next/server'

import {
  PORTAL_ACCESS_TOKEN_COOKIE,
  PORTAL_DASHBOARD_PATH,
  PORTAL_LOGIN_PATH,
  PORTAL_SESSION_COOKIE,
  PORTAL_SESSION_MAX_AGE,
} from '@/lib/constants'
import { portalLoginSchema } from '@/lib/validations'

function buildBackendAuthLoginUrl() {
  const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL

  if (!rawBaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_API_URL environment variable.')
  }

  const baseUrl = rawBaseUrl.replace(/\/$/, '')
  const hasVersionedPrefix = baseUrl.endsWith('/api/v1')

  return hasVersionedPrefix
    ? `${baseUrl}/auth/login`
    : `${baseUrl}/api/v1/auth/login`
}

function getRedirectOrigin(request: NextRequest) {
  if (process.env.NODE_ENV !== 'production' && request.nextUrl.hostname === '0.0.0.0') {
    return request.nextUrl.origin.replace('0.0.0.0', 'localhost')
  }

  return request.nextUrl.origin
}

function buildRedirectUrl(request: NextRequest, path: string) {
  return new URL(path, getRedirectOrigin(request))
}

function buildLoginRedirect(request: NextRequest, errorCode: string, nextPath?: string) {
  const loginUrl = buildRedirectUrl(request, PORTAL_LOGIN_PATH)
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

    const authResponse = await fetch(buildBackendAuthLoginUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: parsed.data.email,
        password: parsed.data.password,
      }),
      cache: 'no-store',
    })

    if (authResponse.status === 401 || authResponse.status === 403) {
      return buildLoginRedirect(request, 'invalid-credentials', parsed.data.next)
    }

    if (!authResponse.ok) {
      return buildLoginRedirect(request, 'server-error', parsed.data.next)
    }

    const authData = (await authResponse.json()) as { accessToken?: string }

    if (!authData.accessToken) {
      return buildLoginRedirect(request, 'server-error', parsed.data.next)
    }

    const targetPath = parsed.data.next ?? PORTAL_DASHBOARD_PATH
    const response = NextResponse.redirect(buildRedirectUrl(request, targetPath))

    response.cookies.set(PORTAL_SESSION_COOKIE, 'active', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: PORTAL_SESSION_MAX_AGE,
      path: '/',
    })

    response.cookies.set(PORTAL_ACCESS_TOKEN_COOKIE, authData.accessToken, {
      httpOnly: false,
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
