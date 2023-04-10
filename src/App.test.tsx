import React from 'react';
import { render } from '@testing-library/react';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve() })) as jest.Mock;

it('renders app', async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
  );
});
