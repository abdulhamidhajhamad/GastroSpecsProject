'use client'

import * as React from 'react'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import type { Customer } from '@/types/customer'

type CustomerDeleteModalProps = {
  isOpen: boolean
  customer: Customer | null
  onClose: () => void
  onConfirm: () => void
}

export default function CustomerDeleteModal({
  isOpen,
  customer,
  onClose,
  onConfirm,
}: CustomerDeleteModalProps) {
  if (!customer) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (!open ? onClose() : null)}>
      <DialogContent showCloseButton={false} className="sm:max-w-[425px] p-0 gap-0 rounded-none border border-gray-200">
        <DialogTitle className="sr-only">Delete customer {customer.name}</DialogTitle>

        <div className="p-6">
          <div className="w-12 h-12 bg-red-50 border border-red-100 flex items-center justify-center mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-red-500">
              <path d="M3 6h18" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </div>

          <h2 className="font-serif text-2xl text-black mb-2">Delete Customer</h2>
          <p className="font-sans text-sm text-gray-500 leading-relaxed mb-8">
            This will permanently delete <strong className="text-black font-semibold">{customer.name}</strong> and all their order history.
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 font-sans text-xs tracking-wide text-gray-600 hover:border-black hover:text-black transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 font-sans text-xs tracking-wide text-white hover:bg-red-700 transition-colors"
            >
              Delete Customer
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}