import React from 'react';
import {SearchMovie} from '../../core/ui/templates/search-movie';
import {useSearchMoviesInfiniteQuery} from './use-search-movies-infinite-query';

export const SearchMovieScreen = () => {
  const {query, setQuery, movies, isLoading, isFetching, error, loadMore} =
    useSearchMoviesInfiniteQuery();

  return (
    <SearchMovie
      query={query}
      setQuery={setQuery}
      movies={movies}
      isLoading={isLoading}
      isLoadingMore={isFetching}
      error={!!error}
      onLoadMore={loadMore}
    />
  );
};
