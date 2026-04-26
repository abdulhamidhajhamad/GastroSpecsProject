'use client'

import * as React from 'react'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import type { Customer, CustomerFormData } from '@/types/customer'

export type CustomerModalSubmitData = CustomerFormData

type CustomerModalProps = {
  isOpen: boolean
  mode: 'add' | 'edit'
  initialData: Customer | null
  onClose: () => void
  onSubmit: (data: CustomerModalSubmitData) => Promise<void>
  isSubmitting: boolean
  submitError: string | null
}

function getInitialFormState(initialData: Customer | null): CustomerFormData {
  return {
    name: initialData?.name ?? '',
    companyName: initialData?.companyName ?? '',
    country: initialData?.country ?? '',
    city: initialData?.city ?? '',
    customerType: initialData?.customerType ?? '',
    notes: '',
    contact: {
      whatsapp: initialData?.contact?.whatsapp ?? '',
      wechat: initialData?.contact?.wechat ?? '',
      email: initialData?.contact?.email ?? '',
    },
  }
}

export default function CustomerModal({ isOpen, mode, initialData, onClose, onSubmit, isSubmitting, submitError }: CustomerModalProps) {
  const [formData, setFormData] = React.useState<CustomerFormData>(() => getInitialFormState(initialData))
  const [nameError, setNameError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (isOpen) {
      setFormData(getInitialFormState(initialData))
      setNameError(null)
    }
  }, [isOpen, initialData])

  const handleChange = <K extends keyof CustomerFormData>(key: K, value: CustomerFormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleContactChange = (field: keyof CustomerFormData['contact'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formData.name.trim()) {
      setNameError('Full name is required.')
      return
    }

    setNameError(null)
    void onSubmit(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (!open ? onClose() : null)}>
      <DialogContent showCloseButton={false} className="w-[min(640px,calc(100%-2rem))] p-0 gap-0 rounded-none border border-gray-200">
        <DialogTitle className="sr-only">
          {mode === 'edit' ? 'Edit Customer' : 'Add New Customer'}
        </DialogTitle>

        <div className="bg-white">
          <div className="px-6 py-5 border-b border-gray-200 flex flex-col md:flex-row items-baseline md:items-center justify-between gap-4">
            <div>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-1">Customers</p>
              <h2 className="font-sans font-semibold text-sm tracking-[0.12em] uppercase text-black">
                {mode === 'edit' ? 'EDIT CUSTOMER' : 'ADD CUSTOMER'}
              </h2>
            </div>
            
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-black transition-colors px-2 py-1"
            >
              <span className="sr-only">Close</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form id="customer-modal-form" onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto p-6 space-y-8">
            {submitError && (
              <div className="border border-red-200 bg-red-50 px-4 py-3">
                <p className="font-sans text-xs text-red-700">{submitError}</p>
              </div>
            )}

            <section>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold mb-4">Customer Info</p>
              <div className="space-y-4">
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(event) => handleChange('name', event.target.value)}
                    placeholder="e.g. Elena Rostova"
                    disabled={isSubmitting}
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                  {nameError && <p className="font-sans text-[10px] text-red-600 mt-1">{nameError}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Company Name</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(event) => handleChange('companyName', event.target.value)}
                      placeholder="e.g. EuroFoods Supermarkets"
                      disabled={isSubmitting}
                      className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Customer Type</label>
                    <input
                      type="text"
                      value={formData.customerType}
                      onChange={(event) => handleChange('customerType', event.target.value)}
                      placeholder="e.g. Supermarket"
                      disabled={isSubmitting}
                      className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold mb-4">Location</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(event) => handleChange('country', event.target.value)}
                    disabled={isSubmitting}
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(event) => handleChange('city', event.target.value)}
                    disabled={isSubmitting}
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
            </section>

            <section>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold mb-4">Contact Details</p>
              <div className="space-y-4">
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">WhatsApp</label>
                  <input
                    type="text"
                    value={formData.contact?.whatsapp}
                    onChange={(event) => handleContactChange('whatsapp', event.target.value)}
                    disabled={isSubmitting}
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">WeChat</label>
                  <input
                    type="text"
                    value={formData.contact?.wechat}
                    onChange={(event) => handleContactChange('wechat', event.target.value)}
                    disabled={isSubmitting}
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.contact?.email}
                    onChange={(event) => handleContactChange('email', event.target.value)}
                    disabled={isSubmitting}
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
            </section>

            <section>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold mb-4">Notes</p>
              <div>
                <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Additional context</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(event) => handleChange('notes', event.target.value)}
                    disabled={isSubmitting}
                  className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors resize-none"
                />
              </div>
            </section>
          </form>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3 bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="border border-gray-200 bg-white font-sans text-xs tracking-wide text-gray-500 px-4 py-2 hover:border-black hover:text-black transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="customer-modal-form"
              disabled={isSubmitting}
              className="bg-black text-white font-sans text-xs tracking-wide px-4 py-2 hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting && (
                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                  <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" className="opacity-90" />
                </svg>
              )}
              {isSubmitting ? 'Saving...' : 'Save Customer'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}