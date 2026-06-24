import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/ui/Card';

interface QuickAccessCard {
  title: string;
  description: string;
  icon: string;
  path: string;
}

const QUICK_ACCESS_CARDS: QuickAccessCard[] = [
  {
    title: 'Emergency Contacts',
    description: 'Quick access to police, ambulance, and women helpline numbers.',
    icon: '🚨',
    path: '/emergency-contacts',
  },
  {
    title: 'Live Location',
    description: 'Share your real-time location with trusted contacts.',
    icon: '📍',
    path: '/live-location',
  },
  {
    title: 'Safety Tips',
    description: 'Learn essential safety tips for travel, workplace, and online.',
    icon: '💡',
    path: '/safety-tips',
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen px-4 py-8 md:px-8 lg:px-16">
      <section
        className="text-center py-12 md:py-16 bg-purple-50 rounded-lg mb-8"
        aria-labelledby="hero-heading"
      >
        <h1
          id="hero-heading"
          className="text-3xl md:text-4xl font-bold text-purple-800 mb-4"
        >
          Women Safety Awareness
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Your safety matters. Access emergency contacts, share your location, and
          stay informed with essential safety tips — all in one place.
        </p>
      </section>

      <section aria-labelledby="quick-access-heading">
        <h2
          id="quick-access-heading"
          className="text-2xl font-semibold text-gray-800 mb-6"
        >
          Quick Access
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {QUICK_ACCESS_CARDS.map((card) => (
            <Card
              key={card.path}
              onClick={() => navigate(card.path)}
              className="text-left"
            >
              <span className="text-3xl mb-3 block" aria-hidden="true">
                {card.icon}
              </span>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600">{card.description}</p>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
