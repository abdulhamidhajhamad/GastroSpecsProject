'use client'

import * as React from 'react'
import { Category, SubCategory } from '@/types/category'
import { uploadCategoryImage } from '@/lib/uploadImage'

type ModalMode = 'add-parent' | 'add-sub' | 'edit-parent' | 'edit-sub'

type CategoryModalProps = {
  isOpen: boolean
  onClose: () => void
  mode: ModalMode
  selectedCategory: Category | null
  selectedSubCategory: SubCategory | null
  parentForNewSub: Category | null
  isUploadingImage: boolean
  setIsUploadingImage: (val: boolean) => void
}

export default function CategoryModal({
  isOpen,
  onClose,
  mode,
  selectedCategory,
  selectedSubCategory,
  parentForNewSub,
  isUploadingImage,
  setIsUploadingImage,
}: CategoryModalProps) {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [imageUrl, setImageUrl] = React.useState('')
  
  const [error, setError] = React.useState('')
  const [uploadError, setUploadError] = React.useState('')

  const isParentMode = mode === 'add-parent' || mode === 'edit-parent'
  const isSubMode = mode === 'add-sub' || mode === 'edit-sub'

  const title = React.useMemo(() => {
    switch (mode) {
      case 'add-parent': return 'ADD CATEGORY'
      case 'add-sub': return 'ADD SUB-CATEGORY'
      case 'edit-parent': return 'EDIT CATEGORY'
      case 'edit-sub': return 'EDIT SUB-CATEGORY'
    }
  }, [mode])

  // Reset/populate form when modal opens
  React.useEffect(() => {
    setError('')
    setUploadError('')
    
    if (isOpen) {
      if (mode === 'edit-parent' && selectedCategory) {
        setName(selectedCategory.name)
        setDescription(selectedCategory.description || '')
        setImageUrl(selectedCategory.imageUrl || '')
      } else if (mode === 'edit-sub' && selectedSubCategory) {
        setName(selectedSubCategory.name)
        setDescription('')
        setImageUrl(selectedSubCategory.imageUrl || '')
      } else {
        setName('')
        setDescription('')
        setImageUrl('')
      }
    }
  }, [isOpen, mode, selectedCategory, selectedSubCategory])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadError('')
    setIsUploadingImage(true)

    const targetPath: 'parents' | 'subs' = isSubMode ? 'subs' : 'parents'
    const targetId = Date.now().toString()

    try {
      const url = await uploadCategoryImage(file, targetPath, targetId)
      setImageUrl(url)
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload image')
    } finally {
      setIsUploadingImage(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      setError('Name is required.')
      return
    }

    if (isParentMode) {
      console.log('Submit Parent Category:', { name, description, imageUrl })
    } else {
      const parentId = mode === 'add-sub' ? parentForNewSub?.id : parentForNewSub?.id // In real app, sub category might have parentId inside it
      console.log('Submit Sub-Category:', { name, parentId, imageUrl })
    }

    // Usually we would call an API here and then close
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="bg-white w-full max-w-[640px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden" 
        role="dialog" 
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-mono text-sm tracking-[0.1em] uppercase font-bold text-black pt-1">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-black transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <form id="category-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* SUB-CATEGORY READONLY PARENT */}
            {isSubMode && parentForNewSub && (
              <div>
                <label className="block font-sans text-[11px] tracking-[0.08em] uppercase text-gray-500 mb-2">
                  Parent Category
                </label>
                <div className="w-full border border-gray-200 px-4 py-3 bg-gray-50 text-gray-600 font-sans text-sm rounded-sm">
                  {parentForNewSub.name}
                </div>
              </div>
            )}

            {/* NAME */}
            <div>
              <label className="block font-sans text-[11px] tracking-[0.08em] uppercase text-gray-500 mb-2">
                {isParentMode ? 'Category Name *' : 'Sub-Category Name *'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setError('')
                }}
                className={`w-full border ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-black'} px-4 py-3 outline-none font-sans text-sm transition-colors rounded-sm`}
                placeholder="e.g., Refrigeration Equipment"
              />
              {error && <p className="mt-2 text-red-500 text-xs">{error}</p>}
            </div>

            {/* PARENT ONLY FIELDS */}
            {isParentMode && (
              <>
                {/* DESCRIPTION */}
                <div>
                  <label className="block font-sans text-[11px] tracking-[0.08em] uppercase text-gray-500 mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full border border-gray-200 px-4 py-3 outline-none focus:border-black font-sans text-sm transition-colors rounded-sm resize-none"
                    placeholder="Brief description of this category..."
                  />
                </div>
              </>
            )}

            {/* IMAGE UPLOAD */}
            <div>
              <label className="block font-sans text-[11px] tracking-[0.08em] uppercase text-gray-500 mb-2">
                {isParentMode ? 'Cover Image' : 'Sub-Category Image'}
              </label>
              
              {imageUrl ? (
                <div className="relative group aspect-video bg-gray-100 rounded-sm overflow-hidden border border-gray-200">
                  <img src={imageUrl} alt="Cover Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <label className="cursor-pointer bg-white px-4 py-2 font-sans text-xs font-semibold text-black uppercase tracking-wider rounded-sm hover:bg-gray-100 transition-colors">
                      Change Image
                      <input type="file" className="hidden" accept="image/jpeg, image/png, image/webp" onChange={handleImageUpload} />
                    </label>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-gray-300 rounded-sm hover:border-black hover:bg-gray-50 transition-colors cursor-pointer relative">
                  {isUploadingImage ? (
                    <div className="flex flex-col items-center">
                      <svg className="animate-spin h-6 w-6 text-black mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-sm text-gray-500">Uploading...</span>
                    </div>
                  ) : (
                    <>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <span className="font-sans text-sm text-gray-500">
                        {isParentMode ? 'Click to upload cover image' : 'Click to upload sub-category image'}
                      </span>
                      <span className="font-sans text-xs text-gray-400 mt-1">JPEG, PNG, WEBP (Max 2MB)</span>
                    </>
                  )}
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/jpeg, image/png, image/webp" 
                    onChange={handleImageUpload} 
                    disabled={isUploadingImage}
                  />
                </label>
              )}
              {uploadError && <p className="mt-2 text-red-500 text-xs">{uploadError}</p>}
            </div>
          </form>
        </div>

        <div className="flex items-center justify-end px-6 py-4 border-t border-gray-100 gap-3 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 font-sans text-xs font-semibold tracking-[0.08em] uppercase text-gray-600 hover:text-black hover:bg-gray-200 transition-colors rounded-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="category-form"
            className="px-5 py-2.5 font-sans text-xs font-semibold tracking-[0.08em] uppercase bg-black text-white hover:bg-gray-800 transition-colors rounded-sm"
          >
            {isParentMode ? 'Save Category' : 'Save Sub-Category'}
          </button>
        </div>
      </div>
    </div>
  )
}