import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { RootState, setupStore } from './store/store';
import { Provider } from 'react-redux';

import './index.css';
import './App.css';
import './components/Photo/Photo.css';
import './components/PhotoModal/PhotoModal.css';
import './components/Roller/Roller.css';
import { PreloadedState } from '@reduxjs/toolkit';
import AppRoutes from './components/AppRoutes/AppRoutes';

declare global {
  interface Window {
    __PRELOADED_STATE__?: PreloadedState<RootState>;
  }
}

const store = setupStore(window.__PRELOADED_STATE__);

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </BrowserRouter>
  );
}

delete window.__PRELOADED_STATE__;
export default App;
