import type { SupplierContact } from '@/types/supplier'

type SupplierContactsCardProps = {
  contacts: SupplierContact[]
}

type ParsedContactMethods = {
  phone?: string
  email?: string
  wechat?: string
}

function parseContactMethods(input: Record<string, string> | string): ParsedContactMethods {
  if (typeof input === 'object' && input !== null) {
    return {
      phone: input.phone,
      email: input.email,
      wechat: input.wechat,
    }
  }

  try {
    const parsed = JSON.parse(input)
    if (parsed && typeof parsed === 'object') {
      return parsed as ParsedContactMethods
    }
    return {}
  } catch {
    return {}
  }
}

export default function SupplierContactsCard({ contacts }: SupplierContactsCardProps) {
  return (
    <div className="border border-gray-200">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-200">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
          <circle cx="9" cy="7" r="4" />
          <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold">Supplier Contacts</span>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            {['Name', 'Position', 'Phone', 'WeChat', 'Email'].map((col) => (
              <th key={col} className="px-5 py-3 text-left font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 font-normal">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => {
            const methods = parseContactMethods(contact.contactMethods)
            return (
              <tr key={contact.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-5 py-4">
                  <p className="font-sans text-xs font-semibold text-black">{contact.name}</p>
                  {contact.notes && (
                    <p className="font-sans text-[9px] text-gray-400 leading-relaxed mt-1">{contact.notes}</p>
                  )}
                </td>
                <td className="px-5 py-4 font-sans text-[10px] uppercase tracking-wide text-gray-500">
                  {contact.position || 'Contact'}
                </td>
                <td className="px-5 py-4 font-sans text-[10px] text-gray-600">{methods.phone || '—'}</td>
                <td className="px-5 py-4 font-sans text-[10px] text-gray-600">{methods.wechat || '—'}</td>
                <td className="px-5 py-4 font-sans text-[10px] text-gray-600">{methods.email || '—'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}