import React from 'react';
import {View, StyleSheet} from 'react-native';
import {spacing} from '../atoms/spacing';

type Props = {
  children: React.ReactNode;
};

export const MainTemplate = ({children}: Props) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.l,
    backgroundColor: 'white',
    gap: spacing.l,
  },
});
