'use client'

import Link from 'next/link'
import type { Category } from '@/types/category'

type CatalogTabsProps = {
  parentCategories: Category[]
  activeId: string
}

export default function CatalogTabs({ parentCategories, activeId }: CatalogTabsProps) {
  return (
    <div className="sticky top-14 z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-0 overflow-x-auto no-scrollbar">
          <Link
            href="/catalog"
            className={
              activeId === 'all'
                ? 'font-sans text-[10px] tracking-[0.15em] uppercase px-5 py-4 border-b-2 border-black text-black font-semibold whitespace-nowrap'
                : 'font-sans text-[10px] tracking-[0.15em] uppercase px-5 py-4 border-b-2 border-transparent text-gray-400 hover:text-black transition-colors whitespace-nowrap'
            }
          >
            ALL EQUIPMENT
          </Link>
          {parentCategories.map((category) => (
            <Link
              key={category.id}
              href={`/catalog/${category.id}`}
              className={
                activeId === category.id
                  ? 'font-sans text-[10px] tracking-[0.15em] uppercase px-5 py-4 border-b-2 border-black text-black font-semibold whitespace-nowrap'
                  : 'font-sans text-[10px] tracking-[0.15em] uppercase px-5 py-4 border-b-2 border-transparent text-gray-400 hover:text-black transition-colors whitespace-nowrap'
              }
            >
              {category.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0 ml-6">
          <input
            type="search"
            placeholder="SEARCH CATALOG..."
            className="font-sans text-[10px] tracking-wide placeholder-gray-400 text-black border-l border-gray-200 px-4 py-4 focus:outline-none w-44"
          />
          <button className="font-sans text-[10px] tracking-[0.15em] uppercase text-gray-500 hover:text-black transition-colors px-2">
            FILTERS
          </button>
        </div>
      </div>
    </div>
  )
}
