export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  details?: string;
  errors?: Record<string, string[]>;
}

export interface CreateSubmissionResponse {
  id: string;
  createdAt: string;
}

export interface QueryParams {
  page: number;
  limit: number;
  sortBy: 'createdAt';
  sortOrder: 'asc' | 'desc';
}
