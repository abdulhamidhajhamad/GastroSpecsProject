import PortalHeader from '@/components/portal/PortalHeader'

const inventory = [
  { sku: 'GS-CK-772', name: 'Burner Control Valve', category: 'SPARE PARTS', qty: 42, bin: 'WH-A1', status: 'IN STOCK' },
  { sku: 'GS-REF-90', name: 'R290 Compressor Unit', category: 'REFRIGERATION', qty: 5, bin: 'WH-B2', status: 'LOW STOCK' },
  { sku: 'GS-DW-001', name: 'Heating Element 3kW', category: 'DISHWASHING', qty: 18, bin: 'WH-A3', status: 'IN STOCK' },
  { sku: 'GS-FP-44', name: 'Replacement Blade Set', category: 'FOOD PREP', qty: 0, bin: 'N/A', status: 'OUT OF STOCK' },
  { sku: 'GS-CK-112', name: 'Cast Iron Pan Support', category: 'HEAVY COOKING', qty: 65, bin: 'WH-C1', status: 'IN STOCK' },
]

const movements = [
  { direction: 'out', text: 'Outbound: SKU-772 (×12)', sub: 'PROJECT #8812 – ABU DHABI MALL', time: '2H AGO' },
  { direction: 'out', text: 'Outbound: SKU-772 (×12)', sub: 'PROJECT #8812 – ABU DHABI MALL', time: '2H AGO' },
  { direction: 'out', text: 'Outbound: SKU-772 (×12)', sub: 'PROJECT #8812 – ABU DHABI MALL', time: '2H AGO' },
]

const assignments = [
  { initials: 'SA', name: 'Sarah Ahmed', role: 'Inventory Lead', badge: 'In Warehouse', badgeColor: 'bg-green-50 text-green-700' },
  { initials: 'MD', name: 'Marc Dupont', role: 'Compliance Officer', badge: 'Auditing', badgeColor: 'bg-blue-50 text-blue-600' },
]

const statusStyle: Record<string, string> = {
  'IN STOCK': 'text-green-700',
  'LOW STOCK': 'text-orange-600',
  'OUT OF STOCK': 'text-red-600',
}

export default function InventoryPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <PortalHeader />
      <div className="flex-1 p-8 bg-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-serif text-3xl text-black italic">Inventory & Compliance</h1>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400 mt-1 max-w-sm">
              Real-time stock monitoring and factory vetting certificate management. Ensure operational continuity and legal alignment.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="border border-gray-200 font-sans text-xs tracking-wide text-gray-500 px-4 py-2 hover:border-black hover:text-black transition-colors flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export Report
            </button>
            <button className="bg-black text-white font-sans text-xs tracking-wide px-4 py-2 hover:bg-gray-800 transition-colors flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Entry
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-px bg-gray-200 mb-6">
          {[
            { label: 'Total Parts Stock', value: '2,840', trend: '+12% VS LAST MONTH', trendUp: true, icon: '📦' },
            { label: 'Low Stock Alerts', value: '14', trend: '-2 VS LAST MONTH', trendUp: false, icon: '⚠️' },
            { label: 'Valid Certificates', value: '128', trend: '', icon: '✓' },
            { label: 'Expiring (30D)', value: '03', trend: '+1 VS LAST MONTH', trendUp: false, icon: '⏰' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white px-6 py-5">
              <div className="flex items-start justify-between mb-2">
                <span className="text-gray-300 text-lg">{stat.icon}</span>
              </div>
              <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-1">{stat.label}</p>
              <p className="font-serif text-3xl font-bold text-black">{stat.value}</p>
              {stat.trend && (
                <p className={`font-sans text-[9px] mt-1 ${stat.trendUp ? 'text-green-600' : 'text-red-500'}`}>{stat.trend}</p>
              )}
            </div>
          ))}
        </div>

        <div className="border border-gray-200 overflow-hidden mb-6">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
            <div className="flex items-center gap-6">
              {['Equipment Inventory', 'Compliance Certificates'].map((tab, i) => (
                <button key={tab} className={`font-sans text-[10px] tracking-[0.1em] uppercase pb-2 border-b-2 ${i === 0 ? 'border-black text-black font-semibold' : 'border-transparent text-gray-400 hover:text-black'}`}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input type="search" placeholder="Search SKU or part..." className="bg-transparent font-sans text-[10px] text-black placeholder-gray-400 focus:outline-none w-36" />
              </div>
              <button className="text-gray-400 hover:text-black transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
              </button>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {['SKU Code', 'Item Name', 'Category', 'Qty', 'Bin Loc.', 'Status'].map((col) => (
                  <th key={col} className="px-5 py-3 text-left font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 font-normal">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.sku} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-sans text-xs text-gray-400">{item.sku}</td>
                  <td className="px-5 py-4 font-sans text-xs font-semibold text-black">{item.name}</td>
                  <td className="px-5 py-4 font-sans text-[10px] uppercase tracking-wide text-gray-500">{item.category}</td>
                  <td className="px-5 py-4 font-sans text-xs font-medium text-black">{item.qty}</td>
                  <td className="px-5 py-4">
                    <span className="font-sans text-[9px] tracking-[0.1em] uppercase border border-gray-200 px-2 py-0.5 text-gray-600">
                      {item.bin}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`font-sans text-[10px] font-semibold flex items-center gap-1.5 ${statusStyle[item.status]}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
            <p className="font-sans text-[10px] text-gray-400">Showing 5 of 2,840 items</p>
            <div className="flex items-center gap-2">
              <button className="font-sans text-[10px] text-gray-400 border border-gray-200 px-3 py-1">Prev</button>
              <button className="font-sans text-[10px] bg-black text-white px-3 py-1">1</button>
              <button className="font-sans text-[10px] text-gray-400 border border-gray-200 px-3 py-1">2</button>
              <button className="font-sans text-[10px] text-gray-400 border border-gray-200 px-3 py-1">Next</button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 p-5">
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold mb-4">Recent Movements</p>
            <div className="space-y-3">
              {movements.map((m, i) => (
                <div key={i} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <div className="w-6 h-6 border border-gray-200 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-sans text-xs font-semibold text-black">{m.text}</p>
                    <p className="font-sans text-[9px] uppercase tracking-wide text-gray-400">{m.sub}</p>
                  </div>
                  <span className="font-sans text-[9px] text-gray-300 shrink-0">{m.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-gray-200 p-5">
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold mb-4">Staff Assignments</p>
            <div className="space-y-3">
              {assignments.map((a) => (
                <div key={a.initials} className="flex items-center gap-3 border border-gray-100 p-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                    <span className="font-sans text-[9px] font-bold text-gray-600">{a.initials}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-sans text-xs font-semibold text-black">{a.name}</p>
                    <p className="font-sans text-[9px] uppercase tracking-wide text-gray-400">{a.role}</p>
                  </div>
                  <span className={`font-sans text-[9px] tracking-[0.1em] uppercase px-2 py-1 font-semibold ${a.badgeColor}`}>● {a.badge}</span>
                </div>
              ))}
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
