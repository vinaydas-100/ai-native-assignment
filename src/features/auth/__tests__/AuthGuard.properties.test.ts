import * as fc from 'fast-check';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AuthGuard from '../components/AuthGuard';
import { userStore } from '../../../store/user.store';
import { UserSession } from '../../../types/auth.types';

const PROTECTED_ROUTES = ['/', '/emergency-contacts', '/safety-tips', '/live-location', '/about'];

const protectedRouteArb = fc.constantFrom(...PROTECTED_ROUTES);

const validSessionArb: fc.Arbitrary<UserSession> = fc.record({
  user: fc.record({
    id: fc.string({ minLength: 1, maxLength: 36 }).filter((s) => s.trim().length > 0),
    name: fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
    email: fc.emailAddress(),
    gender: fc.constant('Female' as const),
  }),
  token: fc.string({ minLength: 1, maxLength: 256 }).filter((s) => s.trim().length > 0),
  isAuthenticated: fc.constant(true),
});

/**
 * Feature: women-safety-awareness, Property 8: Auth Guard Redirects Unauthenticated Users
 *
 * For any protected route path in the application, when the User_Store contains no valid
 * session (session is null), the Auth_Guard shall redirect to the login page.
 *
 * Validates: Requirements 4.1, 4.2
 */
describe('Property 8: Auth Guard Redirects Unauthenticated Users', () => {
  beforeEach(() => {
    userStore.session = null;
  });

  it('should redirect to /login for any protected route when session is null', () => {
    fc.assert(
      fc.property(protectedRouteArb, (route) => {
        userStore.session = null;

        const { unmount } = render(
          React.createElement(
            MemoryRouter,
            { initialEntries: [route] },
            React.createElement(
              Routes,
              null,
              React.createElement(Route, {
                path: route,
                element: React.createElement(
                  AuthGuard,
                  null,
                  React.createElement('div', null, 'Protected Content')
                ),
              }),
              React.createElement(Route, {
                path: '/login',
                element: React.createElement('div', null, 'Login Page'),
              })
            )
          )
        );

        expect(screen.getByText('Login Page')).toBeInTheDocument();
        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();

        unmount();
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * Feature: women-safety-awareness, Property 9: Auth Guard Allows Authenticated Users
 *
 * For any protected route path in the application, when the User_Store contains a valid
 * user session, the Auth_Guard shall render the protected route content without redirecting.
 *
 * Validates: Requirements 4.1, 4.2
 */
describe('Property 9: Auth Guard Allows Authenticated Users', () => {
  beforeEach(() => {
    userStore.session = null;
  });

  it('should render protected content for any protected route when session is valid', () => {
    fc.assert(
      fc.property(protectedRouteArb, validSessionArb, (route, session) => {
        userStore.session = session;

        const { unmount } = render(
          React.createElement(
            MemoryRouter,
            { initialEntries: [route] },
            React.createElement(
              Routes,
              null,
              React.createElement(Route, {
                path: route,
                element: React.createElement(
                  AuthGuard,
                  null,
                  React.createElement('div', null, 'Protected Content')
                ),
              }),
              React.createElement(Route, {
                path: '/login',
                element: React.createElement('div', null, 'Login Page'),
              })
            )
          )
        );

        expect(screen.getByText('Protected Content')).toBeInTheDocument();
        expect(screen.queryByText('Login Page')).not.toBeInTheDocument();

        unmount();
      }),
      { numRuns: 100 }
    );
  });
});
