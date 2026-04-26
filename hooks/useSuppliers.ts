'use client'

import * as React from 'react'

import { suppliersApi } from '@/lib/api/suppliers.api'
import type { Supplier } from '@/types/supplier'

type DrawerMode = 'add' | 'edit'

export function useSuppliers() {
  const [suppliers, setSuppliers] = React.useState<Supplier[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [search, setSearch] = React.useState('')

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const [drawerMode, setDrawerMode] = React.useState<DrawerMode>('add')
  const [selectedSupplier, setSelectedSupplier] = React.useState<Supplier | null>(null)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [supplierToDelete, setSupplierToDelete] = React.useState<Supplier | null>(null)

  const fetchSuppliers = React.useCallback(async (nextSearch?: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await suppliersApi.list<Supplier[]>(nextSearch ?? search)
      setSuppliers(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch suppliers'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [search])

  React.useEffect(() => {
    void fetchSuppliers(search)
  }, [fetchSuppliers, search])

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

  const confirmDelete = React.useCallback(async () => {
    if (!supplierToDelete) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await suppliersApi.delete(supplierToDelete.id)
      await fetchSuppliers(search)
      closeDeleteModal()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete supplier'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [supplierToDelete, closeDeleteModal, fetchSuppliers, search])

  return {
    suppliers,
    isLoading,
    error,
    search,
    isDrawerOpen,
    drawerMode,
    selectedSupplier,
    isDeleteModalOpen,
    supplierToDelete,
    setSearch,
    fetchSuppliers,
    openAddDrawer,
    openEditDrawer,
    closeDrawer,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  }
}
