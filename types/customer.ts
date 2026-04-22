export interface CustomerContact {
  whatsapp?: string
  wechat?: string
  email?: string
}

export interface Customer {
  id: string
  name: string
  companyName?: string
  country?: string
  city?: string
  customerType?: string
  contact?: CustomerContact
  ordersCount: number
  createdAt: string
}

export interface CustomerFormData {
  name: string
  companyName: string
  country: string
  city: string
  customerType: string
  contact: CustomerContact
  notes: string
}