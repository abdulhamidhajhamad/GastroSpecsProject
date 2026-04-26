'use client'

import * as React from 'react'
import { categoriesApi } from '@/lib/api/categories.api'
import type { Category, SubCategory } from '@/types/category'

export type ModalMode = 'add-parent' | 'add-sub' | 'edit-parent' | 'edit-sub'

export function useCategories() {
  const [categories, setCategories] = React.useState<Category[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [search, setSearch] = React.useState('')

  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [modalMode, setModalMode] = React.useState<ModalMode>('add-parent')
  
  const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null)
  const [selectedSubCategory, setSelectedSubCategory] = React.useState<SubCategory | null>(null)
  const [parentForNewSub, setParentForNewSub] = React.useState<Category | null>(null)
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [categoryToDelete, setCategoryToDelete] = React.useState<Category | SubCategory | null>(null)
  
  const [isUploadingImage, setIsUploadingImage] = React.useState(false)

  const fetchCategories = React.useCallback(async (nextSearch?: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await categoriesApi.list<Category[]>(nextSearch ?? search)
      setCategories(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch categories'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [search])

  React.useEffect(() => {
    void fetchCategories(search)
  }, [fetchCategories, search])

  const openAddParentModal = () => {
    setModalMode('add-parent')
    setSelectedCategory(null)
    setSelectedSubCategory(null)
    setParentForNewSub(null)
    setIsModalOpen(true)
  }

  const openAddSubModal = (parent: Category) => {
    setModalMode('add-sub')
    setSelectedCategory(null)
    setSelectedSubCategory(null)
    setParentForNewSub(parent)
    setIsModalOpen(true)
  }

  const openEditParentModal = (category: Category) => {
    setModalMode('edit-parent')
    setSelectedCategory(category)
    setSelectedSubCategory(null)
    setParentForNewSub(null)
    setIsModalOpen(true)
  }

  const openEditSubModal = (sub: SubCategory, parent: Category) => {
    setModalMode('edit-sub')
    setSelectedCategory(null)
    setSelectedSubCategory(sub)
    setParentForNewSub(parent)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setSelectedCategory(null)
      setSelectedSubCategory(null)
      setParentForNewSub(null)
    }, 200) // Reset state after closing animation
  }

  const openDeleteModal = (item: Category | SubCategory) => {
    setCategoryToDelete(item)
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setTimeout(() => {
      setCategoryToDelete(null)
    }, 200) // Reset state after animation
  }

  const confirmDelete = async () => {
    if (!categoryToDelete) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await categoriesApi.delete(categoryToDelete.id)
      await fetchCategories(search)
      closeDeleteModal()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete category'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    categories,
    isLoading,
    error,
    search,
    isModalOpen,
    modalMode,
    selectedCategory,
    selectedSubCategory,
    parentForNewSub,
    isDeleteModalOpen,
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
  }
}
