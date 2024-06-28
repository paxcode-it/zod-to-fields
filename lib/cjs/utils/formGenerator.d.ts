import { EnumLike, z } from 'zod';
import { FormFieldsArray, GenericFieldOptions } from '../types/FormFieldsArray';
import { FieldValueToOptions, MappedFieldOptions } from '../types/UtilityTypes';
/**
 * Handles the conversion of Zod types to appropriate field options.
 * @param {z.ZodTypeAny} fieldValue - The Zod schema type.
 * @param {unknown} fieldOptions - Additional field options.
 * @param {string} fieldKey - Additional field options.
 * @throws Will throw an error if the Zod type is unsupported.
 * @returns {GenericFieldOptions} - Returns the corresponding field element.
 */
declare function handleFieldValue<T extends z.AnyZodObject, K extends [string, ...string[]], P extends EnumLike>(fieldKey: string, fieldValue: z.ZodTypeAny, fieldOptions?: GenericFieldOptions | FieldValueToOptions<T>): GenericFieldOptions;
/**
 * Creates and manages field options based on a Zod schema.
 * @param initialSchema The initial Zod schema.
 * @returns An object containing methods for manipulating field options.
 */
declare const createOptions: <T extends z.ZodRawShape>(initialSchema: z.ZodObject<T>) => {
    withFieldOptions: (fieldOptions: MappedFieldOptions<z.ZodObject<T, z.UnknownKeysParam, z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<T>, { [k_1 in keyof z.baseObjectOutputType<T>]: undefined extends z.baseObjectOutputType<T>[k_1] ? never : k_1; }[keyof T]> extends infer T_1 ? { [k in keyof T_1]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<T>, { [k_1 in keyof z.baseObjectOutputType<T>]: undefined extends z.baseObjectOutputType<T>[k_1] ? never : k_1; }[keyof T]>[k]; } : never, z.baseObjectInputType<T> extends infer T_2 ? { [k_2 in keyof T_2]: z.baseObjectInputType<T>[k_2]; } : never>>) => {
        withFieldOptions: any;
        build: () => MappedFieldOptions<z.ZodObject<T, z.UnknownKeysParam, z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<T>, { [k_1 in keyof z.baseObjectOutputType<T>]: undefined extends z.baseObjectOutputType<T>[k_1] ? never : k_1; }[keyof T]> extends infer T_1 ? { [k in keyof T_1]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<T>, { [k_1 in keyof z.baseObjectOutputType<T>]: undefined extends z.baseObjectOutputType<T>[k_1] ? never : k_1; }[keyof T]>[k]; } : never, z.baseObjectInputType<T> extends infer T_2 ? { [k_2 in keyof T_2]: z.baseObjectInputType<T>[k_2]; } : never>>;
    };
    build: () => MappedFieldOptions<z.ZodObject<T, z.UnknownKeysParam, z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<T>, { [k_1 in keyof z.baseObjectOutputType<T>]: undefined extends z.baseObjectOutputType<T>[k_1] ? never : k_1; }[keyof T]> extends infer T_1 ? { [k in keyof T_1]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<T>, { [k_1 in keyof z.baseObjectOutputType<T>]: undefined extends z.baseObjectOutputType<T>[k_1] ? never : k_1; }[keyof T]>[k]; } : never, z.baseObjectInputType<T> extends infer T_2 ? { [k_2 in keyof T_2]: z.baseObjectInputType<T>[k_2]; } : never>>;
};
/**
 * Generates an array of form elements based on the given Zod schema and options.
 * @param {ZodObject<T>} schema - The Zod schema.
 * @param {MappedFieldOptions<K>} [options] - Additional field options.
 * @returns {FormFieldsArray} - Returns an array of form fields.
 * @template T, K
 */
declare const generateFields: <T extends z.ZodRawShape, K extends z.AnyZodObject>(schema: z.ZodObject<T>, options?: MappedFieldOptions<K>) => FormFieldsArray;
export { createOptions, generateFields, handleFieldValue };
