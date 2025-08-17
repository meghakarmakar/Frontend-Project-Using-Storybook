import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InputField } from './InputField';

describe('InputField', () => {
  it('renders with a label', () => {
    render(<InputField label="Email" placeholder="Enter email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('shows helper text', () => {
    render(<InputField label="Name" helperText="Your full name" />);
    expect(screen.getByText('Your full name')).toBeInTheDocument();
  });

  it('shows error message when invalid', () => {
    render(
      <InputField
        label="Username"
        errorMessage="This field is required"
        invalid
      />
    );
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('disables input when disabled prop is true', () => {
    render(<InputField label="Disabled" disabled />);
    expect(screen.getByLabelText('Disabled')).toBeDisabled();
  });

  it('shows loading spinner when loading', () => {
    render(<InputField label="Loading" loading />);
    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });

  it('clears input when clear button is clicked', () => {
    const handleChange = vi.fn();
    render(
      <InputField
        label="Clearable"
        value="hello"
        clearable
        onChange={handleChange}
      />
    );
    const button = screen.getByRole('button', { name: /clear input/i });
    fireEvent.click(button);
    expect(handleChange).toHaveBeenCalled();
  });

  it('toggles password visibility', () => {
    render(
      <InputField
        label="Password"
        type="password"
        passwordToggle
        placeholder="Enter password"
      />
    );

    const input = screen.getByPlaceholderText('Enter password') as HTMLInputElement;
    const toggleBtn = screen.getByRole('button', { name: /show password/i });

    // Initially type is password
    expect(input.type).toBe('password');

    // Toggle → should switch to text
    fireEvent.click(toggleBtn);
    expect(input.type).toBe('text');
  });
});
