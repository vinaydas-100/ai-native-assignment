import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe('Button', () => {
  describe('rendering', () => {
    it('should render children text', () => {
      render(<Button variant="primary" size="md">Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('should render with correct type attribute', () => {
      render(<Button variant="primary" size="md" type="submit">Submit</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('should default type to button', () => {
      render(<Button variant="primary" size="md">Action</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });
  });

  describe('user interactions', () => {
    it('should call onClick when clicked', async () => {
      const handleClick = jest.fn();
      render(<Button variant="primary" size="md" onClick={handleClick}>Click</Button>);
      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', async () => {
      const handleClick = jest.fn();
      render(<Button variant="primary" size="md" onClick={handleClick} disabled>Click</Button>);
      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should not call onClick when loading', async () => {
      const handleClick = jest.fn();
      render(<Button variant="primary" size="md" onClick={handleClick} isLoading>Click</Button>);
      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('loading state', () => {
    it('should show spinner when loading', () => {
      render(<Button variant="primary" size="md" isLoading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button.querySelector('svg')).toBeInTheDocument();
    });

    it('should set aria-busy when loading', () => {
      render(<Button variant="primary" size="md" isLoading>Loading</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    });

    it('should be disabled when loading', () => {
      render(<Button variant="primary" size="md" isLoading>Loading</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('accessibility', () => {
    it('should apply aria-label when provided', () => {
      render(<Button variant="primary" size="md" ariaLabel="Close dialog">X</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Close dialog');
    });

    it('should be focusable via keyboard', () => {
      render(<Button variant="primary" size="md">Focus me</Button>);
      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
    });
  });

  describe('variants', () => {
    it('should apply primary variant classes', () => {
      render(<Button variant="primary" size="md">Primary</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-purple-600');
    });

    it('should apply danger variant classes', () => {
      render(<Button variant="danger" size="md">Danger</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-red-600');
    });

    it('should apply ghost variant classes', () => {
      render(<Button variant="ghost" size="md">Ghost</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-transparent');
    });
  });

  describe('sizes', () => {
    it('should apply small size classes', () => {
      render(<Button variant="primary" size="sm">Small</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('text-sm');
    });

    it('should apply large size classes', () => {
      render(<Button variant="primary" size="lg">Large</Button>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('text-lg');
    });
  });
});
