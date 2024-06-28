// I don't remember why I created commented types, but I think I can remove them
// type AdditionalAttributes = {
//   [key: string]: any
// }
// export type ExtendedFieldAttributes = BaseFieldAttributes & AdditionalAttributes

type EnhancedHTMLInputTypeAttribute =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'select'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
  | (string & NonNullable<unknown>)

export type BaseFieldAttributes = {
  tag: 'input' | 'select'
  name: string
  id: string
  type: EnhancedHTMLInputTypeAttribute
  label: string
}
