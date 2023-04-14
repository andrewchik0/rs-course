import 'whatwg-fetch';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { setupStore } from '../store/store';

let store = setupStore();

export function cleanUpStore() {
  store = setupStore();
}

export function renderWithProviders(ui: React.ReactElement) {
  return render(<Provider store={store}>{ui}</Provider>);
}
