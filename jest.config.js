module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-redux|@react-navigation)/)',
  ],
  setupFiles: ['./jest-setup.js'],
  setupFilesAfterEnv: ['@testing-library/react-native/extend-expect'],
};
