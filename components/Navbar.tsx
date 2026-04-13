import Link from 'next/link'

import { mainNavigation, siteConfig } from '@/lib/home-data'

const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.4" />
    <ellipse cx="9" cy="9" rx="3.5" ry="8" stroke="currentColor" strokeWidth="1.4" />
    <line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.2" />
    <line x1="2.5" y1="5" x2="15.5" y2="5" stroke="currentColor" strokeWidth="1" />
    <line x1="2.5" y1="13" x2="15.5" y2="13" stroke="currentColor" strokeWidth="1" />
  </svg>
)

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2 shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="18" height="18" rx="2" stroke="#000" strokeWidth="2" />
            <path d="M6 10h8M10 6v8" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="font-sans font-semibold text-xs tracking-[0.15em] text-black uppercase">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-xs text-black hover:text-gray-500 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <button
            type="button"
            className="hidden md:flex items-center gap-1 text-xs text-black hover:text-gray-500 transition-colors"
          >
            <GlobeIcon />
            <span className="tracking-wide">{siteConfig.localeLabel}</span>
          </button>
          <Link
            href="/login"
            className="hidden md:block text-xs text-black hover:text-gray-500 transition-colors"
          >
            Staff Login
          </Link>
          <Link
            href={siteConfig.quoteCta.href}
            className="bg-black text-white font-sans text-xs font-medium px-4 py-2 tracking-wide hover:bg-gray-800 transition-colors"
          >
            {siteConfig.quoteCta.label}
          </Link>
        </div>

      </div>
    </header>
  )
}
