# JavaScript / Full-Stack Recall Sheet

Use this after studying, not as a replacement for the reviewers.

## JavaScript

```js
const transformed = items.map((item) => item.value);
const matching = items.filter((item) => item.active);
const first = items.find((item) => item.id === id);
const exists = items.some((item) => item.active);
const allValid = items.every((item) => item.valid);
const total = items.reduce((sum, item) => sum + item.amount, 0);

const copy = [...items];
const updated = { ...user, name: "New" };
const value = object?.nested?.value ?? "fallback";
```

- Prefer `const`; use `let` for reassignment.
- Prefer `===` and explicit conversion.
- `return` gives a result; `console.log` only prints.
- Objects/arrays compare by identity.
- Spread is shallow.
- `map` transforms, `filter` selects, `find` retrieves one.

## Async

```js
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
} catch (error) {
  // recover, translate, add context, or show useful UI
}
```

- Independent async operations: `Promise.all`.
- HTTP errors do not automatically reject `fetch`.
- Model loading, error, empty, and success states.

## Frontend

- Semantic HTML and keyboard support first.
- State has one owner/source of truth.
- Derive values; avoid duplicate state.
- Effects synchronize with external systems.
- Never trust client validation as security.
- Avoid untrusted `innerHTML`.

## Backend

- Validate input at the boundary.
- Use consistent statuses and error shapes.
- Authenticate identity; authorize every protected action/resource.
- Parameterize SQL.
- Do not log or ship secrets.
- Bound list endpoints with pagination.

## Interview loop

Clarify → examples/edge cases → simple approach → code → test → complexity/trade-offs.

