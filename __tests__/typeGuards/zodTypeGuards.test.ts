import * as z from 'zod'

import {
  isZodString,
  isZodNumber,
  isZodBoolean,
  isZodEnum,
  isZodNativeEnum,
} from '@/utils/typeGuards/zodTypeGuards'

describe('Type guards for Zod types', () => {
  // Test for isZodString
  it('should identify ZodString', () => {
    // Arrange
    const zodString = z.string()

    // Act
    const result = isZodString(zodString)

    // Assert
    expect(result).toBe(true)
  })

  // Test for isZodNumber
  it('should identify ZodNumber', () => {
    // Arrange
    const zodNumber = z.number()

    // Act
    const result = isZodNumber(zodNumber)

    // Assert
    expect(result).toBe(true)
  })

  // Test for isZodBoolean
  it('should identify ZodBoolean', () => {
    // Arrange
    const zodBoolean = z.boolean()

    // Act
    const result = isZodBoolean(zodBoolean)

    // Assert
    expect(result).toBe(true)
  })

  // Test for isZodEnum
  it('should identify ZodEnum', () => {
    // Arrange
    const zodEnum = z.enum(['apple', 'banana'])

    // Act
    const result = isZodEnum(zodEnum)

    // Assert
    expect(result).toBe(true)
  })

  // Test for isZodNativeEnum
  it('should identify ZodNativeEnum', () => {
    // Arrange
    enum Fruits {
      Apple,
      Banana,
    }
    const zodNativeEnum = z.nativeEnum(Fruits)

    // Act
    const result = isZodNativeEnum(zodNativeEnum)

    // Assert
    expect(result).toBe(true)
  })
})
