import React from 'react';
import {useGetMovieByIdQuery} from '../../core/api/movie-api';
import {P} from '../../core/ui/atoms/typography';
import {MovieDetails} from '../../core/ui/molecules/movie-details';
import {ScrollView} from 'react-native';

type Props = {
  id: number;
};

export const MovieDetailsPage = ({id}: Props) => {
  const {data: movie, isLoading, error} = useGetMovieByIdQuery({id});

  if (isLoading) {
    return <P>Loading...</P>;
  }

  if (!movie || error) {
    return <P>Could not load movie</P>;
  }

  return (
    <ScrollView>
      <MovieDetails movie={movie} />
    </ScrollView>
  );
};
