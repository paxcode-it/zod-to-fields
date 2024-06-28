"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFieldValue = exports.generateFields = exports.createOptions = void 0;
const zod_1 = require("zod");
const fieldHandlers_1 = require("../utils/fieldHandlers");
const formHelpers_1 = require("../utils/formHelpers");
const zodTypeGuards_1 = require("../utils/typeGuards/zodTypeGuards");
const zodHelpers_1 = require("../utils/zodHelpers");
/**
 * Handles the conversion of Zod types to appropriate field options.
 * @param {z.ZodTypeAny} fieldValue - The Zod schema type.
 * @param {unknown} fieldOptions - Additional field options.
 * @param {string} fieldKey - Additional field options.
 * @throws Will throw an error if the Zod type is unsupported.
 * @returns {GenericFieldOptions} - Returns the corresponding field element.
 */
function handleFieldValue(fieldKey, fieldValue, fieldOptions) {
    const defaultOptions = (0, formHelpers_1.setDefaultOptions)(fieldKey, fieldValue);
    const options = { ...defaultOptions, ...fieldOptions };
    const baseType = (0, zodHelpers_1.unwrapZodType)(fieldValue);
    if ((0, zodTypeGuards_1.isZodString)(baseType)) {
        return (0, fieldHandlers_1.handleZodString)(options);
    }
    else if ((0, zodTypeGuards_1.isZodNumber)(baseType)) {
        return (0, fieldHandlers_1.handleZodNumber)(options);
    }
    else if ((0, zodTypeGuards_1.isZodBoolean)(baseType)) {
        return (0, fieldHandlers_1.handleZodBoolean)(options);
    }
    else if ((0, zodTypeGuards_1.isZodEnum)(baseType)) {
        return (0, fieldHandlers_1.handleZodEnum)(options, fieldValue);
    }
    else if ((0, zodTypeGuards_1.isZodNativeEnum)(baseType)) {
        return (0, fieldHandlers_1.handleNativeZodEnum)(options, fieldValue);
    }
    throw new Error(`Unsupported Zod type`);
}
exports.handleFieldValue = handleFieldValue;
/**
 * Creates and manages field options based on a Zod schema.
 * @param initialSchema The initial Zod schema.
 * @returns An object containing methods for manipulating field options.
 */
const createOptions = (initialSchema) => {
    let options = {};
    /**
     * Merges the provided field options with existing options.
     * @param fieldOptions The field options to merge.
     * @returns An object containing methods for further manipulation or to build the options. Chainable.
     */
    const withFieldOptions = (fieldOptions) => {
        options = { ...options, ...fieldOptions };
        return { withFieldOptions, build };
    };
    /**
     * Builds the final options object.
     * @returns The built options object.
     */
    const build = () => {
        return options;
    };
    return { withFieldOptions, build };
};
exports.createOptions = createOptions;
/**
 * Generates an array of form elements based on the given Zod schema and options.
 * @param {ZodObject<T>} schema - The Zod schema.
 * @param {MappedFieldOptions<K>} [options] - Additional field options.
 * @returns {FormFieldsArray} - Returns an array of form fields.
 * @template T, K
 */
const generateFields = (schema, options) => {
    const finalResult = [];
    for (const [fieldKey, fieldValue] of Object.entries(schema.shape)) {
        if (fieldValue instanceof zod_1.z.ZodObject) {
            const description = fieldValue.description;
            const nestedSchema = fieldValue;
            const nestedOptions = options?.[fieldKey];
            const generatedForm = generateFields(nestedSchema, nestedOptions);
            finalResult.push({ [fieldKey]: { fields: generatedForm, description } });
            continue;
        }
        const fieldOptions = options?.[fieldKey];
        const element = handleFieldValue(fieldKey, fieldValue, fieldOptions);
        finalResult.push(element);
    }
    return finalResult;
};
exports.generateFields = generateFields;
