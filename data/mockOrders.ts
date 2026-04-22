import { mockCustomers } from '@/data/mockCustomers'
import { mockMachines } from '@/data/mockMachines'
import type { Order, OrderItem, OrderStatus } from '@/types/order'

function getCustomer(customerId: string) {
  const customer = mockCustomers.find((entry) => entry.id === customerId)
  if (!customer) {
    throw new Error(`Missing mock customer: ${customerId}`)
  }
  return customer
}

function getMachine(machineId: string) {
  const machine = mockMachines.find((entry) => entry.id === machineId)
  if (!machine) {
    throw new Error(`Missing mock machine: ${machineId}`)
  }
  return machine
}

function buildItem(
  machineId: string,
  supplierId: string,
  quantity: number,
  unitPrice: number,
  notes?: string,
): OrderItem {
  const machine = getMachine(machineId)
  const supplier = machine.machineSuppliers.find((entry) => entry.supplierId === supplierId)

  if (!supplier) {
    throw new Error(`Missing mock supplier ${supplierId} for machine ${machineId}`)
  }

  return {
    id: `item_${machineId}_${supplierId}`,
    machineId,
    machineName: machine.name,
    machineImage: machine.images.find((image) => image.isPrimary)?.url ?? machine.images[0]?.url,
    supplierId,
    supplierName: supplier.supplierName,
    quantity,
    unitPrice,
    totalPrice: quantity * unitPrice,
    notes,
  }
}

function buildOrder(params: {
  id: string
  customerId: string
  salesPersonId: string
  salesPersonName: string
  status: OrderStatus
  items: OrderItem[]
  notes?: string
  createdAt: string
  updatedAt: string
}): Order {
  const customer = getCustomer(params.customerId)
  const totalPrice = params.items.reduce((sum, item) => sum + item.totalPrice, 0)

  return {
    id: params.id,
    customerId: params.customerId,
    customerName: customer.name,
    customerCompany: customer.companyName,
    salesPersonId: params.salesPersonId,
    salesPersonName: params.salesPersonName,
    status: params.status,
    totalPrice,
    notes: params.notes,
    items: params.items,
    createdAt: params.createdAt,
    updatedAt: params.updatedAt,
  }
}

export const mockOrders: Order[] = [
  buildOrder({
    id: 'ord_1001',
    customerId: 'cust_1a2b3c',
    salesPersonId: 'sp_001',
    salesPersonName: 'Lin Wei',
    status: 'MANUFACTURING',
    items: [
      buildItem('mach_4d5e6f', 'sup_8f1a2c4d', 2, 750, 'Main cold room line'),
      buildItem('mach_2b3c4d', 'sup_c51e6a83', 1, 380, 'Banquet prep support'),
    ],
    notes: 'Rush order for hotel expansion in Dubai Marina.',
    createdAt: '2026-03-18T10:15:00Z',
    updatedAt: '2026-04-02T12:30:00Z',
  }),
  buildOrder({
    id: 'ord_1002',
    customerId: 'cust_4d5e6f',
    salesPersonId: 'sp_002',
    salesPersonName: 'Kevin Luo',
    status: 'READY',
    items: [
      buildItem('mach_3c4d5e', 'sup_c51e6a83', 1, 2850, 'Flagship kitchen upgrade'),
      buildItem('mach_1a2b3c', 'sup_b72c9f14', 2, 245),
    ],
    notes: 'Waiting for packing confirmation and final QC photos.',
    createdAt: '2026-03-24T08:20:00Z',
    updatedAt: '2026-04-08T09:40:00Z',
  }),
  buildOrder({
    id: 'ord_1003',
    customerId: 'cust_0j1k2l',
    salesPersonId: 'sp_003',
    salesPersonName: 'Ivy Chen',
    status: 'SHIPPED',
    items: [
      buildItem('mach_5e6f7g', 'sup_c51e6a83', 1, 1320),
      buildItem('mach_6f7g8h', 'sup_e04a7d56', 2, 1650, 'Showcase line for deli section'),
      buildItem('mach_2b3c4d', 'sup_b72c9f14', 1, 355),
    ],
    notes: 'Container departed Ningbo and is on sea freight.',
    createdAt: '2026-02-11T14:50:00Z',
    updatedAt: '2026-04-10T16:05:00Z',
  }),
  buildOrder({
    id: 'ord_1004',
    customerId: 'cust_7g8h9i',
    salesPersonId: 'sp_004',
    salesPersonName: 'Sarah Ahmed',
    status: 'DELIVERED',
    items: [
      buildItem('mach_1a2b3c', 'sup_3d9b7e21', 1, 230, 'Back kitchen meat processing'),
    ],
    notes: 'Delivered and signed off by procurement manager.',
    createdAt: '2026-01-19T09:10:00Z',
    updatedAt: '2026-03-01T11:00:00Z',
  }),
  buildOrder({
    id: 'ord_1005',
    customerId: 'cust_3m4n5o',
    salesPersonId: 'sp_005',
    salesPersonName: 'Mohammed Yasir',
    status: 'CANCELLED',
    items: [
      buildItem('mach_4d5e6f', 'sup_8f1a2c4d', 1, 710),
      buildItem('mach_5e6f7g', 'sup_3d9b7e21', 1, 1250),
    ],
    notes: 'Cancelled after the client changed the project scope.',
    createdAt: '2026-03-03T07:25:00Z',
    updatedAt: '2026-03-14T13:45:00Z',
  }),
  buildOrder({
    id: 'ord_1006',
    customerId: 'cust_6p7q8r',
    salesPersonId: 'sp_006',
    salesPersonName: 'Elena Rostova',
    status: 'MANUFACTURING',
    items: [
      buildItem('mach_3c4d5e', 'sup_3d9b7e21', 1, 2700),
      buildItem('mach_6f7g8h', 'sup_e04a7d56', 1, 1650),
      buildItem('mach_2b3c4d', 'sup_c51e6a83', 1, 380),
    ],
    notes: 'Phased delivery for the Doha opening launch.',
    createdAt: '2026-04-04T10:00:00Z',
    updatedAt: '2026-04-18T09:25:00Z',
  }),
]
