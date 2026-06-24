import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login form for unauthenticated user', () => {
  render(<App />);
  const heading = screen.getByText(/Welcome Back/i);
  expect(heading).toBeInTheDocument();
});
