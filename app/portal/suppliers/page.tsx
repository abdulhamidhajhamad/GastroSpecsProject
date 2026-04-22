"use client"

import * as React from 'react'

import PortalHeader from '@/components/portal/PortalHeader'
import AddSupplierContactDrawer from '@/components/suppliers/AddSupplierContactDrawer'
import SupplierDeleteModal from '@/components/suppliers/SupplierDeleteModal'
import SupplierDrawer from '@/components/suppliers/SupplierDrawer'
import SupplierQuickViewModal from '@/components/suppliers/SupplierQuickViewModal'
import SupplierStatCards from '@/components/suppliers/SupplierStatCards'
import SupplierTable from '@/components/suppliers/SupplierTable'
import { mockSuppliers } from '@/data/mockSuppliers'
import { useSuppliers } from '@/hooks/useSuppliers'
import type { Supplier } from '@/types/supplier'

const feed = [
  {
    name: 'Lin Wei',
    time: '9M AGO',
    message: 'Uploaded revised DDP quote for Frostline batch FS-110 (reefers + spare compressors).',
  },
  {
    name: 'Kevin Luo',
    time: '31M AGO',
    message: 'Confirmed production slot for 12 combi ovens. ETD Ningbo moved to May 03.',
  },
  {
    name: 'Ivy Chen',
    time: '1H AGO',
    message: 'Sent updated electrical spec sheet for BlueWave prep line (EU + GCC compliance).',
  },
  {
    name: 'System Automator',
    time: '4H AGO',
    message: 'Supplier performance scorecard generated and shared with procurement leadership.',
  },
]

function buildSupplierSearchValue(supplier: Supplier) {
  const location = [
    supplier.location.street,
    supplier.location.district,
    supplier.location.city,
    supplier.location.province,
  ]
    .filter(Boolean)
    .join(' ')

  const contacts = supplier.contacts
    .map((contact) =>
      [contact.name, contact.position, contact.contactMethods, contact.notes]
        .filter(Boolean)
        .join(' ')
    )
    .join(' ')

  return [
    supplier.id,
    supplier.companyName,
    location,
    supplier.website,
    supplier.wechat,
    supplier.email,
    supplier.phone,
    supplier.notes,
    contacts,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

export default function SuppliersPage() {
  const [isAddContactDrawerOpen, setIsAddContactDrawerOpen] = React.useState(false)
  const [supplierForContact, setSupplierForContact] = React.useState<Supplier | null>(null)

  const handleOpenAddContactDrawer = (supplier: Supplier) => {
    setSupplierForContact(supplier)
    setIsAddContactDrawerOpen(true)
  }

  const {
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
  } = useSuppliers()

  const [searchQuery, setSearchQuery] = React.useState('')
  const [quickViewSupplier, setQuickViewSupplier] = React.useState<Supplier | null>(null)
  const normalizedSearchQuery = searchQuery.trim().toLowerCase()

  const closeQuickView = React.useCallback(() => {
    setQuickViewSupplier(null)
  }, [])

  const openQuickView = React.useCallback((supplier: Supplier) => {
    setQuickViewSupplier(supplier)
  }, [])

  const editFromQuickView = React.useCallback((supplier: Supplier) => {
    setQuickViewSupplier(null)
    openEditDrawer(supplier)
  }, [openEditDrawer])

  const filteredSuppliers = React.useMemo(() => {
    if (!normalizedSearchQuery) {
      return mockSuppliers
    }

    return mockSuppliers.filter((supplier) =>
      buildSupplierSearchValue(supplier).includes(normalizedSearchQuery)
    )
  }, [normalizedSearchQuery])

  const totalSuppliers = mockSuppliers.length
  const ddpPartners = mockSuppliers.filter((supplier) => supplier.isDdpPartner).length
  const activeMachines = mockSuppliers.reduce((sum, supplier) => sum + supplier.machineCount, 0)
  const now = new Date()
  const newThisMonth = mockSuppliers.filter((supplier) => {
    const created = new Date(supplier.createdAt)
    return (
      created.getUTCFullYear() === now.getUTCFullYear() &&
      created.getUTCMonth() === now.getUTCMonth()
    )
  }).length

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <PortalHeader />
      <div className="flex-1 p-8 bg-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-sans font-bold text-xl tracking-[0.08em] uppercase text-black">Suppliers / Factories</h1>
            <p className="font-sans text-xs text-gray-400 mt-1">Manage your manufacturing partners</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="border border-gray-200 font-sans text-xs tracking-wide text-gray-500 px-4 py-2 hover:border-black hover:text-black transition-colors flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Export Report
            </button>
            <button
              type="button"
              onClick={openAddDrawer}
              className="bg-black text-white font-sans text-xs tracking-wide px-4 py-2 hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              + Add Supplier
            </button>
          </div>
        </div>

        <SupplierStatCards
          total={totalSuppliers}
          ddpCount={ddpPartners}
          machineCount={activeMachines}
          newThisMonth={newThisMonth}
        />

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">Suppliers Overview</span>
                </div>
                <a href="/portal/suppliers" className="font-sans text-[10px] text-gray-400 hover:text-black transition-colors">View All</a>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 w-full max-w-[320px]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search supplier, city, phone..."
                    className="bg-transparent font-sans text-[10px] text-black placeholder-gray-400 focus:outline-none w-full"
                  />
                </div>
                <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-gray-400 whitespace-nowrap">
                  {filteredSuppliers.length} Results
                </p>
              </div>
            </div>

            <SupplierTable
              suppliers={filteredSuppliers}
              onEdit={openEditDrawer}
              onDelete={openDeleteModal}
              onView={openQuickView}
              onAddContact={handleOpenAddContactDrawer}
            />
          </div>

          <div className="border border-gray-200">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-200">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">Live System Feed</span>
            </div>
            <div className="p-5 space-y-5">
              {feed.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <span className="font-sans text-[8px] font-bold text-gray-500">
                      {item.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-sans text-[10px] font-semibold text-black uppercase tracking-wide">{item.name}</span>
                      <span className="font-sans text-[9px] text-gray-300">{item.time}</span>
                    </div>
                    <p className="font-sans text-[10px] text-gray-500 leading-relaxed">{item.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 pb-5">
              <button className="w-full border border-gray-200 font-sans text-[10px] tracking-[0.15em] uppercase text-gray-400 py-2.5 hover:border-black hover:text-black transition-colors">
                View Complete Audit Log
              </button>
            </div>
          </div>
        </div>
      </div>

      <SupplierDrawer
        isOpen={isDrawerOpen}
        initialData={drawerMode === 'edit' ? selectedSupplier : null}
        onClose={closeDrawer}
      />

      <AddSupplierContactDrawer
        isOpen={isAddContactDrawerOpen}
        supplier={supplierForContact}
        onClose={() => setIsAddContactDrawerOpen(false)}
      />

      <SupplierDeleteModal
        supplier={isDeleteModalOpen ? supplierToDelete : null}
        onConfirm={confirmDelete}
        onCancel={closeDeleteModal}
      />

      <SupplierQuickViewModal
        supplier={quickViewSupplier}
        onClose={closeQuickView}
        onEdit={editFromQuickView}
      />

      <div className="px-8 py-3 border-t border-gray-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="font-sans text-[10px] uppercase tracking-wide text-gray-500">System Operational</span>
        </div>
        <div className="flex items-center gap-6">
          <p className="font-sans text-[9px] text-gray-400">© 2024 GASTROSPECS OPERATIONS. ALL RIGHTS RESERVED.</p>
          {['Terms', 'Privacy'].map((item) => (
            <a key={item} href="#" className="font-sans text-[9px] text-gray-400 hover:text-black transition-colors uppercase tracking-wide">
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}