import { EnumLike, z } from 'zod'

import { FormFieldsArray, GenericFieldOptions } from '@/types/FormFieldsArray'
import { FieldValueToOptions, MappedFieldOptions } from '@/types/UtilityTypes'
import {
  handleNativeZodEnum,
  handleZodBoolean,
  handleZodEnum,
  handleZodNumber,
  handleZodString,
} from '@/utils/fieldHandlers'
import { setDefaultOptions } from '@/utils/formHelpers'
import {
  isZodBoolean,
  isZodEnum,
  isZodNativeEnum,
  isZodNumber,
  isZodString,
} from '@/utils/typeGuards/zodTypeGuards'
import { unwrapZodType } from '@/utils/zodHelpers'

import type {
  InputBooleanFieldOptions,
  InputEnumFieldOptions,
  InputNumberFieldOptions,
  InputStringFieldOptions,
} from '@/types/FieldOptions'

/**
 * Handles the conversion of Zod types to appropriate field options.
 * @param {z.ZodTypeAny} fieldValue - The Zod schema type.
 * @param {unknown} fieldOptions - Additional field options.
 * @param {string} fieldKey - Additional field options.
 * @throws Will throw an error if the Zod type is unsupported.
 * @returns {GenericFieldOptions} - Returns the corresponding field element.
 */

function handleFieldValue<
  T extends z.AnyZodObject,
  K extends [string, ...string[]],
  P extends EnumLike,
>(
  fieldKey: string,
  fieldValue: z.ZodTypeAny,
  fieldOptions?: GenericFieldOptions | FieldValueToOptions<T>
): GenericFieldOptions {
  const defaultOptions = setDefaultOptions(fieldKey, fieldValue)
  const options = { ...defaultOptions, ...fieldOptions }

  const baseType = unwrapZodType(fieldValue)

  if (isZodString(baseType)) {
    return handleZodString(options as InputStringFieldOptions)
  } else if (isZodNumber(baseType)) {
    return handleZodNumber(options as InputNumberFieldOptions)
  } else if (isZodBoolean(baseType)) {
    return handleZodBoolean(options as InputBooleanFieldOptions)
  } else if (isZodEnum(baseType)) {
    return handleZodEnum(
      options as InputEnumFieldOptions,
      fieldValue as z.ZodEnum<K>
    )
  } else if (isZodNativeEnum(baseType)) {
    return handleNativeZodEnum(
      options as InputEnumFieldOptions,
      fieldValue as z.ZodNativeEnum<P>
    )
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
const generateFields = <T extends z.ZodRawShape, K extends z.AnyZodObject>(
  schema: z.ZodObject<T>,
  options?: MappedFieldOptions<K>
): FormFieldsArray => {
  const finalResult: FormFieldsArray = []
  for (const [fieldKey, fieldValue] of Object.entries(schema.shape)) {
    if (fieldValue instanceof z.ZodObject) {
      const description = fieldValue.description

      const nestedSchema = fieldValue
      const nestedOptions = options?.[fieldKey] as MappedFieldOptions<
        typeof nestedSchema
      >

      const generatedForm = generateFields(nestedSchema, nestedOptions)

      finalResult.push({ [fieldKey]: { fields: generatedForm, description } })

      continue
    }

    const fieldOptions = options?.[fieldKey]
    const element = handleFieldValue(fieldKey, fieldValue, fieldOptions)

    finalResult.push(element)
  }

  return finalResult
}

export { createOptions, generateFields, handleFieldValue }
