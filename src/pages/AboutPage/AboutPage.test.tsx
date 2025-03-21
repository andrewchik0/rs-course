import React from 'react';
import { screen } from '@testing-library/react';

import AboutPage from './AboutPage';
import { renderWithProviders } from '../../utils/TestUtils';

it('renders about page', () => {
  renderWithProviders(<AboutPage />);

  expect(screen.getByText(/about/i)).toBeInTheDocument();
});
