export interface ApiSuccessResponse<TData = undefined> {
  success: true
  message?: string
  data?: TData
}

export interface ApiErrorResponse<TDetails = Record<string, string[]>> {
  success: false
  error: string
  details?: TDetails
}

export interface PaginatedApiResponse<TData>
  extends ApiSuccessResponse<{
    items: TData[]
    total: number
    page: number
    pageSize: number
  }> {}
