module.exports = {
  // Type check TypeScript files
  '**/*.(ts)': () => 'pnpm tsc --noEmit',

  // Lint & Prettify TS files
  '**/*.(ts)': filenames => [
    `pnpm eslint --fix ${filenames.join(' ')}`,
    `pnpm prettier --write ${filenames.join(' ')}`,
  ],

  // Prettify only Markdown and JSON files
  '**/*.(json,md,mdx,yml)': filenames => `pnpm prettier --write ${filenames.join(' ')}`,
}
