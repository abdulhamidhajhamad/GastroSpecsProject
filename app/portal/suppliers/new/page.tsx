import Link from 'next/link'

import PortalHeader from '@/components/portal/PortalHeader'

export default function NewSupplierPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <PortalHeader />

      <div className="flex-1 p-8 bg-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-sans font-bold text-xl tracking-[0.08em] uppercase text-black">Add New Supplier</h1>
            <p className="font-sans text-xs text-gray-400 mt-1">Create a manufacturing partner profile</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/portal/suppliers"
              className="border border-gray-200 font-sans text-xs tracking-wide text-gray-500 px-4 py-2 hover:border-black hover:text-black transition-colors"
            >
              Cancel
            </Link>
            <button className="bg-black text-white font-sans text-xs tracking-wide px-4 py-2 hover:bg-gray-800 transition-colors">
              Save Supplier
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">Supplier Information</span>
            </div>

            <form className="p-6 grid md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Foshan Titan Heat Solutions Co., Ltd."
                  className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div>
                <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Country</label>
                <input
                  type="text"
                  placeholder="China"
                  className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div>
                <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Province</label>
                <input
                  type="text"
                  placeholder="Guangdong"
                  className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div>
                <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">City</label>
                <input
                  type="text"
                  placeholder="Foshan"
                  className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div>
                <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">District</label>
                <input
                  type="text"
                  placeholder="Nanhai"
                  className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Street</label>
                <input
                  type="text"
                  placeholder="No. 109 Guangfo Equipment Street"
                  className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div>
                <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Website</label>
                <input
                  type="url"
                  placeholder="https://"
                  className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div>
                <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Contact Email</label>
                <input
                  type="email"
                  placeholder="export@factory.com"
                  className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div>
                <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Phone</label>
                <input
                  type="text"
                  placeholder="+86 ..."
                  className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div>
                <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">WeChat</label>
                <input
                  type="text"
                  placeholder="Factory_Official"
                  className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div className="md:col-span-2 flex items-center gap-2 pt-1">
                <input id="ddp" type="checkbox" className="h-4 w-4 border-gray-300" />
                <label htmlFor="ddp" className="font-sans text-xs text-gray-600">DDP Partner</label>
              </div>

              <div className="md:col-span-2">
                <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Notes</label>
                <textarea
                  rows={4}
                  placeholder="Add procurement notes, certifications, and machine categories..."
                  className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors resize-none"
                />
              </div>
            </form>
          </div>

          <div className="border border-gray-200 h-fit">
            <div className="px-5 py-4 border-b border-gray-200">
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">Profile Checklist</span>
            </div>
            <div className="p-5 space-y-4">
              {[
                'Supplier legal company name',
                'Country, province, city, district, and street',
                'Phone, email, and WeChat ID',
                'DDP partner flag',
                'Operational notes',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                  <p className="font-sans text-[10px] text-gray-500 uppercase tracking-wide">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-3 border-t border-gray-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="font-sans text-[10px] uppercase tracking-wide text-gray-500">System Operational</span>
        </div>
        <p className="font-sans text-[9px] text-gray-400">© 2024 GASTROSPECS OPERATIONS. ALL RIGHTS RESERVED.</p>
      </div>
    </div>
  )
}