'use client'

import * as React from 'react'

import type { Order, OrderStatus } from '@/types/order'

export function useOrders() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [orderToDelete, setOrderToDelete] = React.useState<Order | null>(null)

  const [statusFilter, setStatusFilter] = React.useState<OrderStatus | 'ALL'>('ALL')

  const openAddModal = React.useCallback(() => {
    setSelectedOrder(null)
    setIsModalOpen(true)
  }, [])

  const openViewModal = React.useCallback((order: Order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }, [])

  const closeModal = React.useCallback(() => {
    setIsModalOpen(false)
    setSelectedOrder(null)
  }, [])

  const openDeleteModal = React.useCallback((order: Order) => {
    setOrderToDelete(order)
    setIsDeleteModalOpen(true)
  }, [])

  const closeDeleteModal = React.useCallback(() => {
    setIsDeleteModalOpen(false)
    setOrderToDelete(null)
  }, [])

  const confirmDelete = React.useCallback(() => {
    if (orderToDelete) {
      console.log('Delete order:', {
        id: orderToDelete.id,
        customerName: orderToDelete.customerName,
      })
    } else {
      console.log('Delete order: no order selected')
    }

    closeDeleteModal()
  }, [orderToDelete, closeDeleteModal])

  return {
    isModalOpen,
    selectedOrder,
    isDeleteModalOpen,
    orderToDelete,
    statusFilter,
    openAddModal,
    openViewModal,
    closeModal,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    setStatusFilter,
  }
}
