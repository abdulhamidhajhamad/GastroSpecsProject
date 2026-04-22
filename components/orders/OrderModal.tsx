'use client'

import * as React from 'react'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { mockCustomers } from '@/data/mockCustomers'
import { mockMachines } from '@/data/mockMachines'
import type { Order, OrderFormData } from '@/types/order'

type OrderModalProps = {
  isOpen: boolean
  order: Order | null
  onClose: () => void
}

type FormItem = OrderFormData['items'][number]
type CustomerOption = (typeof mockCustomers)[number]
type MachineOption = (typeof mockMachines)[number]

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function formatDateInput(date: Date) {
  return new Intl.DateTimeFormat('en-GB').format(date)
}

function createBlankItem(): FormItem {
  return {
    machineId: '',
    supplierId: '',
    quantity: 1,
    unitPrice: 0,
    notes: '',
  }
}

function getMachineImageUrl(machine: MachineOption) {
  return machine.images.find((image) => image.isPrimary)?.url ?? machine.images[0]?.url ?? 'https://placehold.co/600x400'
}

function useOutsideClick<T extends HTMLElement>(onClose: () => void) {
  const ref = React.useRef<T | null>(null)

  React.useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [onClose])

  return ref
}

function SearchSelect<T extends { id: string }>({
  placeholder,
  searchValue,
  setSearchValue,
  options,
  selected,
  onSelect,
  onClear,
  renderOption,
  renderSelected,
  emptyLabel,
}: {
  placeholder: string
  searchValue: string
  setSearchValue: (value: string) => void
  options: T[]
  selected: T | null
  onSelect: (option: T) => void
  onClear: () => void
  renderOption: (option: T) => React.ReactNode
  renderSelected: (option: T) => React.ReactNode
  emptyLabel: string
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const wrapperRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false))

  return (
    <div ref={wrapperRef} className="relative">
      {!selected ? (
        <input
          type="text"
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full border border-gray-200 px-3 py-2.5 font-sans text-xs text-black transition-colors focus:border-black focus:outline-none"
        />
      ) : (
        <div className="flex items-start justify-between gap-3 border border-gray-200 bg-white px-3 py-3">
          <div className="min-w-0 flex-1">{renderSelected(selected)}</div>
          <button
            type="button"
            onClick={() => {
              setSearchValue('')
              onClear()
            }}
            className="shrink-0 text-gray-400 transition-colors hover:text-black"
            aria-label="Clear selection"
          >
            ×
          </button>
        </div>
      )}

      {isOpen && !selected && searchValue.trim() && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-56 overflow-y-auto border border-gray-200 bg-white shadow-lg">
          {options.length === 0 ? (
            <div className="px-4 py-3 font-sans text-[10px] uppercase tracking-[0.15em] text-gray-400">{emptyLabel}</div>
          ) : (
            options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  onSelect(option)
                  setSearchValue('')
                  setIsOpen(false)
                }}
                className="w-full border-b border-gray-100 px-4 py-3 text-left transition-colors hover:bg-gray-50 last:border-b-0"
              >
                {renderOption(option)}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}

function MachinePickerModal({
  isOpen,
  machines,
  searchValue,
  setSearchValue,
  onSelect,
  onClose,
}: {
  isOpen: boolean
  machines: MachineOption[]
  searchValue: string
  setSearchValue: (value: string) => void
  onSelect: (machine: MachineOption) => void
  onClose: () => void
}) {
  const filteredMachines = React.useMemo(() => {
    const normalized = searchValue.trim().toLowerCase()
    if (!normalized) {
      return machines
    }

    return machines.filter((machine) => [machine.name, machine.categoryName].join(' ').toLowerCase().includes(normalized))
  }, [machines, searchValue])

  React.useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Select Machine"
        className="relative z-[71] flex h-[500px] w-[min(600px,calc(100%-2rem))] flex-col border border-gray-200 bg-white shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-gray-200 px-5 py-4">
          <div>
            <p className="mb-1 font-sans text-[10px] uppercase tracking-[0.2em] text-gray-400">Order Items</p>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-black">SELECT MACHINE</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-black"
            aria-label="Close machine picker"
          >
            ×
          </button>
        </div>

        <div className="shrink-0 border-b border-gray-200 px-5 py-4">
          <input
            type="text"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search by name or category..."
            autoFocus
            className="w-full border border-gray-200 bg-white px-3 py-2.5 font-sans text-xs text-black placeholder:text-gray-400 transition-colors focus:border-black focus:outline-none"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {filteredMachines.length === 0 ? (
            <div className="flex h-full items-center justify-center font-sans text-[10px] uppercase tracking-[0.15em] text-gray-400">
              No machines found
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filteredMachines.map((machine) => (
                <button
                  key={machine.id}
                  type="button"
                  onClick={() => onSelect(machine)}
                  className="group overflow-hidden border border-gray-200 bg-gray-50 text-left transition-colors hover:border-black hover:bg-white"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100">
                    <img
                      src={getMachineImageUrl(machine)}
                      alt={machine.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="space-y-1 px-3 py-3">
                    <p className="truncate font-sans text-xs font-semibold text-black">{machine.name}</p>
                    <p className="font-sans text-[10px] text-gray-400">{machine.categoryName}</p>
                    <span className="inline-flex items-center border border-gray-200 bg-white px-2 py-0.5 font-sans text-[9px] uppercase tracking-[0.15em] text-gray-500">
                      {machine.machineSuppliers.length} Suppliers
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function OrderModal({ isOpen, order, onClose }: OrderModalProps) {
  const [orderDate, setOrderDate] = React.useState('')
  const [notes, setNotes] = React.useState('')
  const [customerSearch, setCustomerSearch] = React.useState('')
  const [selectedCustomer, setSelectedCustomer] = React.useState<CustomerOption | null>(null)
  const [items, setItems] = React.useState<FormItem[]>([createBlankItem()])
  const [machinePickerOpen, setMachinePickerOpen] = React.useState(false)
  const [machinePickerRowIndex, setMachinePickerRowIndex] = React.useState<number | null>(null)
  const [machinePickerSearch, setMachinePickerSearch] = React.useState('')

  const closeMachinePicker = React.useCallback(() => {
    setMachinePickerOpen(false)
    setMachinePickerRowIndex(null)
    setMachinePickerSearch('')
  }, [])

  React.useEffect(() => {
    if (!isOpen) {
      closeMachinePicker()
      return
    }

    if (order) {
      setSelectedCustomer(mockCustomers.find((customer) => customer.id === order.customerId) ?? null)
      setOrderDate(formatDateInput(new Date(order.createdAt)))
      setNotes(order.notes ?? '')
      setItems(
        order.items.map((item) => ({
          machineId: item.machineId,
          supplierId: item.supplierId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          notes: item.notes ?? '',
        })),
      )
    } else {
      setOrderDate(formatDateInput(new Date()))
      setNotes('')
      setSelectedCustomer(null)
      setCustomerSearch('')
      setItems([createBlankItem()])
    }
  }, [closeMachinePicker, isOpen, order])

  const customerOptions = React.useMemo(() => {
    const normalized = customerSearch.trim().toLowerCase()
    if (!normalized) return mockCustomers

    return mockCustomers.filter((customer) => [customer.name, customer.companyName].filter(Boolean).join(' ').toLowerCase().includes(normalized))
  }, [customerSearch])

  const total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)

  const handleItemChange = (index: number, field: keyof FormItem, value: string | number) => {
    setItems((previous) => {
      const next = [...previous]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const handleAddItem = () => {
    setItems((previous) => [...previous, createBlankItem()])
  }

  const handleRemoveItem = (index: number) => {
    setItems((previous) => (previous.length === 1 ? previous : previous.filter((_, currentIndex) => currentIndex !== index)))

    if (machinePickerRowIndex === index) {
      closeMachinePicker()
    } else if (machinePickerRowIndex !== null && machinePickerRowIndex > index) {
      setMachinePickerRowIndex(machinePickerRowIndex - 1)
    }
  }

  const handleMachineSelect = (index: number, machine: MachineOption) => {
    const defaultSupplier = machine.machineSuppliers[0]

    setItems((previous) => {
      const next = [...previous]
      next[index] = {
        ...next[index],
        machineId: machine.id,
        supplierId: defaultSupplier?.supplierId ?? '',
        unitPrice: defaultSupplier?.costPrice ?? 0,
      }
      return next
    })

    closeMachinePicker()
  }

  const handleMachineClear = (index: number) => {
    setItems((previous) => {
      const next = [...previous]
      next[index] = { ...next[index], machineId: '', supplierId: '', unitPrice: 0 }
      return next
    })
  }

  const openMachinePicker = (index: number) => {
    setMachinePickerRowIndex(index)
    setMachinePickerSearch('')
    setMachinePickerOpen(true)
  }

  const handleSupplierChange = (index: number, supplierId: string) => {
    const item = items[index]
    const machine = mockMachines.find((entry) => entry.id === item.machineId)
    const supplier = machine?.machineSuppliers.find((entry) => entry.supplierId === supplierId)

    setItems((previous) => {
      const next = [...previous]
      next[index] = {
        ...next[index],
        supplierId,
        unitPrice: supplier?.costPrice ?? next[index].unitPrice,
      }
      return next
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!selectedCustomer) {
      return
    }

    const formData: OrderFormData & { orderDate: string } = {
      customerId: selectedCustomer.id,
      notes,
      items: items.map((item) => ({
        machineId: item.machineId,
        supplierId: item.supplierId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        notes: item.notes,
      })),
      orderDate,
    }

    console.log(formData)
    onClose()
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => (!open ? onClose() : null)}>
        <DialogContent showCloseButton={false} className="w-[min(1120px,calc(100%-2rem))] max-w-none gap-0 rounded-none border border-gray-200 bg-white p-0">
          <DialogTitle className="sr-only">Create Order</DialogTitle>

          <div className="flex h-full max-h-[90vh] flex-col overflow-hidden">
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-gray-200 px-6 py-5">
              <div>
                <p className="mb-1 font-sans text-[10px] uppercase tracking-[0.2em] text-gray-400">Orders</p>
                <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-black">CREATE ORDER</h2>
              </div>
            </div>

            <form id="order-modal-form" onSubmit={handleSubmit} className="flex-1 space-y-8 overflow-y-auto p-6">
              <section>
                <p className="mb-4 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Order Info</p>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[0.85fr_1.15fr]">
                  <div>
                    <label className="mb-2 block font-sans text-[9px] uppercase tracking-[0.15em] text-gray-400">Order Date</label>
                    <input
                      type="text"
                      value={orderDate}
                      readOnly
                      className="w-full border border-gray-200 bg-gray-50 px-3 py-2.5 font-sans text-xs text-gray-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-sans text-[9px] uppercase tracking-[0.15em] text-gray-400">Notes</label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      placeholder="Optional notes..."
                      className="w-full resize-none border border-gray-200 px-3 py-2.5 font-sans text-xs text-black transition-colors focus:border-black focus:outline-none"
                    />
                  </div>
                </div>
              </section>

              <section>
                <p className="mb-4 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Customer</p>
                <SearchSelect<CustomerOption>
                  placeholder="Search customer..."
                  searchValue={customerSearch}
                  setSearchValue={setCustomerSearch}
                  options={customerOptions}
                  selected={selectedCustomer}
                  onSelect={(customer) => {
                    setSelectedCustomer(customer)
                    setCustomerSearch('')
                  }}
                  onClear={() => setSelectedCustomer(null)}
                  emptyLabel="No customers found"
                  renderOption={(customer) => (
                    <div>
                      <p className="font-sans text-xs font-semibold text-black">{customer.name}</p>
                      <p className="mt-0.5 font-sans text-[10px] text-gray-400">
                        {customer.companyName || 'No company'}{customer.country ? ` · ${customer.country}` : ''}
                      </p>
                    </div>
                  )}
                  renderSelected={(customer) => (
                    <div>
                      <p className="font-sans text-xs font-semibold text-black">{customer.name}</p>
                      <p className="mt-0.5 font-sans text-[10px] text-gray-400">
                        {customer.companyName || 'No company'}{customer.country ? ` · ${customer.country}` : ''}
                      </p>
                    </div>
                  )}
                />
              </section>

              <section>
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">Order Items</p>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="font-sans text-[10px] uppercase tracking-[0.15em] text-black hover:underline"
                  >
                    + Add Item
                  </button>
                </div>

                <div className="space-y-4">
                  {items.map((item, index) => {
                    const machine = mockMachines.find((entry) => entry.id === item.machineId)
                    const supplierOptions = machine?.machineSuppliers || []
                    const rowTotal = item.quantity * item.unitPrice

                    return (
                      <div key={index} className="space-y-4 border border-gray-200 bg-gray-50 p-4">
                        <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-[1.6fr_1fr_0.7fr_0.7fr_0.8fr_auto]">
                          <div>
                            <label className="mb-2 block font-sans text-[9px] uppercase tracking-[0.15em] text-gray-400">Machine</label>
                            {!machine ? (
                              <button
                                type="button"
                                onClick={() => openMachinePicker(index)}
                                className="flex h-[62px] w-full items-center justify-center border border-dashed border-gray-300 bg-white px-3 font-sans text-xs uppercase tracking-[0.15em] text-gray-400 transition-colors hover:border-black hover:text-black"
                              >
                                Select Machine
                              </button>
                            ) : (
                              <div className="flex h-[62px] w-full items-stretch border border-gray-200 bg-white">
                                <button
                                  type="button"
                                  onClick={() => openMachinePicker(index)}
                                  className="flex min-w-0 flex-1 items-center gap-3 px-3 text-left transition-colors hover:bg-gray-50"
                                >
                                  <img
                                    src={getMachineImageUrl(machine)}
                                    alt={machine.name}
                                    className="h-10 w-10 shrink-0 rounded border border-gray-200 object-cover"
                                  />
                                  <div className="min-w-0 flex-1">
                                    <p className="truncate font-sans text-xs font-semibold text-black">{machine.name}</p>
                                    <span className="mt-1 inline-flex max-w-full items-center border border-gray-200 bg-gray-50 px-2 py-0.5 font-sans text-[9px] uppercase tracking-[0.15em] text-gray-500">
                                      <span className="truncate">{machine.categoryName}</span>
                                    </span>
                                  </div>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleMachineClear(index)}
                                  className="w-11 shrink-0 border-l border-gray-200 text-gray-400 transition-colors hover:text-black"
                                  aria-label="Clear machine"
                                >
                                  ×
                                </button>
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="mb-2 block font-sans text-[9px] uppercase tracking-[0.15em] text-gray-400">Supplier</label>
                            {machine ? (
                              <select
                                value={item.supplierId}
                                onChange={(event) => handleSupplierChange(index, event.target.value)}
                                className="w-full border border-gray-200 px-3 py-2.5 font-sans text-xs text-black transition-colors focus:border-black focus:outline-none"
                              >
                                <option value="">Select supplier</option>
                                {supplierOptions.map((supplier) => (
                                  <option key={supplier.id} value={supplier.supplierId}>
                                    {supplier.supplierName}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <div className="border border-gray-200 bg-white px-3 py-2.5 font-sans text-xs text-gray-400">Select a machine first</div>
                            )}
                          </div>

                          <div>
                            <label className="mb-2 block font-sans text-[9px] uppercase tracking-[0.15em] text-gray-400">Quantity</label>
                            <input
                              type="number"
                              min={1}
                              value={item.quantity}
                              onChange={(event) => handleItemChange(index, 'quantity', Math.max(1, Number(event.target.value) || 1))}
                              className="w-full border border-gray-200 px-3 py-2.5 font-sans text-xs text-black transition-colors focus:border-black focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="mb-2 block font-sans text-[9px] uppercase tracking-[0.15em] text-gray-400">Unit Price</label>
                            <input
                              type="number"
                              min={0}
                              value={item.unitPrice}
                              onChange={(event) => handleItemChange(index, 'unitPrice', Number(event.target.value) || 0)}
                              className="w-full border border-gray-200 px-3 py-2.5 font-sans text-xs text-black transition-colors focus:border-black focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="mb-2 block font-sans text-[9px] uppercase tracking-[0.15em] text-gray-400">Row Total</label>
                            <input
                              type="text"
                              value={formatCurrency(rowTotal)}
                              readOnly
                              className="w-full border border-gray-200 bg-white px-3 py-2.5 font-sans text-xs text-black focus:outline-none"
                            />
                          </div>

                          <div className="pt-[22px]">
                            <button
                              type="button"
                              disabled={items.length === 1}
                              onClick={() => handleRemoveItem(index)}
                              className="h-8 w-8 border border-gray-200 text-gray-400 transition-colors hover:border-black hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                              aria-label={`Delete item ${index + 1}`}
                            >
                              ×
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="mb-2 block font-sans text-[9px] uppercase tracking-[0.15em] text-gray-400">Notes</label>
                          <input
                            type="text"
                            value={item.notes}
                            onChange={(event) => handleItemChange(index, 'notes', event.target.value)}
                            placeholder="Item notes..."
                            className="w-full border border-gray-200 px-3 py-2.5 font-sans text-xs text-black transition-colors focus:border-black focus:outline-none"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-4">
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gray-400">Order Total</p>
                  <p className="font-serif text-2xl font-bold text-black">{formatCurrency(total)}</p>
                </div>
              </section>
            </form>

            <div className="flex shrink-0 items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button
                type="button"
                onClick={onClose}
                className="border border-gray-200 bg-white px-4 py-2 font-sans text-xs tracking-wide text-gray-500 transition-colors hover:border-black hover:text-black"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="order-modal-form"
                disabled={!selectedCustomer}
                className="bg-black px-4 py-2 font-sans text-xs tracking-wide text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Create Order
              </button>
            </div>
          </div>

          <MachinePickerModal
            isOpen={machinePickerOpen}
            machines={mockMachines}
            searchValue={machinePickerSearch}
            setSearchValue={setMachinePickerSearch}
            onClose={closeMachinePicker}
            onSelect={(machine) => {
              if (machinePickerRowIndex === null) {
                return
              }

              handleMachineSelect(machinePickerRowIndex, machine)
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
