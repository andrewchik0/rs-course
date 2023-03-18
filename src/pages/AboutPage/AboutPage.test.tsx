import React from 'react';
import { render, screen } from '@testing-library/react';

import AboutPage from './AboutPage';

it('renders about page', () => {
  render(<AboutPage />);

  expect(screen.getByText(/about/i)).toBeInTheDocument();
});
