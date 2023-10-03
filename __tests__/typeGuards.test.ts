import {
  FormFieldsArray,
  GenericFieldOptions,
  GenericSingleFieldOptions,
} from '@/types/FormFieldsArray'
import {
  isFormFieldsArray,
  isGenericSingleFieldOptions,
} from '@/utils/typeGuards'

describe('isFormFieldsArray', () => {
  it('should return true for an empty array', () => {
    // Arrange
    const arr: FormFieldsArray = []

    // Act
    const result = isFormFieldsArray(arr)

    // Assert
    expect(result).toBe(true)
  })

  it('should return true for a valid FormFieldsArray', () => {
    // Arrange
    const arr: FormFieldsArray = [
      {
        /* some valid GenericFieldOptions */
      },
    ]

    // Act
    const result = isFormFieldsArray(arr)

    // Assert
    expect(result).toBe(true)
  })

  it('should return false for an invalid object', () => {
    // Arrange
    const obj = {}

    // Act
    const result = isFormFieldsArray(obj)

    // Assert
    expect(result).toBe(false)
  })
})

describe('isGenericSingleFieldOptions', () => {
  it('should return true for a GenericSingleFieldOptions', () => {
    // Arrange
    const singleFieldOptions: GenericSingleFieldOptions = {
      name: 'someName',
      type: 'text',
      tag: 'input',
      label: 'someLabel',
      id: 'someId',
    }

    // Act
    const result = isGenericSingleFieldOptions(singleFieldOptions)

    // Assert
    expect(result).toBe(true)
  })

  it('should return false for a FormFieldsArray', () => {
    // Arrange
    const arr: FormFieldsArray = [
      {
        name: 'someName',
        type: 'text',
        tag: 'input',
        label: 'someLabel',
        id: 'someId',
      },
    ]

    // Act
    const result = isGenericSingleFieldOptions(
      arr as unknown as GenericFieldOptions
    )

    // Assert
    expect(result).toBe(false)
  })
})
