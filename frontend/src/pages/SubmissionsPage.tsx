import React, { useState } from 'react';
import { SubmissionsTable } from '../components/SubmissionsTable';
import { useSubmissions } from '../hooks';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type SortOrder = 'asc' | 'desc';

interface SubmissionsPageProps {
  onNavigateToForm?: () => void;
}

/**
 * Submissions page component with pagination and sorting
 */
export const SubmissionsPage: React.FC<SubmissionsPageProps> = ({ onNavigateToForm }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const {
    submissions,
    pagination,
    isLoading,
    isError,
    error,
    refetch,
  } = useSubmissions({
    page,
    limit,
    sortOrder,
  });

  const handlePreviousPage = () => {
    if (pagination?.hasPreviousPage) {
      setPage((p) => Math.max(1, p - 1));
    }
  };

  const handleNextPage = () => {
    if (pagination?.hasNextPage) {
      setPage((p) => p + 1);
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1); // Reset to first page when changing limit
  };

  const handleSortChange = () => {
    setSortOrder((current) => (current === 'asc' ? 'desc' : 'asc'));
  };

  const handleCreateNew = () => {
    onNavigateToForm?.();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Form Submissions</h1>

          {isError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700">
                {error instanceof Error ? error.message : 'Failed to load submissions'}
              </p>
              <button
                onClick={() => refetch()}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium"
              >
                Retry
              </button>
            </div>
          )}

          {/* Controls */}
          {!isLoading && (
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-2 items-center">
                <label htmlFor="limit" className="text-sm font-medium text-gray-700">
                  Items per page:
                </label>
                <select
                  id="limit"
                  value={limit}
                  onChange={handleLimitChange}
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <button
                onClick={handleSortChange}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
              >
                Sort: {sortOrder === 'asc' ? 'Oldest' : 'Newest'} First
              </button>
            </div>
          )}

          {/* Table */}
          <SubmissionsTable 
            submissions={submissions || []} 
            isLoading={isLoading}
            onCreateNew={handleCreateNew}
          />

          {/* Pagination Info and Controls */}
          {pagination && !isLoading && submissions && submissions.length > 0 && (
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-600">
                Page <span className="font-semibold">{pagination.page}</span> of{' '}
                <span className="font-semibold">{pagination.totalPages}</span>
                {' • '}
                <span className="font-semibold">{pagination.total}</span> total submissions
              </p>

              <div className="flex gap-2">
                <button
                  onClick={handlePreviousPage}
                  disabled={!pagination.hasPreviousPage}
                  className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <input
                  type="number"
                  value={page}
                  onChange={(e) => {
                    const newPage = Math.max(1, Number(e.target.value));
                    if (newPage <= pagination.totalPages) {
                      setPage(newPage);
                    }
                  }}
                  min={1}
                  max={pagination.totalPages}
                  className="w-16 px-3 py-2 border border-gray-300 rounded-md text-center text-sm"
                />

                <button
                  onClick={handleNextPage}
                  disabled={!pagination.hasNextPage}
                  className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
