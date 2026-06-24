import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavigationMenu from '../components/NavigationMenu';

const renderWithRouter = (initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <NavigationMenu />
    </MemoryRouter>
  );
};

describe('NavigationMenu', () => {
  describe('rendering', () => {
    it('should render all navigation links', () => {
      renderWithRouter();

      expect(screen.getAllByText('Home').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Emergency Contacts').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Safety Tips').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('About').length).toBeGreaterThanOrEqual(1);
    });

    it('should render the navigation landmark with aria-label', () => {
      renderWithRouter();

      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      expect(nav).toBeInTheDocument();
    });

    it('should render the brand text', () => {
      renderWithRouter();

      expect(screen.getByText('Women Safety')).toBeInTheDocument();
    });
  });

  describe('active link styling', () => {
    it('should apply active styling to Home link when on home route', () => {
      renderWithRouter('/');

      const homeLinks = screen.getAllByText('Home');
      // Desktop link
      const desktopHomeLink = homeLinks[0];
      expect(desktopHomeLink).toHaveAttribute('aria-current', 'page');
    });

    it('should apply active styling to Emergency Contacts link when on that route', () => {
      renderWithRouter('/emergency-contacts');

      const links = screen.getAllByText('Emergency Contacts');
      const desktopLink = links[0];
      expect(desktopLink).toHaveAttribute('aria-current', 'page');
    });

    it('should apply active styling to Safety Tips link when on that route', () => {
      renderWithRouter('/safety-tips');

      const links = screen.getAllByText('Safety Tips');
      const desktopLink = links[0];
      expect(desktopLink).toHaveAttribute('aria-current', 'page');
    });

    it('should apply active styling to About link when on that route', () => {
      renderWithRouter('/about');

      const links = screen.getAllByText('About');
      const desktopLink = links[0];
      expect(desktopLink).toHaveAttribute('aria-current', 'page');
    });

    it('should not apply active styling to non-active links', () => {
      renderWithRouter('/');

      const emergencyLinks = screen.getAllByText('Emergency Contacts');
      expect(emergencyLinks[0]).not.toHaveAttribute('aria-current', 'page');
    });
  });

  describe('keyboard navigation and accessibility', () => {
    it('should have focusable navigation links', () => {
      renderWithRouter();

      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      const links = nav.querySelectorAll('a');
      links.forEach((link) => {
        expect(link).not.toHaveAttribute('tabIndex', '-1');
      });
    });

    it('should have aria-expanded attribute on hamburger button', () => {
      renderWithRouter();

      const toggleButton = screen.getByLabelText('Toggle navigation menu');
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('should update aria-expanded when menu is opened', () => {
      renderWithRouter();

      const toggleButton = screen.getByLabelText('Toggle navigation menu');
      fireEvent.click(toggleButton);

      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should close mobile menu on Escape key', () => {
      renderWithRouter();

      const toggleButton = screen.getByLabelText('Toggle navigation menu');
      fireEvent.click(toggleButton);

      expect(screen.getByRole('menu')).toBeInTheDocument();

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  describe('responsive hamburger menu', () => {
    it('should toggle mobile menu visibility on button click', () => {
      renderWithRouter();

      const toggleButton = screen.getByLabelText('Toggle navigation menu');

      // Menu should be hidden initially
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();

      // Open menu
      fireEvent.click(toggleButton);
      expect(screen.getByRole('menu')).toBeInTheDocument();

      // Close menu
      fireEvent.click(toggleButton);
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('should have aria-controls linking to mobile menu', () => {
      renderWithRouter();

      const toggleButton = screen.getByLabelText('Toggle navigation menu');
      expect(toggleButton).toHaveAttribute('aria-controls', 'mobile-menu');
    });

    it('should render mobile menu items with menuitem role', () => {
      renderWithRouter();

      const toggleButton = screen.getByLabelText('Toggle navigation menu');
      fireEvent.click(toggleButton);

      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems).toHaveLength(4);
    });
  });
});
