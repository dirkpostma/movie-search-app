import React from 'react';
import {Movie} from '../../api/types';
import {ListItem} from '../atoms/list-item';
import {H3, P} from '../atoms/typography';

type Props = {
  item: Movie;
};

export const MovieListItem = ({item}: Props) => {
  const releaseDate = item.release_date
    ? new Date(item.release_date).toDateString()
    : 'Unknown';

  return (
    <ListItem key={item.id}>
      <ListItem.Image uri={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />
      <ListItem.Content>
        <H3>{item.title}</H3>
        <P>Released: {releaseDate}</P>
      </ListItem.Content>
    </ListItem>
  );
};
