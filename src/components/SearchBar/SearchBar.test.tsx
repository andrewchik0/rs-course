import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import SearchBar from './SearchBar';
import { act } from 'react-dom/test-utils';

global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve() })) as jest.Mock;

describe('search bar saves value', () => {
  afterEach(cleanup);

  it('renders input', async () => {
    await act(async () => render(<SearchBar onInput={() => {}} />));
    await act(async () =>
      fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'test' } })
    );
  });

  it('saves input value', async () => {
    await act(async () => render(<SearchBar onInput={() => {}} />));
    expect(screen.getByPlaceholderText('Search...')).toHaveValue('test');
  });
});
