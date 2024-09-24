import React from 'react';
import {SearchMovie} from '../../core/ui/organisms/search-movie';
import {useSearchMoviesInfiniteQuery} from './use-search-movies-infinite-query';

type Props = {
  onPressItem: (id: number) => void;
};

export const SearchMoviePage = ({onPressItem}: Props) => {
  const {query, setQuery, movies, isLoading, isFetching, error, loadMore, retryLastPage} =
    useSearchMoviesInfiniteQuery();

  return (
    <SearchMovie
      query={query}
      setQuery={setQuery}
      movies={movies}
      isLoading={isLoading}
      isLoadingMore={isFetching}
      error={!!error}
      retry={retryLastPage}
      onLoadMore={loadMore}
      onPressItem={onPressItem}
    />
  );
};
