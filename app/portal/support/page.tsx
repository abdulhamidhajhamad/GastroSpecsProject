'use client'

import { useState } from 'react'
import PortalHeader from '@/components/portal/PortalHeader'

const tickets = [
  { id: 'TIC-8492', priority: 'HIGH', title: 'COMBI OVEN NOT HEATING', client: 'Al Safadi Restaurant', time: '20 min ago', dot: 'bg-orange-500' },
  { id: 'TIC-8488', priority: 'HIGH', title: 'WALK-IN FREEZER TEMPERATURE ALARM', client: 'Five Palm Jumeirah', time: '2 hours ago', dot: 'bg-orange-500' },
  { id: 'TIC-8485', priority: 'MEDIUM', title: 'DISHWASHER LEAKAGE', client: 'Zuma Dubai', time: '5 hours ago', dot: 'bg-blue-500' },
  { id: 'TIC-8480', priority: 'LOW', title: 'GRIDDLE IGNITION FAILURE', client: 'Salt Burger', time: '1 day ago', dot: 'bg-green-500' },
  { id: 'TIC-8472', priority: 'MEDIUM', title: 'COFFEE MACHINE CALIBRATION', client: 'Nola Eatery', time: '2 days ago', dot: 'bg-blue-500' },
]

const priorityStyle: Record<string, string> = {
  HIGH: 'text-red-600 bg-red-50',
  MEDIUM: 'text-orange-600 bg-orange-50',
  LOW: 'text-green-700 bg-green-50',
}

const technicians = [
  { initials: 'OA', name: 'OMAR AL-FAYED', status: 'ON-SITE · 3 ACTIVE', statusColor: 'bg-green-500' },
  { initials: 'MC', name: 'MICHAEL CHEN', status: 'ON-SITE · 1 ACTIVE', statusColor: 'bg-green-500' },
  { initials: 'SJ', name: 'SARAH JENKINS', status: 'BUSY · 5 ACTIVE', statusColor: 'bg-orange-400' },
  { initials: 'DM', name: 'DAVID MILLER', status: 'AVAILABLE · 0 ACTIVE', statusColor: 'bg-green-500' },
]

const activityLog = [
  { actor: 'SYSTEM', time: 'Oct 24, 10:15 AM', text: 'Ticket automatically generated from customer portal' },
  { actor: 'ADMIN', time: 'Oct 24, 10:45 AM', text: 'Priority escalated to HIGH due to operational impact' },
  { actor: 'SARAH JENKINS', time: 'Oct 24, 11:20 AM', text: 'Requested site photos from customer via WhatsApp' },
]

export default function SupportPage() {
  const [active, setActive] = useState(tickets[0])

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <PortalHeader />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[240px] border-r border-gray-200 flex flex-col shrink-0">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-semibold text-black">Support Queue</span>
            <span className="font-sans text-[9px] text-gray-400">24 active</span>
          </div>
          <div className="px-3 py-2 border-b border-gray-200">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-2.5 py-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input type="search" placeholder="Filter tickets..." className="bg-transparent font-sans text-[10px] text-black placeholder-gray-400 focus:outline-none w-full" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setActive(ticket)}
                className={`px-4 py-4 border-b border-gray-100 cursor-pointer transition-colors ${active.id === ticket.id ? 'bg-gray-50 border-l-2 border-l-black' : 'hover:bg-gray-50'}`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-sans text-[9px] text-gray-400">{ticket.id}</span>
                  <span className={`font-sans text-[8px] tracking-[0.1em] uppercase px-1.5 py-0.5 font-semibold ${priorityStyle[ticket.priority]}`}>{ticket.priority}</span>
                </div>
                <p className="font-sans text-[10px] font-semibold text-black leading-tight mb-1">{ticket.title}</p>
                <p className="font-sans text-[9px] text-gray-400 mb-2">{ticket.client}</p>
                <div className="flex items-center gap-1.5">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="font-sans text-[9px] text-gray-400">{ticket.time}</span>
                  <span className={`ml-auto w-2 h-2 rounded-full ${ticket.dot}`} />
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-gray-200">
            <button className="w-full font-sans text-[10px] tracking-[0.15em] uppercase text-gray-400 hover:text-black transition-colors">Load More Tickets</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-sans font-bold text-2xl text-black leading-tight">{active.title}</h1>
                <span className={`font-sans text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 font-semibold ${priorityStyle[active.priority]}`}>NEW</span>
              </div>
              <div className="flex items-center gap-4 font-sans text-[10px] text-gray-400 uppercase tracking-wide">
                <span>{active.client.split(' ')[0]}</span>
                <span>·</span>
                <span>{active.id}</span>
                <span>·</span>
                <span>Opened Oct 24, 2024</span>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button className="border border-gray-200 font-sans text-xs tracking-wide text-gray-500 px-4 py-2 hover:border-black hover:text-black transition-colors">Escalate</button>
              <button className="bg-black text-white font-sans text-xs tracking-wide px-4 py-2 hover:bg-gray-800 transition-colors">Close Ticket</button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 font-semibold">Asset Details</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Model', value: 'RATIONAL ICOMBI PRO 10-1/1' },
                  { label: 'Serial Number', value: 'GS-RAT-101-99201' },
                  { label: 'Warranty Status', value: 'ACTIVE UNTIL DEC 2025' },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-0.5">{item.label}</p>
                    {item.label === 'Warranty Status' ? (
                      <span className="font-sans text-[10px] text-green-700 bg-green-50 px-2 py-1 font-semibold">{item.value}</span>
                    ) : (
                      <p className="font-sans text-xs font-bold text-black uppercase">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                </svg>
                <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 font-semibold">Site Information</span>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="font-sans text-[9px] text-gray-400 mb-0.5">Contact Name</p>
                  <p className="font-sans text-xs font-bold text-black">MUSTAFA IBRAHIM</p>
                  <p className="font-sans text-[10px] text-gray-400">General Manager</p>
                </div>
                <div>
                  <p className="font-sans text-[9px] text-gray-400 mb-0.5">Contact Details</p>
                  <p className="font-sans text-xs text-black">+971 50 123 4567</p>
                  <p className="font-sans text-xs text-blue-600">m.ibrahim@alsafadi.ae</p>
                </div>
                <div>
                  <p className="font-sans text-[9px] text-gray-400 mb-0.5">Address</p>
                  <p className="font-sans text-xs text-black">Level 2, Pier 7, Dubai Marina, PO Box 92011, Dubai, UAE</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 p-5 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 font-semibold">Ticket Description</span>
            </div>
            <p className="font-sans text-sm text-gray-600 leading-relaxed italic border border-gray-100 p-4 bg-gray-50">
              &ldquo;The combi oven is displaying error code E34 intermittently during service. The unit does not reach full temperature (stops at 140°C) and emits a slight humming noise from the rear panel. Staff have tried a hard reset but the issue persists. Requires immediate inspection as it is impacting our lunch prep capacity.&rdquo;
            </p>
          </div>

          <div className="border border-gray-200 p-5 mb-6">
            <div className="flex items-center gap-2 mb-5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 font-semibold">Internal Activity Log</span>
            </div>
            <div className="space-y-4 mb-4">
              {activityLog.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 shrink-0" />
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-sans text-[9px] tracking-[0.15em] uppercase font-semibold text-black">{item.actor}</span>
                      <span className="font-sans text-[9px] text-gray-400">{item.time}</span>
                    </div>
                    <p className="font-sans text-[10px] text-gray-500 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <input type="text" placeholder="Type internal note and press Enter..." className="w-full border border-gray-200 font-sans text-xs px-4 py-3 focus:outline-none focus:border-black transition-colors" />
          </div>
        </div>

        <div className="w-[240px] border-l border-gray-200 flex flex-col shrink-0 p-5">
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold mb-5">Dispatch Control</p>

          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                <circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4-4h4" />
              </svg>
              <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 font-semibold">Assign Technician</span>
            </div>
            <div className="space-y-2">
              {technicians.map((tech) => (
                <div key={tech.initials} className="flex items-center gap-2 border border-gray-200 p-2.5 hover:border-black cursor-pointer transition-colors">
                  <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                    <span className="font-sans text-[8px] font-bold text-gray-600">{tech.initials}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-sans text-[9px] font-semibold text-black uppercase">{tech.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${tech.statusColor}`} />
                      <span className="font-sans text-[8px] uppercase text-gray-400 tracking-wide truncate">{tech.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
              </svg>
              <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 font-semibold">Schedule Window</span>
            </div>
            <div className="border border-gray-200 p-3">
              <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-1">Selected Slot</p>
              <p className="font-sans text-xs font-bold text-black">TODAY, OCT 24</p>
              <p className="font-sans text-[10px] text-gray-500">14:00 PM – 16:00 PM</p>
              <button className="w-full border border-gray-200 font-sans text-[9px] tracking-[0.1em] uppercase text-gray-400 py-1.5 mt-2 hover:border-black hover:text-black transition-colors">Reschedule</button>
            </div>
          </div>

          <div className="mb-5">
            <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 font-semibold mb-3">Quick Actions</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Call Site', icon: '📞' },
                { label: 'Manuals', icon: '📄' },
                { label: 'Spare Parts', icon: '🔧' },
                { label: 'Email Cust.', icon: '✉️' },
              ].map((action) => (
                <button key={action.label} className="border border-gray-200 font-sans text-[9px] tracking-[0.1em] uppercase text-gray-500 py-2.5 hover:border-black hover:text-black transition-colors flex flex-col items-center gap-1">
                  <span className="text-base">{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-black p-4 mt-auto">
            <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 font-semibold mb-1">Technician Dispatch</p>
            <p className="font-sans text-[10px] text-white leading-relaxed mb-3">Assign Omar Al-Fayed to this high-priority ticket?</p>
            <button className="w-full bg-white text-black font-sans text-[10px] tracking-[0.15em] uppercase py-2.5 hover:bg-gray-100 transition-colors">Confirm Dispatch</button>
          </div>
        </div>
      </div>

      <div className="px-8 py-3 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="font-sans text-[10px] uppercase tracking-wide text-gray-500">System Operational</span>
        </div>
        <div className="flex items-center gap-6">
          <p className="font-sans text-[9px] text-gray-400">© 2024 GASTROSPECS OPERATIONS. ALL RIGHTS RESERVED.</p>
          {['Terms', 'Privacy'].map((item) => (
            <a key={item} href="#" className="font-sans text-[9px] text-gray-400 hover:text-black uppercase tracking-wide">{item}</a>
          ))}
        </div>
      </div>
    </div>
  )
}
