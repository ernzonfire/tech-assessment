# 03 — Async JavaScript, HTTP, and Errors

## The mental model

JavaScript runs current synchronous work on the call stack. Browser/Node APIs handle timers, network, and I/O. Completed callbacks are queued; the event loop runs them when the stack is free.

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
// A, D, C, B
```

Promise callbacks (microtasks) run before timer callbacks (tasks) after synchronous work finishes.

## Promises and `async`/`await`

A promise is pending, fulfilled, or rejected.

```js
function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function run() {
  await wait(100);
  return "done";
}
```

Every `async` function returns a promise, even when returning a plain value.

Use `try/catch` around awaited work you can meaningfully handle:

```js
async function loadUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Could not load user", { id, error });
    throw error;
  }
}
```

`fetch` rejects for network failures, but HTTP 404/500 still resolves. Check `response.ok`.

## Sequential vs parallel

```js
// Sequential: B waits for A
const a = await loadA();
const b = await loadB();

// Parallel: use when independent
const [a, b] = await Promise.all([loadA(), loadB()]);
```

`Promise.all` rejects when any input rejects. `Promise.allSettled` reports every outcome.

## HTTP essentials

- Request: method, URL, headers, optional body.
- Response: status, headers, optional body.
- JSON is text; serialize with `JSON.stringify`, parse with `JSON.parse`.
- Common methods: GET read, POST create/action, PATCH partial update, PUT replace, DELETE remove.
- Common statuses: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthenticated, 403 Forbidden, 404 Not Found, 409 Conflict, 500 Server Error.

## UI state is more than data

An API-powered view normally represents:

```js
{
  status: "idle" | "loading" | "success" | "error",
  data: [],
  error: null
}
```

Also design the empty state and prevent stale requests from overwriting newer results when search/filter input changes quickly.

## Error-handling rule

Catch an error where you can add context, recover, translate it for a boundary, or show a useful state. Do not silently swallow it.

Next: solve `exercises/javascript/day-03-async.js`.

