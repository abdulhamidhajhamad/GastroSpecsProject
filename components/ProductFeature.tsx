import Image from 'next/image'
import Link from 'next/link'

import { featuredProduct } from '@/lib/home-data'

export default function ProductFeature() {
  return (
    <section className="py-0 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2">

          <div className="bg-white flex items-center justify-center py-12 px-8 lg:py-16 lg:px-12">
            <Image
              src={featuredProduct.image.src}
              alt={featuredProduct.image.alt}
              width={featuredProduct.image.width}
              height={featuredProduct.image.height}
              className="w-full h-auto object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="bg-white flex flex-col justify-center py-12 px-8 lg:py-16 lg:px-16 border-l border-gray-100">
            <p className="font-sans text-[10px] tracking-[0.25em] text-gray-400 uppercase mb-3">
              {featuredProduct.category}
            </p>

            <h3 className="font-serif text-3xl md:text-4xl text-black mb-7 text-balance">
              {featuredProduct.title}
            </h3>

            <div className="flex flex-wrap gap-2.5 mb-8">
              {featuredProduct.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-sans text-xs text-black border border-gray-300 px-3.5 py-1.5 tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href={featuredProduct.href}
              className="inline-flex items-center gap-2 font-sans text-sm font-medium text-black group"
            >
              <span className="border-b border-black pb-px group-hover:border-gray-500 group-hover:text-gray-500 transition-colors">
                {featuredProduct.ctaLabel}
              </span>
              <span className="text-base leading-none group-hover:translate-x-0.5 transition-transform">
                &rarr;
              </span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
