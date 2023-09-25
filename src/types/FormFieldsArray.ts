import type {
  InputBooleanFieldOptions,
  InputNumberFieldOptions,
  InputStringFieldOptions,
} from '@/types/FieldOptions'

export type GenericFieldOptions =
  | InputBooleanFieldOptions
  | InputStringFieldOptions
  | InputNumberFieldOptions

export type FormFieldsArray = Array<GenericFieldOptions>
