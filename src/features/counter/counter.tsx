import React from 'react';
import {RootState} from '../../core/store/store';
import {useSelector, useDispatch} from 'react-redux';
import {decrement, increment, incrementByAmount} from './counterSlice';
import {Button, Text, View} from 'react-native';

export const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
      <Button title="Inc 5" onPress={() => dispatch(incrementByAmount(5))} />
      <Text>{count}</Text>
    </View>
  );
};
