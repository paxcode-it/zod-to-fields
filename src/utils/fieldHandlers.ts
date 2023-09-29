import {
  InputBooleanFieldOptions,
  InputEnumFieldOptions,
  InputNumberFieldOptions,
  InputStringFieldOptions,
} from '@/types/FieldOptions'

const handleZodString = (
  fieldOptions: InputStringFieldOptions
): InputStringFieldOptions => {
  return { ...fieldOptions, type: fieldOptions.type ?? 'text' }
}

const handleZodNumber = (
  fieldOptions: InputNumberFieldOptions
): InputNumberFieldOptions => {
  return {
    inputMode: 'numeric',
    ...fieldOptions,
    type: fieldOptions.type ?? 'number',
  }
}

const handleZodBoolean = (
  fieldOptions: InputBooleanFieldOptions
): InputBooleanFieldOptions => {
  return { ...fieldOptions, type: fieldOptions.type ?? 'checkbox' }
}

const handleZodEnum = (
  fieldOptions: InputEnumFieldOptions
): InputEnumFieldOptions => {
  if (fieldOptions.renderAs === 'select') {
    // handle select
    return { ...fieldOptions }
  } else {
    // handle radio
    return { ...fieldOptions, type: fieldOptions.type ?? 'checkbox' }
  }
}

export { handleZodBoolean, handleZodNumber, handleZodString, handleZodEnum }
