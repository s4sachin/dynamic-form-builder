import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateSubmissionPayload, CreateSubmissionResponse } from '../types/submission';
import { apiClient } from '../api/client';

interface UseSubmitFormOptions {
  onSuccess?: (data: CreateSubmissionResponse) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook to submit form data
 * Uses React Query mutation for state management and side effects
 */
export const useSubmitForm = (options: UseSubmitFormOptions = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreateSubmissionPayload) => apiClient.submitForm(payload),
    onSuccess: (data) => {
      // Invalidate submissions query to refetch
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      options.onSuccess?.(data);
    },
    onError: (error) => {
      options.onError?.(error);
    },
  });

  return {
    submit: mutation.mutate,
    submitAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
    validationErrors: (mutation.error as Error & { validationErrors?: Record<string, string[]> })?.validationErrors,
  };
};
