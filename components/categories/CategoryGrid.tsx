'use client'

import { useState } from 'react'
import { Category, SubCategory } from '../../types/category'
import CategoryActionsMenu from './CategoryActionsMenu'

type CategoryGridProps = {
  categories: Category[]
  onEditParent: (category: Category) => void
  onDeleteParent: (category: Category) => void
  onAddSub: (category: Category) => void
  onEditSub: (sub: SubCategory, parent: Category) => void
  onDeleteSub?: (sub: SubCategory, parent: Category) => void
}

export default function CategoryGrid({
  categories,
  onEditParent,
  onDeleteParent,
  onAddSub,
  onEditSub,
  onDeleteSub,
}: CategoryGridProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => {
        const isExpanded = expandedId === category.id
        const machinesCount = category.children.reduce(
          (sum, sub) => sum + (sub.machineCount || 0),
          0
        )

        return (
          <div 
            key={category.id} 
            className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors shadow-sm"
          >
            {/* CARD HEADER / IMAGE */}
            <div 
              className="relative w-full aspect-video bg-gray-100 cursor-pointer group overflow-hidden"
              onClick={() => toggleExpand(category.id)}
            >
              {category.imageUrl ? (
                <img 
                  src={category.imageUrl} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
                  No Cover Image
                </div>
              )}
              
              {/* Gradient overlay for better action button visibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-3 right-3 z-10">
                <CategoryActionsMenu 
                  category={category}
                  onEditParent={onEditParent}
                  onAddSub={onAddSub}
                  onDeleteParent={onDeleteParent}
                />
              </div>
            </div>

            {/* CARD BODY */}
            <div 
              className="p-5 flex-1 flex flex-col cursor-pointer"
              onClick={() => toggleExpand(category.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-mono text-base font-bold uppercase tracking-tight text-gray-900">
                  {category.name}
                </h3>
              </div>
              
              <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
                {category.description || 'No description provided.'}
              </p>

              <div className="flex items-center gap-4 text-xs font-medium text-gray-600 border-t border-gray-100 pt-4 mt-auto">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  {category.children?.length || 0} Sub-Categories
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  {machinesCount} Machines
                </div>
              </div>
            </div>

            {/* EXPANDED SUB-CATEGORIES (ACCORDION) */}
            {isExpanded && (
              <div className="px-5 pb-5 pt-2 border-t border-gray-100 bg-gray-50/50">
                <div className="flex flex-wrap gap-2 mt-2">
                  {category.children.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditSub(sub, category);
                      }}
                      className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
                    >
                      {sub.name} <span className="ml-1.5 text-gray-400">({sub.machineCount})</span>
                    </button>
                  ))}
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddSub(category);
                    }}
                    className="inline-flex items-center px-3 py-1.5 border border-dashed border-gray-300 rounded-full text-xs font-medium text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors"
                  >
                    + Add Sub-Category
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
