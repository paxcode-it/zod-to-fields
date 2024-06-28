"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfFieldsOverlapWithSchema = void 0;
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
const checkIfFieldsOverlapWithSchema = (schemaKeys, fields) => {
    const fieldsNames = fields.map(({ name }) => name);
    if (schemaKeys.length !== fieldsNames.length) {
        throw new Error('Fields length does not match schema length');
    }
    while (schemaKeys.length > 0) {
        const key = schemaKeys.shift();
        const index = fieldsNames.indexOf(key);
        if (index === -1) {
            throw new Error(`Key ${key} is missing in fields: ${fieldsNames}`);
        }
        fieldsNames.splice(index, 1);
    }
    if (fieldsNames.length !== 0) {
        throw new Error('Not all schema keys are present in the fields');
    }
    return true;
};
exports.checkIfFieldsOverlapWithSchema = checkIfFieldsOverlapWithSchema;
