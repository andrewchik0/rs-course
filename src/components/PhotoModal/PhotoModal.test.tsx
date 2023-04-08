import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import PhotoModal from './PhotoModal';
import photos from '../../assets/photos.json';
import { act } from 'react-dom/test-utils';

global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve(photos.results[0]) })
) as jest.Mock;

it('renders all photos', async () => {
  await act(async () => render(<PhotoModal photoId={photos.results[0].id} onClose={() => {}} />));

  expect(
    screen.getAllByText(new RegExp(photos.results[0].alt_description, 'i'))[0]
  ).toBeInTheDocument();
  fireEvent.click(screen.getAllByText(/x/i)[0]);
});
