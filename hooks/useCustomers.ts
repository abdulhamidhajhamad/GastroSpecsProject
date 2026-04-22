'use client'

import * as React from 'react'

import type { Customer } from '@/types/customer'

export function useCustomers() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [modalMode, setModalMode] = React.useState<'add' | 'edit'>('add')
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [customerToDelete, setCustomerToDelete] = React.useState<Customer | null>(null)

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

  const confirmDelete = React.useCallback(() => {
    if (customerToDelete) {
      console.log('Delete customer:', {
        id: customerToDelete.id,
        name: customerToDelete.name,
      })
    } else {
      console.log('Delete customer: no customer selected')
    }

    closeDeleteModal()
  }, [customerToDelete, closeDeleteModal])

  return {
    isModalOpen,
    modalMode,
    selectedCustomer,
    isDeleteModalOpen,
    customerToDelete,
    openAddModal,
    openEditModal,
    closeModal,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  }
}