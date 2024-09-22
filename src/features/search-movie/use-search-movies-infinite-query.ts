import {useState, useEffect, useCallback} from 'react';
import {useLazyGetSearchMoviesQuery} from '../../core/api/movie-api';
import {Movie} from '../../core/api/types';

type State = {
  page: number;
  pages: Movie[][];
  hasMore: boolean;
  error?: boolean;
};

export function useSearchMoviesInfiniteQuery() {
  const [query, setQuery] = useState<string>('');
  const [state, setState] = useState<State>({
    page: 1,
    pages: [],
    hasMore: false,
    error: false,
  });

  const [trigger, {data, error, isLoading, isFetching}] =
    useLazyGetSearchMoviesQuery();

  // When the query changes, reset the state and trigger a fetch if query is not empty
  useEffect(() => {
    setState({
      page: 1,
      pages: [],
      hasMore: false,
      error: undefined,
    });
    if (query.length > 0) {
      trigger({query, page: 1});
    }
  }, [query, trigger]);

  useEffect(() => {
    if (error) {
      setState(prevState => ({
        ...prevState,
        error: true,
        hasMore: false,
      }));
    } else if (data && data.query === query) {
      setState(prevState => ({
        ...prevState,
        pages: [...prevState.pages, data.results],
        hasMore: data.results?.length > 0 && data.page < data.total_pages,
        error: false,
      }));
    }
  }, [data, error, query]);

  const loadMore = useCallback(() => {
    if (!isFetching && state.hasMore && query.length > 0 && !state.error) {
      const nextPage = state.page + 1;
      setState(prevState => ({
        ...prevState,
        page: nextPage,
        error: false,
      }));
      trigger({query, page: nextPage});
    }
  }, [isFetching, state.hasMore, state.page, query, trigger, state.error]);

  const retryLastPage = useCallback(() => {
    if (!isFetching && query.length > 0) {
      setState(prevState => ({
        ...prevState,
        error: false,
      }));
      trigger({query, page: state.page});
    }
  }, [isFetching, query, state.page, trigger]);

  const movies = state.pages.flat();

  return {
    query,
    setQuery,
    movies,
    isLoading,
    isFetching,
    error: state.error,
    loadMore,
    hasMore: state.hasMore,
    retryLastPage,
  };
}
