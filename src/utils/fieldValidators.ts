import { FormFieldsArray } from '@/types/FormFieldsArray'

const checkIfFieldsOverlapWithSchema = (
  schemaKeys: string[],
  fields: FormFieldsArray
) => {
  const fieldsNames = fields.map(({ name }) => name)

  if (schemaKeys.length !== fieldsNames.length) {
    throw new Error('Fields length does not match schema length')
  }

  while (schemaKeys.length > 0) {
    const key = schemaKeys.shift()!
    const index = fieldsNames.indexOf(key)

    if (index === -1) {
      throw new Error(`Key ${key} is missing in fields: ${fieldsNames}`)
    }

    fieldsNames.splice(index, 1)
  }

  if (fieldsNames.length !== 0) {
    throw new Error('Not all schema keys are present in the fields')
  }

  return true
}

export { checkIfFieldsOverlapWithSchema }
