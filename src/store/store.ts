import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import cardReducer from './reducers/CardSlice';
import searchInputReducer from './reducers/SearchInputSlice';
import { photoAPI } from '../services/PhotoService';

const rootReducer = combineReducers({
  cardReducer,
  searchInputReducer,
  [photoAPI.reducerPath]: photoAPI.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(photoAPI.middleware),
    preloadedState: preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
