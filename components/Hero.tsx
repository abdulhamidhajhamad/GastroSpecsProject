import Image from 'next/image'
import Link from 'next/link'

import { heroContent } from '@/lib/home-data'

export default function Hero() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1fr] min-h-[580px]">

          <div className="flex flex-col justify-center px-6 py-16 lg:py-20 lg:pr-16 xl:pr-24">
            <div className="mb-7">
              <span className="inline-block border border-black text-black font-sans text-[10px] font-medium tracking-[0.2em] uppercase px-2.5 py-1">
                {heroContent.badge}
              </span>
            </div>

            <h1 className="font-serif text-[2.6rem] md:text-5xl lg:text-[3.2rem] leading-[1.1] tracking-tight text-black mb-5 text-balance">
              {heroContent.headingPrefix}{' '}
              <em className="italic">{heroContent.headingEmphasis}</em>{' '}
              {heroContent.headingSuffix}
            </h1>

            <p className="font-sans text-sm text-gray-500 leading-relaxed mb-9 max-w-sm">
              {heroContent.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={heroContent.primaryCta.href}
                className="bg-black text-white font-sans text-xs font-medium tracking-wide px-7 py-3 text-center hover:bg-gray-800 transition-colors"
              >
                {heroContent.primaryCta.label}
              </Link>
              <Link
                href={heroContent.secondaryCta.href}
                className="border border-black text-black font-sans text-xs font-medium tracking-wide px-7 py-3 text-center hover:bg-gray-50 transition-colors"
              >
                {heroContent.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="relative bg-[#e8e8e8] min-h-[380px] lg:min-h-full flex items-center justify-center">
            <Image
              src={heroContent.image.src}
              alt={heroContent.image.alt}
              width={heroContent.image.width}
              height={heroContent.image.height}
              className="object-contain w-full h-auto p-4"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  )
}
