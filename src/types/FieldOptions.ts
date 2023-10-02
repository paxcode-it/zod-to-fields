import type { BaseFieldAttributes } from '@/types/FieldAttributes'
import type {
  PartialFieldInputAttributes,
  PartialFieldSelectAttributes,
  PartialFieldOptionAttributes,
} from '@/types/HTMLAttributes'

type ExtendedFieldInputAttributes = BaseFieldAttributes &
  Omit<PartialFieldInputAttributes, 'name'>

type ExtendedFieldSelectAttributes = BaseFieldAttributes &
  Omit<PartialFieldSelectAttributes, 'options'> & {
    type: 'select'
    options: Array<PartialFieldOptionAttributes>
  }

export type InputBooleanFieldOptions = ExtendedFieldInputAttributes & {
  tag: 'input'
  type: 'checkbox' | 'radio'
}

export type InputStringFieldOptions = ExtendedFieldInputAttributes & {
  tag: 'input'
  type: 'url' | 'text' | 'password' | 'search' | 'tel' | 'email'
}

export type InputNumberFieldOptions = ExtendedFieldInputAttributes & {
  tag: 'input'
  type: 'number'
}

type InputEnumFieldSelectOptions = {
  tag: 'select'
} & ExtendedFieldSelectAttributes

type InputEnumFieldInputOptions = InputBooleanFieldOptions & {
  options: Array<PartialFieldOptionAttributes>
}

export type InputEnumFieldOptions =
  | InputEnumFieldSelectOptions
  | InputEnumFieldInputOptions
