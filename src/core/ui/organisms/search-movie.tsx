import React from 'react';
import {Movie} from '../../api/types';
import {SearchMovieTextInput} from '../molecules/search-movie-text-input';
import {SearchMovieResults} from '../molecules/search-movie-results';
import {H3} from '../atoms/typography';

type Props = {
  query: string;
  setQuery: (text: string) => void;
  movies: Movie[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: boolean;
  onLoadMore: () => void;
  onPressItem: (id: number) => void;
  retry: () => void;
};

export const SearchMovie = ({
  query,
  setQuery,
  movies,
  isLoading,
  isLoadingMore,
  error,
  onLoadMore,
  onPressItem,
  retry,
}: Props) => {
  return (
    <>
      <SearchMovieTextInput onChange={e => setQuery(e.nativeEvent.text)} />

      {!query && <H3>Popular movies</H3>}
      {query && <H3>Results for "{query}":</H3>}

      <SearchMovieResults
        movies={movies}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        error={error}
        query={query}
        onLoadMore={onLoadMore}
        onPressItem={onPressItem}
        retry={retry}
      />
    </>
  );
};
