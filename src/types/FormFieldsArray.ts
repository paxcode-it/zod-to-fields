import type {
  InputBooleanFieldOptions,
  InputEnumFieldOptions,
  InputNumberFieldOptions,
  InputStringFieldOptions,
} from '@/types/FieldOptions'

export type GenericFieldOptions =
  | InputBooleanFieldOptions
  | InputStringFieldOptions
  | InputNumberFieldOptions
  | InputEnumFieldOptions

export type FormFieldsArray = Array<GenericFieldOptions>
