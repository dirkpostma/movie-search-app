import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MovieStackNavigator} from './movie-stack-navigator';
import {DevelopStackNavigator} from './develop-stack-navigator';
import {AboutScreen} from '../../features/about/about-screen';
import {env} from '../../env';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export const getTabBarIcon = (
  routeName: string,
  focused: boolean,
  size: number,
  color: string,
) => {
  let iconName = 'ios-list-outline';

  if (routeName === 'Movie') {
    iconName = focused ? 'videocam' : 'videocam-outline';
  } else if (routeName === 'About') {
    iconName = focused ? 'information-circle' : 'information-circle-outline';
  } else if (routeName === 'Develop') {
    iconName = focused ? 'hammer' : 'hammer-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => getTabBarIcon(route.name, focused, size, color),
          tabBarActiveTintColor: '#333',
          tabBarInactiveTintColor: '#999',
        })}>
        <Tab.Screen name="Movie" component={MovieStackNavigator} />
        <Tab.Screen name="About" component={AboutScreen} />

        {env.IS_E2E || env.DEV_TOOLS_ENABLED && (
          <Tab.Screen name="Develop" component={DevelopStackNavigator} />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
