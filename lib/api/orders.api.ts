import { apiClient } from '@/lib/apiClient';

function buildSearchQuery(search?: string): string {
  const normalizedSearch = search?.trim();
  if (!normalizedSearch) {
    return '';
  }

  const params = new URLSearchParams({ search: normalizedSearch });
  return `?${params.toString()}`;
}

export interface CreateOrderItemPayload {
  machineId: string;
  supplierId: string;
  quantity: number;
  unitPrice: number;
  notes?: string;
}

export interface CreateOrderPayload {
  customerId: string;
  salesPersonId: string;
  notes?: string;
  items: CreateOrderItemPayload[];
}

export interface UpdateOrderPayload {
  notes?: string;
  salesPersonId?: string;
}

export interface UpdateOrderStatusPayload {
  status: 'MANUFACTURING' | 'READY' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
}

export interface UpdateOrderItemPayload {
  supplierId?: string;
  quantity?: number;
  unitPrice?: number;
  deliveryStatus?: string;
  notes?: string;
}

export const ordersApi = {
  list<TResponse>(search?: string): Promise<TResponse> {
    return apiClient.get<TResponse>(`/orders${buildSearchQuery(search)}`);
  },

  getById<TResponse>(id: string): Promise<TResponse> {
    return apiClient.get<TResponse>(`/orders/${id}`);
  },

  create<TResponse>(payload: CreateOrderPayload): Promise<TResponse> {
    return apiClient.post<TResponse, CreateOrderPayload>('/orders', payload);
  },

  update<TResponse>(id: string, payload: UpdateOrderPayload): Promise<TResponse> {
    return apiClient.patch<TResponse, UpdateOrderPayload>(`/orders/${id}`, payload);
  },

  updateStatus<TResponse>(id: string, payload: UpdateOrderStatusPayload): Promise<TResponse> {
    return apiClient.patch<TResponse, UpdateOrderStatusPayload>(`/orders/${id}/status`, payload);
  },

  updateItem<TResponse>(
    orderId: string,
    itemId: string,
    payload: UpdateOrderItemPayload,
  ): Promise<TResponse> {
    return apiClient.patch<TResponse, UpdateOrderItemPayload>(
      `/orders/${orderId}/items/${itemId}`,
      payload,
    );
  },

  delete<TResponse>(id: string): Promise<TResponse> {
    return apiClient.delete<TResponse>(`/orders/${id}`);
  },
};
