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
  suppliers: Array<{ id: string; companyName: string }>
  categories: Array<{ id: string; name: string }>
  onSubmit: (payload: MachineDrawerSubmitData) => Promise<void>
  isSubmitting: boolean
  submitError: string | null
  onClose: () => void
}

export type MachineDrawerSubmitData = {
  supplierId: string
  categoryId: string
  name: string
  modelNumber?: string
  costPrice: number
  images: string[]
  moq?: number
  leadTimeDays?: number
  specifications: Record<string, string>
  notes?: string
}

type SpecItem = { key: string; value: string }

export default function MachineDrawer({
  isOpen,
  step,
  setStep,
  initialData,
  suppliers,
  categories,
  onSubmit,
  isSubmitting,
  submitError,
  onClose,
}: MachineDrawerProps) {
  const isEditMode = Boolean(initialData)

  const [supplierId, setSupplierId] = React.useState('')
  const [name, setName] = React.useState('')
  const [categoryId, setCategoryId] = React.useState('')
  const [modelNumber, setModelNumber] = React.useState('')
  const [costPrice, setCostPrice] = React.useState<number | ''>('')
  const [moq, setMoq] = React.useState<number | ''>('')
  const [leadTimeDays, setLeadTimeDays] = React.useState<number | ''>('')
  const [imageUrls, setImageUrls] = React.useState<string[]>([])
  const [specs, setSpecs] = React.useState<SpecItem[]>([{ key: '', value: '' }, { key: '', value: '' }])
  const [notes, setNotes] = React.useState('')
  const [formError, setFormError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!isOpen) return

    const machine = initialData as any

    if (initialData) {
      setName(initialData.name)
      setCategoryId(initialData.categoryId)
      setSupplierId(machine?.supplierId || machine?.machineSuppliers?.[0]?.supplierId || '')
      setModelNumber(machine?.modelNumber || machine?.machineSuppliers?.[0]?.modelNumber || '')
      setCostPrice(machine?.costPrice ?? machine?.machineSuppliers?.[0]?.costPrice ?? '')
      setMoq(machine?.moq ?? machine?.machineSuppliers?.[0]?.moq ?? '')
      setLeadTimeDays(machine?.leadTimeDays ?? machine?.machineSuppliers?.[0]?.leadTimeDays ?? '')
      setNotes(initialData.notes || '')

      if (Array.isArray(machine?.images)) {
        setImageUrls(
          machine.images
            .map((img: any) => (typeof img === 'string' ? img : img?.url))
            .filter((url: string | undefined) => Boolean(url)),
        )
      } else {
        setImageUrls([])
      }
      
      const specEntries = Object.entries(initialData.specifications).map(([key, value]) => ({ key, value }))
      setSpecs(specEntries.length > 0 ? specEntries : [{ key: '', value: '' }, { key: '', value: '' }])
    } else {
      setSupplierId('')
      setName('')
      setCategoryId('')
      setModelNumber('')
      setCostPrice('')
      setMoq('')
      setLeadTimeDays('')
      setImageUrls([])
      setNotes('')
      setSpecs([{ key: '', value: '' }, { key: '', value: '' }])
    }

    setFormError(null)
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

  const handleSave = async () => {
    if (!name.trim()) {
      setFormError('Machine name is required.')
      return
    }

    if (!categoryId) {
      setFormError('Category is required.')
      return
    }

    if (!supplierId) {
      setFormError('Supplier is required.')
      return
    }

    if (costPrice === '' || Number(costPrice) <= 0) {
      setFormError('Cost price must be greater than 0.')
      return
    }

    const specRecord = specs.reduce((acc, curr) => {
      if (curr.key.trim() && curr.value.trim()) {
        acc[curr.key.trim()] = curr.value.trim()
      }
      return acc
    }, {} as Record<string, string>)

    setFormError(null)

    await onSubmit({
      supplierId,
      categoryId,
      name: name.trim(),
      modelNumber: modelNumber.trim() || undefined,
      costPrice: Number(costPrice),
      images: imageUrls,
      moq: moq === '' ? undefined : Number(moq),
      leadTimeDays: leadTimeDays === '' ? undefined : Number(leadTimeDays),
      specifications: specRecord,
      notes: notes.trim() || undefined,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (!open ? onClose() : null)}>
      <DialogContent showCloseButton={false} className="w-[800px] max-w-[95vw] h-[85vh] max-h-[85vh] p-0 gap-0 rounded-none border border-gray-200 flex flex-col overflow-hidden bg-white">
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
                    disabled={isSubmitting}
                    placeholder="e.g. Planetary Dough Mixer 30L"
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Supplier *</label>
                  <select
                    value={supplierId}
                    onChange={(e) => setSupplierId(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  >
                    <option value="" disabled>Select supplier</option>
                    {suppliers.map((supplier) => (
                      <option key={supplier.id} value={supplier.id}>{supplier.companyName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Category *</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  >
                    <option value="" disabled>Select category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Model Number</label>
                    <input
                      type="text"
                      value={modelNumber}
                      onChange={(e) => setModelNumber(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Cost Price *</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={costPrice}
                      onChange={(e) => setCostPrice(e.target.value ? Number(e.target.value) : '')}
                      disabled={isSubmitting}
                      className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">MOQ</label>
                    <input
                      type="number"
                      min="1"
                      value={moq}
                      onChange={(e) => setMoq(e.target.value ? Number(e.target.value) : '')}
                      disabled={isSubmitting}
                      className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Lead Time (Days)</label>
                    <input
                      type="number"
                      min="0"
                      value={leadTimeDays}
                      onChange={(e) => setLeadTimeDays(e.target.value ? Number(e.target.value) : '')}
                      disabled={isSubmitting}
                      className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
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
                          disabled={isSubmitting}
                          className="flex-1 border border-gray-200 font-sans text-xs px-2 py-2 focus:outline-none focus:border-black"
                        />
                        <input
                          type="text"
                          placeholder="Value (e.g. 1.5kW)"
                          value={s.value}
                          onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                          disabled={isSubmitting}
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
                    disabled={isSubmitting}
                    placeholder="Internal quality tracking, accessory lists..."
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black resize-none"
                  />
                </div>
              </div>
            )}

            {step === 'images' && (
              <div className="space-y-6">
                <div className="border border-gray-200 bg-gray-50 p-4 space-y-3">
                  <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-gray-500">Image URLs (optional)</p>
                  {imageUrls.map((url, index) => (
                    <input
                      key={`img-url-${index}`}
                      type="url"
                      value={url}
                      onChange={(e) => {
                        setImageUrls((prev) => {
                          const copy = [...prev]
                          copy[index] = e.target.value
                          return copy
                        })
                      }}
                      disabled={isSubmitting}
                      placeholder="https://example.com/image.jpg"
                      className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                    />
                  ))}
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setImageUrls((prev) => [...prev, ''])}
                    className="font-sans text-[10px] uppercase tracking-[0.1em] text-black hover:underline"
                  >
                    + Add Image URL
                  </button>
                </div>
                <div className="border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center h-40 gap-2">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                  <p className="font-sans text-xs text-gray-500 uppercase tracking-wide">Local upload coming soon</p>
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
                <div className="space-y-2 border border-gray-200 bg-gray-50 p-4">
                  <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-gray-500">Review & Save</p>
                  <p className="font-sans text-xs text-gray-600">Supplier and pricing are now configured in this machine form.</p>
                  <p className="font-sans text-xs text-gray-600">Press Save Machine to submit and refresh the list.</p>
                </div>
              </div>
            )}
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between gap-3 bg-white">
            <div>
              {(formError || submitError) && (
                <p className="font-sans text-[11px] text-red-600">{formError || submitError}</p>
              )}
              {step !== 'info' && (
                <button
                  type="button"
                  onClick={() => setStep(step === 'suppliers' ? 'images' : 'info')}
                  disabled={isSubmitting}
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
                disabled={isSubmitting}
                className="font-sans text-xs tracking-wide text-gray-500 px-4 py-2 hover:text-black hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              
              {step !== 'suppliers' ? (
                <button
                  type="button"
                  onClick={() => setStep(step === 'info' ? 'images' : 'suppliers')}
                  disabled={isSubmitting}
                  className="bg-gray-100 text-black border border-gray-200 font-sans text-xs tracking-wide px-6 py-2 hover:bg-gray-200 transition-colors"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSubmitting}
                  className="bg-black text-white font-sans text-xs tracking-wide px-6 py-2 hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting && (
                    <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" className="opacity-90" />
                    </svg>
                  )}
                  {isSubmitting ? 'Saving...' : 'Save Machine'}
                </button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
