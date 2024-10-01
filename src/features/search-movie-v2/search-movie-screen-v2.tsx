import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MovieStackParamList} from '../../core/navigation/movie-stack-navigator';
import { SearchMoviePageV2 } from './search-movies-page-v2';

type Props = NativeStackScreenProps<MovieStackParamList, 'SearchMovieScreen'>;

export const SearchMovieScreenV2 = ({navigation}: Props) => {
  return (
    <SearchMoviePageV2
      onPressItem={id => navigation.navigate('MovieDetailsScreen', {id})}
    />
  );
};
