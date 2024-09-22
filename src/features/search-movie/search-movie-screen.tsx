import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../core/navigation/main-navigator';
import {SearchMoviePage} from './search-movie-page';
import {Screen} from '../../core/ui/atoms/screen';

type Props = NativeStackScreenProps<RootStackParamList, 'SearchMovieScreen'>;

export const SearchMovieScreen = ({navigation}: Props) => {
  return (
    <Screen>
      <SearchMoviePage
        onPressItem={id => navigation.navigate('MovieDetailsScreen', {id})}
      />
    </Screen>
  );
};
