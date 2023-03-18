import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import SearchBar from './SearchBar';

describe('search bar saves value', () => {
  afterEach(cleanup);

  it('renders input', () => {
    render(<SearchBar />);
    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'test' } });
  });

  it('saves input value', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText('Search...')).toHaveValue('test');
  });
});
