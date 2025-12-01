import React, { useCallback, useState, useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { FormRenderer } from '../components/FormRenderer';
import { useFormSchema, useSubmitForm } from '../hooks';
import { Skeleton } from '../components/Skeleton';
import { FormEmptyState } from '../components/EmptyState';
import type { CreateSubmissionPayload } from '../types/submission';

/**
 * Form page component that renders dynamic form using TanStack Form
 */
export const FormPage: React.FC<{ onNavigateToSubmissions?: () => void }> = ({ onNavigateToSubmissions }) => {
  const { schema, isLoading: schemaLoading, isError: schemaError, retry } = useFormSchema();
  const { submitAsync, validationErrors } = useSubmitForm();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Initialize form with TanStack Form
  const form = useForm({
    defaultValues: schema?.fields.reduce((acc, field) => {
      // Initialize switch fields with false, others with empty string
      if (field.type === 'switch') {
        acc[field.name] = false;
      } else if (field.type === 'multi-select') {
        acc[field.name] = [];
      } else {
        acc[field.name] = '';
      }
      return acc;
    }, {} as Record<string, any>) || {},
    onSubmit: async ({ value }) => {
      try {
        // Build the submission payload with formId and data
        const submission: CreateSubmissionPayload = {
          formId: 'employee-onboarding',
          data: value
        };
        const response = await submitAsync(submission);
        if (response) {
          // Reset form on success
          form.reset();
        }
      } catch {
        // Error already handled in hook
      }
    },
  });

  const handleFormChange = useCallback(() => {
    // Validate form on change
    form.validate('change');
  }, [form]);

  // Derive submitting state from TanStack Form
  const isSubmitting = form.state.isSubmitting;

  // Watch for successful submission
  useEffect(() => {
    if (form.state.isSubmitted && !form.state.errors.length) {
      setShowSuccessModal(true);
      setTimeout(() => {
        if (onNavigateToSubmissions) {
          onNavigateToSubmissions();
        }
      }, 2000);
    }
  }, [form.state.isSubmitted, form.state.errors, onNavigateToSubmissions]);

  if (schemaLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="mb-8 space-y-3">
            <Skeleton variant="text" className="h-8 w-3/4" />
            <Skeleton variant="text" className="h-4 w-full" />
          </div>
          <Skeleton variant="form-field" count={6} />
        </div>
      </div>
    );
  }

  if (schemaError || !schema) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <FormEmptyState onRetry={() => retry()} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{schema.title}</h1>
        {schema.description && (
          <p className="text-gray-600 mb-8">{schema.description}</p>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
          onChange={handleFormChange}
        >
          {schema.fields.map((field) => (
            <form.Field key={field.id} name={field.name as any}>
              {(fieldApi) => {
                const value = fieldApi.state.value;
                const errors = fieldApi.state.meta.errors;
                const error = Array.isArray(errors) ? errors[0] : undefined;
                const fieldValidationError = validationErrors?.[field.name];
                const errorMessage = typeof error === 'string' ? error : (typeof fieldValidationError === 'string' ? fieldValidationError : undefined);

                return (
                  <FormRenderer
                    field={field}
                    value={value}
                    onChange={(newValue) => {
                      fieldApi.handleChange(newValue);
                    }}
                    onBlur={() => fieldApi.handleBlur()}
                    error={errorMessage}
                    disabled={isSubmitting}
                  />
                );
              }}
            </form.Field>
          ))}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting && (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={() => form.reset()}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed font-medium"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-gray-50 bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-sm mx-4 shadow-xl">
              <div className="flex items-center justify-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-900 mb-2">
                Success!
              </h3>
              <p className="text-center text-gray-600">
                Your form has been submitted successfully.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
