import React from 'react';
import { render } from '@testing-library/react';

import HomePage from './HomePage';
import { act } from 'react-dom/test-utils';

global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve() })) as jest.Mock;

it('renders home page', async () => {
  await act(async () => render(<HomePage />));
});
