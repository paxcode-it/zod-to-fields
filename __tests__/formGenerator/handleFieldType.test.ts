import * as z from 'zod'

import { handleFieldType } from '@/utils/formGenerator'

describe('handleFieldType function', () => {
  it('should handle ZodString', () => {
    // Arrange
    const fieldType = z.string()
    const fieldOptions = { type: 'text' }

    // Act
    const result = handleFieldType(fieldType, fieldOptions)

    // Assert
    expect(result).toEqual(fieldOptions)
  })

  it('should handle ZodNumber', () => {
    // Arrange
    const fieldType = z.number()
    const fieldOptions = { type: 'number' }

    // Act
    const result = handleFieldType(fieldType, fieldOptions)

    // Assert
    expect(result).toEqual({ ...fieldOptions, inputMode: 'numeric' })
  })

  it('should handle ZodBoolean', () => {
    // Arrange
    const fieldType = z.boolean()
    const fieldOptions = { label: 'is Admin?' }

    // Act
    const result = handleFieldType(fieldType, fieldOptions)

    // Assert
    expect(result).toEqual({ ...fieldOptions, type: 'checkbox' })
  })

  it('should handle ZodEnum', () => {
    // Arrange
    const fieldType = z.enum(['Red', 'Green', 'Blue'])
    const fieldOptions = { renderAs: 'select' }

    // Act
    const result = handleFieldType(fieldType, fieldOptions)

    // Assert
    expect(result).toEqual({ ...fieldOptions, type: 'select' })
  })

  it('should throw error for unsupported Zod type', () => {
    // Arrange
    const fieldType = z.array(z.string())

    // Act & Assert
    expect(() => handleFieldType(fieldType, {})).toThrow('Unsupported Zod type')
  })
})
