import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {Movie} from '../../api/types';
import {ListItem} from '../atoms/list-item';
import {P} from '../atoms/typography';
import {MovieListItem} from './movie-list-item';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {spacing} from '../atoms/spacing';

type Props = {
  movies: Movie[];
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
  onPressItem: (id: number) => void;
  error?: boolean;
  retry?: () => void;
};

export const MovieList = ({
  movies,
  isLoadingMore = false,
  onLoadMore = () => {},
  onPressItem,
  error = false,
  retry = () => {},
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
      ListFooterComponent={
        isLoadingMore ? (
          <ListItem onPressItem={retry}>
            <ListItem.Content>
              <View style={styles.card}>
                <ActivityIndicator />
              </View>
            </ListItem.Content>
          </ListItem>
        ) : error ? (
          <ListItem onPressItem={retry}>
            <ListItem.Content>
              <View style={styles.card}>
                <P>Error while loading. Click here to retry...</P>
              </View>
            </ListItem.Content>
          </ListItem>
        ) : null
      }
      ItemSeparatorComponent={ListItem.Separator}
    />
  );
};

// TODO: create atom for this
const styles = StyleSheet.create({
  card: {
    padding: spacing.l,
  },
});
