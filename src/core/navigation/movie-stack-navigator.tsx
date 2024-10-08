import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SearchMovieScreen} from '../../features/search-movie/search-movie-screen';
import {MovieDetailsScreen} from '../../features/movie-details/movie-details-screen';

export type MovieStackParamList = {
  TestInfiniteQueryHook: undefined;
  SearchMovieScreen: undefined;
  MovieDetailsScreen: {id: number};
};

const MovieStack = createNativeStackNavigator<MovieStackParamList>();

export const MovieStackNavigator = () => {
  return (
    <MovieStack.Navigator>
      <MovieStack.Screen
        name="SearchMovieScreen"
        component={SearchMovieScreen}
        options={{title: 'Search Movie'}}
      />
      <MovieStack.Screen
        name="MovieDetailsScreen"
        component={MovieDetailsScreen}
        options={{title: 'Movie Details'}}
      />
    </MovieStack.Navigator>
  );
};
