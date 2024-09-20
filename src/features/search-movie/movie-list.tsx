import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {Text} from 'react-native';
import {Movie} from '../../core/api/types';

type Props = {
  movies: Movie[];
  isLoadingMore: boolean;
  onLoadMore: () => void;
};

const MovieListItem = ({item}: {item: Movie}) => (
  <Text key={item.id}>
    #{item.id} - {item.title}
  </Text>
);

export const MovieList = ({movies, isLoadingMore, onLoadMore}: Props) => {
  return (
    <FlashList
      data={movies}
      keyExtractor={item => item.id.toString()}
      renderItem={MovieListItem}
      estimatedItemSize={50}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isLoadingMore ? <Text>Loading more...</Text> : null}
    />
  );
};
