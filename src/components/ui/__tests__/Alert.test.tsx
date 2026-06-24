import React from 'react';
import { render, screen } from '@testing-library/react';
import Alert from '../Alert';

describe('Alert', () => {
  describe('rendering', () => {
    it('should render the message text', () => {
      render(<Alert variant="info" message="Hello world" />);
      expect(screen.getByText('Hello world')).toBeInTheDocument();
    });

    it('should have role=alert for screen readers', () => {
      render(<Alert variant="error" message="Something went wrong" />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it('should apply error variant styling', () => {
      render(<Alert variant="error" message="Error occurred" />);
      const alert = screen.getByRole('alert');
      expect(alert.className).toContain('bg-red-50');
      expect(alert.className).toContain('text-red-800');
    });

    it('should apply success variant styling', () => {
      render(<Alert variant="success" message="Action completed" />);
      const alert = screen.getByRole('alert');
      expect(alert.className).toContain('bg-green-50');
      expect(alert.className).toContain('text-green-800');
    });

    it('should apply warning variant styling', () => {
      render(<Alert variant="warning" message="Be careful" />);
      const alert = screen.getByRole('alert');
      expect(alert.className).toContain('bg-yellow-50');
      expect(alert.className).toContain('text-yellow-800');
    });

    it('should apply info variant styling', () => {
      render(<Alert variant="info" message="FYI" />);
      const alert = screen.getByRole('alert');
      expect(alert.className).toContain('bg-blue-50');
      expect(alert.className).toContain('text-blue-800');
    });
  });

  describe('accessibility', () => {
    it('should have aria-hidden on the icon', () => {
      render(<Alert variant="error" message="Error" />);
      const icon = screen.getByText('✕');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('should announce message to screen readers via role=alert', () => {
      render(<Alert variant="success" message="Saved successfully" />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent('Saved successfully');
    });
  });
});
