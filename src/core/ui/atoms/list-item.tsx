import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {spacing} from './spacing';

type ListItemProps = {
  children: React.ReactNode;
};

type ListItemImageProps = {
  uri: string;
};

type ListItemContentProps = {
  children: React.ReactNode;
};

export const ListItem = ({children}: ListItemProps) => (
  <View style={styles.container}>
    <View style={styles.listitem}>{children}</View>
  </View>
);

const ListItemImage = ({uri}: ListItemImageProps) => (
  <Image source={{uri}} style={styles.image} />
);

const ListItemContent = ({children}: ListItemContentProps) => (
  <View style={styles.content}>{children}</View>
);

const ListItemSeparator = () => <View style={styles.separator} />;

ListItem.Image = ListItemImage;
ListItem.Content = ListItemContent;
ListItem.Separator = ListItemSeparator;

const styles = StyleSheet.create({
  container: {
    borderRadius: spacing.m,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: spacing.s,
    elevation: 3,
    backgroundColor: 'white',
  },
  listitem: {
    flexDirection: 'row',
    borderRadius: spacing.m,
    overflow: 'hidden',
  },
  image: {
    width: 80,
    height: 120,
  },
  content: {
    flex: 1,
    padding: spacing.m,
  },
  separator: {
    padding: spacing.m,
  },
});
