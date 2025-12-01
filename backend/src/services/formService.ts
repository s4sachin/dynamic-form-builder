import { formSchema } from '../data/formSchema';
import { FormSchema } from '../types/form';

export const getFormSchema = async (): Promise<FormSchema> => {
  return formSchema;
};

export const invalidateFormSchemaCache = () => {
  // No-op since we're using embedded data
};
