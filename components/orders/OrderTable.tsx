import * as React from 'react'

import type { Order, OrderStatus } from '@/types/order'

type OrderTableProps = {
  orders: Order[]
  isLoading?: boolean
  onView: (order: Order) => void
  onDelete: (order: Order) => void
}

function formatShortId(id: string) {
  return id.slice(0, 8)
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(dateString))
}

function getStatusClasses(status: OrderStatus) {
  switch (status) {
    case 'MANUFACTURING':
      return 'border-orange-200 bg-orange-50 text-orange-700'
    case 'READY':
      return 'border-blue-200 bg-blue-50 text-blue-700'
    case 'SHIPPED':
      return 'border-purple-200 bg-purple-50 text-purple-700'
    case 'DELIVERED':
      return 'border-green-200 bg-green-50 text-green-700'
    case 'CANCELLED':
      return 'border-gray-200 bg-gray-50 text-gray-500'
    default:
      return 'border-gray-200 bg-gray-50 text-gray-500'
  }
}

function OrderActionsMenu({ order, onView, onDelete }: { order: Order; onView: (order: Order) => void; onDelete: (order: Order) => void }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  return (
    <div ref={menuRef} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-7 h-7 border border-gray-200 font-sans text-sm text-gray-400 hover:border-black hover:text-black transition-colors"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={`Open actions for order ${order.id}`}
      >
        ...
      </button>

      {isOpen && (
        <div className="absolute right-0 top-8 z-20 min-w-[160px] border border-gray-200 bg-white shadow-sm py-1">
          <button
            type="button"
            className="w-full text-left px-3 py-2 font-sans text-[11px] tracking-[0.08em] uppercase text-gray-500 hover:bg-gray-50 hover:text-black transition-colors"
            onClick={() => {
              setIsOpen(false)
              onView(order)
            }}
          >
            View Details
          </button>
          <button
            type="button"
            className="w-full text-left px-3 py-2 font-sans text-[11px] tracking-[0.08em] uppercase text-red-500 hover:bg-red-50 transition-colors"
            onClick={() => {
              setIsOpen(false)
              onDelete(order)
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default function OrderTable({ orders, isLoading = false, onView, onDelete }: OrderTableProps) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-100">
          {['ID', 'Customer', 'Items', 'Total', 'Status', 'Date', 'Actions'].map((col) => (
            <th key={col} className="px-6 py-3 text-left font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 font-normal">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <tr key={`order-skeleton-${index}`} className="border-b border-gray-100 animate-pulse">
              <td className="px-6 py-4"><div className="h-3 w-16 bg-gray-200" /></td>
              <td className="px-6 py-4 space-y-2">
                <div className="h-3 w-40 bg-gray-200" />
                <div className="h-2.5 w-28 bg-gray-100" />
              </td>
              <td className="px-6 py-4 space-y-2">
                <div className="h-3 w-28 bg-gray-200" />
                <div className="h-2.5 w-32 bg-gray-100" />
              </td>
              <td className="px-6 py-4"><div className="h-3 w-24 bg-gray-200" /></td>
              <td className="px-6 py-4"><div className="h-5 w-20 bg-gray-200" /></td>
              <td className="px-6 py-4"><div className="h-3 w-20 bg-gray-200" /></td>
              <td className="px-6 py-4"><div className="h-7 w-7 bg-gray-200" /></td>
            </tr>
          ))
        ) : orders.length === 0 ? (
          <tr>
            <td colSpan={7} className="px-6 py-10 text-center">
              <p className="font-serif text-base text-black">No orders found</p>
              <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-gray-400 mt-1">
                Try a different search or status filter.
              </p>
            </td>
          </tr>
        ) : (
          orders.map((order) => {
            const summaryItems = order.items.slice(0, 2).map((item) => item.machineName)
            const moreCount = order.items.length - summaryItems.length

            return (
              <tr
                key={order.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                tabIndex={0}
                onClick={() => onView(order)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    onView(order)
                  }
                }}
              >
                <td className="px-6 py-4 font-mono text-[11px] text-gray-400">{formatShortId(order.id)}</td>

                <td className="px-6 py-4">
                  <p className="font-sans text-xs font-semibold text-black">{order.customerName}</p>
                  <p className="font-sans text-[10px] text-gray-400 mt-0.5">{order.customerCompany || '-'}</p>
                </td>

                <td className="px-6 py-4">
                  <p className="font-sans text-xs text-black">{order.items.length} item{order.items.length === 1 ? '' : 's'}</p>
                  <p className="font-sans text-[10px] text-gray-400 mt-0.5">
                    {summaryItems.join(', ')}{moreCount > 0 ? ` +${moreCount} more` : ''}
                  </p>
                </td>

                <td className="px-6 py-4 font-sans text-xs text-black font-medium">
                  {formatCurrency(order.totalPrice)}
                </td>

                <td className="px-6 py-4">
                  <span className={`inline-flex items-center border px-2.5 py-1 font-sans text-[9px] font-semibold tracking-[0.12em] uppercase ${getStatusClasses(order.status)}`}>
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-4 font-sans text-xs text-gray-500">{formatDate(order.createdAt)}</td>

                <td className="px-6 py-4" onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>
                  <OrderActionsMenu order={order} onView={onView} onDelete={onDelete} />
                </td>
              </tr>
            )
          })
        )}
      </tbody>
    </table>
  )
}