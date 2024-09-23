import {useState, useEffect, useCallback, useRef} from 'react';
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
  const requestIdRef = useRef<number>(0);
  const currentQueryRef = useRef<string>('');

  const [trigger, {isLoading, isFetching}] = useLazyGetSearchMoviesQuery();

  useEffect(() => {
    const fetchData = async () => {
      setState({
        page: 1,
        pages: [],
        hasMore: false,
        error: false,
      });

      if (query.length === 0) {
        currentQueryRef.current = '';
        return;
      }

      currentQueryRef.current = query;
      const currentRequestId = ++requestIdRef.current;

      const response = await trigger({query, page: 1});
      if (
        currentRequestId !== requestIdRef.current ||
        query !== currentQueryRef.current
      ) {
        return;
      }
      if (response.data) {
        setState(prevState => ({
          ...prevState,
          pages: [response.data!.results],
          hasMore:
            response.data!.results.length > 0 &&
            response.data!.page < response.data!.total_pages,
        }));
      } else if (response.error) {
        if (
          currentRequestId === requestIdRef.current &&
          query === currentQueryRef.current
        ) {
          setState(prevState => ({...prevState, error: true}));
        }
      }
    };

    fetchData();
  }, [query, trigger]);

  const loadMore = useCallback(async () => {
    if (!isFetching && state.hasMore && query.length > 0 && !state.error) {
      const nextPage = state.page + 1;
      const currentRequestId = ++requestIdRef.current;

      setState(prevState => ({
        ...prevState,
        page: nextPage,
        error: false,
      }));
      const response = await trigger({query, page: nextPage});
      if (
        currentRequestId !== requestIdRef.current ||
        query !== currentQueryRef.current
      ) {
        return;
      }
      if (response.data) {
        setState(prevState => ({
          ...prevState,
          pages: [...prevState.pages, response.data!.results],
          hasMore:
            response.data!.results.length > 0 &&
            response.data!.page < response.data!.total_pages,
        }));
      } else if (response.error) {
        if (
          currentRequestId === requestIdRef.current &&
          query === currentQueryRef.current
        ) {
          setState(prevState => ({...prevState, error: true}));
        }
      }
    }
  }, [isFetching, state.hasMore, state.page, query, trigger, state.error]);

  const retryLastPage = useCallback(async () => {
    if (!isFetching && query.length > 0) {
      const currentRequestId = ++requestIdRef.current;

      setState(prevState => ({
        ...prevState,
        error: false,
      }));
      const response = await trigger({query, page: state.page});
      if (
        currentRequestId !== requestIdRef.current ||
        query !== currentQueryRef.current
      ) {
        return;
      }
      if (response.data) {
        setState(prevState => ({
          ...prevState,
          pages: [...prevState.pages, response.data!.results],
          hasMore:
            response.data!.results.length > 0 &&
            response.data!.page < response.data!.total_pages,
        }));
      } else if (response.error) {
        if (
          currentRequestId === requestIdRef.current &&
          query === currentQueryRef.current
        ) {
          setState(prevState => ({...prevState, error: true}));
        }
      }
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
