import * as React from 'react';
import { Spinner } from '../../icons/Spinner';

export interface Column<T> {
  key: keyof T;
  header: string;
  width?: number | string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  emptyMessage?: string;
}

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  emptyMessage = 'No data available',
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<keyof T | null>(null);
  const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = React.useState<Set<string | number>>(new Set());

  const toggleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal === bVal) return 0;
      if (aVal == null) return -1;
      if (bVal == null) return 1;
      return sortDir === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [data, sortKey, sortDir]);

  const handleSelect = (row: T) => {
    if (!row.id) return; // requires row.id
    const newSelected = new Set(selected);
    if (newSelected.has(row.id)) {
      newSelected.delete(row.id);
    } else {
      newSelected.add(row.id);
    }
    setSelected(newSelected);
    onRowSelect?.(data.filter((d) => d.id && newSelected.has(d.id)));
  };

  const handleSelectAll = () => {
    if (selected.size === data.length) {
      setSelected(new Set());
      onRowSelect?.([]);
    } else {
      const all = new Set(data.map((d) => d.id!).filter(Boolean));
      setSelected(all);
      onRowSelect?.(data.filter((d) => d.id && all.has(d.id)));
    }
  };

  return (
    <div className="overflow-x-auto">
      <table
        className="min-w-full border border-gray-200 dark:border-gray-700"
        aria-busy={loading}
      >
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {selectable && (
              <th scope="col" className="p-2 text-left">
                <input
                  type="checkbox"
                  aria-label="Select all rows"
                  checked={selected.size === data.length && data.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={String(col.key)}
                scope="col"
                className="p-2 text-left font-medium text-gray-700 dark:text-gray-200 cursor-pointer select-none"
                style={{ width: col.width }}
                onClick={() => col.sortable && toggleSort(col.key)}
                aria-sort={
                  sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'
                }
              >
                {col.header}
                {col.sortable && sortKey === col.key && (sortDir === 'asc' ? ' ▲' : ' ▼')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-4 text-center">
                <Spinner className="h-6 w-6 mx-auto" />
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="p-4 text-center text-gray-500 dark:text-gray-400"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((row) => (
              <tr
                key={row.id ?? JSON.stringify(row)}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                {selectable && (
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={row.id ? selected.has(row.id) : false}
                      onChange={() => handleSelect(row)}
                      aria-label={`Select row`}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={String(col.key)} className="p-2 text-gray-900 dark:text-gray-100">
                    {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
