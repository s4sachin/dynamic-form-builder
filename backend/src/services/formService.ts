import fs from 'fs/promises';
import path from 'path';
import { FormSchema } from '../types/form';

let cachedFormSchema: FormSchema | null = null;

const SCHEMA_PATH = path.join(process.cwd(), 'data', 'formSchema.json');

export const getFormSchema = async (): Promise<FormSchema> => {
  if (cachedFormSchema) {
    return cachedFormSchema;
  }

  try {
    const fileContent = await fs.readFile(SCHEMA_PATH, 'utf-8');
    cachedFormSchema = JSON.parse(fileContent) as FormSchema;
    return cachedFormSchema;
  } catch (error) {
    console.error('Error reading form schema:', error);
    throw new Error('Failed to load form schema');
  }
};

export const invalidateFormSchemaCache = () => {
  cachedFormSchema = null;
};
