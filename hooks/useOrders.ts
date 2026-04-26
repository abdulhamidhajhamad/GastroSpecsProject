'use client'

import * as React from 'react'

import { ordersApi } from '@/lib/api/orders.api'
import type { Order, OrderStatus } from '@/types/order'

type OrderListApiResponse = {
  id: string
  status: OrderStatus
  totalPrice: number
  notes?: string | null
  createdAt: string
  updatedAt: string
  customer: {
    id: string
    name: string
    companyName?: string | null
  }
  salesPerson: {
    id: string
    fullName: string
  }
}

type OrderDetailApiResponse = OrderListApiResponse & {
  orderItems: Array<{
    id: string
    supplierId: string
    quantity: number
    unitPrice: number
    totalPrice: number
    deliveryStatus?: string | null
    notes?: string | null
    supplier: {
      id: string
      companyName: string
    }
    machine: {
      id: string
      name: string
      images?: string[]
    }
  }>
}

function mapOrderListItemFromApi(order: OrderListApiResponse): Order {
  return {
    id: order.id,
    customerId: order.customer.id,
    customerName: order.customer.name,
    customerCompany: order.customer.companyName ?? undefined,
    salesPersonId: order.salesPerson.id,
    salesPersonName: order.salesPerson.fullName,
    status: order.status,
    totalPrice: order.totalPrice,
    notes: order.notes ?? undefined,
    items: [],
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  }
}

function mapOrderDetailFromApi(order: OrderDetailApiResponse): Order {
  return {
    ...mapOrderListItemFromApi(order),
    items: order.orderItems.map((item) => ({
      id: item.id,
      machineId: item.machine.id,
      machineName: item.machine.name,
      machineImage: item.machine.images?.[0],
      supplierId: item.supplier.id,
      supplierName: item.supplier.companyName,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
      deliveryStatus: item.deliveryStatus ?? undefined,
      notes: item.notes ?? undefined,
    })),
  }
}

export function useOrders() {
  const [orders, setOrders] = React.useState<Order[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [search, setSearch] = React.useState('')

  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [orderToDelete, setOrderToDelete] = React.useState<Order | null>(null)

  const [statusFilter, setStatusFilter] = React.useState<OrderStatus | 'ALL'>('ALL')

  const fetchOrders = React.useCallback(async (nextSearch?: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await ordersApi.list<OrderListApiResponse[]>(nextSearch ?? search)
      setOrders(data.map(mapOrderListItemFromApi))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch orders'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [search])

  React.useEffect(() => {
    void fetchOrders(search)
  }, [fetchOrders, search])

  const openAddModal = React.useCallback(() => {
    setSelectedOrder(null)
    setIsModalOpen(true)
  }, [])

  const openViewModal = React.useCallback(async (order: Order) => {
    setIsLoading(true)
    setError(null)

    try {
      const detail = await ordersApi.getById<OrderDetailApiResponse>(order.id)
      setSelectedOrder(mapOrderDetailFromApi(detail))
      setIsModalOpen(true)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch order details'
      setError(message)
    } finally {
      setIsLoading(false)
    }
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

  const confirmDelete = React.useCallback(async () => {
    if (!orderToDelete) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await ordersApi.delete(orderToDelete.id)
      await fetchOrders(search)
      closeDeleteModal()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete order'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [orderToDelete, closeDeleteModal, fetchOrders, search])

  return {
    orders,
    isLoading,
    error,
    search,
    isModalOpen,
    selectedOrder,
    isDeleteModalOpen,
    orderToDelete,
    statusFilter,
    setSearch,
    fetchOrders,
    openAddModal,
    openViewModal,
    closeModal,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    setStatusFilter,
  }
}
