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
  | { [key: string]: GenericFieldOptions }

export type FormFieldsArray = Array<GenericFieldOptions>
