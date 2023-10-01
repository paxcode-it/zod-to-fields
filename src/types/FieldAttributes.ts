/*eslint @typescript-eslint/no-explicit-any: "off"*/
export type BaseFieldAttributes = {
  [key: string]: any
  tag: 'input' | 'select'
  name: string
  id: string
  type: HTMLInputTypeAttribute
  label: string
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
