'use client'

import Link from 'next/link'

import SupplierContactsCard from '@/components/suppliers/SupplierContactsCard'
import SupplierDetailOverview from '@/components/suppliers/SupplierDetailOverview'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import type { Supplier } from '@/types/supplier'

type SupplierQuickViewModalProps = {
  supplier: Supplier | null
  onClose: () => void
  onEdit: (supplier: Supplier) => void
}

function formatHeaderLocation(supplier: Supplier) {
  return [supplier.location.city, supplier.location.province].filter(Boolean).join(', ')
}

export default function SupplierQuickViewModal({ supplier, onClose, onEdit }: SupplierQuickViewModalProps) {
  return (
    <Dialog open={Boolean(supplier)} onOpenChange={(open) => (!open ? onClose() : null)}>
      <DialogContent
        showCloseButton={false}
        className="w-[min(980px,calc(100%-2rem))] max-w-none sm:max-w-[980px] p-0 gap-0 rounded-none border border-gray-200"
      >
        <DialogTitle className="sr-only">
          {supplier ? `Supplier quick view for ${supplier.companyName}` : 'Supplier quick view'}
        </DialogTitle>

        {supplier && (
          <div className="bg-white">
            <div className="px-6 py-5 border-b border-gray-200 flex items-start justify-between gap-4">
              <div>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-1">Supplier Quick View</p>
                <h2 className="font-sans font-semibold text-sm tracking-[0.08em] uppercase text-black">{supplier.companyName}</h2>
                <p className="font-sans text-xs text-gray-400 mt-1">{formatHeaderLocation(supplier) || 'Location not set'}</p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="border border-gray-200 font-sans text-[10px] tracking-[0.12em] uppercase text-gray-500 px-3 py-1.5 hover:border-black hover:text-black transition-colors"
              >
                Close
              </button>
            </div>

            <div className="max-h-[72vh] overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200">
                <div className="bg-white p-4">
                  <p className="font-sans text-[9px] tracking-[0.12em] uppercase text-gray-400">Supplier ID</p>
                  <p className="font-mono text-xs text-gray-500 mt-1">{supplier.id}</p>
                </div>
                <div className="bg-white p-4">
                  <p className="font-sans text-[9px] tracking-[0.12em] uppercase text-gray-400">Machine Count</p>
                  <p className="font-serif text-2xl text-black leading-none mt-2">{supplier.machineCount}</p>
                </div>
                <div className="bg-white p-4">
                  <p className="font-sans text-[9px] tracking-[0.12em] uppercase text-gray-400">Active Contacts</p>
                  <p className="font-serif text-2xl text-black leading-none mt-2">{supplier.contacts.length}</p>
                </div>
                <div className="bg-white p-4">
                  <p className="font-sans text-[9px] tracking-[0.12em] uppercase text-gray-400">Partnership</p>
                  <span
                    className={`inline-flex mt-2 items-center border px-2.5 py-1 font-sans text-[9px] font-semibold tracking-[0.12em] uppercase ${supplier.isDdpPartner ? 'border-green-200 bg-green-50 text-green-600' : 'border-gray-200 bg-gray-50 text-gray-500'}`}
                  >
                    {supplier.isDdpPartner ? 'DDP Partner' : 'Standard'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 min-w-0">
                  <SupplierDetailOverview supplier={supplier} />
                </div>
                <div className="flex-1 min-w-0">
                  <SupplierContactsCard contacts={supplier.contacts} />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="border border-gray-200 font-sans text-xs tracking-wide text-gray-500 px-4 py-2 hover:border-black hover:text-black transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose()
                  onEdit(supplier)
                }}
                className="border border-gray-200 font-sans text-xs tracking-wide text-gray-500 px-4 py-2 hover:border-black hover:text-black transition-colors"
              >
                Edit Supplier
              </button>
              <Link
                href={`/portal/suppliers/${supplier.id}`}
                className="bg-black text-white font-sans text-xs tracking-wide px-4 py-2 hover:bg-gray-800 transition-colors"
              >
                Open Full Profile
              </Link>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}