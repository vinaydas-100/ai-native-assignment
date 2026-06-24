import { locationService } from '../services/location.service';
import { GeoPosition } from '../../../types/location.types';

describe('locationService', () => {
  describe('isGeolocationSupported', () => {
    it('should return true when geolocation is available', () => {
      Object.defineProperty(navigator, 'geolocation', {
        value: { getCurrentPosition: jest.fn() },
        configurable: true,
      });

      expect(locationService.isGeolocationSupported()).toBe(true);
    });

    it('should return false when geolocation is not available', () => {
      Object.defineProperty(navigator, 'geolocation', {
        value: undefined,
        configurable: true,
      });

      expect(locationService.isGeolocationSupported()).toBe(false);
    });
  });

  describe('getCurrentPosition', () => {
    it('should resolve with GeoPosition on success', async () => {
      const mockPosition = {
        coords: { latitude: 12.9716, longitude: 77.5946 },
        timestamp: 1700000000000,
      };

      Object.defineProperty(navigator, 'geolocation', {
        value: {
          getCurrentPosition: (success: (pos: typeof mockPosition) => void) => {
            success(mockPosition);
          },
        },
        configurable: true,
      });

      const result = await locationService.getCurrentPosition();

      expect(result).toEqual({
        latitude: 12.9716,
        longitude: 77.5946,
        timestamp: 1700000000000,
      });
    });

    it('should reject when geolocation fails', async () => {
      const mockError = new Error('Permission denied');

      Object.defineProperty(navigator, 'geolocation', {
        value: {
          getCurrentPosition: (
            _success: () => void,
            error: (err: Error) => void
          ) => {
            error(mockError);
          },
        },
        configurable: true,
      });

      await expect(locationService.getCurrentPosition()).rejects.toEqual(
        mockError
      );
    });
  });

  describe('generateShareableLink', () => {
    it('should generate a Google Maps link with coordinates', () => {
      const position: GeoPosition = {
        latitude: 28.6139,
        longitude: 77.209,
        timestamp: 1700000000000,
      };

      const link = locationService.generateShareableLink(position);

      expect(link).toBe('https://maps.google.com/?q=28.6139,77.209');
    });

    it('should handle negative coordinates', () => {
      const position: GeoPosition = {
        latitude: -33.8688,
        longitude: -151.2093,
        timestamp: 1700000000000,
      };

      const link = locationService.generateShareableLink(position);

      expect(link).toBe('https://maps.google.com/?q=-33.8688,-151.2093');
    });
  });
});
