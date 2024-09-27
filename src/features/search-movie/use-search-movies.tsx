import {useMoviePopularInfiniteQuery} from './use-movie-popular-infinite-query';
import {useSearchMoviesInfiniteQuery} from './use-search-movies-infinite-query';

export function useSearchMovies() {
  const {
    movies: popularMovies,
    isLoading: isLoadingPopular,
    isFetching: isFetchingPopular,
    error: errorPopular,
    loadMore: loadMorePopular,
    hasMore: hasMorePopular,
    retryLastPage: retryLastPagePopular,
  } = useMoviePopularInfiniteQuery();

  const {
    query,
    setQuery,
    movies: searchMovies,
    isLoading: isLoadingSearch,
    isFetching: isFetchingSearch,
    error: errorSearch,
    loadMore: loadMoreSearch,
    hasMore: hasMoreSearch,
    retryLastPage: retryLastPageSearch,
  } = useSearchMoviesInfiniteQuery();

  const movies = query ? searchMovies : popularMovies;
  const isLoading = query ? isLoadingSearch : isLoadingPopular;
  const isFetching = query ? isFetchingSearch : isFetchingPopular;
  const error = query ? errorSearch : errorPopular;
  const loadMore = query ? loadMoreSearch : loadMorePopular;
  const hasMore = query ? hasMoreSearch : hasMorePopular;
  const retryLastPage = query ? retryLastPageSearch : retryLastPagePopular;

  return {
    query,
    setQuery,
    movies,
    isLoading,
    isFetching,
    error,
    loadMore,
    hasMore,
    retryLastPage,
  };
}
