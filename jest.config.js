const { pathsToModuleNameMapper } = require('ts-jest')
const { jsWithTs } = require('ts-jest/presets')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  },
  resetMocks: true,
  restoreMocks: true,
  transform: jsWithTs.transform,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: __dirname
  }),
  setupFiles: ['./test/setup.ts'],
  collectCoverageFrom: ['src/**', '!src/injection/**']
}
