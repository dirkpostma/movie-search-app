import 'react-native';
import React from 'react';
import {
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {store} from '../../core/store/store';
import {http, HttpResponse} from 'msw';
import {SearchMoviePage} from './search-movie-page';
import {server} from './tests/test-setup-msw-mock-movies';
import { movieApi } from '../../core/api/movie-api';

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
      <SearchMoviePage onPressItem={jest.fn()} />
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
      expect(await findByText('The Matrix')).toBeDefined();
      expect(await findByText('Inception')).toBeDefined();
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
      const movieItem = await findByText('Inception');
      expect(movieItem).toBeDefined();
    });

    expect(queryByText('The Matrix')).toBeNull();

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
