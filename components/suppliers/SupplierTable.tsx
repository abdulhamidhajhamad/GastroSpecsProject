import SupplierActionsMenu from '@/components/suppliers/SupplierActionsMenu'
import type { Supplier } from '@/types/supplier'

type SupplierTableProps = {
  suppliers: Supplier[]
  onEdit: (supplier: Supplier) => void
  onDelete: (supplier: Supplier) => void
  onView: (supplier: Supplier) => void
}

function formatShortId(id: string) {
  return id.slice(0, 8)
}

function formatLocation(supplier: Supplier) {
  return [supplier.location.district, supplier.location.city, supplier.location.province]
    .filter(Boolean)
    .join(', ')
}

export default function SupplierTable({ suppliers, onEdit, onDelete, onView }: SupplierTableProps) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-100">
          {['ID', 'Company & Location', 'Contact', 'DDP Partner', 'Machines', 'Actions'].map((col) => (
            <th key={col} className="px-6 py-3 text-left font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 font-normal">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {suppliers.length === 0 ? (
          <tr>
            <td colSpan={6} className="px-6 py-10 text-center">
              <p className="font-serif text-base text-black">No suppliers found</p>
              <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-gray-400 mt-1">
                Try a different name, location, or contact detail.
              </p>
            </td>
          </tr>
        ) : (
          suppliers.map((supplier) => (
            <tr
              key={supplier.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
              tabIndex={0}
              onClick={() => onView(supplier)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  onView(supplier)
                }
              }}
            >
              <td className="px-6 py-4 font-mono text-[11px] text-gray-400">{formatShortId(supplier.id)}</td>

              <td className="px-6 py-4">
                <p className="font-sans text-xs font-semibold text-black">{supplier.companyName}</p>
                <p className="font-sans text-[10px] text-gray-400 mt-0.5">{formatLocation(supplier)}</p>
              </td>

              <td className="px-6 py-4">
                <p className="font-sans text-xs text-black">{supplier.phone || '-'}</p>
                <p className="font-sans text-[10px] uppercase tracking-wide text-gray-400 mt-0.5">WeChat: {supplier.wechat || '-'}</p>
              </td>

              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center border px-2.5 py-1 font-sans text-[9px] font-semibold tracking-[0.12em] uppercase ${supplier.isDdpPartner ? 'border-green-200 bg-green-50 text-green-600' : 'border-gray-200 bg-gray-50 text-gray-500'}`}
                >
                  {supplier.isDdpPartner ? 'YES' : 'NO'}
                </span>
              </td>

              <td className="px-6 py-4 font-sans text-xs text-black font-medium">{supplier.machineCount}</td>

              <td
                className="px-6 py-4"
                onClick={(event) => event.stopPropagation()}
                onKeyDown={(event) => event.stopPropagation()}
              >
                <SupplierActionsMenu supplier={supplier} onEdit={onEdit} onDelete={onDelete} />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}