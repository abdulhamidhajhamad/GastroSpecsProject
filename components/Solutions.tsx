import { Globe2, Truck, Wrench } from "lucide-react"

const solutions = [
  {
    number: "01",
    icon: Globe2,
    title: "GLOBAL SOURCING",
    description: "Global leaders in commercial kitchen procurement and engineering services.",
  },
  {
    number: "02",
    icon: Truck,
    title: "DDP LOGISTICS",
    description: "Turnkey and door-paid shipping directly to anywhere in the world.",
  },
  {
    number: "03",
    icon: Wrench,
    title: "KITCHEN ENGINEERING",
    description: "Kitchen and pure engineering directly to our engineering services.",
  },
]

export default function Solutions() {
  return (
    <section className="py-20 bg-gastro-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-gastro-black mb-4">
            End-to-End Solutions
          </h2>
          <div className="w-16 h-px bg-gray-300 mx-auto" />
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="bg-gastro-grey p-8 text-center"
            >
              {/* Icon and Number */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <solution.icon className="w-5 h-5 text-gastro-black" strokeWidth={1.5} />
                <span className="text-sm font-medium text-gastro-black">
                  {solution.number} | {solution.title}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
