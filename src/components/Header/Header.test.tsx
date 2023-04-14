import React from 'react';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Header from './Header';
import { renderWithProviders } from '../../utils/TestUtils';

it('renders header', () => {
  renderWithProviders(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('About')).toBeInTheDocument();
});
