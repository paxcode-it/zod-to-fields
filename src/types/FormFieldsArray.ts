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
  | { [key: string]: FormFieldsArray }

export type FormFieldsArray = Array<GenericFieldOptions>

export type GenericSignleFieldOptions =
  | InputBooleanFieldOptions
  | InputStringFieldOptions
  | InputNumberFieldOptions
  | InputEnumFieldOptions
