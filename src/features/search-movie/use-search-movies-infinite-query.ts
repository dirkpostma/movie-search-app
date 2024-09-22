import {useState, useEffect} from 'react';
import {useLazyGetSearchMoviesQuery} from '../../core/api/movie-api';
import {Movie} from '../../core/api/types';

type State = {
  page: number;
  pages: Movie[][];
};

export function useSearchMoviesInfiniteQuery() {
  const [query, setQuery] = useState<string>('');
  const [state, setState] = useState<State>({
    page: 1,
    pages: [],
  });
  const [hasMore, setHasMore] = useState<boolean>(false);

  const [trigger, {data, error, isLoading, isFetching}] =
    useLazyGetSearchMoviesQuery();

  useEffect(() => {
    if (query.length > 0) {
      setState({
        page: 1,
        pages: [],
      });
      trigger({query, page: 1});
    } else {
      setState({
        page: 1,
        pages: [],
      });
    }
  }, [query, trigger]);

  useEffect(() => {
    if (state.page > 1) {
      trigger({query, page: state.page});
    }
  }, [state.page, query, trigger]);

  useEffect(() => {
    if (data) {
      setState(prevState => ({
        ...prevState,
        pages: [...prevState.pages, data.results],
      }));
      setHasMore(data.results?.length > 0 && data.page < data.total_pages);
    }
  }, [data]);

  const loadMore = () => {
    if (!isFetching && hasMore) {
      setState(prevState => ({
        ...prevState,
        page: prevState.page + 1,
      }));
    }
  };

  const movies = state.pages.flat();

  return {
    query,
    setQuery,
    movies,
    isLoading,
    isFetching,
    error,
    loadMore,
    hasMore,
  };
}
