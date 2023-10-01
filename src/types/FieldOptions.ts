import type { BaseFieldAttributes } from '@/types/FieldAttributes'
import type {
  PartialFieldInputAttributes,
  PartialFieldSelectAttributes,
  PartialFieldOptionAttributes,
} from '@/types/HTMLAttributes'

type ExtendedFieldInputAttributes = BaseFieldAttributes &
  Omit<PartialFieldInputAttributes, 'name'>

type ExtendedFieldSelectAttributes = Omit<BaseFieldAttributes, 'type'> &
  Omit<PartialFieldSelectAttributes, 'options'> & {
    options: Array<PartialFieldOptionAttributes>
  }

export type InputBooleanFieldOptions = ExtendedFieldInputAttributes & {
  type: 'checkbox' | 'radio'
}

export type InputStringFieldOptions = ExtendedFieldInputAttributes & {
  type: 'url' | 'text' | 'password' | 'search' | 'tel' | 'email'
}

export type InputNumberFieldOptions = ExtendedFieldInputAttributes & {
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
