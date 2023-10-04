import {
  FormFieldsArray,
  GenericFieldOptions,
  GenericSingleFieldOptions,
} from '@/types/FormFieldsArray'
import {
  isFormFieldsArray,
  isGenericSingleFieldOptions,
  isInputBooleanFieldOptions,
  isInputStringFieldOptions,
  isObjectOfFormFieldsArrays,
} from '@/utils/typeGuards'

describe('isFormFieldsArray', () => {
  it('should return true for an empty array', () => {
    // Arrange
    const arr: FormFieldsArray = [{}, {}]

    // Act
    const result = isFormFieldsArray(arr)

    // Assert
    expect(result).toBe(true)
  })

  it('should return true for a valid FormFieldsArray', () => {
    // Arrange
    const arr: { [key: string]: FormFieldsArray } = {
      someKy: [
        {
          name: 'someName',
          label: 'someLabel',
          id: 'someId',
          tag: 'input',
          type: 'text',
        },
      ],
    }

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

describe('isObjectOfFormFieldsArrays', () => {
  it('should return true for an object containing FormFieldsArrays', () => {
    const obj = {
      key1: [{ tag: 'input', type: 'checkbox' }],
      key2: [{ tag: 'input', type: 'text' }],
    }

    const result = isObjectOfFormFieldsArrays(obj)

    expect(result).toBe(true)
  })

  it('should return false for non-object types', () => {
    const nonObjectTypes: unknown[] = [null, undefined, 'string', 42]

    nonObjectTypes.forEach(type => {
      const result = isObjectOfFormFieldsArrays(type)

      expect(result).toBe(false)
    })
  })
})

describe('isInputStringFieldOptions', () => {
  it('should return true for valid string input types', () => {
    const validTypes = [
      'url',
      'text',
      'password',
      'search',
      'tel',
      'email',
    ] as const

    validTypes.forEach(type => {
      const field: GenericSingleFieldOptions = {
        tag: 'input',
        type,
        name: 'someName',
        id: 'someId',
        label: 'someLabel',
      }

      const result = isInputStringFieldOptions(field)

      expect(result).toBe(true)
    })
  })

  it('should return false for invalid string input types', () => {
    const field: GenericSingleFieldOptions = {
      tag: 'input',
      type: 'radio',
      name: 'someName',
      id: 'someId',
      label: 'someLabel',
    }

    const result = isInputStringFieldOptions(field)

    expect(result).toBe(false)
  })
})

describe('isInputBooleanFieldOptions', () => {
  it('should return true for checkbox input', () => {
    const field: GenericSingleFieldOptions = {
      tag: 'input',
      type: 'checkbox',
      name: 'someName',
      id: 'someId',
      label: 'someLabel',
    }

    const result = isInputBooleanFieldOptions(field)

    expect(result).toBe(true)
  })

  it('should return true for radio input', () => {
    const field: GenericSingleFieldOptions = {
      tag: 'input',
      type: 'radio',
      name: 'someName',
      id: 'someId',
      label: 'someLabel',
    }

    const result = isInputBooleanFieldOptions(field)

    expect(result).toBe(true)
  })

  it('should return false for non-boolean input types', () => {
    const field: GenericSingleFieldOptions = {
      tag: 'input',
      type: 'text',
      name: 'someName',
      id: 'someId',
      label: 'someLabel',
    }

    const result = isInputBooleanFieldOptions(field)

    expect(result).toBe(false)
  })
})
