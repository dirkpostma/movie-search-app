import React from 'react';
import {store} from './core/store/store';
import {Provider} from 'react-redux';
import {MainNavigator} from './core/navigation/main-navigator';
import {ErrorBoundary} from './core/ui/atoms/error-boundary';

export const App = () => {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // In production, send to error reporting service (e.g., Sentry)
        if (__DEV__) {
          console.error('App Error:', error, errorInfo);
        }
      }}>
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    </ErrorBoundary>
  );
};
