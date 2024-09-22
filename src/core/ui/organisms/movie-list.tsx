import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {Movie} from '../../api/types';
import {ListItem} from '../atoms/list-item';
import {P} from '../atoms/typography';
import {MovieListItem} from '../molecules/movie-list-item';

type Props = {
  movies: Movie[];
  isLoadingMore: boolean;
  onLoadMore: () => void;
};

export const MovieList = ({movies, isLoadingMore, onLoadMore}: Props) => {
  return (
    <FlashList
      data={movies}
      keyExtractor={item => item.id.toString()}
      renderItem={MovieListItem}
      estimatedItemSize={50}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isLoadingMore ? <P>Loading more...</P> : null}
      ItemSeparatorComponent={ListItem.Separator}
    />
  );
};
