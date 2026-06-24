import React from 'react';
import { SAFETY_CATEGORIES } from '../data/tips';
import TipCard from './TipCard';

const SafetyTipsPage: React.FC = () => {
  return (
    <main aria-label="Safety Tips">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Safety Tips
      </h1>
      <p className="text-gray-600 mb-8">
        Stay informed and prepared with these safety guidelines.
      </p>
      {SAFETY_CATEGORIES.map((category) => (
        <section
          key={category.id}
          aria-labelledby={`category-${category.id}-heading`}
          className="mb-8"
        >
          <h2
            id={`category-${category.id}-heading`}
            className="text-xl md:text-2xl font-semibold text-gray-800 mb-4"
          >
            {category.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.tips.map((tip) => (
              <article key={tip.id} aria-label={tip.title}>
                <TipCard tip={tip} />
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default SafetyTipsPage;
