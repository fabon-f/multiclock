import eslint from '@eslint/js'
import tsEslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactRecommended from 'eslint-plugin-react/configs/recommended.js'
import reactJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js'
import globals from 'globals'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
      'react-refresh': reactRefresh,
    },
  },
  {
    ignores: ['dist', 'eslint.config.js', '.prettierrc.js'],
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
  {
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
    },
  },
  eslint.configs.recommended,
  ...tsEslint.configs.strictTypeChecked,
  ...tsEslint.configs.stylisticTypeChecked,
  reactRecommended,
  reactJsxRuntime,
  ...compat.extends('plugin:react-hooks/recommended'),
  eslintConfigPrettier,
  {
    rules: {
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true },
      ],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
