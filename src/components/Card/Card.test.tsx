import React from 'react';
import { render, screen } from '@testing-library/react';

import Card from './Card';
import cards from '../../assets/cards.json';

it('renders card', () => {
  render(<Card card={cards.cards[0]} />);

  expect(screen.getByText(cards.cards[0].name)).toBeInTheDocument();
  expect(screen.getByText(cards.cards[0].price + cards.cards[0].currency)).toBeInTheDocument();
  expect(screen.getByText(cards.cards[0].description)).toBeInTheDocument();
});
