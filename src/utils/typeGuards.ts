import {
  InputBooleanFieldOptions,
  InputStringFieldOptions,
  InputNumberFieldOptions,
  InputEnumFieldOptions,
} from '@/types/FieldOptions'
import {
  FormFieldsArray,
  GenericFieldOptions,
  GenericSingleFieldOptions,
  NestedObjectFieldOptions,
} from '@/types/FormFieldsArray'

export function isFormFieldsArray(value: unknown): value is FormFieldsArray {
  if (!Array.isArray(value)) return false

  for (const elem of value) {
    if (!isGenericSingleFieldOptions(elem)) {
      // Could add more checks for NestedObjectFieldOptions if needed.
      return false
    }
  }

  return true
}

// Checking if the value is a NestedObjectFieldOptions
export function isNestedObjectFieldOptions(
  value: unknown
): value is NestedObjectFieldOptions {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  return Object.values(value).every(
    field =>
      typeof field === 'object' &&
      'fields' in field &&
      isFormFieldsArray(field.fields)
  )
}

// Checking if the value is a GenericSingleFieldOptions
export function isGenericSingleFieldOptions(
  value: GenericFieldOptions
): value is GenericSingleFieldOptions {
  return (
    !isFormFieldsArray(value) &&
    !isNestedObjectFieldOptions(value) &&
    'tag' in value &&
    'type' in value
  )
}

// Specific checks for subtypes
export function isInputBooleanFieldOptions(
  value: GenericSingleFieldOptions
): value is InputBooleanFieldOptions {
  return (
    value.tag === 'input' &&
    (value.type === 'checkbox' || value.type === 'radio')
  )
}

export function isInputStringFieldOptions(
  value: GenericSingleFieldOptions
): value is InputStringFieldOptions {
  return (
    value.tag === 'input' &&
    ['url', 'text', 'password', 'search', 'tel', 'email'].includes(value.type)
  )
}

export function isInputNumberFieldOptions(
  value: GenericSingleFieldOptions
): value is InputNumberFieldOptions {
  return value.tag === 'input' && value.type === 'number'
}

export function isInputEnumFieldOptions(
  value: GenericSingleFieldOptions
): value is InputEnumFieldOptions {
  return value.tag === 'select' && Array.isArray(value.options)
}

// Checking if the value is an object containing FormFieldsArrays
export function isObjectOfFormFieldsArrays(
  value: unknown
): value is { [key: string]: FormFieldsArray } {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  return Object.values(value).every(isFormFieldsArray)
}
