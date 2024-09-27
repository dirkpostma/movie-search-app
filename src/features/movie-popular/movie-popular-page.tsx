import React from 'react';
import {useMoviePopularInfiniteQuery} from './use-movie-popular-infinite-query';
import {H1, P} from '../../core/ui/atoms/typography';
import {MovieList} from '../../core/ui/molecules/movie-list';

type Props = {
  onPressItem: (id: number) => void;
};

export const MoviePopularPage = ({onPressItem}: Props) => {
  const {movies, isLoading, error, loadMore, isFetching} =
    useMoviePopularInfiniteQuery();

  if (isLoading) {
    return <P>Loading...</P>;
  }

  if (!movies || error) {
    return <P>Could not load popular movies</P>;
  }

  if (movies.length === 0) {
    return <P>No popular movies found</P>;
  }

  return (
    <>
      <H1>Popular Movies</H1>
      <MovieList
        movies={movies}
        onPressItem={onPressItem}
        onLoadMore={loadMore}
        isLoadingMore={isFetching}
        error={!!error}
        retry={loadMore}
      />
    </>
  );
};
