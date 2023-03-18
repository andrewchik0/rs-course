import React from 'react';
import { render } from '@testing-library/react';

import App from './App';
import { BrowserRouter } from 'react-router-dom';

it('renders app', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
