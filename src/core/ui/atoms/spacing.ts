import {StyleSheet, ViewStyle} from 'react-native';

export const spacing = {
  none: 0,
  s: 4,
  m: 8,
  l: 16,
  xl: 24,
};

export type Spacing = keyof typeof spacing;

export const generateSpacingStyles = (property: keyof ViewStyle) => {
  const styles: {[key in Spacing]: ViewStyle} = {} as {
    [key in Spacing]: ViewStyle;
  };

  Object.keys(spacing).forEach(key => {
    const spacingKey = key as Spacing;
    styles[spacingKey] = {[property]: spacing[spacingKey]};
  });

  return styles;
};

export const paddingStyles = StyleSheet.create(
  generateSpacingStyles('padding'),
);

export const borderRadiusStyles = StyleSheet.create(
  generateSpacingStyles('borderRadius'),
);
