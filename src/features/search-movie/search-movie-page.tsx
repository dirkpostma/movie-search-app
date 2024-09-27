import React from 'react';
import {SearchMovie} from '../../core/ui/organisms/search-movie';
import {useSearchMovies} from './use-search-movies';
import {MainTemplate} from '../../core/ui/templates/main-template';

type Props = {
  onPressItem: (id: number) => void;
};

export const SearchMoviePage = ({onPressItem}: Props) => {
  const {
    query,
    setQuery,
    movies,
    isLoading,
    isFetching,
    error,
    loadMore,
    retryLastPage,
  } = useSearchMovies();

  return (
    <MainTemplate>
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
    </MainTemplate>
  );
};
