import React from 'react';
import {Text, StyleSheet, TextProps, StyleProp, TextStyle} from 'react-native';
import {spacing} from './spacing';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
} & TextProps;

export const H1 = ({children, style, ...props}: Props) => (
  <Text style={[styles.h1, style]} {...props}>
    {children}
  </Text>
);

export const H2 = ({children, style, ...props}: Props) => (
  <Text style={[styles.h2, style]} {...props}>
    {children}
  </Text>
);

export const H3 = ({children, style, ...props}: Props) => (
  <Text style={[styles.h3, style]} {...props}>
    {children}
  </Text>
);

export const P = ({children, style, ...props}: Props) => (
  <Text style={[styles.paragraph, style]} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacing.l,
    color: '#333',
  },
  h2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.m,
    color: '#444',
  },
  h3: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: spacing.m,
    color: '#444',
  },
  paragraph: {
    fontSize: 14,
    marginBottom: spacing.m,
    color: '#666',
  },
});
