import { Globe2, Award, Package } from "lucide-react"

const stats = [
  {
    icon: Globe2,
    value: "45+",
    label: "Countries Covered",
  },
  {
    icon: Award,
    value: "12",
    label: "Design Awards",
  },
  {
    icon: Package,
    value: "10k+",
    label: "Items Sourced",
  },
]

export default function Stats() {
  return (
    <section className="border-y border-gray-200 bg-gastro-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-center gap-4">
              <stat.icon className="w-6 h-6 text-gastro-black" strokeWidth={1.5} />
              <div>
                <p className="text-2xl font-semibold text-gastro-black">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
