import React from 'react';
import { render, screen } from '@testing-library/react';

import Card from './Card';
import cards from '../../assets/cards.json';

describe('renders card', () => {
  it('renders card', () => {
    const { ['birthday']: stringDate, ...cardObject } = cards[0];

    Object.defineProperties(cardObject, {
      birthday: {
        value: new Date(stringDate),
        writable: true,
      },
    });
    render(<Card card={Object.assign(cardObject, { birthday: new Date() })} />);

    expect(screen.getByText(cards[0].name)).toBeInTheDocument();
    expect(
      screen.getByText(cards[0].microchipped ? 'Microchipped' : 'Not microchipped')
    ).toBeInTheDocument();
    expect(screen.getByText(cards[0].breed)).toBeInTheDocument();
    expect(screen.getByText(/Day/)).toBeInTheDocument();
  });

  it('renders card', () => {
    const { ['birthday']: stringDate, ...cardObject } = cards[0];

    Object.defineProperties(cardObject, {
      birthday: {
        value: new Date(stringDate),
        writable: true,
      },
    });
    const now = new Date();
    const date = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate() - 4);
    render(<Card card={Object.assign(cardObject, { birthday: date })} />);
    expect(screen.getByText(/Month/)).toBeInTheDocument();
  });

  it('renders card', () => {
    const { ['birthday']: stringDate, ...cardObject } = cards[0];

    Object.defineProperties(cardObject, {
      birthday: {
        value: new Date(stringDate),
        writable: true,
      },
    });
    const now = new Date();
    const date = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    render(<Card card={Object.assign(cardObject, { birthday: date })} />);
    expect(screen.getByText(/Year/)).toBeInTheDocument();
  });
});
