import 'react-native';
import React from 'react';
import {App} from './App';
import {describe, it} from '@jest/globals';
import {render} from '@testing-library/react-native';

describe('App', () => {
  it('renders correctly', () => {
    render(<App />);
  });
});
