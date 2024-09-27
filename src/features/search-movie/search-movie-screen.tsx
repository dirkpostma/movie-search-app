import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MovieStackParamList} from '../../core/navigation/movie-stack-navigator';
import {SearchMoviePage} from './search-movie-page';

type Props = NativeStackScreenProps<MovieStackParamList, 'SearchMovieScreen'>;

export const SearchMovieScreen = ({navigation}: Props) => {
  return (
    <SearchMoviePage
      onPressItem={id => navigation.navigate('MovieDetailsScreen', {id})}
    />
  );
};
