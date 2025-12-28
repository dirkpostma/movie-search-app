import React, {useMemo} from 'react';
import {CenteredImage} from '../atoms/centered-image';
import {H1, H3, P} from '../atoms/typography';
import {formatDate} from '../../utils/formatDate';
import {Movie} from '../../api/types';

type Props = {
  movie: Movie;
};

export const MovieDetails = React.memo<Props>(({movie}) => {
  const imageUri = useMemo(
    () => `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
    [movie?.poster_path],
  );

  const formattedDate = useMemo(
    () => formatDate(movie?.release_date),
    [movie?.release_date],
  );

  return (
    <>
      <CenteredImage uri={imageUri} />
      <H1>{movie?.title}</H1>
      <H3>Overview</H3>
      <P>{movie?.overview}</P>
      <P>Released on: {formattedDate}</P>
    </>
  );
});
