import React from 'react';
import { render, screen } from '@testing-library/react';
import EmergencyContactsPage from '../components/EmergencyContactsPage';

describe('EmergencyContactsPage', () => {
  const renderPage = () => {
    return render(<EmergencyContactsPage />);
  };

  describe('renders all emergency contacts', () => {
    it('should render the Police contact', () => {
      // Arrange & Act
      renderPage();

      // Assert
      expect(screen.getByText('Police')).toBeInTheDocument();
    });

    it('should render the Women Helpline contact', () => {
      // Arrange & Act
      renderPage();

      // Assert
      expect(screen.getByText('Women Helpline')).toBeInTheDocument();
    });

    it('should render the Ambulance contact', () => {
      // Arrange & Act
      renderPage();

      // Assert
      expect(screen.getByText('Ambulance')).toBeInTheDocument();
    });

    it('should render the Fire Brigade contact', () => {
      // Arrange & Act
      renderPage();

      // Assert
      expect(screen.getByText('Fire Brigade')).toBeInTheDocument();
    });

    it('should render all 4 emergency contacts', () => {
      // Arrange & Act
      renderPage();

      // Assert
      const contactNames = ['Police', 'Women Helpline', 'Ambulance', 'Fire Brigade'];
      contactNames.forEach((name) => {
        expect(screen.getByText(name)).toBeInTheDocument();
      });
    });
  });

  describe('tel: links', () => {
    it('should render a tel: link for Police (100)', () => {
      // Arrange & Act
      renderPage();

      // Assert
      const link = screen.getByRole('link', { name: /call police at 100/i });
      expect(link).toHaveAttribute('href', 'tel:100');
    });

    it('should render a tel: link for Women Helpline (1091)', () => {
      // Arrange & Act
      renderPage();

      // Assert
      const link = screen.getByRole('link', { name: /call women helpline at 1091/i });
      expect(link).toHaveAttribute('href', 'tel:1091');
    });

    it('should render a tel: link for Ambulance (102)', () => {
      // Arrange & Act
      renderPage();

      // Assert
      const link = screen.getByRole('link', { name: /call ambulance at 102/i });
      expect(link).toHaveAttribute('href', 'tel:102');
    });

    it('should render a tel: link for Fire Brigade (101)', () => {
      // Arrange & Act
      renderPage();

      // Assert
      const link = screen.getByRole('link', { name: /call fire brigade at 101/i });
      expect(link).toHaveAttribute('href', 'tel:101');
    });
  });

  describe('accessibility', () => {
    it('should render a main landmark with aria-label', () => {
      // Arrange & Act
      renderPage();

      // Assert
      const main = screen.getByRole('main');
      expect(main).toHaveAttribute('aria-label', 'Emergency Contacts');
    });

    it('should render a section with aria-labelledby pointing to the heading', () => {
      // Arrange & Act
      const { container } = renderPage();

      // Assert
      const section = container.querySelector('section');
      expect(section).toHaveAttribute('aria-labelledby', 'emergency-contacts-heading');
    });

    it('should render an h1 heading with the correct id', () => {
      // Arrange & Act
      renderPage();

      // Assert
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveAttribute('id', 'emergency-contacts-heading');
      expect(heading).toHaveTextContent('Emergency Contacts');
    });
  });
});
