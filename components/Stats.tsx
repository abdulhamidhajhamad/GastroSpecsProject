import { stats, type StatIcon } from '@/lib/home-data'

function renderStatIcon(icon: StatIcon) {
  switch (icon) {
    case 'coverage':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <circle cx="14" cy="14" r="12" stroke="#000" strokeWidth="1.5" />
          <ellipse cx="14" cy="14" rx="5.5" ry="12" stroke="#000" strokeWidth="1.5" />
          <line x1="2" y1="14" x2="26" y2="14" stroke="#000" strokeWidth="1.5" />
          <line x1="4" y1="8" x2="24" y2="8" stroke="#000" strokeWidth="1.2" />
          <line x1="4" y1="20" x2="24" y2="20" stroke="#000" strokeWidth="1.2" />
        </svg>
      )
    case 'awards':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path
            d="M14 3L17.09 9.26L24 10.27L19 15.14L20.18 22.02L14 18.77L7.82 22.02L9 15.14L4 10.27L10.91 9.26L14 3Z"
            stroke="#000"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M9 24h10" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'items':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <rect x="5" y="10" width="18" height="14" rx="1" stroke="#000" strokeWidth="1.5" />
          <path d="M9 10V7a5 5 0 0 1 10 0v3" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M10 16h8M10 19h5" stroke="#000" strokeWidth="1.2" strokeLinecap="round" />
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
              className="flex items-center justify-center gap-4 py-7 px-6"
            >
              <div className="shrink-0">{renderStatIcon(stat.icon)}</div>
              <div>
                <p className="font-sans text-xl font-semibold text-black leading-none mb-1">
                  {stat.value}
                </p>
                <p className="font-sans text-xs text-gray-500 tracking-wide">
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
