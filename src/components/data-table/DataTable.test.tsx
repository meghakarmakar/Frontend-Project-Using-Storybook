import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DataTable, type Column } from './DataTable';

interface User {
  id: number;
  name: string;
  email: string;
}

const columns: Column<User>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
];

const sampleData: User[] = [
  { id: 1, name: 'Charlie', email: 'c@example.com' },
  { id: 2, name: 'Alice', email: 'a@example.com' },
  { id: 3, name: 'Bob', email: 'b@example.com' },
];

describe('DataTable', () => {
  it('renders table with data', () => {
    render(<DataTable data={sampleData} columns={columns} />);
    expect(screen.getByText('Charlie')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('shows empty state when no data', () => {
    render(<DataTable data={[]} columns={columns} emptyMessage="Nothing here" />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('shows loading spinner when loading', () => {
    render(<DataTable data={[]} columns={columns} loading />);
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('sorts data when column header is clicked', () => {
    render(<DataTable data={sampleData} columns={columns} />);
    const nameHeader = screen.getByText('Name');

    // First click: ascending
    fireEvent.click(nameHeader);
    const rowsAsc = screen.getAllByRole('row').slice(1); // skip header row
    expect(rowsAsc[0]).toHaveTextContent('Alice');

    // Second click: descending
    fireEvent.click(nameHeader);
    const rowsDesc = screen.getAllByRole('row').slice(1);
    expect(rowsDesc[0]).toHaveTextContent('Charlie');
  });

  it('allows selecting rows', () => {
    const handleSelect = vi.fn();
    render(
      <DataTable data={sampleData} columns={columns} selectable onRowSelect={handleSelect} />
    );

    const checkbox = screen.getAllByRole('checkbox')[1]; // first row
    fireEvent.click(checkbox);

    expect(handleSelect).toHaveBeenCalledWith([sampleData[0]]);
  });

  it('allows select all / deselect all', () => {
    const handleSelect = vi.fn();
    render(
      <DataTable data={sampleData} columns={columns} selectable onRowSelect={handleSelect} />
    );

    const selectAll = screen.getByRole('checkbox', { name: /select all/i });
    fireEvent.click(selectAll);
    expect(handleSelect).toHaveBeenCalledWith(sampleData);

    fireEvent.click(selectAll);
    expect(handleSelect).toHaveBeenCalledWith([]);
  });
});
