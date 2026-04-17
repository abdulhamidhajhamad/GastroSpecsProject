import { NextResponse, type NextRequest } from 'next/server'

import {
  PORTAL_DASHBOARD_PATH,
  PORTAL_LOGIN_PATH,
  PORTAL_SESSION_COOKIE,
} from '@/lib/constants'

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (!pathname.startsWith('/portal')) {
    return NextResponse.next()
  }

  const hasPortalSession = Boolean(request.cookies.get(PORTAL_SESSION_COOKIE)?.value)
  const isPortalLoginPath = pathname === PORTAL_LOGIN_PATH

  if (isPortalLoginPath && hasPortalSession) {
    return NextResponse.redirect(new URL(PORTAL_DASHBOARD_PATH, request.url))
  }

  if (!isPortalLoginPath && !hasPortalSession) {
    const loginUrl = new URL(PORTAL_LOGIN_PATH, request.url)
    loginUrl.searchParams.set('next', `${pathname}${search}`)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/portal/:path*'],
}
