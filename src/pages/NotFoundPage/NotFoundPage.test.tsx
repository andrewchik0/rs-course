import React from 'react';
import { screen } from '@testing-library/react';

import NotFoundPage from './NotFoundPage';
import { renderWithProviders } from '../../utils/TestUtils';

it('renders not found page', () => {
  renderWithProviders(<NotFoundPage />);

  expect(screen.getByText(/404/)).toBeInTheDocument();
});
