"use client"

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import PortalHeader from '@/components/portal/PortalHeader'
import SupplierContactsCard from '@/components/suppliers/SupplierContactsCard'
import SupplierDetailOverview from '@/components/suppliers/SupplierDetailOverview'
import SupplierMachinesCard, { type SupplierMachineRow } from '@/components/suppliers/SupplierMachinesCard'
import { suppliersApi } from '@/lib/api/suppliers.api'
import { machinesApi } from '@/lib/api/machines.api'
import type { Supplier } from '@/types/supplier'

type Props = {
  params: Promise<{ id: string }>
}

function formatCostPrice(value?: number): string {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return '-'
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export default function SupplierDetailPage({ params }: Props) {
  const router = useRouter()
  const { id } = React.use(params)
  const [supplier, setSupplier] = React.useState<Supplier | null>(null)
  const [machines, setMachines] = React.useState<SupplierMachineRow[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const fetchSupplierProfile = React.useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const [supplierData, machinesData] = await Promise.all([
        suppliersApi.getById<Supplier>(id),
        machinesApi.list<Array<{
          id: string
          supplierId?: string
          name: string
          categoryName?: string
          costPrice?: number
        }>>(),
      ])

      const mappedMachines = machinesData
        .filter((machine) => machine.supplierId === supplierData.id)
        .map((machine) => ({
          id: machine.id,
          machineName: machine.name,
          category: machine.categoryName ?? '-',
          qty: 1,
          costPrice: formatCostPrice(machine.costPrice),
          status: 'Active' as const,
        }))

      setSupplier(supplierData)
      setMachines(mappedMachines)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load supplier profile'
      setError(message)
      setSupplier(null)
      setMachines([])
    } finally {
      setIsLoading(false)
    }
  }, [id])

  React.useEffect(() => {
    void fetchSupplierProfile()
  }, [fetchSupplierProfile])

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col min-h-screen">
        <PortalHeader />
        <div className="flex-1 p-8 bg-white flex items-center justify-center">
          <p className="font-sans text-xs tracking-[0.12em] uppercase text-gray-400">Loading supplier profile...</p>
        </div>
      </div>
    )
  }

  if (!supplier) {
    return (
      <div className="flex-1 flex flex-col min-h-screen">
        <PortalHeader />
        <div className="flex-1 p-8 bg-white max-w-3xl mx-auto w-full">
          <div className="border border-red-200 bg-red-50 px-5 py-4">
            <p className="font-sans text-xs text-red-700">{error ?? 'Supplier was not found.'}</p>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => void fetchSupplierProfile()}
              className="border border-gray-200 font-sans text-xs tracking-wide text-gray-600 px-4 py-2 hover:border-black hover:text-black transition-colors"
            >
              Retry
            </button>
            <button
              type="button"
              onClick={() => router.push('/portal/suppliers')}
              className="bg-black text-white font-sans text-xs tracking-wide px-4 py-2 hover:bg-gray-800 transition-colors"
            >
              Back to Suppliers
            </button>
          </div>
        </div>
      </div>
    )
  }

  const locationText = [supplier.location.city, supplier.location.province].filter(Boolean).join(', ')

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <PortalHeader />

      <div className="flex-1 p-8 bg-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-1">Supplier Profile</p>
            <h1 className="font-sans font-bold text-xl tracking-[0.04em] uppercase text-black">{supplier.companyName}</h1>
            <p className="font-sans text-xs text-gray-400 mt-1">{locationText}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/portal/suppliers"
              className="border border-gray-200 font-sans text-xs tracking-wide text-gray-500 px-4 py-2 hover:border-black hover:text-black transition-colors"
            >
              Back to Suppliers
            </Link>
            <button className="bg-black text-white font-sans text-xs tracking-wide px-4 py-2 hover:bg-gray-800 transition-colors">
              Export Snapshot
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-6">
          <div className="space-y-6">
            <SupplierDetailOverview supplier={supplier} />
            <SupplierMachinesCard machines={machines} />
          </div>

          <div className="space-y-6">
            <SupplierContactsCard contacts={supplier.contacts} />

            <div className="border border-gray-200 p-5">
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold mb-2">Portfolio Snapshot</p>
              <p className="font-sans text-[9px] uppercase tracking-wide text-gray-400 mb-4">Current registered capacity</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-sans text-[9px] tracking-[0.1em] uppercase text-gray-400">Machine Count</p>
                  <p className="font-serif text-2xl font-bold text-black">{supplier.machineCount}</p>
                </div>
                <div>
                  <p className="font-sans text-[9px] tracking-[0.1em] uppercase text-gray-400">Active Contacts</p>
                  <p className="font-serif text-2xl font-bold text-black">{supplier.contacts.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-3 border-t border-gray-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="font-sans text-[10px] uppercase tracking-wide text-gray-500">System Operational</span>
        </div>
        <p className="font-sans text-[9px] text-gray-400">© 2024 GASTROSPECS OPERATIONS. ALL RIGHTS RESERVED.</p>
      </div>
    </div>
  )
}
