import {
  ZodObject,
  ZodNullable,
  ZodArray,
  ZodOptional,
  ZodTypeAny,
  z,
} from 'zod'

import { UnwrapZodType } from '@/types/UtilityTypes'

/**
 * Recursively retrieves the keys of a Zod schema including nested keys.
 * If the schema contains ZodNullable or ZodOptional types, they are unwrapped to get the underlying type.
 * If the schema contains ZodArray, it retrieves the keys of the array's elements.
 *
 * @param {ZodTypeAny} schema - The Zod schema from which to retrieve the keys.
 * @param {string} [parentKey=''] - A prefix to be prepended to each nested key. Useful for nested objects.
 * @returns {string[]} - An array of string keys.
 * @example
 *
 * // Example usage for a nested Zod object schema
 * const nestedSchema = z.object({
 *   username: z.string(),
 *   address: z.object({
 *     street: z.string(),
 *     zip: z.string()
 *   })
 * });
 *
 * zodKeys(nestedSchema); // Returns ['username', 'address.street', 'address.zip']
 */
const zodKeys = (schema: ZodTypeAny, parentKey: string = ''): string[] => {
  if (schema === null || schema === undefined) return []

  if (schema instanceof ZodNullable || schema instanceof ZodOptional) {
    return zodKeys(schema.unwrap(), parentKey)
  }

  if (schema instanceof ZodArray) {
    return zodKeys(schema.element, parentKey)
  }

  if (schema instanceof ZodObject) {
    const shape = schema.shape

    return Object.keys(shape).flatMap(key => {
      const newKey = parentKey ? `${parentKey}.${key}` : key

      return zodKeys(shape[key], newKey)
    })
  }

  return [parentKey].filter(Boolean)
}

const unwrapZodType = <T extends z.ZodTypeAny>(
  zodType: T
): UnwrapZodType<T> => {
  let unwrappedType: z.ZodTypeAny = zodType

  while (unwrappedType._def && unwrappedType._def.innerType) {
    unwrappedType = unwrappedType._def.innerType
  }

  return unwrappedType as UnwrapZodType<T>
}

export { zodKeys, unwrapZodType }
