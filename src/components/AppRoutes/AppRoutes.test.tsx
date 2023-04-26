import React from 'react';

import { renderWithProviders } from '../../utils/TestUtils';
import AppRoutes from './AppRoutes';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

it('renders photo', async () => {
  await act(async () =>
    renderWithProviders(
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    )
  );
});
