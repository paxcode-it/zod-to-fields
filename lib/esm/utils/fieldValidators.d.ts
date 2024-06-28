import { FormFieldsArray } from '../types/FormFieldsArray';
/**
 * Validates if the keys from a Zod schema match with the field names in an array of form fields.
 * This function will throw an error if the keys don't match exactly.
 *
 * @param {string[]} schemaKeys - An array of keys from the Zod schema.
 * @param {FormFieldsArray} fields - An array of form field objects, each containing at least a 'name' property.
 * @returns {boolean} - Returns true if all schema keys are present in the fields, throws an error otherwise.
 *
 * @throws Will throw an error if the schemaKeys and field names do not overlap exactly.
 *
 * @example
 *
 * const schemaKeys = ['username', 'password'];
 * const fields = [{ name: 'username' }, { name: 'password' }];
 *
 * checkIfFieldsOverlapWithSchema(schemaKeys, fields); // Returns true
 *
 */
declare const checkIfFieldsOverlapWithSchema: (schemaKeys: string[], fields: FormFieldsArray) => boolean;
export { checkIfFieldsOverlapWithSchema };
