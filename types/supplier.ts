export interface SupplierLocation {
  city: string
  province: string
  district?: string
  street?: string
}

export interface SupplierContact {
  id: string
  supplierId: string
  name: string
  position?: string
  contactMethods: string
  notes?: string
  createdAt: string
}

export interface Supplier {
  id: string
  companyName: string
  location: SupplierLocation
  website?: string
  wechat?: string
  email?: string
  phone?: string
  isDdpPartner: boolean
  notes?: string
  contacts: SupplierContact[]
  machineCount: number
  createdAt: string
}
