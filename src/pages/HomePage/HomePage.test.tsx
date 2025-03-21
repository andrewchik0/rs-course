import 'whatwg-fetch';
import React from 'react';

import HomePage from './HomePage';
import { act } from 'react-dom/test-utils';
import { renderWithProviders } from '../../utils/TestUtils';

global.fetch = jest.fn(() => Promise.resolve({ clone: () => Promise.resolve() })) as jest.Mock;

it('renders home page', async () => {
  await act(async () => renderWithProviders(<HomePage />));
});
