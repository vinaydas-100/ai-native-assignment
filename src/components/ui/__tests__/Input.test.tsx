import React from 'react';
import { render, screen } from '@testing-library/react';
import Input from '../Input';

describe('Input', () => {
  describe('rendering', () => {
    it('should render with label', () => {
      render(<Input label="Email" name="email" type="email" />);
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('should render a text input by default', () => {
      render(<Input label="Name" name="name" type="text" />);
      expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
    });

    it('should render placeholder text', () => {
      render(<Input label="Email" name="email" type="email" placeholder="Enter email" />);
      expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    });
  });

  describe('select support', () => {
    it('should render a select dropdown when type is select', () => {
      const options = [
        { value: 'female', label: 'Female' },
        { value: 'male', label: 'Male' },
      ];
      render(<Input label="Gender" name="gender" type="select" options={options} />);
      expect(screen.getByRole('combobox', { name: /gender/i })).toBeInTheDocument();
    });

    it('should render all options', () => {
      const options = [
        { value: 'female', label: 'Female' },
        { value: 'male', label: 'Male' },
      ];
      render(<Input label="Gender" name="gender" type="select" options={options} />);
      expect(screen.getByRole('option', { name: 'Female' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Male' })).toBeInTheDocument();
    });

    it('should render default placeholder option', () => {
      const options = [{ value: 'female', label: 'Female' }];
      render(<Input label="Gender" name="gender" type="select" options={options} />);
      expect(screen.getByRole('option', { name: 'Select an option' })).toBeInTheDocument();
    });

    it('should use custom placeholder for select', () => {
      const options = [{ value: 'female', label: 'Female' }];
      render(<Input label="Gender" name="gender" type="select" options={options} placeholder="Choose gender" />);
      expect(screen.getByRole('option', { name: 'Choose gender' })).toBeInTheDocument();
    });
  });

  describe('error state', () => {
    it('should display error message', () => {
      render(<Input label="Email" name="email" type="email" error="Invalid email" />);
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });

    it('should set aria-invalid when error exists', () => {
      render(<Input label="Email" name="email" type="email" error="Invalid" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('should link error with aria-describedby', () => {
      render(<Input label="Email" name="email" type="email" error="Invalid email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'email-error');
      expect(screen.getByText('Invalid email')).toHaveAttribute('id', 'email-error');
    });

    it('should not render error element when no error', () => {
      render(<Input label="Email" name="email" type="email" />);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have associated label via htmlFor', () => {
      render(<Input label="Password" name="password" type="password" />);
      const input = document.getElementById('password-input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('name', 'password');
    });

    it('should not have aria-describedby when no error', () => {
      render(<Input label="Name" name="name" type="text" />);
      expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-describedby');
    });

    it('should mark error messages with role alert', () => {
      render(<Input label="Email" name="email" type="email" error="Required" />);
      expect(screen.getByRole('alert')).toHaveTextContent('Required');
    });
  });

  describe('forwardRef', () => {
    it('should forward ref to input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input label="Name" name="name" type="text" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('should forward ref to select element', () => {
      const ref = React.createRef<HTMLSelectElement>();
      const options = [{ value: 'a', label: 'A' }];
      render(<Input label="Choice" name="choice" type="select" options={options} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    });
  });
});
