const config = {
  testEnvironment: 'node',
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  testPathIgnorePatterns: ['node_modules'],
  coveragePathIgnorePatterns: ['node_modules', 'tests'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
};

export default config;