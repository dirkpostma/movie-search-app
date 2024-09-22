import React from 'react';
import {Image as RNImage} from 'react-native';

type Props = {
  uri: string;
};

export const Image = ({uri}: Props) => {
  return <RNImage source={{uri}} />;
};
