import { z } from 'zod';
import type { FormSchema, FormField } from '../types/form';

export const createFieldValidationSchema = (field: FormField): z.ZodTypeAny => {
  let schema: z.ZodTypeAny;

  switch (field.type) {
    case 'text': {
      let textSchema = z.string();
      if (field.validation?.minLength) {
        textSchema = textSchema.min(field.validation.minLength, `Minimum ${field.validation.minLength} characters`);
      }
      if (field.validation?.maxLength) {
        textSchema = textSchema.max(field.validation.maxLength, `Maximum ${field.validation.maxLength} characters`);
      }
      if (field.validation?.regex) {
        textSchema = textSchema.refine(
          (val) => new RegExp(field.validation!.regex!).test(val),
          'Invalid format'
        );
      }
      schema = textSchema;
      break;
    }

    case 'number': {
      let numberSchema = z.coerce.number();
      if (field.validation?.min !== undefined) {
        numberSchema = numberSchema.min(field.validation.min, `Minimum value: ${field.validation.min}`);
      }
      if (field.validation?.max !== undefined) {
        numberSchema = numberSchema.max(field.validation.max, `Maximum value: ${field.validation.max}`);
      }
      schema = numberSchema;
      break;
    }

    case 'select':
      schema = z.string().min(1, 'Please select an option');
      break;

    case 'multi-select': {
      let multiSchema = z.array(z.string()).min(1, 'Select at least one option');
      if (field.validation?.minSelected) {
        multiSchema = multiSchema.min(field.validation.minSelected, `Select at least ${field.validation.minSelected} option(s)`);
      }
      if (field.validation?.maxSelected) {
        multiSchema = multiSchema.max(field.validation.maxSelected, `Select maximum ${field.validation.maxSelected} option(s)`);
      }
      schema = multiSchema;
      break;
    }

    case 'date': {
      let dateSchema = z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        'Invalid date format'
      );
      if (field.validation?.minDate) {
        dateSchema = dateSchema.refine(
          (val) => new Date(val) >= new Date(field.validation!.minDate!),
          `Date must be ${field.validation.minDate} or later`
        );
      }
      schema = dateSchema;
      break;
    }

    case 'textarea': {
      let textareaSchema = z.string();
      if (field.validation?.minLength) {
        textareaSchema = textareaSchema.min(field.validation.minLength);
      }
      if (field.validation?.maxLength) {
        textareaSchema = textareaSchema.max(field.validation.maxLength);
      }
      schema = textareaSchema;
      break;
    }

    case 'switch':
      schema = z.boolean();
      break;

    default:
      schema = z.unknown();
  }

  return field.required ? schema : schema.optional();
};

export const createFormSubmissionSchema = (formSchema: FormSchema) => {
  const fields: Record<string, z.ZodTypeAny> = {};

  for (const field of formSchema.fields) {
    fields[field.name] = createFieldValidationSchema(field);
  }

  return z.object(fields);
};
