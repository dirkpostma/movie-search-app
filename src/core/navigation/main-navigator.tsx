import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SearchMovieScreen} from '../../features/search-movie/search-movie-screen';

export type RootStackParamList = {
  SearchMovieScreen: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
