import { env } from '../env';
import type { ApiResponse } from '../types/api';
import type { FormSchema } from '../types/form';
import type { SubmissionsQueryResponse, CreateSubmissionPayload, CreateSubmissionResponse } from '../types/submission';

const apiBaseUrl = env.VITE_API_BASE_URL;

export const apiClient = {
  /**
   * Fetch form schema from backend
   */
  async getFormSchema(): Promise<FormSchema> {
    const response = await fetch(`${apiBaseUrl}/api/form-schema`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch form schema: ${response.statusText}`);
    }
    
    const data = (await response.json()) as ApiResponse<FormSchema>;
    
    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to fetch form schema');
    }
    
    return data.data;
  },

  /**
   * Submit form data to backend
   */
  async submitForm(payload: CreateSubmissionPayload): Promise<CreateSubmissionResponse> {
    const response = await fetch(`${apiBaseUrl}/api/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    const data = (await response.json()) as ApiResponse<CreateSubmissionResponse>;
    
    if (!data.success || !data.data) {
      if (data.errors) {
        // Validation errors
        const error = new Error('Validation failed') as Error & { validationErrors?: Record<string, string[]> };
        error.validationErrors = data.errors;
        throw error;
      }
      throw new Error(data.error || 'Failed to submit form');
    }
    
    return data.data;
  },

  /**
   * Fetch submissions with pagination
   */
  async getSubmissions(
    page: number = 1,
    limit: number = 10,
    sortOrder: 'asc' | 'desc' = 'desc'
  ): Promise<SubmissionsQueryResponse> {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      sortOrder,
    });
    
    const response = await fetch(`${apiBaseUrl}/api/submissions?${params}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch submissions: ${response.statusText}`);
    }
    
    const data = (await response.json()) as ApiResponse<SubmissionsQueryResponse>;
    
    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to fetch submissions');
    }
    
    return data.data;
  },
};
