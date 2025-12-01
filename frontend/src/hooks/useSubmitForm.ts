import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateSubmissionPayload, CreateSubmissionResponse } from '../types/submission';
import { apiClient } from '../api/client';
import { showToast } from '../components/Toast';

interface UseSubmitFormOptions {
  onSuccess?: (data: CreateSubmissionResponse) => void;
  onError?: (error: Error) => void;
  showNotifications?: boolean;
}

/**
 * Hook to submit form data
 * Uses React Query mutation for state management and side effects
 */
export const useSubmitForm = (options: UseSubmitFormOptions = {}) => {
  const { showNotifications = true } = options;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreateSubmissionPayload) => apiClient.submitForm(payload),
    onSuccess: (data) => {
      // Invalidate submissions query to refetch
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      
      if (showNotifications) {
        showToast.success('Form submitted successfully!');
      }
      
      options.onSuccess?.(data);
    },
    onError: (error) => {
      if (showNotifications) {
        // Check if it's a validation error with field-level errors
        const validationErrors = (error as Error & { validationErrors?: Record<string, string[]> })?.validationErrors;
        
        if (validationErrors && Object.keys(validationErrors).length > 0) {
          // Show first field error with field name
          const firstField = Object.keys(validationErrors)[0];
          const firstError = validationErrors[firstField][0];
          showToast.error(`${firstField}: ${firstError}`);
        } else {
          const message = error instanceof Error ? error.message : 'Failed to submit form';
          showToast.error(message);
        }
      }
      
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
