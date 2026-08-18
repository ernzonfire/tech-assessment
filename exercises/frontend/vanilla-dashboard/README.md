# Frontend Project — Vanilla Task Dashboard

Build this after reviewers 01–04. No framework and no copy-pasted tutorial.

## Product brief

A user can create tasks, mark them complete, filter/search them, delete them, and return later without losing data.

## Acceptance criteria

- Add a task with a required title and priority (`low`, `medium`, `high`).
- Prevent blank titles and show an accessible inline validation message.
- Render open/completed counts.
- Toggle task completion.
- Delete a task.
- Filter by all/open/completed and search title case-insensitively.
- Persist tasks in `localStorage`; survive malformed stored JSON gracefully.
- Show a useful empty state when no visible tasks match.
- Work at 320px width and on a desktop.
- All actions work by keyboard, and focus is visibly styled.
- User text must be rendered safely (prefer `textContent`).

## Suggested data shape

```js
{
  id: "unique-id",
  title: "Review closures",
  priority: "high",
  completed: false,
  createdAt: "2026-08-14T10:00:00.000Z"
}
```

## Milestones

1. Static semantic HTML and responsive CSS.
2. In-memory add/render.
3. Toggle/delete through event delegation.
4. Filter/search and derived counts.
5. Persistence and malformed-data handling.
6. Keyboard/a11y pass and manual QA.

## Manual test script

1. Submit blank input: visible error; focus remains useful.
2. Add three tasks with different priorities.
3. Complete one; counts and filter update.
4. Search with different letter casing.
5. Delete a visible task.
6. Reload; remaining tasks persist.
7. Put invalid JSON under the storage key; reload; app recovers.
8. Complete the entire flow using only the keyboard.

## Stretch goals

- Edit a task title.
- Sort by created date or priority without mutating state.
- Use URL query parameters for current filters.
- Add unit tests by extracting pure state functions.

