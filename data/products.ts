import type { Product, ProductCategoryOption } from '@/types'

export const categories: ProductCategoryOption[] = [
  { id: 'all', label: 'ALL EQUIPMENT' },
  { id: 'cooking', label: 'COOKING' },
  { id: 'refrigeration', label: 'REFRIGERATION' },
  { id: 'food-prep', label: 'FOOD PREP' },
  { id: 'dishwashing', label: 'DISHWASHING' },
  { id: 'storage', label: 'STORAGE' },
]

export const products: Product[] = []

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}
