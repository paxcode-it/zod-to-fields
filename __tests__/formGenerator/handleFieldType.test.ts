import * as z from 'zod'

import {
  InputBooleanFieldOptions,
  InputEnumFieldOptions,
  InputNumberFieldOptions,
  InputStringFieldOptions,
} from '@/types/FieldOptions'
import { handleFieldType } from '@/utils/formGenerator'

describe('handleFieldType function', () => {
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
    const result = handleFieldType(fieldKey, fieldValue, fieldOptions)

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
    const result = handleFieldType(fieldKey, fieldValue, fieldOptions)

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
    const result = handleFieldType(fieldKey, fieldValue, fieldOptions)

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
      renderAs: 'select',
      tag: 'select',
      options: [],
    }

    // Act
    const result = handleFieldType(fieldKey, fieldValue, fieldOptions)

    // Assert
    expect(result).toEqual(fieldOptions)
  })

  it('should throw error for unsupported Zod type', () => {
    // Arrange
    const fieldKey = 'colors'
    const fieldValue = z.array(z.string())

    // Act & Assert
    expect(() => handleFieldType(fieldKey, fieldValue, {})).toThrow(
      'Unsupported Zod type'
    )
  })
})
