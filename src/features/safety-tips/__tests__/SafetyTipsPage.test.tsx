import React from 'react';
import { render, screen, within } from '@testing-library/react';
import SafetyTipsPage from '../components/SafetyTipsPage';

describe('SafetyTipsPage', () => {
  const renderSafetyTipsPage = () => {
    return render(<SafetyTipsPage />);
  };

  describe('categories render', () => {
    it('should render all 3 safety categories', () => {
      renderSafetyTipsPage();

      expect(
        screen.getByRole('heading', { name: /travel safety/i, level: 2 })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: /workplace safety/i, level: 2 })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: /online safety/i, level: 2 })
      ).toBeInTheDocument();
    });

    it('should render each category as a section with aria-labelledby', () => {
      renderSafetyTipsPage();

      const sections = screen.getAllByRole('region');
      expect(sections).toHaveLength(3);

      expect(sections[0]).toHaveAttribute('aria-labelledby', 'category-1-heading');
      expect(sections[1]).toHaveAttribute('aria-labelledby', 'category-2-heading');
      expect(sections[2]).toHaveAttribute('aria-labelledby', 'category-3-heading');
    });
  });

  describe('tip structure', () => {
    it('should render all 9 tips as articles', () => {
      renderSafetyTipsPage();

      const articles = screen.getAllByRole('article');
      expect(articles).toHaveLength(9);
    });

    it('should render each tip with a title and description', () => {
      renderSafetyTipsPage();

      // Travel Safety tips
      expect(screen.getByText('Share your itinerary')).toBeInTheDocument();
      expect(
        screen.getByText(/always share your travel plans/i)
      ).toBeInTheDocument();

      // Workplace Safety tips
      expect(screen.getByText('Know your rights')).toBeInTheDocument();
      expect(
        screen.getByText(/understand workplace harassment policies/i)
      ).toBeInTheDocument();

      // Online Safety tips
      expect(screen.getByText('Protect personal information')).toBeInTheDocument();
      expect(
        screen.getByText(/never share personal details with strangers/i)
      ).toBeInTheDocument();
    });

    it('should render each article with an aria-label matching the tip title', () => {
      renderSafetyTipsPage();

      expect(
        screen.getByRole('article', { name: 'Share your itinerary' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('article', { name: 'Know your rights' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('article', { name: 'Protect personal information' })
      ).toBeInTheDocument();
    });

    it('should render 3 tips within each category section', () => {
      renderSafetyTipsPage();

      const sections = screen.getAllByRole('region');

      sections.forEach((section) => {
        const articles = within(section).getAllByRole('article');
        expect(articles).toHaveLength(3);
      });
    });
  });

  describe('heading hierarchy', () => {
    it('should render h1 for the page title', () => {
      renderSafetyTipsPage();

      expect(
        screen.getByRole('heading', { name: /safety tips/i, level: 1 })
      ).toBeInTheDocument();
    });

    it('should render h2 for each category heading', () => {
      renderSafetyTipsPage();

      const h2Headings = screen.getAllByRole('heading', { level: 2 });
      expect(h2Headings).toHaveLength(3);
      expect(h2Headings[0]).toHaveTextContent('Travel Safety');
      expect(h2Headings[1]).toHaveTextContent('Workplace Safety');
      expect(h2Headings[2]).toHaveTextContent('Online Safety');
    });
  });

  describe('accessibility', () => {
    it('should render main landmark with aria-label', () => {
      renderSafetyTipsPage();

      const main = screen.getByRole('main');
      expect(main).toHaveAttribute('aria-label', 'Safety Tips');
    });

    it('should have category headings with matching id for aria-labelledby', () => {
      renderSafetyTipsPage();

      expect(
        screen.getByRole('heading', { name: /travel safety/i, level: 2 })
      ).toHaveAttribute('id', 'category-1-heading');
      expect(
        screen.getByRole('heading', { name: /workplace safety/i, level: 2 })
      ).toHaveAttribute('id', 'category-2-heading');
      expect(
        screen.getByRole('heading', { name: /online safety/i, level: 2 })
      ).toHaveAttribute('id', 'category-3-heading');
    });
  });
});
