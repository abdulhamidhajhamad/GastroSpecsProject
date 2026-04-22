export type OrderStatus = 'MANUFACTURING' | 'READY' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'

export interface OrderItem {
  id: string
  machineId: string
  machineName: string
  machineImage?: string
  supplierId: string
  supplierName: string
  quantity: number
  unitPrice: number
  totalPrice: number
  deliveryStatus?: string
  notes?: string
}

export interface Order {
  id: string
  customerId: string
  customerName: string
  customerCompany?: string
  salesPersonId: string
  salesPersonName: string
  status: OrderStatus
  totalPrice: number
  notes?: string
  items: OrderItem[]
  createdAt: string
  updatedAt: string
}

export interface OrderFormData {
  customerId: string
  salesPersonId: string
  notes: string
  items: {
    machineId: string
    supplierId: string
    quantity: number
    unitPrice: number
    notes: string
  }[]
}