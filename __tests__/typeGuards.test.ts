import {
  FormFieldsArray,
  GenericFieldOptions,
  GenericSingleFieldOptions,
  NestedObjectFieldOptions,
} from '@/types/FormFieldsArray'
import {
  isFormFieldsArray,
  isGenericSingleFieldOptions,
  isInputBooleanFieldOptions,
  isInputEnumFieldOptions,
  isInputNumberFieldOptions,
  isInputStringFieldOptions,
  isObjectOfFormFieldsArrays,
} from '@/utils/typeGuards'

describe('isFormFieldsArray', () => {
  it('should return false for an array of empty objects', () => {
    // Arrange
    const arr: FormFieldsArray = [{}, {}]

    // Act
    const result = isFormFieldsArray(arr)

    // Assert
    expect(result).toBe(false)
  })

  it('should return true for a valid FormFieldsArray', () => {
    // Arrange
    const arr: NestedObjectFieldOptions = {
      someKy: {
        fields: [
          {
            name: 'someName',
            label: 'someLabel',
            id: 'someId',
            tag: 'input',
            type: 'text',
          },
        ],
      },
    }

    // Act
    const result = isFormFieldsArray(arr.someKy.fields)

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

describe('isInputNumberFieldOptions', () => {
  it('should return true for a valid InputNumberFieldOptions object', () => {
    const field: GenericSingleFieldOptions = {
      tag: 'input',
      type: 'number',
      name: 'age',
      id: 'age',
      label: 'Your Age',
    }

    const result = isInputNumberFieldOptions(field)
    expect(result).toBe(true)
  })

  it('should return false for an invalid object', () => {
    const field: GenericSingleFieldOptions = {
      tag: 'input',
      type: 'text',
      name: 'username',
      id: 'username',
      label: 'Your Username',
    }

    const result = isInputNumberFieldOptions(field)
    expect(result).toBe(false)
  })
})

describe('isInputEnumFieldOptions', () => {
  it('should return true for a valid InputEnumFieldOptions object', () => {
    const field: GenericSingleFieldOptions = {
      tag: 'select',
      type: 'select',
      name: 'color',
      id: 'color',
      label: 'Your Favorite Color',
      options: [
        { value: 'red', label: 'Red' },
        { value: 'blue', label: 'Blue' },
      ],
    }

    const result = isInputEnumFieldOptions(field)
    expect(result).toBe(true)
  })

  it('should return false for an invalid object', () => {
    const field: GenericSingleFieldOptions = {
      tag: 'input',
      type: 'text',
      name: 'username',
      id: 'username',
      label: 'Your Username',
    }

    const result = isInputEnumFieldOptions(field)
    expect(result).toBe(false)
  })
})
