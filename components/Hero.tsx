import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="bg-gastro-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          {/* Left Content */}
          <div className="flex flex-col justify-center px-6 py-12 lg:py-20 lg:pr-12">
            {/* Badge */}
            <div className="mb-8">
              <span className="inline-block bg-gastro-black text-gastro-white text-xs font-medium px-3 py-1.5 tracking-wide">
                HEAVY DUTY MADE
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              Engineering{" "}
              <em className="not-italic font-serif italic">Excellence</em> in
              <br />
              Every <span className="font-bold">Kitchen</span>.
            </h1>

            {/* Subtext */}
            <p className="text-gray-600 text-base mb-8 max-w-md">
              Global leaders in commercial kitchen
              <br />
              procurement and engineering services.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/catalog"
                className="bg-gastro-black text-gastro-white text-sm font-medium px-8 py-3 text-center hover:bg-gray-800 transition-colors"
              >
                Browse Catalog
              </Link>
              <Link
                href="/services"
                className="border border-gastro-black text-gastro-black text-sm font-medium px-8 py-3 text-center hover:bg-gray-50 transition-colors"
              >
                Our Services
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative bg-gastro-grey min-h-[400px] lg:min-h-full">
            <Image
              src="/assets/hero_kitchen_pano.png"
              alt="Professional commercial kitchen with stainless steel equipment"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
