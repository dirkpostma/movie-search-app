import { useState, useEffect, useCallback, useRef } from 'react';
import { useLazyGetMoviePopularQuery } from '../../core/api/movie-api';
import { Movie } from '../../core/api/types';

type State = {
  page: number;
  pages: Movie[][];
  hasMore: boolean;
  error?: boolean;
};

const initialState: State = {
  page: 1,
  pages: [],
  hasMore: false,
  error: false,
};

export function useMoviePopularInfiniteQuery() {
  const [state, setState] = useState<State>(initialState);
  const requestIdRef = useRef<number>(0);

  const [triggerPopular, { isFetching }] = useLazyGetMoviePopularQuery();

  const fetchPage = useCallback(
    async (page: number) => {
      const currentRequestId = ++requestIdRef.current;
      const response = await triggerPopular({ page });

      if (currentRequestId !== requestIdRef.current) {
        return;
      }

      if (response.data) {
        const { results, page: pageResponse, total_pages } = response.data;
        setState((prevState) => ({
          ...prevState,
          pages: [...prevState.pages, results],
          hasMore: results.length > 0 && pageResponse < total_pages,
        }));
      } else if (response.error) {
        if (currentRequestId === requestIdRef.current) {
          setState((prevState) => ({ ...prevState, error: true }));
        }
      }
    },
    [triggerPopular]
  );

  useEffect(() => {
    setState(initialState);
    fetchPage(1);
  }, [fetchPage]);

  const loadMore = useCallback(async () => {
    if (!state.error && state.hasMore && !isFetching) {
      const nextPage = state.page + 1;

      setState((prevState) => ({
        ...prevState,
        page: nextPage,
        error: false,
      }));

      fetchPage(nextPage);
    }
  }, [state.error, state.hasMore, state.page, fetchPage, isFetching]);

  const retryLastPage = useCallback(() => {
    if (!isFetching) {
      setState((prevState) => ({
        ...prevState,
        error: false,
      }));

      fetchPage(state.page);
    }
  }, [state.page, fetchPage, isFetching]);

  const movies = state.pages.flat();
  const isLoading = state.page === 1 && isFetching;
  const error = state.error;

  return {
    movies,
    isLoading,
    isFetching,
    error,
    loadMore,
    hasMore: state.hasMore,
    retryLastPage,
  };
}
