import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { caseStudies } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Kitchen Projects & Case Studies | GastroSpecs',
  description:
    'Explore our portfolio of commercial kitchen engineering. From fine-dining concepts to large-scale hotel banquet facilities, each project is delivered DDP worldwide.',
}

export default function ProjectsPage() {
  const [featured, ...rest] = caseStudies

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-5">INSTALL Portfolio</p>
              <h1 className="font-serif text-5xl md:text-6xl text-black mb-2 leading-tight">
                Precision<br />
                <em className="italic">In-Situ.</em>
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400 self-center">
                {caseStudies.length}+ Projects
              </span>
              <Link
                href="/contact"
                className="bg-black text-white font-sans text-xs tracking-[0.15em] uppercase px-6 py-2.5 hover:bg-gray-800 transition-colors"
              >
                Inquire About Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <Link href={`/projects/${featured.slug}`} className="block group mb-2">
          <div className="bg-[#0a0a0a] aspect-[16/7] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-gray-400 mb-2">{featured.category}</p>
              <h2 className="font-serif text-2xl md:text-3xl text-white italic group-hover:underline leading-tight">
                {featured.title}
              </h2>
              <p className="font-sans text-xs text-gray-400 mt-2 leading-relaxed max-w-xl">{featured.description}</p>
            </div>
          </div>
        </Link>
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400">{featured.category}</span>
            <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400">{featured.location}</span>
          </div>
          <Link href={`/projects/${featured.slug}`} className="font-sans text-[10px] tracking-wide text-gray-400 hover:text-black transition-colors">
            Read More →
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-px bg-gray-200">
          {rest.map((project) => (
            <div key={project.slug} className="bg-white">
              <Link href={`/projects/${project.slug}`} className="block group">
                <div className="bg-[#111] aspect-video flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />
                  <div className="absolute inset-0 flex items-end p-6">
                    <div>
                      <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-500 mb-1">{project.category}</p>
                      <p className="font-serif text-lg text-white italic group-hover:underline">{project.title}</p>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="p-4 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400">{project.category}</span>
                  <span className="text-gray-200">·</span>
                  <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400">{project.location}</span>
                </div>
                <Link href={`/projects/${project.slug}`} className="font-sans text-[10px] text-gray-400 hover:text-black transition-colors">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-2 leading-tight">
            Engineering your next<br />
            <em className="italic text-gray-400">Culinary Landmark.</em>
          </h2>
          <p className="font-sans text-sm text-gray-400 mt-6 mb-10 max-w-md mx-auto leading-relaxed">
            Whether you&apos;re opening a boutique bistro or a global hotel chain, our engineering team brings the same level of precision and procurement power to every square inch of your kitchen.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="border border-white text-white font-sans text-xs tracking-[0.15em] uppercase px-8 py-3 hover:bg-white hover:text-black transition-colors"
            >
              Start Your Quote
            </Link>
            <Link
              href="/services"
              className="border border-gray-700 text-gray-400 font-sans text-xs tracking-[0.15em] uppercase px-8 py-3 hover:border-gray-400 transition-colors"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
