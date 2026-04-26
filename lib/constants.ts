export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gastrospecs.com'

export const CONTACT_SUCCESS_PATH = '/contact?submitted=true'

export const PORTAL_LOGIN_PATH = '/portal/login'
export const PORTAL_DASHBOARD_PATH = '/portal/dashboard'
export const PORTAL_SESSION_COOKIE = 'gastrospecs_portal_session'
export const PORTAL_ACCESS_TOKEN_COOKIE = 'gastrospecs_access_token'
export const PORTAL_SESSION_MAX_AGE = 60 * 60 * 12
