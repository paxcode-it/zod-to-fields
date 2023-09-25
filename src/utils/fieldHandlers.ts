import {
  InputBooleanFieldOptions,
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

export { handleZodBoolean, handleZodNumber, handleZodString }
