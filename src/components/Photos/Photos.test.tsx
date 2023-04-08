import React from 'react';
import { render, screen } from '@testing-library/react';

import Photos from './Photos';
import photos from '../../assets/photos.json';
import { IPhoto } from 'models/IPhoto';

it('renders all photos', async () => {
  const response = JSON.stringify(photos);
  render(<Photos photos={response} />);

  JSON.parse(response).results.forEach((photo: IPhoto) => {
    expect(screen.getAllByText(new RegExp(photo.alt_description, 'i'))[0]).toBeInTheDocument();
  });
});
