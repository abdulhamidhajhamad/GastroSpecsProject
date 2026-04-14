import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About GastroSpecs | Global Kitchen Procurement Agency',
  description:
    'GastroSpecs is a global specialist procurement agency for commercial kitchen and butchery equipment. Based in Palestine, serving clients worldwide with DDP delivery.',
}

const values = [
  {
    number: '01',
    title: 'Factory-Direct Integrity',
    description:
      'We reveal the real factory price and charge a transparent 10% commission. No hidden markups, no ambiguity — just honest sourcing.',
  },
  {
    number: '02',
    title: 'Technical Precision',
    description:
      'Our team understands motor specs, steel grades, CE and SASO certifications, and the engineering nuances that separate adequate equipment from excellent equipment.',
  },
  {
    number: '03',
    title: 'End-to-End Accountability',
    description:
      'From the factory floor to your kitchen door, we manage every step. DDP means you receive cleared, insured, delivered equipment — nothing less.',
  },
  {
    number: '04',
    title: 'Global Reach, Local Knowledge',
    description:
      'Based in Palestine, operating across the GCC, Africa, and Europe. Our network of after-sales technicians in target markets ensures post-delivery support.',
  },
]

const team = [
  { name: 'Ahmad Al-Masri', title: 'Founder & CEO', location: 'Ramallah, Palestine' },
  { name: 'Sarah Jenkins', title: 'Head of Kitchen Design', location: 'Dubai, UAE' },
  { name: 'Marcus Chen', title: 'Director of Procurement', location: 'Hong Kong' },
  { name: 'Elena Rodriguez', title: 'Logistics Director', location: 'Rotterdam, NL' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-5">THE COMPANY</p>
              <h1 className="font-serif text-5xl md:text-6xl text-black italic leading-tight mb-6">
                Built for the<br />world&apos;s best<br />kitchens.
              </h1>
              <p className="font-sans text-sm text-gray-500 leading-relaxed max-w-md">
                GastroSpecs is a global specialist procurement agency for commercial kitchen and butchery equipment.
                Based in Palestine and serving clients worldwide, we source directly from certified Chinese factories
                and deliver DDP to your door — anywhere in the world.
              </p>
            </div>
            <div className="bg-[#f5f5f5] aspect-video flex items-center justify-center">
              <div className="text-center">
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400">Est. 2018</p>
                <p className="font-serif text-6xl text-black/10 font-bold mt-2">GS</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
            {[
              { value: '45+', label: 'Countries Served' },
              { value: '10k+', label: 'Items Sourced' },
              { value: '20–40%', label: 'Average Savings vs. Local' },
              { value: '100%', label: 'DDP Delivery Rate' },
            ].map((stat) => (
              <div key={stat.label} className="py-10 px-8 first:pl-0">
                <p className="font-serif text-4xl font-bold text-black mb-2">{stat.value}</p>
                <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-6">WHAT WE DO</p>
            <h2 className="font-serif text-3xl text-black italic mb-6 leading-tight">Three services. One mission.</h2>
            <div className="space-y-6">
              {[
                {
                  title: 'Single Product Sourcing',
                  desc: 'One machine, any quantity from 1 unit. We find the best factory price and deliver DDP anywhere in the world.',
                },
                {
                  title: 'Full Kitchen Consultancy',
                  desc: 'Layout design + complete equipment package for new restaurant or hotel openings. CAD-designed, engineered to spec.',
                },
                {
                  title: 'Bulk Orders',
                  desc: 'Same spec across many units. Volume pricing, consolidated DDP shipping for chains and franchises.',
                },
              ].map((item) => (
                <div key={item.title} className="border-l-2 border-black pl-5">
                  <h3 className="font-sans font-semibold text-sm text-black mb-1">{item.title}</h3>
                  <p className="font-sans text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-6">OUR MARKETS</p>
            <h2 className="font-serif text-3xl text-black italic mb-6 leading-tight">Serving clients in every region.</h2>
            <div className="grid grid-cols-2 gap-3">
              {['Saudi Arabia', 'UAE', 'Qatar', 'Jordan', 'Egypt', 'Kenya', 'Europe', 'Worldwide'].map((market) => (
                <div key={market} className="flex items-center gap-2 py-2 border-b border-gray-100">
                  <span className="w-1 h-1 bg-black rounded-full" />
                  <span className="font-sans text-xs text-gray-600">{market}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 border-t border-b border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-10">OUR VALUES</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.number}>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-300 mb-3">{value.number}</p>
                <h3 className="font-sans font-semibold text-sm text-black mb-3">{value.title}</h3>
                <p className="font-sans text-xs text-gray-500 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-10">THE TEAM</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member) => (
            <div key={member.name}>
              <div className="bg-gray-100 aspect-square mb-4 flex items-center justify-center">
                <span className="font-serif text-3xl text-gray-300">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </span>
              </div>
              <p className="font-sans font-semibold text-sm text-black">{member.name}</p>
              <p className="font-sans text-xs text-gray-400 mt-0.5">{member.title}</p>
              <p className="font-sans text-[10px] text-gray-300 mt-1 tracking-wide">{member.location}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-3xl text-white italic">Work with us.</h2>
            <p className="font-sans text-sm text-gray-400 mt-3 max-w-sm leading-relaxed">
              Whether you are opening your first restaurant or scaling a global chain, our team is ready.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link
              href="/contact"
              className="bg-white text-black font-sans text-xs tracking-[0.15em] uppercase px-8 py-3 hover:bg-gray-100 transition-colors"
            >
              Get a Custom Quote
            </Link>
            <Link
              href="/services"
              className="border border-gray-600 text-gray-400 font-sans text-xs tracking-[0.15em] uppercase px-8 py-3 hover:border-white hover:text-white transition-colors"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
