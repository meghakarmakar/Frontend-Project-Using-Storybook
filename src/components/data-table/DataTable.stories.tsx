import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, type Column } from './DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const sampleData: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'Editor' },
];

const columns: Column<User>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role', sortable: true },
];

const meta: Meta<typeof DataTable<User>> = {
  title: 'Components/DataTable',
  component: DataTable<User>,
  tags: ['autodocs'],
  args: {
    data: sampleData,
    columns,
  },
  parameters: {
    docs: {
      description: {
        component: `
The **DataTable** displays tabular data with optional sorting, row selection, loading and empty states.

### Features
- Sortable columns with \`aria-sort\`
- Row selection (with select-all)
- Loading state with spinner
- Empty state fallback
- Accessibility: semantic \`<table>\`, proper headers, focusable checkboxes
- Theming: light/dark mode supported
`,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof DataTable<User>>;

/**
 * Default table with sample data
 */
export const Default: Story = {};

/**
 * With sortable columns
 */
export const Sortable: Story = {
  args: {
    data: sampleData,
    columns,
  },
};

/**
 * With row selection
 */
export const Selectable: Story = {
  args: {
    selectable: true,
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    loading: true,
    data: [],
  },
};

/**
 * Empty state
 */
export const Empty: Story = {
  args: {
    data: [],
  },
};
