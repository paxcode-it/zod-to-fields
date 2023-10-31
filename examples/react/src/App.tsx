/*eslint @typescript-eslint/no-explicit-any: "off"*/
import get from 'lodash.get'
import set from 'lodash.set'
import { ChangeEvent, useState } from 'react'
import { z } from 'zod'
import { ztf } from 'zod-to-fields'
import './App.css'

enum Colors {
  red = 'red',
  green = 'green',
  yellow = 'yellow',
}
function App() {
  const [formValues, setFormValues] = useState<{ [index: string]: any }>({})
  const [errors, setErrors] = useState<{ [index: string]: any }>({})

  const schema = z.object({
    name: z.string().min(1, { message: 'name can not be empty.' }),
    lastName: z.string().min(1, { message: 'lastName can not be empty.' }),
    isAdult: z.boolean(),
    phoneNumber: z
      .string()
      .min(1, { message: 'phoneNumber can not be empty.' }),
    currency: z.enum(['USD', 'EUR', 'GBP']),
    colors: z.nativeEnum(Colors),
    email: z.string(),
    address: z.object(
      {
        country: z.string().min(1, { message: 'Country can not be empty.' }),
        location: z.object({
          longitude: z
            .string()
            .min(1, { message: 'longitude can not be empty.' }),
          latitude: z
            .string()
            .min(1, { message: 'latitude can not be empty.' }),
        }),
        street: z.string().min(1, { message: 'street can not be empty.' }),
        city: z.string().min(1, { message: 'city can not be empty.' }),
        zip: z.string().min(1, { message: 'zip can not be empty.' }),
      },
      {
        description: 'Custom label Address',
      }
    ),
  })

  const options = ztf
    .createOptions(schema)
    .withFieldOptions({
      name: {
        label: 'First Name',
        type: 'text',
      },
      lastName: {
        label: 'Last Name',
        type: 'text',
      },
      isAdult: {
        label: 'Are you an adult?',
        type: 'checkbox',
      },
      phoneNumber: {
        label: 'Phone Number',
        type: 'tel',
      },
      email: {
        type: 'email',
      },
      address: {
        street: {
          label: 'Street nested',
        },
      },
    })
    .build()

  const formFields = ztf.generateFields(schema, options)
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldKey: string
  ) => {
    const { type, value, checked } = e.target
    setFormValues(prevState => ({
      ...prevState,
      ...set(prevState, fieldKey, type === 'checkbox' ? checked : value),
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()

    const result = schema.safeParse(formValues)
    if (result.success) {
      setErrors({})
    } else {
      setErrors(result.error.formErrors.fieldErrors)
    }
  }

  const renderField = (field: ztf.GenericSingleFieldOptions, key = '') => {
    const fieldKey = key ? `${key}.${field.name}` : field.name
    const error = get(errors, fieldKey)
    const isSelect = field.tag === 'select'

    return (
      <div className='form-field' key={field.name}>
        <label className='form-label' htmlFor={field.id}>
          {field.label}
        </label>
        {isSelect ? (
          <select>
            {field.options?.map(option => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={field.type}
            name={field.name}
            id={field.id}
            className={
              field.type !== 'checkbox' ? 'form-input' : 'form-checkbox'
            }
            onChange={e => handleInputChange(e, fieldKey)}
            value={get(formValues, fieldKey) || ''}
          />
        )}
        <div className='errorContainer'>
          {error && <p className='form-error'>{error}</p>}
        </div>
      </div>
    )
  }

  const renderFields = (
    fields: ztf.FormFieldsArray,
    level = 1,
    parentKey = ''
  ) => {
    return fields.map((field, index) => {
      if (ztf.isNestedObjectFieldOptions(field)) {
        return Object.keys(field).map(key => {
          const potentialArray = field[key].fields
          const newKey = parentKey ? `${parentKey}.${key}` : key

          if (ztf.isFormFieldsArray(potentialArray)) {
            return (
              <div
                className={`form-nested level-${level}`}
                key={`${key}_${index}`}
              >
                <h3>{field[key].description || key.toUpperCase()}</h3>
                {renderFields(potentialArray, level + 1, newKey)}
              </div>
            )
          }

          return null
        })
      }

      if (field.tag === 'input' || field.tag === 'select') {
        return renderField(field, parentKey)
      }
    })
  }

  return (
    <div className='container'>
      <div className='json-column'>
        <h1>Form JSON Structure</h1>
        <pre>{JSON.stringify(formFields, null, 2)}</pre>
      </div>
      <div className='form-column'>
        <h2>Form</h2>
        <form onSubmit={handleSubmit}>
          {renderFields(formFields)}
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default App
