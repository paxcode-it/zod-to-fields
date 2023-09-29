export type BaseFieldAttributes = {
  tag: 'input' | 'select'
  name: string
  id: string
  type: HTMLInputTypeAttribute
  label: string
}

export type BaseFieldAttributesForSelect = {
  renderAs: 'select'
  tag: 'select'
}

export type BaseFieldAttributesForInput = {
  renderAs: 'input'
  tag: 'input'
}

type HTMLInputTypeAttribute =
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
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
  | (string & NonNullable<unknown>)
