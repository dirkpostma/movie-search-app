import React from 'react';
import {MovieList} from './movie-list';
import {P} from '../atoms/typography';
import {Movie} from '../../api/types';

type Props = {
  movies: Movie[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: boolean;
  query: string;
  onLoadMore: () => void;
  onPressItem: (id: number) => void;
};

export const SearchMovieResults = ({
  movies,
  isLoading,
  isLoadingMore,
  error,
  query,
  onLoadMore,
  onPressItem,
}: Props) => {
  if (isLoading) {
    return <P>Loading...</P>;
  }

  if (error) {
    return <P>Error loading movies</P>;
  }

  if (!isLoadingMore && query && movies.length === 0) {
    return <P>No movies found</P>;
  }

  return (
    <MovieList
      movies={movies}
      isLoadingMore={isLoadingMore}
      onLoadMore={onLoadMore}
      onPressItem={onPressItem}
    />
  );
};
