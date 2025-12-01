import React, { useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { Submission } from '../types/submission';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Skeleton } from './Skeleton';
import { SubmissionsEmptyState } from './EmptyState';

interface SubmissionsTableProps {
  submissions: Submission[];
  isLoading?: boolean;
  onCreateNew?: () => void;
}

const columnHelper = createColumnHelper<Submission>();

/**
 * Submissions table component using TanStack Table
 */
export const SubmissionsTable: React.FC<SubmissionsTableProps> = ({
  submissions,
  isLoading = false,
  onCreateNew,
}) => {
  const [expanded, setExpanded] = useState({});

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const columns = [
    columnHelper.display({
      id: 'expander',
      header: '',
      size: 40,
      cell: ({ row }) => (
        <button
          onClick={() => row.toggleExpanded()}
          className="p-1 hover:bg-gray-100 rounded"
          aria-label={row.getIsExpanded() ? 'Collapse row' : 'Expand row'}
        >
          {row.getIsExpanded() ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>
      ),
    }),
    columnHelper.accessor('id', {
      header: 'ID',
      size: 120,
      cell: (info) => (
        <code className="text-sm font-mono text-gray-600">
          {info.getValue().substring(0, 12)}...
        </code>
      ),
    }),
    columnHelper.accessor(
      (row) => (row.data as any)?.firstName || '-',
      {
        id: 'firstName',
        header: 'First Name',
        size: 130,
        cell: (info) => <span className="text-sm text-gray-900">{info.getValue()}</span>,
      }
    ),
    columnHelper.accessor(
      (row) => (row.data as any)?.lastName || '-',
      {
        id: 'lastName',
        header: 'Last Name',
        size: 130,
        cell: (info) => <span className="text-sm text-gray-900">{info.getValue()}</span>,
      }
    ),
    columnHelper.accessor(
      (row) => (row.data as any)?.email || '-',
      {
        id: 'email',
        header: 'Email',
        size: 180,
        cell: (info) => <span className="text-sm text-gray-900">{info.getValue()}</span>,
      }
    ),
    columnHelper.accessor(
      (row) => (row.data as any)?.department || '-',
      {
        id: 'department',
        header: 'Department',
        size: 130,
        cell: (info) => <span className="text-sm text-gray-900">{info.getValue()}</span>,
      }
    ),
    columnHelper.accessor('createdAt', {
      header: 'Submitted',
      size: 150,
      cell: (info) => (
        <span className="text-sm text-gray-500">
          {formatDate(info.getValue())}
        </span>
      ),
    }),
  ];

  const table = useReactTable({
    data: submissions,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getRowCanExpand: () => true,
  });

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton variant="table" count={5} />
      </div>
    );
  }

  if (submissions.length === 0) {
    return <SubmissionsEmptyState onCreateNew={onCreateNew} />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-gray-200 bg-gray-50">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-700"
                  style={{ width: `${header.getSize()}px` }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <React.Fragment key={row.id}>
              <tr
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-3"
                    style={{ width: `${cell.column.columnDef.size}px` }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {row.getIsExpanded() && (
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td colSpan={row.getVisibleCells().length} className="px-6 py-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-700">Full Data</h4>
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto text-xs max-h-96">
                        {JSON.stringify(row.original.data, null, 2)}
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
