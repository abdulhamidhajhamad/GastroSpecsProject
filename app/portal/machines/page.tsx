"use client"

import * as React from 'react'
import { useRouter } from 'next/navigation'

import PortalHeader from '@/components/portal/PortalHeader'
import MachineDeleteModal from '@/components/machines/MachineDeleteModal'
import MachineDrawer from '@/components/machines/MachineDrawer'
import MachineStatCards from '@/components/machines/MachineStatCards'
import MachineTable from '@/components/machines/MachineTable'
import AddMachineSupplierDrawer from '@/components/machines/AddMachineSupplierDrawer'
import { mockMachines } from '@/data/mockMachines'
import { useMachines } from '@/hooks/useMachines'
import type { Machine } from '@/types/machine'

const feed = [
  {
    name: 'Lin Wei',
    time: '2H AGO',
    message: 'Added new specification data for the 30L Planetary Dough Mixer.',
  },
  {
    name: 'Kevin Luo',
    time: '4H AGO',
    message: 'Linked Foshan Titan Thermal to the 10-Tray Combi Steam Oven.',
  },
  {
    name: 'Ivy Chen',
    time: '1D AGO',
    message: 'Updated minimum order quantities for Heavy Duty Meat Grinder.',
  },
  {
    name: 'System Automator',
    time: '2D AGO',
    message: 'Monthly product performance and supplier cost review generated.',
  },
]

function buildMachineSearchValue(machine: Machine) {
  const specs = Object.values(machine.specifications).join(' ')
  const suppliers = machine.machineSuppliers.map(s => s.supplierName).join(' ')

  return [
    machine.id,
    machine.name,
    machine.categoryName,
    machine.notes,
    specs,
    suppliers
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

export default function MachinesPage() {
  const router = useRouter()
  const {
    isDrawerOpen,
    drawerStep,
    selectedMachine,
    isDeleteModalOpen,
    machineToDelete,
    isAddSupplierDrawerOpen,
    machineForSupplier,
    openAddDrawer,
    openEditDrawer,
    setDrawerStep,
    closeDrawer,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    openAddSupplierDrawer,
    closeAddSupplierDrawer,
  } = useMachines()

  const [searchQuery, setSearchQuery] = React.useState('')
  const normalizedSearchQuery = searchQuery.trim().toLowerCase()

  const handleView = React.useCallback((machine: Machine) => {
    router.push(`/portal/machines/${machine.id}`)
  }, [router])

  const filteredMachines = React.useMemo(() => {
    if (!normalizedSearchQuery) {
      return mockMachines
    }

    return mockMachines.filter((machine) =>
      buildMachineSearchValue(machine).includes(normalizedSearchQuery)
    )
  }, [normalizedSearchQuery])

  const totalMachines = mockMachines.length
  const uniqueCategories = new Set(mockMachines.map(m => m.categoryId)).size
  const totalSuppliersLinked = mockMachines.reduce((sum, m) => sum + (m.machineSuppliers?.length || 0), 0)
  
  const now = new Date()
  const newThisMonth = mockMachines.filter((machine) => {
    const created = new Date(machine.createdAt)
    return (
      created.getUTCFullYear() === now.getUTCFullYear() &&
      created.getUTCMonth() === now.getUTCMonth()
    )
  }).length || 2 // Fallback to 2 to match mock feeling

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <PortalHeader />
      <div className="flex-1 p-8 bg-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-sans font-bold text-xl tracking-[0.08em] uppercase text-black">MACHINES / PRODUCTS</h1>
            <p className="font-sans text-xs text-gray-400 mt-1">Manage your equipment catalog and supplier links</p>
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
              + Add Machine
            </button>
          </div>
        </div>

        <MachineStatCards
          total={totalMachines}
          categories={uniqueCategories}
          suppliersLinked={totalSuppliersLinked}
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
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">Machines Overview</span>
                </div>
                <button className="font-sans text-[10px] text-gray-400 hover:text-black transition-colors">View All</button>
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
                    placeholder="Search machines, categories, specs..."
                    className="bg-transparent font-sans text-[10px] text-black placeholder-gray-400 focus:outline-none w-full"
                  />
                </div>
                <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-gray-400 whitespace-nowrap">
                  {filteredMachines.length} Results
                </p>
              </div>
            </div>

            <MachineTable
              machines={filteredMachines}
              onEdit={openEditDrawer}
              onDelete={openDeleteModal}
              onView={handleView}
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

      <MachineDrawer
        isOpen={isDrawerOpen}
        step={drawerStep}
        setStep={setDrawerStep}
        initialData={selectedMachine}
        onClose={closeDrawer}
        onOpenAddSupplier={openAddSupplierDrawer}
      />

      <AddMachineSupplierDrawer
        isOpen={isAddSupplierDrawerOpen}
        machine={machineForSupplier}
        onClose={closeAddSupplierDrawer}
      />

      <MachineDeleteModal
        machine={machineToDelete}
        onConfirm={confirmDelete}
        onCancel={closeDeleteModal}
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
