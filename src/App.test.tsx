import 'whatwg-fetch';
import React from 'react';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { renderWithProviders } from './utils/TestUtils';

global.fetch = jest.fn(() => Promise.resolve({ clone: () => Promise.resolve() })) as jest.Mock;

it('renders app', async () => {
  await act(async () =>
    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
  );
});
