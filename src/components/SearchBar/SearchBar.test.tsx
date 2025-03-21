import 'whatwg-fetch';
import React from 'react';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';

import SearchBar from './SearchBar';
import { act } from '@testing-library/react';
import { cleanUpStore, renderWithProviders } from '../../utils/TestUtils';

global.fetch = jest.fn(() => Promise.resolve({ clone: () => Promise.resolve() })) as jest.Mock;

describe('search bar', () => {
  beforeEach(async () => {
    await act(async () => renderWithProviders(<SearchBar />));
    await act(async () =>
      fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: 'test' } })
    );
    await waitFor(() => expect(screen.getByRole('img')).toBeInTheDocument());
  });
  afterEach(() => {
    cleanup();
    cleanUpStore();
  });

  it('handles search button click', async () => {
    await act(async () => fireEvent.click(screen.getByRole('button')));
    expect(screen.getByTestId('roller')).toBeInTheDocument();

    await waitFor(() => expect(screen.getByRole('img')).toBeInTheDocument());
  });
  it('handles on enter event', async () => {
    await act(async () =>
      fireEvent.keyDown(screen.getByPlaceholderText(/search/i), {
        key: 'Enter',
        code: 13,
        charCode: 13,
      })
    );
    expect(screen.getByTestId('roller')).toBeInTheDocument();

    await waitFor(() => expect(screen.getByRole('img')).toBeInTheDocument());
  });
  it('handles any other key pressed', async () => {
    fireEvent.keyDown(screen.getByPlaceholderText(/search/i), {
      key: 'Esc',
      code: 27,
      charCode: 27,
    });
    await waitFor(() => expect(screen.getByRole('img')).toBeInTheDocument());
  });
});
