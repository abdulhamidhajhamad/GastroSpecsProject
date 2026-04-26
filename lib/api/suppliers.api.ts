import { apiClient } from '@/lib/apiClient';

function buildSearchQuery(search?: string): string {
  const normalizedSearch = search?.trim();
  if (!normalizedSearch) {
    return '';
  }

  const params = new URLSearchParams({ search: normalizedSearch });
  return `?${params.toString()}`;
}

export interface SupplierContactPayload {
  name: string;
  position?: string;
  contactMethods: Record<string, unknown>;
  notes?: string;
}

export interface SupplierPayload {
  companyName: string;
  location: Record<string, unknown>;
  website?: string;
  wechat?: string;
  email?: string;
  phone?: string;
  isDdpPartner?: boolean;
  notes?: string;
}

export const suppliersApi = {
  list<TResponse>(search?: string): Promise<TResponse> {
    return apiClient.get<TResponse>(`/suppliers${buildSearchQuery(search)}`);
  },

  getById<TResponse>(id: string): Promise<TResponse> {
    return apiClient.get<TResponse>(`/suppliers/${id}`);
  },

  create<TResponse>(payload: SupplierPayload): Promise<TResponse> {
    return apiClient.post<TResponse, SupplierPayload>('/suppliers', payload);
  },

  update<TResponse>(id: string, payload: Partial<SupplierPayload>): Promise<TResponse> {
    return apiClient.patch<TResponse, Partial<SupplierPayload>>(`/suppliers/${id}`, payload);
  },

  delete<TResponse>(id: string): Promise<TResponse> {
    return apiClient.delete<TResponse>(`/suppliers/${id}`);
  },

  listContacts<TResponse>(supplierId: string): Promise<TResponse> {
    return apiClient.get<TResponse>(`/suppliers/${supplierId}/contacts`);
  },

  createContact<TResponse>(
    supplierId: string,
    payload: SupplierContactPayload,
  ): Promise<TResponse> {
    return apiClient.post<TResponse, SupplierContactPayload>(
      `/suppliers/${supplierId}/contacts`,
      payload,
    );
  },

  updateContact<TResponse>(
    supplierId: string,
    contactId: string,
    payload: Partial<SupplierContactPayload>,
  ): Promise<TResponse> {
    return apiClient.patch<TResponse, Partial<SupplierContactPayload>>(
      `/suppliers/${supplierId}/contacts/${contactId}`,
      payload,
    );
  },

  deleteContact<TResponse>(supplierId: string, contactId: string): Promise<TResponse> {
    return apiClient.delete<TResponse>(`/suppliers/${supplierId}/contacts/${contactId}`);
  },
};
