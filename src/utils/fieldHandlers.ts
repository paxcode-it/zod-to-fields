import {
  BooleanFieldOptions,
  NumberFieldOptions,
  StringFieldOptions,
} from '@/types/FieldOptions'
import { GenericFieldOptions } from '@/types/FormFieldsArray'

const handleZodString = (
  fieldOptions: StringFieldOptions
): GenericFieldOptions => {
  return { type: 'text', ...fieldOptions }
}

const handleZodNumber = (
  fieldOptions: NumberFieldOptions
): GenericFieldOptions => {
  return { type: 'number', inputMode: 'numeric', ...fieldOptions }
}

const handleZodBoolean = (
  fieldOptions: BooleanFieldOptions
): GenericFieldOptions => {
  return { type: 'checkbox', ...fieldOptions }
}

export { handleZodBoolean, handleZodNumber, handleZodString }
