import 'whatwg-fetch';
import React from 'react';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';

import PhotoModal from './PhotoModal';
import photos from '../../assets/photos.json';
import { act } from 'react-dom/test-utils';
import { renderWithProviders } from '../../utils/TestUtils';

describe('render modal window', () => {
  afterEach(cleanup);

  it('renders photo modal window', async () => {
    let showModal = true;
    await act(async () =>
      renderWithProviders(<PhotoModal photoId={'mock-id'} onClose={() => (showModal = false)} />)
    );

    expect(screen.getByTestId('roller')).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.getByText(new RegExp(photos.results[0].alt_description, 'i'))
      ).toBeInTheDocument();
      fireEvent.click(screen.getAllByText(/x/i)[0]);
      expect(showModal).toBe(false);
      showModal = true;
      fireEvent.click(screen.getByTestId('modal-layout'));
      expect(showModal).toBe(false);
      showModal = true;
      fireEvent.click(screen.getByTestId('modal-window'));
      expect(showModal).toBe(true);
      fireEvent.keyDown(screen.getByTestId('modal-layout'), {
        key: 'Escape',
        keyCode: 27,
        charCode: 27,
      });
      expect(showModal).toBe(false);
      showModal = true;
      fireEvent.keyDown(screen.getByTestId('modal-layout'), {
        key: 'Enter',
        keyCode: 13,
        charCode: 13,
      });
      expect(showModal).toBe(true);
    });
  });
});
