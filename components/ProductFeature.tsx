import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const tags = ["Dual Burner", "Modular Design", "Cast Iron"]

export default function ProductFeature() {
  return (
    <section className="py-20 bg-gastro-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="relative bg-gastro-white">
            <Image
              src="/assets/modular_equipment_hd.png"
              alt="Vulcan Master Series modular cooking equipment"
              width={600}
              height={400}
              className="object-contain w-full"
            />
          </div>

          {/* Right Content */}
          <div className="lg:pl-8">
            {/* Category Label */}
            <p className="text-xs text-gray-500 tracking-widest uppercase mb-3">
              Heavy Cooking
            </p>

            {/* Product Title */}
            <h3 className="font-serif text-3xl md:text-4xl text-gastro-black mb-6">
              Vulcan Master Series
            </h3>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-6">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="border border-gray-300 text-sm text-gastro-black px-4 py-1.5"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Link */}
            <Link
              href="/catalog/vulcan-master-series"
              className="inline-flex items-center gap-2 text-sm font-medium text-gastro-black underline underline-offset-4 hover:text-gray-600 transition-colors"
            >
              View Specifications
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
