import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"

const catalogLinks = [
  { label: "Heavy Cooking", href: "/catalog/heavy-cooking" },
  { label: "Refrigeration", href: "/catalog/refrigeration" },
  { label: "Food Prep", href: "/catalog/food-prep" },
  { label: "Dishwashing", href: "/catalog/dishwashing" },
]

const servicesLinks = [
  { label: "Kitchen Design", href: "/services/kitchen-design" },
  { label: "Sourcing", href: "/services/sourcing" },
  { label: "DDP Logistics", href: "/services/ddp-logistics" },
  { label: "After Sales", href: "/services/after-sales" },
]

export default function Footer() {
  return (
    <footer className="bg-gastro-black text-gastro-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 border-2 border-gastro-white rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-gastro-white rounded-full" />
              </div>
              <span className="font-semibold text-sm tracking-tight">GASTROSPECS</span>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Global leaders in commercial kitchen
              procurement and engineering services.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-gray-400 hover:text-gastro-white transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gastro-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gastro-white transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Catalog Column */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-6">
              Catalog
            </h4>
            <ul className="space-y-3">
              {catalogLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-gastro-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {servicesLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-gastro-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-6">
              Newsletter
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Stay updated with industry trends.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 bg-transparent border border-gray-600 text-sm px-4 py-2 text-gastro-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
              />
              <button
                type="submit"
                className="bg-gastro-white text-gastro-black px-4 py-2 text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                →
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              © 2024 GASTROSPECS. WORLDWIDE ORIGINAL.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
                PRIVACY POLICY
              </Link>
              <Link href="/terms" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
                TERMS OF SERVICE
              </Link>
              <Link href="/contact" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
                CONTACT SALES
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
