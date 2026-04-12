const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="8" stroke="#000" strokeWidth="1.4" />
    <ellipse cx="9" cy="9" rx="3.5" ry="8" stroke="#000" strokeWidth="1.4" />
    <line x1="1" y1="9" x2="17" y2="9" stroke="#000" strokeWidth="1.2" />
    <line x1="2.5" y1="5" x2="15.5" y2="5" stroke="#000" strokeWidth="1" />
    <line x1="2.5" y1="13" x2="15.5" y2="13" stroke="#000" strokeWidth="1" />
  </svg>
)

const TruckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <rect x="1" y="5" width="11" height="9" rx="1" stroke="#000" strokeWidth="1.4" />
    <path d="M12 8h3l2 3v3h-5V8Z" stroke="#000" strokeWidth="1.4" strokeLinejoin="round" />
    <circle cx="4.5" cy="14.5" r="1.5" stroke="#000" strokeWidth="1.2" />
    <circle cx="13.5" cy="14.5" r="1.5" stroke="#000" strokeWidth="1.2" />
  </svg>
)

const WrenchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M14.5 1a4 4 0 0 0-4 4c0 .4.05.78.14 1.15L2 14.77 3.23 16l8.62-8.64c.37.09.75.14 1.15.14a4 4 0 1 0 0-8Z" stroke="#000" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const solutions = [
  {
    Icon: GlobeIcon,
    number: "01",
    title: "GLOBAL SOURCING",
    description:
      "Global leaders in commercial kitchen procurement and engineering services.",
  },
  {
    Icon: TruckIcon,
    number: "02",
    title: "DDP LOGISTICS",
    description:
      "Turnkey and door-paid shipping directly to anywhere in the world.",
  },
  {
    Icon: WrenchIcon,
    number: "03",
    title: "KITCHEN ENGINEERING",
    description:
      "Kitchen and pure engineering directly to our engineering services.",
  },
]

export default function Solutions() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-[2.2rem] text-black mb-3">
            End-to-End Solutions
          </h2>
          <div className="w-14 h-px bg-gray-300 mx-auto" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {solutions.map(({ Icon, number, title, description }, index) => (
            <div key={index} className="bg-[#F5F5F5] p-8">
              {/* Card header row */}
              <div className="flex items-center gap-2.5 mb-4">
                <Icon />
                <span className="font-sans text-[11px] font-semibold tracking-[0.12em] text-black uppercase">
                  {number} | {title}
                </span>
              </div>
              {/* Description */}
              <p className="font-sans text-sm text-gray-500 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
