'use client'

import * as React from 'react'

import { customersApi } from '@/lib/api/customers.api'
import type { Customer } from '@/types/customer'

export function useCustomers() {
  const [customers, setCustomers] = React.useState<Customer[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [search, setSearch] = React.useState('')

  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [modalMode, setModalMode] = React.useState<'add' | 'edit'>('add')
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [customerToDelete, setCustomerToDelete] = React.useState<Customer | null>(null)

  const fetchCustomers = React.useCallback(async (nextSearch?: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await customersApi.list<Customer[]>(nextSearch ?? search)
      setCustomers(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch customers'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [search])

  React.useEffect(() => {
    void fetchCustomers(search)
  }, [fetchCustomers, search])

  const openAddModal = React.useCallback(() => {
    setSelectedCustomer(null)
    setModalMode('add')
    setIsModalOpen(true)
  }, [])

  const openEditModal = React.useCallback((customer: Customer) => {
    setSelectedCustomer(customer)
    setModalMode('edit')
    setIsModalOpen(true)
  }, [])

  const closeModal = React.useCallback(() => {
    setIsModalOpen(false)
    setSelectedCustomer(null)
  }, [])

  const openDeleteModal = React.useCallback((customer: Customer) => {
    setCustomerToDelete(customer)
    setIsDeleteModalOpen(true)
  }, [])

  const closeDeleteModal = React.useCallback(() => {
    setIsDeleteModalOpen(false)
    setCustomerToDelete(null)
  }, [])

  const confirmDelete = React.useCallback(async () => {
    if (!customerToDelete) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await customersApi.delete(customerToDelete.id)
      await fetchCustomers(search)
      closeDeleteModal()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete customer'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [customerToDelete, closeDeleteModal, fetchCustomers, search])

  return {
    customers,
    isLoading,
    error,
    search,
    isModalOpen,
    modalMode,
    selectedCustomer,
    isDeleteModalOpen,
    customerToDelete,
    setSearch,
    fetchCustomers,
    openAddModal,
    openEditModal,
    closeModal,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  }
}