import type {
  BaseFieldAttributes,
  BaseFieldAttributesForInput,
  BaseFieldAttributesForSelect,
} from '@/types/FieldAttributes'
import type {
  PartialFieldInputAttributes,
  PartialFieldSelectAttributes,
  PartialFieldOptionAttributes,
} from '@/types/HTMLAttributes'

type ExtendedFieldInputAttributes = BaseFieldAttributes &
  PartialFieldInputAttributes

type ExtendedFieldSelectAttributes = Omit<BaseFieldAttributes, 'type'> &
  Omit<PartialFieldSelectAttributes, 'options'> & {
    type?: never
    options: Array<PartialFieldOptionAttributes>
  }

export type InputBooleanFieldOptions = ExtendedFieldInputAttributes & {
  type?: 'checkbox' | 'radio'
}

export type InputStringFieldOptions = ExtendedFieldInputAttributes & {
  type?: 'url' | 'text' | 'password' | 'search' | 'tel' | 'email'
}

export type InputNumberFieldOptions = ExtendedFieldInputAttributes & {
  type?: 'number'
}

type InputEnumFieldSelectOptions = BaseFieldAttributesForSelect &
  ExtendedFieldSelectAttributes

type InputEnumFieldInputOptions = BaseFieldAttributesForInput &
  InputBooleanFieldOptions & { options: Array<PartialFieldOptionAttributes> }

export type InputEnumFieldOptions =
  | InputEnumFieldSelectOptions
  | InputEnumFieldInputOptions
