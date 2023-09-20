import type { BaseFieldAttributes } from '@/types/FieldAttributes'
import type {
  PartialFieldInputAttributes,
  PartialFieldSelectAttributes,
  PartialFieldOptionAttributes,
} from '@/types/HTMLAttributes'

type ExtendedFieldInputAttributes = BaseFieldAttributes &
  PartialFieldInputAttributes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ExtendedFieldSelectAttributes = BaseFieldAttributes &
  PartialFieldSelectAttributes & {
    options: Array<PartialFieldOptionAttributes>
  }

export type BooleanFieldOptions = ExtendedFieldInputAttributes & {
  type?: 'checkbox' | 'radio'
}
export type StringFieldOptions = ExtendedFieldInputAttributes & {
  type?: 'url' | 'text' | 'password' | 'search'
}
export type NumberFieldOptions = ExtendedFieldInputAttributes & {
  type?: 'number'
}
