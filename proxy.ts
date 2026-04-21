import { NextResponse, type NextRequest } from 'next/server'

import {
  PORTAL_DASHBOARD_PATH,
  PORTAL_LOGIN_PATH,
  PORTAL_SESSION_COOKIE,
} from '@/lib/constants'

function getRedirectOrigin(request: NextRequest) {
  if (process.env.NODE_ENV !== 'production' && request.nextUrl.hostname === '0.0.0.0') {
    return request.nextUrl.origin.replace('0.0.0.0', 'localhost')
  }

  return request.nextUrl.origin
}

function buildRedirectUrl(request: NextRequest, path: string) {
  return new URL(path, getRedirectOrigin(request))
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (!pathname.startsWith('/portal')) {
    return NextResponse.next()
  }

  const hasPortalSession = Boolean(request.cookies.get(PORTAL_SESSION_COOKIE)?.value)
  const isPortalLoginPath = pathname === PORTAL_LOGIN_PATH

  if (isPortalLoginPath && hasPortalSession) {
    return NextResponse.redirect(buildRedirectUrl(request, PORTAL_DASHBOARD_PATH))
  }

  if (!isPortalLoginPath && !hasPortalSession) {
    const loginUrl = buildRedirectUrl(request, PORTAL_LOGIN_PATH)
    loginUrl.searchParams.set('next', `${pathname}${search}`)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/portal/:path*'],
}
