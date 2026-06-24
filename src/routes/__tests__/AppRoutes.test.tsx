import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppRoutes from '../AppRoutes';
import { userStore } from '../../store/user.store';
import { UserSession } from '../../types/auth.types';

// Mock the location service to avoid browser geolocation API calls
jest.mock('../../features/location/services/location.service', () => ({
  locationService: {
    isGeolocationSupported: jest.fn(() => false),
    getCurrentPosition: jest.fn(),
    generateShareableLink: jest.fn(),
  },
}));

const validSession: UserSession = {
  user: {
    id: '1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    gender: 'Female',
  },
  token: 'test-token-123',
  isAuthenticated: true,
};

const renderAppAt = (route: string) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AppRoutes />
    </MemoryRouter>
  );
};

describe('AppRoutes Integration', () => {
  afterEach(() => {
    userStore.session = null;
  });

  describe('unauthenticated user redirected from protected routes', () => {
    const protectedRoutes = [
      '/',
      '/emergency-contacts',
      '/live-location',
      '/safety-tips',
      '/about',
    ];

    it.each(protectedRoutes)(
      'should redirect to login when accessing %s without authentication',
      (route) => {
        userStore.session = null;

        renderAppAt(route);

        expect(screen.getByText('Welcome Back')).toBeInTheDocument();
      }
    );
  });

  describe('authenticated user can access all protected pages', () => {
    beforeEach(() => {
      userStore.session = validSession;
    });

    it('should render Home page at /', () => {
      renderAppAt('/');

      expect(screen.getByText('Women Safety Awareness')).toBeInTheDocument();
    });

    it('should render Emergency Contacts page at /emergency-contacts', () => {
      renderAppAt('/emergency-contacts');

      expect(screen.getByRole('heading', { name: /Emergency Contacts/i })).toBeInTheDocument();
    });

    it('should render Live Location page at /live-location', () => {
      renderAppAt('/live-location');

      expect(screen.getByText('Live Location')).toBeInTheDocument();
    });

    it('should render Safety Tips page at /safety-tips', () => {
      renderAppAt('/safety-tips');

      expect(screen.getByRole('heading', { name: /Safety Tips/i })).toBeInTheDocument();
    });

    it('should render About page at /about', () => {
      renderAppAt('/about');

      expect(screen.getByText(/About Women Safety Awareness/)).toBeInTheDocument();
    });

    it('should display Navigation Menu on protected pages', () => {
      renderAppAt('/');

      expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
    });
  });

  describe('navigation between pages without full reload', () => {
    beforeEach(() => {
      userStore.session = validSession;
    });

    it('should navigate from Home to Emergency Contacts via nav link', async () => {
      renderAppAt('/');

      expect(screen.getByText('Women Safety Awareness')).toBeInTheDocument();

      const emergencyLink = screen.getByRole('link', { name: 'Emergency Contacts' });
      await userEvent.click(emergencyLink);

      expect(screen.getByRole('heading', { name: /Emergency Contacts/i })).toBeInTheDocument();
    });

    it('should navigate from Home to Safety Tips via nav link', async () => {
      renderAppAt('/');

      expect(screen.getByText('Women Safety Awareness')).toBeInTheDocument();

      const safetyTipsLink = screen.getByRole('link', { name: 'Safety Tips' });
      await userEvent.click(safetyTipsLink);

      expect(screen.getByRole('heading', { name: /Safety Tips/i })).toBeInTheDocument();
    });

    it('should navigate from Home to About via nav link', async () => {
      renderAppAt('/');

      expect(screen.getByText('Women Safety Awareness')).toBeInTheDocument();

      const aboutLink = screen.getByRole('link', { name: 'About' });
      await userEvent.click(aboutLink);

      expect(screen.getByRole('heading', { name: /About Women Safety Awareness/i })).toBeInTheDocument();
    });

    it('should navigate back to Home from another page', async () => {
      renderAppAt('/emergency-contacts');

      expect(screen.getByRole('heading', { name: /Emergency Contacts/i })).toBeInTheDocument();

      const homeLink = screen.getByRole('link', { name: 'Home' });
      await userEvent.click(homeLink);

      expect(screen.getByText('Women Safety Awareness')).toBeInTheDocument();
    });
  });
});
