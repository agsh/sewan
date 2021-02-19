const { resolve } = require('path')

module.exports = {
  cacheDirectory: resolve(process.cwd(), '.jest_cache'),
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/[a-zA-Z0-9]+[.]+(spec|test).ts'],
  verbose: true,
  coverageDirectory: resolve(process.cwd(), '.jest_coverage'),
}
