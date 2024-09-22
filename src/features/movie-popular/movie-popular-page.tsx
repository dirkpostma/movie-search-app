import React from 'react';
import {useGetMoviePopularQuery} from '../../core/api/movie-api';
import {H1, P} from '../../core/ui/atoms/typography';
import {MovieList} from '../../core/ui/molecules/movie-list';

type Props = {
  onPressItem: (id: number) => void;
};

export const MoviePopularPage = ({onPressItem}: Props) => {
  // TODO: create infinite scroll hook
  const {data, isLoading, error} = useGetMoviePopularQuery({page: 1});

  if (isLoading) {
    return <P>Loading...</P>;
  }

  if (!data || error) {
    return <P>Could not load popular movies</P>;
  }

  if (data?.results.length === 0) {
    return <P>No popular movies found</P>;
  }

  return (
    <>
      <H1>Popular Movies</H1>
      <MovieList movies={data.results} onPressItem={onPressItem} />
    </>
  );
};
