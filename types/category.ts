export interface SubCategory {
  id: string
  name: string
  parentId: string
  machineCount: number
  createdAt: string
  imageUrl?: string
}

export interface Category {
  id: string
  name: string
  description?: string
  imageUrl?: string        
  parentId: string | null
  children: SubCategory[]
  createdAt: string
}

export interface CategoryDetail extends Category {
  machines: {
    id: string
    name: string
    image?: string
    specifications: Record<string, string>
    suppliersCount: number
    categoryName: string
  }[]
  suppliers: {
    id: string
    companyName: string
    isDdpPartner: boolean
    location: { province: string; city: string; district?: string }
    phone?: string
    wechat?: string
    machineCount: number
  }[]
}

export interface CategoryFormData {
  name: string
  description: string
  imageUrl: string
  parentId: string | null
}

export interface SubCategoryFormData {
  name: string
  parentId: string
  imageUrl: string
}