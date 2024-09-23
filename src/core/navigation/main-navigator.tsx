import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MovieStackNavigator} from './movie-stack-navigator';
import {DevelopStackNavigator} from './develop-stack-navigator';
import { AboutScreen } from '../../features/about/about-screen';
import { env } from '../../env';

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Movie" component={MovieStackNavigator} />
        <Tab.Screen name="About" component={AboutScreen} />

        {env.DEV_TOOLS_ENABLED && (
          <Tab.Screen name="Develop" component={DevelopStackNavigator} />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
