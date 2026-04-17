import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Staff Login | GastroSpecs Portal',
}

type PageProps = {
  searchParams: Promise<{ error?: string; next?: string }>
}

function getLoginErrorMessage(errorCode?: string) {
  if (errorCode === 'invalid-input') {
    return 'Please provide a valid staff email and password.'
  }

  if (errorCode === 'invalid-credentials') {
    return 'Authentication failed. Please verify your credentials.'
  }

  if (errorCode === 'server-error') {
    return 'An unexpected error occurred. Please try again.'
  }

  return null
}

export default async function PortalLoginPage({ searchParams }: PageProps) {
  const { error, next } = await searchParams
  const errorMessage = getLoginErrorMessage(error)
  const safeNextPath =
    typeof next === 'string' && next.startsWith('/portal/') && next !== '/portal/login'
      ? next
      : '/portal/dashboard'

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center justify-end px-8 py-5">
        <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-black transition-colors font-sans">
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.4" />
            <ellipse cx="9" cy="9" rx="3.5" ry="8" stroke="currentColor" strokeWidth="1.4" />
            <line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <span className="tracking-wide">العربية</span>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-[420px]">
          <div className="text-center mb-10">
            <Link href="/" className="inline-flex flex-col items-center gap-3">
              <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                <rect x="1" y="1" width="40" height="40" rx="6" stroke="#000" strokeWidth="2.5" />
                <path d="M14 21h14M21 14v14" stroke="#000" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="font-sans font-semibold text-sm tracking-[0.2em] text-black uppercase">GASTROSPECS</span>
            </Link>
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gray-400 mt-3">INTERNAL OPERATIONS</p>
            <p className="font-sans font-semibold text-base tracking-[0.15em] uppercase text-black">STAFF PORTAL</p>
          </div>

          <div className="border border-gray-200 p-8">
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 px-4 py-3 mb-8">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400 shrink-0">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <div>
                <p className="font-sans text-[9px] tracking-[0.2em] uppercase font-semibold text-black">Multi-Factor Auth</p>
                <p className="font-sans text-[9px] text-gray-400 tracking-wide uppercase">Standard security protocol active</p>
              </div>
            </div>

            <form action="/api/portal/login" method="POST" className="space-y-5">
              <input type="hidden" name="next" value={safeNextPath} />
              <div>
                <label className="block font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-2">Staff Email</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@gastrospecs.com"
                    required
                    className="w-full border border-gray-200 font-sans text-xs text-black placeholder-gray-300 pl-10 pr-4 py-3 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400">Password</label>
                  <button type="button" className="font-sans text-[9px] text-gray-400 hover:text-black transition-colors">Forgot Access?</button>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full border border-gray-200 font-sans text-xs text-black pl-10 pr-4 py-3 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              {errorMessage && (
                <p className="font-sans text-[10px] text-red-600">{errorMessage}</p>
              )}

              <button
                type="submit"
                className="w-full bg-black text-white font-sans text-xs tracking-[0.2em] uppercase py-3.5 hover:bg-gray-800 transition-colors flex items-center justify-center gap-3 mt-6"
              >
                Authenticate
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </form>

            <div className="flex items-center justify-center gap-2 mt-6">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-300">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400">
                Issues logging in? Contact IT Engineering
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            {['Security Policy', 'Privacy Vault', 'Support'].map((item) => (
              <a key={item} href="#" className="font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 hover:text-black transition-colors">
                {item}
              </a>
            ))}
          </div>
          <p className="text-center font-sans text-[9px] text-gray-300 tracking-wide mt-3">
            © 2024 GASTROSPECS ENGINEERING GROUP. SECURE ENVIRONMENT.
          </p>
        </div>
      </div>
    </main>
  )
}
