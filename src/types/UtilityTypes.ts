import type {
  BooleanFieldOptions,
  NumberFieldOptions,
  StringFieldOptions,
} from '@/types/FieldOptions'

type FieldTypeToOptions<T> = T extends boolean
  ? BooleanFieldOptions
  : T extends string
  ? StringFieldOptions
  : T extends number
  ? NumberFieldOptions
  : never

export type MappedFieldOptions<T extends Record<string, unknown>> = {
  [K in keyof T]?: FieldTypeToOptions<T[K]>
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type Simplify<T> = { [K in keyof T]?: T[K] } & {}

export type SimplifiedMappedFieldOptions<T extends Record<string, unknown>> =
  Simplify<MappedFieldOptions<T>>
