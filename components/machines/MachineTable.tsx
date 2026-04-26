import type { Machine } from '@/types/machine'
import MachineActionsMenu from '@/components/machines/MachineActionsMenu'

type MachineTableProps = {
  machines: Machine[]
  isLoading?: boolean
  onEdit: (machine: Machine) => void
  onDelete: (machine: Machine) => void
  onView?: (machine: Machine) => void
}

function formatShortId(id: string) {
  // Removes common prefixes if any, and slices to 8 chars
  return id.replace(/^mach_/, '').slice(0, 8)
}

export default function MachineTable({ machines, isLoading = false, onEdit, onDelete, onView }: MachineTableProps) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-100">
          {['ID', 'Name & Category', 'Suppliers Count', 'Specs Preview', 'Actions'].map((col) => (
            <th key={col} className="px-6 py-3 text-left font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 font-normal">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <tr key={`machine-skeleton-${index}`} className="border-b border-gray-100 animate-pulse">
              <td className="px-6 py-4"><div className="h-3 w-16 bg-gray-200" /></td>
              <td className="px-6 py-4 space-y-2">
                <div className="h-3 w-44 bg-gray-200" />
                <div className="h-2.5 w-28 bg-gray-100" />
              </td>
              <td className="px-6 py-4"><div className="h-5 w-8 bg-gray-200" /></td>
              <td className="px-6 py-4 flex gap-2">
                <div className="h-5 w-20 bg-gray-200" />
                <div className="h-5 w-16 bg-gray-100" />
              </td>
              <td className="px-6 py-4"><div className="h-7 w-7 bg-gray-200" /></td>
            </tr>
          ))
        ) : machines.length === 0 ? (
          <tr>
            <td colSpan={5} className="px-6 py-10 text-center">
              <p className="font-serif text-base text-black">No machines found</p>
              <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-gray-400 mt-1">
                Try a different search term or category.
              </p>
            </td>
          </tr>
        ) : (
          machines.map((machine) => {
            const specEntries = Object.entries(machine.specifications).slice(0, 2)
            const supplierCount = (() => {
              const machineAny = machine as any
              if (Array.isArray(machineAny.machineSuppliers) && machineAny.machineSuppliers.length > 0) {
                return machineAny.machineSuppliers.length
              }
              return machineAny.supplierId ? 1 : 0
            })()
            
            return (
              <tr
                key={machine.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                tabIndex={0}
                onClick={() => onView?.(machine)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    onView?.(machine)
                  }
                }}
              >
                <td className="px-6 py-4 font-mono text-[11px] text-gray-400">{formatShortId(machine.id)}</td>

                <td className="px-6 py-4">
                  <p className="font-sans text-xs font-semibold text-black">{machine.name}</p>
                  <p className="font-sans text-[10px] uppercase tracking-wide text-gray-400 mt-0.5">{machine.categoryName}</p>
                </td>

                <td className="px-6 py-4">
                  <span className="inline-flex items-center justify-center border border-gray-200 bg-gray-50 text-gray-700 px-2.5 py-0.5 font-sans text-[10px] font-medium min-w-[24px]">
                    {supplierCount}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {specEntries.length > 0 ? (
                      specEntries.map(([key, value]) => (
                        <span key={key} className="inline-flex items-center bg-gray-100 text-gray-600 px-2 py-1 font-sans text-[9px] uppercase tracking-wide">
                          <span className="font-semibold mr-1">{key}:</span> {value}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] text-gray-400 font-sans italic">No specs</span>
                    )}
                  </div>
                </td>

                <td
                  className="px-6 py-4"
                  onClick={(event) => event.stopPropagation()}
                  onKeyDown={(event) => event.stopPropagation()}
                >
                  <MachineActionsMenu machine={machine} onEdit={onEdit} onDelete={onDelete} onView={onView} />
                </td>
              </tr>
            )
          })
        )}
      </tbody>
    </table>
  )
}
