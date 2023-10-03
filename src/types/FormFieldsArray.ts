import type {
  InputBooleanFieldOptions,
  InputEnumFieldOptions,
  InputNumberFieldOptions,
  InputStringFieldOptions,
} from '@/types/FieldOptions'

export type GenericSingleFieldOptions =
  | InputBooleanFieldOptions
  | InputStringFieldOptions
  | InputNumberFieldOptions
  | InputEnumFieldOptions

export type GenericFieldOptions =
  | GenericSingleFieldOptions
  | { [key: string]: FormFieldsArray }

export type FormFieldsArray = Array<GenericFieldOptions>
