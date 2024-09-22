import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SearchMovieScreen} from '../../features/search-movie/search-movie-screen';
import {MovieDetailsScreen} from '../../features/movie-details/movie-details-screen';

export type RootStackParamList = {
  SearchMovieScreen: undefined;
  MovieDetailsScreen: {id: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SearchMovieScreen"
          component={SearchMovieScreen}
          options={{title: 'Search Movie'}}
        />
        <Stack.Screen
          name="MovieDetailsScreen"
          component={MovieDetailsScreen}
          options={{title: 'Movie Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
