import {configureStore} from '@reduxjs/toolkit';
import {movieApi} from '../api/movie-api';

export const store = configureStore({
  reducer: {
    movieApi: movieApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(movieApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
