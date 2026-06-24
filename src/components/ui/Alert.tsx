import React from 'react';

interface AlertProps {
  variant: 'error' | 'success' | 'warning' | 'info';
  message: string;
}

const variantClasses: Record<AlertProps['variant'], string> = {
  error: 'bg-red-50 text-red-800 border-red-300',
  success: 'bg-green-50 text-green-800 border-green-300',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-300',
  info: 'bg-blue-50 text-blue-800 border-blue-300',
};

const variantIcons: Record<AlertProps['variant'], string> = {
  error: '✕',
  success: '✓',
  warning: '⚠',
  info: 'ℹ',
};

const Alert: React.FC<AlertProps> = ({ variant, message }) => {
  return (
    <div
      role="alert"
      className={`
        flex items-center gap-2 px-4 py-3 border rounded-lg text-sm
        ${variantClasses[variant]}
      `}
    >
      <span className="flex-shrink-0 font-bold" aria-hidden="true">
        {variantIcons[variant]}
      </span>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
