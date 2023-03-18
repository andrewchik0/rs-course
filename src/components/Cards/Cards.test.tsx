import React from 'react';
import { render, screen } from '@testing-library/react';

import cards from '../../assets/cards.json';
import Cards from './Cards';

it('renders all cards', () => {
  render(<Cards />);

  cards.cards.forEach((card, index) => {
    expect(screen.getAllByRole('img')[index]).toHaveAttribute('src', card.img);
    expect(screen.getAllByText(card.price + card.currency)[0]).toBeInTheDocument();
    expect(screen.getAllByText(card.description)[0]).toBeInTheDocument();
    expect(screen.getAllByText(card.name)[0]).toBeInTheDocument();
  });
});
