import { z, ZodEnum, ZodNativeEnum } from 'zod'

const setDefaultOptions = (fieldName: string, fieldType: z.ZodTypeAny) => {
  const isEnum =
    fieldType instanceof ZodEnum || fieldType instanceof ZodNativeEnum
  const tag: 'select' | 'input' = isEnum ? 'select' : 'input'

  return {
    id: fieldName,
    label: fieldName,
    name: fieldName,
    tag,
  }
}

export { setDefaultOptions }
