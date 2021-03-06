export default {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/domain/**/usecases/**/*.ts',
    '<rootDir>/src/**/adapters/**/presentation/**/controllers/**/*.ts',
    '!<rootDir>/src/**/domain/**/usecases/**/_common_/**/*.ts',
    '!<rootDir>/src/**/adapters/**/presentation/**/controllers/**/views/**/*.ts',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text-summary', 'lcov'],
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1',
  },
  roots: ['<rootDir>/tests'],
};
