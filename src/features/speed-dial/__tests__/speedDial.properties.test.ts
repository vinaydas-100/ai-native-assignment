import * as fc from 'fast-check';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SpeedDial from '../components/SpeedDial';
import { SpeedDialAction } from '../data/speed-dial-contacts';

/**
 * Feature: women-safety-awareness, Property 10: Phone Contact Rendering with tel: Protocol
 *
 * For any SpeedDialAction with a non-empty phoneNumber field,
 * the rendered SpeedDial component shall produce an anchor element with href equal to "tel:{phoneNumber}".
 *
 * Validates: Requirements 7.3
 */
describe('Property 10: Phone Contact Rendering with tel: Protocol', () => {
  it('should render an anchor with href="tel:{phoneNumber}" for any SpeedDialAction with non-empty phoneNumber', async () => {
    const arbitraryAction: fc.Arbitrary<SpeedDialAction> = fc.record({
      id: fc.string({ minLength: 1 }),
      label: fc.string({ minLength: 1 }),
      phoneNumber: fc.stringMatching(/^[0-9]+$/, { minLength: 1 }),
      icon: fc.constantFrom('shield', 'phone', 'star'),
    });

    await fc.assert(
      fc.asyncProperty(arbitraryAction, async (action: SpeedDialAction) => {
        const { unmount } = render(
          React.createElement(SpeedDial, { actions: [action] })
        );

        const fabButton = screen.getByLabelText('Speed dial');
        await userEvent.click(fabButton);

        const anchor = document.querySelector(`a[href="tel:${action.phoneNumber}"]`);
        const result = anchor !== null;

        unmount();

        return result;
      }),
      { numRuns: 100 }
    );
  });
});
