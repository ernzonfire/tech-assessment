# 04 — HTML, CSS, DOM, and Browser Frontend

## Semantic HTML first

Use elements by meaning: `header`, `nav`, `main`, `section`, `article`, `button`, `form`, `label`, and headings in a logical order. A clickable action should normally be a real `button`, not a `div` with a click listener.

Every input needs an accessible name. Every image needs useful `alt` text or empty `alt=""` when decorative.

## CSS mental model

- The box model: content → padding → border → margin.
- `box-sizing: border-box` makes declared width include padding/border.
- Flexbox is good for one-dimensional alignment.
- Grid is good for two-dimensional layout.
- Prefer fluid widths, `minmax`, `clamp`, and content-driven breakpoints.
- Start mobile-first; add space/layout when room becomes available.

## DOM workflow

```js
const form = document.querySelector("#task-form");
const list = document.querySelector("#task-list");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const title = String(data.get("title") ?? "").trim();
  if (!title) return;
  // update state, then render
});
```

Keep state separate from DOM rendering:

```js
let tasks = [];

function addTask(task) {
  tasks = [...tasks, task];
  render();
}
```

Event delegation is useful for dynamic lists: attach one listener to the list and identify the clicked child with `event.target.closest(...)`.

## Browser safety

- Prefer `textContent` for untrusted text; careless `innerHTML` can create XSS.
- Validate on both client and server. Client validation improves UX; it is not a security boundary.
- Store only appropriate non-secret data in `localStorage`.
- Preserve keyboard focus and expose errors clearly.

## Frontend states checklist

- Loading
- Success
- Empty
- Validation error
- Server/network error
- Disabled/submitting
- Responsive narrow/wide layouts
- Keyboard navigation and visible focus

Project: `exercises/frontend/vanilla-dashboard/`.

