import React from 'react';
import {store} from './core/store/store';
import {Provider} from 'react-redux';
import {MainNavigator} from './core/navigation/main-navigator';

export const App = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};
