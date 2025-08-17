// src/lib/cva.ts
import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Input styles
 * Matches assignment requirements:
 *  - Variants: filled | outlined | ghost
 *  - Sizes: sm | md | lg
 *  - Invalid, disabled, loading states supported
 */
export const inputFieldStyles = cva(
  'block w-full rounded-md outline-none transition disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2',
  {
    variants: {
      variant: {
        filled:
          'bg-gray-100 dark:bg-gray-800 border border-transparent focus:ring-blue-500',
        outlined:
          'bg-transparent border border-gray-300 dark:border-gray-600 focus:ring-blue-500',
        ghost:
          'bg-transparent border border-transparent focus:ring-blue-500',
      },
      size: {
        sm: 'text-sm px-2.5 py-1.5',
        md: 'text-base px-3 py-2',
        lg: 'text-lg px-3.5 py-2.5',
      },
      invalid: {
        true: 'border-red-500 dark:border-red-400 focus:ring-red-500',
      },
    },
    compoundVariants: [
      {
        variant: 'outlined',
        invalid: true,
        class: 'border-red-500',
      },
    ],
    defaultVariants: {
      variant: 'outlined',
      size: 'md',
    },
  }
);

export type InputFieldStyleProps = VariantProps<typeof inputFieldStyles>;
