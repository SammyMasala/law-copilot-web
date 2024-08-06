/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  testEnvironment: "jsdom",
  // verbose: true,
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleDirectories: ["node_modules", "src"],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    "node_modules/(r?!@react-quill-new)/"
  ],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "<rootDir>/jest.mocks.js"
  },
  
  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Stop running tests after `n` failures
  // bail: 0,

  // The directory where Jest should store its cached dependency information
  // cacheDirectory: "/tmp/jest_rs",

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
};

export default config;
