import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../components/HomePage';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('HomePage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  const renderHomePage = () => {
    return render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  };

  describe('hero section', () => {
    it('should render the hero heading with safety awareness message', () => {
      renderHomePage();

      expect(
        screen.getByRole('heading', { name: /women safety awareness/i, level: 1 })
      ).toBeInTheDocument();
    });

    it('should render a descriptive paragraph about the app purpose', () => {
      renderHomePage();

      expect(
        screen.getByText(/your safety matters/i)
      ).toBeInTheDocument();
    });
  });

  describe('quick-access cards', () => {
    it('should render Emergency Contacts card', () => {
      renderHomePage();

      expect(
        screen.getByRole('heading', { name: /emergency contacts/i, level: 3 })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/quick access to police, ambulance, and women helpline/i)
      ).toBeInTheDocument();
    });

    it('should render Live Location card', () => {
      renderHomePage();

      expect(
        screen.getByRole('heading', { name: /live location/i, level: 3 })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/share your real-time location/i)
      ).toBeInTheDocument();
    });

    it('should render Safety Tips card', () => {
      renderHomePage();

      expect(
        screen.getByRole('heading', { name: /safety tips/i, level: 3 })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/learn essential safety tips/i)
      ).toBeInTheDocument();
    });

    it('should navigate to /emergency-contacts when Emergency Contacts card is clicked', async () => {
      renderHomePage();

      const card = screen.getByRole('heading', { name: /emergency contacts/i, level: 3 })
        .closest('[role="button"]');
      await userEvent.click(card!);

      expect(mockNavigate).toHaveBeenCalledWith('/emergency-contacts');
    });

    it('should navigate to /live-location when Live Location card is clicked', async () => {
      renderHomePage();

      const card = screen.getByRole('heading', { name: /live location/i, level: 3 })
        .closest('[role="button"]');
      await userEvent.click(card!);

      expect(mockNavigate).toHaveBeenCalledWith('/live-location');
    });

    it('should navigate to /safety-tips when Safety Tips card is clicked', async () => {
      renderHomePage();

      const card = screen.getByRole('heading', { name: /safety tips/i, level: 3 })
        .closest('[role="button"]');
      await userEvent.click(card!);

      expect(mockNavigate).toHaveBeenCalledWith('/safety-tips');
    });
  });

  describe('accessibility', () => {
    it('should render with a main landmark', () => {
      renderHomePage();

      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('should have all cards keyboard navigable with role="button"', () => {
      renderHomePage();

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(3);
    });
  });
});
