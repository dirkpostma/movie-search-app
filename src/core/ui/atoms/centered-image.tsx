import React from 'react';
import {Image as RNImage, StyleSheet, Dimensions, View} from 'react-native';
import { spacing } from './spacing';

const {width} = Dimensions.get('window');
const imageWidth = width * 0.4;
const imageHeight = imageWidth * 1.5;

type Props = {
  uri: string;
};

export const CenteredImage = ({uri}: Props) => (
  <View style={styles.container}>
    <RNImage source={{uri}} style={styles.image} resizeMode="cover" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: spacing.l,
  },
  image: {
    width: imageWidth,
    height: imageHeight,
    borderRadius: spacing.m,
  },
});
