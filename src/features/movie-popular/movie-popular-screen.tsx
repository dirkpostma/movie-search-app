import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../core/navigation/main-navigator';
import {Screen} from '../../core/ui/atoms/screen';
import {MoviePopularPage} from './movie-popular-page';

type Props = NativeStackScreenProps<RootStackParamList, 'SearchMovieScreen'>;

export const MoviePopularScreen = ({navigation}: Props) => {
  return (
    <Screen>
      <MoviePopularPage
        onPressItem={id => navigation.navigate('MovieDetailsScreen', {id})}
      />
    </Screen>
  );
};
