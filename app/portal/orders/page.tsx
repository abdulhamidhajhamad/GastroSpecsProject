import PortalHeader from '@/components/portal/PortalHeader'

const orders = [
  { id: 'GS-99 021', client: 'The Ritz-Carlton', dest: 'Germany Branch', supplier: 'RATIONAL AG', eta: 'Nov 07, 2023', status: 'In Transit' },
  { id: 'GS-99 018', client: 'Bulgari Hotel', dest: 'Switzerland Branch', supplier: 'WINTERHALTER', eta: 'Oct 28, 2023', status: 'Customs Clearance' },
  { id: 'GS-98 994', client: 'Nobu Dubai', dest: 'Spain Branch', supplier: 'JOSPER', eta: 'Oct 15, 2023', status: 'Delivered' },
  { id: 'GS-98 982', client: 'Atlantis The Royal', dest: 'USA Branch', supplier: 'HOBART', eta: 'Nov 12, 2023', status: 'Processing' },
  { id: 'GS-98 971', client: 'St. Regis Riyadh', dest: 'Italy Branch', supplier: 'ELECTROLUX', eta: 'Oct 22, 2023', status: 'In Transit' },
]

const milestones = [
  { label: 'FACTORY DISPATCH', date: 'Oct 12, 2023', done: true },
  { label: 'PORT OF HAMBURG (LOADING)', date: 'Oct 15, 2023', done: true },
  { label: 'SEA FREIGHT (IN TRANSIT)', date: 'Oct 16 – Nov 02', done: true, active: true },
  { label: 'JEBEL ALI PORT (ARRIVAL)', date: 'EST. Nov 03', done: false },
  { label: 'CUSTOMS CLEARANCE', date: 'EST. Nov 05', done: false },
  { label: 'LAST MILE DELIVERY', date: 'EST. Nov 01', done: false },
]

const ddpCosts = [
  { label: 'Equipment For Value', amount: '$42,500.00' },
  { label: 'Ocean Freight & Insurance', amount: '$3,200.00' },
  { label: 'Import Duty (5%)', amount: '$2,125.00' },
  { label: 'Customs Surcharge', amount: '$450.00' },
  { label: 'Local Port Handling', amount: '$850.00' },
  { label: 'Last Mile Transport', amount: '$1,200.00' },
]

const statusStyle: Record<string, string> = {
  'In Transit': 'bg-black text-white',
  'Customs Clearance': 'border border-gray-400 text-gray-600',
  Delivered: 'border border-gray-200 text-gray-500',
  Processing: 'border border-gray-200 text-gray-500',
}

export default function OrdersPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <PortalHeader />
      <div className="flex-1 p-8 bg-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-serif text-3xl text-black italic">Orders & Shipments</h1>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400 mt-1">Logistics Management & DDP Cost Control</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="border border-gray-200 font-sans text-xs tracking-wide text-gray-500 px-4 py-2 hover:border-black hover:text-black transition-colors flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export Manifest
            </button>
            <button className="bg-black text-white font-sans text-xs tracking-wide px-4 py-2 hover:bg-gray-800 transition-colors flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Shipment
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <div>
            <div className="border border-gray-200 overflow-hidden mb-6">
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-semibold text-black">Active Consignments</span>
                  <span className="font-sans text-[9px] text-gray-400">12 Total</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-gray-400 hover:text-black">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                  </button>
                  <button className="text-gray-400 hover:text-black">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
                    </svg>
                  </button>
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {['Order ID', 'Client / Destination', 'Supplier', 'ETA', 'Status', 'Actions'].map((col) => (
                      <th key={col} className="px-4 py-2.5 text-left font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 font-normal">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3.5 font-sans text-xs font-semibold text-black whitespace-nowrap">{order.id}</td>
                      <td className="px-4 py-3.5">
                        <p className="font-sans text-xs font-semibold text-black">{order.client}</p>
                        <p className="font-sans text-[9px] uppercase tracking-wide text-gray-400">{order.dest}</p>
                      </td>
                      <td className="px-4 py-3.5 font-sans text-xs text-gray-500">{order.supplier}</td>
                      <td className="px-4 py-3.5 font-sans text-xs text-gray-500">{order.eta}</td>
                      <td className="px-4 py-3.5">
                        <span className={`font-sans text-[9px] tracking-[0.1em] uppercase px-2 py-1 font-semibold ${statusStyle[order.status]}`}>{order.status}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <button className="text-gray-300 hover:text-black transition-colors">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-3 gap-px bg-gray-200">
              {[
                { label: 'Freight in Transit', value: '8', icon: '🚢' },
                { label: 'Customs Hold', value: '2', icon: '⏳' },
                { label: 'Port Arrivals Today', value: '3', icon: '⚓' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white px-6 py-5">
                  <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-2">{stat.label}</p>
                  <p className="font-serif text-3xl font-bold text-black">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-1">Active Tracking</p>
                  <p className="font-serif text-2xl font-bold text-black">GS-99021</p>
                </div>
                <button className="text-gray-400 hover:text-black transition-colors">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-1">Carrier</p>
                  <p className="font-sans text-xs font-semibold text-black">MAERSK LINE</p>
                </div>
                <div>
                  <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-1">Vessel</p>
                  <p className="font-sans text-xs font-semibold text-black">EMMA MAERSK</p>
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-200 px-4 py-3">
                <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-1">Tracking ID</p>
                <p className="font-sans text-xs font-mono text-black">MSK-771-ADX-990</p>
              </div>
            </div>

            <div className="border border-gray-200 p-5">
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold mb-4">Live Milestone Tracking</p>
              <div className="space-y-3">
                {milestones.map((m, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${m.done ? 'bg-black border-black' : 'border-gray-200'}`}>
                      {m.done && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <p className={`font-sans text-[9px] tracking-[0.1em] uppercase font-semibold ${m.done ? 'text-black' : 'text-gray-400'}`}>{m.label}</p>
                      <p className="font-sans text-[9px] text-gray-400 mt-0.5">{m.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-gray-200 p-5">
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold mb-4">DDP Cost Breakdown</p>
              <div className="space-y-2.5 mb-4">
                {ddpCosts.map((cost) => (
                  <div key={cost.label} className="flex items-center justify-between">
                    <span className="font-sans text-[10px] text-gray-500">{cost.label}</span>
                    <span className="font-sans text-[10px] font-medium text-black">{cost.amount}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
                <span className="font-sans text-xs font-semibold text-black">Total Landed Cost (DDP)</span>
                <span className="font-sans text-sm font-bold text-black">$50,325.00</span>
              </div>
              <p className="font-sans text-[8px] text-gray-400 mt-2 leading-relaxed">
                * Estimates based on current exchange rates and port tariffs. Final billing subject to actual customs assessment.
              </p>
              <button className="w-full border border-gray-200 font-sans text-[10px] tracking-[0.15em] uppercase text-gray-400 py-2.5 mt-4 hover:border-black hover:text-black transition-colors flex items-center justify-center gap-2">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                </svg>
                View Full Logistics Invoice
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-3 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="font-sans text-[10px] uppercase tracking-wide text-gray-500">System Operational</span>
        </div>
        <p className="font-sans text-[9px] text-gray-400">© 2024 GASTROSPECS OPERATIONS. ALL RIGHTS RESERVED.</p>
      </div>
    </div>
  )
}
