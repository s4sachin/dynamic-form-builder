export type FieldType = 'text' | 'number' | 'select' | 'multi-select' | 'date' | 'textarea' | 'switch';

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldValidation {
  minLength?: number;
  maxLength?: number;
  regex?: string;
  min?: number;
  max?: number;
  minDate?: string;
  minSelected?: number;
  maxSelected?: number;
}

export interface FormField {
  id: string;
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  description?: string;
  required: boolean;
  options?: FieldOption[];
  validation?: FieldValidation;
}

export interface FormSchema {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
}
