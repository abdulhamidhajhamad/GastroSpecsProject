import PortalHeader from '@/components/portal/PortalHeader'

const rfqs = [
  { ref: 'RFQ-2024-001', project: 'Grand Hyatt Kitchen Renovation', category: 'HEAVY COOKING', items: '12 SKU', status: 'Comparing', date: '2024-10-12' },
  { ref: 'RFQ-2024-002', project: 'Marina Bay Sand Catering', category: 'REFRIGERATION', items: '5 SKU', status: 'Open', date: '2024-10-15' },
  { ref: 'RFQ-2024-003', project: 'Al Safa Dining Hall', category: 'DISHWASHING', items: '8 SKU', status: 'Awarded', date: '2024-09-28' },
  { ref: 'RFQ-2024-004', project: 'Expo 2024 Pavilion B', category: 'FOOD PREP', items: '15 SKU', status: 'Closed', date: '2024-09-20' },
  { ref: 'RFQ-2024-005', project: 'Desert Rose Boutique Hotel', category: 'STORAGE', items: '22 SKU', status: 'Comparing', date: '2024-10-05' },
]

const statusStyle: Record<string, string> = {
  Comparing: 'bg-blue-50 text-blue-600 border-blue-200',
  Open: 'border border-gray-200 text-gray-600',
  Awarded: 'bg-black text-white',
  Closed: 'bg-gray-50 text-gray-400 border border-gray-200',
}

export default function ProcurementPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <PortalHeader />
      <div className="flex-1 p-8 bg-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-serif text-3xl text-black italic">Procurement</h1>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400 mt-1">Staff Operations · RFQ Manager</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="border border-gray-200 font-sans text-xs tracking-wide text-gray-500 px-4 py-2 hover:border-black hover:text-black transition-colors flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Global Export
            </button>
            <button className="bg-black text-white font-sans text-xs tracking-wide px-4 py-2 hover:bg-gray-800 transition-colors flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Request
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-gray-200 mb-6">
          <div className="flex items-center gap-0">
            {['Active RFQs', 'Quote Comparisons', 'Initialize RFQ'].map((tab, i) => (
              <button key={tab} className={`font-sans text-[10px] tracking-[0.1em] uppercase px-5 py-4 border-b-2 transition-colors ${i === 0 ? 'border-black text-black font-semibold' : 'border-transparent text-gray-400 hover:text-black'}`}>
                {tab}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 font-sans text-[10px] tracking-[0.15em] uppercase text-gray-400 hover:text-black transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filter List...
          </button>
        </div>

        <div className="grid grid-cols-4 gap-px bg-gray-200 mb-6">
          {[
            { label: 'Total Active', value: '24', sub: '+3 this week' },
            { label: 'Pending Factory', value: '08', sub: 'Avg 4.2d response' },
            { label: 'Award Pipeline', value: '$240k', sub: 'Estimated Value' },
            { label: 'Alerts', value: '02', sub: 'Expired Deadlines' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white px-6 py-5">
              <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-1">{stat.label}</p>
              <p className="font-serif text-3xl font-bold text-black">{stat.value}</p>
              <p className="font-sans text-[9px] text-gray-400 mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>

        <div className="border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {['RFQ Reference', 'Project Name', 'Category', 'Items', 'Status', 'Created', 'Actions'].map((col) => (
                  <th key={col} className="px-5 py-3 text-left font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 font-normal">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rfqs.map((rfq) => (
                <tr key={rfq.ref} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-sans text-xs font-semibold text-black">{rfq.ref}</td>
                  <td className="px-5 py-4 font-sans text-xs text-black">{rfq.project}</td>
                  <td className="px-5 py-4 font-sans text-[10px] uppercase tracking-wide text-gray-500">{rfq.category}</td>
                  <td className="px-5 py-4 font-sans text-xs text-gray-500">{rfq.items}</td>
                  <td className="px-5 py-4">
                    <span className={`font-sans text-[9px] tracking-[0.1em] uppercase px-2.5 py-1 font-semibold ${statusStyle[rfq.status]}`}>{rfq.status}</span>
                  </td>
                  <td className="px-5 py-4 font-sans text-xs text-gray-400">{rfq.date}</td>
                  <td className="px-5 py-4">
                    <button className="font-sans text-[10px] text-gray-400 hover:text-black transition-colors">View →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
            <p className="font-sans text-[10px] text-gray-400">Showing 1–5 of 24 RFQs</p>
            <div className="flex items-center gap-2">
              <button className="font-sans text-[10px] text-gray-400 border border-gray-200 px-3 py-1 hover:border-black hover:text-black transition-colors">Previous</button>
              <button className="font-sans text-[10px] text-black bg-black text-white border border-black px-3 py-1">Next Page</button>
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
