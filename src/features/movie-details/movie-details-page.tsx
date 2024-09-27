import React from 'react';
import {useGetMovieByIdQuery} from '../../core/api/movie-api';
import {P} from '../../core/ui/atoms/typography';
import {MovieDetails} from '../../core/ui/molecules/movie-details';
import {ScrollView} from 'react-native';
import {MainTemplate} from '../../core/ui/templates/main-template';

type Props = {
  id: number;
};

export const MovieDetailsPage = ({id}: Props) => {
  const {data: movie, isLoading, error} = useGetMovieByIdQuery({id});

  return (
    <MainTemplate>
      {isLoading && <P>Loading...</P>}
      {!!error && <P>Could not load movie</P>}
      {movie && (
        <ScrollView>
          <MovieDetails movie={movie} />
        </ScrollView>
      )}
    </MainTemplate>
  );
};
