'use client'

import * as React from 'react'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import type { Machine, MachineSupplierFormData } from '@/types/machine'
import { mockSuppliers } from '@/data/mockSuppliers'

type AddMachineSupplierDrawerProps = {
  isOpen: boolean
  machine: Machine | null
  onClose: () => void
}

export default function AddMachineSupplierDrawer({
  isOpen,
  machine,
  onClose
}: AddMachineSupplierDrawerProps) {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [formData, setFormData] = React.useState<MachineSupplierFormData>({
    supplierId: '',
    costPrice: '',
    moq: '',
    leadTimeDays: '',
    modelNumber: '',
    qualityNotes: ''
  })

  React.useEffect(() => {
    if (isOpen) {
      setSearchQuery('')
      setFormData({
        supplierId: '',
        costPrice: '',
        moq: '',
        leadTimeDays: '',
        modelNumber: '',
        qualityNotes: ''
      })
    }
  }, [isOpen])

  const handleChange = <K extends keyof MachineSupplierFormData>(key: K, value: MachineSupplierFormData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Link Supplier to Machine:', machine?.name, formData)
    onClose()
  }

  const filteredSuppliers = React.useMemo(() => {
    if (!searchQuery.trim()) return mockSuppliers
    return mockSuppliers.filter(sup => sup.companyName.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery])

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (!open ? onClose() : null)}>
      <DialogContent showCloseButton={false} className="w-[800px] max-w-[95vw] h-[85vh] max-h-[85vh] p-0 gap-0 rounded-none border border-gray-200 flex flex-col overflow-hidden bg-white">
        <DialogTitle className="sr-only">Link Supplier</DialogTitle>
        <div className="flex h-full flex-col bg-white">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
            <h2 className="font-sans font-semibold text-sm tracking-[0.12em] uppercase text-black">
              LINK SUPPLIER
            </h2>
            {machine && (
              <p className="font-sans text-[10px] text-gray-500 mt-1 uppercase tracking-wide">
                to {machine.name}
              </p>
            )}
          </div>

          <form id="link-supplier-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
            
            <div className="grid md:grid-cols-[1fr_1fr] gap-8">
              
              <div className="space-y-3">
                <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400">Search Supplier *</label>
                
                <div className="relative flex items-center bg-transparent border border-gray-200 px-3 py-2 w-full">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 absolute left-3">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <input
                    type="search"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent font-sans text-xs text-black placeholder-gray-400 focus:outline-none w-full pl-6 pr-2"
                  />
                </div>
                
                <div className="border border-gray-200 h-[280px] overflow-y-auto">
                  {filteredSuppliers.length === 0 ? (
                    <div className="p-4 text-center">
                      <p className="text-xs text-gray-400 italic">No suppliers found.</p>
                    </div>
                  ) : (
                    filteredSuppliers.map(sup => (
                      <div 
                        key={sup.id} 
                        onClick={() => handleChange('supplierId', sup.id)}
                        className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors flex items-center justify-between ${formData.supplierId === sup.id ? 'bg-gray-100' : ''}`}
                      >
                        <span className={`font-sans text-xs ${formData.supplierId === sup.id ? 'font-semibold text-black' : 'text-gray-700'}`}>
                          {sup.companyName}
                        </span>
                        {formData.supplierId === sup.id && (
                          <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    ))
                  )}
                </div>
                
                {/* Hidden required input for form validation */}
                <input type="text" className="sr-only" required value={formData.supplierId} readOnly />
              </div>
              
              {/* Right column: Form details */}
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Cost Price *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-sans text-xs text-black">$</span>
                      <input
                        required
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.costPrice}
                        onChange={(e) => handleChange('costPrice', e.target.value ? Number(e.target.value) : '')}
                        className="w-full border border-gray-200 font-sans text-xs text-black pl-6 pr-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">MOQ *</label>
                    <input
                      required
                      type="number"
                      min="1"
                      value={formData.moq}
                      onChange={(e) => handleChange('moq', e.target.value ? Number(e.target.value) : '')}
                      className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Lead Time Days</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.leadTimeDays}
                    onChange={(e) => handleChange('leadTimeDays', e.target.value ? Number(e.target.value) : '')}
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Supplier's Model Number</label>
                  <input
                    type="text"
                    value={formData.modelNumber}
                    onChange={(e) => handleChange('modelNumber', e.target.value)}
                    placeholder="e.g. HX-MG32E"
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Quality Notes</label>
                  <textarea
                    rows={3}
                    value={formData.qualityNotes}
                    onChange={(e) => handleChange('qualityNotes', e.target.value)}
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black resize-none transition-colors"
                  />
                </div>
              </div>
            </div>
            
          </form>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="font-sans text-xs tracking-wide text-gray-500 px-4 py-2 hover:text-black hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="link-supplier-form"
              className="bg-black text-white font-sans text-xs tracking-wide px-6 py-2 hover:bg-gray-800 transition-colors"
            >
              Link Supplier
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
