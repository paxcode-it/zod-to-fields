import { EnumLike } from 'zod';
import * as z from 'zod';
declare function isZodString(value: z.ZodTypeAny): value is z.ZodString;
declare function isZodNumber(value: z.ZodTypeAny): value is z.ZodNumber;
declare function isZodBoolean(value: z.ZodTypeAny): value is z.ZodBoolean;
declare function isZodEnum<T extends [string, ...string[]]>(value: z.ZodTypeAny): value is z.ZodEnum<T>;
declare function isZodNativeEnum<T extends EnumLike>(value: z.ZodTypeAny): value is z.ZodNativeEnum<T>;
export { isZodString, isZodNumber, isZodBoolean, isZodEnum, isZodNativeEnum };
