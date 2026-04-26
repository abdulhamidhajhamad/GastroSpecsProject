import { NextResponse } from 'next/server';

import { PORTAL_ACCESS_TOKEN_COOKIE, PORTAL_SESSION_COOKIE } from '@/lib/constants';

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set(PORTAL_SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });

  response.cookies.set(PORTAL_ACCESS_TOKEN_COOKIE, '', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });

  return response;
}
