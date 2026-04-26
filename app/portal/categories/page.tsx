'use client'

import * as React from 'react'

import PortalHeader from '@/components/portal/PortalHeader'
import CategoryStatCards from '@/components/categories/CategoryStatCards'
import CategoryGrid from '@/components/categories/CategoryGrid'
import CategoryModal from '@/components/categories/CategoryModal'
import CategoryDeleteModal from '@/components/categories/CategoryDeleteModal'
import { useCategories } from '@/hooks/useCategories'
import type { CategoryModalSubmitData } from '@/components/categories/CategoryModal'
import { categoriesApi } from '@/lib/api/categories.api'

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

export default function CategoriesPage() {
  const {
    categories,
    isLoading,
    error,
    search,
    isModalOpen,
    modalMode,
    selectedCategory,
    selectedSubCategory,
    parentForNewSub,
    categoryToDelete,
    isUploadingImage,
    setSearch,
    fetchCategories,
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

  const [isModalSubmitting, setIsModalSubmitting] = React.useState(false)
  const [modalSubmitError, setModalSubmitError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!isModalOpen) {
      setModalSubmitError(null)
    }
  }, [isModalOpen])

  const handleModalSubmit = React.useCallback(async (payload: CategoryModalSubmitData) => {
    setIsModalSubmitting(true)
    setModalSubmitError(null)

    try {
      if (modalMode === 'add-parent') {
        await categoriesApi.create({
          name: payload.name,
          description: payload.description,
          imageUrl: payload.imageUrl,
        })
      } else if (modalMode === 'edit-parent' && selectedCategory) {
        await categoriesApi.update(selectedCategory.id, {
          name: payload.name,
          description: payload.description,
          imageUrl: payload.imageUrl,
        })
      } else if (modalMode === 'add-sub' && parentForNewSub) {
        await categoriesApi.create({
          name: payload.name,
          parentId: parentForNewSub.id,
          imageUrl: payload.imageUrl,
        })
      } else if (modalMode === 'edit-sub' && selectedSubCategory) {
        await categoriesApi.update(selectedSubCategory.id, {
          name: payload.name,
          parentId: payload.parentId ?? parentForNewSub?.id,
          imageUrl: payload.imageUrl,
        })
      }

      closeModal()
      await fetchCategories(search)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save category'
      setModalSubmitError(message)
    } finally {
      setIsModalSubmitting(false)
    }
  }, [modalMode, selectedCategory, selectedSubCategory, parentForNewSub, closeModal, fetchCategories, search])

  const totalCategories = categories.length
  const totalSubCategories = categories.reduce((sum, category) => sum + category.children.length, 0)
  const totalMachinesLinked = categories.reduce(
    (sum, category) => sum + category.children.reduce((childSum, child) => childSum + (child.machineCount || 0), 0),
    0,
  )
  const totalSuppliersLinked = Math.round(totalMachinesLinked * 0.8)

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <PortalHeader />
      <div className="flex-1 p-8 bg-white">
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
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search categories, sub-categories..."
                    className="bg-transparent font-sans text-[10px] text-black placeholder-gray-400 focus:outline-none w-full"
                  />
                </div>
                <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-gray-400 whitespace-nowrap">
                  {categories.length} Results
                </p>
              </div>
            </div>

            {error && (
              <div className="mx-6 mt-4 border border-red-200 bg-red-50 px-4 py-3 flex items-center justify-between gap-4">
                <p className="font-sans text-xs text-red-700">{error}</p>
                <button
                  type="button"
                  onClick={() => void fetchCategories(search)}
                  className="border border-red-300 bg-white font-sans text-[10px] tracking-[0.12em] uppercase text-red-700 px-3 py-1.5 hover:border-red-500 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            <div className="p-6">
              <CategoryGrid
                categories={categories}
                isLoading={isLoading}
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
                    <p className="font-sans text-xs text-gray-600 mt-1 line-clamp-2">{item.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <CategoryModal
          isOpen={isModalOpen}
          mode={modalMode}
          onClose={closeModal}
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          parentForNewSub={parentForNewSub}
          isUploadingImage={isUploadingImage}
          setIsUploadingImage={setIsUploadingImage}
          onSubmit={handleModalSubmit}
          isSubmitting={isModalSubmitting}
          submitError={modalSubmitError}
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