import React from 'react';
import { FileText, InboxIcon } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: 'form' | 'submissions';
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Empty state component for displaying when no data is available
 * Provides helpful messaging and optional call-to-action
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No data available',
  description = 'There is nothing to display at this time.',
  icon = 'submissions',
  action,
}) => {
  const Icon = icon === 'form' ? FileText : InboxIcon;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-gray-400 mb-4">
        <Icon className="w-16 h-16" />
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
        {title}
      </h3>

      <p className="text-gray-500 text-center max-w-sm mb-6">
        {description}
      </p>

      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

/**
 * Form empty state variant
 */
export const FormEmptyState: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => (
  <EmptyState
    icon="form"
    title="Unable to load form"
    description="There was a problem loading the form. Please try again."
    action={
      onRetry
        ? {
            label: 'Retry',
            onClick: onRetry,
          }
        : undefined
    }
  />
);

/**
 * Submissions empty state variant
 */
export const SubmissionsEmptyState: React.FC<{ onCreateNew?: () => void }> = ({
  onCreateNew,
}) => (
  <EmptyState
    icon="submissions"
    title="No submissions yet"
    description="There are no form submissions to display. Start by creating a new submission."
    action={
      onCreateNew
        ? {
            label: 'Create New Submission',
            onClick: onCreateNew,
          }
        : undefined
    }
  />
);
