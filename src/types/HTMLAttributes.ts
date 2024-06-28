import {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  OptionHTMLAttributes,
} from 'react'

export type PartialFieldInputAttributes = Partial<
  InputHTMLAttributes<HTMLInputElement>
>
export type PartialFieldSelectAttributes = Partial<
  SelectHTMLAttributes<HTMLSelectElement>
>
export type PartialFieldOptionAttributes = Partial<
  OptionHTMLAttributes<HTMLOptionElement>
>
