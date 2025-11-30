import { useQuery } from '@tanstack/react-query';
import { FormSchema } from '../types/form';
import { apiClient } from '../api/client';

/**
 * Hook to fetch and cache form schema
 * Uses React Query for caching and state management
 */
export const useFormSchema = () => {
  const query = useQuery<FormSchema, Error>({
    queryKey: ['formSchema'],
    queryFn: () => apiClient.getFormSchema(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (garbage collection time)
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    schema: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    retry: query.refetch,
  };
};
