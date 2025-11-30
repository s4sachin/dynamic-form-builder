import React from 'react';
import type { FormField } from '../types/form';
import {
  TextField,
  NumberField,
  SelectField,
  MultiSelectField,
  DateField,
  TextAreaField,
  SwitchField,
} from './fields';

interface FormRendererProps {
  field: FormField;
  value: unknown;
  onChange: (value: unknown) => void;
  onBlur: () => void;
  error?: string;
  disabled?: boolean;
}

/**
 * Dynamic form field renderer that maps field types to components
 */
export const FormRenderer: React.FC<FormRendererProps> = ({
  field,
  value,
  onChange,
  onBlur,
  error,
  disabled,
}) => {
  const commonProps = {
    field,
    value,
    onChange,
    onBlur,
    error,
    disabled,
  };

  switch (field.type) {
    case 'text':
      return <TextField {...commonProps} />;
    case 'number':
      return <NumberField {...commonProps} />;
    case 'select':
      return <SelectField {...commonProps} />;
    case 'multi-select':
      return <MultiSelectField {...commonProps} />;
    case 'date':
      return <DateField {...commonProps} />;
    case 'textarea':
      return <TextAreaField {...commonProps} />;
    case 'switch':
      return <SwitchField {...commonProps} />;
    default:
      // Exhaustive check will catch missing types at compile time
      const _exhaustiveCheck: never = field.type;
      return _exhaustiveCheck;
  }
};
