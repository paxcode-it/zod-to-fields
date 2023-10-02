import { z } from 'zod'

const setDefaultOptions = (fieldKey: string, fieldValue: z.ZodTypeAny) => {
  const isEnum =
    fieldValue instanceof z.ZodEnum || fieldValue instanceof z.ZodNativeEnum
  const tag: 'select' | 'input' = isEnum ? 'select' : 'input'
  const label = fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1)

  return {
    id: fieldKey,
    label,
    name: fieldKey,
    tag,
  }
}

export { setDefaultOptions }
