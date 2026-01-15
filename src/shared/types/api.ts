export interface ApiResponse<T> {
  data: T
  message?: string
  success?: boolean
}

export interface PaginationParams {
  page?: number
  limit?: number
  cursor?: string | null
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page?: number
    limit?: number
    total?: number
    nextCursor?: string | null
    hasMore?: boolean
  }
}
