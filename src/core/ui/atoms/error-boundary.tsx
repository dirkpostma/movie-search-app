import React, {Component, ErrorInfo, ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import {H1, P} from './typography';
import {spacing} from './spacing';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {hasError: false, error: null};
  }

  static getDerivedStateFromError(error: Error): State {
    return {hasError: true, error};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to error reporting service (e.g., Sentry)
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.container}>
          <H1 style={styles.title}>Something went wrong</H1>
          <P style={styles.message}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </P>
          {__DEV__ && this.state.error && (
            <P style={styles.stack}>{this.state.error.stack}</P>
          )}
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.l,
  },
  title: {
    marginBottom: spacing.m,
  },
  message: {
    textAlign: 'center',
    marginBottom: spacing.m,
  },
  stack: {
    fontSize: 12,
    fontFamily: 'monospace',
    marginTop: spacing.l,
  },
});
