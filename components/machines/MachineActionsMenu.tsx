'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'

import type { Machine } from '@/types/machine'

type MachineActionsMenuProps = {
  machine: Machine
  onEdit: (machine: Machine) => void
  onDelete: (machine: Machine) => void
  onView?: (machine: Machine) => void
}

export default function MachineActionsMenu({ machine, onEdit, onDelete, onView }: MachineActionsMenuProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) {
        return
      }

      if (!menuRef.current.contains(event.target as Node)) {
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
        className="w-7 h-7 border border-gray-200 font-sans text-sm text-gray-400 hover:border-black hover:text-black transition-colors flex items-center justify-center pt-0.5 leading-none"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={`Open actions for ${machine.name}`}
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
              if (onView) {
                onView(machine)
              } else {
                router.push(`/portal/machines/${machine.id}`)
              }
            }}
          >
            View Details
          </button>
          <button
            type="button"
            className="w-full text-left px-3 py-2 font-sans text-[11px] tracking-[0.08em] uppercase text-gray-500 hover:bg-gray-50 hover:text-black transition-colors"
            onClick={() => {
              setIsOpen(false)
              onEdit(machine)
            }}
          >
            Edit
          </button>
          <button
            type="button"
            className="w-full text-left px-3 py-2 font-sans text-[11px] tracking-[0.08em] uppercase text-red-500 hover:bg-red-50 transition-colors"
            onClick={() => {
              setIsOpen(false)
              onDelete(machine)
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}
