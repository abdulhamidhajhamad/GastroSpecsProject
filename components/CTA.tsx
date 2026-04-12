import Link from "next/link"
import { MessageCircle } from "lucide-react"

export default function CTA() {
  return (
    <section className="bg-gastro-black py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="font-serif text-3xl md:text-4xl text-gastro-white mb-3">
          Ready to start your next project?
        </h2>

        {/* Subtext */}
        <p className="text-gray-400 text-sm mb-8">
          Our engineering team is standing by to provide a custom quote.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/quote"
            className="bg-gastro-white text-gastro-black text-sm font-medium px-8 py-3 hover:bg-gray-100 transition-colors"
          >
            Get a Custom Quote
          </Link>
          <Link
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-gastro-white" />
          </Link>
        </div>
      </div>
    </section>
  )
}
