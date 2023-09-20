import { z } from 'zod'

import { zodKeys } from '@/utils/zodHelpers'

describe('zodKeys', () => {
  it('should return keys from a Zod object schema', () => {
    // Arrange
    const schema = z.object({
      name: z.string(),
      info: z.object({
        age: z.number(),
      }),
    })

    // Act
    const keys = zodKeys(schema)

    // Assert
    expect(keys).toEqual(['name', 'info.age'])
  })

  it('should handle nullable fields', () => {
    // Arrange
    const schema = z.object({
      name: z.string().nullable(),
      age: z.number().nullable(),
    })

    // Act
    const keys = zodKeys(schema)

    // Assert
    expect(keys).toEqual(['name', 'age'])
  })

  it('should handle optional fields', () => {
    // Arrange
    const schema = z.object({
      name: z.string(),
      age: z.number().optional(),
    })

    // Act
    const keys = zodKeys(schema)

    // Assert
    expect(keys).toEqual(['name', 'age'])
  })

  it('should handle array fields', () => {
    // Arrange
    const schema = z.object({
      names: z.array(z.string()),
    })

    // Act
    const keys = zodKeys(schema)

    // Assert
    expect(keys).toEqual(['names'])
  })

  it('should handle complex nested structures', () => {
    // Arrange
    const schema = z.object({
      name: z.string(),
      details: z.object({
        age: z.number(),
        address: z
          .object({
            street: z.string(),
            zip: z.string(),
          })
          .nullable(),
      }),
    })

    // Act
    const keys = zodKeys(schema)

    // Assert
    expect(keys).toEqual([
      'name',
      'details.age',
      'details.address.street',
      'details.address.zip',
    ])
  })
})
