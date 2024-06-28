import { ZodTypeAny } from 'zod';
import { UnwrapZodType } from '../types/UtilityTypes';
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
declare const zodKeys: (schema: ZodTypeAny, parentKey?: string) => string[];
declare const unwrapZodType: <T extends ZodTypeAny>(zodType: T) => UnwrapZodType<T>;
export { zodKeys, unwrapZodType };
