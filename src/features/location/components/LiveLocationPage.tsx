import React, { useState } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from '../../../components/ui/Button';
import Alert from '../../../components/ui/Alert';

const LiveLocationPage: React.FC = () => {
  const { state, requestLocation, shareLocation } = useGeolocation();
  const [shareLink, setShareLink] = useState<string | null>(null);

  const handleGetLocation = () => {
    setShareLink(null);
    requestLocation();
  };

  const handleShareLocation = () => {
    const link = shareLocation();
    if (link) {
      setShareLink(link);
      if (navigator.clipboard) {
        navigator.clipboard.writeText(link);
      }
    }
  };

  const formatTimestamp = (timestamp: number): string => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <main aria-label="Live Location" className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Live Location</h1>

      {state.status === 'idle' && (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Share your live location with trusted contacts in case of an emergency.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={handleGetLocation}
            ariaLabel="Get my current location"
          >
            Get My Location
          </Button>
        </div>
      )}

      {state.status === 'requesting' && (
        <div className="text-center py-8">
          <Button
            variant="primary"
            size="lg"
            isLoading={true}
            disabled={true}
          >
            Getting Location...
          </Button>
        </div>
      )}

      {state.status === 'granted' && state.position && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Your Current Location
            </h2>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-gray-600">Latitude</dt>
                <dd className="font-mono text-gray-900">
                  {state.position.latitude}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Longitude</dt>
                <dd className="font-mono text-gray-900">
                  {state.position.longitude}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Last Updated</dt>
                <dd className="text-gray-900">
                  {formatTimestamp(state.position.timestamp)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="space-y-3">
            <Button
              variant="primary"
              size="md"
              onClick={handleShareLocation}
              ariaLabel="Share your location"
            >
              Share Location
            </Button>

            {shareLink && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">
                  Location link copied to clipboard:
                </p>
                <a
                  href={shareLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800 text-sm break-all"
                >
                  {shareLink}
                </a>
              </div>
            )}
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleGetLocation}
            ariaLabel="Refresh location"
          >
            Refresh Location
          </Button>
        </div>
      )}

      {state.status === 'denied' && state.error && (
        <div className="space-y-4">
          <Alert variant="error" message={state.error} />
          <Button
            variant="secondary"
            size="md"
            onClick={handleGetLocation}
            ariaLabel="Try getting location again"
          >
            Try Again
          </Button>
        </div>
      )}

      {state.status === 'unsupported' && state.error && (
        <div className="space-y-4">
          <Alert variant="warning" message={state.error} />
        </div>
      )}
    </main>
  );
};

export default LiveLocationPage;
