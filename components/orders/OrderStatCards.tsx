import React from 'react'

type OrderStatCardsProps = {
  total: number | string
  manufacturing: number | string
  shipped: number | string
  delivered: number | string
}

export default function OrderStatCards({
  total,
  manufacturing,
  shipped,
  delivered,
}: OrderStatCardsProps) {
  const stats = [
    { label: 'TOTAL ORDERS', value: total, trend: '+6%', trendUp: true },
    { label: 'IN PRODUCTION', value: manufacturing, trend: '+2%', trendUp: true },
    { label: 'SHIPPED', value: shipped, trend: '+11%', trendUp: true },
    { label: 'DELIVERED', value: delivered, trend: '+18%', trendUp: true },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 mb-8">
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
  )
}