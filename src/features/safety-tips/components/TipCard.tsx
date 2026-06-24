import React from 'react';
import Card from '../../../components/ui/Card';
import { SafetyTip } from '../data/tips';

interface TipCardProps {
  tip: SafetyTip;
}

const ICON_MAP: Record<string, string> = {
  map: '🗺️',
  eye: '👁️',
  car: '🚗',
  briefcase: '💼',
  document: '📄',
  people: '👥',
  lock: '🔒',
  key: '🔑',
  shield: '🛡️',
};

const TipCard: React.FC<TipCardProps> = ({ tip }) => {
  const emoji = ICON_MAP[tip.icon] || '💡';

  return (
    <Card className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <span className="text-2xl" aria-hidden="true">
          {emoji}
        </span>
        <h3 className="text-lg font-semibold text-gray-900">{tip.title}</h3>
      </div>
      <p className="text-sm text-gray-600">{tip.description}</p>
    </Card>
  );
};

export default TipCard;
