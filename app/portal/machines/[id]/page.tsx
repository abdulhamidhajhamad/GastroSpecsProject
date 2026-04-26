'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import PortalHeader from '@/components/portal/PortalHeader'
import AddMachineSupplierDrawer from '@/components/machines/AddMachineSupplierDrawer'
import type { AddMachineSupplierSubmitData } from '@/components/machines/AddMachineSupplierDrawer'
import { machinesApi } from '@/lib/api/machines.api'
import { suppliersApi } from '@/lib/api/suppliers.api'
import type { Machine, MachineImage, MachineSupplier } from '@/types/machine'

// Using mocked activity feed for the side panel
const feed = [
  {
    name: 'Lin Wei',
    time: '2H AGO',
    message: 'Added new technical specifications.',
  },
  {
    name: 'Kevin Luo',
    time: '4H AGO',
    message: 'Updated the primary image for marketing.',
  },
  {
    name: 'Ivy Chen',
    time: '1D AGO',
    message: 'Linked a new OEM supplier from Ningbo.',
  },
  {
    name: 'System Automator',
    time: '2D AGO',
    message: 'Machine cost benchmark analysis completed.',
  },
]

export default function MachineDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = React.use(params)
  const [machine, setMachine] = React.useState<Machine | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const [isAddSupplierDrawerOpen, setIsAddSupplierDrawerOpen] = React.useState(false)
  const [machineForSupplier, setMachineForSupplier] = React.useState<Machine | null>(null)

  const [supplierOptions, setSupplierOptions] = React.useState<Array<{ id: string; companyName: string }>>([])
  const [isAddSupplierSubmitting, setIsAddSupplierSubmitting] = React.useState(false)
  const [addSupplierSubmitError, setAddSupplierSubmitError] = React.useState<string | null>(null)
  const [showCostPrice, setShowCostPrice] = React.useState(false)

  const mapMachineFromApi = React.useCallback((raw: any): Machine => {
    const images: MachineImage[] = Array.isArray(raw.images)
      ? raw.images.map((image: unknown, index: number) => {
          if (typeof image === 'string') {
            return {
              id: `${raw.id}-img-${index}`,
              machineId: raw.id,
              url: image,
              isPrimary: index === 0,
              order: index,
            }
          }

          const imageObj = image as Partial<MachineImage>
          return {
            id: imageObj.id ?? `${raw.id}-img-${index}`,
            machineId: imageObj.machineId ?? raw.id,
            url: imageObj.url ?? '',
            isPrimary: Boolean(imageObj.isPrimary),
            order: imageObj.order ?? index,
          }
        })
      : []

    const machineSuppliers: MachineSupplier[] = raw.supplierId
      ? [
          {
            id: `${raw.id}-${raw.supplierId}`,
            machineId: raw.id,
            supplierId: raw.supplierId,
            supplierName: raw.supplierName ?? 'Unknown Supplier',
            costPrice: raw.costPrice ?? 0,
            moq: raw.moq ?? 0,
            leadTimeDays: raw.leadTimeDays,
            modelNumber: raw.modelNumber,
            qualityNotes: raw.notes,
            createdAt: raw.createdAt,
          },
        ]
      : []

    return {
      ...raw,
      images,
      machineSuppliers,
    }
  }, [])

  const fetchMachine = React.useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await machinesApi.getById<any>(id)
      setMachine(mapMachineFromApi(data))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load machine'
      setError(message)
      setMachine(null)
    } finally {
      setIsLoading(false)
    }
  }, [id, mapMachineFromApi])

  React.useEffect(() => {
    void fetchMachine()
  }, [fetchMachine])

  React.useEffect(() => {
    const loadSuppliers = async () => {
      try {
        const suppliers = await suppliersApi.list<Array<{ id: string; companyName: string }>>()
        setSupplierOptions(suppliers.map((supplier) => ({ id: supplier.id, companyName: supplier.companyName })))
      } catch {
        setSupplierOptions([])
      }
    }

    void loadSuppliers()
  }, [])

  const handleAddSupplierSubmit = React.useCallback(async (payload: AddMachineSupplierSubmitData) => {
    if (!machineForSupplier) {
      return
    }

    setIsAddSupplierSubmitting(true)
    setAddSupplierSubmitError(null)

    try {
      await machinesApi.update(machineForSupplier.id, {
        supplierId: payload.supplierId,
        costPrice: payload.costPrice,
        moq: payload.moq,
        leadTimeDays: payload.leadTimeDays,
        modelNumber: payload.modelNumber,
        notes: payload.qualityNotes,
      })

      setIsAddSupplierDrawerOpen(false)
      setMachineForSupplier(null)
      await fetchMachine()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to link supplier'
      setAddSupplierSubmitError(message)
    } finally {
      setIsAddSupplierSubmitting(false)
    }
  }, [machineForSupplier, fetchMachine])

  const openAddSupplierDrawer = React.useCallback((selected: Machine) => {
    setMachineForSupplier(selected)
    setAddSupplierSubmitError(null)
    setIsAddSupplierDrawerOpen(true)
  }, [])

  const closeAddSupplierDrawer = React.useCallback(() => {
    setIsAddSupplierDrawerOpen(false)
    setMachineForSupplier(null)
  }, [])

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col min-h-screen">
        <PortalHeader />
        <div className="flex-1 p-8 bg-white flex items-center justify-center">
          <p className="font-sans text-xs tracking-[0.12em] uppercase text-gray-400">Loading machine profile...</p>
        </div>
      </div>
    )
  }

  if (!machine) {
    return (
      <div className="flex-1 flex flex-col min-h-screen">
        <PortalHeader />
        <div className="flex-1 p-8 bg-white max-w-3xl mx-auto w-full">
          <div className="border border-red-200 bg-red-50 px-5 py-4">
            <p className="font-sans text-xs text-red-700">{error ?? 'Machine was not found.'}</p>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => void fetchMachine()}
              className="border border-gray-200 font-sans text-xs tracking-wide text-gray-600 px-4 py-2 hover:border-black hover:text-black transition-colors"
            >
              Retry
            </button>
            <button
              type="button"
              onClick={() => router.push('/portal/machines')}
              className="bg-black text-white font-sans text-xs tracking-wide px-4 py-2 hover:bg-gray-800 transition-colors"
            >
              Back to Machines
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Quick stats calculations
  const linkedCount = machine.machineSuppliers.length
  
  const validCosts = machine.machineSuppliers.map(s => s.costPrice).filter(c => c > 0)
  const lowestCost = validCosts.length > 0 ? Math.min(...validCosts) : 0
  
  const validLeadTimes = machine.machineSuppliers.map(s => s.leadTimeDays).filter((d): d is number => typeof d === 'number' && d > 0)
  const avgLeadTime = validLeadTimes.length > 0 
    ? Math.round(validLeadTimes.reduce((a, b) => a + b, 0) / validLeadTimes.length) 
    : 0

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <PortalHeader />

      <div className="flex-1 p-8 bg-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-1">
              <Link href="/portal/machines" className="hover:text-black hover:underline transition-colors">
                Machines
              </Link>{' '}
              / Profile
            </p>
            <h1 className="font-sans font-bold text-xl tracking-[0.04em] uppercase text-black">{machine.name}</h1>
            <p className="font-sans text-xs text-gray-400 mt-1">{machine.categoryName}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/portal/machines"
              className="border border-gray-200 font-sans text-xs tracking-wide text-gray-500 px-4 py-2 hover:border-black hover:text-black transition-colors"
            >
              Back to Machines
            </Link>
            <button className="bg-black text-white font-sans text-xs tracking-wide px-4 py-2 hover:bg-gray-800 transition-colors">
              Export PDF
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[3fr_1fr] gap-6">
          <div className="space-y-6">
            
            {/* MACHINE OVERVIEW */}
            <div className="border border-gray-200 p-6 bg-white">
              <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold mb-5">Machine Overview</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="font-sans text-[9px] tracking-[0.1em] uppercase text-gray-400 mb-1">Category</p>
                  <p className="font-sans text-xs text-black">{machine.categoryName}</p>
                </div>
                <div>
                  <p className="font-sans text-[9px] tracking-[0.1em] uppercase text-gray-400 mb-1">System ID</p>
                  <p className="font-mono text-xs text-black">{machine.id}</p>
                </div>
                <div>
                  <p className="font-sans text-[9px] tracking-[0.1em] uppercase text-gray-400 mb-1">Added On</p>
                  <p className="font-sans text-xs text-black">
                    {new Date(machine.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="font-sans text-[9px] tracking-[0.1em] uppercase text-gray-400 mb-2">Notes & Context</p>
                <p className="font-sans text-xs text-gray-700 leading-relaxed border-l-2 border-gray-200 pl-3">
                  {machine.notes || 'No operational notes provided.'}
                </p>
              </div>

              <div>
                <p className="font-sans text-[9px] tracking-[0.1em] uppercase text-gray-400 mb-3">Specifications</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(machine.specifications).length > 0 ? (
                    Object.entries(machine.specifications).map(([key, value]) => (
                      <span key={key} className="inline-flex items-center bg-gray-50 border border-gray-200 px-2.5 py-1 font-sans text-[10px] uppercase tracking-wide text-gray-700">
                        <span className="font-semibold text-black mr-1">{key}:</span> {value}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400 italic">No specifications added.</span>
                  )}
                </div>
              </div>
            </div>

            {/* IMAGES */}
            <div className="border border-gray-200 p-6 bg-white">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">Images</h2>
                <button className="border border-gray-200 text-gray-500 hover:text-black hover:border-black transition-colors px-3 py-1 font-sans text-[10px] uppercase tracking-wide">
                  + Add Images
                </button>
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
                {machine.images.length > 0 ? (
                  machine.images.map((img) => (
                    <div key={img.id} className="relative shrink-0 w-32 h-32 border border-gray-200 group">
                      <img src={img.url} alt="Machine" className="w-full h-full object-cover" />
                      {img.isPrimary && (
                        <div className="absolute bottom-1 left-1 bg-black px-1.5 pt-0.5 rounded-sm flex items-center gap-1">
                          <span className="text-yellow-400 text-[8px] leading-none">★</span>
                          <span className="text-white text-[8px] uppercase tracking-widest leading-none">Primary</span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 italic">No images uploaded.</p>
                )}
              </div>
            </div>

            {/* LINKED SUPPLIERS */}
            <div className="border border-gray-200 bg-white overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">Linked Suppliers</h2>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setShowCostPrice(!showCostPrice)} 
                    className="flex items-center gap-1.5 font-sans text-[10px] tracking-wide uppercase text-gray-400 hover:text-black transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {showCostPrice ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      ) : (
                        <>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </>
                      )}
                    </svg>
                    {showCostPrice ? 'Hide Cost' : 'Reveal Cost'}
                  </button>
                  <button 
                    onClick={() => openAddSupplierDrawer(machine)}
                    className="bg-black text-white font-sans text-[10px] tracking-wide uppercase px-4 py-2 hover:bg-gray-800 transition-colors"
                  >
                    + Link Supplier
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto min-h-[160px]">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {['Supplier', 'Model No.', 'Cost Price', 'MOQ', 'Lead Time', 'Notes', 'Actions'].map(col => (
                        <th key={col} className={`px-6 py-3 font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 font-normal ${col === 'Actions' ? 'text-right' : ''}`}>
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {machine.machineSuppliers.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center">
                          <p className="font-sans text-xs text-gray-400 italic">No suppliers linked to this machine.</p>
                        </td>
                      </tr>
                    ) : (
                      machine.machineSuppliers.map(ms => (
                        <tr key={ms.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-sans text-xs font-semibold text-black">
                             <Link href={`/portal/suppliers/${ms.supplierId}`} className="hover:underline">{ms.supplierName}</Link>
                          </td>
                          <td className="px-6 py-4 font-sans text-xs text-gray-600">{ms.modelNumber || '-'}</td>
                          <td className="px-6 py-4 font-mono text-xs text-black font-medium">
                            {showCostPrice ? `$${ms.costPrice.toFixed(2)}` : '••••'}
                          </td>
                          <td className="px-6 py-4 font-sans text-xs text-black">{ms.moq}</td>
                          <td className="px-6 py-4 font-sans text-xs text-black whitespace-nowrap">{ms.leadTimeDays ? `${ms.leadTimeDays} days` : '-'}</td>
                          <td className="px-6 py-4 font-sans text-[10px] text-gray-500 truncate max-w-[140px]" title={ms.qualityNotes}>
                            {ms.qualityNotes || '-'}
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap">
                             <button className="font-sans text-[9px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors mx-2">Edit</button>
                             <button className="font-sans text-[9px] uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors">Remove</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          <div className="space-y-6">
            {/* QUICK STATS */}
            <div className="border border-gray-200 p-5 bg-white">
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold mb-2">Quick Stats</p>
              <p className="font-sans text-[9px] uppercase tracking-wide text-gray-400 mb-5">Sourcing overview</p>
              
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-3">
                  <p className="font-sans text-[9px] tracking-[0.1em] uppercase text-gray-400">Linked Suppliers</p>
                  <p className="font-serif text-2xl font-bold text-black">{linkedCount}</p>
                </div>
                <div className="border-b border-gray-100 pb-3">
                  <div className="flex items-center justify-between">
                    <p className="font-sans text-[9px] tracking-[0.1em] uppercase text-gray-400">Lowest Cost</p>
                    <button 
                      onClick={() => setShowCostPrice(!showCostPrice)} 
                      className="text-gray-400 hover:text-black cursor-pointer bg-gray-50 border border-gray-200 px-1"
                      title={showCostPrice ? "Hide Cost" : "Reveal Cost"}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {showCostPrice ? (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        ) : (
                          <>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </>
                        )}
                      </svg>
                    </button>
                  </div>
                  <p className="font-mono text-xl font-medium text-black">
                    {showCostPrice ? (lowestCost ? `$${lowestCost.toFixed(2)}` : '-') : '••••'}
                  </p>
                </div>
                <div>
                  <p className="font-sans text-[9px] tracking-[0.1em] uppercase text-gray-400">Avg Lead Time</p>
                  <p className="font-serif text-2xl font-bold text-black">{avgLeadTime} <span className="font-sans text-xs font-normal text-gray-500 uppercase tracking-widest pl-1">Days</span></p>
                </div>
              </div>
            </div>

            {/* ACTIVITY FEED */}
            <div className="border border-gray-200 bg-white">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-200">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">Activity Feed</span>
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
                  View Full History
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="px-8 py-3 border-t border-gray-200 bg-white flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="font-sans text-[10px] uppercase tracking-wide text-gray-500">System Operational</span>
        </div>
        <p className="font-sans text-[9px] text-gray-400">© 2024 GASTROSPECS OPERATIONS. ALL RIGHTS RESERVED.</p>
      </div>

      <AddMachineSupplierDrawer 
        isOpen={isAddSupplierDrawerOpen}
        machine={machineForSupplier}
        suppliers={supplierOptions}
        onSubmit={handleAddSupplierSubmit}
        isSubmitting={isAddSupplierSubmitting}
        submitError={addSupplierSubmitError}
        onClose={closeAddSupplierDrawer}
      />
    </div>
  )
}
