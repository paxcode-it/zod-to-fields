import { EnumLike, z } from 'zod'

import {
  InputBooleanFieldOptions,
  InputEnumFieldOptions,
  InputNumberFieldOptions,
  InputStringFieldOptions,
} from '@/types/FieldOptions'

const handleZodString = (
  fieldOptions: InputStringFieldOptions
): InputStringFieldOptions => {
  return { ...fieldOptions, type: fieldOptions.type ?? 'text' }
}

const handleZodNumber = (
  fieldOptions: InputNumberFieldOptions
): InputNumberFieldOptions => {
  return {
    ...fieldOptions,
    inputMode: fieldOptions.inputMode ?? 'numeric',
    type: fieldOptions.type ?? 'number',
  }
}

const handleZodBoolean = (
  fieldOptions: InputBooleanFieldOptions
): InputBooleanFieldOptions => {
  return { ...fieldOptions, type: fieldOptions.type ?? 'checkbox' }
}

const handleZodEnum = <T extends [string, ...string[]]>(
  fieldOptions: InputEnumFieldOptions,
  fieldValue: z.ZodEnum<T>
): InputEnumFieldOptions => {
  const options = fieldValue._def.values.map(value => ({
    label: value.charAt(0).toUpperCase() + value.slice(1),
    value,
  }))

  if (fieldOptions.tag === 'select') {
    // handle select
    return {
      ...fieldOptions,
      options: fieldOptions.options ?? options,
      type: fieldOptions.type ?? 'select',
    }
  } else {
    // handle radio
    return {
      ...fieldOptions,
      type: fieldOptions.type ?? 'checkbox',
      options: fieldOptions.options ?? options,
    }
  }
}

const handleNativeZodEnum = <T extends EnumLike>(
  fieldOptions: InputEnumFieldOptions,
  fieldValue: z.ZodNativeEnum<T>
): InputEnumFieldOptions => {
  const options = Object.entries(fieldValue._def.values).map(
    ([key, value]) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      value,
    })
  )

  if (fieldOptions.tag === 'select') {
    // handle select
    return { ...fieldOptions, options: fieldOptions.options ?? options }
  } else {
    // handle radio
    return {
      ...fieldOptions,
      type: fieldOptions.type ?? 'checkbox',
      options: fieldOptions.options ?? options,
    }
  }
}

export {
  handleZodBoolean,
  handleZodNumber,
  handleZodString,
  handleZodEnum,
  handleNativeZodEnum,
}
