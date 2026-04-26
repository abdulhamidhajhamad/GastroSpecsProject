'use client'
import { useState } from 'react'
import type { Category, SubCategory } from '../../types/category'
import CategoryActionsMenu from './CategoryActionsMenu'

// props type
type CategoryGridProps = {
  categories: Category[]
  isLoading?: boolean
  onEditParent: (category: Category) => void
  onDeleteParent: (category: Category) => void
  onAddSub: (category: Category) => void
  onEditSub: (sub: SubCategory, parent: Category) => void
  onDeleteSub?: (sub: SubCategory, parent: Category) => void
}

// component function:
export default function CategoryGrid({
  categories,
  isLoading = false,
  onEditParent,
  onDeleteParent,
  onAddSub,
  onEditSub,
  onDeleteSub,
}: CategoryGridProps) {
  //   1. useState hook
  const [expandedId, setExpandedId] = useState<string | null>(null)

  //   2. toggleExpand function
  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  //   3. if (isLoading) return skeleton JSX
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={`category-skeleton-${index}`} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm animate-pulse">
            <div className="aspect-video w-full bg-gray-200" />
            <div className="space-y-3 p-5">
              <div className="h-4 w-40 bg-gray-200" />
              <div className="h-3 w-full bg-gray-100" />
              <div className="h-3 w-5/6 bg-gray-100" />
              <div className="mt-3 flex gap-4 border-t border-gray-100 pt-3">
                <div className="h-3 w-24 bg-gray-200" />
                <div className="h-3 w-20 bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  //   4. return main JSX
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => {
        const isExpanded = expandedId === category.id
        const machinesCount = category.children.reduce((sum, sub) => sum + (sub.machineCount || 0), 0)

        return (
          <article key={category.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="relative aspect-video w-full cursor-pointer bg-gray-100 group" onClick={() => toggleExpand(category.id)}>
              {category.imageUrl ? (
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-sans text-sm text-gray-400">No Cover Image</div>
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

              <div className="absolute right-3 top-3 z-10">
                <CategoryActionsMenu
                  category={category}
                  onEditParent={onEditParent}
                  onAddSub={onAddSub}
                  onDeleteParent={onDeleteParent}
                />
              </div>
            </div>

            <div className="flex cursor-pointer flex-col p-5" onClick={() => toggleExpand(category.id)}>
              <h3 className="font-mono text-base font-bold uppercase tracking-tight text-gray-900">{category.name}</h3>
              <p className="mb-4 mt-2 flex-1 text-sm text-gray-500 line-clamp-2">{category.description || 'No description provided.'}</p>

              <div className="mt-auto flex items-center gap-4 border-t border-gray-100 pt-4 text-xs font-medium text-gray-600">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  {category.children.length} Sub-Categories
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  {machinesCount} Machines
                </span>
              </div>
            </div>

            {isExpanded && (
              <div className="border-t border-gray-100 bg-gray-50/50 px-5 pb-5 pt-2">
                <div className="mt-2 flex flex-wrap gap-2">
                  {category.children.map((sub) => (
                    <div key={sub.id} className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation()
                          onEditSub(sub, category)
                        }}
                        className="hover:text-black"
                      >
                        {sub.name}
                      </button>
                      <span className="text-gray-400">({sub.machineCount})</span>
                      {onDeleteSub && (
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation()
                            onDeleteSub(sub, category)
                          }}
                          className="ml-1 text-red-500 hover:text-red-600"
                          aria-label={`Delete ${sub.name}`}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      onAddSub(category)
                    }}
                    className="inline-flex items-center rounded-full border border-dashed border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-700"
                  >
                    + Add Sub-Category
                  </button>
                </div>
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}
