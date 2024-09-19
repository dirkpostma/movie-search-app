import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import { store } from './core/store/store';
import {Provider} from 'react-redux';
import { Counter } from './features/counter/counter';

export const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <ScrollView>
          <View>
            <Text>Movie Search App</Text>
            <Counter />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};
