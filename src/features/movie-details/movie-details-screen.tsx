import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MovieStackParamList} from '../../core/navigation/movie-stack-navigator';
import {MovieDetailsPage} from './movie-details-page';

type Props = NativeStackScreenProps<MovieStackParamList, 'MovieDetailsScreen'>;

export const MovieDetailsScreen = ({route}: Props) => {
  const {id} = route.params;
  return <MovieDetailsPage id={id} />;
};
