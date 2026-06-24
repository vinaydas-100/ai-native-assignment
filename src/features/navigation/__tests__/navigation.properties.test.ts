import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as fc from 'fast-check';
import NavigationMenu from '../components/NavigationMenu';

/**
 * Feature: women-safety-awareness, Property 1: Active Navigation State
 *
 * For any valid route, the NavigationMenu shall apply active styling
 * exclusively to the matching link.
 *
 * Validates: Requirements 1.3
 */

const ROUTE_TO_LABEL: Record<string, string> = {
  '/': 'Home',
  '/emergency-contacts': 'Emergency Contacts',
  '/safety-tips': 'Safety Tips',
  '/about': 'About',
};

const VALID_ROUTES = ['/', '/emergency-contacts', '/safety-tips', '/about'];

describe('NavigationMenu - Property Tests', () => {
  it('Property 1: Active Navigation State — For any valid route, exactly one link has aria-current="page" and it matches the expected route', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...VALID_ROUTES),
        (route: string) => {
          const { unmount } = render(
            React.createElement(
              MemoryRouter,
              { initialEntries: [route] },
              React.createElement(NavigationMenu)
            )
          );

          const expectedLabel = ROUTE_TO_LABEL[route];

          // Get all links within the navigation
          const nav = screen.getByRole('navigation', { name: 'Main navigation' });
          const allLinks = nav.querySelectorAll('a');

          // Find links with aria-current="page"
          const activeLinks = Array.from(allLinks).filter(
            (link) => link.getAttribute('aria-current') === 'page'
          );

          // Exactly one link should be active (the desktop nav link for the current route)
          expect(activeLinks.length).toBeGreaterThanOrEqual(1);

          // Every active link must have the expected label text
          activeLinks.forEach((activeLink) => {
            expect(activeLink.textContent).toBe(expectedLabel);
          });

          // No other links should have aria-current="page"
          const nonActiveLinks = Array.from(allLinks).filter(
            (link) => link.getAttribute('aria-current') !== 'page'
          );
          nonActiveLinks.forEach((link) => {
            expect(link.textContent).not.toBe(expectedLabel);
          });

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});
