import { FormField } from '../types/form';
import clsx from 'clsx';

interface FieldComponentProps {
  field: FormField;
  value: unknown;
  onChange: (value: unknown) => void;
  onBlur: () => void;
  error?: string;
  disabled?: boolean;
}

/**
 * Date field component
 */
export const DateField: React.FC<FieldComponentProps> = ({
  field,
  value,
  onChange,
  onBlur,
  error,
  disabled,
}) => {
  const dateValue = value ? new Date(value as string).toISOString().split('T')[0] : '';
  
  // Extract minDate from validation if available
  const minDate = field.validation?.minDate;

  return (
    <div className="space-y-2">
      <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {field.description && (
        <p className="text-sm text-gray-500">{field.description}</p>
      )}
      <input
        id={field.id}
        type="date"
        value={dateValue}
        onChange={(e) => onChange(e.target.value || null)}
        onBlur={onBlur}
        disabled={disabled}
        min={minDate}
        className={clsx(
          'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500',
          error
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300'
        )}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
