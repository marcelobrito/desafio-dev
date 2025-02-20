const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ['node_modules'],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  coveragePathIgnorePatterns: ['node_modules', 'tests'],
};

export default config;