# 01 — JavaScript Foundations Refresher

Goal: masabtan nimo unsay gi-evaluate sa JavaScript, dili lang makakopya ug syntax.

## 1. Values and types

JavaScript programs transform values. Common primitive values:

```js
"hello"       // string
42            // number
true          // boolean
undefined     // missing/unassigned
null          // intentionally empty
123n          // bigint
Symbol("id")  // symbol
```

Objects (including arrays and functions) are reference values:

```js
const user = { name: "Ana", active: true };
const scores = [10, 20, 30];
const greet = function () {};
```

Useful checks:

```js
typeof 42;              // "number"
typeof null;            // "object" — historical JS quirk
Array.isArray(scores);  // true
Number.isNaN(NaN);      // true
```

## 2. `const` and `let`

Use `const` by default. Use `let` when the variable itself must be reassigned. Avoid `var` in new code.

```js
const taxRate = 0.12;
let total = 0;
total = total + 100;
```

`const` prevents reassignment, not object mutation:

```js
const user = { name: "Mia" };
user.name = "May"; // allowed
// user = {};       // error
```

## 3. Operators and coercion

Prefer strict equality:

```js
5 === 5;   // true
5 === "5"; // false
5 == "5";  // true because == coerces; usually avoid it
```

Convert explicitly when input types are uncertain:

```js
const quantity = Number("3");
const label = String(42);
const hasItems = Boolean(1);
```

Falsy values are: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, and `NaN`. Everything else—including `[]` and `{}`—is truthy.

`??` only falls back for `null` or `undefined`; `||` falls back for every falsy value:

```js
0 || 10;  // 10
0 ?? 10;  // 0
```

## 4. Control flow

```js
if (score >= 90) {
  console.log("excellent");
} else if (score >= 75) {
  console.log("passed");
} else {
  console.log("review again");
}
```

Guard clauses reduce nesting:

```js
function getDisplayName(user) {
  if (!user) return "Guest";
  if (!user.name) return "Anonymous";
  return user.name;
}
```

Loops:

```js
for (let index = 0; index < items.length; index += 1) {}
for (const item of items) {}
while (condition) {}
```

Use `for...of` for iterable values. `for...in` iterates property keys and is rarely the right array loop.

## 5. Functions

A function should have clear inputs, a return value, and one understandable responsibility.

```js
function add(a, b) {
  return a + b;
}

const multiply = (a, b) => a * b;
```

`console.log` displays a value; `return` gives a value back to the caller. They are not interchangeable.

```js
function brokenAdd(a, b) {
  console.log(a + b); // caller still receives undefined
}
```

Default parameters and optional chaining:

```js
function greet(name = "Guest") {
  return `Hello, ${name}!`;
}

const city = user.address?.city ?? "Unknown";
```

## 6. Arrays and objects

```js
const colors = ["red", "blue"];
colors.push("green");      // mutates
const first = colors[0];

const person = { name: "Jo", age: 25 };
person.age += 1;           // mutates
const name = person.name;
```

Non-mutating copies:

```js
const nextColors = [...colors, "black"];
const updatedPerson = { ...person, age: 26 };
```

Objects and arrays compare by identity, not by contents:

```js
[] === []; // false
const a = [];
const b = a;
a === b;   // true
```

## 7. Debugging routine

When code fails:

1. Restate expected input and output.
2. Reproduce with the smallest failing input.
3. Read the full error and first relevant stack line.
4. Inspect values and types at the boundary.
5. Change one thing.
6. Add a test for the bug.

Common errors:

- `ReferenceError`: name/scope problem.
- `TypeError`: operation used on an incompatible value.
- `SyntaxError`: parser cannot understand the code.
- Wrong result without an exception: logic bug; inspect branches and boundary cases.

## Before the exercise, recall without notes

- What is the difference between `undefined` and `null`?
- Why prefer `===`?
- What does a function return if it has no `return`?
- Which values are falsy?
- Does `const` make an object immutable?
- Difference between `console.log(value)` and `return value`?

Next: solve `exercises/javascript/day-01-foundations.js`.

