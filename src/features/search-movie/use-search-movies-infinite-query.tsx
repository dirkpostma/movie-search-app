import {useCallback, useEffect, useState} from 'react';
import {useGetSearchMoviesQuery} from '../../core/api/movie-api';

export const useSearchMoviesInfiniteQuery = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const {data, isLoading, isFetching, error, refetch} =
    useGetSearchMoviesQuery(
      {query, page},
      {skip: query === '', refetchOnMountOrArgChange: true},
    );

  const loadMore = useCallback(() => {
    if (!isFetching && data && data.page < data.total_pages) {
      setPage(prevPage => prevPage + 1);
    }
  }, [data, isFetching]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  return {
    query,
    setQuery,
    movies: (page === 1 && isFetching) ? [] : data?.results || [],
    isLoading,
    isFetching,
    error,
    retryLastPage: refetch,
    loadMore,
    hasMore: data && data.page < data.total_pages,
  };
};
