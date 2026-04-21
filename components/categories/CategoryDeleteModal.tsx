'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import type { Category, SubCategory } from '@/types/category'

type CategoryDeleteModalProps = {
  item: Category | SubCategory | null
  onConfirm: () => void
  onCancel: () => void
}

export default function CategoryDeleteModal({ item, onConfirm, onCancel }: CategoryDeleteModalProps) {
  const isSub = Boolean(item && 'parentId' in item && item.parentId !== null)
  const title = isSub ? 'DELETE SUB-CATEGORY' : 'DELETE CATEGORY'
  
  return (
    <Dialog open={Boolean(item)} onOpenChange={(open) => (!open ? onCancel() : null)}>
      <DialogContent showCloseButton={false} className="max-w-[480px] p-0 gap-0 rounded-none border border-gray-200">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="font-sans font-semibold text-sm tracking-[0.12em] uppercase text-black">{title}</h2>
        </div>

        <div className="p-6">
          <div className="border-l-2 border-red-600 bg-red-50 px-4 py-3">
            <p className="font-sans text-xs text-gray-700 leading-relaxed">
              You are about to permanently delete 
              <span className="font-semibold text-black"> {item?.name || 'this item'}</span>.
              <br />
              <br />
              <span className="font-semibold text-red-700">
                {isSub 
                  ? "This will unlink all machines from this sub-category."
                  : "This will also delete all sub-categories and unlink all machines."}
              </span>
            </p>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3 bg-white">
          <button
            type="button"
            onClick={onCancel}
            className="border border-gray-200 font-sans text-xs tracking-wide text-gray-500 px-4 py-2 hover:border-black hover:text-black transition-colors rounded-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-red-600 text-white font-sans text-xs tracking-wide px-4 py-2 hover:bg-red-700 transition-colors rounded-sm"
          >
            Delete
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}