module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.ts', './src/**/*.js'],
  coveragePathIgnorePatterns: ['node_modules', 'server.express.ts'],
  verbose: false,
};
