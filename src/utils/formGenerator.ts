import { z, ZodBoolean, ZodNumber, ZodString, ZodTypeAny } from 'zod'
import type { ZodObject, ZodRawShape } from 'zod'

import type {
  BooleanFieldOptions,
  NumberFieldOptions,
  StringFieldOptions,
} from '@/types/FieldOptions'
import type { FormFieldsArray } from '@/types/FormFieldsArray'
import { MappedFieldOptions } from '@/types/UtilityTypes'

import {
  handleZodBoolean,
  handleZodNumber,
  handleZodString,
} from './fieldHandlers'

function createOptions<T extends ZodRawShape>(schema: ZodObject<T>) {
  return function (options: MappedFieldOptions<z.infer<typeof schema>>) {
    return options
  }
}

function handleFieldType(fieldType: ZodTypeAny, fieldOptions: unknown) {
  if (fieldType instanceof ZodString) {
    return handleZodString(fieldOptions as StringFieldOptions)
  } else if (fieldType instanceof ZodNumber) {
    return handleZodNumber(fieldOptions as NumberFieldOptions)
  } else if (fieldType instanceof ZodBoolean) {
    return handleZodBoolean(fieldOptions as BooleanFieldOptions)
  }
  throw new Error(`Unsupported Zod type`)
}

const generateFormElementsFromSchema = <
  T extends ZodRawShape,
  K extends Record<string, unknown>,
>(
  schema: ZodObject<T>,
  options?: MappedFieldOptions<K>
): FormFieldsArray => {
  return Object.entries(schema.shape).map(([fieldName, fieldType]) => {
    const fieldOptions = options?.[fieldName]
    const element = fieldOptions ? handleFieldType(fieldType, fieldOptions) : {}

    return {
      ...element,
      id: fieldName,
      label: fieldName,
      name: fieldName,
    }
  })
}

export { createOptions, generateFormElementsFromSchema, handleFieldType }
