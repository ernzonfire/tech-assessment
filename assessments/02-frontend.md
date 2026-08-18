# Assessment 02 — Frontend

Time: 2.5 hours. Framework/library docs allowed. No AI or copied components.

## Brief

Build a responsive product browser from a supplied/fake API. Users can search, filter by category, sort, inspect details, and maintain a favorites list.

## Required behavior

- Fetch products and categories; show loading, error, retry, empty, and success states.
- Search title/description, case-insensitively.
- Filter by category; sort by price ascending/descending and rating descending.
- Keep filters in URL query parameters so refresh/share preserves the view.
- Details open in a route or accessible dialog.
- Favorite/unfavorite; persist favorites locally.
- Results/counts are derived, not duplicate state.
- Responsive at 320px, tablet, and desktop.
- Keyboard navigation, labeled inputs, logical headings, visible focus.

Use either React or vanilla JavaScript, but explain the choice.

## Constraints

- Do not use a component kit for the entire interface.
- User/API text must be rendered safely.
- Obsolete search/filter requests must not overwrite current state.
- Include at least 5 meaningful behavior tests or a clearly documented manual test plan if environment setup blocks automated tests.

## Deliverables

- Working source
- Setup command
- README with decisions/trade-offs
- Screenshot at mobile and desktop widths
- Tests and verification notes

## Scoring (100)

- Behavior and async states: 30
- State/component design: 20
- Accessibility/responsiveness: 15
- Code clarity: 15
- Tests: 10
- Explanation/trade-offs: 10

## Defense questions

- Why does each piece of state live where it does?
- Which values are derived?
- How do you prevent stale async results?
- What would change with server-side filtering/pagination?

