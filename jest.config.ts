import { pathsToModuleNameMapper } from 'ts-jest'

import { compilerOptions } from './tsconfig.json'

import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  preset: 'ts-jest',
  resolver: 'jest-ts-webcompat-resolver',
}

export default config
