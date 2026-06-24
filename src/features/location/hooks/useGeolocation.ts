import { useCallback, useState } from 'react';
import { LocationState } from '../../../types/location.types';
import { locationService } from '../services/location.service';

const initialState: LocationState = {
  position: null,
  error: null,
  isSharing: false,
  status: 'idle',
};

interface UseGeolocationReturn {
  state: LocationState;
  requestLocation: () => void;
  shareLocation: () => string | null;
}

export function useGeolocation(): UseGeolocationReturn {
  const [state, setState] = useState<LocationState>(initialState);

  const requestLocation = useCallback(() => {
    setState((prev) => ({ ...prev, status: 'requesting', error: null }));

    if (!locationService.isGeolocationSupported()) {
      setState((prev) => ({
        ...prev,
        status: 'unsupported',
        error: 'Your browser does not support location sharing.',
      }));
      return;
    }

    locationService
      .getCurrentPosition()
      .then((position) => {
        setState({
          position,
          error: null,
          isSharing: true,
          status: 'granted',
        });
      })
      .catch(() => {
        setState((prev) => ({
          ...prev,
          position: null,
          isSharing: false,
          status: 'denied',
          error:
            'Location permission is required for this feature. Please enable it in your browser settings.',
        }));
      });
  }, []);

  const shareLocation = useCallback((): string | null => {
    if (!state.position) {
      return null;
    }
    return locationService.generateShareableLink(state.position);
  }, [state.position]);

  return { state, requestLocation, shareLocation };
}
