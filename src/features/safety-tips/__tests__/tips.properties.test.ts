import * as fc from 'fast-check';
import React from 'react';
import { render } from '@testing-library/react';
import TipCard from '../components/TipCard';
import { SafetyTip } from '../data/tips';

/**
 * Feature: women-safety-awareness, Property 14: Safety Tip Rendering
 *
 * For any SafetyTip object with a title and description,
 * the TipCard component shall render both the title text and description text in its output.
 *
 * Validates: Requirements 9.2
 */
describe('Property 14: Safety Tip Rendering', () => {
  it('should render both title and description for any SafetyTip', () => {
    const nonEmptyVisibleString = fc
      .string({ minLength: 1 })
      .filter((s) => s.trim().length > 0);

    const arbitrarySafetyTip = fc.record({
      id: fc.string({ minLength: 1 }),
      title: nonEmptyVisibleString,
      description: nonEmptyVisibleString,
      icon: fc.string({ minLength: 1 }),
    });

    fc.assert(
      fc.property(arbitrarySafetyTip, (tip: SafetyTip) => {
        const { container, unmount } = render(
          React.createElement(TipCard, { tip })
        );

        const heading = container.querySelector('h3');
        const paragraph = container.querySelector('p');

        const hasTitleText =
          heading !== null && heading.textContent === tip.title;
        const hasDescriptionText =
          paragraph !== null && paragraph.textContent === tip.description;

        unmount();

        return hasTitleText && hasDescriptionText;
      }),
      { numRuns: 100 }
    );
  });
});
