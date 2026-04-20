import Link from 'next/link'
import PortalHeader from '@/components/portal/PortalHeader'

type SupplierLocation = {
  country: string
  province: string
  city: string
  district: string
  street: string
}

type SupplierContact = {
  name: string
  role: string
}

type Supplier = {
  id: string
  companyName: string
  location: SupplierLocation
  website: string
  wechat: string
  email: string
  phone: string
  isDdpPartner: boolean
  notes: string
  machines: string[]
  contacts: SupplierContact[]
}

const supplierStats = [
  { label: 'TOTAL SUPPLIERS', value: '58', trend: '+6%', trendUp: true },
  { label: 'DDP PARTNERS', value: '21', trend: '+3', trendUp: true },
  { label: 'ACTIVE MACHINES', value: '146', trend: '+11%', trendUp: true },
  { label: 'NEW THIS MONTH', value: '05', trend: '-1', trendUp: false },
]

const suppliers: Supplier[] = [
  {
    id: 'SUP-7A2',
    companyName: 'Guangzhou Frostline Refrigeration Tech Co., Ltd.',
    location: {
      country: 'China',
      province: 'Guangdong',
      city: 'Guangzhou',
      district: 'Baiyun',
      street: 'No. 88 Yunshan Industrial Road',
    },
    website: 'https://frostline-gz.com',
    wechat: 'FROSTLINE_GZ',
    email: 'sales@frostline-gz.com',
    phone: '+86 20 8891 2348',
    isDdpPartner: true,
    notes: 'Core partner for supermarket and cold room lines.',
    machines: ['Walk-In Freezer', 'Display Chiller', 'Blast Chiller', 'Island Freezer'],
    contacts: [{ name: 'Lin Wei', role: 'Export Manager' }],
  },
  {
    id: 'SUP-2D9',
    companyName: 'Shandong Huaxin Commercial Kitchen Equipment',
    location: {
      country: 'China',
      province: 'Shandong',
      city: 'Binzhou',
      district: 'Boxing',
      street: 'No. 16 Xingfu Stainless Avenue',
    },
    website: 'https://huaxinkitchen.cn',
    wechat: 'HXKITCHEN_BX',
    email: 'intl@huaxinkitchen.cn',
    phone: '+86 543 786 4201',
    isDdpPartner: true,
    notes: 'Specialized in heavy cooking blocks and custom stainless fabrication.',
    machines: ['6-Burner Range', 'Griddle Plate', 'Stock Pot Range', 'Work Table', 'Sink Unit'],
    contacts: [{ name: 'Zhao Ming', role: 'Factory Sales Lead' }],
  },
  {
    id: 'SUP-4F1',
    companyName: 'Ningbo BlueWave Food Service Systems',
    location: {
      country: 'China',
      province: 'Zhejiang',
      city: 'Ningbo',
      district: 'Yinzhou',
      street: 'No. 27 Jinhai South Road',
    },
    website: 'https://bluewave-fs.com',
    wechat: 'BLUEWAVE_NB',
    email: 'export@bluewave-fs.com',
    phone: '+86 574 8330 9156',
    isDdpPartner: false,
    notes: 'Reliable OEM line for prep and snack equipment.',
    machines: ['Planetary Mixer', 'Dough Sheeter', 'Food Processor'],
    contacts: [{ name: 'Ivy Chen', role: 'Overseas Coordinator' }],
  },
  {
    id: 'SUP-8K5',
    companyName: 'Foshan Titan Heat Solutions Co., Ltd.',
    location: {
      country: 'China',
      province: 'Guangdong',
      city: 'Foshan',
      district: 'Nanhai',
      street: 'No. 109 Guangfo Equipment Street',
    },
    website: 'https://titanheat.cn',
    wechat: 'TITANHEAT_FS',
    email: 'projects@titanheat.cn',
    phone: '+86 757 8667 5502',
    isDdpPartner: true,
    notes: 'Primary source for combi ovens and thermal processing lines.',
    machines: ['Combi Oven', 'Deck Oven', 'Proofing Cabinet', 'Holding Cabinet', 'Convection Oven'],
    contacts: [{ name: 'Kevin Luo', role: 'Key Account Director' }],
  },
  {
    id: 'SUP-3P8',
    companyName: 'Suzhou MetroPack Display & Serving Tech',
    location: {
      country: 'China',
      province: 'Jiangsu',
      city: 'Suzhou',
      district: 'Wuzhong',
      street: 'No. 55 Taihu Display Park Road',
    },
    website: 'https://metropack-tech.com',
    wechat: 'METROPACK_SZ',
    email: 'bd@metropack-tech.com',
    phone: '+86 512 6818 7740',
    isDdpPartner: false,
    notes: 'Focused on bakery showcases and hot/cold service counters.',
    machines: ['Bakery Showcase', 'Gelato Display', 'Hot Bain Marie', 'Cold Salad Bar'],
    contacts: [{ name: 'Ada Sun', role: 'Business Development' }],
  },
]

const feed = [
  {
    name: 'Lin Wei',
    time: '9M AGO',
    message: 'Uploaded revised DDP quote for Frostline batch FS-110 (reefers + spare compressors).',
  },
  {
    name: 'Kevin Luo',
    time: '31M AGO',
    message: 'Confirmed production slot for 12 combi ovens. ETD Ningbo moved to May 03.',
  },
  {
    name: 'Ivy Chen',
    time: '1H AGO',
    message: 'Sent updated electrical spec sheet for BlueWave prep line (EU + GCC compliance).',
  },
  {
    name: 'System Automator',
    time: '4H AGO',
    message: 'Supplier performance scorecard generated and shared with procurement leadership.',
  },
]

export default function SuppliersPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <PortalHeader />
      <div className="flex-1 p-8 bg-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-sans font-bold text-xl tracking-[0.08em] uppercase text-black">Suppliers / Factories</h1>
            <p className="font-sans text-xs text-gray-400 mt-1">Manage your manufacturing partners</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="border border-gray-200 font-sans text-xs tracking-wide text-gray-500 px-4 py-2 hover:border-black hover:text-black transition-colors flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Export Report
            </button>
            <Link
              href="/portal/suppliers/new"
              className="bg-black text-white font-sans text-xs tracking-wide px-4 py-2 hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              + Add Supplier
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 mb-8">
          {supplierStats.map((stat) => (
            <div key={stat.label} className="bg-white p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-5 h-5 text-gray-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                  </svg>
                </div>
                <span className={`font-sans text-[9px] tracking-wide ${stat.trendUp ? 'text-green-600' : 'text-red-500'}`}>
                  {stat.trendUp ? '↑' : '↓'} {stat.trend}
                </span>
              </div>
              <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-1">{stat.label}</p>
              <p className="font-serif text-3xl font-bold text-black">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="border border-gray-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">Suppliers Overview</span>
              </div>
              <a href="/portal/suppliers" className="font-sans text-[10px] text-gray-400 hover:text-black transition-colors">View All</a>
            </div>

            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {['ID', 'Company & Location', 'Contact', 'DDP Partner', 'Machines Count', 'Actions'].map((col) => (
                    <th key={col} className="px-6 py-3 text-left font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 font-normal">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier) => (
                  <tr key={supplier.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-[11px] text-gray-400 uppercase">{supplier.id}</td>
                    <td className="px-6 py-4">
                      <p className="font-sans text-xs font-semibold text-black">{supplier.companyName}</p>
                      <p className="font-sans text-[10px] text-gray-500 mt-0.5">{supplier.location.street}</p>
                      <p className="font-sans text-[10px] text-gray-400 mt-0.5">
                        {supplier.location.district}, {supplier.location.city}, {supplier.location.province}, {supplier.location.country}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-sans text-xs text-black">{supplier.phone}</p>
                      <p className="font-sans text-[10px] uppercase tracking-wide text-gray-400 mt-0.5">WeChat: {supplier.wechat}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center border px-2.5 py-1 font-sans text-[9px] font-semibold tracking-[0.12em] uppercase ${supplier.isDdpPartner ? 'border-green-200 bg-green-50 text-green-600' : 'border-gray-200 bg-gray-50 text-gray-500'}`}
                      >
                        {supplier.isDdpPartner ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-sans text-xs text-black font-medium">{supplier.machines.length}</td>
                    <td className="px-6 py-4">
                      <button className="w-7 h-7 border border-gray-200 font-sans text-sm text-gray-400 hover:border-black hover:text-black transition-colors">
                        ...
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border border-gray-200">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-200">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">Live System Feed</span>
            </div>
            <div className="p-5 space-y-5">
              {feed.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <span className="font-sans text-[8px] font-bold text-gray-500">
                      {item.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-sans text-[10px] font-semibold text-black uppercase tracking-wide">{item.name}</span>
                      <span className="font-sans text-[9px] text-gray-300">{item.time}</span>
                    </div>
                    <p className="font-sans text-[10px] text-gray-500 leading-relaxed">{item.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 pb-5">
              <button className="w-full border border-gray-200 font-sans text-[10px] tracking-[0.15em] uppercase text-gray-400 py-2.5 hover:border-black hover:text-black transition-colors">
                View Complete Audit Log
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-3 border-t border-gray-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="font-sans text-[10px] uppercase tracking-wide text-gray-500">System Operational</span>
        </div>
        <div className="flex items-center gap-6">
          <p className="font-sans text-[9px] text-gray-400">© 2024 GASTROSPECS OPERATIONS. ALL RIGHTS RESERVED.</p>
          {['Terms', 'Privacy'].map((item) => (
            <a key={item} href="#" className="font-sans text-[9px] text-gray-400 hover:text-black transition-colors uppercase tracking-wide">
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}