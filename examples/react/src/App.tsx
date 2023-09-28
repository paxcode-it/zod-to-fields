import { z } from 'zod'
import { ztf } from 'zod-to-fields'

import './App.css'

function App() {
  const schema = z.object({
    name: z.string(),
    lastName: z.string(),
    isAdult: z.boolean(),
    phoneNumber: z.string(),
    email: z.string(),
    address: z.object({
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

  return (
    <div className='container'>
      <div className='json-column'>
        <h2>Form JSON Structure</h2>
        <pre>{JSON.stringify(formFields, null, 2)}</pre>
      </div>

      <div className='form-column'>
        <h2>Form</h2>
        <form>
          {formFields?.map(field => (
            <div className='form-field' key={field.name}>
              <label className='form-label'>{field.label}</label>
              {field.type !== 'checkbox' ? (
                <input
                  type={field.type}
                  name={field.name}
                  className='form-input'
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  className='form-checkbox'
                />
              )}
            </div>
          ))}
        </form>
      </div>
    </div>
  )
}

export default App
