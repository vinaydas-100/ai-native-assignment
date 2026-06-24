/**
 * Centralized Tailwind theme tokens for consistent styling across components.
 * Use these class strings to maintain a unified design system.
 */

export const colors = {
  primary: {
    base: 'bg-purple-600 text-white',
    hover: 'hover:bg-purple-700',
    focus: 'focus:ring-purple-500',
    text: 'text-purple-600',
    border: 'border-purple-600',
  },
  secondary: {
    base: 'bg-gray-200 text-gray-800',
    hover: 'hover:bg-gray-300',
    focus: 'focus:ring-gray-400',
    text: 'text-gray-700',
    border: 'border-gray-300',
  },
  danger: {
    base: 'bg-red-600 text-white',
    hover: 'hover:bg-red-700',
    focus: 'focus:ring-red-500',
    text: 'text-red-600',
    border: 'border-red-600',
  },
  success: {
    base: 'bg-green-50 text-green-800',
    border: 'border-green-300',
    icon: 'text-green-500',
  },
  warning: {
    base: 'bg-yellow-50 text-yellow-800',
    border: 'border-yellow-300',
    icon: 'text-yellow-500',
  },
  info: {
    base: 'bg-blue-50 text-blue-800',
    border: 'border-blue-300',
    icon: 'text-blue-500',
  },
  error: {
    base: 'bg-red-50 text-red-800',
    border: 'border-red-300',
    icon: 'text-red-500',
  },
} as const;

export const spacing = {
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
} as const;

export const borderRadius = {
  sm: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
} as const;

export const fontSize = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
} as const;

export const shadows = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
} as const;

export const transitions = {
  base: 'transition-all duration-200 ease-in-out',
  fast: 'transition-all duration-150 ease-in-out',
  slow: 'transition-all duration-300 ease-in-out',
} as const;
