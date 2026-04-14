import PortalHeader from '@/components/portal/PortalHeader'

const stats = [
  { label: 'OPEN LEADS', value: '42', trend: '+8%', trendUp: true },
  { label: 'ACTIVE PROJECTS', value: '18', trend: '+2', trendUp: true },
  { label: 'PENDING RFQS', value: '09', trend: '-4%', trendUp: false },
  { label: 'SHIPMENTS', value: '12', trend: '+15%', trendUp: true },
  { label: 'OVERDUE INV', value: '03', trend: '-12%', trendUp: false },
  { label: 'OPEN TICKETS', value: '21', trend: '+4', trendUp: true },
]

const projects = [
  { id: 'GS-992', client: 'Azure Grand Resort', scope: 'Main Kitchen Layout', status: 'Design', budget: '$145,000' },
  { id: 'GS-988', client: 'Skyline Catering', scope: 'Refrigeration Overhaul', status: 'Logistics', budget: '$62,400' },
  { id: 'GS-985', client: 'Urban Bistro Hub', scope: 'Compact Cookline', status: 'Installation', budget: '$28,500' },
  { id: 'GS-982', client: 'The Marina Grill', scope: 'Custom Hood Extraction', status: 'Sourcing', budget: '$54,200' },
  { id: 'GS-979', client: 'Global Tech Canteen', scope: 'Full Turnkey Project', status: 'Logistics', budget: '$210,000' },
]

const feed = [
  { name: 'Marcus Chen', time: '12M AGO', message: 'Approved supplier quote for Project GS-982 (RATIONAL Combi Oven suite).' },
  { name: 'Elena Rodriguez', time: '45M AGO', message: 'Updated logistics timeline for Skyline Catering. ETA changed to Nov 12.' },
  { name: 'James Wilson', time: '2H AGO', message: 'Closed support ticket #4492 - Dishwasher motor replacement complete.' },
  { name: 'System Automator', time: '5H AGO', message: 'Generated monthly procurement summary for the Board of Directors.' },
]

const statusColor: Record<string, string> = {
  Design: 'text-blue-600',
  Logistics: 'text-orange-500',
  Installation: 'text-green-600',
  Sourcing: 'text-purple-600',
}

export default function DashboardPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <PortalHeader />
      <div className="flex-1 p-8 bg-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-sans font-bold text-xl tracking-[0.08em] uppercase text-black">Operations Dashboard</h1>
            <p className="font-sans text-xs text-gray-400 mt-1">Welcome back, system overview as of October 24, 2024.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="border border-gray-200 font-sans text-xs tracking-wide text-gray-500 px-4 py-2 hover:border-black hover:text-black transition-colors flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              Export Report
            </button>
            <button className="bg-black text-white font-sans text-xs tracking-wide px-4 py-2 hover:bg-gray-800 transition-colors flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Quick Create
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-gray-200 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-5 h-5 text-gray-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                  </svg>
                </div>
                <span className={`font-sans text-[9px] tracking-wide ${stat.trendUp ? 'text-green-600' : 'text-red-500'}`}>
                  {stat.trendUp ? '↑' : '↓'} {stat.trend}
                </span>
              </div>
              <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-1">{stat.label}</p>
              <p className="font-serif text-3xl font-bold text-black">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="border border-gray-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">Active Projects Overview</span>
              </div>
              <a href="/portal/projects" className="font-sans text-[10px] text-gray-400 hover:text-black transition-colors">View All Projects</a>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {['ID', 'Client & Scope', 'Status', 'Budget'].map((col) => (
                    <th key={col} className="px-6 py-3 text-left font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 font-normal">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects.map((proj) => (
                  <tr key={proj.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 font-sans text-xs text-gray-400">{proj.id}</td>
                    <td className="px-6 py-4">
                      <p className="font-sans text-xs font-semibold text-black">{proj.client}</p>
                      <p className="font-sans text-[10px] uppercase tracking-wide text-gray-400 mt-0.5">{proj.scope}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-sans text-[10px] tracking-[0.1em] uppercase font-medium ${statusColor[proj.status] || 'text-gray-600'}`}>
                        {proj.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-sans text-xs text-black font-medium">{proj.budget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border border-gray-200">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-200">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">Live System Feed</span>
            </div>
            <div className="p-5 space-y-5">
              {feed.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <span className="font-sans text-[8px] font-bold text-gray-500">
                      {item.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-sans text-[10px] font-semibold text-black uppercase tracking-wide">{item.name}</span>
                      <span className="font-sans text-[9px] text-gray-300">{item.time}</span>
                    </div>
                    <p className="font-sans text-[10px] text-gray-500 leading-relaxed">{item.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 pb-5">
              <button className="w-full border border-gray-200 font-sans text-[10px] tracking-[0.15em] uppercase text-gray-400 py-2.5 hover:border-black hover:text-black transition-colors">
                View Complete Audit Log
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 border border-gray-200 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {['MC', 'SR', 'OA', 'EL'].map((init) => (
                <div key={init} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center">
                  <span className="font-sans text-[9px] font-bold text-gray-600">{init}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="font-sans text-xs font-semibold text-black">Team Performance</p>
              <p className="font-sans text-[10px] text-gray-400 uppercase tracking-wide">8 Active Team Members Currently Online</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-1">Target Completion</p>
            <p className="font-sans font-bold text-sm text-black mb-2">84% of Monthly Goals</p>
            <div className="w-48 bg-gray-200 h-1">
              <div className="bg-black h-1" style={{ width: '84%' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-3 border-t border-gray-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="font-sans text-[10px] uppercase tracking-wide text-gray-500">System Operational</span>
        </div>
        <div className="flex items-center gap-6">
          {['© 2024 GASTROSPECS OPERATIONS. ALL RIGHTS RESERVED.', ''].map((text, i) =>
            text ? <p key={i} className="font-sans text-[9px] text-gray-400">{text}</p> : null
          )}
          {['Terms', 'Privacy'].map((item) => (
            <a key={item} href="#" className="font-sans text-[9px] text-gray-400 hover:text-black transition-colors uppercase tracking-wide">{item}</a>
          ))}
        </div>
      </div>
    </div>
  )
}
