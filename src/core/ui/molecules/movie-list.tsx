import {FlashList} from '@shopify/flash-list';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
  useCallback,
} from 'react';
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

export const MovieList = React.memo(
  forwardRef<{scrollToTop: () => void}, Props>(
    (
      {
        movies,
        isLoadingMore = false,
        onLoadMore = () => {},
        onPressItem,
        error = false,
        retry = () => {},
      },
      ref,
    ) => {
      const listRef = useRef<FlashList<Movie>>(null);

      useImperativeHandle(ref, () => ({
        scrollToTop: () => {
          listRef.current?.scrollToOffset({offset: 0, animated: true});
        },
      }));

      const keyExtractor = useCallback((item: Movie) => item.id.toString(), []);

      const renderItem = useCallback(
        ({item}: {item: Movie}) => (
          <MovieListItem item={item} onPressItem={onPressItem} />
        ),
        [onPressItem],
      );

      const footerComponent = useMemo(() => {
        if (isLoadingMore) {
          return (
            <ListItem onPressItem={retry}>
              <ListItem.Content>
                <View style={styles.card}>
                  <ActivityIndicator />
                </View>
              </ListItem.Content>
            </ListItem>
          );
        }
        if (error) {
          return (
            <ListItem onPressItem={retry}>
              <ListItem.Content>
                <View style={styles.card}>
                  <P>Error while loading. Click here to retry...</P>
                </View>
              </ListItem.Content>
            </ListItem>
          );
        }
        return null;
      }, [isLoadingMore, error, retry]);

      return (
        <FlashList
          ref={listRef}
          data={movies}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          estimatedItemSize={50}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={footerComponent}
          ItemSeparatorComponent={ListItem.Separator}
        />
      );
    },
  ),
);

// TODO: create atom for this
const styles = StyleSheet.create({
  card: {
    padding: spacing.l,
  },
});
