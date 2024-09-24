import {useState, useEffect, useCallback, useRef} from 'react';
import {useLazyGetSearchMoviesQuery} from '../../core/api/movie-api';
import {Movie} from '../../core/api/types';

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

export function useSearchMoviesInfiniteQuery() {
  const [query, setQuery] = useState<string>('');
  const [state, setState] = useState<State>(initialState);
  const requestIdRef = useRef<number>(0);
  const currentQueryRef = useRef<string>('');

  const [trigger, {isLoading, isFetching}] = useLazyGetSearchMoviesQuery();

  const fetchPage = useCallback(
    async ({searchQuery, page}: {searchQuery: string; page: number}) => {
      const currentRequestId = ++requestIdRef.current;
      const response = await trigger({query: searchQuery, page});

      if (
        currentRequestId !== requestIdRef.current ||
        query !== currentQueryRef.current
      ) {
        return;
      }

      if (response.data) {
        const {results, page: pageResponse, total_pages} = response.data;
        setState(prevState => ({
          ...prevState,
          pages: [...prevState.pages, results],
          hasMore: results.length > 0 && pageResponse < total_pages,
        }));
      } else if (response.error) {
        if (
          currentRequestId === requestIdRef.current &&
          query === currentQueryRef.current
        ) {
          setState(prevState => ({...prevState, error: true}));
        }
      }
    },
    [trigger, query],
  );

  useEffect(() => {
    const fetchData = async () => {
      setState(initialState);

      if (query.length === 0) {
        currentQueryRef.current = '';
        return;
      }

      currentQueryRef.current = query;
      fetchPage({searchQuery: query, page: 1});
    };

    fetchData();
  }, [query, fetchPage]);

  const loadMore = useCallback(async () => {
    if (!isFetching && state.hasMore && query.length > 0 && !state.error) {
      const nextPage = state.page + 1;

      setState(prevState => ({
        ...prevState,
        page: nextPage,
        error: false,
      }));

      fetchPage({searchQuery: query, page: nextPage});
    }
  }, [isFetching, state.hasMore, state.error, fetchPage, query, state.page]);

  const retryLastPage = useCallback(async () => {
    if (!isFetching && query.length > 0) {
      setState(prevState => ({
        ...prevState,
        error: false,
      }));

      fetchPage({searchQuery: query, page: state.page});
    }
  }, [isFetching, query, state.page, fetchPage]);

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
