import { z } from 'zod'

import type {
  InputBooleanFieldOptions,
  InputNumberFieldOptions,
  InputStringFieldOptions,
} from '@/types/FieldOptions'
import { MappedFieldOptions } from '@/types/UtilityTypes'
import { generateFormElementsFromSchema } from '@/utils/formGenerator'

describe('formGenerator', () => {
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
          tag: 'input',
        },
        {
          id: 'age',
          label: 'age',
          name: 'age',
          placeholder: 'Age',
          type: 'number',
          tag: 'input',
          inputMode: 'numeric',
        },
        {
          id: 'isAdmin',
          label: 'Is Admin?',
          name: 'isAdmin',
          tag: 'input',
          type: 'radio',
        },
      ])
    })
  })
})
