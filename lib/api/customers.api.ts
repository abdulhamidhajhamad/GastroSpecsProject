import { apiClient } from '@/lib/apiClient';

function buildSearchQuery(search?: string): string {
  const normalizedSearch = search?.trim();
  if (!normalizedSearch) {
    return '';
  }

  const params = new URLSearchParams({ search: normalizedSearch });
  return `?${params.toString()}`;
}

export interface CustomerPayload {
  name: string;
  companyName?: string;
  contact?: Record<string, unknown>;
  country?: string;
  city?: string;
  customerType?: string;
  notes?: string;
}

export const customersApi = {
  list<TResponse>(search?: string): Promise<TResponse> {
    return apiClient.get<TResponse>(`/customers${buildSearchQuery(search)}`);
  },

  getById<TResponse>(id: string): Promise<TResponse> {
    return apiClient.get<TResponse>(`/customers/${id}`);
  },

  create<TResponse>(payload: CustomerPayload): Promise<TResponse> {
    return apiClient.post<TResponse, CustomerPayload>('/customers', payload);
  },

  update<TResponse>(id: string, payload: Partial<CustomerPayload>): Promise<TResponse> {
    return apiClient.patch<TResponse, Partial<CustomerPayload>>(`/customers/${id}`, payload);
  },

  delete<TResponse>(id: string): Promise<TResponse> {
    return apiClient.delete<TResponse>(`/customers/${id}`);
  },
};
