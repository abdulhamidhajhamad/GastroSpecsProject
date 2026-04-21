type MachineStatCardsProps = {
  total: number | string
  categories: number | string
  suppliersLinked: number | string
  newThisMonth: number | string
}

export default function MachineStatCards({
  total,
  categories,
  suppliersLinked,
  newThisMonth,
}: MachineStatCardsProps) {
  const stats = [
    { label: 'TOTAL MACHINES', value: total, trend: '+8%', trendUp: true },
    { label: 'CATEGORIES', value: categories, trend: '0%', trendUp: true },
    { label: 'SUPPLIERS LINKED', value: suppliersLinked, trend: '+12%', trendUp: true },
    { label: 'NEW THIS MONTH', value: newThisMonth, trend: '+2', trendUp: true },
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
