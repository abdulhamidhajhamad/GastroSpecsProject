type OrderStatusFilterProps = {
  statusFilter: 'ALL' | 'MANUFACTURING' | 'READY' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  onChange: (status: 'ALL' | 'MANUFACTURING' | 'READY' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED') => void
}

const filters: OrderStatusFilterProps['statusFilter'][] = [
  'ALL',
  'MANUFACTURING',
  'READY',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
]

export default function OrderStatusFilter({ statusFilter, onChange }: OrderStatusFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.map((filter) => {
        const active = filter === statusFilter

        return (
          <button
            key={filter}
            type="button"
            onClick={() => onChange(filter)}
            className={`px-3 py-2 font-sans text-[10px] tracking-[0.15em] uppercase border transition-colors ${
              active
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'
            }`}
          >
            {filter === 'ALL' ? 'All' : filter}
          </button>
        )
      })}
    </div>
  )
}