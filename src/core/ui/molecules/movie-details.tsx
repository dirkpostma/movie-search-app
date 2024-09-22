import React from 'react';
import {CenteredImage} from '../atoms/centered-image';
import {H1, H3, P} from '../atoms/typography';
import {formatDate} from '../../utils/formatDate';
import {Movie} from '../../api/types';

type Props = {
  movie: Movie;
};

export const MovieDetails = ({movie}: Props) => {
  return (
    <>
      <CenteredImage
        uri={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
      />
      <H1>{movie?.title}</H1>
      <H3>Overview</H3>
      <P>{movie?.overview}</P>
      <P>Released on: {formatDate(movie?.release_date)}</P>
    </>
  );
};
