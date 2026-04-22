'use client'

import * as React from 'react'
import type { Category, SubCategory } from '@/types/category'

export type ModalMode = 'add-parent' | 'add-sub' | 'edit-parent' | 'edit-sub'

export function useCategories() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [modalMode, setModalMode] = React.useState<ModalMode>('add-parent')
  
  const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null)
  const [selectedSubCategory, setSelectedSubCategory] = React.useState<SubCategory | null>(null)
  const [parentForNewSub, setParentForNewSub] = React.useState<Category | null>(null)
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [categoryToDelete, setCategoryToDelete] = React.useState<Category | SubCategory | null>(null)
  
  const [isUploadingImage, setIsUploadingImage] = React.useState(false)

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

  const confirmDelete = () => {
    console.log('Confirmed delete for:', categoryToDelete)
    // Deletion logic hooks in here in the future
    closeDeleteModal()
  }

  return {
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
  }
}
