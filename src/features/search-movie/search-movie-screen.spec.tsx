import 'react-native';
import React from 'react';
import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  afterEach,
} from '@jest/globals';
import {
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';

import {Provider} from 'react-redux';
import {SearchMovieScreen} from './search-movie-screen';
import {store} from '../../core/store/store';

import {setupServer} from 'msw/node';
import {http, HttpResponse} from 'msw';
import { movieApi } from '../../core/api/movie-api';

const movies = [
  {id: 1, title: 'The Matrix'},
  {id: 2, title: 'Inception'},
];

const buildResponse = (query: string) => {
  const results = movies.filter(movie =>
    movie.title.toLowerCase().includes(query.toLowerCase()),
  );

  return {
    page: 1,
    results,
    total_pages: 1,
    total_results: results.length,
  };
};

export const handlers = [
  http.get('https://api.themoviedb.org/3/search/movie', async ({request}) => {
    const url = request?.url;
    let searchParams: URLSearchParams | undefined;
    let query = '';

    if (url) {
      const urlObj = new URL(url);
      searchParams = urlObj.searchParams;
      query = searchParams.get('query') || '';
    }

    await new Promise(resolve => setTimeout(resolve, 100));

    const response = buildResponse(query);

    return HttpResponse.json(response);
  }),
];

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();

  // Prevent warning: A worker process has failed to exit gracefully
  // and has been force exited. This is likely caused by tests
  // leaking due to improper teardown.
  store.dispatch(movieApi.util.resetApiState());
});
afterAll(() => server.close());

const TestComponent = () => {
  return (
    <Provider store={store}>
      <SearchMovieScreen />
    </Provider>
  );
};

describe('SearchMovieScreen', () => {
  it('should shows both matrix and inception when user searches for `i`', async () => {
    const {findByPlaceholderText, findByText, unmount} = render(
      <TestComponent />,
    );

    const textField = await findByPlaceholderText('Search movies...');
    expect(textField).toBeDefined();

    fireEvent(textField, 'change', {nativeEvent: {text: 'i'}});

    await waitFor(async () => {
      expect(await findByText('#1 - The Matrix')).toBeDefined();
      expect(await findByText('#2 - Inception')).toBeDefined();
    });

    // Prevent warning: ReferenceError: You are trying to access a property
    // or method of the Jest environment after it has been torn down.
    unmount();
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  it('should only show inception if user searches for `inc`', async () => {
    server.resetHandlers();

    const {findByPlaceholderText, findByText, queryByText, unmount} = render(
      <TestComponent />,
    );

    const textField = await findByPlaceholderText('Search movies...');
    expect(textField).toBeDefined();

    fireEvent(textField, 'change', {nativeEvent: {text: 'inc'}});

    await waitFor(async () => {
      const movieItem = await findByText('#2 - Inception');
      expect(movieItem).toBeDefined();
    });

    expect(queryByText('#1 - The Matrix')).toBeNull();

    unmount();
    await new Promise(resolve => setTimeout(resolve, 500));
  });
  it('should show `no movies found` when users searches for `qwerasdf`', async () => {
    const {findByPlaceholderText, findByText, queryByText, unmount} = render(
      <TestComponent />,
    );

    const textField = await findByPlaceholderText('Search movies...');
    fireEvent(textField, 'change', {nativeEvent: {text: 'qwerasdf'}});

    await waitForElementToBeRemoved(() => queryByText('Loading...'));

    await waitFor(async () => {
      const noMoviesFoundMessage = await findByText('No movies found');
      expect(noMoviesFoundMessage).toBeDefined();
    });

    unmount();
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  it('should show error message when 500 response is received', async () => {
    server.use(
      http.get('*', () => {
        return new HttpResponse({}, {status: 500});
      }),
    );

    const {findByPlaceholderText, findByText, unmount} = render(
      <TestComponent />,
    );

    const textField = await findByPlaceholderText('Search movies...');
    fireEvent(textField, 'change', {nativeEvent: {text: 'inc'}});

    await waitFor(async () => {
      const movieItem = await findByText('Error loading movies');
      expect(movieItem).toBeDefined();
    });

    unmount();
    await new Promise(resolve => setTimeout(resolve, 500));
  });
});
