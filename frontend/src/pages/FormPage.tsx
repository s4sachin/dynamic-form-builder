import React, { useCallback, useMemo } from 'react';
import { useForm } from '@tanstack/react-form';
import { FormRenderer } from '../components/FormRenderer';
import { useFormSchema, useSubmitForm } from '../hooks';
import { Skeleton } from '../components/Skeleton';
import { FormEmptyState } from '../components/EmptyState';
import type { CreateSubmissionPayload } from '../types/submission';
import { createFormSubmissionSchema } from '../schemas/validation';

/**
 * Form page component that renders dynamic form using TanStack Form
 */
export const FormPage: React.FC = () => {
  const { schema, isLoading: schemaLoading, isError: schemaError, retry } = useFormSchema();
  const { submitAsync, isPending: submitting, validationErrors } = useSubmitForm();

  // Initialize form with TanStack Form
  const form = useForm({
    defaultValues: {
      formId: 'employee-onboarding',
      data: schema?.fields.reduce((acc, field) => {
        // Initialize switch fields with false
        if (field.type === 'switch') {
          acc[field.name] = false;
        }
        return acc;
      }, {} as Record<string, any>) || {},
    } as CreateSubmissionPayload,
    onSubmit: async ({ value }) => {
      try {
        // Build the submission payload with formId and data
        const submission: CreateSubmissionPayload = {
          formId: 'employee-onboarding',
          data: value.data
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

  // Check if form is valid - all required fields filled and validated
  const isFormValid = useMemo(() => {
    if (!schema) return false;
    
    const formData = form.state.values.data as Record<string, any>;
    
    // Check if all required fields are present and valid
    for (const field of schema.fields) {
      if (field.required) {
        const value = formData[field.name];
        
        // Check if value exists and is not empty
        if (value === undefined || value === null || value === '') {
          return false;
        }
        
        // For switch fields, must be true
        if (field.type === 'switch' && value !== true) {
          return false;
        }
        
        // For multi-select, must have at least one item
        if (field.type === 'multi-select' && (!Array.isArray(value) || value.length === 0)) {
          return false;
        }
      }
    }
    
    // Validate with Zod schema
    try {
      const validationSchema = createFormSubmissionSchema(schema);
      validationSchema.parse(formData);
      return true;
    } catch (error) {
      // Log validation errors for debugging
      console.log('Form validation failed:', error);
      return false;
    }
  }, [schema, form.state.values.data]);

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
              disabled={submitting || !isFormValid}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition-colors"
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
