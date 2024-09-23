import React from 'react';
import {renderHook, act} from '@testing-library/react-hooks';
import {Provider} from 'react-redux';
import {setFetchFunction, setMockBaseQuery} from '../../../core/api/base-query';
import {useSearchMoviesInfiniteQuery} from '../use-search-movies-infinite-query';
import {configureStore} from '@reduxjs/toolkit';
import {movieApi} from '../../../core/api/movie-api';

const API_DELAY_MS = 1000;

const mockStore = configureStore({
  reducer: {
    movieApi: movieApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(movieApi.middleware),
});

const Wrapper = ({children}: {children: React.ReactNode}) => {
  return <Provider store={mockStore}>{children}</Provider>;
};

describe('useSearchMoviesInfiniteQuery', () => {
  beforeAll(() => {
    setMockBaseQuery();
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      mockStore.dispatch(movieApi.util.resetApiState());
    });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should search movies and be able to load more (happy flow)', async () => {
    const {result, rerender} = renderHook(
      () => useSearchMoviesInfiniteQuery(),
      {
        wrapper: Wrapper,
      },
    );

    expect(result.current.query).toBe('');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.error).toBe(false);
    expect(result.current.movies).toHaveLength(0);
    expect(result.current.hasMore).toBe(false);

    // ACT: user searches for "f"
    act(() => {
      result.current.setQuery('f');
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isFetching).toBe(true);

    await act(async () => {
      jest.advanceTimersByTime(API_DELAY_MS);
    });
    rerender();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.movies).toHaveLength(5);
    expect(result.current.movies[0].title).toBe('Officer Black Belt');

    act(() => {
      result.current.loadMore();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(true);
    expect(result.current.movies).toHaveLength(5);

    await act(async () => {
      jest.advanceTimersByTime(API_DELAY_MS);
    });
    rerender();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.movies).toHaveLength(10);
    expect(result.current.movies[6].title).toBe('Furiosa: A Mad Max Saga');

    act(() => {
      result.current.loadMore();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(true);
    expect(result.current.movies).toHaveLength(10);

    await act(async () => {
      jest.advanceTimersByTime(API_DELAY_MS);
    });
    rerender();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.movies).toHaveLength(12);

    act(() => {
      result.current.loadMore();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(false); // don't fetch when hasMore is false
    expect(result.current.movies).toHaveLength(12);

    await act(async () => {
      jest.advanceTimersByTime(API_DELAY_MS);
    });
    rerender();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.movies).toHaveLength(12);
  });

  it('should ignore responses after triggering loadmore and clear quickly', async () => {
    const {result, rerender} = renderHook(
      () => useSearchMoviesInfiniteQuery(),
      {
        wrapper: Wrapper,
      },
    );

    expect(result.current.query).toBe('');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.error).toBe(false);
    expect(result.current.movies).toHaveLength(0);
    expect(result.current.hasMore).toBe(false);

    act(() => {
      result.current.setQuery('f');
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isFetching).toBe(true);

    await act(async () => {
      jest.advanceTimersByTime(API_DELAY_MS);
    });
    rerender();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(false);

    act(() => {
      result.current.loadMore();
    });

    await act(async () => {
      jest.advanceTimersByTime(10);
    });
    rerender();

    act(() => {
      result.current.setQuery('');
    });

    await act(async () => {
      jest.advanceTimersByTime(API_DELAY_MS);
    });
    rerender();

    act(() => {
      result.current.setQuery('f');
    });

    await act(async () => {
      jest.advanceTimersByTime(API_DELAY_MS);
    });
    rerender();

    expect(result.current.movies).toHaveLength(5);
  });

  it('should ignore response triggered with different query', async () => {
    const {result, rerender} = renderHook(
      () => useSearchMoviesInfiniteQuery(),
      {
        wrapper: Wrapper,
      },
    );

    act(() => {
      result.current.setQuery('f');
    });

    await act(async () => {
      jest.advanceTimersByTime(API_DELAY_MS);
    });
    rerender();

    act(() => {
      result.current.loadMore();
    });

    await act(async () => {
      jest.advanceTimersByTime(10);
    });
    rerender();

    act(() => {
      result.current.setQuery('');
    });

    await act(async () => {
      jest.advanceTimersByTime(API_DELAY_MS);
    });
    rerender();

    expect(result.current.movies).toHaveLength(0);
  });

  it('should set error in case request fails', async () => {
    const {result, rerender} = renderHook(
      () => useSearchMoviesInfiniteQuery(),
      {
        wrapper: Wrapper,
      },
    );

    setFetchFunction(async () => {
      throw new Error('My custom error');
    });

    act(() => {
      result.current.setQuery('f');
    });

    await act(async () => {
      jest.advanceTimersByTime(API_DELAY_MS);
    });
    rerender();

    expect(result.current.movies).toHaveLength(0);
    expect(result.current.error).toBe(true);
  });
});
