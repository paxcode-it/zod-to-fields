import { ZodObject, ZodNullable, ZodArray, ZodOptional, ZodTypeAny } from 'zod'

const zodKeys = (schema: ZodTypeAny, parentKey: string = ''): string[] => {
  if (schema === null || schema === undefined) return []

  if (schema instanceof ZodNullable || schema instanceof ZodOptional) {
    return zodKeys(schema.unwrap(), parentKey)
  }

  if (schema instanceof ZodArray) {
    return zodKeys(schema.element, parentKey)
  }

  if (schema instanceof ZodObject) {
    const shape = schema.shape

    return Object.keys(shape).flatMap(key => {
      const newKey = parentKey ? `${parentKey}.${key}` : key

      return zodKeys(shape[key], newKey)
    })
  }

  return [parentKey].filter(Boolean)
}

export { zodKeys }
