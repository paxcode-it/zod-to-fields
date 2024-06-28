import { z } from 'zod';
import type { InputBooleanFieldOptions, InputEnumFieldOptions, InputNumberFieldOptions, InputStringFieldOptions } from '../types/FieldOptions';
export type FieldValueToOptions<T> = T extends z.ZodBoolean ? Partial<InputBooleanFieldOptions> : T extends z.ZodString ? Partial<InputStringFieldOptions> : T extends z.ZodNumber ? Partial<InputNumberFieldOptions> : T extends z.ZodEnum<any> ? Partial<InputEnumFieldOptions> : T extends z.ZodNativeEnum<any> ? Partial<InputEnumFieldOptions> : T extends z.ZodObject<any> ? MappedFieldOptions<T> : never;
export type MappedFieldOptions<T extends z.AnyZodObject> = {
    [K in keyof T['shape']]?: FieldValueToOptions<T['shape'][K]>;
};
export type UnwrapZodType<T extends z.ZodTypeAny> = T extends {
    _def: {
        innerType: infer U;
    };
} ? U extends z.ZodTypeAny ? UnwrapZodType<U> : T : T;
