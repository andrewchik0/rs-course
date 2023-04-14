import React from 'react';

import { renderWithProviders } from '../../utils/TestUtils';
import Photo from './Photo';
import photos from '../../assets/photos.json';
import IPhoto from '../../models/IPhoto';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';

it('renders photo', async () => {
  renderWithProviders(<Photo photo={photos.results[0] as IPhoto} />);
  expect(screen.getByText(new RegExp(photos.results[0].alt_description, 'i'))).toBeInTheDocument();

  await act(() => fireEvent.click(screen.getByRole('img')));
  await waitFor(async () => {
    expect(screen.getAllByText(new RegExp(photos.results[0].alt_description, 'i')).length).toBe(2);
    await act(() => fireEvent.click(screen.getByTestId('close-cross')));
  });
});
