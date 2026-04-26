"use client"

import * as React from 'react'

import PortalHeader from '@/components/portal/PortalHeader'
import OrderDeleteModal from '@/components/orders/OrderDeleteModal'
import OrderModal from '@/components/orders/OrderModal'
import OrderStatCards from '@/components/orders/OrderStatCards'
import OrderStatusFilter from '@/components/orders/OrderStatusFilter'
import OrderTable from '@/components/orders/OrderTable'
import { useOrders } from '@/hooks/useOrders'
import type { OrderModalSubmitData } from '@/components/orders/OrderModal'
import { customersApi } from '@/lib/api/customers.api'
import { machinesApi } from '@/lib/api/machines.api'
import { ordersApi } from '@/lib/api/orders.api'
import type { Customer } from '@/types/customer'
import type { Machine } from '@/types/machine'
import type { Order } from '@/types/order'

const feed = [
  {
    name: 'Lin Wei',
    time: '4M AGO',
    message: 'Released shipment schedule for order ORD-1001 to the logistics team.',
  },
  {
    name: 'Kevin Luo',
    time: '23M AGO',
    message: 'Updated factory readiness notes for the Qatar catering rollout.',
  },
  {
    name: 'Ivy Chen',
    time: '1H AGO',
    message: 'Confirmed shipping documents for the EuroFoods refrigeration bundle.',
  },
  {
    name: 'System',
    time: '3H AGO',
    message: 'Auto-status sync completed for delivered and cancelled orders.',
  },
]

export default function OrdersPage() {
  const {
    orders,
    isLoading,
    error,
    search,
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
    fetchOrders,
    setSearch,
    setStatusFilter,
  } = useOrders()

  const [customerOptions, setCustomerOptions] = React.useState<Customer[]>([])
  const [machineOptions, setMachineOptions] = React.useState<Machine[]>([])
  const [isModalSubmitting, setIsModalSubmitting] = React.useState(false)
  const [modalSubmitError, setModalSubmitError] = React.useState<string | null>(null)

  const filteredOrders = React.useMemo(() => {
    return orders.filter((order) => statusFilter === 'ALL' || order.status === statusFilter)
  }, [orders, statusFilter])

  React.useEffect(() => {
    const loadOptions = async () => {
      try {
        const [customers, machines] = await Promise.all([
          customersApi.list<Customer[]>(),
          machinesApi.list<Machine[]>(),
        ])

        setCustomerOptions(customers)
        setMachineOptions(machines)
      } catch {
        setCustomerOptions([])
        setMachineOptions([])
      }
    }

    void loadOptions()
  }, [])

  React.useEffect(() => {
    if (!isModalOpen) {
      setModalSubmitError(null)
    }
  }, [isModalOpen])

  const handleOrderSubmit = React.useCallback(async (payload: OrderModalSubmitData) => {
    setIsModalSubmitting(true)
    setModalSubmitError(null)

    try {
      if (!selectedOrder) {
        await ordersApi.create({
          customerId: payload.customerId,
          salesPersonId: payload.salesPersonId,
          notes: payload.notes.trim() || undefined,
          items: payload.items.map((item) => ({
            machineId: item.machineId,
            supplierId: item.supplierId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            notes: item.notes.trim() || undefined,
          })),
        })

        closeModal()
        await fetchOrders(search)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save order'
      setModalSubmitError(message)
    } finally {
      setIsModalSubmitting(false)
    }
  }, [selectedOrder, closeModal, fetchOrders, search])

  const totalOrders = orders.length
  const inProduction = orders.filter((order) => order.status === 'MANUFACTURING' || order.status === 'READY').length
  const shipped = orders.filter((order) => order.status === 'SHIPPED').length
  const delivered = orders.filter((order) => order.status === 'DELIVERED').length

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <PortalHeader />

      <div className="bg-white border-b border-gray-200 px-8 py-8 mb-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-2">Portal</p>
            <h1 className="font-serif text-3xl text-black italic">ORDERS</h1>
            <p className="font-sans text-sm text-gray-500 mt-2">Track and manage customer orders</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => console.log('Exporting orders report...')}
              className="flex items-center gap-2 border border-gray-200 px-4 py-2 font-sans text-xs tracking-wide text-gray-600 hover:border-black hover:text-black transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export Report
            </button>
            <button
              onClick={openAddModal}
              className="bg-black text-white px-5 py-2 font-sans text-xs tracking-wide hover:bg-gray-800 transition-colors"
            >
              + Create Order
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 max-w-[1600px] mx-auto">
        <OrderStatCards
          total={totalOrders}
          manufacturing={inProduction}
          shipped={shipped}
          delivered={delivered}
        />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3">
            <div className="bg-white border border-gray-200 p-4 mb-4">
              <OrderStatusFilter statusFilter={statusFilter} onChange={setStatusFilter} />
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 w-full max-w-[360px]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search order, customer, machine..."
                    className="bg-transparent font-sans text-[10px] text-black placeholder-gray-400 focus:outline-none w-full"
                  />
                </div>
                <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-gray-400 whitespace-nowrap">
                  {filteredOrders.length} Results
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 overflow-x-auto">
              <OrderTable
                orders={filteredOrders}
                isLoading={isLoading}
                onView={openViewModal}
                onDelete={openDeleteModal}
              />
            </div>

            {error && (
              <div className="mt-4 border border-red-200 bg-red-50 px-4 py-3 flex items-center justify-between gap-4">
                <p className="font-sans text-xs text-red-700">{error}</p>
                <button
                  type="button"
                  onClick={() => void fetchOrders(search)}
                  className="border border-red-300 bg-white font-sans text-[10px] tracking-[0.12em] uppercase text-red-700 px-3 py-1.5 hover:border-red-500 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}
          </div>

          <div className="xl:col-span-1 border border-gray-200 bg-white self-start">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-200">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">Live System Feed</h2>
            </div>
            <div className="p-5">
              <div className="relative border-l border-gray-100 ml-3 space-y-6">
                {feed.map((item, index) => (
                  <div key={index} className="relative pl-6">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-black border-[3px] border-white box-content" />
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-sans text-xs font-semibold text-black">{item.name}</span>
                      <span className="font-sans text-[9px] tracking-wide text-gray-400 uppercase">{item.time}</span>
                    </div>
                    <p className="font-sans text-[11px] text-gray-600 leading-relaxed">{item.message}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 bg-gray-50">
              <button className="w-full font-sans text-[9px] tracking-[0.2em] uppercase text-gray-500 hover:text-black transition-colors text-center">
                View Complete Log
              </button>
            </div>
          </div>
        </div>
      </div>

      <OrderModal
        isOpen={isModalOpen}
        order={selectedOrder}
        customers={customerOptions}
        machines={machineOptions}
        onClose={closeModal}
        onSubmit={handleOrderSubmit}
        isSubmitting={isModalSubmitting}
        submitError={modalSubmitError}
      />

      <OrderDeleteModal
        isOpen={isDeleteModalOpen}
        order={orderToDelete}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </main>
  )
}
