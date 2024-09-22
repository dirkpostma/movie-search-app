import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MovieStackNavigator} from './movie-stack-navigator';
import {DevelopStackNavigator} from './develop-stack-navigator';

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Movie" component={MovieStackNavigator} />
        <Tab.Screen name="Develop" component={DevelopStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
