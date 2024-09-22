import React from 'react';
import {Movie} from '../../api/types';
import {ListItem} from '../atoms/list-item';
import {H3, P} from '../atoms/typography';
import {formatDate} from '../../utils/formatDate';

type Props = {
  item: Movie;
  onPressItem: (id: number) => void;
};

export const MovieListItem = ({item, onPressItem}: Props) => {
  return (
    <ListItem key={item.id} onPressItem={() => onPressItem(item.id)}>
      <ListItem.Image
        uri={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
      />
      <ListItem.Content>
        <H3>{item.title}</H3>
        <P>Released: {formatDate(item.release_date)}</P>
      </ListItem.Content>
    </ListItem>
  );
};
