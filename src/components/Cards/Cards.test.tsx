import React from 'react';
import { screen } from '@testing-library/react';

import cards from '../../assets/cards.json';
import Cards from './Cards';
import { renderWithProviders } from '../../utils/TestUtils';

it('renders all cards', () => {
  renderWithProviders(<Cards />);

  cards.forEach((card, index) => {
    expect(screen.getAllByRole('img')[index]).toHaveAttribute('src', card.img);
    expect(screen.getAllByText(card.name)[0]).toBeInTheDocument();
    expect(
      screen.getAllByText(card.microchipped ? 'Microchipped' : 'Not microchipped')[0]
    ).toBeInTheDocument();
    expect(screen.getAllByText(card.breed)[0]).toBeInTheDocument();
  });
});
