// src/icons/Spinner.tsx
import * as React from 'react';

/**
 * Accessible loading spinner
 * - Used in InputField (loading state)
 * - Used in DataTable (loading state)
 * - Assignment requires: loading indicator + a11y
 */
export const Spinner: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => {
  return (
    <svg
      className={`animate-spin h-5 w-5 text-gray-500 dark:text-gray-400 ${className ?? ''}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      role="status"
      aria-label="Loading"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
};
