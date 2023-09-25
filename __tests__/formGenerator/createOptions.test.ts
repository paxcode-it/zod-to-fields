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
      color: { renderAs: 'select' } as InputEnumFieldOptions,
    }

    // Act
    const { build } = createOptions(schema).withFieldOptions(fieldOptions)
    const result = build()

    // Assert
    expect(result.color).toEqual({ renderAs: 'select' })
  })

  // Test for Multiple Configurations
  it('should handle multiple configurations', () => {
    // Arrange
    const schema = z.object({
      isActive: z.boolean(),
      username: z.string(),
      age: z.number(),
      color: z.enum(['Red', 'Green', 'Blue']),
    })

    const fieldOptions = {
      isActive: { type: 'checkbox' } as InputBooleanFieldOptions,
      username: { type: 'text' } as InputStringFieldOptions,
      age: { type: 'number' } as InputNumberFieldOptions,
      color: {
        renderAs: 'select',
        options: [
          {
            value: 'red',
            label: 'Red',
          },
          {
            value: 'green',
            label: 'Green',
          },
          {
            value: 'blue',
            label: 'Blue',
          },
        ],
      } as InputEnumFieldOptions,
    }

    // Act
    const { build } = createOptions(schema).withFieldOptions(fieldOptions)
    const result = build()

    // Assert
    expect(result).toEqual({
      isActive: { type: 'checkbox' },
      username: { type: 'text' },
      age: { type: 'number' },
      color: {
        renderAs: 'select',
        options: [
          {
            value: 'red',
            label: 'Red',
          },
          {
            value: 'green',
            label: 'Green',
          },
          {
            value: 'blue',
            label: 'Blue',
          },
        ],
      },
    })
  })
})
