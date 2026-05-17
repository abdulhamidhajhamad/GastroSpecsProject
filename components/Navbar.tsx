'use client'

import { useState } from 'react'
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2 shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="18" height="18" rx="2" stroke="#000" strokeWidth="2" />
            <path d="M6 10h8M10 6v8" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="font-sans font-semibold text-xs tracking-[0.15em] text-black uppercase truncate max-w-[150px] sm:max-w-none">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center md:gap-4 lg:gap-7 flex-1 px-4 text-center">
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-xs text-black whitespace-nowrap hover:text-gray-500 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 lg:gap-5 shrink-0">
          <button
            type="button"
            className="hidden md:flex items-center gap-1.5 text-xs text-black hover:text-gray-500 transition-colors shrink-0"
          >
            <GlobeIcon />
            <span className="tracking-wide whitespace-nowrap">{siteConfig.localeLabel}</span>
          </button>
          
          <Link
            href={siteConfig.quoteCta.href}
            className="hidden sm:flex bg-black text-white font-sans text-xs font-medium px-4 py-2 tracking-wide hover:bg-gray-800 transition-colors shrink-0 whitespace-nowrap"
          >
            {siteConfig.quoteCta.label}
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="md:hidden p-2 text-black hover:opacity-70 transition-opacity"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-white border-b border-gray-200 shadow-lg px-4 py-6 flex flex-col gap-6">
          <nav className="flex flex-col gap-4">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-sans text-sm text-black font-medium hover:text-gray-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="h-px bg-gray-100 w-full" />
          
          <div className="flex flex-col gap-4">
            <button
              type="button"
              className="flex items-center gap-2 text-sm text-black hover:text-gray-500 transition-colors"
            >
              <GlobeIcon />
              <span className="tracking-wide font-medium">{siteConfig.localeLabel}</span>
            </button>
            
            <Link
              href={siteConfig.quoteCta.href}
              className="bg-black text-center text-white font-sans text-sm font-medium px-4 py-3 tracking-wide hover:bg-gray-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {siteConfig.quoteCta.label}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
