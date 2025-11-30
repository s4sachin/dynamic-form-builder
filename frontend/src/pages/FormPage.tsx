import React, { useCallback } from 'react';
import { useForm } from '@tanstack/react-form';
import { FormRenderer } from '../components/FormRenderer';
import { useFormSchema, useSubmitForm } from '../hooks';
import type { CreateSubmissionPayload } from '../types/submission';

/**
 * Form page component that renders dynamic form using TanStack Form
 */
export const FormPage: React.FC = () => {
  const { schema, isLoading: schemaLoading, isError: schemaError } = useFormSchema();
  const { submitAsync, isPending: submitting, validationErrors } = useSubmitForm();

  // Initialize form with TanStack Form
  const form = useForm({
    defaultValues: {
      formId: 'employee-onboarding',
      data: {},
    } as CreateSubmissionPayload,
    onSubmit: async ({ value }) => {
      try {
        const response = await submitAsync(value);
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

  if (schemaLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="mb-4">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
          <p className="text-gray-600">Loading form...</p>
        </div>
      </div>
    );
  }

  if (schemaError || !schema) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load form schema</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
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
            <form.Field key={field.id} name={`data.${field.name}` as any}>
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
                    disabled={submitting}
                  />
                );
              }}
            </form.Field>
          ))}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={() => form.reset()}
              disabled={submitting}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed font-medium"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
