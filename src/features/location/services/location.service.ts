import { GeoPosition } from '../../../types/location.types';

export const locationService = {
  getCurrentPosition(): Promise<GeoPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: position.timestamp,
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  },

  isGeolocationSupported(): boolean {
    return 'geolocation' in navigator && !!navigator.geolocation;
  },

  generateShareableLink(position: GeoPosition): string {
    return `https://maps.google.com/?q=${position.latitude},${position.longitude}`;
  },
};
