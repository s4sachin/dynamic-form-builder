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
 * Switch (toggle) field component for boolean values
 */
export const SwitchField: React.FC<FieldComponentProps> = ({
  field,
  value,
  onChange,
  onBlur,
  error,
  disabled,
}) => {
  const isChecked = Boolean(value);

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <label htmlFor={field.id} className="flex items-center cursor-pointer">
          <div
            className={clsx(
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
              isChecked ? 'bg-blue-600' : 'bg-gray-300',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <input
              id={field.id}
              type="checkbox"
              checked={isChecked}
              onChange={(e) => onChange(e.target.checked)}
              onBlur={onBlur}
              disabled={disabled}
              className="sr-only"
            />
            <span
              className={clsx(
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                isChecked ? 'translate-x-6' : 'translate-x-1'
              )}
            />
          </div>
          <span className={clsx('ml-3 text-sm font-medium', disabled && 'text-gray-500')}>
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </span>
        </label>
      </div>
      {field.description && (
        <p className="text-sm text-gray-500">{field.description}</p>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
