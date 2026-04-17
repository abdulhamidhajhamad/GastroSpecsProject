export type ProductCategory =
  | 'cooking'
  | 'refrigeration'
  | 'food-prep'
  | 'dishwashing'
  | 'storage'

export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  slug: string
  brand: string
  name: string
  category: ProductCategory
  tags: string[]
  image: string
  price: string
  priceHigh?: string
  description: string
  specs: ProductSpec[]
  certifications: string[]
  leadTime: string
  inStock: boolean
  related?: string[]
}

export interface ProductCategoryOption {
  id: 'all' | ProductCategory
  label: string
}
