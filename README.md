# js-utils

A personal collection of reusable JavaScript utility functions built up over time. Covers arrays, strings, objects, numbers, and function helpers.

## Structure

```
src/
  array/    → array manipulation helpers
  string/   → string formatting and parsing
  object/   → object transformation utilities
  number/   → math and number helpers
  fn/       → function composition and control flow
```

## Usage

```js
import { chunk } from './src/array/chunk.js'
import { debounce } from './src/fn/debounce.js'
```

Functions are intentionally kept small and dependency-free.
