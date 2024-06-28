import { EnumLike, z } from 'zod';
import { InputBooleanFieldOptions, InputEnumFieldOptions, InputNumberFieldOptions, InputStringFieldOptions } from '../types/FieldOptions';
declare const handleZodString: (fieldOptions: InputStringFieldOptions) => InputStringFieldOptions;
declare const handleZodNumber: (fieldOptions: InputNumberFieldOptions) => InputNumberFieldOptions;
declare const handleZodBoolean: (fieldOptions: InputBooleanFieldOptions) => InputBooleanFieldOptions;
declare const handleZodEnum: <T extends [string, ...string[]]>(fieldOptions: InputEnumFieldOptions, fieldValue: z.ZodEnum<T>) => InputEnumFieldOptions;
declare const handleNativeZodEnum: <T extends EnumLike>(fieldOptions: InputEnumFieldOptions, fieldValue: z.ZodNativeEnum<T>) => InputEnumFieldOptions;
export { handleZodBoolean, handleZodNumber, handleZodString, handleZodEnum, handleNativeZodEnum, };
