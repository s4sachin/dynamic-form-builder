import { useQuery } from '@tanstack/react-query';
import type { SubmissionsQueryResponse } from '../types/submission';
import { apiClient } from '../api/client';

interface UseSubmissionsOptions {
  page?: number;
  limit?: number;
  sortOrder?: 'asc' | 'desc';
  enabled?: boolean;
}

/**
 * Hook to fetch submissions with pagination and sorting
 * Uses React Query for caching and state management
 */
export const useSubmissions = (options: UseSubmissionsOptions = {}) => {
  const { page = 1, limit = 10, sortOrder = 'desc', enabled = true } = options;

  const query = useQuery<SubmissionsQueryResponse, Error>({
    queryKey: ['submissions', page, limit, sortOrder],
    queryFn: () => apiClient.getSubmissions(page, limit, sortOrder),
    staleTime: 1000 * 30, // 30 seconds
    gcTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled,
  });

  return {
    submissions: query.data?.submissions,
    pagination: query.data?.pagination,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
