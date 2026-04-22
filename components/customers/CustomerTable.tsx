import React from 'react'
import CustomerActionsMenu from '@/components/customers/CustomerActionsMenu'
import type { Customer } from '@/types/customer'

type CustomerTableProps = {
  customers: Customer[]
  onEdit: (customer: Customer) => void
  onDelete: (customer: Customer) => void
  onView: (customer: Customer) => void
}

function formatShortId(id: string) {
  return id.slice(0, 8)
}

function formatLocation(customer: Customer) {
  return [customer.city, customer.country].filter(Boolean).join(', ')
}

export default function CustomerTable({ customers, onEdit, onDelete, onView }: CustomerTableProps) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-100">
          {['ID', 'Name & Company', 'Location', 'Contact', 'Type', 'Orders', 'Actions'].map((col) => (
            <th key={col} className="px-6 py-3 text-left font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 font-normal">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {customers.length === 0 ? (
          <tr>
            <td colSpan={7} className="px-6 py-10 text-center">
              <p className="font-serif text-base text-black">No customers found</p>
              <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-gray-400 mt-1">
                Try a different search query.
              </p>
            </td>
          </tr>
        ) : (
          customers.map((customer) => (
            <tr
              key={customer.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
              tabIndex={0}
              onClick={() => onView(customer)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  onView(customer)
                }
              }}
            >
              <td className="px-6 py-4 font-mono text-[11px] text-gray-400">{formatShortId(customer.id)}</td>

              <td className="px-6 py-4">
                <p className="font-sans text-xs font-semibold text-black">{customer.name}</p>
                <p className="font-sans text-[10px] text-gray-400 mt-0.5">{customer.companyName || '-'}</p>
              </td>

              <td className="px-6 py-4">
                <p className="font-sans text-[10px] text-gray-600">{formatLocation(customer) || '-'}</p>
              </td>

              <td className="px-6 py-4">
                {customer.contact?.whatsapp && (
                  <p className="font-sans text-[10px] text-gray-600 mb-0.5">WA: {customer.contact.whatsapp}</p>
                )}
                {customer.contact?.wechat && (
                  <p className="font-sans text-[10px] text-gray-600 mb-0.5">WeChat: {customer.contact.wechat}</p>
                )}
                {customer.contact?.email && (
                  <p className="font-sans text-[10px] text-gray-600">Email: {customer.contact.email}</p>
                )}
                {(!customer.contact?.whatsapp && !customer.contact?.wechat && !customer.contact?.email) && (
                  <p className="font-sans text-[10px] text-gray-400">-</p>
                )}
              </td>

              <td className="px-6 py-4">
                {customer.customerType ? (
                   <span className="inline-flex items-center border border-gray-200 bg-gray-50 px-2.5 py-1 font-sans text-[9px] font-semibold tracking-[0.12em] uppercase text-gray-500">
                     {customer.customerType}
                   </span>
                ) : '-'}
              </td>

              <td className="px-6 py-4 font-sans text-xs text-black font-medium">{customer.ordersCount}</td>

              <td className="px-6 py-4" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                <CustomerActionsMenu customer={customer} onEdit={onEdit} onDelete={onDelete} />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}