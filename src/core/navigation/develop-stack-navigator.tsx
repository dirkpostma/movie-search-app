import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UseSearchMoviesInfiniteQueryTestComponent} from '../../features/search-movie/tests/use-search-movies-infinite-query-test-component';

export type DevelopStackParamList = {
  UseSearchMoviesInfiniteQuery: undefined;
};

const Stack = createNativeStackNavigator<DevelopStackParamList>();

export const DevelopStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UseSearchMoviesInfiniteQuery"
        component={UseSearchMoviesInfiniteQueryTestComponent}
      />
    </Stack.Navigator>
  );
};
