import { apiClient } from '@/lib/apiClient';

function buildSearchQuery(search?: string): string {
  const normalizedSearch = search?.trim();
  if (!normalizedSearch) {
    return '';
  }

  const params = new URLSearchParams({ search: normalizedSearch });
  return `?${params.toString()}`;
}

export interface MachinePayload {
  supplierId: string;
  categoryId: string;
  name: string;
  modelNumber?: string;
  costPrice: number;
  images: string[];
  moq?: number;
  leadTimeDays?: number;
  specifications: Record<string, unknown>;
  notes?: string;
}

export const machinesApi = {
  list<TResponse>(search?: string): Promise<TResponse> {
    return apiClient.get<TResponse>(`/machines${buildSearchQuery(search)}`);
  },

  getById<TResponse>(id: string): Promise<TResponse> {
    return apiClient.get<TResponse>(`/machines/${id}`);
  },

  create<TResponse>(payload: MachinePayload): Promise<TResponse> {
    return apiClient.post<TResponse, MachinePayload>('/machines', payload);
  },

  update<TResponse>(id: string, payload: Partial<MachinePayload>): Promise<TResponse> {
    return apiClient.patch<TResponse, Partial<MachinePayload>>(`/machines/${id}`, payload);
  },

  delete<TResponse>(id: string): Promise<TResponse> {
    return apiClient.delete<TResponse>(`/machines/${id}`);
  },
};
