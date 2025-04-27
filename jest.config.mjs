/** @type {import('ts-jest').JestConfigWithTsJest} */
import { TestEnvironment } from 'jest-environment-jsdom';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  moduleDirectories: ['node_modules'],
  coverageProviders: 'v8',
  TestEnvironment: 'jsdom',
  preset: 'ts-jest',
  testMatch: ['**/*.test.ts'],
};

export default createJestConfig(config);
