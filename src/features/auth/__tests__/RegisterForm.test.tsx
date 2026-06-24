import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

const mockRegister = jest.fn();
const mockHandleSubmit = jest.fn();
const mockOnSubmit = jest.fn();

let mockErrors: Record<string, { message?: string }> = {};
let mockFormError: string | null = null;
let mockIsSubmitting = false;

jest.mock('../hooks/useRegister', () => ({
  useRegister: () => ({
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
      <RegisterForm />
    </MemoryRouter>
  );
};

describe('RegisterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockErrors = {};
    mockFormError = null;
    mockIsSubmitting = false;
  });

  describe('rendering', () => {
    it('should render the registration form with all fields', () => {
      renderForm();

      expect(screen.getByRole('form', { name: /registration form/i })).toBeInTheDocument();
      expect(screen.getByText('Create Account')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Password')).toBeInTheDocument();
      expect(screen.getByText('Confirm Password')).toBeInTheDocument();
      expect(screen.getByText('Gender')).toBeInTheDocument();
    });

    it('should render a submit button with Register text', () => {
      renderForm();

      const button = screen.getByRole('button', { name: /register/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('should render a link to login page', () => {
      renderForm();

      const link = screen.getByRole('link', { name: /login/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/login');
    });

    it('should call register from the hook for each input field', () => {
      renderForm();

      expect(mockRegister).toHaveBeenCalledWith('name');
      expect(mockRegister).toHaveBeenCalledWith('email');
      expect(mockRegister).toHaveBeenCalledWith('password');
      expect(mockRegister).toHaveBeenCalledWith('confirmPassword');
      expect(mockRegister).toHaveBeenCalledWith('gender');
    });
  });

  describe('form-level API error', () => {
    it('should display form-level API error using Alert component', () => {
      mockFormError = 'Email already exists';
      renderForm();

      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(screen.getByText('Email already exists')).toBeInTheDocument();
    });

    it('should not display Alert when there is no form error', () => {
      mockFormError = null;
      renderForm();

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('field-level validation errors', () => {
    it('should display field-level errors for each field', () => {
      mockErrors = {
        name: { message: 'Name must be at least 2 characters' },
        email: { message: 'Invalid email format' },
        password: { message: 'Password must be at least 8 characters' },
        confirmPassword: { message: 'Passwords do not match' },
        gender: { message: 'This application is available to women only' },
      };
      renderForm();

      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
      expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
      expect(screen.getByText('This application is available to women only')).toBeInTheDocument();
    });
  });

  describe('loading state', () => {
    it('should disable the submit button when submitting', () => {
      mockIsSubmitting = true;
      renderForm();

      const button = screen.getByRole('button', { name: /register/i });
      expect(button).toBeDisabled();
    });

    it('should show loading state on button when submitting', () => {
      mockIsSubmitting = true;
      renderForm();

      const button = screen.getByRole('button', { name: /register/i });
      expect(button).toHaveAttribute('aria-busy', 'true');
    });
  });

  describe('form submission', () => {
    it('should call handleSubmit with onSubmit when form is submitted', async () => {
      renderForm();

      const button = screen.getByRole('button', { name: /register/i });
      await userEvent.click(button);

      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });
});
