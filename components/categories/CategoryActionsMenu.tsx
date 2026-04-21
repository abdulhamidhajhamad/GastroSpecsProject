'use client'

import * as React from 'react'

import type { Category } from '@/types/category'

type CategoryActionsMenuProps = {
  category: Category
  onEditParent: (category: Category) => void
  onAddSub: (category: Category) => void
  onDeleteParent: (category: Category) => void
}

export default function CategoryActionsMenu({ category, onEditParent, onAddSub, onDeleteParent }: CategoryActionsMenuProps) {
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
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen((prev) => !prev)
        }}
        className="w-7 h-7 bg-white/90 hover:bg-white rounded-md text-gray-700 shadow-sm backdrop-blur-sm transition-colors flex items-center justify-center border border-gray-200 pt-0.5 leading-none hover:text-black hover:border-black"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={`Open actions for ${category.name}`}
      >
        ...
      </button>

      {isOpen && (
        <div className="absolute right-0 top-8 z-20 min-w-[160px] border border-gray-200 bg-white shadow-sm py-1 rounded-sm">
          <button
            type="button"
            className="w-full text-left px-3 py-2 font-sans text-[11px] tracking-[0.08em] uppercase text-gray-500 hover:bg-gray-50 hover:text-black transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(false)
              onEditParent(category)
            }}
          >
            Edit Category
          </button>
          <button
            type="button"
            className="w-full text-left px-3 py-2 font-sans text-[11px] tracking-[0.08em] uppercase text-gray-500 hover:bg-gray-50 hover:text-black transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(false)
              onAddSub(category)
            }}
          >
            Add Sub-Category
          </button>
          <button
            type="button"
            className="w-full text-left px-3 py-2 font-sans text-[11px] tracking-[0.08em] uppercase text-red-500 hover:bg-red-50 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(false)
              onDeleteParent(category)
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}