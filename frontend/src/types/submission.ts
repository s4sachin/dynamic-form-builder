export interface Submission {
  id: string;
  formId: string;
  data: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface SubmissionsQueryResponse {
  submissions: Submission[];
  pagination: PaginationMeta;
}

export interface CreateSubmissionPayload {
  formId: string;
  data: Record<string, unknown>;
}
