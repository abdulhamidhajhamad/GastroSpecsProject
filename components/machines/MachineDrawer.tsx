'use client'

import * as React from 'react'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import type { Machine } from '@/types/machine'

type DrawerStep = 'info' | 'images' | 'suppliers'

type MachineDrawerProps = {
  isOpen: boolean
  step: DrawerStep
  setStep: (step: DrawerStep) => void
  initialData: Machine | null
  onClose: () => void
  onOpenAddSupplier?: (machine: Machine) => void
}

type SpecItem = { key: string; value: string }

const CATEGORIES = [
  { id: 'cat_prep_01', name: 'Food Preparation' },
  { id: 'cat_cook_01', name: 'Cooking Equipment' },
  { id: 'cat_ref_01', name: 'Refrigeration' },
  { id: 'cat_wash_01', name: 'Warewashing' },
  { id: 'cat_disp_01', name: 'Display' },
]

export default function MachineDrawer({
  isOpen,
  step,
  setStep,
  initialData,
  onClose,
  onOpenAddSupplier,
}: MachineDrawerProps) {
  const isEditMode = Boolean(initialData)

  const [name, setName] = React.useState('')
  const [categoryId, setCategoryId] = React.useState('')
  const [specs, setSpecs] = React.useState<SpecItem[]>([{ key: '', value: '' }, { key: '', value: '' }])
  const [notes, setNotes] = React.useState('')

  React.useEffect(() => {
    if (!isOpen) return

    if (initialData) {
      setName(initialData.name)
      setCategoryId(initialData.categoryId)
      setNotes(initialData.notes || '')
      
      const specEntries = Object.entries(initialData.specifications).map(([key, value]) => ({ key, value }))
      setSpecs(specEntries.length > 0 ? specEntries : [{ key: '', value: '' }, { key: '', value: '' }])
    } else {
      setName('')
      setCategoryId('')
      setNotes('')
      setSpecs([{ key: '', value: '' }, { key: '', value: '' }])
    }
  }, [isOpen, initialData])

  const handleAddSpec = () => setSpecs((prev) => [...prev, { key: '', value: '' }])
  const handleSpecChange = (index: number, field: 'key' | 'value', val: string) => {
    setSpecs((prev) => {
      const newSpecs = [...prev]
      newSpecs[index][field] = val
      return newSpecs
    })
  }
  const handleRemoveSpec = (index: number) => {
    setSpecs((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    const specRecord = specs.reduce((acc, curr) => {
      if (curr.key.trim() && curr.value.trim()) {
        acc[curr.key.trim()] = curr.value.trim()
      }
      return acc
    }, {} as Record<string, string>)
    
    console.log('Save Machine:', { name, categoryId, specifications: specRecord, notes })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (!open ? onClose() : null)}>
      <DialogContent showCloseButton={false} className="w-[720px] max-w-[95vw] h-[85vh] max-h-[85vh] p-0 gap-0 rounded-none border border-gray-200 flex flex-col overflow-hidden bg-white">
        <DialogTitle className="sr-only">
          {isEditMode ? 'Edit machine' : 'Add new machine'}
        </DialogTitle>

        <div className="flex h-full flex-col bg-white">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="font-sans font-semibold text-sm tracking-[0.12em] uppercase text-black">
              {isEditMode ? 'EDIT MACHINE' : 'ADD NEW MACHINE'}
            </h2>
            <div className="flex items-center gap-4 mt-4">
              <span className={`font-sans text-[10px] tracking-widest uppercase pb-1 ${step === 'info' ? 'text-black border-b border-black font-bold' : 'text-gray-400 border-b border-transparent'}`}>1. INFO</span>
              <span className="text-gray-300 text-[10px]">→</span>
              <span className={`font-sans text-[10px] tracking-widest uppercase pb-1 ${step === 'images' ? 'text-black border-b border-black font-bold' : 'text-gray-400 border-b border-transparent'}`}>2. IMAGES</span>
              <span className="text-gray-300 text-[10px]">→</span>
              <span className={`font-sans text-[10px] tracking-widest uppercase pb-1 ${step === 'suppliers' ? 'text-black border-b border-black font-bold' : 'text-gray-400 border-b border-transparent'}`}>3. SUPPLIERS</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {step === 'info' && (
              <div className="space-y-6">
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Planetary Dough Mixer 30L"
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Category *</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  >
                    <option value="" disabled>Select category</option>
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Specifications</label>
                  <div className="space-y-2 mb-3">
                    {specs.map((s, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <input
                          type="text"
                          placeholder="Key (e.g. Power)"
                          value={s.key}
                          onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                          className="flex-1 border border-gray-200 font-sans text-xs px-2 py-2 focus:outline-none focus:border-black"
                        />
                        <input
                          type="text"
                          placeholder="Value (e.g. 1.5kW)"
                          value={s.value}
                          onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                          className="flex-1 border border-gray-200 font-sans text-xs px-2 py-2 focus:outline-none focus:border-black"
                        />
                        <button type="button" onClick={() => handleRemoveSpec(idx)} className="text-gray-400 hover:text-red-500 w-6 h-6 flex items-center justify-center font-sans text-lg leading-none">×</button>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={handleAddSpec} className="font-sans text-[10px] tracking-wide text-black uppercase hover:underline font-semibold">
                    + Add Spec
                  </button>
                </div>
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Notes</label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Internal quality tracking, accessory lists..."
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black resize-none"
                  />
                </div>
              </div>
            )}

            {step === 'images' && (
              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center h-40 cursor-pointer hover:bg-gray-100 transition-colors gap-2">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                  <p className="font-sans text-xs text-gray-500 uppercase tracking-wide">Click to upload or drag & drop</p>
                </div>
                
                <div>
                  <p className="font-sans text-[9px] tracking-widest uppercase text-gray-400 mb-3">Uploaded Images</p>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="relative shrink-0 w-28 h-28 border border-gray-200 group">
                        <img src="https://placehold.co/600x400" alt="Preview" className="w-full h-full object-cover" />
                        <button type="button" className="absolute top-1 right-1 bg-white border border-gray-200 w-5 h-5 flex items-center justify-center rounded-full text-xs text-red-500 opacity-0 group-hover:opacity-100 transition-opacity leading-none">
                          ×
                        </button>
                        {i === 0 && (
                          <div className="absolute bottom-1 left-1 bg-black px-1.5 pt-0.5 rounded-sm flex items-center gap-1">
                            <span className="text-yellow-400 text-[8px] leading-none">★</span>
                            <span className="text-white text-[8px] uppercase tracking-widest leading-none">Primary</span>
                          </div>
                        )}
                        {i !== 0 && (
                          <div className="absolute bottom-1 left-1 bg-white/90 border border-gray-200 px-1.5 pt-0.5 rounded-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <span className="text-gray-400 text-[8px] leading-none hover:text-yellow-400">★</span>
                            <span className="text-black text-[8px] uppercase tracking-widest leading-none">Set Primary</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 'suppliers' && (
              <div className="space-y-6">
                {initialData?.machineSuppliers?.length ? (
                  <div className="space-y-3">
                    {initialData.machineSuppliers.map((supplier) => (
                      <div key={supplier.id} className="border border-gray-200 p-4 flex justify-between items-start bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div>
                          <p className="font-sans text-xs font-semibold text-black">{supplier.supplierName}</p>
                          <div className="flex gap-4 mt-2">
                            <p className="font-sans text-[10px] uppercase text-gray-500">Cost: <span className="font-mono text-black font-semibold">••••</span></p>
                            <p className="font-sans text-[10px] uppercase text-gray-500">MOQ: <span className="font-mono text-black">{supplier.moq}</span></p>
                            <p className="font-sans text-[10px] uppercase text-gray-500">Lead: <span className="font-mono text-black">{supplier.leadTimeDays || '-'} days</span></p>
                          </div>
                        </div>
                        <button type="button" className="text-gray-400 hover:text-red-500 flex-shrink-0 ml-2 mt-0.5 transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm font-sans text-gray-400 italic">No suppliers linked yet.</p>
                )}
                
                <button 
                  type="button" 
                  onClick={() => {
                    if (onOpenAddSupplier) {
                      onOpenAddSupplier(initialData || { id: 'new', name: name || 'New Machine' } as Machine)
                    }
                  }}
                  className="font-sans text-[10px] font-semibold tracking-wide text-black uppercase hover:underline"
                >
                  + Link Supplier
                </button>
              </div>
            )}
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between gap-3 bg-white">
            <div>
              {step !== 'info' && (
                <button
                  type="button"
                  onClick={() => setStep(step === 'suppliers' ? 'images' : 'info')}
                  className="font-sans text-xs tracking-wide text-gray-500 hover:text-black transition-colors"
                >
                  ← Back
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="font-sans text-xs tracking-wide text-gray-500 px-4 py-2 hover:text-black hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              
              {step !== 'suppliers' ? (
                <button
                  type="button"
                  onClick={() => setStep(step === 'info' ? 'images' : 'suppliers')}
                  className="bg-gray-100 text-black border border-gray-200 font-sans text-xs tracking-wide px-6 py-2 hover:bg-gray-200 transition-colors"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-black text-white font-sans text-xs tracking-wide px-6 py-2 hover:bg-gray-800 transition-colors"
                >
                  Save Machine
                </button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
