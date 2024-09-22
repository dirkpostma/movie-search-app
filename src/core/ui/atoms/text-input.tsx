import React from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { spacing } from './spacing';

// Prevent custom styling to force consistency across the app
type Props = Omit<TextInputProps, 'style'>;

export const TextInput = (props: Props) => {
  return (
    <RNTextInput
      style={styles.input}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    paddingVertical: spacing.l,
    paddingHorizontal: spacing.l,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: spacing.m,
  },
});
