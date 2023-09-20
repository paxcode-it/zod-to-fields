# Zod To Fields

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

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API Reference](#api-reference)
5. [Examples](#examples)
6. [Contributing](#contributing)
7. [License](#license)

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
npm install zod-to-fields --save

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
import { createOptions, generateFormElementsFromSchema } from 'zod-to-fields'

const schema = z.object({
  name: z.string(),
  age: z.number(),
  isActive: z.boolean(),
})

const options = createOptions(schema)({
  name: { label: 'Full Name' },
  age: { label: 'Your Age', type: 'number' },
  isActive: { label: 'Active Status', type: 'checkbox' },
})

const formFields = generateFormElementsFromSchema(schema, options)
```

## 📖 API Reference

For a deep dive into the functionality and method signatures, please refer to the inline JSDocs in the codebase.

## 📂 Examples

Refer to the `/examples` folder for real-world scenarios and advanced usage.

## 🤝 Contributing

We love community contributions! For guidelines on how to contribute, please see [CONTRIBUTING.md](CONTRIBUTING.md).

## 📜 License

This project is under the MIT License. See the [LICENSE](LICENSE) file for more details.
