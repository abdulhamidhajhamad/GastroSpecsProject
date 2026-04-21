'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import type { Machine } from '@/types/machine'

type MachineDeleteModalProps = {
  machine: Machine | null
  onConfirm: () => void
  onCancel: () => void
}

export default function MachineDeleteModal({ machine, onConfirm, onCancel }: MachineDeleteModalProps) {
  return (
    <Dialog open={Boolean(machine)} onOpenChange={(open) => (!open ? onCancel() : null)}>
      <DialogContent showCloseButton={false} className="max-w-md p-0 gap-0 rounded-none border border-gray-200">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="font-sans font-semibold text-sm tracking-[0.12em] uppercase text-black">DELETE MACHINE</h2>
        </div>

        <div className="p-6">
          <div className="border-l-2 border-red-600 bg-red-50 px-4 py-3">
            <p className="font-sans text-xs text-gray-700 leading-relaxed">
              This will permanently delete 
              <span className="font-semibold text-black"> {machine?.name || 'this machine'}</span>
              {' '}and all linked supplier data.
            </p>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3 bg-white">
          <button
            type="button"
            onClick={onCancel}
            className="border border-gray-200 font-sans text-xs tracking-wide text-gray-500 px-4 py-2 hover:border-black hover:text-black transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-red-600 text-white font-sans text-xs tracking-wide px-4 py-2 hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
