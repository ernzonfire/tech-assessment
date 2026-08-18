# 02 — Functions, Data, and Problem Solving

## Array method decision guide

- `map`: one output for every input; transformed array.
- `filter`: keep zero or more matching items.
- `find`: first matching item or `undefined`.
- `some`: does at least one item match?
- `every`: do all items match?
- `reduce`: combine into one result; use only when it stays readable.
- `sort`: orders the array **in place**; copy first when mutation is unwanted.

```js
const products = [
  { name: "Mouse", price: 700, active: true },
  { name: "Keyboard", price: 1200, active: false },
];

const names = products.map((product) => product.name);
const active = products.filter((product) => product.active);
const expensive = products.find((product) => product.price > 1000);
const total = products.reduce((sum, product) => sum + product.price, 0);
```

## Destructuring, rest, spread

```js
const { name, price = 0 } = product;
const [first, ...remaining] = items;

const updated = { ...product, price: 999 };
const combined = [...left, ...right];
```

Spread is shallow. Nested objects remain shared unless copied too.

## Scope and closures

`let` and `const` are block-scoped. A closure is a function plus access to variables from where it was created.

```js
function makeCounter(start = 0) {
  let count = start;

  return function increment() {
    count += 1;
    return count;
  };
}

const counter = makeCounter(10);
counter(); // 11
counter(); // 12
```

Closures power event handlers, private state, factories, memoization, and many framework patterns.

## Pure functions and mutation

A pure function returns the same result for the same inputs and does not change outside state. Pure transformations are easier to test.

```js
function renameUser(user, name) {
  return { ...user, name };
}
```

Mutation is not automatically wrong. It becomes risky when ownership is unclear or multiple parts of the app share the same reference.

## Modules

```js
// math.js
export function add(a, b) {
  return a + b;
}

// app.js
import { add } from "./math.js";
```

Modules make dependencies explicit and keep file responsibilities focused.

## Problem-solving template

1. Clarify input types and expected output.
2. Write two normal examples and edge cases.
3. Explain a simple approach in plain language.
4. Implement the smallest correct version.
5. Test each meaningful branch.
6. Discuss complexity and alternatives.

Complexity instincts:

- One pass over `n` items: usually `O(n)`.
- Nested full passes: usually `O(n²)`.
- Object/Map lookup: average `O(1)`.
- Sorting: commonly `O(n log n)`.

Next: solve `exercises/javascript/day-02-data.js`.

