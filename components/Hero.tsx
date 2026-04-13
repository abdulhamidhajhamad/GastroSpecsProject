import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1fr] min-h-[580px]">

          {/* Left: Text */}
          <div className="flex flex-col justify-center px-6 py-16 lg:py-20 lg:pr-16 xl:pr-24">
            {/* Badge */}
            <div className="mb-7">
              <span className="inline-block border border-black text-black font-sans text-[10px] font-medium tracking-[0.2em] uppercase px-2.5 py-1">
                Heavy Site M&amp;R
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-serif text-[2.6rem] md:text-5xl lg:text-[3.2rem] leading-[1.1] tracking-tight text-black mb-5 text-balance">
              Engineering{" "}
              <em className="italic">Excellence</em> in
              <br />
              Every <strong className="font-bold not-italic">Kitchen.</strong>
            </h1>

            {/* Body */}
            <p className="font-sans text-sm text-gray-500 leading-relaxed mb-9 max-w-xs">
              Global leaders in commercial kitchen
              <br />
              procurement and engineering services.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/catalog"
                className="bg-black text-white font-sans text-xs font-medium tracking-wide px-7 py-3 text-center hover:bg-gray-800 transition-colors"
              >
                Browse Catalog
              </Link>
              <Link
                href="/services"
                className="border border-black text-black font-sans text-xs font-medium tracking-wide px-7 py-3 text-center hover:bg-gray-50 transition-colors"
              >
                Our Services
              </Link>
            </div>
          </div>

          {/* Right: Full-bleed image */}
          <div className="relative bg-[#e8e8e8] min-h-[380px] lg:min-h-full flex items-center justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WV39fEVymwsuGLVHW1reHROlk5K7qi.png"
              alt="Vulcan Master Series modular commercial kitchen equipment"
              width={640}
              height={400}
              className="object-contain w-full h-auto p-4"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  )
}
