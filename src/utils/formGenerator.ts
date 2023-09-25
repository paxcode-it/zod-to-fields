import { z } from 'zod'

import type {
  InputBooleanFieldOptions,
  InputEnumFieldOptions,
  InputNumberFieldOptions,
  InputStringFieldOptions,
} from '@/types/FieldOptions'
import { GenericFieldOptions } from '@/types/FormFieldsArray'
import type { FormFieldsArray } from '@/types/FormFieldsArray'
import { MappedFieldOptions } from '@/types/UtilityTypes'
import { setDefaultOptions } from '@/utils/formHelpers'

import {
  handleZodBoolean,
  handleZodEnum,
  handleZodNumber,
  handleZodString,
} from './fieldHandlers'

/**
 * Handles the conversion of Zod types to appropriate field options.
 * @param {z.ZodTypeAny} fieldType - The Zod schema type.
 * @param {unknown} fieldOptions - Additional field options.
 * @throws Will throw an error if the Zod type is unsupported.
 * @returns {GenericFieldOptions} - Returns the corresponding field element.
 */
function handleFieldType(
  fieldType: z.ZodTypeAny,
  fieldOptions: unknown
): GenericFieldOptions {
  if (fieldType instanceof z.ZodString) {
    return handleZodString(fieldOptions as InputStringFieldOptions)
  } else if (fieldType instanceof z.ZodNumber) {
    return handleZodNumber(fieldOptions as InputNumberFieldOptions)
  } else if (fieldType instanceof z.ZodBoolean) {
    return handleZodBoolean(fieldOptions as InputBooleanFieldOptions)
  } else if (
    fieldType instanceof z.ZodEnum ||
    fieldType instanceof z.ZodNativeEnum
  ) {
    return handleZodEnum(fieldOptions as InputEnumFieldOptions)
  }
  throw new Error(`Unsupported Zod type`)
}

/**
 * Creates and manages field options based on a Zod schema.
 * @param initialSchema The initial Zod schema.
 * @returns An object containing methods for manipulating field options.
 */
const createOptions = <T extends z.ZodRawShape>(
  initialSchema: z.ZodObject<T>
) => {
  let options: MappedFieldOptions<typeof initialSchema> = {}

  /**
   * Merges the provided field options with existing options.
   * @param fieldOptions The field options to merge.
   * @returns An object containing methods for further manipulation or to build the options. Chainable.
   */
  const withFieldOptions = (
    fieldOptions: MappedFieldOptions<typeof initialSchema>
  ) => {
    options = { ...options, ...fieldOptions }

    return { withFieldOptions, build }
  }

  /**
   * Builds the final options object.
   * @returns The built options object.
   */
  const build = () => {
    return options
  }

  return { withFieldOptions, build }
}

/**
 * Generates an array of form elements based on the given Zod schema and options.
 * @param {ZodObject<T>} schema - The Zod schema.
 * @param {MappedFieldOptions<K>} [options] - Additional field options.
 * @returns {FormFieldsArray} - Returns an array of form fields.
 * @template T, K
 */
const generateFormElementsFromSchema = <
  T extends z.ZodRawShape,
  K extends z.AnyZodObject,
>(
  schema: z.ZodObject<T>,
  options?: MappedFieldOptions<K>
): FormFieldsArray => {
  return Object.entries(schema.shape).map(([fieldName, fieldType]) => {
    const defaultOptions = setDefaultOptions(fieldName, fieldType)

    const fieldOptions = options?.[fieldName]
    const element = fieldOptions ? handleFieldType(fieldType, fieldOptions) : {}

    return {
      ...defaultOptions,
      ...element,
    }
  })
}

export { createOptions, generateFormElementsFromSchema, handleFieldType }
