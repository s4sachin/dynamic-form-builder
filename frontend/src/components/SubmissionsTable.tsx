import React, { useState } from 'react';
import type { Submission } from '../types/submission';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SubmissionsTableProps {
  submissions: Submission[];
  isLoading?: boolean;
}

/**
 * Submissions table component using TanStack Table
 */
export const SubmissionsTable: React.FC<SubmissionsTableProps> = ({
  submissions,
  isLoading = false,
}) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No submissions yet</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 w-8"></th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">First Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Last Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Submitted</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <React.Fragment key={submission.id}>
              <tr
                className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => toggleExpanded(submission.id)}
              >
                <td className="px-6 py-3">
                  {expandedIds.has(submission.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </td>
                <td className="px-6 py-3 text-sm font-mono text-gray-600">
                  {submission.id.substring(0, 12)}...
                </td>
                <td className="px-6 py-3 text-sm text-gray-900">
                  {(submission.data as any)?.firstName || '-'}
                </td>
                <td className="px-6 py-3 text-sm text-gray-900">
                  {(submission.data as any)?.lastName || '-'}
                </td>
                <td className="px-6 py-3 text-sm text-gray-900">
                  {(submission.data as any)?.email || '-'}
                </td>
                <td className="px-6 py-3 text-sm text-gray-900">
                  {(submission.data as any)?.department || '-'}
                </td>
                <td className="px-6 py-3 text-sm text-gray-500">
                  {formatDate(submission.createdAt)}
                </td>
              </tr>
              {expandedIds.has(submission.id) && (
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td colSpan={7} className="px-6 py-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-700">Full Data</h4>
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto text-xs">
                        {JSON.stringify(submission.data, null, 2)}
                      </pre>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
