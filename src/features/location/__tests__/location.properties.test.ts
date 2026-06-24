import * as fc from 'fast-check';
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { locationService } from '../services/location.service';
import { GeoPosition } from '../../../types/location.types';
import { useGeolocation } from '../hooks/useGeolocation';

jest.mock('../hooks/useGeolocation');

const mockedUseGeolocation = useGeolocation as jest.MockedFunction<
  typeof useGeolocation
>;

/**
 * Feature: women-safety-awareness, Property 11: Location Service Returns Geolocation Coordinates
 *
 * For any latitude and longitude pair returned by the browser Geolocation API,
 * the Location_Service shall produce a GeoPosition object containing those exact
 * coordinates and a valid timestamp.
 *
 * Validates: Requirements 6.2
 */
describe('Property 11: Location Service Returns Geolocation Coordinates', () => {
  it('should produce a GeoPosition with exact lat/lng and valid timestamp for any browser coordinates', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.double({ min: -90, max: 90, noNaN: true, noDefaultInfinity: true }),
        fc.double({ min: -180, max: 180, noNaN: true, noDefaultInfinity: true }),
        fc.integer({ min: 0, max: Number.MAX_SAFE_INTEGER }),
        async (latitude, longitude, mockTimestamp) => {
          const mockPosition = {
            coords: { latitude, longitude },
            timestamp: mockTimestamp,
          };

          Object.defineProperty(navigator, 'geolocation', {
            value: {
              getCurrentPosition: (
                success: (pos: typeof mockPosition) => void
              ) => {
                success(mockPosition);
              },
            },
            configurable: true,
          });

          const result = await locationService.getCurrentPosition();

          expect(result.latitude).toBe(latitude);
          expect(result.longitude).toBe(longitude);
          expect(result.timestamp).toBe(mockTimestamp);
          expect(typeof result.timestamp).toBe('number');
          expect(result.timestamp).toBeGreaterThanOrEqual(0);
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Feature: women-safety-awareness, Property 12: Location Display Shows Coordinates and Timestamp
 *
 * For any valid GeoPosition object (latitude, longitude, timestamp),
 * the LiveLocationPage component shall render the latitude value,
 * longitude value, and a formatted timestamp string in the UI.
 *
 * Validates: Requirements 6.3
 */
describe('Property 12: Location Display Shows Coordinates and Timestamp', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render latitude, longitude, and formatted timestamp for any valid GeoPosition', () => {
    const LiveLocationPage =
      require('../components/LiveLocationPage').default;

    fc.assert(
      fc.property(
        fc.double({ min: -90, max: 90, noNaN: true, noDefaultInfinity: true }),
        fc.double({ min: -180, max: 180, noNaN: true, noDefaultInfinity: true }),
        fc.integer({ min: 1000000000000, max: 1800000000000 }),
        (latitude, longitude, timestamp) => {
          const position: GeoPosition = { latitude, longitude, timestamp };

          mockedUseGeolocation.mockReturnValue({
            state: {
              position,
              error: null,
              isSharing: true,
              status: 'granted',
            },
            requestLocation: jest.fn(),
            shareLocation: jest.fn(),
          });

          const { container, unmount } = render(
            React.createElement(LiveLocationPage)
          );

          const textContent = container.textContent || '';

          // Verify latitude and longitude are displayed
          const hasLatitude = textContent.includes(String(latitude));
          const hasLongitude = textContent.includes(String(longitude));

          // Verify formatted timestamp is displayed
          const formattedTimestamp = new Date(timestamp).toLocaleString();
          const hasTimestamp = textContent.includes(formattedTimestamp);

          // Clean up before next iteration
          unmount();

          expect(hasLatitude).toBe(true);
          expect(hasLongitude).toBe(true);
          expect(hasTimestamp).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Feature: women-safety-awareness, Property 13: Shareable Link Contains Coordinates
 *
 * For any valid GeoPosition with latitude and longitude values,
 * the generated shareable link shall contain string representations
 * of both the latitude and longitude values.
 *
 * Validates: Requirements 6.6
 */
describe('Property 13: Shareable Link Contains Coordinates', () => {
  it('should produce a shareable link containing both lat and lng string representations', () => {
    fc.assert(
      fc.property(
        fc.double({ min: -90, max: 90, noNaN: true, noDefaultInfinity: true }),
        fc.double({ min: -180, max: 180, noNaN: true, noDefaultInfinity: true }),
        fc.integer({ min: 0, max: Number.MAX_SAFE_INTEGER }),
        (latitude, longitude, timestamp) => {
          const position: GeoPosition = { latitude, longitude, timestamp };

          const link = locationService.generateShareableLink(position);

          expect(link).toContain(String(latitude));
          expect(link).toContain(String(longitude));
        }
      ),
      { numRuns: 100 }
    );
  });
});
