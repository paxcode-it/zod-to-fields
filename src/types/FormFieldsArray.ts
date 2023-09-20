import type {
  BooleanFieldOptions,
  NumberFieldOptions,
  StringFieldOptions,
} from '@/types/FieldOptions'

export type GenericFieldOptions =
  | BooleanFieldOptions
  | StringFieldOptions
  | NumberFieldOptions

export type FormFieldsArray = Array<GenericFieldOptions>
