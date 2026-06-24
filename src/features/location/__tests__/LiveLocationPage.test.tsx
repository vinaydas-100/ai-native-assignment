import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LiveLocationPage from '../components/LiveLocationPage';
import { useGeolocation } from '../hooks/useGeolocation';

jest.mock('../hooks/useGeolocation');

const mockedUseGeolocation = useGeolocation as jest.MockedFunction<typeof useGeolocation>;

describe('LiveLocationPage', () => {
  const mockRequestLocation = jest.fn();
  const mockShareLocation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setupMock = (overrides: Partial<ReturnType<typeof useGeolocation>>) => {
    const defaultReturn: ReturnType<typeof useGeolocation> = {
      state: {
        position: null,
        error: null,
        isSharing: false,
        status: 'idle',
      },
      requestLocation: mockRequestLocation,
      shareLocation: mockShareLocation,
      ...overrides,
    };
    mockedUseGeolocation.mockReturnValue(defaultReturn);
  };

  describe('idle state', () => {
    it('should render the page heading', () => {
      // Arrange
      setupMock({});

      // Act
      render(<LiveLocationPage />);

      // Assert
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Live Location');
    });

    it('should show "Get My Location" button', () => {
      // Arrange
      setupMock({});

      // Act
      render(<LiveLocationPage />);

      // Assert
      expect(screen.getByRole('button', { name: /get my current location/i })).toBeInTheDocument();
      expect(screen.getByText('Get My Location')).toBeInTheDocument();
    });

    it('should have a main element with aria-label "Live Location"', () => {
      // Arrange
      setupMock({});

      // Act
      render(<LiveLocationPage />);

      // Assert
      const main = screen.getByRole('main');
      expect(main).toHaveAttribute('aria-label', 'Live Location');
    });
  });

  describe('requesting state', () => {
    it('should show a loading button', () => {
      // Arrange
      setupMock({
        state: {
          position: null,
          error: null,
          isSharing: false,
          status: 'requesting',
        },
      });

      // Act
      render(<LiveLocationPage />);

      // Assert
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-busy', 'true');
    });
  });

  describe('granted state with position', () => {
    const mockPosition = {
      latitude: 12.9716,
      longitude: 77.5946,
      timestamp: 1700000000000,
    };

    it('should show latitude', () => {
      // Arrange
      setupMock({
        state: {
          position: mockPosition,
          error: null,
          isSharing: true,
          status: 'granted',
        },
      });

      // Act
      render(<LiveLocationPage />);

      // Assert
      expect(screen.getByText('12.9716')).toBeInTheDocument();
    });

    it('should show longitude', () => {
      // Arrange
      setupMock({
        state: {
          position: mockPosition,
          error: null,
          isSharing: true,
          status: 'granted',
        },
      });

      // Act
      render(<LiveLocationPage />);

      // Assert
      expect(screen.getByText('77.5946')).toBeInTheDocument();
    });

    it('should show formatted timestamp', () => {
      // Arrange
      setupMock({
        state: {
          position: mockPosition,
          error: null,
          isSharing: true,
          status: 'granted',
        },
      });

      // Act
      render(<LiveLocationPage />);

      // Assert
      const formattedDate = new Date(1700000000000).toLocaleString();
      expect(screen.getByText(formattedDate)).toBeInTheDocument();
    });
  });

  describe('denied state with error', () => {
    it('should show error Alert with denied message', () => {
      // Arrange
      setupMock({
        state: {
          position: null,
          error: 'Location permission is required for this feature. Please enable it in your browser settings.',
          isSharing: false,
          status: 'denied',
        },
      });

      // Act
      render(<LiveLocationPage />);

      // Assert
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(screen.getByText(
        'Location permission is required for this feature. Please enable it in your browser settings.'
      )).toBeInTheDocument();
    });
  });

  describe('unsupported state with error', () => {
    it('should show warning Alert with unsupported message', () => {
      // Arrange
      setupMock({
        state: {
          position: null,
          error: 'Your browser does not support location sharing.',
          isSharing: false,
          status: 'unsupported',
        },
      });

      // Act
      render(<LiveLocationPage />);

      // Assert
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(screen.getByText(
        'Your browser does not support location sharing.'
      )).toBeInTheDocument();
    });
  });

  describe('share button', () => {
    it('should call shareLocation and show the generated link when clicked', () => {
      // Arrange
      const mockPosition = {
        latitude: 28.6139,
        longitude: 77.209,
        timestamp: 1700000000000,
      };
      mockShareLocation.mockReturnValue('https://maps.google.com/?q=28.6139,77.209');

      setupMock({
        state: {
          position: mockPosition,
          error: null,
          isSharing: true,
          status: 'granted',
        },
      });

      // Mock clipboard
      Object.assign(navigator, {
        clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
      });

      render(<LiveLocationPage />);

      // Act
      const shareButton = screen.getByRole('button', { name: /share your location/i });
      userEvent.click(shareButton);

      // Assert
      expect(mockShareLocation).toHaveBeenCalled();
      expect(screen.getByText('https://maps.google.com/?q=28.6139,77.209')).toBeInTheDocument();
    });
  });
});
