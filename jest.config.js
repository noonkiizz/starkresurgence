const alias = require('alias-reuse');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: true,
  moduleNameMapper: {
    ...alias.fromFile(__dirname, './tsconfig.json').toJest(),
    '(.*)\\?worker': './$1',
  },
  testRegex: '\\.test\\.tsx?$',
  setupFiles: ['jest-canvas-mock'],
};
