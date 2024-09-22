import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MovieStackParamList} from '../../core/navigation/movie-stack-navigator';
import {Screen} from '../../core/ui/atoms/screen';
import {MoviePopularPage} from './movie-popular-page';

type Props = NativeStackScreenProps<MovieStackParamList, 'SearchMovieScreen'>;

export const MoviePopularScreen = ({navigation}: Props) => {
  return (
    <Screen>
      <MoviePopularPage
        onPressItem={id => navigation.navigate('MovieDetailsScreen', {id})}
      />
    </Screen>
  );
};
