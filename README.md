<h1 align="center">
    Zod To Fields
</h1>
<p align="center">
    <img src="zod-to-fields.svg" alt="Logo" height="300" />
</p>

> **<p align="center">
> Automate your form field generation with type safety.
> </br> </br>
> Zod To Fields is a utility that effortlessly creates form fields from Zod schemas, ensuring TypeScript type safety and developer-friendly code completion.</p>**

<p align="center">
    <a href="https://www.npmjs.com/package/zod-to-fields">
        <img src="https://img.shields.io/npm/l/zod-to-fields.svg" alt="License" />
    </a>
    <a href="https://codecov.io/gh/wojtekKrol/zod-to-fields">
        <img src="https://img.shields.io/codecov/c/github/wojtekKrol/zod-to-fields.svg" alt="Coverage" />
    </a>
    <a href="https://npmjs.org/package/zod-to-fields">
        <img src="https://img.shields.io/npm/dm/zod-to-fields.svg" alt="Downloads" />
    </a>
    <a href="https://npmjs.org/package/zod-to-fields">
        <img src="https://img.shields.io/npm/v/zod-to-fields.svg" alt="Version" />
    </a>
    <a href="https://github.com/wojtekKrol/zod-to-fields/actions?query=branch:main">
        <img src="https://img.shields.io/github/actions/workflow/status/wojtekKrol/zod-to-fields/CI.yml.svg?branch=main" alt="Status" />
    </a>
</p>

## 📚 Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
   - [Basic Example](#basic-example)
   - [Advanced Usage](#advanced-usage)
5. [API Reference](#api-reference)
6. [Examples](#examples)
7. [Contributing](#contributing)
8. [License](#license)

## 📑 Introduction

This library helps you convert Zod schemas to form fields, reducing boilerplate code and enforcing type safety.

## ⭐ Features

### 🛡️ Strong Type Safety with Zod and TypeScript

Eradicate runtime errors and ensure robust code with our TypeScript-based utility that flawlessly integrates with Zod schemas. Enjoy the benefits of type inference and static type checking in your form fields.

### 🧠 Intelligent Code Completion and Intellisense

Developer-friendly is our middle name! With strong typing, your IDE will become your best friend, providing invaluable code completion and Intellisense suggestions, making your development process faster and error-free.

#### 🎓 Example for Code Completion

With a Zod schema like this:

```typescript
const schema = z.object({
  name: z.string(),
  age: z.number(),
  isActive: z.boolean(),
})
```

The function `createOptions` will offer real-time attribute suggestions based on your Zod schema types.

```typescript
const options = createOptions(schema)({
  // IDE suggestions here
})
```

## 💻 Installation

Ensure you have the power of Zod To Fields in your project by installing it via your preferred package manager:

```bash
# With npm
npm install zod-to-fields

# With Yarn
yarn add zod-to-fields

# With Pnpm
pnpm install zod-to-fields
```

> **🔔 Note**: This package is optimized for ECMAScript modules (ESM). Ensure your environment supports ESM imports.

## 🚀 Usage

### 🌱 Basic Example

Generate form fields effortlessly:

```typescript
import { z } from 'zod'
import { ztf } from 'zod-to-fields'

const schema = z.object({
  name: z.string(),
  age: z.number(),
  isActive: z.boolean(),
})

const options = ztf.createOptions(schema)({
  name: { label: 'Full Name' },
  age: { label: 'Your Age', type: 'number' },
  isActive: { label: 'Active Status', type: 'checkbox' },
})

const formFields = ztf.generateFields(schema, options)
```

## 🧙 Advanced Usage

### Nested Schemas

For nested schemas, you can define a Zod schema as follows:

```typescript
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
```

### Enums and Native Enums

The library also supports Zod's enum and nativeEnum types,
allowing you to use either string-based or native TypeScript enums as options in your form fields.

## 📖 API Reference

### `createOptions`

```typescript
/**
 * Creates and manages field options based on a Zod schema.
 * @param initialSchema The initial Zod schema.
 * @returns An object containing methods for manipulating field options.
 */
```

#### Usage

```typescript
const options = createOptions(schema)
```

#### Parameters

- `initialSchema`: Your Zod schema object.

#### Returns

- `withFieldOptions`: Method for setting field options.
- `build`: Method for building the final options object.

### `withFieldOptions`

```typescript
/**
 * Merges the provided field options with existing options.
 * @param fieldOptions The field options to merge.
 * @returns An object containing methods for further manipulation or to build the options. Chainable.
 */
```

#### Usage

```typescript
const { withFieldOptions, build } = createOptions(schema)
withFieldOptions({
  /* field options */
}).build()
```

#### Parameters

- `fieldOptions`: Object containing the attributes you want to customize.

#### Returns

- Chainable methods for further manipulation.

#### Type Behavior

- `z.string()` will generate field options of type `InputStringFieldOptions`, which is narrowed to allow string types like `text`, `password`, etc. You can override these settings with any other property which is a subset of `Partial<InputHTMLAttributes<HTMLInputElement>>`.

- `z.enum()` and `z.nativeEnum()` will generate field options of type `InputEnumFieldOptions`, allowing you to specify options either as a select dropdown or as radio buttons.

### `build`

```typescript
/**
 * Builds the final options object.
 * @returns The built options object.
 */
```

#### Usage

```typescript
const { build } = createOptions(schema).withFieldOptions({
  /* field options */
})
const finalOptions = build()
```

## 📂 Examples

Refer to the `/examples` folder for real-world scenarios and advanced usage.

## 🤝 Contributing

We love community contributions! For guidelines on how to contribute, please see [CONTRIBUTING.md](CONTRIBUTING.md).

## 📜 License

This project is under the MIT License. See the [LICENSE](LICENSE) file for more details.
