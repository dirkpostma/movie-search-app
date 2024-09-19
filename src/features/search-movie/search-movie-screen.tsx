import React from 'react';
import {SearchMovie} from './search-movie';
import {useSearchMoviesInfiniteQuery} from './use-search-movies-infinite-query';

export const SearchMovieScreen = () => {
  const {
    query,
    setQuery,
    movies,
    isLoading,
    isFetching,
    error,
    loadMore,
  } = useSearchMoviesInfiniteQuery();

  return (
    <SearchMovie
      query={query}
      onSearch={setQuery}
      movies={movies}
      isLoading={isLoading}
      isLoadingMore={isFetching}
      error={!!error}
      onLoadMore={loadMore}
    />
  );
};
