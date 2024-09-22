import React from 'react';
import {Movie} from '../../api/types';
import {SearchMovieTextInput} from '../molecules/search-movie-text-input';
import {SearchMovieResults} from '../molecules/search-movie-results';
import {MoviePopularPage} from '../../../features/movie-popular/movie-popular-page';

type Props = {
  query: string;
  setQuery: (text: string) => void;
  movies: Movie[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: boolean;
  onLoadMore: () => void;
  onPressItem: (id: number) => void;
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
}: Props) => {
  return (
    <>
      <SearchMovieTextInput onChange={e => setQuery(e.nativeEvent.text)} />

      {!query ? (
        <>
          <MoviePopularPage onPressItem={onPressItem} />
        </>
      ) : (
        <SearchMovieResults
          movies={movies}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          error={error}
          query={query}
          onLoadMore={onLoadMore}
          onPressItem={onPressItem}
        />
      )}
    </>
  );
};
