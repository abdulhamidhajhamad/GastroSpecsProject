'use client'

import { useState } from 'react'
import PortalHeader from '@/components/portal/PortalHeader'

const invoices = [
  { id: 'INV-2024-001', entity: 'Grand Horizon Hotels', type: 'CLIENT', amount: '$15,600.00', date: '2024-03-10', status: 'Paid' },
  { id: 'INV-2024-002', entity: 'Rational AG', type: 'FACTORY', amount: '$42,200.00', date: '2024-03-14', status: 'Pending' },
  { id: 'INV-2024-003', entity: 'Skyline Catering', type: 'CLIENT', amount: '$8,900.00', date: '2024-03-16', status: 'Overdue' },
  { id: 'INV-2024-004', entity: 'Hobart Corp', type: 'FACTORY', amount: '$32,100.00', date: '2024-03-20', status: 'Pending' },
  { id: 'INV-2024-005', entity: 'Al-Majid Catering', type: 'CLIENT', amount: '$15,600.00', date: '2024-03-22', status: 'Paid' },
]

const statusStyle: Record<string, string> = {
  Paid: 'text-green-700 bg-green-50',
  Pending: 'text-orange-600 bg-orange-50',
  Overdue: 'text-red-600 bg-red-50',
}

const typeStyle: Record<string, string> = {
  CLIENT: 'text-blue-600 bg-blue-50 border border-blue-100',
  FACTORY: 'text-purple-600 bg-purple-50 border border-purple-100',
}

export default function InvoicesPage() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <PortalHeader />
      <div className="flex-1 p-8 bg-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-serif text-3xl text-black italic">Invoicing & Payments</h1>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400 mt-1">Manage client invoices and factory payment schedules</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="border border-gray-200 font-sans text-xs tracking-wide text-gray-500 px-4 py-2 hover:border-black hover:text-black transition-colors flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export CSV
            </button>
            <button onClick={() => setShowModal(true)} className="bg-black text-white font-sans text-xs tracking-wide px-4 py-2 hover:bg-gray-800 transition-colors flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create Invoice
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-px bg-gray-200 mb-6">
          {[
            { label: 'Total Invoiced (YTD)', value: '$142,350', sub: 'ACTION REQUIRED' },
            { label: 'Pending Collection', value: '$41,000', sub: '' },
            { label: 'Overdue Balance', value: '$8,400.50', sub: 'ACTION REQUIRED', alert: true },
          ].map((stat) => (
            <div key={stat.label} className="bg-white px-6 py-5 flex items-start justify-between">
              <div>
                <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-1">{stat.label}</p>
                <p className={`font-serif text-3xl font-bold ${stat.alert ? 'text-red-600' : 'text-black'}`}>{stat.value}</p>
              </div>
              {stat.sub && <span className={`font-sans text-[8px] tracking-[0.1em] uppercase ${stat.alert ? 'text-red-500' : 'text-gray-400'}`}>{stat.sub}</span>}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          <div className="border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  {['Invoice ID', 'Entity', 'Type', 'Amount', 'Date', 'Status'].map((col) => (
                    <th key={col} className="px-5 py-3 text-left font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 font-normal">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                    <td className="px-5 py-4 font-sans text-xs font-semibold text-black">{inv.id}</td>
                    <td className="px-5 py-4 font-sans text-xs text-black">{inv.entity}</td>
                    <td className="px-5 py-4">
                      <span className={`font-sans text-[9px] tracking-[0.1em] uppercase px-2 py-1 font-semibold ${typeStyle[inv.type]}`}>{inv.type}</span>
                    </td>
                    <td className="px-5 py-4 font-sans text-xs font-medium text-black">{inv.amount}</td>
                    <td className="px-5 py-4 font-sans text-xs text-gray-400">{inv.date}</td>
                    <td className="px-5 py-4">
                      <span className={`font-sans text-[9px] tracking-[0.1em] uppercase px-2 py-1 font-semibold ${statusStyle[inv.status]}`}>{inv.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
              <p className="font-sans text-[10px] text-gray-400">Showing 5 of 34 invoices</p>
              <div className="flex items-center gap-2">
                <button className="font-sans text-[10px] text-gray-400 border border-gray-200 px-3 py-1">Previous</button>
                <button className="font-sans text-[10px] bg-black text-white px-3 py-1">1</button>
                <button className="font-sans text-[10px] text-gray-400 border border-gray-200 px-3 py-1">2</button>
                <button className="font-sans text-[10px] text-gray-400 border border-gray-200 px-3 py-1">Next</button>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase font-semibold text-black">Invoice Details</p>
              <div className="flex items-center gap-2">
                <button className="text-gray-400 hover:text-black transition-colors">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-black transition-colors">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              {[
                { label: 'Document Number', value: 'INV-2024-001' },
                { label: 'Issue Date', value: '2024-03-15' },
                { label: 'Terms', value: 'Net 30 Days' },
              ].map((item) => (
                <div key={item.label} className="flex justify-between">
                  <span className="font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400">{item.label}</span>
                  <span className="font-sans text-xs font-medium text-black">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 mb-4">
              <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-1">Bill To</p>
              <p className="font-sans text-xs font-bold text-black uppercase">Grand Horizon Hotels</p>
              <p className="font-sans text-[10px] text-gray-500">152 Industrial Area, Block N, Dubai, UAE</p>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-4">
              <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-3">Line Items</p>
              <div className="space-y-2.5">
                {[
                  { item: 'Combi Oven iC-Line 10/1', price: '$12,400' },
                  { item: 'Walk-in Freezer Panel Kit', price: '$3,200' },
                ].map((line) => (
                  <div key={line.item} className="flex justify-between">
                    <span className="font-sans text-[10px] text-gray-600">{line.item}</span>
                    <span className="font-sans text-xs font-medium text-black">{line.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-3 space-y-1.5">
              <div className="flex justify-between">
                <span className="font-sans text-xs text-gray-500">Subtotal</span>
                <span className="font-sans text-xs font-medium text-black">$15,600.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-xs text-gray-500">VAT (5%)</span>
                <span className="font-sans text-xs font-medium text-black">$780.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg">
            <div className="bg-black px-8 py-6">
              <h2 className="font-serif text-xl text-white italic">New Financial Document</h2>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400 mt-1">GastroSpecs Internal Procurement System</p>
            </div>
            <div className="p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-2">Client / Vendor</label>
                  <input type="text" placeholder="Search entity name..." className="w-full border border-gray-200 font-sans text-xs px-4 py-3 focus:outline-none focus:border-black transition-colors" />
                </div>
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-2">Document Type</label>
                  <input type="text" className="w-full border border-gray-200 font-sans text-xs px-4 py-3 focus:outline-none focus:border-black transition-colors" />
                </div>
              </div>
              <div>
                <label className="block font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-2">Description of Goods/Services</label>
                <textarea rows={3} placeholder="Heavy duty line equipment for Project X..." className="w-full border border-gray-200 font-sans text-xs px-4 py-3 focus:outline-none focus:border-black transition-colors resize-none" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-2">Total Amount (USD)</label>
                  <input type="number" defaultValue="0.00" className="w-full border border-gray-200 font-sans text-xs px-4 py-3 focus:outline-none focus:border-black transition-colors" />
                </div>
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-2">Due Date</label>
                  <input type="date" className="w-full border border-gray-200 font-sans text-xs px-4 py-3 focus:outline-none focus:border-black transition-colors" />
                </div>
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-2">Currency</label>
                  <select className="w-full border border-gray-200 font-sans text-xs px-4 py-3 focus:outline-none focus:border-black transition-colors bg-white">
                    <option>USD - US Dollar</option>
                    <option>EUR - Euro</option>
                    <option>AED - UAE Dirham</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="font-sans text-xs text-gray-500 hover:text-black transition-colors px-5 py-2.5">Cancel</button>
                <button onClick={() => setShowModal(false)} className="bg-black text-white font-sans text-xs tracking-[0.15em] uppercase px-6 py-2.5 hover:bg-gray-800 transition-colors">Issue Document</button>
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
