import { z, ZodBoolean, ZodNumber, ZodString, ZodTypeAny } from 'zod'
import type { ZodObject, ZodRawShape } from 'zod'

import type {
  BooleanFieldOptions,
  NumberFieldOptions,
  StringFieldOptions,
} from '@/types/FieldOptions'
import { GenericFieldOptions } from '@/types/FormFieldsArray'
import type { FormFieldsArray } from '@/types/FormFieldsArray'
import { MappedFieldOptions } from '@/types/UtilityTypes'

import {
  handleZodBoolean,
  handleZodNumber,
  handleZodString,
} from './fieldHandlers'

/**
 * Handles the conversion of Zod types to appropriate field options.
 * @param {ZodTypeAny} fieldType - The Zod schema type.
 * @param {unknown} fieldOptions - Additional field options.
 * @throws Will throw an error if the Zod type is unsupported.
 * @returns {GenericFieldOptions} - Returns the corresponding field element.
 */
function handleFieldType(
  fieldType: ZodTypeAny,
  fieldOptions: unknown
): GenericFieldOptions {
  if (fieldType instanceof ZodString) {
    return handleZodString(fieldOptions as StringFieldOptions)
  } else if (fieldType instanceof ZodNumber) {
    return handleZodNumber(fieldOptions as NumberFieldOptions)
  } else if (fieldType instanceof ZodBoolean) {
    return handleZodBoolean(fieldOptions as BooleanFieldOptions)
  }
  throw new Error(`Unsupported Zod type`)
}

/**
 * Creates and manages field options based on a Zod schema.
 * @param initialSchema The initial Zod schema.
 * @returns An object containing methods for manipulating field options.
 */
const createOptions = <T extends ZodRawShape>(initialSchema: ZodObject<T>) => {
  let options: MappedFieldOptions<z.infer<typeof initialSchema>> = {}

  /**
   * Merges the provided field options with existing options.
   * @param fieldOptions The field options to merge.
   * @returns An object containing methods for further manipulation or to build the options. Chainable.
   */
  const withFieldOptions = (
    fieldOptions: MappedFieldOptions<z.infer<typeof initialSchema>>
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
