import React from 'react';
import { render, screen } from '@testing-library/react';

import NotFoundPage from './NotFoundPage';

it('renders not found page', () => {
  render(<NotFoundPage />);

  expect(screen.getByText(/404/)).toBeInTheDocument();
});
