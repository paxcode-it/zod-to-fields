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
