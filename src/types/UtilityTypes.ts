import { z } from 'zod'

import type {
  InputBooleanFieldOptions,
  InputEnumFieldOptions,
  InputNumberFieldOptions,
  InputStringFieldOptions,
} from '@/types/FieldOptions'

type FieldTypeToOptions<T> = T extends z.ZodBoolean
  ? InputBooleanFieldOptions
  : T extends z.ZodString
  ? InputStringFieldOptions
  : T extends z.ZodNumber
  ? InputNumberFieldOptions
  : T extends z.ZodEnum<never>
  ? InputEnumFieldOptions
  : T extends z.ZodNativeEnum<never>
  ? InputEnumFieldOptions
  : never

export type MappedFieldOptions<T extends z.AnyZodObject> = {
  [K in keyof T['shape']]?: FieldTypeToOptions<T['shape'][K]>
}
