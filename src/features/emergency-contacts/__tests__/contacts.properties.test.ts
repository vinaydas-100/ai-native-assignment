import * as fc from 'fast-check';
import React from 'react';
import { render } from '@testing-library/react';
import ContactCard from '../components/ContactCard';
import { EmergencyContact } from '../data/contacts';

/**
 * Feature: women-safety-awareness, Property 10: Phone Contact Rendering with tel: Protocol
 *
 * For any contact object (EmergencyContact) with a non-empty phoneNumber field,
 * the rendered component shall produce an anchor element with href equal to "tel:{phoneNumber}".
 *
 * Validates: Requirements 5.2, 5.3
 */
describe('Property 10: Phone Contact Rendering with tel: Protocol', () => {
  it('should render an anchor with href="tel:{phoneNumber}" for any contact with non-empty phoneNumber', () => {
    const arbitraryContact = fc.record({
      id: fc.string({ minLength: 1 }),
      name: fc.string({ minLength: 1 }),
      phoneNumber: fc.stringMatching(/^[0-9]+$/, { minLength: 1 }),
      description: fc.string(),
      icon: fc.string(),
    });

    fc.assert(
      fc.property(arbitraryContact, (contact: EmergencyContact) => {
        const { container } = render(
          React.createElement(ContactCard, { contact })
        );

        const anchor = container.querySelector(`a[href="tel:${contact.phoneNumber}"]`);
        return anchor !== null;
      }),
      { numRuns: 100 }
    );
  });
});
