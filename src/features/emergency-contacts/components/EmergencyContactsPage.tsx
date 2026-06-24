import React from 'react';
import { EMERGENCY_CONTACTS } from '../data/contacts';
import ContactCard from './ContactCard';

const EmergencyContactsPage: React.FC = () => {
  return (
    <main aria-label="Emergency Contacts">
      <section aria-labelledby="emergency-contacts-heading">
        <h1
          id="emergency-contacts-heading"
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-6"
        >
          Emergency Contacts
        </h1>
        <p className="text-gray-600 mb-8">
          Tap a number to call immediately in case of emergency.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EMERGENCY_CONTACTS.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default EmergencyContactsPage;
