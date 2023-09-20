module.exports = {
  rootDir: '.',
  moduleDirectories: ['node_modules', '<rootDir>'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '@test/(.*)$': '<rootDir>/__tests__/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/utils/**/*.{ts,tsx}',
    '!<rootDir>/src/utils/**/*.d.ts', // Exclude type definitions
  ],
  coverageDirectory: '<rootDir>/coverage/',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
}
