import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TestInfiniteQueryHook} from '../../features/search-movie/tests/test-infinite-query-hook';

export type DevelopStackParamList = {
  TestInfiniteQueryHook: undefined;
};

const Stack = createNativeStackNavigator<DevelopStackParamList>();

export const DevelopStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TestInfiniteQueryHook"
        component={TestInfiniteQueryHook}
      />
    </Stack.Navigator>
  );
};
