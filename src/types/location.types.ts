export interface GeoPosition {
  latitude: number;
  longitude: number;
  timestamp: number;
}

export type LocationPermissionState = 'idle' | 'requesting' | 'granted' | 'denied' | 'unsupported';

export interface LocationState {
  position: GeoPosition | null;
  error: string | null;
  isSharing: boolean;
  status: LocationPermissionState;
}
