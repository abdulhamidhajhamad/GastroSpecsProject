// Matches MachineSupplier junction table
export interface MachineSupplier {
  id: string
  machineId: string
  supplierId: string
  supplierName: string   // joined from Supplier
  costPrice: number
  moq: number
  leadTimeDays?: number
  modelNumber?: string
  qualityNotes?: string
  createdAt: string
}

// Matches MachineImage (for UI, no DB table yet)
export interface MachineImage {
  id: string
  machineId: string
  url: string
  isPrimary: boolean
  order: number
}

// Matches Machine table
export interface Machine {
  id: string
  categoryId: string
  categoryName: string
  name: string
  modelNumber?: string
  costPrice?: number
  moq?: number
  leadTimeDays?: number
  supplierId?: string
  supplierName?: string
  specifications: Record<string, string>
  notes?: string
  images: MachineImage[]
  machineSuppliers: MachineSupplier[]
  createdAt: string
}

// For the Add Machine form (Step 1 only — no suppliers yet)
export interface MachineFormData {
  name: string
  categoryId: string
  specifications: { key: string; value: string }[]
  notes: string
}

// For Add Supplier to Machine form (Step 3)
export interface MachineSupplierFormData {
  supplierId: string
  costPrice: number | ''
  moq: number | ''
  leadTimeDays: number | ''
  modelNumber: string
  qualityNotes: string
}
