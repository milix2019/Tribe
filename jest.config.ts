export = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.svg$': '<rootDir>/svgTransform.ts',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
