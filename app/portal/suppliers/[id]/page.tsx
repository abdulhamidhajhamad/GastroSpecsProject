import Link from 'next/link'
import { notFound } from 'next/navigation'

import PortalHeader from '@/components/portal/PortalHeader'
import SupplierContactsCard from '@/components/suppliers/SupplierContactsCard'
import SupplierDetailOverview from '@/components/suppliers/SupplierDetailOverview'
import SupplierMachinesCard, { type SupplierMachineRow } from '@/components/suppliers/SupplierMachinesCard'
import { mockSuppliers } from '@/data/mockSuppliers'

type Props = {
  params: Promise<{ id: string }>
}

const machinesBySupplierId: Record<string, SupplierMachineRow[]> = {
  sup_8f1a2c4d: [
    { id: 'MC-1101', machineName: 'Vertical Display Chiller', category: 'Refrigeration', qty: 12, costPrice: '$1,420', status: 'Active' },
    { id: 'MC-1102', machineName: 'Island Freezer Line', category: 'Refrigeration', qty: 8, costPrice: '$1,980', status: 'Active' },
    { id: 'MC-1103', machineName: 'Walk-In Condensing Unit', category: 'Cold Room', qty: 6, costPrice: '$2,650', status: 'Seasonal' },
    { id: 'MC-1104', machineName: 'Blast Chiller Cabinet', category: 'Refrigeration', qty: 4, costPrice: '$3,120', status: 'Paused' },
  ],
  sup_3d9b7e21: [
    { id: 'MC-2201', machineName: '6 Burner Heavy Range', category: 'Heavy Cooking', qty: 10, costPrice: '$1,150', status: 'Active' },
    { id: 'MC-2202', machineName: 'Stock Pot Burner', category: 'Heavy Cooking', qty: 7, costPrice: '$740', status: 'Active' },
    { id: 'MC-2203', machineName: 'Stainless Work Table', category: 'Fabrication', qty: 15, costPrice: '$280', status: 'Seasonal' },
    { id: 'MC-2204', machineName: 'Grease Trap Sink Unit', category: 'Plumbing Line', qty: 5, costPrice: '$460', status: 'Active' },
  ],
  sup_b72c9f14: [
    { id: 'MC-3301', machineName: 'Planetary Mixer 30L', category: 'Food Prep', qty: 6, costPrice: '$890', status: 'Active' },
    { id: 'MC-3302', machineName: 'Dough Sheeter 520', category: 'Bakery Prep', qty: 3, costPrice: '$1,780', status: 'Active' },
    { id: 'MC-3303', machineName: 'Vegetable Cutter Set', category: 'Food Prep', qty: 9, costPrice: '$420', status: 'Seasonal' },
  ],
  sup_c51e6a83: [
    { id: 'MC-4401', machineName: 'Combi Oven 10 Tray', category: 'Thermal', qty: 9, costPrice: '$5,600', status: 'Active' },
    { id: 'MC-4402', machineName: 'Proofing Cabinet', category: 'Bakery Thermal', qty: 6, costPrice: '$1,850', status: 'Active' },
    { id: 'MC-4403', machineName: 'Convection Oven 5 Tray', category: 'Thermal', qty: 8, costPrice: '$2,100', status: 'Seasonal' },
    { id: 'MC-4404', machineName: 'Holding Cabinet 20 GN', category: 'Hot Holding', qty: 5, costPrice: '$1,420', status: 'Paused' },
  ],
  sup_e04a7d56: [
    { id: 'MC-5501', machineName: 'Curved Bakery Showcase', category: 'Display', qty: 11, costPrice: '$1,240', status: 'Active' },
    { id: 'MC-5502', machineName: 'Gelato Display 12 Pan', category: 'Display', qty: 4, costPrice: '$2,360', status: 'Seasonal' },
    { id: 'MC-5503', machineName: 'Hot Bain Marie Counter', category: 'Service Line', qty: 7, costPrice: '$980', status: 'Active' },
  ],
}

function formatSupplierLocation(supplierId: string) {
  const supplier = mockSuppliers.find((item) => item.id === supplierId)

  if (!supplier) {
    return ''
  }

  return [supplier.location.city, supplier.location.province].filter(Boolean).join(', ')
}

export default async function SupplierDetailPage({ params }: Props) {
  const { id } = await params
  const supplier = mockSuppliers.find((item) => item.id === id)

  if (!supplier) {
    notFound()
  }

  const machines = machinesBySupplierId[supplier.id] ?? []

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <PortalHeader />

      <div className="flex-1 p-8 bg-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-1">Supplier Profile</p>
            <h1 className="font-sans font-bold text-xl tracking-[0.04em] uppercase text-black">{supplier.companyName}</h1>
            <p className="font-sans text-xs text-gray-400 mt-1">{formatSupplierLocation(supplier.id)}</p>
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
