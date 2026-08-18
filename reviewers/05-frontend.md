# 05 — Component Frontend (React Mental Model)

React describes UI as a function of props and state. A component should be understandable from its inputs and local responsibilities.

## Core concepts

- **Component:** reusable UI behavior/structure.
- **Props:** read-only inputs from a parent.
- **State:** data that changes over time and causes rendering.
- **Derived value:** compute from props/state instead of storing duplicate state.
- **Effect:** synchronize with an external system—not a general-purpose place for calculations.

```jsx
function TaskCount({ tasks }) {
  const openCount = tasks.filter((task) => !task.done).length;
  return <p>{openCount} open</p>;
}
```

Do not store `openCount` separately unless there is a strong reason; duplicate state drifts.

## State ownership

Put state at the lowest component that owns all consumers. Lift it to the closest common parent when siblings need the same source of truth. Avoid global state until data is truly app-wide or cross-route.

Update arrays/objects immutably:

```jsx
setTasks((current) =>
  current.map((task) =>
    task.id === id ? { ...task, done: !task.done } : task
  )
);
```

## Effects

Effects synchronize with network subscriptions, timers, DOM APIs, or other external systems. Dependencies should include reactive values used by the effect. Clean up subscriptions/timers.

Common mistakes:

- Effect that derives state from other state.
- Missing dependency creating a stale closure.
- Fetch race after input/route changes.
- Using array index as a key for reorderable items.
- One giant component with unrelated responsibilities.

## Data fetching

Represent loading, error, empty, and success. Decide caching/revalidation behavior. Cancel or ignore obsolete requests. Keep the server response contract typed/validated when possible.

## Performance

Measure before optimizing. Stable keys and correct state placement matter more than scattering memoization. Large bundles, unnecessary network waterfalls, and expensive rerenders are common targets.

## Frontend assessment expectations

- Semantic accessible UI
- Clear component boundaries
- Predictable state flow
- Correct async states
- Responsive layout
- Tests around important behavior
- Reasonable code organization

