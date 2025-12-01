import React from 'react';

interface SkeletonProps {
  variant?: 'text' | 'form-field' | 'table-row' | 'table';
  count?: number;
  className?: string;
}

/**
 * Skeleton loader component for displaying loading states
 * Provides variants for different content types
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  count = 1,
  className = '',
}) => {
  const animationClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200';

  const renderTextSkeleton = () => (
    <div className={`${animationClasses} h-4 rounded ${className}`} />
  );

  const renderFormFieldSkeleton = () => (
    <div className="space-y-3">
      <div className={`${animationClasses} h-4 w-32 rounded`} />
      <div className={`${animationClasses} h-10 w-full rounded-md`} />
      <div className={`${animationClasses} h-3 w-40 rounded`} />
    </div>
  );

  const renderTableRowSkeleton = () => (
    <tr className="border-b border-gray-200">
      <td className="px-6 py-3">
        <div className={`${animationClasses} h-5 w-5 rounded`} />
      </td>
      <td className="px-6 py-3">
        <div className={`${animationClasses} h-4 w-20 rounded`} />
      </td>
      <td className="px-6 py-3">
        <div className={`${animationClasses} h-4 w-24 rounded`} />
      </td>
      <td className="px-6 py-3">
        <div className={`${animationClasses} h-4 w-24 rounded`} />
      </td>
      <td className="px-6 py-3">
        <div className={`${animationClasses} h-4 w-32 rounded`} />
      </td>
      <td className="px-6 py-3">
        <div className={`${animationClasses} h-4 w-24 rounded`} />
      </td>
      <td className="px-6 py-3">
        <div className={`${animationClasses} h-4 w-28 rounded`} />
      </td>
    </tr>
  );

  const renderTableSkeleton = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-6 py-3 text-left w-8">
              <div className={`${animationClasses} h-4 w-5 rounded`} />
            </th>
            <th className="px-6 py-3 text-left">
              <div className={`${animationClasses} h-4 w-12 rounded`} />
            </th>
            <th className="px-6 py-3 text-left">
              <div className={`${animationClasses} h-4 w-20 rounded`} />
            </th>
            <th className="px-6 py-3 text-left">
              <div className={`${animationClasses} h-4 w-20 rounded`} />
            </th>
            <th className="px-6 py-3 text-left">
              <div className={`${animationClasses} h-4 w-16 rounded`} />
            </th>
            <th className="px-6 py-3 text-left">
              <div className={`${animationClasses} h-4 w-20 rounded`} />
            </th>
            <th className="px-6 py-3 text-left">
              <div className={`${animationClasses} h-4 w-20 rounded`} />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: count }).map((_, i) => (
            <React.Fragment key={i}>
              {renderTableRowSkeleton()}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case 'form-field':
        return (
          <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i}>{renderFormFieldSkeleton()}</div>
            ))}
          </div>
        );
      case 'table-row':
        return renderTableRowSkeleton();
      case 'table':
        return renderTableSkeleton();
      case 'text':
      default:
        return (
          <div className="space-y-2">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i}>{renderTextSkeleton()}</div>
            ))}
          </div>
        );
    }
  };

  return renderContent();
};

/**
 * Loading overlay component for full-page loading states
 */
export const LoadingOverlay: React.FC = () => (
  <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
    <div className="flex flex-col items-center gap-4">
      <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-blue-600"></div>
      <p className="text-gray-600 font-medium">Loading...</p>
    </div>
  </div>
);
