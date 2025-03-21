import 'whatwg-fetch';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';

import Photos from './Photos';
import photos from '../../assets/photos.json';
import { renderWithProviders } from '../../utils/TestUtils';
import { act } from 'react-dom/test-utils';

it('renders all photos', async () => {
  await act(async () => renderWithProviders(<Photos />));

  await waitFor(() => {
    photos.results.forEach((photo) => {
      expect(screen.getAllByText(new RegExp(photo.alt_description, 'i'))[0]).toBeInTheDocument();
    });
  });
});
