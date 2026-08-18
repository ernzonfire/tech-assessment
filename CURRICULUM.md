# Zero-to-Full-Stack Curriculum

This is an 8-week default track. Repeat a week when the exit criteria are not yet comfortable.

## Week 1 — JavaScript foundations

Topics: values and types, variables, operators, conditionals, loops, functions, arrays, objects, debugging.

- Reviewer: `reviewers/01-js-foundations.md`
- Drills: `day-01-foundations.js`
- Exit: solve basic transformations without copying and explain `let`, `const`, `===`, truthy/falsy, and function return values.

## Week 2 — Working with data

Topics: array methods, destructuring, spread/rest, immutability, callbacks, closures, modules, Big-O basics.

- Reviewer: `reviewers/02-functions-data.md`
- Drills: `day-02-data.js`
- Exit: choose between `map`, `filter`, `find`, `some`, and `reduce`; avoid accidental mutation.

## Week 3 — Async JavaScript and the web

Topics: call stack, event loop, promises, `async`/`await`, HTTP, JSON, fetch, errors.

- Reviewer: `reviewers/03-async-js.md`
- Drills: `day-03-async.js`
- Exit: consume an API, handle loading/success/empty/error states, and explain why async code does not block the page.

## Week 4 — Browser frontend

Topics: semantic HTML, CSS layout/responsiveness, DOM, events, forms, accessibility, client-side state.

- Reviewer: `reviewers/04-browser-dom.md`
- Project: `exercises/frontend/vanilla-dashboard/`
- Exit: build a usable responsive interface without a framework.

## Week 5 — Component frontend

Topics: React mental model, components, props, state, effects, controlled forms, routing, data fetching, performance.

- Reviewer: `reviewers/05-frontend.md`
- Assessment after review: `assessments/02-frontend.md`
- Exit: split a UI into sensible components and explain state ownership and effect dependencies.

## Week 6 — Backend APIs

Topics: Node.js, request/response, REST, routing, validation, status codes, middleware, logging, API testing.

- Reviewer: `reviewers/06-backend.md`
- Project: `exercises/backend/task-api/`
- Exit: implement and test CRUD endpoints with consistent error responses.

## Week 7 — Data, auth, and security

Topics: relational data, SQL, indexes, transactions, authentication vs authorization, sessions/JWT, OWASP basics.

- Reviewer: `reviewers/07-databases-security.md`
- Exit: model a small database, write joins, protect an endpoint, and identify common web vulnerabilities.

## Week 8 — Full-stack delivery

Topics: API contracts, integration, tests, Git, environment variables, deployment, observability, trade-offs.

- Reviewer: `reviewers/08-fullstack-testing.md`
- Capstone: `exercises/fullstack/issue-tracker/`
- Final mocks: `assessments/01-js-core.md` through `assessments/04-fullstack.md`
- Exit: demo, test, and defend an end-to-end app as if in a technical interview.

## Weekly rhythm

| Day | Focus | Output |
|---|---|---|
| 1 | Concepts + typed examples | Notes from memory |
| 2 | Guided drills | Working functions/components |
| 3 | More drills + debugging | Green tests |
| 4 | Small feature | A usable increment |
| 5 | Refactor + explain | Cleaner code and trade-offs |
| 6 | Timed checkpoint | Score and weak-topic list |
| 7 | Rest/light recall | No heavy coding |

## Interview skills trained throughout

- Clarify requirements before coding.
- State examples and edge cases.
- Start with a correct simple solution.
- Test incrementally.
- Name variables around the domain.
- Discuss time/space complexity when relevant.
- Admit uncertainty, then show how you would verify it.

