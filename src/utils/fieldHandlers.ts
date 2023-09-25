import {
  InputBooleanFieldOptions,
  InputEnumFieldOptions,
  InputNumberFieldOptions,
  InputStringFieldOptions,
} from '@/types/FieldOptions'
import { GenericFieldOptions } from '@/types/FormFieldsArray'

const handleZodString = (
  fieldOptions: InputStringFieldOptions
): GenericFieldOptions => {
  return { type: 'text', ...fieldOptions }
}

const handleZodNumber = (
  fieldOptions: InputNumberFieldOptions
): GenericFieldOptions => {
  return { type: 'number', inputMode: 'numeric', ...fieldOptions }
}

const handleZodBoolean = (
  fieldOptions: InputBooleanFieldOptions
): GenericFieldOptions => {
  return { type: 'checkbox', ...fieldOptions }
}

const handleZodEnum = (
  fieldOptions: InputEnumFieldOptions
): GenericFieldOptions => {
  if (fieldOptions.renderAs === 'select') {
    // handle select
    return { type: 'select', ...fieldOptions }
  } else {
    // handle radio
    return { type: 'radio', ...fieldOptions }
  }
}

export { handleZodBoolean, handleZodNumber, handleZodString, handleZodEnum }
