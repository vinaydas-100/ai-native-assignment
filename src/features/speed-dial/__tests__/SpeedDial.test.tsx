import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SpeedDial from '../components/SpeedDial';
import { SPEED_DIAL_ACTIONS } from '../data/speed-dial-contacts';

describe('SpeedDial', () => {
  describe('when rendered', () => {
    it('should render the FAB button with correct ARIA attributes', () => {
      render(<SpeedDial />);

      const fab = screen.getByRole('button', { name: /speed dial/i });
      expect(fab).toBeInTheDocument();
      expect(fab).toHaveAttribute('aria-expanded', 'false');
    });

    it('should not show actions when collapsed', () => {
      render(<SpeedDial />);

      expect(screen.queryByText('Police')).not.toBeInTheDocument();
      expect(screen.queryByText('Women Helpline')).not.toBeInTheDocument();
    });
  });

  describe('when expanded', () => {
    it('should show all action labels when FAB is clicked', async () => {
      render(<SpeedDial />);

      const fab = screen.getByRole('button', { name: /speed dial/i });
      await userEvent.click(fab);

      expect(fab).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText('Police')).toBeInTheDocument();
      expect(screen.getByText('Women Helpline')).toBeInTheDocument();
      expect(screen.getByText('Custom Emergency')).toBeInTheDocument();
    });

    it('should render tel: links for contacts with phone numbers', async () => {
      render(<SpeedDial />);

      const fab = screen.getByRole('button', { name: /speed dial/i });
      await userEvent.click(fab);

      const policeLink = screen.getByRole('link', { name: /call police at 100/i });
      expect(policeLink).toHaveAttribute('href', 'tel:100');

      const helplineLink = screen.getByRole('link', { name: /call women helpline at 1091/i });
      expect(helplineLink).toHaveAttribute('href', 'tel:1091');
    });

    it('should NOT render tel: link for contacts with empty phoneNumber', async () => {
      render(<SpeedDial />);

      const fab = screen.getByRole('button', { name: /speed dial/i });
      await userEvent.click(fab);

      const links = screen.getAllByRole('link');
      const customLink = links.find((link) =>
        link.getAttribute('href')?.includes('tel:')
        && link.getAttribute('aria-label')?.includes('Custom Emergency')
      );
      expect(customLink).toBeUndefined();
    });
  });

  describe('when collapsing', () => {
    it('should collapse when FAB is clicked again', async () => {
      render(<SpeedDial />);

      const fab = screen.getByRole('button', { name: /speed dial/i });
      await userEvent.click(fab);
      expect(fab).toHaveAttribute('aria-expanded', 'true');

      await userEvent.click(fab);
      expect(fab).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByText('Police')).not.toBeInTheDocument();
    });

    it('should collapse when Escape key is pressed', async () => {
      render(<SpeedDial />);

      const fab = screen.getByRole('button', { name: /speed dial/i });
      await userEvent.click(fab);
      expect(fab).toHaveAttribute('aria-expanded', 'true');

      await userEvent.keyboard('{Escape}');
      expect(fab).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByText('Police')).not.toBeInTheDocument();
    });
  });

  describe('keyboard accessibility', () => {
    it('should be focusable via keyboard', () => {
      render(<SpeedDial />);

      const fab = screen.getByRole('button', { name: /speed dial/i });
      fab.focus();
      expect(fab).toHaveFocus();
    });

    it('should allow tabbing through expanded action links', async () => {
      render(<SpeedDial />);

      const fab = screen.getByRole('button', { name: /speed dial/i });
      await userEvent.click(fab);

      const links = screen.getAllByRole('link');
      expect(links.length).toBe(2); // Only Police and Women Helpline have tel: links

      links[0].focus();
      expect(links[0]).toHaveFocus();
    });
  });

  describe('custom actions prop', () => {
    it('should render custom actions when provided', async () => {
      const customActions = [
        { id: '10', label: 'Ambulance', phoneNumber: '102', icon: 'phone' },
      ];

      render(<SpeedDial actions={customActions} />);

      const fab = screen.getByRole('button', { name: /speed dial/i });
      await userEvent.click(fab);

      expect(screen.getByText('Ambulance')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /call ambulance at 102/i })).toHaveAttribute('href', 'tel:102');
    });

    it('should use default SPEED_DIAL_ACTIONS when no actions prop is provided', async () => {
      render(<SpeedDial />);

      const fab = screen.getByRole('button', { name: /speed dial/i });
      await userEvent.click(fab);

      SPEED_DIAL_ACTIONS.filter((a) => a.phoneNumber).forEach((action) => {
        expect(
          screen.getByRole('link', { name: new RegExp(`call ${action.label}`, 'i') })
        ).toBeInTheDocument();
      });
    });
  });
});
