import React from 'react';
import Card from '../../../components/ui/Card';
import { EmergencyContact } from '../data/contacts';

interface ContactCardProps {
  contact: EmergencyContact;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  return (
    <Card className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold text-gray-900">{contact.name}</h2>
      <p className="text-sm text-gray-600">{contact.description}</p>
      <a
        href={`tel:${contact.phoneNumber}`}
        className="mt-2 inline-flex items-center gap-2 text-purple-700 font-medium hover:text-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-2 py-1"
        aria-label={`Call ${contact.name} at ${contact.phoneNumber}`}
      >
        <span aria-hidden="true">📞</span>
        {contact.phoneNumber}
      </a>
    </Card>
  );
};

export default ContactCard;
