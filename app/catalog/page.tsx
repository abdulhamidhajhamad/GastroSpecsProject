import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { products, categories } from '@/data/products'

export const metadata: Metadata = {
  title: 'Commercial Kitchen Equipment Catalog | Refrigeration, Grills, Ice Cream Machines | GastroSpecs',
  description:
    'Browse commercial kitchen and butchery equipment. Factory-direct pricing, CE and SASO certified. DDP delivery to Saudi Arabia, UAE, GCC, and worldwide.',
}

export default function CatalogPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-4">
                PRODUCTS — CATALOG
              </p>
              <h1 className="font-sans font-bold text-5xl md:text-6xl tracking-tight text-black uppercase mb-4">
                Heavy Cooking
              </h1>
              <p className="font-sans text-sm text-gray-500 leading-relaxed max-w-lg">
                Professional-grade thermal solutions designed for high-output commercial environments.
                Sourced from global leaders in precision engineering and durability.
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-sans text-xs tracking-[0.15em] text-gray-400 uppercase">
                <span className="font-semibold text-black">1,248</span> PRODUCTS ·{' '}
                <span className="font-semibold text-black">42</span> BRANDS
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-14 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0 overflow-x-auto">
              {categories.map((cat, i) => (
                <button
                  key={cat.id}
                  className={`font-sans text-[10px] tracking-[0.15em] uppercase px-5 py-4 transition-colors whitespace-nowrap border-b-2 ${
                    i === 0
                      ? 'border-black text-black font-semibold'
                      : 'border-transparent text-gray-400 hover:text-black'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-3 shrink-0 ml-6">
              <input
                type="search"
                placeholder="SEARCH CATALOG..."
                className="font-sans text-[10px] tracking-wide placeholder-gray-400 text-black border-l border-gray-200 px-4 py-4 focus:outline-none w-44"
              />
              <button className="font-sans text-[10px] tracking-[0.15em] uppercase text-gray-500 hover:text-black transition-colors px-2">
                FILTERS
              </button>
              <select className="font-sans text-[10px] tracking-wide text-gray-500 border border-gray-200 px-3 py-1.5 focus:outline-none bg-white">
                <option>Manufacturer</option>
                <option>RATIONAL</option>
                <option>HOBART</option>
                <option>WINTERHALTER</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
          {products.map((product) => (
            <div key={product.slug} className="bg-white p-0 group">
              <div className="relative bg-[#1a1a1a] aspect-square overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="w-full h-full bg-gray-700 opacity-30 rounded" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex flex-wrap gap-1">
                    {product.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="font-sans text-[9px] tracking-[0.1em] uppercase text-gray-400 bg-black/50 px-1.5 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-1">
                  {product.brand}
                </p>
                <h3 className="font-sans text-sm font-medium text-black mb-3 leading-tight">
                  {product.name}
                </h3>
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="font-sans text-[9px] tracking-wide uppercase text-gray-400 flex items-center gap-1">
                      <span className="w-1 h-1 bg-gray-300 rounded-full inline-block" />
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/catalog/${product.slug}`}
                  className="block w-full border border-black text-black font-sans text-[10px] tracking-[0.15em] uppercase text-center py-2.5 hover:bg-black hover:text-white transition-colors"
                >
                  Add to Quote Request
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-12">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              className={`w-8 h-8 font-sans text-xs flex items-center justify-center transition-colors ${
                n === 1 ? 'bg-black text-white' : 'text-gray-400 hover:text-black border border-gray-200'
              }`}
            >
              {n}
            </button>
          ))}
          <span className="text-gray-400 font-sans text-xs">...</span>
        </div>

        <div className="mt-16 border border-gray-200 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="font-sans font-semibold text-sm text-black mb-1">Need a Bespoke Solution?</h3>
            <p className="font-sans text-xs text-gray-500 leading-relaxed max-w-sm">
              Our engineering team specializes in custom kitchen layouts and complex procurement logistics for multi-site operations.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/services"
              className="border border-black text-black font-sans text-xs tracking-wide px-6 py-2.5 hover:bg-gray-50 transition-colors"
            >
              View Services
            </Link>
            <Link
              href="/contact"
              className="bg-black text-white font-sans text-xs tracking-wide px-6 py-2.5 hover:bg-gray-800 transition-colors"
            >
              Consult an Expert
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
