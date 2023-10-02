import { FormFieldsArray } from '@/types/FormFieldsArray'
import { checkIfFieldsOverlapWithSchema } from '@/utils/fieldValidators'

describe('checkIfFieldsOverlapWithSchema', () => {
  it('should return true when schema keys match fields', () => {
    const schemaKeys = ['username', 'password']
    const fields: FormFieldsArray = [
      {
        name: 'username',
        type: 'text',
        label: 'Username',
        tag: 'input',
        id: 'username',
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        tag: 'input',
        id: 'password',
      },
    ]

    expect(() =>
      checkIfFieldsOverlapWithSchema(schemaKeys, fields)
    ).not.toThrow()
  })

  it('should throw error when schema keys length is not equal to fields length', () => {
    const schemaKeys = ['username']
    const fields: FormFieldsArray = [
      {
        name: 'username',
        type: 'text',
        label: 'Username',
        tag: 'input',
        id: 'username',
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        tag: 'input',
        id: 'password',
      },
    ]

    expect(() => checkIfFieldsOverlapWithSchema(schemaKeys, fields)).toThrow(
      'Fields length does not match schema length'
    )
  })

  it('should throw error when schema key is missing in fields', () => {
    const schemaKeys = ['username', 'email']
    const fields: FormFieldsArray = [
      {
        name: 'username',
        type: 'text',
        label: 'Username',
        tag: 'input',
        id: 'username',
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        tag: 'input',
        id: 'password',
      },
    ]

    expect(() => checkIfFieldsOverlapWithSchema(schemaKeys, fields)).toThrow(
      `Key email is missing in fields`
    )
  })

  it('should throw error when extra keys exist in fields', () => {
    const schemaKeys = ['username']
    const fields: FormFieldsArray = [
      {
        name: 'username',
        type: 'text',
        label: 'Username',
        tag: 'input',
        id: 'username',
      },
      {
        name: 'password',
        type: 'password',
        label: 'Password',
        tag: 'input',
        id: 'password',
      },
    ]

    expect(() => checkIfFieldsOverlapWithSchema(schemaKeys, fields)).toThrow(
      'Fields length does not match schema length'
    )
  })
})
