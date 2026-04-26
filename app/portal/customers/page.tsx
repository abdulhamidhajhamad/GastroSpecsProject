"use client"

import * as React from 'react'

import PortalHeader from '@/components/portal/PortalHeader'
import CustomerDeleteModal from '@/components/customers/CustomerDeleteModal'
import CustomerModal from '@/components/customers/CustomerModal'
import CustomerStatCards from '@/components/customers/CustomerStatCards'
import CustomerTable from '@/components/customers/CustomerTable'
import { useCustomers } from '@/hooks/useCustomers'
import type { CustomerModalSubmitData } from '@/components/customers/CustomerModal'
import { customersApi } from '@/lib/api/customers.api'
import type { Customer } from '@/types/customer'

const feed = [
  {
    name: 'Emma',
    time: '2M AGO',
    message: 'Added Ahmed Al-Farsi to VIP segment.',
  },
  {
    name: 'Raj',
    time: '15M AGO',
    message: 'Updated WeChat contact for Sarah Chen (Bistro Asia Group).',
  },
  {
    name: 'System',
    time: '1H AGO',
    message: 'New registration: Fatima Zahra (Oasis Catering - Qatar).',
  },
  {
    name: 'David',
    time: '3H AGO',
    message: 'Generated Q1 sales report for EuroFoods Supermarkets.',
  },
]

export default function CustomersPage() {
  const {
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
  } = useCustomers()

  const [isModalSubmitting, setIsModalSubmitting] = React.useState(false)
  const [modalSubmitError, setModalSubmitError] = React.useState<string | null>(null)

  const handleModalSubmit = React.useCallback(async (payload: CustomerModalSubmitData) => {
    setIsModalSubmitting(true)
    setModalSubmitError(null)

const contact = {
  whatsapp: payload.contact?.whatsapp?.trim() || undefined,
  wechat: payload.contact?.wechat?.trim() || undefined,
  email: payload.contact?.email?.trim() || undefined,
}

    const apiPayload = {
      name: payload.name.trim(),
      companyName: payload.companyName.trim() || undefined,
      country: payload.country.trim() || undefined,
      city: payload.city.trim() || undefined,
      customerType: payload.customerType.trim() || undefined,
      contact,
      notes: payload.notes.trim() || undefined,
    }

    try {
      if (modalMode === 'add') {
        await customersApi.create(apiPayload)
      } else if (selectedCustomer) {
        await customersApi.update(selectedCustomer.id, apiPayload)
      }

      closeModal()
      await fetchCustomers(search)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save customer'
      setModalSubmitError(message)
    } finally {
      setIsModalSubmitting(false)
    }
  }, [modalMode, selectedCustomer, closeModal, fetchCustomers, search])

  const totalCustomers = customers.length
  const uniqueCountries = new Set(customers.map((customer) => customer.country).filter(Boolean)).size
  const activeCustomers = customers.filter((customer) => customer.ordersCount > 0).length
  const newThisMonth = customers.filter((customer) => {
    const createdAt = new Date(customer.createdAt)
    const now = new Date()
    return createdAt.getUTCFullYear() === now.getUTCFullYear() && createdAt.getUTCMonth() === now.getUTCMonth()
  }).length

  React.useEffect(() => {
    if (!isModalOpen) {
      setModalSubmitError(null)
    }
  }, [isModalOpen])

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <PortalHeader />
      <div className="bg-white border-b border-gray-200 px-8 py-8 mb-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-2">Portal</p>
            <h1 className="font-serif text-3xl text-black italic">Customers / CRM</h1>
            <p className="font-sans text-sm text-gray-500 mt-2">Manage your client relationships</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => console.log('Exporting customers report...')}
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
              + Add Customer
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 max-w-[1600px] mx-auto">
        <CustomerStatCards
          total={totalCustomers}
          countries={uniqueCountries}
          withOrders={activeCustomers}
          newThisMonth={newThisMonth}
        />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3">
            <div className="bg-white border border-gray-200 mb-8 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 w-full max-w-[320px]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search name, company, city, contact..."
                    className="bg-transparent font-sans text-[10px] text-black placeholder-gray-400 focus:outline-none w-full"
                  />
                </div>
                <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-gray-400 whitespace-nowrap">
                  {customers.length} Results
                </p>
              </div>
            </div>

            {error && (
              <div className="mx-4 mb-4 border border-red-200 bg-red-50 px-4 py-3 flex items-center justify-between gap-4">
                <p className="font-sans text-xs text-red-700">{error}</p>
                <button
                  type="button"
                  onClick={() => void fetchCustomers(search)}
                  className="border border-red-300 bg-white font-sans text-[10px] tracking-[0.12em] uppercase text-red-700 px-3 py-1.5 hover:border-red-500 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            <div className="bg-white border border-gray-200 overflow-x-auto">
              <CustomerTable
                customers={customers}
                isLoading={isLoading}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
                onView={(c) => console.log('View customer details:', c.id)}
              />
            </div>
          </div>

          <div className="xl:col-span-1 border border-gray-200 bg-white self-start">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-200">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">
                Live System Feed
              </h2>
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

      <CustomerModal
        isOpen={isModalOpen}
        mode={modalMode}
          initialData={modalMode === 'edit' ? selectedCustomer : null}
        onClose={closeModal}
          onSubmit={handleModalSubmit}
          isSubmitting={isModalSubmitting}
          submitError={modalSubmitError}
      />

      <CustomerDeleteModal
        isOpen={isDeleteModalOpen}
        customer={customerToDelete}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </main>
  )
}