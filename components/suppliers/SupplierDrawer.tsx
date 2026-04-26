'use client'

import * as React from 'react'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import type { Supplier } from '@/types/supplier'

type SupplierContactMethod = {
  type: 'wechat' | 'whatsapp' | 'email'
  value: string
  id: string
}

type SupplierDrawerProps = {
  isOpen: boolean
  initialData: Supplier | null
  onSubmit: (data: SupplierDrawerSubmitData) => Promise<void>
  isSubmitting: boolean
  submitError: string | null
  onClose: () => void
}

export type SupplierDrawerSubmitData = {
  companyName: string
  website?: string
  notes?: string
  isDdpPartner: boolean
  location: {
    province: string
    city: string
    district?: string
    street?: string
  }
  email?: string
  phone?: string
  wechat?: string
  primaryContactName?: string
  primaryContactPosition?: string
  primaryContactMethods: Record<string, string>
}

type SupplierFormState = {
  companyName: string
  website: string
  notes: string
  isDdpPartner: boolean
  province: string
  city: string
  district: string
  street: string
  email: string
  phone: string
  wechat: string
  primaryContactName: string
  primaryContactPosition: string
  primaryContactMethods: SupplierContactMethod[]
}

function getInitialFormState(initialData: Supplier | null): SupplierFormState {
  const primaryContact = initialData?.contacts[0]

  let parsedMethods: SupplierContactMethod[] = []
  if (primaryContact?.contactMethods) {
    try {
      const parsed = typeof primaryContact.contactMethods === 'string' 
        ? JSON.parse(primaryContact.contactMethods) 
        : primaryContact.contactMethods
      
      Object.entries(parsed).forEach(([key, value]) => {
        if (key === 'wechat' || key === 'whatsapp' || key === 'email') {
          parsedMethods.push({ id: crypto.randomUUID(), type: key, value: String(value) })
        }
      })
    } catch {
      // handle error silently
    }
  }

  if (parsedMethods.length === 0) {
    parsedMethods = [
      { id: crypto.randomUUID(), type: 'wechat', value: '' },
      { id: crypto.randomUUID(), type: 'whatsapp', value: '' },
      { id: crypto.randomUUID(), type: 'email', value: '' },
    ]
  }

  return {
    companyName: initialData?.companyName ?? '',
    website: initialData?.website ?? '',
    notes: initialData?.notes ?? '',
    isDdpPartner: initialData?.isDdpPartner ?? false,
    province: initialData?.location.province ?? '',
    city: initialData?.location.city ?? '',
    district: initialData?.location.district ?? '',
    street: initialData?.location.street ?? '',
    email: initialData?.email ?? '',
    phone: initialData?.phone ?? '',
    wechat: initialData?.wechat ?? '',
    primaryContactName: primaryContact?.name ?? '',
    primaryContactPosition: primaryContact?.position ?? '',
    primaryContactMethods: parsedMethods,
  }
}

export default function SupplierDrawer({ isOpen, initialData, onSubmit, isSubmitting, submitError, onClose }: SupplierDrawerProps) {
  const isEditMode = Boolean(initialData)
  const [formData, setFormData] = React.useState<SupplierFormState>(() => getInitialFormState(initialData))
  const [companyNameError, setCompanyNameError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!isOpen) {
      return
    }

    setFormData(getInitialFormState(initialData))
    setCompanyNameError(null)
  }, [isOpen, initialData])

  const handleChange = <K extends keyof SupplierFormState>(key: K, value: SupplierFormState[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleAddMethod = (type: 'wechat' | 'whatsapp' | 'email') => {
    setFormData((prev) => ({
      ...prev,
      primaryContactMethods: [...prev.primaryContactMethods, { id: crypto.randomUUID(), type, value: '' }]
    }))
  }

  const handleUpdateMethod = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      primaryContactMethods: prev.primaryContactMethods.map((m) => m.id === id ? { ...m, value } : m)
    }))
  }

  const handleRemoveMethod = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      primaryContactMethods: prev.primaryContactMethods.filter((m) => m.id !== id)
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formData.companyName.trim()) {
      setCompanyNameError('Company name is required.')
      return
    }

    setCompanyNameError(null)

    const primaryContactMethods = formData.primaryContactMethods.reduce<Record<string, string>>((acc, method) => {
      const normalizedValue = method.value.trim()
      if (normalizedValue) {
        acc[method.type] = normalizedValue
      }
      return acc
    }, {})

    await onSubmit({
      companyName: formData.companyName.trim(),
      website: formData.website.trim() || undefined,
      notes: formData.notes.trim() || undefined,
      isDdpPartner: formData.isDdpPartner,
      location: {
        province: formData.province.trim(),
        city: formData.city.trim(),
        district: formData.district.trim() || undefined,
        street: formData.street.trim() || undefined,
      },
      email: formData.email.trim() || undefined,
      phone: formData.phone.trim() || undefined,
      wechat: formData.wechat.trim() || undefined,
      primaryContactName: formData.primaryContactName.trim() || undefined,
      primaryContactPosition: formData.primaryContactPosition.trim() || undefined,
      primaryContactMethods,
    })
  }

  const renderMethodSection = (type: 'wechat' | 'whatsapp' | 'email', title: string, placeholder: string) => {
    const sectionMethods = formData.primaryContactMethods.filter(m => m.type === type)
    
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
              <div className="flex items-center gap-2" key={method.id}>
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
          {isEditMode ? 'Edit supplier drawer' : 'Add new supplier drawer'}
        </DialogTitle>

        <div className="flex h-full flex-col bg-white overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 flex items-start justify-between gap-4 shrink-0">
            <div className="overflow-hidden">
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-1 truncate">Suppliers</p>
              <h2 className="font-sans font-semibold text-sm tracking-[0.12em] uppercase text-black">
                {isEditMode ? 'EDIT SUPPLIER' : 'ADD NEW SUPPLIER'}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="font-sans text-[14px] leading-none text-gray-400 hover:text-black transition-colors shrink-0 p-1"
              aria-label="Close modal"
            >
              x
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <form id="supplier-drawer-form" onSubmit={handleSubmit} className="p-6 space-y-8">
              <section>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold mb-3">Company Info</p>
              <div className="space-y-4">
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(event) => handleChange('companyName', event.target.value)}
                    disabled={isSubmitting}
                    placeholder="e.g. Foshan Titan Thermal Equipment"
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                  {companyNameError && (
                    <p className="font-sans text-[10px] text-red-600 mt-1">{companyNameError}</p>
                  )}
                </div>

                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(event) => handleChange('website', event.target.value)}
                    disabled={isSubmitting}
                    placeholder="https://"
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    id="drawer-ddp"
                    type="checkbox"
                    checked={formData.isDdpPartner}
                    onChange={(event) => handleChange('isDdpPartner', event.target.checked)}
                    disabled={isSubmitting}
                    className="h-4 w-4 border-gray-300"
                  />
                  <label htmlFor="drawer-ddp" className="font-sans text-xs text-gray-600">DDP Partner</label>
                </div>

                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Notes</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(event) => handleChange('notes', event.target.value)}
                    disabled={isSubmitting}
                    placeholder="Internal procurement notes..."
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors resize-none"
                  />
                </div>
              </div>
            </section>

            <section>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold mb-3">Location</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Province</label>
                  <input
                    type="text"
                    value={formData.province}
                    onChange={(event) => handleChange('province', event.target.value)}
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
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">District</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(event) => handleChange('district', event.target.value)}
                    disabled={isSubmitting}
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Street</label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(event) => handleChange('street', event.target.value)}
                    disabled={isSubmitting}
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
            </section>

            <section>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold mb-3">Contact Details</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(event) => handleChange('email', event.target.value)}
                    disabled={isSubmitting}
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(event) => handleChange('phone', event.target.value)}
                    disabled={isSubmitting}
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">WeChat</label>
                  <input
                    type="text"
                    value={formData.wechat}
                    onChange={(event) => handleChange('wechat', event.target.value)}
                    disabled={isSubmitting}
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
            </section>

            <section>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold mb-3">Primary Contact Person</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.primaryContactName}
                    onChange={(event) => handleChange('primaryContactName', event.target.value)}
                    disabled={isSubmitting}
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Position</label>
                  <input
                    type="text"
                    value={formData.primaryContactPosition}
                    onChange={(event) => handleChange('primaryContactPosition', event.target.value)}
                    disabled={isSubmitting}
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div className="col-span-2 space-y-6 mt-4">
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold mb-4 border-b border-gray-100 pb-2">Contact Methods</p>
                  {renderMethodSection('wechat', 'WeChat', 'WeChat ID')}
                  {renderMethodSection('whatsapp', 'WhatsApp', '+1 234 567 8900')}
                  {renderMethodSection('email', 'Email Address', 'email@example.com')}
                </div>
              </div>
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
              form="supplier-drawer-form"
              disabled={isSubmitting}
              className="bg-black text-white font-sans text-[10px] tracking-[0.12em] uppercase px-5 py-2.5 hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting && (
                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                  <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" className="opacity-90" />
                </svg>
              )}
              {isSubmitting ? 'Saving...' : isEditMode ? 'Update Supplier' : 'Save Supplier'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}