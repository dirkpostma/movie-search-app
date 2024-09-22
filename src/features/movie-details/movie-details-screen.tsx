import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../core/navigation/main-navigator';
import {Screen} from '../../core/ui/atoms/screen';
import {MovieDetailsPage} from './movie-details-page';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetailsScreen'>;

export const MovieDetailsScreen = ({route}: Props) => {
  return (
    <Screen>
      <MovieDetailsPage id={route.params.id} />
    </Screen>
  );
};
