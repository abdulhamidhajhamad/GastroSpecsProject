'use client'

import { useState } from 'react'
import PortalHeader from '@/components/portal/PortalHeader'

const leads = [
  { id: 'LD-8801', client: 'Roma Fine Dining', contact: 'Marcus Aurelius', source: 'WEBSITE', date: '2024-05-24', status: 'New' },
  { id: 'LD-8802', client: 'Cloud Kitchens UAE', contact: 'Sarah Jenkins', source: 'REFERRAL', date: '2024-05-22', status: 'Quote Sent' },
  { id: 'LD-8803', client: 'Izakaya Zen', contact: 'Kenji Tanaka', source: 'WEBSITE', date: '2024-05-21', status: 'Contacted' },
  { id: 'LD-8804', client: 'Tapas & Co', contact: 'Elena Rodriguez', source: 'DIRECT', date: '2024-05-20', status: 'Qualified' },
  { id: 'LD-8805', client: 'Global Catering', contact: 'David Smith', source: 'WEBSITE', date: '2024-05-18', status: 'Lost' },
]

const activityLog = [
  { actor: 'SYSTEM', time: '2H AGO', text: 'Lead status updated to Quote Sent' },
  { actor: 'AHMED R.', time: '1D AGO', text: 'Quote PDF #Q-9921 sent to client' },
  { actor: 'AHMED R.', time: '2D AGO', text: 'Phone call: Discussed refrigeration layout' },
  { actor: 'SYSTEM', time: '3D AGO', text: 'Inquiry received via website form' },
]

const statusStyle: Record<string, string> = {
  New: 'bg-blue-50 text-blue-600',
  'Quote Sent': 'bg-purple-50 text-purple-600',
  Contacted: 'bg-yellow-50 text-yellow-600',
  Qualified: 'bg-green-50 text-green-700',
  Lost: 'bg-gray-100 text-gray-500',
}

export default function LeadsPage() {
  const [selected, setSelected] = useState(leads[0])

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <PortalHeader />
      <div className="flex-1 p-8 bg-white">
        <div className="mb-6">
          <h1 className="font-serif text-3xl text-black italic">Leads & CRM</h1>
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400 mt-1">Managing {leads.length} Active Client Inquiries</p>
        </div>

        <div className="grid grid-cols-3 gap-px bg-gray-200 mb-6">
          {[
            { label: 'Total Leads', value: '142' },
            { label: 'Conversion Rate', value: '18.4%' },
            { label: 'Qualified Today', value: '12' },
          ].map((s) => (
            <div key={s.label} className="bg-white px-6 py-5">
              <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-1">{s.label}</p>
              <p className="font-serif text-3xl font-bold text-black">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 w-56">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input type="search" placeholder="Search company, name or email..." className="bg-transparent font-sans text-xs text-black placeholder-gray-400 focus:outline-none w-full" />
            </div>
            <div className="flex items-center gap-4">
              {['ALL LEADS', 'MY LEADS', 'DRAFTS'].map((tab, i) => (
                <button key={tab} className={`font-sans text-[10px] tracking-[0.1em] uppercase pb-1 border-b ${i === 0 ? 'border-black text-black font-semibold' : 'border-transparent text-gray-400 hover:text-black'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {['Ref ID', 'Client / Company', 'Source', 'Date', 'Status'].map((col) => (
                  <th key={col} className="px-5 py-3 text-left font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 font-normal">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => setSelected(lead)}
                  className={`border-b border-gray-100 cursor-pointer transition-colors ${selected.id === lead.id ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                >
                  <td className="px-5 py-3.5 font-sans text-xs text-gray-400">{lead.id}</td>
                  <td className="px-5 py-3.5">
                    <p className="font-sans text-xs font-semibold text-black">{lead.client}</p>
                    <p className="font-sans text-[10px] text-gray-400">{lead.contact}</p>
                  </td>
                  <td className="px-5 py-3.5 font-sans text-[10px] tracking-wide uppercase text-gray-400">✦ {lead.source}</td>
                  <td className="px-5 py-3.5 font-sans text-[10px] text-gray-400 flex items-center gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {lead.date}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`font-sans text-[9px] tracking-[0.1em] uppercase px-2 py-1 font-semibold ${statusStyle[lead.status] || ''}`}>{lead.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-gray-100">
            <p className="font-sans text-[10px] text-gray-400 uppercase tracking-wide">Showing {leads.length} of 142 total leads</p>
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-end" onClick={() => setSelected(leads[0])}>
          <div className="bg-white w-full max-w-sm h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-1">Lead Details</p>
                  <h2 className="font-serif text-2xl text-black italic">{selected.client}</h2>
                  <p className="font-sans text-xs text-gray-400 mt-1">ID: {selected.id}</p>
                </div>
                <button onClick={() => setSelected(leads[0])} className="text-gray-400 hover:text-black">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <span className={`inline-block font-sans text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 font-semibold mb-5 ${statusStyle[selected.status]}`}>{selected.status}</span>

              <div className="flex gap-2 mb-6">
                <button className="flex-1 bg-black text-white font-sans text-[10px] tracking-[0.15em] uppercase py-2.5 hover:bg-gray-800 transition-colors">Create Quote</button>
                <button className="flex-1 border border-gray-200 text-black font-sans text-[10px] tracking-[0.15em] uppercase py-2.5 hover:border-black transition-colors">Mark Qualified</button>
              </div>

              <div className="border-b border-gray-200 mb-5">
                <div className="flex gap-5">
                  {['Activity Log', `Files (3)`, 'Contact Info'].map((tab, i) => (
                    <button key={tab} className={`font-sans text-[10px] tracking-[0.1em] uppercase pb-3 border-b-2 ${i === 0 ? 'border-black text-black font-semibold' : 'border-transparent text-gray-400'}`}>{tab}</button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {activityLog.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="mt-1">
                      <div className="w-4 h-4 rounded-full border border-gray-200 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-sans text-[9px] tracking-[0.15em] uppercase font-semibold text-black">{item.actor}</span>
                        <span className="font-sans text-[9px] text-gray-300">{item.time}</span>
                      </div>
                      <p className="font-sans text-[10px] text-gray-500 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <textarea
                  placeholder="Write a note..."
                  rows={3}
                  className="w-full border border-gray-200 font-sans text-xs text-black placeholder-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors resize-none mb-3"
                />
                <button className="bg-black text-white font-sans text-xs tracking-wide px-5 py-2 hover:bg-gray-800 transition-colors float-right">
                  Post Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
