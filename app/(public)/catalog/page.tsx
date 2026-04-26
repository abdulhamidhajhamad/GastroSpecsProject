import type { Category } from '@/types/category'
import CategoryCard from '@/components/catalog/CategoryCard'
import CatalogTabs from '@/components/catalog/CatalogTabs'

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      cache: 'no-store',
    })
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

export default async function CatalogPage() {
  const allCategories = await getCategories()
  const parentCategories = allCategories.filter((c) => c.parentId === null)

  const totalMachines = parentCategories.reduce(
    (sum, c) => sum + c.children.reduce((s, sub) => s + (sub.machineCount ?? 0), 0),
    0
  )
  const totalBrands = parentCategories.length

  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-4">
                PRODUCTS - CATALOG
              </p>
              <h1 className="font-sans font-black text-[clamp(2.5rem,6vw,5rem)] tracking-tight text-black uppercase leading-none">
                ALL EQUIPMENT
              </h1>
              <p className="font-sans text-sm text-gray-500 leading-relaxed max-w-lg mt-4">
                Browse our complete catalog of professional-grade commercial kitchen
                and butchery equipment. Sourced directly from verified global manufacturers.
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-sans text-xs tracking-[0.15em] text-gray-400 uppercase">
                <span className="font-bold text-black text-2xl">{totalMachines}</span>
                {' '}PRODUCTS
                <span className="font-bold text-black text-2xl ml-4">{totalBrands}</span>
                {' '}BRANDS
              </p>
            </div>
          </div>
        </div>
      </section>

      <CatalogTabs parentCategories={parentCategories} activeId="all" />

      <section className="bg-[#111111]">
        {parentCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-800">
            {parentCategories.map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                description={category.description}
                imageUrl={category.imageUrl}
                href={`/catalog/${category.id}`}
                badge={`${category.children.length} Sub-Categories`}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-24">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/30">
              No categories available
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
