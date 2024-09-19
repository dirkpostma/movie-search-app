import React from 'react';
import {store} from './core/store/store';
import {Provider} from 'react-redux';
import {SearchMovieScreen} from './features/search-movie/search-movie-screen';

export const App = () => {
  return (
    <Provider store={store}>
      <SearchMovieScreen />
    </Provider>
  );
};
