import { renderHook, act } from '@testing-library/react';
import { useGeolocation } from '../hooks/useGeolocation';
import { locationService } from '../services/location.service';

jest.mock('../services/location.service');

const mockedLocationService = locationService as jest.Mocked<typeof locationService>;

describe('useGeolocation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial state', () => {
    it('should have idle status with null position', () => {
      // Arrange & Act
      const { result } = renderHook(() => useGeolocation());

      // Assert
      expect(result.current.state.status).toBe('idle');
      expect(result.current.state.position).toBeNull();
      expect(result.current.state.error).toBeNull();
      expect(result.current.state.isSharing).toBe(false);
    });
  });

  describe('requestLocation', () => {
    it('should transition to requesting then granted on success', async () => {
      // Arrange
      const mockPosition = {
        latitude: 12.9716,
        longitude: 77.5946,
        timestamp: 1700000000000,
      };
      mockedLocationService.isGeolocationSupported.mockReturnValue(true);
      mockedLocationService.getCurrentPosition.mockResolvedValue(mockPosition);

      const { result } = renderHook(() => useGeolocation());

      // Act
      await act(async () => {
        result.current.requestLocation();
      });

      // Assert
      expect(result.current.state.status).toBe('granted');
      expect(result.current.state.position).toEqual(mockPosition);
      expect(result.current.state.isSharing).toBe(true);
      expect(result.current.state.error).toBeNull();
    });

    it('should transition to denied on geolocation error', async () => {
      // Arrange
      mockedLocationService.isGeolocationSupported.mockReturnValue(true);
      mockedLocationService.getCurrentPosition.mockRejectedValue(
        new Error('Permission denied')
      );

      const { result } = renderHook(() => useGeolocation());

      // Act
      await act(async () => {
        result.current.requestLocation();
      });

      // Assert
      expect(result.current.state.status).toBe('denied');
      expect(result.current.state.error).toBe(
        'Location permission is required for this feature. Please enable it in your browser settings.'
      );
      expect(result.current.state.position).toBeNull();
      expect(result.current.state.isSharing).toBe(false);
    });

    it('should set unsupported when geolocation is not available', async () => {
      // Arrange
      mockedLocationService.isGeolocationSupported.mockReturnValue(false);

      const { result } = renderHook(() => useGeolocation());

      // Act
      await act(async () => {
        result.current.requestLocation();
      });

      // Assert
      expect(result.current.state.status).toBe('unsupported');
      expect(result.current.state.error).toBe(
        'Your browser does not support location sharing.'
      );
    });
  });

  describe('shareLocation', () => {
    it('should return null when no position is available', () => {
      // Arrange
      const { result } = renderHook(() => useGeolocation());

      // Act
      const link = result.current.shareLocation();

      // Assert
      expect(link).toBeNull();
    });

    it('should return a shareable link when position is set', async () => {
      // Arrange
      const mockPosition = {
        latitude: 28.6139,
        longitude: 77.209,
        timestamp: 1700000000000,
      };
      mockedLocationService.isGeolocationSupported.mockReturnValue(true);
      mockedLocationService.getCurrentPosition.mockResolvedValue(mockPosition);
      mockedLocationService.generateShareableLink.mockReturnValue(
        'https://maps.google.com/?q=28.6139,77.209'
      );

      const { result } = renderHook(() => useGeolocation());

      await act(async () => {
        result.current.requestLocation();
      });

      // Act
      const link = result.current.shareLocation();

      // Assert
      expect(link).toBe('https://maps.google.com/?q=28.6139,77.209');
      expect(mockedLocationService.generateShareableLink).toHaveBeenCalledWith(mockPosition);
    });
  });
});
