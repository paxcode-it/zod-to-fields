import { EnumLike } from 'zod'
import * as z from 'zod'

// Type Guard for ZodString
function isZodString(value: z.ZodTypeAny): value is z.ZodString {
  return value instanceof z.ZodString
}

// Type Guard for ZodNumber
function isZodNumber(value: z.ZodTypeAny): value is z.ZodNumber {
  return value instanceof z.ZodNumber
}

// Type Guard for ZodBoolean
function isZodBoolean(value: z.ZodTypeAny): value is z.ZodBoolean {
  return value instanceof z.ZodBoolean
}

// Type Guard for ZodEnum
function isZodEnum<T extends [string, ...string[]]>(
  value: z.ZodTypeAny
): value is z.ZodEnum<T> {
  return value instanceof z.ZodEnum
}

// Type Guard for ZodNativeEnum
function isZodNativeEnum<T extends EnumLike>(
  value: z.ZodTypeAny
): value is z.ZodNativeEnum<T> {
  return value instanceof z.ZodNativeEnum
}

export { isZodString, isZodNumber, isZodBoolean, isZodEnum, isZodNativeEnum }
