import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AuthGuard from '../components/AuthGuard';
import { userStore } from '../../../store/user.store';
import { UserSession } from '../../../types/auth.types';

const mockSession: UserSession = {
  user: {
    id: '1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    gender: 'Female',
  },
  token: 'test-token-123',
  isAuthenticated: true,
};

const renderWithRouter = () => {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route
          path="/"
          element={
            <AuthGuard>
              <div>Protected Content</div>
            </AuthGuard>
          }
        />
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    </MemoryRouter>
  );
};

describe('AuthGuard', () => {
  afterEach(() => {
    userStore.session = null;
  });

  describe('unauthenticated user', () => {
    it('should redirect to /login when session is null', () => {
      userStore.session = null;

      renderWithRouter();

      expect(screen.getByText('Login Page')).toBeInTheDocument();
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });
  });

  describe('authenticated user', () => {
    it('should render children when session exists', () => {
      userStore.session = mockSession;

      renderWithRouter();

      expect(screen.getByText('Protected Content')).toBeInTheDocument();
      expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
    });
  });

  describe('logout', () => {
    it('should redirect to /login when session becomes null', () => {
      userStore.session = mockSession;

      const { rerender } = render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="/"
              element={
                <AuthGuard>
                  <div>Protected Content</div>
                </AuthGuard>
              }
            />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Protected Content')).toBeInTheDocument();

      // Simulate logout by clearing the session
      userStore.session = null;

      rerender(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="/"
              element={
                <AuthGuard>
                  <div>Protected Content</div>
                </AuthGuard>
              }
            />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Login Page')).toBeInTheDocument();
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });
  });
});
