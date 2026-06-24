import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <main aria-label="About" className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        About Women Safety Awareness
      </h1>

      <section className="space-y-6 text-gray-700">
        <p className="text-lg">
          Women Safety Awareness is a dedicated platform designed to empower women
          with essential safety resources, emergency contacts, and real-time
          location sharing capabilities.
        </p>

        <div className="bg-purple-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-purple-800 mb-3">
            Our Mission
          </h2>
          <p>
            To provide women with quick access to emergency services, safety
            information, and tools that help them feel secure in any situation.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Emergency contacts with one-tap calling</li>
            <li>Live location sharing with trusted contacts</li>
            <li>Speed dial for immediate access to police and helplines</li>
            <li>Safety tips for travel, workplace, and online scenarios</li>
          </ul>
        </div>

        <p className="text-sm text-gray-500">
          This application is available exclusively to women users for their
          safety and empowerment.
        </p>
      </section>
    </main>
  );
};

export default AboutPage;
