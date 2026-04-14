import Link from 'next/link'

type Props = {
  searchPlaceholder?: string
}

export default function PortalHeader({ searchPlaceholder = 'Search portal...' }: Props) {
  return (
    <div className="h-12 border-b border-gray-200 bg-white flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-2">
        <button type="button" className="flex items-center gap-1 text-xs text-gray-500 hover:text-black transition-colors">
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.4" />
            <ellipse cx="9" cy="9" rx="3.5" ry="8" stroke="currentColor" strokeWidth="1.4" />
            <line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <span className="tracking-wide">العربية</span>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 w-52">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="search"
            placeholder={searchPlaceholder}
            className="bg-transparent font-sans text-xs text-black placeholder-gray-400 focus:outline-none w-full"
          />
        </div>

        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
          <span className="font-sans text-xs font-bold text-gray-600">JV</span>
        </div>
      </div>
    </div>
  )
}
