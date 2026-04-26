import { apiClient } from '@/lib/apiClient';

function buildSearchQuery(search?: string): string {
  const normalizedSearch = search?.trim();
  if (!normalizedSearch) {
    return '';
  }

  const params = new URLSearchParams({ search: normalizedSearch });
  return `?${params.toString()}`;
}

export interface CategoryPayload {
  name: string;
  description?: string;
  parentId?: string;
  imageUrl?: string

}

export const categoriesApi = {
  list<TResponse>(search?: string): Promise<TResponse> {
    return apiClient.get<TResponse>(`/categories${buildSearchQuery(search)}`);
  },

  getById<TResponse>(id: string): Promise<TResponse> {
    return apiClient.get<TResponse>(`/categories/${id}`);
  },

  create<TResponse>(payload: CategoryPayload): Promise<TResponse> {
    return apiClient.post<TResponse, CategoryPayload>('/categories', payload);
  },

  update<TResponse>(id: string, payload: Partial<CategoryPayload>): Promise<TResponse> {
    return apiClient.patch<TResponse, Partial<CategoryPayload>>(`/categories/${id}`, payload);
  },

  delete<TResponse>(id: string): Promise<TResponse> {
    return apiClient.delete<TResponse>(`/categories/${id}`);
  },

  getMachines<TResponse>(id: string, search?: string): Promise<TResponse> {
    return apiClient.get<TResponse>(`/categories/${id}/machines${buildSearchQuery(search)}`);
  },

  getSuppliers<TResponse>(id: string, search?: string): Promise<TResponse> {
    return apiClient.get<TResponse>(`/categories/${id}/suppliers${buildSearchQuery(search)}`);
  },
};
