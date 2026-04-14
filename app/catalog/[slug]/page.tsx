import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getProductBySlug, products } from '@/data/products'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Product Not Found | GastroSpecs' }
  return {
    title: `${product.name} | ${product.brand} | GastroSpecs`,
    description: product.description,
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const relatedProducts = (product.related || [])
    .map((s) => getProductBySlug(s))
    .filter(Boolean) as typeof products

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="font-sans text-[10px] tracking-wide text-gray-400 uppercase flex items-center gap-2">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-black transition-colors">Catalog</Link>
          <span>/</span>
          <span className="text-black">{product.category.toUpperCase()}</span>
        </nav>
      </div>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-[#f0f0f0] aspect-square flex items-center justify-center mb-4 relative">
              <div className="w-3/4 h-3/4 bg-gray-300 rounded flex items-center justify-center">
                <span className="font-sans text-xs text-gray-500 uppercase tracking-wide">{product.brand}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[#f0f0f0] aspect-square flex items-center justify-center">
                  <div className="w-2/3 h-2/3 bg-gray-300 rounded" />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-px mt-4 bg-gray-200">
              <div className="bg-white p-4 flex items-start gap-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400 mt-0.5 shrink-0">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <div>
                  <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-1">Architectural Integration</p>
                  <p className="font-sans text-[10px] text-gray-600">Download BIM & CAD files for seamless kitchen layout planning.</p>
                </div>
              </div>
              <div className="bg-white p-4 flex items-start gap-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400 mt-0.5 shrink-0">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                <div>
                  <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-1">DDP Guaranteed</p>
                  <p className="font-sans text-[10px] text-gray-600">Full logistics management including customs and onsite delivery.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-3">{product.brand}</p>
            <h1 className="font-serif text-3xl md:text-4xl text-black leading-tight mb-4 italic">
              {product.name}
            </h1>
            <p className="font-sans text-sm text-gray-500 leading-relaxed mb-6">{product.description}</p>

            <div className="flex items-center gap-8 py-5 border-t border-b border-gray-200 mb-6">
              <div>
                <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-1">DDP Quote Available</p>
                <p className="font-sans font-bold text-sm text-black">{product.price}{product.priceHigh ? ` – ${product.priceHigh}` : ''}</p>
              </div>
              <div>
                <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-1">Lead Time</p>
                <p className="font-sans font-bold text-sm text-black">{product.leadTime}</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400">Technical Specifications</p>
                <span className={`font-sans text-[10px] tracking-wide px-2 py-1 ${product.inStock ? 'text-green-700 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                  {product.inStock ? '● IN STOCK (LIMITED)' : '● OUT OF STOCK'}
                </span>
              </div>
              <div className="border-t border-gray-100">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between py-2.5 border-b border-gray-100">
                    <span className="font-sans text-[10px] tracking-[0.1em] uppercase text-gray-400">{spec.label}</span>
                    <span className="font-sans text-xs text-black font-medium text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/contact"
              className="block w-full bg-black text-white font-sans text-xs tracking-[0.15em] uppercase text-center py-4 hover:bg-gray-800 transition-colors mb-3"
            >
              Request Custom Quote
            </Link>

            <div className="grid grid-cols-2 gap-2 mb-6">
              <button className="border border-gray-200 font-sans text-[10px] tracking-[0.15em] uppercase text-gray-500 py-2.5 hover:border-black hover:text-black transition-colors flex items-center justify-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                </svg>
                Spec Sheet
              </button>
              <button className="border border-gray-200 font-sans text-[10px] tracking-[0.15em] uppercase text-gray-500 py-2.5 hover:border-black hover:text-black transition-colors flex items-center justify-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
                  <path d="M6 9v6M21 15l-9-6" />
                </svg>
                Compare
              </button>
            </div>

            <p className="font-sans text-[10px] text-gray-400 tracking-wide mb-4">
              QUESTIONS? CONSULT AN ENGINEER: +971 50 123 4567
            </p>

            <div className="flex items-start gap-3 bg-gray-50 p-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400 mt-0.5 shrink-0">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <p className="font-sans text-[10px] text-gray-500 leading-relaxed">
                <span className="font-semibold text-black uppercase tracking-wide">Global Shipping</span><br />
                Door-to-door delivery with full insurance coverage. Handled by our specialist transit partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="border-t border-gray-200 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-xl text-black italic">Complete the Line</h2>
              <Link href="/catalog" className="font-sans text-xs text-gray-400 hover:text-black transition-colors flex items-center gap-1">
                Browse Full Catalog →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200">
              {relatedProducts.map((rel) => (
                <Link key={rel.slug} href={`/catalog/${rel.slug}`} className="bg-white group block">
                  <div className="bg-[#1a1a1a] aspect-video flex items-center justify-center">
                    <div className="w-2/3 h-2/3 bg-gray-600 rounded opacity-50" />
                  </div>
                  <div className="p-4">
                    <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-1">{rel.category.toUpperCase()}</p>
                    <p className="font-sans text-sm text-black font-medium group-hover:underline">{rel.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
