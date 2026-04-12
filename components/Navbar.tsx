"use client"

import Link from "next/link"
import { Globe } from "lucide-react"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="18" height="18" rx="2" stroke="#000" strokeWidth="2" />
            <path d="M6 10h8M10 6v8" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="font-sans font-semibold text-xs tracking-[0.15em] text-black uppercase">
            Gastrospecs
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-7">
          {["Catalog", "Services", "Projects", "About"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="font-sans text-xs text-black hover:text-gray-500 transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-5">
          <button className="hidden md:flex items-center gap-1 text-xs text-black hover:text-gray-500 transition-colors">
            <Globe className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="tracking-wide">AR / En</span>
          </button>
          <Link
            href="/login"
            className="hidden md:block text-xs text-black hover:text-gray-500 transition-colors"
          >
            Staff Login
          </Link>
          <Link
            href="/quote"
            className="bg-black text-white font-sans text-xs font-medium px-4 py-2 tracking-wide hover:bg-gray-800 transition-colors"
          >
            Request Quote
          </Link>
        </div>

      </div>
    </header>
  )
}
