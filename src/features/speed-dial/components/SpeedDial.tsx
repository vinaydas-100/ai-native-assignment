import React, { useState, useCallback, useEffect, useRef } from 'react';
import { SpeedDialAction, SPEED_DIAL_ACTIONS } from '../data/speed-dial-contacts';

interface SpeedDialProps {
  actions?: SpeedDialAction[];
}

const ICON_MAP: Record<string, string> = {
  shield: '🚔',
  phone: '📞',
  star: '⭐',
};

const SpeedDial: React.FC<SpeedDialProps> = ({ actions = SPEED_DIAL_ACTIONS }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const toggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && isExpanded) {
      setIsExpanded(false);
    }
  }, [isExpanded]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <nav
      ref={containerRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-3"
      aria-label="Speed dial navigation"
    >
      <button
        type="button"
        onClick={toggle}
        onKeyDown={handleKeyDown}
        aria-label="Speed dial"
        aria-expanded={isExpanded}
        className="w-14 h-14 rounded-full bg-purple-700 text-white shadow-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-transform duration-200"
      >
        <span className="text-2xl" aria-hidden="true">
          {isExpanded ? '✕' : '☎'}
        </span>
      </button>

      {isExpanded && (
        <ul className="flex flex-col gap-2">
          {actions.map((action) => (
            <li key={action.id} className="flex items-center justify-end gap-2">
              <span className="bg-white text-gray-900 text-sm font-medium px-3 py-1 rounded shadow">
                {action.label}
              </span>
              {action.phoneNumber ? (
                <a
                  href={`tel:${action.phoneNumber}`}
                  aria-label={`Call ${action.label} at ${action.phoneNumber}`}
                  className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center shadow hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                >
                  <span aria-hidden="true">{ICON_MAP[action.icon] || '📞'}</span>
                </a>
              ) : (
                <span
                  role="img"
                  aria-label={action.label}
                  className="w-10 h-10 rounded-full bg-gray-400 text-white flex items-center justify-center shadow cursor-not-allowed"
                >
                  <span aria-hidden="true">{ICON_MAP[action.icon] || '⭐'}</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default SpeedDial;
