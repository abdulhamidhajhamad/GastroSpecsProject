type Props = {
  label: string
  value: string
  trend?: string
  trendUp?: boolean
  icon?: React.ReactNode
}

export default function StatCard({ label, value, trend, trendUp, icon }: Props) {
  return (
    <div className="border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="text-gray-400">{icon}</div>
        {trend && (
          <span className={`font-sans text-[10px] tracking-wide ${trendUp ? 'text-green-600' : 'text-red-500'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
      <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-1">{label}</p>
      <p className="font-serif text-3xl font-bold text-black">{value}</p>
    </div>
  )
}
