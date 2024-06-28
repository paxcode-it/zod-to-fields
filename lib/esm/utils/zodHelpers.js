"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unwrapZodType = exports.zodKeys = void 0;
const zod_1 = require("zod");
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
const zodKeys = (schema, parentKey = '') => {
    if (schema === null || schema === undefined)
        return [];
    if (schema instanceof zod_1.ZodNullable || schema instanceof zod_1.ZodOptional) {
        return zodKeys(schema.unwrap(), parentKey);
    }
    if (schema instanceof zod_1.ZodArray) {
        return zodKeys(schema.element, parentKey);
    }
    if (schema instanceof zod_1.ZodObject) {
        const shape = schema.shape;
        return Object.keys(shape).flatMap(key => {
            const newKey = parentKey ? `${parentKey}.${key}` : key;
            return zodKeys(shape[key], newKey);
        });
    }
    return [parentKey].filter(Boolean);
};
exports.zodKeys = zodKeys;
const unwrapZodType = (zodType) => {
    let unwrappedType = zodType;
    while (unwrappedType._def) {
        if (unwrappedType._def.innerType) {
            unwrappedType = unwrappedType._def.innerType;
        }
        else if (unwrappedType._def.effect && unwrappedType._def.schema) {
            unwrappedType = unwrappedType._def.schema;
        }
        else {
            break;
        }
    }
    return unwrappedType;
};
exports.unwrapZodType = unwrapZodType;
