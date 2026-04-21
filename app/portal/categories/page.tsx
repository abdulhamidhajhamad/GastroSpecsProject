'use client'

import * as React from 'react'

import PortalHeader from '@/components/portal/PortalHeader'
import CategoryStatCards from '@/components/categories/CategoryStatCards'
import CategoryGrid from '@/components/categories/CategoryGrid'
import CategoryModal from '@/components/categories/CategoryModal'
import CategoryDeleteModal from '@/components/categories/CategoryDeleteModal'

import { mockCategories } from '@/data/mockCategories'
import { useCategories } from '@/hooks/useCategories'
import type { Category } from '@/types/category'

const feed = [
  {
    name: 'Julian Voss',
    time: '1H AGO',
    message: 'New category "Packaging Solutions" created.',
  },
  {
    name: 'Lin Wei',
    time: '3H AGO',
    message: '12 machines moved to "Refrigeration Equipment".',
  },
  {
    name: 'Kevin Luo',
    time: '5H AGO',
    message: 'Updated details for Sub-Category "Conveyor Dishwashers".',
  },
  {
    name: 'System Automator',
    time: '1D AGO',
    message: 'Category performance report successfully generated.',
  },
]

function buildCategorySearchValue(category: Category) {
  const subNames = category.children.map(sub => sub.name).join(' ')
  return [
    category.name,
    category.description,
    subNames
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

export default function CategoriesPage() {
  const {
    isModalOpen,
    modalMode,
    selectedCategory,
    selectedSubCategory,
    parentForNewSub,
    isDeleteModalOpen,
    categoryToDelete,
    isUploadingImage,
    setIsUploadingImage,
    openAddParentModal,
    openAddSubModal,
    openEditParentModal,
    openEditSubModal,
    closeModal,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  } = useCategories()

  const [searchQuery, setSearchQuery] = React.useState('')
  const normalizedSearchQuery = searchQuery.trim().toLowerCase()

  const filteredCategories = React.useMemo(() => {
    if (!normalizedSearchQuery) {
      return mockCategories
    }

    return mockCategories.filter((category) =>
      buildCategorySearchValue(category).includes(normalizedSearchQuery)
    )
  }, [normalizedSearchQuery])

  const totalCategories = mockCategories.length
  
  let totalSubCategories = 0
  let totalMachinesLinked = 0
  let totalSuppliersLinked = 0 // In real app, calculate from unique suppliers across all categories
  
  mockCategories.forEach(cat => {
    totalSubCategories += cat.children.length
    cat.children.forEach(sub => {
      totalMachinesLinked += (sub.machineCount || 0)
    })
  })
  
  // Fake number based on machines to match mock realistic stats
  totalSuppliersLinked = Math.round(totalMachinesLinked * 0.8)

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <PortalHeader />
      <div className="flex-1 p-8 bg-white">
        
        {/* HEADER SECTION */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-sans font-bold text-xl tracking-[0.08em] uppercase text-black">CATEGORIES</h1>
            <p className="font-sans text-xs text-gray-400 mt-1">Manage equipment categories and sub-categories</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="border border-gray-200 font-sans text-xs tracking-wide text-gray-500 px-4 py-2 hover:border-black hover:text-black transition-colors flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Export Report
            </button>
            <button
              type="button"
              onClick={openAddParentModal}
              className="bg-black text-white font-sans text-xs tracking-wide px-4 py-2 hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              + Add Category
            </button>
          </div>
        </div>

        <CategoryStatCards
          total={totalCategories}
          subTotal={totalSubCategories}
          machinesLinked={totalMachinesLinked}
          suppliersLinked={totalSuppliersLinked}
        />

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">Categories Overview</span>
                </div>
                <button className="font-sans text-[10px] text-gray-400 hover:text-black transition-colors">View All</button>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 w-full max-w-[320px]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search categories, sub-categories..."
                    className="bg-transparent font-sans text-[10px] text-black placeholder-gray-400 focus:outline-none w-full"
                  />
                </div>
                <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-gray-400 whitespace-nowrap">
                  {filteredCategories.length} Results
                </p>
              </div>
            </div>

            <div className="p-6">
              <CategoryGrid 
                categories={filteredCategories}
                onEditParent={openEditParentModal}
                onDeleteParent={openDeleteModal}
                onAddSub={openAddSubModal}
                onEditSub={openEditSubModal}
                onDeleteSub={openDeleteModal}
              />
            </div>
          </div>

          <div className="border border-gray-200">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-200">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">Live System Feed</span>
            </div>
            <div className="p-5 space-y-5">
              {feed.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <span className="font-sans text-[8px] font-bold text-gray-500">
                      {item.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-black">{item.name}</span>
                      <span className="font-sans text-[8px] tracking-[0.1em] text-gray-400">{item.time}</span>
                    </div>
                    <p className="font-sans text-xs text-gray-600 mt-1 line-clamp-2">
                      {item.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MODALS */}
        <CategoryModal
          isOpen={isModalOpen}
          mode={modalMode}
          onClose={closeModal}
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          parentForNewSub={parentForNewSub}
          isUploadingImage={isUploadingImage}
          setIsUploadingImage={setIsUploadingImage}
        />
        
        <CategoryDeleteModal
          item={categoryToDelete}
          onConfirm={confirmDelete}
          onCancel={closeDeleteModal}
        />
        
      </div>
    </div>
  )
}