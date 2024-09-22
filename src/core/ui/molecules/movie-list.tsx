import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {Movie} from '../../api/types';
import {ListItem} from '../atoms/list-item';
import {P} from '../atoms/typography';
import {MovieListItem} from './movie-list-item';

type Props = {
  movies: Movie[];
  isLoadingMore: boolean;
  onLoadMore: () => void;
  onPressItem: (id: number) => void;
};

export const MovieList = ({
  movies,
  isLoadingMore,
  onLoadMore,
  onPressItem,
}: Props) => {
  return (
    <FlashList
      data={movies}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <MovieListItem item={item} onPressItem={onPressItem} />
      )}
      estimatedItemSize={50}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isLoadingMore ? <P>Loading more...</P> : null}
      ItemSeparatorComponent={ListItem.Separator}
    />
  );
};
