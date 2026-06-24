import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from '../Card';

describe('Card', () => {
  describe('rendering', () => {
    it('should render children content', () => {
      render(<Card><p>Card content</p></Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(<Card className="mt-4">Content</Card>);
      expect(container.firstChild).toHaveClass('mt-4');
    });

    it('should apply base styling', () => {
      const { container } = render(<Card>Content</Card>);
      expect(container.firstChild).toHaveClass('bg-white', 'rounded-lg', 'shadow-md');
    });
  });

  describe('click behavior', () => {
    it('should call onClick when clicked', async () => {
      const handleClick = jest.fn();
      render(<Card onClick={handleClick}>Clickable</Card>);
      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should have role=button when onClick is provided', () => {
      render(<Card onClick={() => {}}>Clickable</Card>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should not have role=button when onClick is not provided', () => {
      render(<Card>Static</Card>);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should be focusable when clickable', () => {
      render(<Card onClick={() => {}}>Focusable</Card>);
      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('should not be focusable when not clickable', () => {
      const { container } = render(<Card>Not focusable</Card>);
      expect(container.firstChild).not.toHaveAttribute('tabIndex');
    });
  });

  describe('keyboard navigation', () => {
    it('should trigger onClick on Enter key', async () => {
      const handleClick = jest.fn();
      render(<Card onClick={handleClick}>Keyboard</Card>);
      const card = screen.getByRole('button');
      card.focus();
      await userEvent.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should trigger onClick on Space key', async () => {
      const handleClick = jest.fn();
      render(<Card onClick={handleClick}>Keyboard</Card>);
      const card = screen.getByRole('button');
      card.focus();
      await userEvent.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
