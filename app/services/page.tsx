import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { services, processSteps } from '@/data/services'

export const metadata: Metadata = {
  title: 'Sourcing and Kitchen Design Services | GastroSpecs',
  description:
    'From single product sourcing to full kitchen consultancy. Factory-direct pricing, CAD design, DDP logistics, and after-sales support worldwide.',
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-5">ENGINEERING EXCELLENCE</p>
          <h1 className="font-serif text-5xl md:text-6xl text-black italic mb-6 leading-tight">
            Sourcing and Kitchen<br />Design
          </h1>
          <p className="font-sans text-sm text-gray-500 leading-relaxed max-w-lg">
            From a single unit sourced to a seamless integration of high-performance equipment and engineered workflow design.
          </p>
        </div>
      </section>

      <section className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-gray-200">
            {processSteps.map((step) => (
              <div key={step.number} className="py-6 px-4 first:pl-0">
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-300 mb-2">{step.number}</p>
                <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-black font-semibold">{step.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="space-y-0">
          {services.map((service, index) => (
            <div key={service.id} className={`grid md:grid-cols-2 gap-0 border-b border-gray-200 ${index % 2 === 0 ? '' : 'md:[&>div:first-child]:order-2'}`}>
              <div className="bg-[#0a0a0a] aspect-video md:aspect-auto min-h-64 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-80" />
                <div className="relative z-10 text-center p-8">
                  <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gray-500 mb-2">{service.subtitle}</p>
                  <p className="font-serif text-4xl text-white/20 font-bold">{service.number}</p>
                </div>
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 border border-black flex items-center justify-center">
                    <span className="font-sans text-[10px] font-bold text-black">{service.number}</span>
                  </div>
                  <h2 className="font-sans font-semibold text-base text-black tracking-tight">{service.title}</h2>
                </div>
                <p className="font-sans text-sm text-gray-500 leading-relaxed mb-7">{service.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <span className="text-gray-300 font-sans text-xs">✓</span>
                      <span className="font-sans text-[10px] tracking-[0.1em] uppercase text-gray-500">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-8">Design Portfolio</h2>
          <div className="flex items-center justify-between mb-6">
            <p className="font-sans text-sm text-gray-500">A glimpse into the technical layouts we have built into numerous high-performing commercial kitchens, hospitality facilities, and busy hotel chains.</p>
            <Link href="/projects" className="font-sans text-xs text-gray-400 hover:text-black transition-colors shrink-0 ml-6">
              View All Projects →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-px bg-gray-200">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-[#111] aspect-video flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />
                <div className="relative z-10 text-center p-6">
                  <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-500">Kitchen Design {i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white italic mb-4">
            Ready to Optimize Your Space?
          </h2>
          <p className="font-sans text-sm text-gray-400 mb-8 max-w-lg mx-auto leading-relaxed">
            Our engineering team will collaborate with you to select the right equipment combination and build a high-capability report fit for your next project.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-black font-sans text-xs tracking-[0.15em] uppercase px-8 py-3 hover:bg-gray-100 transition-colors"
            >
              Request Site Survey
            </Link>
            <Link
              href="/contact"
              className="border border-gray-600 text-white font-sans text-xs tracking-[0.15em] uppercase px-8 py-3 hover:border-white transition-colors"
            >
              10–15 MINUTES →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
