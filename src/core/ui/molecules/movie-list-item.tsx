import React, {useMemo, useCallback} from 'react';
import {Movie} from '../../api/types';
import {ListItem} from '../atoms/list-item';
import {H3, P} from '../atoms/typography';
import {formatDate} from '../../utils/formatDate';

type Props = {
  item: Movie;
  onPressItem: (id: number) => void;
};

export const MovieListItem = React.memo<Props>(({item, onPressItem}) => {
  const imageUri = useMemo(
    () => `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
    [item.poster_path],
  );

  const formattedDate = useMemo(
    () => formatDate(item.release_date),
    [item.release_date],
  );

  const handlePress = useCallback(() => {
    onPressItem(item.id);
  }, [item.id, onPressItem]);

  return (
    <ListItem key={item.id} onPressItem={handlePress}>
      <ListItem.Image uri={imageUri} />
      <ListItem.Content>
        <H3>{item.title}</H3>
        <P>Released: {formattedDate}</P>
      </ListItem.Content>
    </ListItem>
  );
});
