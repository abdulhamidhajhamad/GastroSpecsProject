'use client'

import * as React from 'react'

import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import type { Supplier } from '@/types/supplier'

type SupplierDrawerProps = {
  isOpen: boolean
  initialData: Supplier | null
  onClose: () => void
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
  primaryContactMethods: string
}

function getInitialFormState(initialData: Supplier | null): SupplierFormState {
  const primaryContact = initialData?.contacts[0]

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
    primaryContactMethods: primaryContact?.contactMethods ?? '',
  }
}

export default function SupplierDrawer({ isOpen, initialData, onClose }: SupplierDrawerProps) {
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formData.companyName.trim()) {
      setCompanyNameError('Company name is required.')
      return
    }

    setCompanyNameError(null)
    console.log('Supplier drawer submit:', formData)
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (!open ? onClose() : null)}>
      <SheetContent side="right" className="w-[480px] max-w-[95vw] p-0 gap-0">
        <SheetTitle className="sr-only">
          {isEditMode ? 'Edit supplier drawer' : 'Add new supplier drawer'}
        </SheetTitle>

        <div className="flex h-full flex-col bg-white">
          <div className="px-6 py-5 border-b border-gray-200">
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-1">Suppliers</p>
            <h2 className="font-sans font-semibold text-sm tracking-[0.12em] uppercase text-black">
              {isEditMode ? 'EDIT SUPPLIER' : 'ADD NEW SUPPLIER'}
            </h2>
          </div>

          <form id="supplier-drawer-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
            <section>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold mb-3">Company Info</p>
              <div className="space-y-4">
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(event) => handleChange('companyName', event.target.value)}
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
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(event) => handleChange('city', event.target.value)}
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">District</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(event) => handleChange('district', event.target.value)}
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Street</label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(event) => handleChange('street', event.target.value)}
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
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(event) => handleChange('phone', event.target.value)}
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">WeChat</label>
                  <input
                    type="text"
                    value={formData.wechat}
                    onChange={(event) => handleChange('wechat', event.target.value)}
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
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Position</label>
                  <input
                    type="text"
                    value={formData.primaryContactPosition}
                    onChange={(event) => handleChange('primaryContactPosition', event.target.value)}
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-2">Contact Methods (JSON string)</label>
                  <textarea
                    rows={3}
                    value={formData.primaryContactMethods}
                    onChange={(event) => handleChange('primaryContactMethods', event.target.value)}
                    placeholder='{"wechat":"contact_wechat","phone":"+86 ..."}'
                    className="w-full border border-gray-200 font-sans text-xs text-black px-3 py-2.5 focus:outline-none focus:border-black transition-colors resize-none"
                  />
                </div>
              </div>
            </section>
          </form>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-200 font-sans text-xs tracking-wide text-gray-500 px-4 py-2 hover:border-black hover:text-black transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="supplier-drawer-form"
              className="bg-black text-white font-sans text-xs tracking-wide px-4 py-2 hover:bg-gray-800 transition-colors"
            >
              {isEditMode ? 'Update Supplier' : 'Save Supplier'}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}