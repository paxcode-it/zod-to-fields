import { z, ZodEnum, ZodNativeEnum } from 'zod'

const setDefaultOptions = (fieldName: string, fieldType: z.ZodTypeAny) => {
  const isEnum =
    fieldType instanceof ZodEnum || fieldType instanceof ZodNativeEnum
  const tag: 'select' | 'input' = isEnum ? 'select' : 'input'
  const label = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
  // const type =
  //   fieldType instanceof z.ZodNumber
  //     ? 'number'
  //     : fieldType instanceof z.ZodString
  //     ? 'text'
  //     : fieldType instanceof z.ZodBoolean
  //     ? 'checkbox'
  //     : 'text'

  return {
    id: fieldName,
    label,
    name: fieldName,
    tag,
  }
}

export { setDefaultOptions }
