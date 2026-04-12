"use client"

import Link from "next/link"
import { Globe, ChevronDown } from "lucide-react"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-gastro-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-gastro-black rounded-sm flex items-center justify-center">
            <div className="w-3 h-3 bg-gastro-black rounded-full" />
          </div>
          <span className="font-semibold text-sm tracking-tight">GASTROSPECS</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/catalog" className="text-sm text-gastro-black hover:text-gray-600 transition-colors">
            Catalog
          </Link>
          <Link href="/services" className="text-sm text-gastro-black hover:text-gray-600 transition-colors">
            Services
          </Link>
          <Link href="/projects" className="text-sm text-gastro-black hover:text-gray-600 transition-colors">
            Projects
          </Link>
          <Link href="/about" className="text-sm text-gastro-black hover:text-gray-600 transition-colors">
            About
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-6">
          {/* Language Selector */}
          <button className="hidden md:flex items-center gap-1 text-sm text-gastro-black hover:text-gray-600 transition-colors">
            <Globe className="w-4 h-4" />
            <span>AR / En</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {/* Staff Login */}
          <Link 
            href="/login" 
            className="hidden md:block text-sm text-gastro-black hover:text-gray-600 transition-colors"
          >
            Staff Login
          </Link>

          {/* Request Quote Button */}
          <Link
            href="/quote"
            className="bg-gastro-black text-gastro-white text-sm font-medium px-4 py-2 hover:bg-gray-800 transition-colors"
          >
            Request Quote
          </Link>
        </div>
      </div>
    </header>
  )
}
