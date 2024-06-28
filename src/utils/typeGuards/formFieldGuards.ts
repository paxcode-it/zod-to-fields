/* eslint-disable no-console */
import {
  InputBooleanFieldOptions,
  InputEnumFieldOptions,
  InputNumberFieldOptions,
  InputStringFieldOptions,
} from '@/types/FieldOptions'
import {
  FormFieldsArray,
  GenericFieldOptions,
  GenericSingleFieldOptions,
  NestedObjectFieldOptions,
} from '@/types/FormFieldsArray'
import { ObjectKeys } from '@/utils/typeHelpers'

function isFormFieldsArray(value: unknown): value is FormFieldsArray {
  if (!Array.isArray(value)) return false

  for (const elem of value) {
    const keysOfElem = ObjectKeys(elem)
    const keyOfElem = keysOfElem[0]

    if (typeof keyOfElem === 'undefined') return false

    const isNestedObjectWithFields =
      keysOfElem.length === 1 && 'fields' in elem[keyOfElem]

    if (
      isNestedObjectWithFields &&
      isNestedObjectFieldOptions(elem[keyOfElem])
    ) {
      continue
    }
    if (!isGenericSingleFieldOptions(elem)) {
      // Could add more checks for NestedObjectFieldOptions if needed.
      return false
    }
  }

  return true
}

// Checking if the value is a NestedObjectFieldOptions
function isNestedObjectFieldOptions(
  value: unknown,
  debugging?: boolean
): value is NestedObjectFieldOptions {
  if (debugging) {
    console.log('Checking: ', value)
  }

  if (typeof value !== 'object' || value === null) {
    if (debugging) {
      console.log('First check failed: Not an object or null')
    }

    return false
  }

  if (Array.isArray(value) || Object.keys(value).length === 0) {
    if (debugging) {
      console.log('Second check failed: Is an array or empty object')
    }

    return false
  }

  const isMainObjectHaveOneKey = Object.keys(value).length === 1
  const keyOfElem = Object.keys(value)[0] ?? ''

  const fieldsNested = (value as NestedObjectFieldOptions)[keyOfElem]

  const hasFieldsNested = isMainObjectHaveOneKey && 'fields' in fieldsNested
  const isObject = typeof value === 'object'
  const hasFields = hasFieldsNested || 'fields' in value

  const isFormFieldsArrayPass =
    hasFields &&
    isFormFieldsArray(
      hasFieldsNested
        ? fieldsNested.fields
        : (value as { fields: FormFieldsArray }).fields
    )

  if (debugging) {
    // console.log('isMainObjectHaveOneKey: ', isMainObjectHaveOneKey)
    // console.log('keyOfElem: ', keyOfElem)
    // console.log('fieldsNested: ', fieldsNested)
    // console.log('hasFieldsNested: ', hasFieldsNested)
    // console.log('hasFields: ', hasFields)
    console.log(`Element ${isObject ? 'Is an object' : 'Is not an object'}`)
    console.log(`Element ${hasFields ? 'Has fields' : 'Does not have fields'}`)
    console.log(
      `Element ${
        isFormFieldsArrayPass
          ? 'Is a FormFieldsArray'
          : 'Is not a FormFieldsArray'
      }`
    )
  }

  return isObject && hasFields && isFormFieldsArrayPass
}

// Checking if the value is a GenericSingleFieldOptions
function isGenericSingleFieldOptions(
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
function isInputBooleanFieldOptions(
  value: GenericSingleFieldOptions
): value is InputBooleanFieldOptions {
  return (
    value.tag === 'input' &&
    (value.type === 'checkbox' || value.type === 'radio')
  )
}

function isInputStringFieldOptions(
  value: GenericSingleFieldOptions
): value is InputStringFieldOptions {
  return (
    value.tag === 'input' &&
    ['url', 'text', 'password', 'search', 'tel', 'email'].includes(value.type)
  )
}

function isInputNumberFieldOptions(
  value: GenericSingleFieldOptions
): value is InputNumberFieldOptions {
  return value.tag === 'input' && value.type === 'number'
}

function isInputEnumFieldOptions(
  value: GenericSingleFieldOptions
): value is InputEnumFieldOptions {
  return value.tag === 'select' && Array.isArray(value.options)
}

// Checking if the value is an object containing FormFieldsArrays
function isObjectOfFormFieldsArrays(
  value: unknown
): value is { [key: string]: FormFieldsArray } {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  return Object.values(value).every(isFormFieldsArray)
}

export {
  isFormFieldsArray,
  isNestedObjectFieldOptions,
  isGenericSingleFieldOptions,
  isInputBooleanFieldOptions,
  isInputStringFieldOptions,
  isInputNumberFieldOptions,
  isInputEnumFieldOptions,
  isObjectOfFormFieldsArrays,
}
