import {
  InputBooleanFieldOptions,
  InputStringFieldOptions,
} from '@/types/FieldOptions'
import {
  FormFieldsArray,
  GenericFieldOptions,
  GenericSingleFieldOptions,
} from '@/types/FormFieldsArray'

export function isFormFieldsArray(value: unknown): value is FormFieldsArray {
  return (
    Array.isArray(value) && (value.length === 0 || typeof value[0] === 'object')
  )
}

export function isGenericSingleFieldOptions(
  value: GenericFieldOptions
): value is GenericSingleFieldOptions {
  return !isFormFieldsArray(value)
}

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

export function isObjectOfFormFieldsArrays(
  value: unknown
): value is { [key: string]: FormFieldsArray } {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  return Object.values(value).every(isFormFieldsArray)
}
