import React from 'react';
import {Text, StyleSheet} from 'react-native';
import { spacing } from './spacing';

type Props = {
  children: React.ReactNode;
};

export const H1 = ({children, ...props}: Props) => (
  <Text style={styles.h1} {...props}>
    {children}
  </Text>
);

export const H2 = ({children, ...props}: Props) => (
  <Text style={styles.h2} {...props}>
    {children}
  </Text>
);

export const H3 = ({children, ...props}: Props) => (
  <Text style={styles.h3} {...props}>
    {children}
  </Text>
);

export const P = ({children, ...props}: Props) => (
  <Text style={styles.paragraph} {...props}>
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
