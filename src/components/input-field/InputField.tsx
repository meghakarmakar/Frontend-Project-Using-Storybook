import * as React from 'react';
import { inputFieldStyles, type InputFieldStyleProps } from '../../lib/cva';
import { Spinner } from '../../icons/Spinner';

export interface InputFieldProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, // remove HTML size
    InputFieldStyleProps {
    label?: string;
    helperText?: string;
    errorMessage?: string;
    loading?: boolean;
    clearable?: boolean;
    passwordToggle?: boolean;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
    (
        {
            id,
            label,
            helperText,
            errorMessage,
            variant,
            size,
            invalid,
            disabled,
            loading,
            clearable,
            passwordToggle,
            type = 'text',
            value,
            onChange,
            className,
            ...props
        },
        ref
    ) => {
        const inputId = id ?? React.useId();
        const helperId = helperText ? `${inputId}-helper` : undefined;
        const errorId = errorMessage ? `${inputId}-error` : undefined;
        const [showPassword, setShowPassword] = React.useState(false);

        const isPassword = type === 'password';

        return (
            <div className="flex flex-col gap-1 w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                        {label}
                    </label>
                )}

                <div className="relative">
                    <input
                        id={inputId}
                        ref={ref}
                        type={isPassword && passwordToggle && showPassword ? 'text' : type}
                        value={value}
                        disabled={disabled}
                        aria-invalid={invalid || !!errorMessage}
                        aria-describedby={errorId ?? helperId}
                        aria-busy={loading}
                        onChange={onChange}
                        className={inputFieldStyles({ variant, size, invalid, className })}
                        {...props}
                    />

                    {/* Loading spinner */}
                    {loading && (
                        <div className="absolute inset-y-0 right-2 flex items-center">
                            <Spinner className="h-4 w-4" />
                        </div>
                    )}

                    {/* Clear button */}
                    {clearable && value && !loading && (
                        <button
                            type="button"
                            // Clear button handler
                            onClick={() => {
                                if (onChange) {
                                    const syntheticEvent = {
                                        target: { value: '' } as HTMLInputElement,
                                    } as React.ChangeEvent<HTMLInputElement>;
                                    onChange(syntheticEvent);
                                }
                            }}

                            className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            aria-label="Clear input"
                        >
                            ✕
                        </button>
                    )}

                    {/* Password toggle */}
                    {isPassword && passwordToggle && (
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    )}
                </div>

                {/* Helper or error text */}
                {errorMessage ? (
                    <p
                        id={errorId}
                        className="text-sm text-red-600 dark:text-red-400"
                    >
                        {errorMessage}
                    </p>
                ) : helperText ? (
                    <p
                        id={helperId}
                        className="text-sm text-gray-500 dark:text-gray-400"
                    >
                        {helperText}
                    </p>
                ) : null}
            </div>
        );
    }
);

InputField.displayName = 'InputField';
