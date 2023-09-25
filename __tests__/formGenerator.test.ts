import { z } from 'zod'

import type {
  InputBooleanFieldOptions,
  InputNumberFieldOptions,
  InputStringFieldOptions,
} from '@/types/FieldOptions'
import { MappedFieldOptions } from '@/types/UtilityTypes'
import {
  createOptions,
  generateFormElementsFromSchema,
  handleFieldType,
} from '@/utils/formGenerator'

describe('formGenerator', () => {
  describe('createOptions', () => {
    it('should return options', () => {
      // Arrange
      const schema = z.object({
        username: z.string(),
        colors: z.enum(['red', 'white']),
      })
      const options = { username: { placeholder: 'Username' } }

      // Act
      const createdOptions = createOptions(schema)
        .withFieldOptions({
          username: { placeholder: 'Username' },
          colors: {
            renderAs: 'select',
            options: [
              { value: 'red', label: 'Red' },
              { value: 'white', label: 'White' },
            ],
          },
        })
        .build()

      // Assert
      expect(createdOptions).toEqual(options)
    })
  })

  describe('generateFormElementsFromSchema', () => {
    it('should generate form elements', () => {
      // Arrange
      const schema = z.object({
        username: z.string(),
        age: z.number(),
        isAdmin: z.boolean(),
      })
      const options: MappedFieldOptions<typeof schema> = {
        username: { placeholder: 'Username' } as InputStringFieldOptions,
        age: { placeholder: 'Age' } as InputNumberFieldOptions,
        isAdmin: {
          label: 'Is Admin?',
          type: 'radio',
        } as InputBooleanFieldOptions,
      }

      // Act
      const elements = generateFormElementsFromSchema(schema, options)

      // Assert
      expect(elements).toEqual([
        {
          id: 'username',
          label: 'username',
          name: 'username',
          type: 'text',
          placeholder: 'Username',
        },
        {
          id: 'age',
          label: 'age',
          name: 'age',
          placeholder: 'Age',
          type: 'number',
          inputMode: 'numeric',
        },
        {
          id: 'isAdmin',
          label: 'isAdmin',
          name: 'isAdmin',
          type: 'radio',
        },
      ])
    })
  })

  describe('handleFieldType', () => {
    it('should handle string field', () => {
      // Arrange
      const fieldType = z.string()
      const fieldOptions = {
        placeholder: 'Username',
      } as InputStringFieldOptions

      // Act
      const result = handleFieldType(fieldType, fieldOptions)

      // Assert
      expect(result).toEqual({ type: 'text', placeholder: 'Username' })
    })

    it('should handle number field', () => {
      // Arrange
      const fieldType = z.number()
      const fieldOptions = { placeholder: 'Age' } as InputNumberFieldOptions

      // Act
      const result = handleFieldType(fieldType, fieldOptions)

      // Assert
      expect(result).toEqual({
        type: 'number',
        inputMode: 'numeric',
        placeholder: 'Age',
      })
    })

    it('should handle boolean field', () => {
      // Arrange
      const fieldType = z.boolean()
      const fieldOptions = { label: 'Is Admin?' } as InputBooleanFieldOptions

      // Act
      const result = handleFieldType(fieldType, fieldOptions)

      // Assert
      expect(result).toEqual({ type: 'checkbox', label: 'Is Admin?' })
    })

    it('should have type radio', () => {
      // Arrange
      const fieldType = z.boolean()
      const fieldOptions = { type: 'radio' } as InputBooleanFieldOptions

      // Act
      const result = handleFieldType(fieldType, fieldOptions)

      // Assert
      expect(result).toEqual({ type: 'radio' })
    })

    it('should throw error for unsupported type', () => {
      // Arrange
      const fieldType = z.object({})

      // Act & Assert
      expect(() => handleFieldType(fieldType, {})).toThrow(
        'Unsupported Zod type'
      )
    })
  })
})
