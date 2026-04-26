'use client'

import * as React from 'react'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import type { Supplier } from '@/types/supplier'

type SupplierContactMethod = {
  type: 'wechat' | 'whatsapp' | 'email'
  value: string
  id: string
}

type AddSupplierContactDrawerProps = {
  isOpen: boolean
  supplier: Supplier | null
  onSubmit: (data: AddSupplierContactSubmitData) => Promise<void>
  isSubmitting: boolean
  submitError: string | null
  onClose: () => void
}

export type AddSupplierContactSubmitData = {
  name: string
  position?: string
  notes?: string
  contactMethods: Record<string, string>
}

type ContactFormState = {
  name: string
  position: string
  notes: string
  methods: SupplierContactMethod[]
}

const DEFAULT_METHODS: SupplierContactMethod[] = [
  { id: crypto.randomUUID(), type: 'wechat', value: '' },
  { id: crypto.randomUUID(), type: 'whatsapp', value: '' },
  { id: crypto.randomUUID(), type: 'email', value: '' },
]

export default function AddSupplierContactDrawer({
  isOpen,
  supplier,
  onSubmit,
  isSubmitting,
  submitError,
  onClose,
}: AddSupplierContactDrawerProps) {
  const [formData, setFormData] = React.useState<ContactFormState>({
    name: '',
    position: '',
    notes: '',
    methods: DEFAULT_METHODS,
  })
  
  const [nameError, setNameError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!isOpen) return
    setFormData({
      name: '',
      position: '',
      notes: '',
      methods: [
        { id: crypto.randomUUID(), type: 'wechat', value: '' },
        { id: crypto.randomUUID(), type: 'whatsapp', value: '' },
        { id: crypto.randomUUID(), type: 'email', value: '' },
      ],
    })
    setNameError(null)
  }, [isOpen])

  const handleChange = <K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleAddMethod = (type: 'wechat' | 'whatsapp' | 'email') => {
    setFormData((prev) => ({
      ...prev,
      methods: [...prev.methods, { id: crypto.randomUUID(), type, value: '' }]
    }))
  }

  const handleUpdateMethod = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      methods: prev.methods.map((m) => m.id === id ? { ...m, value } : m)
    }))
  }

  const handleRemoveMethod = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      methods: prev.methods.filter((m) => m.id !== id)
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formData.name.trim()) {
      setNameError('Name is required.')
      return
    }

    setNameError(null)

    const contactMethods = formData.methods.reduce<Record<string, string>>((acc, method) => {
      const normalizedValue = method.value.trim()
      if (normalizedValue) {
        acc[method.type] = normalizedValue
      }
      return acc
    }, {})

    await onSubmit({
      name: formData.name.trim(),
      position: formData.position.trim() || undefined,
      notes: formData.notes.trim() || undefined,
      contactMethods,
    })
  }

  const renderMethodSection = (type: 'wechat' | 'whatsapp' | 'email', title: string, placeholder: string) => {
    const sectionMethods = formData.methods.filter(m => m.type === type)
    
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400">{title}</label>
          <button
            type="button"
            onClick={() => handleAddMethod(type)}
            className="w-5 h-5 flex items-center justify-center border border-gray-200 text-gray-400 hover:border-black hover:text-black transition-colors"
          >
            +
          </button>
        </div>
        
        {sectionMethods.length === 0 ? (
          <p className="font-sans text-[10px] text-gray-400 italic">No {title} added</p>
        ) : (
          <div className="space-y-2">
            {sectionMethods.map((method) => (
              <div key={method.id} className="flex items-center gap-2">
                <input
                  type={type === 'email' ? 'email' : 'text'}
                  value={method.value}
                  onChange={(e) => handleUpdateMethod(method.id, e.target.value)}
                  placeholder={placeholder}
                  className="flex-1 border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveMethod(method.id)}
                  className="px-3 py-2.5 border border-gray-200 font-sans text-[9px] uppercase tracking-wider text-red-400 hover:border-red-500 hover:text-red-500 transition-colors"
                >
                  Clear
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (!open ? onClose() : null)}>
      <DialogContent
        showCloseButton={false}
        className="w-[720px] max-w-[95vw] h-[88vh] max-h-[760px] p-0 gap-0 rounded-none border border-gray-200"
      >
        <DialogTitle className="sr-only">
          Add Supplier Contact
        </DialogTitle>

        <div className="flex h-full flex-col bg-white overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 flex items-start justify-between gap-4 shrink-0">
            <div className="overflow-hidden">
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-1 truncate">
                Contact for {supplier?.companyName || 'Supplier'}
              </p>
              <h2 className="font-sans font-semibold text-sm tracking-[0.12em] uppercase text-black">
                ADD NEW CONTACT
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="font-sans text-[14px] leading-none text-gray-400 hover:text-black transition-colors shrink-0 p-1"
              aria-label="Close add contact modal"
            >
              x
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <form id="supplier-contact-modal-form" onSubmit={handleSubmit} className="p-6 space-y-8">
              <section>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold mb-4">Basic Info</p>
                <div className="space-y-4">
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(event) => handleChange('name', event.target.value)}
                    disabled={isSubmitting}
                    placeholder="e.g. John Doe"
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                  {nameError && (
                    <p className="font-sans text-[10px] text-red-600 mt-1">{nameError}</p>
                  )}
                </div>

                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Position</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(event) => handleChange('position', event.target.value)}
                    disabled={isSubmitting}
                    placeholder="e.g. Sales Manager"
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Notes</label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(event) => handleChange('notes', event.target.value)}
                    disabled={isSubmitting}
                    placeholder="Additional context or notes..."
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
            </section>

              <section className="space-y-6">
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold mb-4 border-b border-gray-100 pb-2">Contact Methods</p>
                
                {renderMethodSection('wechat', 'WeChat', 'WeChat ID')}
                {renderMethodSection('whatsapp', 'WhatsApp', '+1 234 567 8900')}
                {renderMethodSection('email', 'Email Address', 'email@example.com')}
              </section>
            </form>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3 shrink-0 bg-gray-50 z-10 relative">
            {submitError && (
              <p className="mr-auto font-sans text-[11px] text-red-600">{submitError}</p>
            )}
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="border border-gray-200 bg-white font-sans text-[10px] tracking-[0.12em] uppercase text-gray-500 px-5 py-2.5 hover:border-black hover:text-black transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="supplier-contact-modal-form"
              disabled={isSubmitting}
              className="bg-black text-white font-sans text-[10px] tracking-[0.12em] uppercase px-5 py-2.5 hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting && (
                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                  <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" className="opacity-90" />
                </svg>
              )}
              {isSubmitting ? 'Saving...' : 'Save Contact'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
