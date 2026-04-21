import type { Supplier } from '@/types/supplier'

type SupplierDetailOverviewProps = {
  supplier: Supplier
}

function formatCreatedAt(value: string) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatLocation(supplier: Supplier) {
  return [supplier.location.street, supplier.location.district, supplier.location.city, supplier.location.province]
    .filter(Boolean)
    .join(', ')
}

export default function SupplierDetailOverview({ supplier }: SupplierDetailOverviewProps) {
  return (
    <div className="border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
            <path d="M3 21h18" />
            <path d="M5 21V7l7-4 7 4v14" />
            <path d="M9 10h6" />
            <path d="M9 14h6" />
          </svg>
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">Company Overview</span>
        </div>
        <span
          className={`inline-flex items-center border px-2.5 py-1 font-sans text-[9px] font-semibold tracking-[0.12em] uppercase ${supplier.isDdpPartner ? 'border-green-200 bg-green-50 text-green-600' : 'border-gray-200 bg-gray-50 text-gray-500'}`}
        >
          {supplier.isDdpPartner ? 'DDP Partner' : 'Standard Supplier'}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
        <div>
          <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-1">Supplier ID</p>
          <p className="font-mono text-xs text-gray-500">{supplier.id}</p>
        </div>

        <div>
          <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-1">Created At</p>
          <p className="font-sans text-xs text-gray-600">{formatCreatedAt(supplier.createdAt)}</p>
        </div>

        <div className="md:col-span-2">
          <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-1">Company Name</p>
          <p className="font-sans text-sm font-semibold text-black">{supplier.companyName}</p>
        </div>

        <div className="md:col-span-2">
          <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-1">Location</p>
          <p className="font-sans text-xs text-gray-600">{formatLocation(supplier) || '-'}</p>
        </div>

        <div>
          <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-1">Email</p>
          <p className="font-sans text-xs text-gray-600">{supplier.email || '-'}</p>
        </div>

        <div>
          <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-1">Phone</p>
          <p className="font-sans text-xs text-gray-600">{supplier.phone || '-'}</p>
        </div>

        <div>
          <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-1">Website</p>
          <p className="font-sans text-xs text-gray-600 break-all">{supplier.website || '-'}</p>
        </div>

        <div>
          <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-1">WeChat</p>
          <p className="font-sans text-xs text-gray-600">{supplier.wechat || '-'}</p>
        </div>

        <div className="md:col-span-2">
          <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-1">Notes</p>
          <p className="font-sans text-xs text-gray-500 leading-relaxed">{supplier.notes || '-'}</p>
        </div>
      </div>
    </div>
  )
}