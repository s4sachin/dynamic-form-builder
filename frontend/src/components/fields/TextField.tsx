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
 * Text input field component
 */
export const TextField: React.FC<FieldComponentProps> = ({
  field,
  value,
  onChange,
  onBlur,
  error,
  disabled,
}) => {
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
        type="text"
        placeholder={field.placeholder}
        value={String(value || '')}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        className={clsx(
          'w-full px-3 py-2 border rounded-md shadow-sm',
          'focus:outline-none focus:ring-blue-500 focus:border-blue-500',
          'disabled:bg-gray-100 disabled:text-gray-500',
          error ? 'border-red-500' : 'border-gray-300'
        )}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
