import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const mockRegister = jest.fn();
const mockHandleSubmit = jest.fn();
const mockOnSubmit = jest.fn();

let mockErrors: Record<string, { message?: string }> = {};
let mockFormError: string | null = null;
let mockIsSubmitting = false;

jest.mock('../hooks/useLogin', () => ({
  useLogin: () => ({
    register: mockRegister,
    handleSubmit: mockHandleSubmit.mockImplementation((fn) => (e?: React.BaseSyntheticEvent) => {
      e?.preventDefault?.();
      fn();
    }),
    errors: mockErrors,
    formError: mockFormError,
    isSubmitting: mockIsSubmitting,
    onSubmit: mockOnSubmit,
  }),
}));

const renderForm = () => {
  return render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
};

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockErrors = {};
    mockFormError = null;
    mockIsSubmitting = false;
  });

  describe('rendering', () => {
    it('should render the login form with email and password fields', () => {
      renderForm();

      expect(screen.getByRole('form', { name: /login form/i })).toBeInTheDocument();
      expect(screen.getByText('Welcome Back')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Password')).toBeInTheDocument();
    });

    it('should render a submit button with Login text', () => {
      renderForm();

      const button = screen.getByRole('button', { name: /login/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('should render a link to register page', () => {
      renderForm();

      const link = screen.getByRole('link', { name: /register/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/register');
    });

    it('should call register from the hook for each input field', () => {
      renderForm();

      expect(mockRegister).toHaveBeenCalledWith('email');
      expect(mockRegister).toHaveBeenCalledWith('password');
    });
  });

  describe('form-level API error', () => {
    it('should display form-level API error using Alert component', () => {
      mockFormError = 'Invalid email or password';
      renderForm();

      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
    });

    it('should not display Alert when there is no form error', () => {
      mockFormError = null;
      renderForm();

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('field-level validation errors', () => {
    it('should display field-level errors for email and password', () => {
      mockErrors = {
        email: { message: 'Email is required' },
        password: { message: 'Password is required' },
      };
      renderForm();

      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  describe('loading state', () => {
    it('should disable the submit button when submitting', () => {
      mockIsSubmitting = true;
      renderForm();

      const button = screen.getByRole('button', { name: /login/i });
      expect(button).toBeDisabled();
    });

    it('should show loading state on button when submitting', () => {
      mockIsSubmitting = true;
      renderForm();

      const button = screen.getByRole('button', { name: /login/i });
      expect(button).toHaveAttribute('aria-busy', 'true');
    });
  });

  describe('form submission', () => {
    it('should call handleSubmit with onSubmit when form is submitted', async () => {
      renderForm();

      const button = screen.getByRole('button', { name: /login/i });
      await userEvent.click(button);

      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });
});
