import 'whatwg-fetch';
import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { AppStore, RootState, setupStore } from '../store/store'
import cardReducer from '../store/reducers/CardSlice'
import searchInputReducer from '../store/reducers/SearchInputSlice'
import { photoAPI } from '../services/PhotoService'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

let store = setupStore();

export function cleanUpStore() {
  store = setupStore();
}

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  )
}