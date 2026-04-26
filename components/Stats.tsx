import { stats, type StatIcon } from '@/lib/home-data'

function renderStatIcon(icon: StatIcon) {
  const svgProps = {
    width: "32",
    height: "32",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#000",
    strokeWidth: "1.5",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  }

  switch (icon) {
    case 'coverage':
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    case 'awards':
      return (
        <svg {...svgProps}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )
    case 'items':
      return (
        <svg {...svgProps}>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.29 7 12 12 20.71 7" />
          <line x1="12" y1="22" x2="12" y2="12" />
        </svg>
      )
    default:
      return null
  }
}

export default function Stats() {
  return (
    <section className="border-y border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 divide-x divide-gray-200">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-row items-center justify-center gap-5 py-8 px-6"
            >
              <div className="flex items-center justify-center text-black shrink-0">
                {renderStatIcon(stat.icon)}
              </div>
              <div className="flex flex-col justify-center">
                <p className="font-sans text-[22px] font-semibold text-black leading-tight">
                  {stat.value}
                </p>
                <p className="font-sans text-[13px] text-gray-500 tracking-wide font-medium mt-[2px] leading-tight">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
