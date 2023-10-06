import * as z from 'zod'

import {
  InputBooleanFieldOptions,
  InputEnumFieldOptions,
  InputNumberFieldOptions,
  InputStringFieldOptions,
} from '@/types/FieldOptions'
import { handleFieldValue } from '@/utils/formGenerator'

describe('handleFieldValue function', () => {
  it('should handle ZodString', () => {
    // Arrange
    const fieldKey = 'name'
    const fieldValue = z.string()
    const fieldOptions: InputStringFieldOptions = {
      id: 'name',
      label: 'Name',
      name: 'name',
      tag: 'input',
      type: 'text',
    }

    // Act
    const result = handleFieldValue(fieldKey, fieldValue, fieldOptions)

    // Assert
    expect(result).toEqual(fieldOptions)
  })

  it('should handle ZodNumber', () => {
    // Arrange
    const fieldKey = 'age'
    const fieldValue = z.number()
    const fieldOptions: InputNumberFieldOptions = {
      id: 'age',
      label: 'Age',
      name: 'age',
      tag: 'input',
      inputMode: 'numeric',
      type: 'number',
    }

    // Act
    const result = handleFieldValue(fieldKey, fieldValue, fieldOptions)

    // Assert
    expect(result).toEqual(fieldOptions)
  })

  it('should handle ZodBoolean', () => {
    // Arrange
    const fieldKey = 'isAdmin'
    const fieldValue = z.boolean()
    const fieldOptions: InputBooleanFieldOptions = {
      id: 'isAdmin',
      label: 'is Admin?',
      name: 'isAdmin',
      tag: 'input',
      type: 'checkbox',
    }

    // Act
    const result = handleFieldValue(fieldKey, fieldValue, fieldOptions)

    // Assert
    expect(result).toEqual(fieldOptions)
  })

  it('should handle ZodEnum', () => {
    // Arrange
    const fieldKey = 'colors'
    const fieldValue = z.enum(['Red', 'Green', 'Blue'])
    const fieldOptions: InputEnumFieldOptions = {
      id: 'colors',
      label: 'Colors',
      name: 'colors',
      tag: 'select',
      type: 'select',
      options: [],
    }

    // Act
    const result = handleFieldValue(fieldKey, fieldValue, fieldOptions)

    // Assert
    expect(result).toEqual(fieldOptions)
  })

  it('should throw error for unsupported Zod type', () => {
    // Arrange
    const fieldKey = 'colors'
    const fieldValue = z.array(z.string())

    // Act & Assert
    expect(() => handleFieldValue(fieldKey, fieldValue, {})).toThrow(
      'Unsupported Zod type'
    )
  })
})
describe('handleFieldValue function with methods', () => {
  it('should handle ZodString with default()', () => {
    // Arrange
    const fieldKey = 'name'
    const fieldValue = z.string().default('John Doe')
    const fieldOptions: InputStringFieldOptions = {
      id: 'name',
      label: 'Name',
      name: 'name',
      tag: 'input',
      type: 'text',
    }

    // Act
    const result = handleFieldValue(fieldKey, fieldValue, fieldOptions)

    // Assert
    expect(result).toEqual(fieldOptions)
  })

  it('should handle ZodString with optional()', () => {
    // Arrange
    const fieldKey = 'name'
    const fieldValue = z.string().optional()
    const fieldOptions: InputStringFieldOptions = {
      id: 'name',
      label: 'Name',
      name: 'name',
      tag: 'input',
      type: 'text',
    }

    // Act
    const result = handleFieldValue(fieldKey, fieldValue, fieldOptions)

    // Assert
    expect(result).toEqual(fieldOptions)
  })

  it('should handle ZodNumber with default() and nullable()', () => {
    // Arrange
    const fieldKey = 'age'
    const fieldValue = z.number().default(30).nullable()
    const fieldOptions: InputNumberFieldOptions = {
      id: 'age',
      label: 'Age',
      name: 'age',
      tag: 'input',
      type: 'number',
      inputMode: 'numeric',
    }

    // Act
    const result = handleFieldValue(fieldKey, fieldValue, fieldOptions)

    // Assert
    expect(result).toEqual(fieldOptions)
  })

  it('should handle ZodBoolean with optional()', () => {
    // Arrange
    const fieldKey = 'isActive'
    const fieldValue = z.boolean().optional()
    const fieldOptions: InputBooleanFieldOptions = {
      id: 'isActive',
      label: 'Is Active',
      name: 'isActive',
      tag: 'input',
      type: 'checkbox',
    }

    // Act
    const result = handleFieldValue(fieldKey, fieldValue, fieldOptions)

    // Assert
    expect(result).toEqual(fieldOptions)
  })

  // it('should handle ZodArray with optional() and default()', () => {
  //   // Arrange
  //   const fieldKey = 'tags'
  //   const fieldValue = z.array(z.string()).optional().default([])
  //   const fieldOptions: InputArrayFieldOptions = {
  //     id: 'tags',
  //     label: 'Tags',
  //     name: 'tags',
  //     tag: 'input',
  //     type: 'text',
  //   }
  //
  //   // Act
  //   const result = handleFieldValue(fieldKey, fieldValue, fieldOptions)
  //
  //   // Assert
  //   expect(result).toEqual(fieldOptions)
  // })
})
