import * as z from 'zod'

import {
  InputBooleanFieldOptions,
  InputEnumFieldOptions,
  InputNumberFieldOptions,
  InputStringFieldOptions,
} from '@/types/FieldOptions'
import { createOptions } from '@/utils/formGenerator'

describe('createOptions function', () => {
  // Test for ZodBoolean
  it('should handle ZodBoolean', () => {
    // Arrange
    const schema = z.object({
      isActive: z.boolean(),
    })

    const fieldOptions = {
      isActive: { type: 'checkbox' } as InputBooleanFieldOptions,
    }

    // Act
    const { build } = createOptions(schema).withFieldOptions(fieldOptions)
    const result = build()

    // Assert
    expect(result.isActive).toEqual({ type: 'checkbox' })
  })

  // Test for ZodString
  it('should handle ZodString', () => {
    // Arrange
    const schema = z.object({
      username: z.string(),
    })

    const fieldOptions = {
      username: { type: 'text' } as InputStringFieldOptions,
    }

    // Act
    const { build } = createOptions(schema).withFieldOptions(fieldOptions)
    const result = build()

    // Assert
    expect(result.username).toEqual({ type: 'text' })
  })

  // Test for ZodNumber
  it('should handle ZodNumber', () => {
    // Arrange
    const schema = z.object({
      age: z.number(),
    })

    const fieldOptions = {
      age: { type: 'number' } as InputNumberFieldOptions,
    }

    // Act
    const { build } = createOptions(schema).withFieldOptions(fieldOptions)
    const result = build()

    // Assert
    expect(result.age).toEqual({ type: 'number' })
  })

  // Test for ZodEnum
  it('should handle ZodEnum', () => {
    // Arrange
    const schema = z.object({
      color: z.enum(['Red', 'Green', 'Blue']),
    })

    const fieldOptions = {
      color: { tag: 'select' } as InputEnumFieldOptions,
    }

    // Act
    const { build } = createOptions(schema).withFieldOptions(fieldOptions)
    const result = build()

    // Assert
    expect(result.color).toEqual({ tag: 'select' })
  })

  // Test for Multiple Configurations
})
