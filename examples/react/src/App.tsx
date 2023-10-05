/*eslint @typescript-eslint/no-explicit-any: "off"*/
import { useState } from 'react'
import { isNestedObjectFieldOptions, NestedObjectFieldOptions } from 'src'
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
    name: z.string(),
    lastName: z.string(),
    isAdult: z.boolean(),
    phoneNumber: z.string(),
    currency: z.enum(['USD', 'EUR', 'GBP']),
    colors: z.nativeEnum(Colors),
    email: z.string(),
    address: z.object({
      location: z.object({
        longitude: z.number(),
        latitude: z.number(),
      }),
      street: z.string(),
      city: z.string(),
      zip: z.string(),
    }),
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
  const handleInputChange = e => {
    const { name, type, value, checked } = e.target
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const result = schema.safeParse(formValues)
    if (result.success) {
      console.log('Form is valid:', result.data)
      setErrors({})
    } else {
      console.log('Form errors:', result.error.formErrors.fieldErrors)
      setErrors(result.error.formErrors.fieldErrors)
    }
  }

  const renderField = (field: ztf.GenericSignleFieldOptions) => {
    const error = errors[field.name]

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
            onChange={handleInputChange}
            value={formValues[field.name as string] || ''}
          />
        )}

        {error && <p className='form-error'>{error}</p>}
      </div>
    )
  }

  const renderFields = (fields: ztf.FormFieldsArray, level = 1) => {
    return fields.map((field, index) => {
      console.log(field)

      if (ztf.isNestedObjectFieldOptions(field)) {
        console.log(field)
      }
      if (field.tag === 'input' || field.tag === 'select') {
        return renderField(field)
      }

      return Object.keys(field).map(key => {
        const potentialArray = field[key]
        if (ztf.isFormFieldsArray(potentialArray)) {
          return (
            <div
              className={`form-nested level-${level}`}
              key={`${key}_${index}`}
            >
              <h3>{key.toUpperCase()}</h3>
              {renderFields(potentialArray, level + 1)}
            </div>
          )
        }

        return null
      })
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
