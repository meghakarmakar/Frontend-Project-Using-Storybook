import type { Meta, StoryObj } from '@storybook/react';
import { InputField, type InputFieldProps } from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
  args: {
    label: 'Label',
    placeholder: 'Enter text...',
    helperText: 'This is helper text',
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    clearable: { control: 'boolean' },
    passwordToggle: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: `
The **InputField** component supports multiple variants, sizes, states, and accessibility features.

### Features
- Variants: \`filled\`, \`outlined\`, \`ghost\`
- Sizes: \`sm\`, \`md\`, \`lg\`
- States: disabled, invalid, loading
- Optional: clear button, password toggle
- Accessibility: proper label association, \`aria-invalid\`, \`aria-busy\`, \`aria-describedby\`
- Theming: light/dark mode support via Tailwind's \`dark:\` classes
`,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof InputField>;

/**
 * Default input field
 */
export const Default: Story = {};

/**
 * All variants
 */
export const Variants: Story = {
  render: (args: InputFieldProps) => (
    <div className="space-y-4">
      <InputField {...args} variant="filled" label="Filled" />
      <InputField {...args} variant="outlined" label="Outlined" />
      <InputField {...args} variant="ghost" label="Ghost" />
    </div>
  ),
};

/**
 * All sizes
 */
export const Sizes: Story = {
  render: (args: InputFieldProps) => (
    <div className="space-y-4">
      <InputField {...args} size="sm" label="Small" />
      <InputField {...args} size="md" label="Medium" />
      <InputField {...args} size="lg" label="Large" />
    </div>
  ),
};

/**
 * States: invalid, disabled, loading
 */
export const States: Story = {
  render: (args: InputFieldProps) => (
    <div className="space-y-4">
      <InputField {...args} invalid errorMessage="Invalid entry" label="Invalid" />
      <InputField {...args} disabled label="Disabled" />
      <InputField {...args} loading label="Loading" />
    </div>
  ),
};

/**
 * With clear button
 */
export const Clearable: Story = {
  args: {
    clearable: true,
    value: 'Some text',
  },
};

/**
 * Password with toggle
 */
export const PasswordToggle: Story = {
  args: {
    type: 'password',
    passwordToggle: true,
    placeholder: 'Enter password',
  },
};
