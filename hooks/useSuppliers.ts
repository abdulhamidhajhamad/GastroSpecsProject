'use client'

import * as React from 'react'

import type { Supplier } from '@/types/supplier'

type DrawerMode = 'add' | 'edit'

export function useSuppliers() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const [drawerMode, setDrawerMode] = React.useState<DrawerMode>('add')
  const [selectedSupplier, setSelectedSupplier] = React.useState<Supplier | null>(null)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [supplierToDelete, setSupplierToDelete] = React.useState<Supplier | null>(null)

  const openAddDrawer = React.useCallback(() => {
    setDrawerMode('add')
    setSelectedSupplier(null)
    setIsDrawerOpen(true)
  }, [])

  const openEditDrawer = React.useCallback((supplier: Supplier) => {
    setDrawerMode('edit')
    setSelectedSupplier(supplier)
    setIsDrawerOpen(true)
  }, [])

  const closeDrawer = React.useCallback(() => {
    setIsDrawerOpen(false)
    setSelectedSupplier(null)
  }, [])

  const openDeleteModal = React.useCallback((supplier: Supplier) => {
    setSupplierToDelete(supplier)
    setIsDeleteModalOpen(true)
  }, [])

  const closeDeleteModal = React.useCallback(() => {
    setIsDeleteModalOpen(false)
    setSupplierToDelete(null)
  }, [])

  const confirmDelete = React.useCallback(() => {
    if (supplierToDelete) {
      console.log('Delete supplier:', {
        id: supplierToDelete.id,
        companyName: supplierToDelete.companyName,
      })
    } else {
      console.log('Delete supplier: no supplier selected')
    }

    closeDeleteModal()
  }, [supplierToDelete, closeDeleteModal])

  return {
    isDrawerOpen,
    drawerMode,
    selectedSupplier,
    isDeleteModalOpen,
    supplierToDelete,
    openAddDrawer,
    openEditDrawer,
    closeDrawer,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  }
}
