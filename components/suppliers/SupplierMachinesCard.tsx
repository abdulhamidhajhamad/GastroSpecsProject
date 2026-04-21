'use client'

import * as React from 'react'

export type SupplierMachineRow = {
  id: string
  machineName: string
  category: string
  qty: number
  costPrice: string
  status: 'Active' | 'Seasonal' | 'Paused'
}

type SupplierMachinesCardProps = {
  machines: SupplierMachineRow[]
}

const statusStyle: Record<SupplierMachineRow['status'], string> = {
  Active: 'border-green-200 bg-green-50 text-green-600',
  Seasonal: 'border-orange-200 bg-orange-50 text-orange-600',
  Paused: 'border-gray-200 bg-gray-50 text-gray-500',
}

export default function SupplierMachinesCard({ machines }: SupplierMachinesCardProps) {
  const [showCostPrice, setShowCostPrice] = React.useState(false)

  return (
    <div className="border border-gray-200">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">Machine Portfolio</span>
        </div>

        <button
          type="button"
          onClick={() => setShowCostPrice((prev) => !prev)}
          className="border border-gray-200 font-sans text-[10px] tracking-[0.1em] uppercase text-gray-500 px-3 py-1.5 hover:border-black hover:text-black transition-colors flex items-center gap-1.5"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          {showCostPrice ? 'Hide Cost Price' : 'Show Cost Price'}
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            {[
              'Machine',
              'Category',
              'Qty',
              ...(showCostPrice ? ['Cost Price'] : []),
              'Status',
            ].map((col) => (
              <th key={col} className="px-6 py-3 text-left font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 font-normal">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {machines.map((machine) => (
            <tr key={machine.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="px-6 py-4">
                <p className="font-sans text-xs font-semibold text-black">{machine.machineName}</p>
                <p className="font-sans text-[9px] text-gray-400 mt-0.5 uppercase tracking-wide">SKU: {machine.id}</p>
              </td>
              <td className="px-6 py-4 font-sans text-xs text-gray-600">{machine.category}</td>
              <td className="px-6 py-4 font-sans text-xs text-black font-medium">{machine.qty}</td>
              {showCostPrice && (
                <td className="px-6 py-4 font-sans text-xs text-black font-medium">{machine.costPrice}</td>
              )}
              <td className="px-6 py-4">
                <span className={`inline-flex items-center border px-2.5 py-1 font-sans text-[9px] font-semibold tracking-[0.12em] uppercase ${statusStyle[machine.status]}`}>
                  {machine.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}