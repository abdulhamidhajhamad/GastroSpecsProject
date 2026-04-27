'use client'

import { useState } from 'react'
import PortalHeader from '@/components/portal/PortalHeader'

const projectList: { id: string; name: string; client: string; status: string }[] = []

const timeline: { label: string; date: string; done: boolean; current?: boolean }[] = []

const team: { initials: string; name: string; title: string }[] = []

const notes: { author: string; time: string; text: string }[] = []

const statusStyle: Record<string, string> = {
  'IN PROGRESS': 'bg-green-50 text-green-700 border-green-200',
  'DESIGN PHASE': 'bg-blue-50 text-blue-600 border-blue-200',
  'APPROVAL PENDING': 'bg-orange-50 text-orange-600 border-orange-200',
}

export default function PortalProjectsPage() {
  const [active, setActive] = useState(projectList[0] ?? null)

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <PortalHeader />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[240px] border-r border-gray-200 flex flex-col shrink-0">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-semibold text-black">Kitchen Layouts</span>
            <button className="text-gray-400 hover:text-black transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
          <div className="px-3 py-2 border-b border-gray-200">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-2.5 py-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input type="search" placeholder="Search projects..." className="bg-transparent font-sans text-[10px] text-black placeholder-gray-400 focus:outline-none w-full" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {projectList.map((proj) => (
              <div
                key={proj.id}
                onClick={() => setActive(proj)}
                className={`px-4 py-4 border-b border-gray-100 cursor-pointer transition-colors ${active?.id === proj.id ? 'bg-gray-50 border-l-2 border-l-black' : 'hover:bg-gray-50'}`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-sans text-[9px] text-gray-400">{proj.id}</p>
                  <span className={`font-sans text-[8px] tracking-[0.1em] uppercase border px-1.5 py-0.5 font-semibold shrink-0 ${statusStyle[proj.status] || 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                    {proj.status}
                  </span>
                </div>
                <p className="font-sans text-[10px] font-semibold text-black leading-tight">{proj.name}</p>
                <p className="font-sans text-[9px] text-gray-400 mt-1 uppercase tracking-wide">{proj.client}</p>
              </div>
            ))}
          </div>
        </div>

        {active && (
          <div className="flex-1 overflow-y-auto p-8">
            <div className="flex items-center gap-2 font-sans text-[10px] text-gray-400 uppercase tracking-wide mb-4">
              <span>Projects</span><span>›</span><span>Kitchen Layouts</span><span>›</span>
              <span className="text-black font-semibold">{active.id}</span>
            </div>

            <div className="flex items-start justify-between mb-6">
              <h1 className="font-sans font-bold text-2xl text-black tracking-tight leading-tight">{active.name}</h1>
            <div className="flex items-center gap-3 shrink-0">
              <button className="border border-gray-200 font-sans text-[10px] tracking-[0.15em] uppercase text-gray-500 px-4 py-2 hover:border-black hover:text-black transition-colors flex items-center gap-2">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Export BOQ
              </button>
              <button className="bg-black text-white font-sans text-[10px] tracking-[0.15em] uppercase px-4 py-2 hover:bg-gray-800 transition-colors flex items-center gap-2">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Submit for Approval
              </button>
            </div>
          </div>

          <div className="bg-gray-100 aspect-[16/9] flex items-center justify-center mb-6 relative">
            <div className="absolute top-4 left-4 bg-white/90 font-sans text-[10px] tracking-[0.15em] uppercase px-3 py-1 flex items-center gap-2">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              LAYER: EQUIPMENT_H
            </div>
            <div className="text-center">
              <div className="w-48 h-48 border-2 border-dashed border-gray-300 flex items-center justify-center">
                <p className="font-sans text-xs text-gray-400">CAD Layout Preview</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr_280px] gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                  <circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4-4h4" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0-3-3.87" />
                </svg>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">Assigned Team</span>
              </div>
              <div className="space-y-2">
                {team.map((member) => (
                  <div key={member.initials} className="flex items-center gap-3 border border-gray-200 px-4 py-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="font-sans text-[9px] font-bold text-gray-600">{member.initials}</span>
                    </div>
                    <div>
                      <p className="font-sans text-xs font-semibold text-black">{member.name}</p>
                      <p className="font-sans text-[9px] uppercase tracking-wide text-gray-400">{member.title}</p>
                    </div>
                  </div>
                ))}
                <button className="w-full border border-dashed border-gray-200 font-sans text-[10px] tracking-[0.15em] uppercase text-gray-400 py-3 hover:border-black hover:text-black transition-colors">
                  Add Member
                </button>
              </div>
            </div>

            <div>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400 font-semibold mb-4">Project Timeline</p>
              <div className="space-y-4">
                {timeline.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${step.done ? 'bg-black border-black' : step.current ? 'border-black bg-white' : 'border-gray-200 bg-white'}`}>
                        {step.done && <div className="w-2 h-2 rounded-full bg-white" />}
                        {step.current && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                      </div>
                      {i < timeline.length - 1 && <div className={`w-px flex-1 mt-1 ${step.done ? 'bg-black' : 'bg-gray-200'}`} style={{ minHeight: '24px' }} />}
                    </div>
                    <div className="pb-4">
                      <p className={`font-sans text-[10px] tracking-[0.1em] uppercase font-semibold ${step.done || step.current ? 'text-black' : 'text-gray-400'}`}>{step.label}</p>
                      <p className={`font-sans text-[9px] mt-0.5 ${step.current ? 'text-gray-600 italic' : 'text-gray-300'}`}>{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border border-gray-200 p-4">
                <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-3">Quick Stats</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-sans text-[9px] tracking-[0.1em] uppercase text-gray-400">Total Units</p>
                    <p className="font-serif text-2xl font-bold text-black">42</p>
                  </div>
                  <div>
                    <p className="font-sans text-[9px] tracking-[0.1em] uppercase text-gray-400">Area (M²)</p>
                    <p className="font-serif text-2xl font-bold text-black">185.4</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">Engineering Notes</span>
              </div>
              <button className="font-sans text-[10px] text-gray-400 hover:text-black transition-colors">Mark all as resolved</button>
            </div>
            <div className="space-y-4 mb-4">
              {notes.map((note, i) => (
                <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-sans text-[10px] font-semibold text-black uppercase tracking-wide">{note.author}</span>
                    <span className="font-sans text-[9px] text-gray-400">{note.time}</span>
                  </div>
                  <p className="font-sans text-xs text-gray-500 leading-relaxed">{note.text}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <input type="text" placeholder="Type a note..." className="flex-1 border border-gray-200 font-sans text-xs px-4 py-2.5 focus:outline-none focus:border-black transition-colors" />
              <button className="bg-black text-white font-sans text-xs tracking-wide px-5 py-2.5 hover:bg-gray-800 transition-colors">Post</button>
            </div>
          </div>

          <div className="border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">Technical Documentation</span>
              </div>
              <span className="font-sans text-[10px] text-gray-400">6 Files Attached</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'MAIN_KITCHEN', size: '24 MB', type: 'CAD Drawing' },
                { name: 'ELECTRICAL_MI', size: '1.2 MB', type: 'Spreadsheet' },
                { name: 'CLIENT_FEEDBA...', size: '4.5 MB', type: 'PDF' },
                { name: 'DROP NEW FILE', size: '', type: 'Upload' },
              ].map((file, i) => (
                <div key={i} className={`border border-dashed border-gray-200 p-4 flex flex-col items-center text-center ${i === 3 ? 'cursor-pointer hover:border-black' : ''}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-300 mb-2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <p className="font-sans text-[9px] font-semibold text-black uppercase tracking-wide">{file.name}</p>
                  {file.size && <p className="font-sans text-[9px] text-gray-400">{file.size}</p>}
                  {file.type && <p className="font-sans text-[9px] text-gray-300 uppercase tracking-wide">{file.type}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
        )}
      </div>

      <div className="px-8 py-3 border-t border-gray-200 flex items-center">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="font-sans text-[10px] uppercase tracking-wide text-gray-500">System Operational</span>
        </div>
      </div>
    </div>
  )
}
