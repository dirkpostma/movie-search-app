import React from 'react';
import {Movie} from '../../api/types';
import {Screen} from '../atoms/screen';
import {SearchMovieTextInput} from '../molecules/search-movie-text-input';
import {SearchMovieResults} from '../molecules/search-movie-results';

type Props = {
  query: string;
  setQuery: (text: string) => void;
  movies: Movie[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: boolean;
  onLoadMore: () => void;
};

export const SearchMovie = ({
  query,
  setQuery,
  movies,
  isLoading,
  isLoadingMore,
  error,
  onLoadMore,
}: Props) => {
  return (
    <Screen>
      <SearchMovieTextInput onChange={e => setQuery(e.nativeEvent.text)} />
      <SearchMovieResults
        movies={movies}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        error={error}
        query={query}
        onLoadMore={onLoadMore}
      />
    </Screen>
  );
};
