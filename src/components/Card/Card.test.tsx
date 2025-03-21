import React from 'react';
import { screen } from '@testing-library/react';

import Card from './Card';
import cards from '../../assets/cards.json';
import { renderWithProviders } from '../../utils/TestUtils';

describe('renders card', () => {
  it('renders card', () => {
    const { ['birthday']: stringDate, ...cardObject } = cards[0];

    Object.defineProperties(cardObject, {
      birthday: {
        value: new Date(stringDate),
        writable: true,
      },
    });
    renderWithProviders(<Card card={Object.assign(cardObject, { birthday: Date.now() })} />);

    expect(screen.getByText(cards[0].name)).toBeInTheDocument();
    expect(
      screen.getByText(cards[0].microchipped ? 'Microchipped' : 'Not microchipped')
    ).toBeInTheDocument();
    expect(screen.getByText(cards[0].breed)).toBeInTheDocument();
    expect(screen.getByText(/Days/)).toBeInTheDocument();
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
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    renderWithProviders(<Card card={Object.assign(cardObject, { birthday: date.getTime() })} />);
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
    renderWithProviders(<Card card={Object.assign(cardObject, { birthday: date.getTime() })} />);
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
    renderWithProviders(<Card card={Object.assign(cardObject, { birthday: date.getTime() })} />);
    expect(screen.getByText(/Year/)).toBeInTheDocument();
  });
});
