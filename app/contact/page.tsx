import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Request a Detailed Quote | GastroSpecs',
  description:
    'Submit your project or service brief and our engineering consultants will craft a tailored procurement strategy for your commercial kitchen.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-[280px_1fr] gap-16">
          <div>
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-5">PROJECT PROCUREMENT</p>
            <h1 className="font-serif text-4xl md:text-5xl text-black italic leading-tight mb-6">
              Request a<br />Detailed<br />Quote
            </h1>
            <p className="font-sans text-xs text-gray-500 leading-relaxed mb-10">
              Submit the project or service you need, and our engineering consultants will craft a tailored procurement strategy for your commercial kitchen.
            </p>

            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 border border-gray-200 flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <p className="font-sans text-[10px] tracking-[0.15em] uppercase font-semibold text-black mb-0.5">Standard Response Time</p>
                  <p className="font-sans text-[10px] text-gray-500 leading-relaxed">Initial assessment provided within 48 hours of submission.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 border border-gray-200 flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.17h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.27a16 16 0 0 0 6 6l.88-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z" />
                  </svg>
                </div>
                <div>
                  <p className="font-sans text-[10px] tracking-[0.15em] uppercase font-semibold text-black mb-0.5">Consultation Required</p>
                  <p className="font-sans text-[10px] text-gray-500 leading-relaxed">Complex project requests may require a follow-up site survey or design call.</p>
                </div>
              </div>
            </div>

            <blockquote className="border-l-2 border-gray-200 pl-4">
              <p className="font-serif text-xs text-gray-500 italic leading-relaxed mb-2">
                &ldquo;GastroSpecs&apos; streamlined quote process reduced our procurement timeline by 3 weeks. Precision from the first touchpoint.&rdquo;
              </p>
              <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400">
                — Director of Operations, Ritz-Carlton Doha
              </p>
            </blockquote>
          </div>

          <form action="/api/contact" method="POST" className="space-y-10">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-sans font-semibold text-sm tracking-[0.1em] uppercase text-black">Contact Information</h2>
                <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-gray-300">Section 01</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Alexander Mercer"
                    required
                    className="w-full border border-gray-200 font-sans text-xs text-black placeholder-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-2">Company / Organization</label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Grand Horizon Hotels"
                    className="w-full border border-gray-200 font-sans text-xs text-black placeholder-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-2">Work Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="a.mercer@grandhorizon.com"
                    required
                    className="w-full border border-gray-200 font-sans text-xs text-black placeholder-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-2">Contact Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+974 5555 0000"
                    className="w-full border border-gray-200 font-sans text-xs text-black placeholder-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-sans font-semibold text-sm tracking-[0.1em] uppercase text-black">Project / Service Details</h2>
                <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-gray-300">Section 02</span>
              </div>
              <div className="mb-5">
                <label className="block font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-3">Service Type</label>
                <div className="flex flex-wrap gap-4">
                  {['Bulk Procurement', 'Single Equipment', 'Full Kitchen Fit-Out'].map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" name="category" value={cat} className="accent-black w-3 h-3" />
                      <span className="font-sans text-[10px] tracking-[0.1em] uppercase text-gray-600">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-2">Project Scope & Service Needs</label>
                <textarea
                  name="scope"
                  rows={5}
                  placeholder="Describe the project, service type, equipment requirements, brand preferences, or design constraints..."
                  className="w-full border border-gray-200 font-sans text-xs text-black placeholder-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors resize-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-sans font-semibold text-sm tracking-[0.1em] uppercase text-black">Design Assets</h2>
                <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-gray-300">Section 03</span>
              </div>
              <div className="border-2 border-dashed border-gray-200 p-12 flex flex-col items-center justify-center text-center hover:border-gray-400 transition-colors">
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center mb-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                  </svg>
                </div>
                <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-black font-semibold mb-1">Upload Project Documentation</p>
                <p className="font-sans text-[10px] text-gray-400 mb-4">Drop your blueprints, equipment lists, or CAD files here. Max file size 50MB.</p>
                <label className="border border-gray-200 font-sans text-[10px] tracking-[0.15em] uppercase text-gray-500 px-5 py-2 hover:border-black hover:text-black transition-colors cursor-pointer">
                  Select Files
                  <input type="file" name="files" multiple className="sr-only" accept=".pdf,.dwg,.dxf,.xlsx,.doc,.docx" />
                </label>
              </div>
            </div>

            <div>
              <label className="flex items-start gap-3 cursor-pointer mb-6">
                <input type="checkbox" name="consent" required className="mt-0.5 accent-black" />
                <span className="font-sans text-[10px] text-gray-500 leading-relaxed">
                  I acknowledge that my data will be processed in accordance with the{' '}
                  <a href="/privacy" className="underline hover:text-black">GastroSpecs Privacy Policy</a>{' '}
                  and used strictly for project consultation.
                </span>
              </label>

              <button
                type="submit"
                className="w-full bg-black text-white font-sans text-xs tracking-[0.2em] uppercase py-4 hover:bg-gray-800 transition-colors flex items-center justify-center gap-3"
              >
                Initiate Quote Request
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <p className="mt-3 font-sans text-[10px] text-gray-400 leading-relaxed">
                Submissions are emailed to the address configured in `QUOTE_REQUEST_TO_EMAIL` on the server.
              </p>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
