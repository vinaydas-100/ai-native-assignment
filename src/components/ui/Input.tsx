import React from 'react';

interface InputProps {
  label: string;
  name: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'select';
  error?: string;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
}

const Input = React.forwardRef<
  HTMLInputElement | HTMLSelectElement,
  InputProps & React.InputHTMLAttributes<HTMLInputElement> & React.SelectHTMLAttributes<HTMLSelectElement>
>(({ label, name, type, error, placeholder, options, ...rest }, ref) => {
  const errorId = `${name}-error`;
  const inputId = `${name}-input`;

  const baseClasses = `
    w-full px-3 py-2 border rounded-lg text-sm
    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
    transition-all duration-200 ease-in-out
    ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}
  `;

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>

      {type === 'select' ? (
        <select
          id={inputId}
          name={name}
          ref={ref as React.Ref<HTMLSelectElement>}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={!!error}
          className={baseClasses}
          {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)}
        >
          <option value="">{placeholder || 'Select an option'}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          ref={ref as React.Ref<HTMLInputElement>}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={!!error}
          className={baseClasses}
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error && (
        <p
          id={errorId}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
